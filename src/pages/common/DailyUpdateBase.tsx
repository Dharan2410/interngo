// // src/pages/common/DailyUpdateBase.tsx
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";

// import { useAuth } from "../../context/AuthContext";

// import MonthHeader from "../../components/Daily/MonthHeader";
// import CalendarPopup from "../../components/Daily/CalendarPopup";
// import WeekStrip from "../../components/Daily/WeekStrip";
// import SelectedDateCard from "../../components/Daily/SelectedDateCard";
// import InternTaskListCard from "../../components/Daily/InternTaskListCard";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import { fetchBatchDaily } from "../../api/dailyUpdateApi";
// import type { TaskRow, BatchDailyRecord } from "../../api/dailyUpdateApi";

// const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// const yyyyMMdd = (d: Date) =>
//   `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// const startOfWeek = (date: Date) => {
//   const d = new Date(date);
//   const day = (d.getDay() + 6) % 7;
//   d.setDate(d.getDate() - day);
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const addDays = (d: Date, days: number) => {
//   const x = new Date(d);
//   x.setDate(x.getDate() + days);
//   return x;
// };

// type InternItem = {
//   id: string;          // userId
//   name: string;        // profiles.user.name
//  totalTime: string;   // "2h 30m"
// };



// // ----------------------------------------------------------
// // MAIN COMPONENT
// // ----------------------------------------------------------
// const DailyUpdateBase: React.FC<{ role: "admin" | "mentor" | "interviewer" }> = ({
//   role,
// }) => {
//   const { user } = useAuth(); // (not used but kept as before)

//   // ----------------------- STATE -----------------------
//   const [batches, setBatches] = useState<string[]>([]); // e.g. ["2025", "2026"]
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [monthShown, setMonthShown] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(monthShown.getMonth());
//   const [selectedYear, setSelectedYear] = useState(monthShown.getFullYear());
//   const [searchTerm, setSearchTerm] = useState("");

//   const today = useMemo(() => {
//     const t = new Date();
//     t.setHours(0, 0, 0, 0);
//     return t;
//   }, []);

//   const [selectedDate, setSelectedDate] = useState<Date>(today);
//   const [weekStart, setWeekStart] = useState<Date>(startOfWeek(today));

//   // internsTasks: userId -> TaskRow[]
//   const [internsTasks, setInternsTasks] = useState<Record<string, TaskRow[]>>(
//     {}
//   );

//   // list of interns for selected batch
//   const [internList, setInternList] = useState<InternItem[]>([]);

//   const [page, setPage] = useState(1);
//   const itemsPerPage = 4;

//   const calendarRef = useRef<HTMLDivElement>(null);

//   const monthNames = Array.from({ length: 12 }).map((_, i) =>
//     new Date(0, i).toLocaleString("default", { month: "long" })
//   );

//   const handleCalendarMonthChange = (newMonth: number) => {
//   setSelectedMonth(newMonth);

//   // Move selected date to the first day of the new month
//   const newDate = new Date(selectedYear, newMonth, 1);
//   setSelectedDate(newDate);
//   setWeekStart(startOfWeek(newDate));
//   setMonthShown(newDate);
// };

// const handleCalendarYearChange = (newYear: number) => {
//   setSelectedYear(newYear);

//   // Move selected date to the first day of new year + current month
//   const newDate = new Date(newYear, selectedMonth, 1);
//   setSelectedDate(newDate);
//   setWeekStart(startOfWeek(newDate));
//   setMonthShown(newDate);
// };
//   // ------------------------------------------------------
//   // LOAD BATCHES from professionalInfo (year field)
//   // ------------------------------------------------------
//   useEffect(() => {
//     const loadBatches = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/interngo/professional");
//         if (!res.ok) {
//           console.error("Failed to load professional info for batches");
//           return;
//         }
//         const arr = await res.json();

//         if (!Array.isArray(arr)) {
//           console.error("professionalInfo is not an array:", arr);
//           return;
//         }

//         // collect distinct years
//         const yearsSet = new Set<string>();
//         arr.forEach((p: any) => {
//           if (p.year) {
//             yearsSet.add(String(p.year));
//           } else if (p.batch) {
//             // fallback: extract trailing digits from "Batch 2025"
//             const match = String(p.batch).match(/(\d{4})/);
//             if (match) yearsSet.add(match[1]);
//           }
//         });

//         const years = Array.from(yearsSet).sort();
//         setBatches(years);
//       } catch (err) {
//         console.error("loadBatches error:", err);
//       }
//     };

//     loadBatches();
//   }, []);

//   // ------------------------------------------------------
//   // LOAD DAILY UPDATES FOR SELECTED BATCH + DATE
//   // ------------------------------------------------------
//   useEffect(() => {
//     if (!selectedBatch) return;

//     const loadDaily = async () => {
//       try {
//         const iso = yyyyMMdd(selectedDate);
//         const records: BatchDailyRecord[] = await fetchBatchDaily(
//           selectedBatch,
//           iso
//         );

//         // build intern list and tasks map
//         const mapTasks: Record<string, TaskRow[]> = {};
//         const interns: InternItem[] = records.map((r) => {
//           mapTasks[r.userId] = r.tasks || [];
//           return {
//             id: r.userId,
//             name: r.internName || r.userId,
//             totalTime: r.totalTime || "0h 00m",
//           };
//         });

//         setInternsTasks(mapTasks);
//         setInternList(interns);
//         setPage(1);
//       } catch (err) {
//         console.error("loadDaily error:", err);
//       }
//     };

//     loadDaily();
//   }, [selectedBatch, selectedDate]);

//   const isFuture = (d: Date) => d.getTime() > today.getTime();

//   const onSelectDate = (d: Date) => {
//     if (isFuture(d)) return;
//     setSelectedDate(d);
//     setMonthShown(d);
//     setSelectedMonth(d.getMonth());
//     setSelectedYear(d.getFullYear());
//     setWeekStart(startOfWeek(d));
//     setShowCalendar(false);
//   };

//   const prevMonth = () => {
//   const d = new Date(monthShown);
//   d.setMonth(d.getMonth() - 1);

//   const newDate = new Date(d.getFullYear(), d.getMonth(), 1);

//   setMonthShown(newDate);
//   setSelectedMonth(newDate.getMonth());
//   setSelectedYear(newDate.getFullYear());
//   setSelectedDate(newDate);
//   setWeekStart(startOfWeek(newDate));
// };

//   const nextMonth = () => {
//   const d = new Date(monthShown);
//   d.setMonth(d.getMonth() + 1);

//   const newDate = new Date(d.getFullYear(), d.getMonth(), 1);

//   setMonthShown(newDate);
//   setSelectedMonth(newDate.getMonth());
//   setSelectedYear(newDate.getFullYear());
//   setSelectedDate(newDate);
//   setWeekStart(startOfWeek(newDate));
// };


//   const goToToday = () => {
//     setSelectedDate(today);
//     setMonthShown(today);
//     setSelectedMonth(today.getMonth());
//     setSelectedYear(today.getFullYear());
//     setWeekStart(startOfWeek(today));
//   };

//   const weekDates = useMemo(
//     () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
//     [weekStart]
//   );

//   // ----------------- FILTER + PAGINATION -----------------
//   const filteredInterns = internList.filter((i) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       i.name.toLowerCase().includes(term) ||
//       i.id.toLowerCase().includes(term)
//     );
//   });

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredInterns.length / itemsPerPage) || 1
//   );
//   const paginated = filteredInterns.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   // -------------------- EXPORT TO EXCEL --------------------
//   const handleExportExcel = () => {
//     const rows: any[] = [];

