

// // ===========================================
// // FINAL INTERN DAILY UPDATE FILE (BACKEND API)
// // ===========================================

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// import MonthHeader from "../components/Daily/MonthHeader";
// import CalendarPopup from "../components/Daily/CalendarPopup";
// import WeekStrip from "../components/Daily/WeekStrip";
// import SelectedDateCard from "../components/Daily/SelectedDateCard";
// import TaskEditorCard from "../components/Daily/TaskEditorCard";

// import { fetchInternDaily, saveInternDaily } from "../api/dailyUpdateApi";

// // -------------------------
// // Task Type
// // -------------------------
// type TaskRow = {
//   id: string;
//   topic: string;
//   plannedActivities: string;
//   completedActivities: string;
//   estimatedTime: string;
//   actualTime: string;
//   status: "pending" | "completed";
//   __editing?: string;
//   __editingId?: string;
// };

// const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// const yyyyMMdd = (date: Date) =>
//   `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
// const monthYearLabel = (d: Date) =>
//   d.toLocaleString("default", { month: "long" }) + " " + d.getFullYear();

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

// const uid = () =>
//   Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

// // Empty task
// const emptyTask = (): TaskRow => ({
//   id: uid(),
//   topic: "",
//   plannedActivities: "",
//   completedActivities: "",
//   estimatedTime: "",
//   actualTime: "",
//   status: "pending",
// });

// // ==========================
// // MAIN COMPONENT
// // ==========================
// const DailyUpdate: React.FC = () => {
//   const { user } = useAuth();
//   const userId = user?.uid || "guest";

//   const today = useMemo(() => {
//     const d = new Date();
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }, []);

//   const [monthShown, setMonthShown] = useState<Date>(() => new Date());
//   const [weekStart, setWeekStart] = useState<Date>(() =>
//     startOfWeek(new Date())
//   );
//   const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
//   const [tasks, setTasks] = useState<TaskRow[]>([]);
//   const [popupMsg, setPopupMsg] = useState<string | null>(null);
//   const [showCalendar, setShowCalendar] = useState<boolean>(false);
//   const [selectedMonth, setSelectedMonth] = useState<number>(
//     new Date().getMonth()
//   );
//   const [selectedYear, setSelectedYear] = useState<number>(
//     new Date().getFullYear()
//   );

//   const calendarRef = useRef<HTMLDivElement>(null);

//   // -----------------------------
//   // FETCH FROM BACKEND
//   // -----------------------------
//   const fetchTasksFromBackend = async (userId: string, taskDate: string) => {
//     const record = await fetchInternDaily(userId, taskDate);
//     return record?.tasks || [];
//   };

//   // -----------------------------
//   // SAVE TO BACKEND
//   // -----------------------------
//   const saveTasksToBackend = async (userId: string, taskDate: string) => {
//     const totalMinutes = tasks.reduce((acc, t) => {
//       if (t.status === "completed") {
//         const num = parseFloat(t.actualTime || "0");
//         if (!isNaN(num) && num >= 0) {
//           let hours = Math.floor(num);
//           let minutes = Math.round((num % 1) * 100);

//           if (minutes >= 60) {
//             hours += Math.floor(minutes / 60);
//             minutes = minutes % 60;
//           }

//           return acc + hours * 60 + minutes;
//         }
//       }
//       return acc;
//     }, 0);

//     const hrs = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;

//     const payload = {
//       userId,
//       date: taskDate,
//       totalTime: `${hrs}h ${mins.toString().padStart(2, "0")}m`,
//       tasks,
//     };

//     return await saveInternDaily(userId, taskDate, payload);
//   };

//   // -----------------------------
//   // LOAD WHEN DATE CHANGES
//   // -----------------------------
//   useEffect(() => {
//     const loadTasks = async () => {
//       const iso = yyyyMMdd(selectedDate);
//       const data = await fetchTasksFromBackend(userId, iso);
//       setTasks(data);
//     };
//     loadTasks();
//   }, [userId, selectedDate]);

//   // Close calendar popup
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(e.target as Node)
//       ) {
//         setShowCalendar(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const showPopup = (msg: string) => {
//     setPopupMsg(msg);
//     setTimeout(() => setPopupMsg(null), 4000);
//   };

