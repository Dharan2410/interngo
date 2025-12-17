// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import MonthHeader from "../../components/Daily/MonthHeader";
// import CalendarPopup from "../../components/Daily/CalendarPopup";
// import WeekStrip from "../../components/Daily/WeekStrip";

// const BASE = "http://localhost:4000";

// const pad = (n: number) => (n < 10 ? `0${n}` : n);
// const yyyyMMdd = (d: Date) =>
//   `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// const startOfWeek = (d: Date) => {
//   const x = new Date(d);
//   x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
//   return x;
// };

// const addDays = (d: Date, i: number) =>
//   new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);

// const AttendanceHome: React.FC = () => {
//   const navigate = useNavigate();

//   const today = useMemo(() => {
//     const t = new Date();
//     t.setHours(0, 0, 0, 0);
//     return t;
//   }, []);

//   const [selectedDate, setSelectedDate] = useState(today);
//   const [weekStart, setWeekStart] = useState(startOfWeek(today));
//   const [showCalendar, setShowCalendar] = useState(false);

//   const [groups, setGroups] = useState<
//     { year: string; batches: string[] }[]
//   >([]);

//   const calendarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetch(`${BASE}/interngo/users`)
//       .then((r) => r.json())
//       .then((users) => {
//         const map: Record<string, Set<string>> = {};
//         users
//           .filter((u: any) => u.role === "intern")
//           .forEach((u: any) => {
//             if (!map[u.year]) map[u.year] = new Set();
//             map[u.year].add(u.batch);
//           });

//         setGroups(
//           Object.keys(map).map((y) => ({
//             year: y,
//             batches: Array.from(map[y]),
//           }))
//         );
//       });
//   }, []);

//   const weekDates = Array.from({ length: 7 }).map((_, i) =>
//     addDays(weekStart, i)
//   );

//   return (
//     <div className="relative min-h-[80vh] px-4 py-6">
//       {/* blobs */}
//       <motion.div className="absolute w-72 h-72 bg-[#C6DFF1] blur-3xl opacity-40 -z-10" />
//       <motion.div className="absolute w-80 h-80 bg-[#96C2DB] blur-3xl opacity-40 bottom-0 right-0 -z-10" />

//       <MonthHeader
//         monthLabel={selectedDate.toLocaleString("default", {
//           month: "long",
//           year: "numeric",
//         })}
//         onPrevMonth={() =>
//           setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))
//         }
//         onNextMonth={() =>
//           setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))
//         }
//         onToday={() => setSelectedDate(today)}
//         onToggleCalendar={() => setShowCalendar(!showCalendar)}
//       />

//       {showCalendar && (
//         <CalendarPopup
//           calendarRef={calendarRef}
//           monthNames={[]}
//           selectedYear={selectedDate.getFullYear()}
//           selectedMonth={selectedDate.getMonth()}
//           today={today}
//           selectedDate={selectedDate}
//           isFuture={() => false}
//           onSelectDate={setSelectedDate}
//           onChangeMonth={() => {}}
//           onChangeYear={() => {}}
//           onClose={() => setShowCalendar(false)}
//         />
//       )}

//       <WeekStrip
//         weekDates={weekDates}
//         today={today}
//         selectedDate={selectedDate}
//         isFuture={() => false}
//         onSelectDate={setSelectedDate}
//       />

//       {/* YEAR BATCH */}
//       <div className="space-y-16 mt-10">
//         {groups.map((g) => (
//           <div key={g.year}>
//             <h3 className="text-xl font-bold text-center mb-6">{g.year}</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {g.batches.map((b) => (
//                 <motion.div
//                   key={b}
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() =>
//                     navigate(
//                       `/admin/attendance/mark/${g.year}/${b}/${yyyyMMdd(
//                         selectedDate
//                       )}`
//                     )
//                   }
//                   className="bg-white/70 rounded-3xl p-6 shadow-md text-center cursor-pointer"
//                 >
//                   <p className="text-sm">Batch</p>
//                   <h4 className="text-xl font-bold">{b}</h4>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AttendanceHome;