//     filteredInterns.forEach((intern) => {
//       const tasks = internsTasks[intern.id] || [];

//       if (tasks.length === 0) {
//         rows.push({
//           InternName: intern.name,
//           InternID: intern.id,
//           Date: selectedDate.toLocaleDateString(),
//           Topic: "-",
//           PlannedActivities: "-",
//           CompletedActivities: "-",
//           EstimatedTime: "-",
//           ActualTime: "-",
//           Status: "-",
//         });
//       }

//       tasks.forEach((t) => {
//         rows.push({
//           InternName: intern.name,
//           InternID: intern.id,
//           Date: selectedDate.toLocaleDateString(),
//           Topic: t.topic,
//           PlannedActivities: t.plannedActivities,
//           CompletedActivities: t.completedActivities,
//           EstimatedTime: t.estimatedTime,
//           ActualTime: t.actualTime,
//           Status: t.status,
//         });
//       });
//     });

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Updates");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const fileName = `Batch-${selectedBatch}_${selectedDate
//       .toLocaleDateString()
//       .replace(/\//g, "-")}.xlsx`;

//     saveAs(
//       new Blob([excelBuffer], { type: "application/octet-stream" }),
//       fileName
//     );
//   };

//   // -------------------- EXPORT TO PDF --------------------
//   const handleExportPDF = () => {
//     const doc = new jsPDF("p", "pt");