//   const addTask = () => setTasks((t) => [...t, emptyTask()]);
//   const deleteTask = (id: string) =>
//     setTasks((t) => t.filter((r) => r.id !== id));

//   const normalizeTime = (value: string) => {
//     let num = parseFloat(value);
//     if (isNaN(num) || num < 0) return "";

//     let hours = Math.floor(num);
//     let minutes = Math.round((num % 1) * 100);

//     if (minutes >= 60) {
//       hours += Math.floor(minutes / 60);
//       minutes = minutes % 60;
//     }

//     return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
//   };

//   const updateTask = (id: string, field: keyof TaskRow, value: string) =>
//     setTasks((t) => t.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

//   const isToday = yyyyMMdd(selectedDate) === yyyyMMdd(today);

//   // -------------------------
//   // SAVE BUTTON ACTION
//   // -------------------------
//   const saveTasks = async () => {
//     if (tasks.length === 0) {
//       showPopup("Add tasks before saving!");
//       return;
//     }

//     for (const t of tasks) {
//       if (!t.topic || !t.plannedActivities || !t.estimatedTime) {
//         showPopup("❗ Fill Topic, Planned & Estimated Time before saving!");
//         return;
//       }

//       if (
//         (t.completedActivities && !t.actualTime) ||
//         (!t.completedActivities && t.actualTime)
//       ) {
//         showPopup(
//           "⚠️ Fill both Completed Activities and Actual Time together!"
//         );
//         return;
//       }
//     }

//     const iso = yyyyMMdd(selectedDate);
//     const result = await saveTasksToBackend(userId, iso);

//     if (!result.success) {
//       showPopup("❌ Failed to save tasks!");
//       return;
//     }

//     showPopup("✅ Tasks saved successfully!");
//   };

//   // -------------------------
//   // Week logic
//   // -------------------------
//   const weekDates = useMemo(
//     () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
//     [weekStart]
//   );

//   const isFuture = (d: Date) => d.getTime() > today.getTime();

//   const onClickDate = (d: Date) => {
//     if (isFuture(d)) return;
//     setSelectedDate(d);
//     setMonthShown(d);
//     setWeekStart(startOfWeek(d));
//     setSelectedMonth(d.getMonth());
//     setSelectedYear(d.getFullYear());
//   };

//   const prevMonth = () => {
//     const d = new Date(monthShown);
//     d.setMonth(d.getMonth() - 1);
//     const first = new Date(d.getFullYear(), d.getMonth(), 1);
//     setMonthShown(first);
//     setWeekStart(startOfWeek(first));
//     setSelectedDate(first);
//     setSelectedMonth(first.getMonth());
//     setSelectedYear(first.getFullYear());
//   };

//   const nextMonth = () => {
//     const d = new Date(monthShown);
//     d.setMonth(d.getMonth() + 1);
//     const first = new Date(d.getFullYear(), d.getMonth(), 1);
//     setMonthShown(first);
//     setWeekStart(startOfWeek(first));
//     setSelectedDate(first);
//     setSelectedMonth(first.getMonth());
//     setSelectedYear(first.getFullYear());
//   };

//   const monthNames = useMemo(
//     () =>
//       Array.from({ length: 12 }).map((_, i) =>
//         new Date(0, i).toLocaleString("default", { month: "long" })
//       ),
//     []
//   );

//   const goToToday = () => {
//     const start = startOfWeek(today);
//     setWeekStart(start);
//     setSelectedDate(today);
//     setMonthShown(today);
//     setSelectedMonth(today.getMonth());
//     setSelectedYear(today.getFullYear());
//   };

//   const totalMinutes = tasks.reduce((acc, t) => {
//     if (t.status === "completed") {
//       const num = parseFloat(t.actualTime || "0");
//       if (!isNaN(num) && num >= 0) {
//         let hrs = Math.floor(num);
//         let mins = Math.round((num % 1) * 100);

//         if (mins >= 60) {
//           hrs += Math.floor(mins / 60);
//           mins = mins % 60;
//         }

//         return acc + hrs * 60 + mins;
//       }
//     }
//     return acc;
//   }, 0);

//   const hrs = Math.floor(totalMinutes / 60);
//   const mins = totalMinutes % 60;