import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MonthHeader from "../../components/Daily/MonthHeader";
import CalendarPopup from "../../components/Daily/CalendarPopup";
import WeekStrip from "../../components/Daily/WeekStrip";

const BASE = "http://localhost:4000";

// -------------------- DATE UTILS (SAME AS DAILY UPDATE) --------------------
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const yyyyMMdd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-]/g, "");


const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday start
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

// -------------------------------------------------------------------------

const AttendanceHome: React.FC = () => {
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement>(null);

  // ---------------- TODAY ----------------
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

  // ---------------- YEAR / BATCH DATA ----------------
  const [groups, setGroups] = useState<
    { year: string; batches: string[] }[]
  >([]);

  // ---------------- LOAD YEAR + BATCH ----------------
  useEffect(() => {
    fetch(`${BASE}/interngo/users`)
      .then((r) => r.json())
      .then((users) => {
        const map: Record<string, Map<string, string>> = {};

users
  .filter((u: any) => u.role === "intern")
  .forEach((u: any) => {
    if (!u.year || !u.batch) return;

    const year = String(u.year).trim();
    const rawBatch = String(u.batch).trim();

    const normalized = normalizeBatch(rawBatch);

    if (!map[year]) map[year] = new Map();

    if (!map[year].has(normalized)) {
      const num = rawBatch.replace(/[^0-9]/g, "");
      const display = num ? `Batch-${num}` : rawBatch;

      map[year].set(normalized, display);
    }
  });

setGroups(
  Object.keys(map)
  .sort((a, b) => parseInt(b) - parseInt(a))
  .map((year) => ({
    year,
    batches: Array.from(map[year].values()),
  }))
);

      });
  }, []);

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

  const monthNames = Array.from({ length: 12 }).map((_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  // -----------------------------------------------------------------------

  return (
    <div className="relative min-h-[80vh] px-4 py-6">
      {/* BACKGROUND BLOBS */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full blur-3xl opacity-40 -z-10"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full blur-3xl opacity-40 bottom-0 right-0 -z-10"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

     {/* ================= MONTH + WEEK HEADER ================= */}
<div className="flex items-center justify-between mb-6 relative">
  {/* LEFT: MONTH HEADER */}
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
        onChangeMonth={(m) => {
          setSelectedMonth(m);
          const d = new Date(selectedYearNum, m, 1);
          setMonthShown(d);
          setSelectedDate(d);
          setWeekStart(startOfWeek(d));
        }}
        onChangeYear={(y) => {
          setSelectedYearNum(y);
          const d = new Date(y, selectedMonth, 1);
          setMonthShown(d);
          setSelectedDate(d);
          setWeekStart(startOfWeek(d));
        }}
        onClose={() => setShowCalendar(false)}
      />
    )}
  </div>

  {/* RIGHT: WEEK CONTROLS */}
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

{/* ================= WEEK STRIP ================= */}
<div className="mt-4">
  <WeekStrip
    weekDates={weekDates}
    today={today}
    selectedDate={selectedDate}
    isFuture={isFuture}
    onSelectDate={(d) => {
      setSelectedDate(d);
      setWeekStart(startOfWeek(d));
    }}
  />
</div>

      {/* ---------------- YEAR / BATCH ---------------- */}
      <div className="space-y-16 mt-10">
        {groups.map((g) => (
          <div key={g.year}>
            <div className="flex justify-center mb-6">
              <div className="bg-[#96C2DB]/50 px-16 py-2 rounded-2xl">
                <h3 className="text-xl font-bold">{g.year}</h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {g.batches.map((b) => (
                <motion.div
                  key={b}
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    navigate(
                      `/admin/attendance/mark/${g.year}/${b}/${yyyyMMdd(
                        selectedDate
                      )}`
                    )
                  }
                  className="cursor-pointer bg-white/70 backdrop-blur-2xl 
                    border border-[#96C2DB]/40 rounded-3xl p-6 shadow-md
                    hover:shadow-xl transition-all text-center"
                >
                  <p className="text-sm text-[#3A4750]">Batch</p>
                  <h3 className="text-xl font-bold text-[#1E2A35]">{b}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceHome;