//     doc.setFontSize(16);
//     doc.text(
//       `Daily Updates - Batch ${selectedBatch} (${selectedDate.toLocaleDateString()})`,
//       40,
//       40
//     );

//     const tableRows: any[] = [];

//     filteredInterns.forEach((intern) => {
//       const tasks = internsTasks[intern.id] || [];

//       if (tasks.length === 0) {
//         tableRows.push([intern.name, intern.id, "-", "-", "-", "-", "-", "-"]);
//       }

//       tasks.forEach((t) => {
//         tableRows.push([
//           intern.name,
//           intern.id,
//           t.topic,
//           t.plannedActivities,
//           t.completedActivities,
//           t.estimatedTime,
//           t.actualTime,
//           t.status,
//         ]);
//       });
//     });

//     autoTable(doc, {
//       startY: 70,
//       head: [
//         [
//           "Intern",
//           "ID",
//           "Topic",
//           "Planned",
//           "Completed",
//           "Est. Time",
//           "Act. Time",
//           "Status",
//         ],
//       ],
//       body: tableRows,
//       theme: "grid",
//       styles: { fontSize: 8 },
//       headStyles: {
//         fillColor: [59, 110, 143],
//         textColor: 255,
//       },
//     });

//     const fileName = `Batch-${selectedBatch}-${selectedDate
//       .toLocaleDateString()
//       .replace(/\//g, "-")}.pdf`;

//     doc.save(fileName);
//   };

//   // =======================================================
//   // ======================== UI ============================
//   // =======================================================

//   return (
//     <div className="relative min-h-[80vh] px-4 py-6">
//       {/* BLURRED BACKGROUND */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full blur-3xl opacity-40 top-0 left-0 -z-10"
//         animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full blur-3xl opacity-40 bottom-0 right-0 -z-10"
//         animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
//         transition={{ duration: 16, repeat: Infinity }}
//       />

//       {/* ================== BATCH SELECTION ================== */}
//       {!selectedBatch && (
//         <>
//           <h2 className="text-2xl font-semibold text-[#1E2A35] mb-4">
//             Select a <span className="text-[#3B6E8F]">Batch</span>
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {batches.map((b) => (
//               <div
//                 key={b}
//                 onClick={() => setSelectedBatch(b)}
//                 className="cursor-pointer p-6 rounded-2xl bg-white/70 border border-[#96C2DB]/40 
//                            text-center shadow hover:-translate-y-1 transition-all hover:shadow-md"
//               >
//                 <div className="text-sm text-[#3A4750]">Intern Batch</div>
//                 <div className="text-2xl font-bold text-[#1E2A35]">{b}</div>
//               </div>
//             ))}

//             {batches.length === 0 && (
//               <div className="text-sm text-[#3A4750]">
//                 No batches found. Please add professional info for interns.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* ================== AFTER BATCH SELECTED ================== */}
//       {selectedBatch && (
//         <div className="bg-white/60 backdrop-blur-2xl border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl">
//           <div className="flex items-center justify-between mb-4">
//             <button
//               onClick={() => {
//                 setSelectedBatch("");
//                 setInternList([]);
//                 setInternsTasks({});
//               }}
//               className="px-4 py-1 rounded-lg bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]"
//             >
//               ← Back
//             </button>

//             {/* SEARCH BAR */}
//             <input
//               type="text"
//               placeholder="Search intern..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="
//                 w-52 px-3 py-2 rounded-lg
//                 bg-white/70 backdrop-blur-md border border-[#96C2DB]/50
//                 text-sm text-[#1E2A35]
//                 placeholder:text-[#3A4750]/60
//                 focus:outline-none focus:ring-2 focus:ring-[#96C2DB]
//               "
//             />
//           </div>

//           {/* ============== CALENDAR + WEEK HEADER =============== */}
//           <div className="flex items-center justify-between mb-6 relative">
//             <div className="flex items-center gap-4">
//               <MonthHeader
//                 monthLabel={`${monthNames[monthShown.getMonth()]} ${monthShown.getFullYear()}`}
//                 onPrevMonth={prevMonth}
//                 onNextMonth={nextMonth}
//                 onToday={goToToday}
//                 onToggleCalendar={() => setShowCalendar(!showCalendar)}
//               />

//               {showCalendar && (
//                 <CalendarPopup
//                   calendarRef={calendarRef}
//                   monthNames={monthNames}
//                   selectedYear={selectedYear}
//                   selectedMonth={selectedMonth}
//                   today={today}
//                   selectedDate={selectedDate}
//                   isFuture={isFuture}
//                   onSelectDate={onSelectDate}
//                   onChangeMonth={handleCalendarMonthChange}
//                   onChangeYear={handleCalendarYearChange}
//                   onClose={() => setShowCalendar(false)}
//                 />
//               )}
//             </div>

//             {/* Week controls */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, -7))}
//                 className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
//               >
//                 <ChevronLeft size={18} className="text-[#3B6E8F]" />
//               </button>
//               <div className="text-sm text-[#3A4750]">Week</div>
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, 7))}
//                 className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
//               >
//                 <ChevronRight size={18} className="text-[#3B6E8F]" />
//               </button>
//             </div>
//           </div>