//   // ===================================================
//   // UI STARTS HERE — NO CHANGES DONE
//   // ===================================================
//   return (
//     <>
//       {/* Popup */}
//       <AnimatePresence>
//         {popupMsg && (
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="fixed top-8 right-8 bg-[#3B6E8F] text-white px-6 py-3 rounded-xl shadow-lg z-50"
//           >
//             {popupMsg}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Background */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
//                    mix-blend-multiply blur-3xl opacity-40 
//                    top-10 left-0 -z-10"
//         animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
//         transition={{ duration: 16, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
//                    mix-blend-multiply blur-3xl opacity-40 
//                    bottom-10 right-0 -z-10"
//         animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
//         transition={{ duration: 18, repeat: Infinity }}
//       />

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="flex items-center justify-between mb-6 relative">
//           <div className="flex items-center gap-4 relative">
//             <MonthHeader
//               monthLabel={monthYearLabel(monthShown)}
//               onPrevMonth={prevMonth}
//               onNextMonth={nextMonth}
//               onToday={goToToday}
//               onToggleCalendar={() => setShowCalendar(!showCalendar)}
//             />

//             {showCalendar && (
//               <CalendarPopup
//                 calendarRef={calendarRef}
//                 monthNames={monthNames}
//                 selectedYear={selectedYear}
//                 selectedMonth={selectedMonth}
//                 today={today}
//                 selectedDate={selectedDate}
//                 isFuture={isFuture}
//                 onSelectDate={(date) => {
//                   if (isFuture(date)) return;
//                   setSelectedDate(date);
//                   setMonthShown(date);
//                   setWeekStart(startOfWeek(date));
//                   setSelectedMonth(date.getMonth());
//                   setSelectedYear(date.getFullYear());
//                   setShowCalendar(false);
//                 }}
//                 onChangeMonth={(m) => {
//                   setSelectedMonth(m);
//                   setMonthShown(new Date(selectedYear, m, 1));
//                 }}
//                 onChangeYear={(y) => {
//                   setSelectedYear(y);
//                   setMonthShown(new Date(y, selectedMonth, 1));
//                 }}
//                 onClose={() => setShowCalendar(false)}
//               />
//             )}
//           </div>

//           {/* Week Navigation */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setWeekStart((s) => addDays(s, -7))}
//               className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
//             >
//               <ChevronLeft size={18} className="text-[#3B6E8F]" />
//             </button>
//             <div className="text-sm text-[#3A4750]">Week</div>
//             <button
//               onClick={() => setWeekStart((s) => addDays(s, 7))}
//               className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
//             >
//               <ChevronRight size={18} className="text-[#3B6E8F]" />
//             </button>
//           </div>
//         </div>

//         {/* Week Strip */}
//         <WeekStrip
//           weekDates={weekDates}
//           today={today}
//           selectedDate={selectedDate}
//           isFuture={isFuture}
//           onSelectDate={onClickDate}
//         />

//         {/* Task card */}
//         <div className="bg-white/60 backdrop-blur-2xl border border-[#96C2DB]/40 rounded-3xl p-6 text-[#1E2A35] shadow-xl">
//           <SelectedDateCard
//             selectedDate={selectedDate}
//             totalHours={hrs}
//             totalMinutes={mins}
//             isToday={isToday}
//             onAddTask={isToday ? addTask : undefined}
//             showTotalTime={true}
//           />

//           <TaskEditorCard
//             tasks={tasks}
//             isToday={isToday}
//             normalizeTime={normalizeTime}
//             onUpdateTask={updateTask}
//             onDeleteTask={deleteTask}
//           />

//           {isToday && (
//             <button
//               onClick={saveTasks}
//               className="mt-6 flex items-center gap-2 bg-[#3B6E8F] hover:bg-[#3B6E8F]/80 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
//             >
//               <Plus size={16} /> Save Tasks
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DailyUpdate;










/// dharan's use for db



// ===========================================
// FINAL INTERN DAILY UPDATE FILE (BACKEND API)
// ===========================================

