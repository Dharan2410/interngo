// src/pages/admin/attendance/AdminAttendanceBase.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "../../../context/AuthContext";

import MonthHeader from "../../../components/Daily/MonthHeader";
import CalendarPopup from "../../../components/Daily/CalendarPopup";
import WeekStrip from "../../../components/Daily/WeekStrip";
import SelectedDateCard from "../../../components/Daily/SelectedDateCard";
import AttendanceStatusCard from "../../../components/Attendance/AttendanceStatusCard"; // 🔥 NEW COMPONENT

import { fetchAttendanceBatch, saveAttendance } from "../../../api/attendanceApi";  

// Util helpers
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const yyyyMMdd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

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

// MAIN COMPONENT
const AdminAttendanceBase: React.FC = () => {
  const { user } = useAuth();

  // ================= YEAR + BATCH SELECTION =================
  const [groups, setGroups] = useState<{ year: string; batches: string[] }[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  // ================= DATE STATE =================
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(today));
  const [monthShown, setMonthShown] = useState<Date>(today);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYearNum, setSelectedYearNum] = useState(today.getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  // =============== INTERN LIST + ATTENDANCE =================
  const [internList, setInternList] = useState<
    { id: string; name: string; status: string }[]
  >([]);

  const isFuture = (d: Date) => d.getTime() > today.getTime();

  const monthNames = Array.from({ length: 12 }).map((_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  // ================= FETCH YEAR + BATCH METADATA =================
  useEffect(() => {
    fetch("http://localhost:8080/professional")
      .then((res) => res.json())
      .then((data) => {
        const yearMap: Record<string, Set<string>> = {};

        data.forEach((item: any) => {
          const year = String(item.year || "").trim();
          const batch = String(item.batch || "").trim();
          if (!year) return;

          if (!yearMap[year]) yearMap[year] = new Set();
          if (batch) yearMap[year].add(batch);
        });

        const grouped = Object.keys(yearMap).map((year) => ({
          year,
          batches: Array.from(yearMap[year]),
        }));

        setGroups(grouped);
      });
  }, []);

  // ================= LOAD ATTENDANCE FOR DATE =================
  const loadAttendance = async () => {
    if (!selectedYear || !selectedBatch) return;

    const iso = yyyyMMdd(selectedDate);
    const result = await fetchAttendanceBatch(selectedYear, selectedBatch, iso);

    setInternList(result); // result = [{id, name, status}, ...]
  };

  useEffect(() => {
    loadAttendance();
  }, [selectedDate, selectedYear, selectedBatch]);

  // ================= EVENT HANDLERS =================
  const handleSelectDate = (d: Date) => {
    if (isFuture(d)) return;

    setSelectedDate(d);
    setMonthShown(d);
    setSelectedMonth(d.getMonth());
    setSelectedYearNum(d.getFullYear());
    setWeekStart(startOfWeek(d));
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() - 1);
    setMonthShown(d);
    setSelectedMonth(d.getMonth());
    setSelectedYearNum(d.getFullYear());
    setSelectedDate(d);
    setWeekStart(startOfWeek(d));
  };

  const handleNextMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() + 1);
    setMonthShown(d);
    setSelectedMonth(d.getMonth());
    setSelectedYearNum(d.getFullYear());
    setSelectedDate(d);
    setWeekStart(startOfWeek(d));
  };

  const goToToday = () => {
    setSelectedDate(today);
    setMonthShown(today);
    setSelectedMonth(today.getMonth());
    setSelectedYearNum(today.getFullYear());
    setWeekStart(startOfWeek(today));
  };

  // update intern status instantly
  const updateStatus = async (userId: string, newStatus: string) => {
    const iso = yyyyMMdd(selectedDate);

    await saveAttendance({
      userId,
      year: selectedYear,
      batch: selectedBatch,
      date: iso,
      status: newStatus,
    });

    setInternList((prev) =>
      prev.map((i) =>
        i.id === userId ? { ...i, status: newStatus } : i
      )
    );
  };

  const weekDates = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  // ================= UI: SELECT YEAR + BATCH ==================
//   if (!selectedBatch || !selectedYear) {
//     return (
//       <div className="relative px-4 py-6">
//         <h2 className="text-3xl font-bold text-[#1E2A35] mb-10">
//           Select <span className="text-[#3B6E8F]">Year & Batch</span>
//         </h2>

//         <div className="space-y-16 w-full">
//           {groups.map((g) => (
//             <div key={g.year} className="space-y-6">
//               <div className="flex items-center justify-center my-4">
//                 <div className="flex-grow border-t border-[#96C2DB]/40"></div>
//                 <div className="bg-[#96C2DB]/50 px-48 py-2 rounded-2xl border text-center shadow-sm">
//                   <h3 className="text-xl font-bold">{g.year}</h3>
//                 </div>
//                 <div className="flex-grow border-t border-[#96C2DB]/40"></div>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
//                 {g.batches.map((b) => (
//                   <motion.div
//                     key={b}
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() => {
//                       setSelectedYear(g.year);
//                       setSelectedBatch(b);
//                     }}
//                     className="cursor-pointer bg-white/70 border rounded-3xl p-6 shadow-md hover:shadow-xl text-center"
//                   >
//                     <p className="text-sm text-[#3A4750]">Batch</p>
//                     <h3 className="text-xl font-bold">{b}</h3>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

  // ================= UI: AFTER SELECT YEAR + BATCH ==================
  return (
    <div className="relative min-h-[80vh] px-4 py-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            setSelectedBatch("");
            setSelectedYear("");
          }}
          className="px-4 py-1 bg-[#96C2DB] rounded-lg"
        >
          ← Select Batch
        </button>

        <div>
          <div className="text-xs">Year</div>
          <div className="font-semibold">{selectedYear}</div>
        </div>

        <div className="ml-6">
          <div className="text-xs">Batch</div>
          <div className="font-semibold">{selectedBatch}</div>
        </div>
      </div>

      {/* MONTH HEADER */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-4 relative">
          <MonthHeader
            monthLabel={`${monthNames[selectedMonth]} ${selectedYearNum}`}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
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
              onSelectDate={handleSelectDate}
              onChangeMonth={(m) => {
                setSelectedMonth(m);
                setMonthShown(new Date(selectedYearNum, m, 1));
              }}
              onChangeYear={(y) => {
                setSelectedYearNum(y);
                setMonthShown(new Date(y, selectedMonth, 1));
              }}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        {/* WEEK SWITCH */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="p-2 border rounded-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <div>Week</div>
          <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="p-2 border rounded-lg"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* WEEK STRIP */}
      <WeekStrip
        weekDates={weekDates}
        today={today}
        selectedDate={selectedDate}
        isFuture={isFuture}
        onSelectDate={handleSelectDate}
      />

      {/* SELECTED DATE CARD */}
      <SelectedDateCard
        selectedDate={selectedDate}
        totalHours={0}
        totalMinutes={0}
        isToday={false}
        showTotalTime={false}
      />

      {/* INTERN ATTENDANCE LIST */}
      <div className="space-y-4 mt-6">
        {internList.map((intern) => (
          <AttendanceStatusCard
            key={intern.id}
            internId={intern.id}
            name={intern.name}
            status={intern.status}
            onChangeStatus={updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminAttendanceBase;