//           {/* WEEK STRIP */}
//           <WeekStrip
//             weekDates={weekDates}
//             today={today}
//             selectedDate={selectedDate}
//             isFuture={isFuture}
//             onSelectDate={onSelectDate}
//           />

//           {/* SELECTED DATE CARD */}
//           <SelectedDateCard
//             selectedDate={selectedDate}
//             totalHours={0}
//             totalMinutes={0}
//             isToday={false}
//             showTotalTime={false} 
//           />

//           {/* ================== INTERN CARDS ================== */}
//           <div className="mt-6 space-y-6">
//             {paginated.map((intern) => (
//               <InternTaskListCard
//                 key={intern.id}
//                 internName={intern.name}
//                 internRole={"Intern"}
//                 tasks={internsTasks[intern.id] || []}
//                 selectedDate={selectedDate}
//                 totalTime={intern.totalTime}  
//               />
//             ))}

//             {paginated.length === 0 && (
//               <div className="text-sm text-[#3A4750] italic">
//                 No interns found for this batch / search.
//               </div>
//             )}
//           </div>

//           {/* PAGINATION WITH PAGE NUMBERS */}
//           <div className="flex justify-center items-center gap-2 mt-8 select-none">
//             {/* Prev Button */}
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className={`px-3 py-1 rounded-lg border text-sm ${
//                 page === 1
//                   ? "opacity-40 cursor-not-allowed"
//                   : "bg-white/80 hover:bg-white shadow-sm"
//               }`}
//             >
//               ‹
//             </button>

//             {/* Page Numbers */}
//             {Array.from({ length: totalPages }).map((_, i) => {
//               const pageNum = i + 1;

//               if (
//                 pageNum === 1 ||
//                 pageNum === totalPages ||
//                 Math.abs(pageNum - page) <= 1
//               ) {
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setPage(pageNum)}
//                     className={`
//                       px-3 py-1 rounded-lg text-sm border transition
//                       ${
//                         page === pageNum
//                           ? "bg-[#96C2DB] text-[#08212d] border-[#3B6E8F]"
//                           : "bg-white/80 text-[#1E2A35] border-[#96C2DB]/40 hover:bg:white"
//                       }
//                     `}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               }

//               if (pageNum === page - 2 || pageNum === page + 2) {
//                 return (
//                   <span key={pageNum} className="px-2 text-[#3A4750]">
//                     ...
//                   </span>
//                 );
//               }

//               return null;
//             })}

//             {/* Next Button */}
//             <button
//               disabled={page === totalPages}
//               onClick={() =>
//                 setPage((p) => (p === totalPages ? p : p + 1))
//               }
//               className={`px-3 py-1 rounded-lg border text-sm ${
//                 page === totalPages
//                   ? "opacity-40 cursor-not-allowed"
//                   : "bg-white/80 hover:bg-white shadow-sm"
//               }`}
//             >
//               ›
//             </button>
//           </div>

//           {/* EXPORT BUTTONS */}
//           <div className="flex flex-wrap gap-3 justify-end mt-6 mb-4">
//             <button
//               onClick={handleExportExcel}
//               className="px-4 py-2 rounded-xl text-sm font-semibold
//                 bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]
//                 shadow-md hover:shadow-lg transition-all"
//             >
//               Export Excel
//             </button>

//             <button
//               onClick={handleExportPDF}
//               className="px-4 py-2 rounded-xl text-sm font-semibold
//                 bg-[#3B6E8F] text-white hover:bg-[#2c5670]
//                 shadow-md hover:shadow-lg transition-all"
//             >
//               Export PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyUpdateBase;





// src/pages/common/DailyUpdateBase.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