import React, { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import MonthHeader from "../components/Daily/MonthHeader";
import CalendarPopup from "../components/Daily/CalendarPopup";
import WeekStrip from "../components/Daily/WeekStrip";
import SelectedDateCard from "../components/Daily/SelectedDateCard";
import TaskEditorCard from "../components/Daily/TaskEditorCard";

import {
  fetchInternDaily,
  saveInternDaily,
} from "../api/dailyUpdateApi";

// -------------------------
// Task Type
// -------------------------
type TaskRow = {
  id: string;
  topic: string;
  plannedActivities: string;
  completedActivities: string;
  estimatedTime: string;
  actualTime: string;
  status: "pending" | "completed";
  __editing?: string;
  __editingId?: string;
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const yyyyMMdd = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const monthYearLabel = (d: Date) =>
  d.toLocaleString("default", { month: "long" }) + " " + d.getFullYear();

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

const uid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

// Empty task
const emptyTask = (): TaskRow => ({
  id: uid(),
  topic: "",
  plannedActivities: "",
  completedActivities: "",
  estimatedTime: "",
  actualTime: "",
  status: "pending",
});

// ==========================
// MAIN COMPONENT
// ==========================
const DailyUpdate: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || "guest";

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [monthShown, setMonthShown] = useState<Date>(() => new Date());
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(new Date())
  );
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [popupMsg, setPopupMsg] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // FETCH FROM BACKEND
  // -----------------------------
  const fetchTasksFromBackend = async (userId: string, taskDate: string) => {
    const record = await fetchInternDaily(userId, taskDate);
    return record?.tasks || [];
  };

  // -----------------------------
  // SAVE TO BACKEND
  // -----------------------------
  const saveTasksToBackend = async (userId: string, taskDate: string) => {
    const totalMinutes = tasks.reduce((acc, t) => {
      if (t.status === "completed") {
        const num = parseFloat(t.actualTime || "0");
        if (!isNaN(num) && num >= 0) {
          let hours = Math.floor(num);
          let minutes = Math.round((num % 1) * 100);

          if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
          }

          return acc + hours * 60 + minutes;
        }
      }
      return acc;
    }, 0);

    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const payload = {
      userId,
      date: taskDate,
      totalTime: `${hrs}h ${mins.toString().padStart(2, "0")}m`,
      tasks,
    };

    return await saveInternDaily(userId, taskDate, payload);
  };

  // -----------------------------
  // LOAD WHEN DATE CHANGES
  // -----------------------------
  useEffect(() => {
    const loadTasks = async () => {
      const iso = yyyyMMdd(selectedDate);
      const data = await fetchTasksFromBackend(userId, iso);
      setTasks(data);
    };
    loadTasks();
  }, [userId, selectedDate]);

  // Close calendar popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showPopup = (msg: string) => {
    setPopupMsg(msg);
    setTimeout(() => setPopupMsg(null), 4000);
  };

  const addTask = () => setTasks((t) => [...t, emptyTask()]);
  const deleteTask = (id: string) =>
    setTasks((t) => t.filter((r) => r.id !== id));

  const normalizeTime = (value: string) => {
    let num = parseFloat(value);
    if (isNaN(num) || num < 0) return "";

    let hours = Math.floor(num);
    let minutes = Math.round((num % 1) * 100);

    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }

    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };

  const updateTask = (id: string, field: keyof TaskRow, value: string) =>
    setTasks((t) => t.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const isToday = yyyyMMdd(selectedDate) === yyyyMMdd(today);

  // -------------------------
  // SAVE BUTTON ACTION
  // -------------------------
  const saveTasks = async () => {
    if (tasks.length === 0) {
      showPopup("Add tasks before saving!");
      return;
    }

    for (const t of tasks) {
      if (!t.topic || !t.plannedActivities || !t.estimatedTime) {
        showPopup("❗ Fill Topic, Planned & Estimated Time before saving!");
        return;
      }

      if (
        (t.completedActivities && !t.actualTime) ||
        (!t.completedActivities && t.actualTime)
      ) {
        showPopup(
          "⚠️ Fill both Completed Activities and Actual Time together!"
        );
        return;
      }
    }

    const iso = yyyyMMdd(selectedDate);
    const result = await saveTasksToBackend(userId, iso);

    if (!result.success) {
      showPopup("❌ Failed to save tasks!");
      return;
    }

    showPopup("✅ Tasks saved successfully!");
  };

  // -------------------------
  // Week logic
  // -------------------------
  const weekDates = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const isFuture = (d: Date) => d.getTime() > today.getTime();

  const onClickDate = (d: Date) => {
    if (isFuture(d)) return;
    setSelectedDate(d);
    setMonthShown(d);
    setWeekStart(startOfWeek(d));
    setSelectedMonth(d.getMonth());
    setSelectedYear(d.getFullYear());
  };

  const prevMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() - 1);
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    setMonthShown(first);
    setWeekStart(startOfWeek(first));
    setSelectedDate(first);
    setSelectedMonth(first.getMonth());
    setSelectedYear(first.getFullYear());
  };

  const nextMonth = () => {
    const d = new Date(monthShown);
    d.setMonth(d.getMonth() + 1);
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    setMonthShown(first);
    setWeekStart(startOfWeek(first));
    setSelectedDate(first);
    setSelectedMonth(first.getMonth());
    setSelectedYear(first.getFullYear());
  };

  const monthNames = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) =>
        new Date(0, i).toLocaleString("default", { month: "long" })
      ),
    []
  );

  const goToToday = () => {
    const start = startOfWeek(today);
    setWeekStart(start);
    setSelectedDate(today);
    setMonthShown(today);
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  const totalMinutes = tasks.reduce((acc, t) => {
    if (t.status === "completed") {
      const num = parseFloat(t.actualTime || "0");
      if (!isNaN(num) && num >= 0) {
        let hrs = Math.floor(num);
        let mins = Math.round((num % 1) * 100);

        if (mins >= 60) {
          hrs += Math.floor(mins / 60);
          mins = mins % 60;
        }

        return acc + hrs * 60 + mins;
      }
    }
    return acc;
  }, 0);

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  // ===================================================
  // UI STARTS HERE — NO CHANGES DONE
  // ===================================================
  return (
    <>
      {/* Popup */}
      <AnimatePresence>
        {popupMsg && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-8 right-8 bg-[#3B6E8F] text-white px-6 py-3 rounded-xl shadow-lg z-50"
          >
            {popupMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   top-10 left-0 -z-10"
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   bottom-10 right-0 -z-10"
        animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6 relative">
          <div className="flex items-center gap-4 relative">
            <MonthHeader
              monthLabel={monthYearLabel(monthShown)}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              onToday={goToToday}
              onToggleCalendar={() => setShowCalendar(!showCalendar)}
            />

            {showCalendar && (
              <CalendarPopup
                calendarRef={calendarRef}
                monthNames={monthNames}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                today={today}
                selectedDate={selectedDate}
                isFuture={isFuture}
                onSelectDate={(date) => {
                  if (isFuture(date)) return;
                  setSelectedDate(date);
                  setMonthShown(date);
                  setWeekStart(startOfWeek(date));
                  setSelectedMonth(date.getMonth());
                  setSelectedYear(date.getFullYear());
                  setShowCalendar(false);
                }}
                onChangeMonth={(m) => {
                  setSelectedMonth(m);
                  setMonthShown(new Date(selectedYear, m, 1));
                }}
                onChangeYear={(y) => {
                  setSelectedYear(y);
                  setMonthShown(new Date(y, selectedMonth, 1));
                }}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>

          {/* Week Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWeekStart((s) => addDays(s, -7))}
              className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
            >
              <ChevronLeft size={18} className="text-[#3B6E8F]" />
            </button>
            <div className="text-sm text-[#3A4750]">Week</div>
            <button
              onClick={() => setWeekStart((s) => addDays(s, 7))}
              className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
            >
              <ChevronRight size={18} className="text-[#3B6E8F]" />
            </button>
          </div>
        </div>

        {/* Week Strip */}
        <WeekStrip
          weekDates={weekDates}
          today={today}
          selectedDate={selectedDate}
          isFuture={isFuture}
          onSelectDate={onClickDate}
        />

        {/* Task card */}
        <div className="bg-white/60 backdrop-blur-2xl border border-[#96C2DB]/40 rounded-3xl p-6 text-[#1E2A35] shadow-xl">
          <SelectedDateCard
            selectedDate={selectedDate}
            totalHours={hrs}
            totalMinutes={mins}
            isToday={isToday}
            onAddTask={isToday ? addTask : undefined}
            showTotalTime={true} 
          />

          <TaskEditorCard
            tasks={tasks}
            isToday={isToday}
            normalizeTime={normalizeTime}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />

          {isToday && (
            <button
              onClick={saveTasks}
              className="mt-6 flex items-center gap-2 bg-[#3B6E8F] hover:bg-[#3B6E8F]/80 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              <Plus size={16} /> Save Tasks
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DailyUpdate;




