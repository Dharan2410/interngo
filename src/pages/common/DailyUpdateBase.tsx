


// src/pages/common/DailyUpdateBase.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


import { useAuth } from "../../context/AuthContext";

import MonthHeader from "../../components/Daily/MonthHeader";
import CalendarPopup from "../../components/Daily/CalendarPopup";
import WeekStrip from "../../components/Daily/WeekStrip";
import SelectedDateCard from "../../components/Daily/SelectedDateCard";
import InternTaskListCard from "../../components/Daily/InternTaskListCard";
import { AnimatePresence, motion } from "framer-motion";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { fetchBatchDaily } from "../../api/dailyUpdateApi";
import type { TaskRow, BatchDailyRecord } from "../../api/dailyUpdateApi";

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const yyyyMMdd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;


const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-]/g, "");


const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

type InternItem = {
  id: string; // userId
  name: string;
  totalTime: string;
  role: string;  
};

// ----------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------
const DailyUpdateBase: React.FC<{ role: "admin" | "mentor" | "interviewer" }> = ({
  role,
}) => {
  const { user } = useAuth(); // kept as before

  // ----------------------- STATE -----------------------
  // years extracted from professionalInfo.year
  const [years, setYears] = useState<string[]>([]);
  const [yearGroups, setYearGroups] = useState<
  { year: string; batches: string[] }[]
>([]);

  const [selectedYear, setSelectedYear] = useState<string>("");

  // batches for the selected year (e.g. "batch 1", "Batch 2")
  const [batchesForYear, setBatchesForYear] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  const [monthShown, setMonthShown] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(monthShown.getMonth());
  const [selectedYearNum, setSelectedYearNum] = useState(monthShown.getFullYear());
  const [searchTerm, setSearchTerm] = useState("");

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(today));

  // internsTasks: userId -> TaskRow[]
  const [internsTasks, setInternsTasks] = useState<Record<string, TaskRow[]>>(
    {}
  );

  // list of interns for selected year+batch
  const [internList, setInternList] = useState<InternItem[]>([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const calendarRef = useRef<HTMLDivElement>(null);

  // store professionalInfo and profiles locally so we can filter client-side
  const [professionalInfoList, setProfessionalInfoList] = useState<any[]>([]);
  const [profilesList, setProfilesList] = useState<any[]>([]);

  const monthNames = Array.from({ length: 12 }).map((_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const handleCalendarMonthChange = (newMonth: number) => {
    setSelectedMonth(newMonth);

    const newDate = new Date(selectedYearNum, newMonth, 1);
    setSelectedDate(newDate);
    setWeekStart(startOfWeek(newDate));
    setMonthShown(newDate);
  };

  const handleCalendarYearChange = (newYear: number) => {
    setSelectedYearNum(newYear);

    const newDate = new Date(newYear, selectedMonth, 1);
    setSelectedDate(newDate);
    setWeekStart(startOfWeek(newDate));
    setMonthShown(newDate);
  };


useEffect(() => {
  const loadMeta = async () => {
    try {
      const res = await fetch("http://localhost:4000/interngo/users");
      if (!res.ok) {
        console.error("Failed to load users");
        return;
      }

      const users = await res.json();
      if (!Array.isArray(users)) {
        console.error("Users is not an array");
        return;
      }


      setProfessionalInfoList(users);
      setProfilesList(users);

      // -------- Extract years ----------
      const yearsSet = new Set<string>();
      users.forEach((u: any) => {
        if (u.year && u.year !== "N/A") {
          yearsSet.add(String(u.year));
        }
      });

      setYears(Array.from(yearsSet).sort());

      // -------- Group year → batches ----------
     const yearMap: Record<string, Map<string, string>> = {};

users.forEach((u: any) => {
  if (u.role !== "intern") return;

  const year = String(u.year || "").trim();
  const rawBatch = String(u.batch || "").trim();

  if (!year || year === "N/A" || !rawBatch || rawBatch === "N/A") return;

  const normalized = normalizeBatch(rawBatch);

  if (!yearMap[year]) yearMap[year] = new Map();

  if (!yearMap[year].has(normalized)) {
    const num = rawBatch.replace(/[^0-9]/g, "");
    const display = num ? `Batch-${num}` : rawBatch;

    yearMap[year].set(normalized, display);
  }
});


     const groupList = Object.keys(yearMap)
     .sort((a, b) => parseInt(b) - parseInt(a))
     .map((year) => ({
  year,
  batches: Array.from(yearMap[year].values()),
}));


      setYearGroups(groupList);
    } catch (err) {
      console.error("loadMeta error:", err);
    }
  };

  loadMeta();
}, []);


  // when a year is selected, compute batches available for that year
  useEffect(() => {
    if (!selectedYear) {
      setBatchesForYear([]);
      return;
    }

    const listForYear = professionalInfoList.filter(
      (p) => String(p.year) === String(selectedYear)
    );

    const batchSet = new Set<string>();
    listForYear.forEach((p) => {
      // normalize batch text (keep original casing)
      if (p.batch) batchSet.add(String(p.batch));
    });

    const arr = Array.from(batchSet);
    setBatchesForYear(arr.length ? arr : ["batch 1"]);
  }, [selectedYear, professionalInfoList]);

  // ------------------------------------------------------
  // LOAD DAILY UPDATES FOR SELECTED YEAR + BATCH + DATE
  // ------------------------------------------------------
  useEffect(() => {
    if (!selectedYear || !selectedBatch) return;

    const loadDaily = async () => {
      try {
        const iso = yyyyMMdd(selectedDate);

        // fetch all interns for the year (server returns those matching year or batch)
        const records: BatchDailyRecord[] = await fetchBatchDaily(
          selectedYear,
          iso
        );

        // Now filter records by the selectedBatch using professionalInfoList:
        // find professional entries that match year+batch => get userIds set
       const profMatches = professionalInfoList.filter(
  (p) =>
    String(p.year) === String(selectedYear) &&
    normalizeBatch(String(p.batch || "")) ===
      normalizeBatch(String(selectedBatch))
);


        const userIdSet = new Set(profMatches.map((p) => p.userId));

        // build mapTasks and intern list, mapping to profiles for name
        const mapTasks: Record<string, TaskRow[]> = {};
        const interns: InternItem[] = [];

        // We will derive names from profilesList; fallback to record.internName or userId
        const profilesByUserId = new Map<string, any>();
        profilesList.forEach((pr: any) => {
          if (pr && pr.userId) profilesByUserId.set(pr.userId, pr);
        });

        // iterate professional matches to ensure interns appear even if no daily record
        profMatches.forEach((p) => {
          const rec = records.find((r) => r.userId === p.userId && r.date === iso);
          mapTasks[p.userId] = rec?.tasks || [];
          const profile = profilesByUserId.get(p.userId);
let resolvedRole = p.designation || null;

if (!resolvedRole) {
  resolvedRole = profile?.user?.role || "intern";
}

interns.push({
  id: p.userId,
  name: profile?.user?.name || rec?.internName || p.userId,
  totalTime: rec?.totalTime || "0h 00m",
  role: resolvedRole, // ← final role assigned here
});

        });

        // in case the backend returned records for userIds not in profMatches,
        // include them only if their professionalInfo batch matches (safety)
        records.forEach((r) => {
          if (!userIdSet.has(r.userId)) return;
          // already handled above via profMatches loop
        });

        setInternsTasks(mapTasks);
        setInternList(interns);
        setPage(1);
      } catch (err) {
        console.error("loadDaily error:", err);
      }
    };

    loadDaily();
  }, [selectedYear, selectedBatch, selectedDate, professionalInfoList, profilesList]);

  const isFuture = (d: Date) => d.getTime() > today.getTime();

  const onSelectDate = (d: Date) => {
    if (isFuture(d)) return;
    setSelectedDate(d);
    setMonthShown(d);
    setSelectedMonth(d.getMonth());
    setSelectedYearNum(d.getFullYear());
    setWeekStart(startOfWeek(d));
    setShowCalendar(false);
  };

  const prevMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() - 1);

    const newDate = new Date(d.getFullYear(), d.getMonth(), 1);

    setMonthShown(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYearNum(newDate.getFullYear());
    setSelectedDate(newDate);
    setWeekStart(startOfWeek(newDate));
  };

  const nextMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() + 1);

    const newDate = new Date(d.getFullYear(), d.getMonth(), 1);

    setMonthShown(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYearNum(newDate.getFullYear());
    setSelectedDate(newDate);
    setWeekStart(startOfWeek(newDate));
  };

  const goToToday = () => {
    setSelectedDate(today);
    setMonthShown(today);
    setSelectedMonth(today.getMonth());
    setSelectedYearNum(today.getFullYear());
    setWeekStart(startOfWeek(today));
  };

  const weekDates = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  // ----------------- FILTER + PAGINATION -----------------
  const filteredInterns = internList.filter((i) => {
    const term = searchTerm.toLowerCase();
    return (
      i.name.toLowerCase().includes(term) ||
      i.id.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInterns.length / itemsPerPage) || 1
  );
  const paginated = filteredInterns.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // -------------------- EXPORT TO EXCEL --------------------
  const handleExportExcel = () => {
    const rows: any[] = [];

    filteredInterns.forEach((intern) => {
      const tasks = internsTasks[intern.id] || [];

      if (tasks.length === 0) {
        rows.push({
          InternName: intern.name,
          InternID: intern.id,
          Date: selectedDate.toLocaleDateString(),
          Topic: "-",
          PlannedActivities: "-",
          CompletedActivities: "-",
          EstimatedTime: "-",
          ActualTime: "-",
          Status: "-",
        });
      }

      tasks.forEach((t) => {
        rows.push({
          InternName: intern.name,
          InternID: intern.id,
          Date: selectedDate.toLocaleDateString(),
          Topic: t.topic,
          PlannedActivities: t.plannedActivities,
          CompletedActivities: t.completedActivities,
          EstimatedTime: t.estimatedTime,
          ActualTime: t.actualTime,
          Status: t.status,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Updates");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileName = `Year-${selectedYear}_Batch-${selectedBatch}_${selectedDate
      .toLocaleDateString()
      .replace(/\//g, "-")}.xlsx`;

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      fileName
    );
  };

  // -------------------- EXPORT TO PDF --------------------
  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt");

    doc.setFontSize(16);
    doc.text(
      `Daily Updates - Year ${selectedYear} / ${selectedBatch} (${selectedDate.toLocaleDateString()})`,
      40,
      40
    );

    const tableRows: any[] = [];

    filteredInterns.forEach((intern) => {
      const tasks = internsTasks[intern.id] || [];

      if (tasks.length === 0) {
        tableRows.push([intern.name, intern.id, "-", "-", "-", "-", "-", "-"]);
      }

      tasks.forEach((t) => {
        tableRows.push([
          intern.name,
          intern.id,
          t.topic,
          t.plannedActivities,
          t.completedActivities,
          t.estimatedTime,
          t.actualTime,
          t.status,
        ]);
      });
    });

    autoTable(doc, {
      startY: 70,
      head: [
        [
          "Intern",
          "ID",
          "Topic",
          "Planned",
          "Completed",
          "Est. Time",
          "Act. Time",
          "Status",
        ],
      ],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [59, 110, 143],
        textColor: 255,
      },
    });

    const fileName = `Year-${selectedYear}_Batch-${selectedBatch}-${selectedDate
      .toLocaleDateString()
      .replace(/\//g, "-")}.pdf`;

    doc.save(fileName);
  };

  
  return (
    <div className="relative min-h-[80vh] px-4 py-6"> 
      {/* BLURRED BACKGROUND */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full blur-3xl opacity-40 top-0 left-0 -z-10"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full blur-3xl opacity-40 bottom-0 right-0 -z-10"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

     {/* ================== YEAR + BATCH ON SAME PAGE (COMBINED) ================== */}
     <AnimatePresence mode="wait">
{!selectedBatch && !selectedYear && (
  
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="space-y-16 relative z-10 w-full"
  >
   <div className="space-y-16 relative z-10 w-full"> 
  

    {yearGroups.map((group) => (
      <div key={group.year} className="space-y-6">

        {/* YEAR LABEL */}
        <div className="flex items-center justify-center my-4">
          <div className="flex items-center w-full max-w-xl">
            <div className="flex-grow border-t border-[#96C2DB]/40"></div>

            <div
              className="
                bg-[#96C2DB]/50
                border border-[#96C2DB]/50 
                rounded-2xl shadow-sm 
                px-48 py-2 text-center 
                hover:shadow-md transition-all duration-300
              "
            >
              <h3 className="text-xl font-bold text-[#1E2A35]">
                {group.year}
              </h3>
            </div>

            <div className="flex-grow border-t border-[#96C2DB]/40"></div>
          </div>
        </div>

        {/* BATCH CARDS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {group.batches.map((batch) => (
            <motion.div
              key={batch}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
  if (!professionalInfoList.length) return; // prevent blank page
  setSelectedYear(group.year);
  setSelectedBatch(batch);
}}
              className="
                cursor-pointer bg-white/70 backdrop-blur-2xl 
                border border-[#96C2DB]/40 rounded-3xl p-6 shadow-md
                hover:shadow-xl transition-all text-center
              "
            >
              <p className="text-sm text-[#3A4750]">Batch</p>
              <h3 className="text-xl font-bold text-[#1E2A35]">{batch}</h3>
            </motion.div>
          ))}
        </div>

      </div>
    ))}

  </div> 
  
  </motion.div>
  
)}


      {/* ================== AFTER BATCH SELECTED: DAILY VIEW ================== */}
      
      {selectedYear && selectedBatch && (
        
        <>
         <motion.div
      key="daily-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
  setSelectedBatch("");
setSelectedYear("");
setInternList([]);
setInternsTasks({});

  // RESET DATE TO TODAY ALWAYS
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  setSelectedDate(t);
  setMonthShown(t);
  setSelectedMonth(t.getMonth());
  setSelectedYearNum(t.getFullYear());
  setWeekStart(startOfWeek(t));
}}

                className="px-4 py-1 rounded-lg bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]"
              >
                ← Select Batch
              </button>

              <div>
                <div className="text-xs text-[#3A4750]">Year</div>
                <div className="font-semibold">{selectedYear}</div>
              </div>

              <div className="ml-6">
                <div className="text-xs text-[#3A4750]">Batch</div>
                <div className="font-semibold">{selectedBatch}</div>
              </div>
            </div>

            {/* SEARCH BAR */}
            <input
              type="text"
              placeholder="Search intern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-52 px-3 py-2 rounded-lg
                bg-white/70 backdrop-blur-md border border-[#96C2DB]/50
                text-sm text-[#1E2A35]
                placeholder:text-[#3A4750]/60
                focus:outline-none focus:ring-2 focus:ring-[#96C2DB]
              "
            />
          </div>

          {/* ============== CALENDAR + WEEK HEADER =============== */}
          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-4">
              <MonthHeader
                monthLabel={`${monthNames[monthShown.getMonth()]} ${monthShown.getFullYear()}`}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onToday={goToToday}
                onToggleCalendar={() => setShowCalendar(!showCalendar)}
              />

              {showCalendar && (
                <CalendarPopup
                  calendarRef={calendarRef}
                  monthNames={monthNames}
                  selectedYear={selectedYearNum}
                  selectedMonth={selectedMonth}
                  today={today}
                  selectedDate={selectedDate}
                  isFuture={isFuture}
                  onSelectDate={onSelectDate}
                  onChangeMonth={handleCalendarMonthChange}
                  onChangeYear={handleCalendarYearChange}
                  onClose={() => setShowCalendar(false)}
                />
              )}
            </div>

            {/* Week controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWeekStart(addDays(weekStart, -7))}
                className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
              >
                <ChevronLeft size={18} className="text-[#3B6E8F]" />
              </button>
              <div className="text-sm text-[#3A4750]">Week</div>
              <button
                onClick={() => setWeekStart(addDays(weekStart, 7))}
                className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
              >
                <ChevronRight size={18} className="text-[#3B6E8F]" />
              </button>
            </div>
          </div>

          {/* WEEK STRIP */}
          <WeekStrip
            weekDates={weekDates}
            today={today}
            selectedDate={selectedDate}
            isFuture={isFuture}
            onSelectDate={onSelectDate}
          />

          {/* SELECTED DATE CARD */}
          <SelectedDateCard
            selectedDate={selectedDate}
            totalHours={0}
            totalMinutes={0}
            isToday={false}
            showTotalTime={false}
          />

          {/* ================== INTERN CARDS ================== */}
          <div className="mt-6 space-y-6">
            {paginated.map((intern) => (
              <InternTaskListCard
                key={intern.id}
                internName={intern.name}
                internRole={intern.role} 
                tasks={internsTasks[intern.id] || []}
                selectedDate={selectedDate}
                totalTime={intern.totalTime}
              />
            ))}

            {paginated.length === 0 && (
              <div className="text-sm text-[#3A4750] italic">
                No interns found for Year {selectedYear} / {selectedBatch}.
              </div>
            )}
          </div>

          {/* PAGINATION WITH PAGE NUMBERS */}
          <div className="flex justify-center items-center gap-2 mt-8 select-none">
            {/* Prev Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1 rounded-lg border text-sm ${
                page === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white/80 hover:bg-white shadow-sm"
              }`}
            >
              ‹
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;

              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - page) <= 1
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`
                      px-3 py-1 rounded-lg text-sm border transition
                      ${
                        page === pageNum
                          ? "bg-[#96C2DB] text-[#08212d] border-[#3B6E8F]"
                          : "bg-white/80 text-[#1E2A35] border-[#96C2DB]/40 hover:bg:white"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              }

              if (pageNum === page - 2 || pageNum === page + 2) {
                return (
                  <span key={pageNum} className="px-2 text-[#3A4750]">
                    ...
                  </span>
                );
              }

              return null;
            })}

            {/* Next Button */}
            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((p) => (p === totalPages ? p : p + 1))
              }
              className={`px-3 py-1 rounded-lg border text-sm ${
                page === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white/80 hover:bg-white shadow-sm"
              }`}
            >
              ›
            </button>
          </div>

          {/* EXPORT BUTTONS */}
          <div className="flex flex-wrap gap-3 justify-end mt-6 mb-4">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 rounded-xl text-sm font-semibold
                bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]
                shadow-md hover:shadow-lg transition-all"
            >
              Export Excel
            </button>

            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-xl text-sm font-semibold
                bg-[#3B6E8F] text-white hover:bg-[#2c5670]
                shadow-md hover:shadow-lg transition-all"
            >
              Export PDF
            </button>
          </div>
       </motion.div>
        </>
      )}
      </AnimatePresence>
    
</div>
  );
};

export default DailyUpdateBase;