import MonthHeader from "../../components/Daily/MonthHeader";
import CalendarPopup from "../../components/Daily/CalendarPopup";
import WeekStrip from "../../components/Daily/WeekStrip";
import SelectedDateCard from "../../components/Daily/SelectedDateCard";
import InternTaskListCard from "../../components/Daily/InternTaskListCard";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { fetchBatchDaily } from "../../api/dailyUpdateApi";
import type { TaskRow, BatchDailyRecord } from "../../api/dailyUpdateApi";

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

type InternItem = {
  id: string; // userId
  name: string;
  totalTime: string;
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

  // ------------------------------------------------------
  // LOAD professionalInfo + profiles to build years & batches
  // ------------------------------------------------------
  useEffect(() => {
    const loadMeta = async () => {
      try {
        // professionalInfo default json-server path
        const profRes = await fetch("http://localhost:8080/professionalInfo");
        const profilesRes = await fetch("http://localhost:8080/profiles");

        if (!profRes.ok || !profilesRes.ok) {
          console.error("Failed to load professionalInfo or profiles");
          return;
        }

        const profArr = await profRes.json();
        const profilesArr = await profilesRes.json();

        if (!Array.isArray(profArr) || !Array.isArray(profilesArr)) {
          console.error("professionalInfo or profiles is not an array");
          return;
        }

        setProfessionalInfoList(profArr);
        setProfilesList(profilesArr);

        // build years set (string)
        const yearsSet = new Set<string>();
        profArr.forEach((p: any) => {
          if (p.year) yearsSet.add(String(p.year));
        });

        const yearsList = Array.from(yearsSet).sort();
        setYears(yearsList);
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
    // reset selected batch when year changes
    setSelectedBatch("");
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
            String(p.batch).toLowerCase() === String(selectedBatch).toLowerCase()
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
          interns.push({
            id: p.userId,
            name: profile?.user?.name || rec?.internName || p.userId,
            totalTime: rec?.totalTime || "0h 00m",
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

  // =======================================================
  // ======================== UI ============================
  // =======================================================
  // Two-step: if no year selected show year cards; if year selected but no batch show batch cards; else show daily view
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

      {/* ================== YEAR SELECTION (STEP 1) ================== */}
      {!selectedYear && (
        <>
          <h2 className="text-2xl font-semibold text-[#1E2A35] mb-4">
            Select a <span className="text-[#3B6E8F]">Year</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {years.map((y) => (
              <div
                key={y}
                onClick={() => setSelectedYear(y)}
                className="cursor-pointer p-6 rounded-2xl bg-white/70 border border-[#96C2DB]/40 
                           text-center shadow hover:-translate-y-1 transition-all hover:shadow-md"
              >
                <div className="text-sm text-[#3A4750]">Intern Year</div>
                <div className="text-2xl font-bold text-[#1E2A35]">{y}</div>
              </div>
            ))}

            {years.length === 0 && (
              <div className="text-sm text-[#3A4750]">
                No years found. Please add professional info for interns.
              </div>
            )}
          </div>
        </>
      )}

      {/* ================== BATCH SELECTION (STEP 2) ================== */}
      {selectedYear && !selectedBatch && (
        <div className="bg-white/60 backdrop-blur-2xl border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                setSelectedYear("");
                setBatchesForYear([]);
              }}
              className="px-4 py-1 rounded-lg bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]"
            >
              ← Back
            </button>

            <div className="text-sm text-[#3A4750]">Select Batch in {selectedYear}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {batchesForYear.map((b) => (
              <div
                key={b}
                onClick={() => setSelectedBatch(b)}
                className="cursor-pointer p-6 rounded-2xl bg-white/70 border border-[#96C2DB]/40 
                           text-center shadow hover:-translate-y-1 transition-all hover:shadow-md"
              >
                <div className="text-sm text-[#3A4750]">Batch</div>
                <div className="text-2xl font-bold text-[#1E2A35]">{b}</div>
              </div>
            ))}

            {batchesForYear.length === 0 && (
              <div className="text-sm text-[#3A4750]">
                No batches found for {selectedYear}.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================== AFTER BATCH SELECTED: DAILY VIEW ================== */}
      {selectedYear && selectedBatch && (
        <div className="bg-white/60 backdrop-blur-2xl border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                // onClick={() => {
                //   setSelectedBatch("");
                //   setInternList([]);
                //   setInternsTasks({});
                // }}
                onClick={() => {
  setSelectedBatch("");
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
                internRole={"Intern"}
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
        </div>
      )}
    </div>
  );
};

export default DailyUpdateBase;
