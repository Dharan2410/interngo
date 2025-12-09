// // // DailyUpdateBase.tsx
// // import React, { useEffect, useMemo, useState, useRef } from "react";
// // import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useAuth } from "../context/AuthContext";
// // import { internsByBatch } from "../data/internsData"; // adjust path if needed

// // type TaskRow = {
// //   id: string;
// //   topic: string;
// //   plannedActivities: string;
// //   completedActivities: string;
// //   estimatedTime: string;
// //   actualTime: string;
// //   status: "pending" | "completed";
// // };

// // interface DailyUpdateBaseProps {
// //   role: "admin" | "mentor" | "interviewer" | "intern";
// // }

// // const batches = ["2024", "2025", "2026"];

// // const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// // const yyyyMMdd = (date: Date) =>
// //   `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// // const startOfWeek = (date: Date) => {
// //   const d = new Date(date);
// //   const day = (d.getDay() + 6) % 7;
// //   d.setDate(d.getDate() - day);
// //   d.setHours(0, 0, 0, 0);
// //   return d;
// // };
// // const addDays = (d: Date, days: number) => {
// //   const x = new Date(d);
// //   x.setDate(x.getDate() + days);
// //   return x;
// // };
// // const uid = () =>
// //   Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
// // const keyFor = (userId: string, dateIso: string, batch?: string) =>
// //   `daily_updates_${batch || "default"}_${userId}_${dateIso}`;

// // const emptyTask = (): TaskRow => ({
// //   id: uid(),
// //   topic: "",
// //   plannedActivities: "",
// //   completedActivities: "",
// //   estimatedTime: "",
// //   actualTime: "",
// //   status: "pending",
// // });

// // const DailyUpdateBase: React.FC<DailyUpdateBaseProps> = ({ role }) => {
// //   const { user } = useAuth();
// //   const userId = user?.uid || "guest";
// //   const isIntern = role === "intern";

// //   // UI states
// //   const [selectedBatch, setSelectedBatch] = useState<string>(""); // chosen batch after flip
// //   const [isFlippingBatch, setIsFlippingBatch] = useState<string | null>(null); // batch being flipped
// //   // date states
// //   const today = useMemo(() => {
// //     const d = new Date();
// //     d.setHours(0, 0, 0, 0);
// //     return d;
// //   }, []);
// //   const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(today));
// //   const [selectedDate, setSelectedDate] = useState<Date>(() => today);

// //   // store per-intern tasks when batch selected
// //   // internsTasks: { [internId]: TaskRow[] }
// //   const [internsTasks, setInternsTasks] = useState<Record<string, TaskRow[]>>({});
// //   const [popupMsg, setPopupMsg] = useState<string | null>(null);

// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   // localStorage helpers
// //   const fetchTasksFor = async (uid: string, dateIso: string, batch: string) => {
// //     const raw = localStorage.getItem(keyFor(uid, dateIso, batch));
// //     return raw ? (JSON.parse(raw) as TaskRow[]) : [];
// //   };

// //   const saveTasksFor = async (uid: string, dateIso: string, data: TaskRow[], batch: string) => {
// //     localStorage.setItem(keyFor(uid, dateIso, batch), JSON.stringify(data));
// //   };

// //   // load all interns' tasks for selected batch + date
// //   useEffect(() => {
// //     // If no batch selected (for non-interns) or if intern (we'll load only their tasks), skip here
// //     const loadBatchTasks = async () => {
// //       if (!selectedBatch) {
// //         setInternsTasks({});
// //         return;
// //       }
// //       const list = internsByBatch[selectedBatch] || [];
// //       const iso = yyyyMMdd(selectedDate);
// //       const map: Record<string, TaskRow[]> = {};
// //       for (const intern of list) {
// //         // fetch from localStorage
// //         const t = await fetchTasksFor(intern.id, iso, selectedBatch);
// //         map[intern.id] = t || [];
// //       }
// //       setInternsTasks(map);
// //     };

// //     // If intern viewing their own page, we want to load just their tasks (handled by next effect)
// //     if (!isIntern) {
// //       loadBatchTasks();
// //     }
// //   }, [selectedBatch, selectedDate]);

// //   // load current intern's tasks (editable) when intern role
// //   useEffect(() => {
// //     if (!isIntern) return;
// //     const load = async () => {
// //       const iso = yyyyMMdd(selectedDate);
// //       const t = await fetchTasksFor(userId, iso, "interns");
// //       setInternsTasks({ [userId]: t || [] });
// //     };
// //     load();
// //   }, [isIntern, userId, selectedDate]);

// //   const showPopup = (msg: string) => {
// //     setPopupMsg(msg);
// //     setTimeout(() => setPopupMsg(null), 3500);
// //   };

// //   // Intern editing helpers (applies only when isIntern)
// //   const addTaskIntern = () =>
// //     setInternsTasks((s) => ({ ...s, [userId]: [...(s[userId] || []), emptyTask()] }));
// //   const deleteTaskIntern = (taskId: string) =>
// //     setInternsTasks((s) => ({ ...s, [userId]: (s[userId] || []).filter((t) => t.id !== taskId) }));
// //   const updateTaskIntern = (taskId: string, field: keyof TaskRow, value: any) =>
// //     setInternsTasks((s) => ({
// //       ...s,
// //       [userId]: (s[userId] || []).map((r) => (r.id === taskId ? { ...r, [field]: value } : r)),
// //     }));

// //   const saveInternTasks = async () => {
// //     if (!isIntern) return;
// //     const data = internsTasks[userId] || [];
// //     for (const t of data) {
// //       if (!t.topic || !t.plannedActivities || !t.estimatedTime) {
// //         showPopup("❗ Fill Topic, Planned & Estimated Time before saving!");
// //         return;
// //       }
// //       if ((t.completedActivities && !t.actualTime) || (!t.completedActivities && t.actualTime)) {
// //         showPopup("⚠️ Fill both Completed Activities and Actual Time together!");
// //         return;
// //       }
// //     }
// //     await saveTasksFor(userId, yyyyMMdd(selectedDate), data, "interns");
// //     showPopup("✅ Tasks saved successfully!");
// //   };

// //   // Helpers for non-intern read-only display: updateTaskView is disabled (readonly),
// //   // but we might want to allow change of status view? requirement says read-only — so no updates.

// //   // Batch flip animation: user clicks a batch card -> play flip animation -> set selectedBatch
// //   const handleBatchClick = (batch: string) => {
// //     // mark flipping batch to animate
// //     setIsFlippingBatch(batch);
// //     // small delay so animation plays (350ms)
// //     setTimeout(() => {
// //       setSelectedBatch(batch);
// //       setIsFlippingBatch(null);
// //       // ensure selectedDate set to today by default
// //       setSelectedDate(today);
// //       setWeekStart(startOfWeek(today));
// //     }, 350);
// //   };

// //   // week dates
// //   const weekDates = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)), [weekStart]);

// //   // date click
// //   const onDateClick = (d: Date) => {
// //     if (d.getTime() > today.getTime()) return;
// //     setSelectedDate(d);
// //   };

// //   // render helpers
// //   const internNameById = (id: string) => {
// //     for (const k of Object.keys(internsByBatch)) {
// //       const list = internsByBatch[k] || [];
// //       const found = list.find((x) => x.id === id);
// //       if (found) return found.name;
// //     }
// //     return id;
// //   };

// //   // -------------------
// //   // RENDER
// //   // -------------------

// //   // 1) If non-intern and no batch selected -> show batch cards with flip animation
// //   if (!isIntern && !selectedBatch) {
// //     return (
// //       <div className="p-6 max-w-6xl mx-auto">
// //         <h2 className="text-xl font-semibold text-cyan-400 mb-4">Select Batch</h2>

// //         <div className="grid grid-cols-3 gap-6">
// //           {batches.map((b) => {
// //             const flipping = isFlippingBatch === b;
// //             return (
// //               <motion.div
// //                 key={b}
// //                 layout
// //                 initial={{ rotateY: 0 }}
// //                 animate={flipping ? { rotateY: 180, scale: 0.98 } : { rotateY: 0 }}
// //                 transition={{ duration: 0.35 }}
// //                 onClick={() => handleBatchClick(b)}
// //                 className="cursor-pointer bg-white/10 rounded-2xl p-6 text-center text-white select-none"
// //                 style={{ perspective: 800 }}
// //               >
// //                 {/* Visual front */}
// //                 <div className="relative">
// //                   <div className="text-2xl font-bold">Batch {b}</div>
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   }

// //   // 2) If non-intern and selectedBatch exists -> show date/week selector + show all interns updates (read-only)
// //   //    (If intern role, we render their editable UI below instead)
// //   if (!isIntern && selectedBatch) {
// //     const internList = internsByBatch[selectedBatch] || [];

// //     return (
// //       <div className="max-w-6xl mx-auto p-4">
// //         <button onClick={() => setSelectedBatch("")} className="text-sm text-cyan-300 underline mb-4">
// //           ← Back to batches
// //         </button>

// //         <h2 className="text-xl font-semibold text-cyan-400 mb-4">{`Batch ${selectedBatch} — Daily Updates (read-only)`}</h2>

// //         {/* Week / date nav */}
// //         <div className="flex justify-between items-center mb-4">
// //           <div>
// //             <button
// //               onClick={() => {
// //                 setWeekStart(startOfWeek(today));
// //                 setSelectedDate(today);
// //               }}
// //               className="px-3 py-1 bg-cyan-500/80 text-white rounded-md"
// //             >
// //               Today
// //             </button>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="p-2 bg-white/10 rounded-md">
// //               <ChevronLeft size={18} />
// //             </button>
// //             <div className="text-sm text-gray-300">{`${weekDates[0].toLocaleDateString()} → ${weekDates[6].toLocaleDateString()}`}</div>
// //             <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="p-2 bg-white/10 rounded-md">
// //               <ChevronRight size={18} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Week dates */}
// //         <div className="flex gap-3 overflow-x-auto pb-3 mb-6 no-scrollbar">
// //           {weekDates.map((d) => {
// //             const iso = yyyyMMdd(d);
// //             const selected = yyyyMMdd(selectedDate) === iso;
// //             const disabled = d.getTime() > today.getTime();
// //             return (
// //               <button
// //                 key={iso}
// //                 disabled={disabled}
// //                 onClick={() => onDateClick(d)}
// //                 className={`min-w-[120px] rounded-xl p-4 border ${selected ? "bg-cyan-400 text-black" : "bg-white/10 text-white"} ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
// //               >
// //                 <div className="text-xs">{d.toLocaleString("default", { weekday: "short" })}</div>
// //                 <div className="text-2xl font-bold mt-1">{d.getDate()}</div>
// //                 <div className="text-xs mt-1">{d.toLocaleString("default", { month: "short" })}</div>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* All interns' updates (grouped) */}
// //         <div className="space-y-6">
// //           {internList.map((intern) => {
// //             const tasks = internsTasks[intern.id] || [];
// //             return (
// //               <div key={intern.id} className="bg-white/6 border border-white/10 rounded-2xl p-4 text-white">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="font-semibold">{intern.name}</div>
// //                   <div className="text-sm text-gray-300">ID: {intern.id}</div>
// //                 </div>

// //                 {tasks.length === 0 ? (
// //                   <div className="text-sm text-gray-400">No updates for selected date.</div>
// //                 ) : (
// //                   <div className="space-y-3">
// //                     {tasks.map((t) => (
// //                       <div key={t.id} className="bg-white/5 rounded-xl p-3 grid grid-cols-12 gap-3 text-white">
// //                         {["topic", "plannedActivities", "completedActivities", "estimatedTime", "actualTime"].map(
// //                           (field, idx) => (
// //                             <div key={field} className={`col-span-${field === "completedActivities" ? "3" : "2"}`}>
// //                               <label className="text-xs text-gray-300 block mb-1">{field}</label>
// //                               <div className="text-sm">{(t as any)[field] || "-"}</div>
// //                             </div>
// //                           )
// //                         )}

// //                         <div className="col-span-2 flex flex-col items-start justify-center gap-2">
// //                           <label className="text-xs text-gray-300">Status</label>
// //                           <div className="text-sm">{t.status}</div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   }

// //   // 3) If intern: show editable view (their own tasks only)
// //   if (isIntern) {
// //     const tasks = internsTasks[userId] || [];
// //     return (
// //       <div className="max-w-6xl mx-auto p-4">
// //         <h2 className="text-xl font-semibold text-cyan-400 mb-4">My Daily Updates</h2>

// //         {/* Week / date nav */}
// //         <div className="flex justify-between items-center mb-4">
// //           <div>
// //             <button
// //               onClick={() => {
// //                 setWeekStart(startOfWeek(today));
// //                 setSelectedDate(today);
// //               }}
// //               className="px-3 py-1 bg-cyan-500/80 text-white rounded-md"
// //             >
// //               Today
// //             </button>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="p-2 bg-white/10 rounded-md">
// //               <ChevronLeft size={18} />
// //             </button>
// //             <div className="text-sm text-gray-300">{`${weekDates[0].toLocaleDateString()} → ${weekDates[6].toLocaleDateString()}`}</div>
// //             <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="p-2 bg-white/10 rounded-md">
// //               <ChevronRight size={18} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Week dates */}
// //         <div className="flex gap-3 overflow-x-auto pb-3 mb-6 no-scrollbar">
// //           {weekDates.map((d) => {
// //             const iso = yyyyMMdd(d);
// //             const selected = yyyyMMdd(selectedDate) === iso;
// //             const disabled = d.getTime() > today.getTime();
// //             return (
// //               <button
// //                 key={iso}
// //                 disabled={disabled}
// //                 onClick={() => onDateClick(d)}
// //                 className={`min-w-[120px] rounded-xl p-4 border ${selected ? "bg-cyan-400 text-black" : "bg-white/10 text-white"} ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
// //               >
// //                 <div className="text-xs">{d.toLocaleString("default", { weekday: "short" })}</div>
// //                 <div className="text-2xl font-bold mt-1">{d.getDate()}</div>
// //                 <div className="text-xs mt-1">{d.toLocaleString("default", { month: "short" })}</div>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* Editable tasks */}
// //         <div className="space-y-4">
// //           {tasks.length === 0 && <div className="text-sm text-gray-400">No tasks yet — click "Add Task"</div>}
// //           {tasks.map((t) => (
// //             <div key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
// //               <div className="grid grid-cols-12 gap-3">
// //                 {["topic", "plannedActivities", "completedActivities", "estimatedTime", "actualTime"].map((field) => (
// //                   <div key={field} className={`col-span-${field === "completedActivities" ? "3" : "2"}`}>
// //                     <input
// //                       type={field.includes("Time") ? "number" : "text"}
// //                       placeholder={field}
// //                       value={t[field as keyof TaskRow] as string}
// //                       onChange={(e) => updateTaskIntern(t.id, field as keyof TaskRow, e.target.value)}
// //                       className="w-full p-2 rounded-md bg-transparent border border-white/10"
// //                     />
// //                   </div>
// //                 ))}
// //                 <div className="col-span-2 flex items-center gap-2">
// //                   <select
// //                     value={t.status}
// //                     onChange={(e) => updateTaskIntern(t.id, "status", e.target.value as any)}
// //                     className="p-2 rounded-md bg-transparent border border-white/10 text-white"
// //                   >
// //                     <option value="pending">Pending</option>
// //                     <option value="completed">Completed</option>
// //                   </select>
// //                   <button onClick={() => deleteTaskIntern(t.id)} className="ml-auto p-2 bg-red-600 rounded-md">
// //                     <Trash2 size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex gap-3 mt-6">
// //           <button onClick={addTaskIntern} className="bg-cyan-500 px-4 py-2 rounded text-white flex items-center gap-2">
// //             <Plus size={16} /> Add Task
// //           </button>
// //           <button onClick={saveInternTasks} className="bg-indigo-600 px-4 py-2 rounded text-white">
// //             Save Tasks
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // default fallback
// //   return null;
// // };

// // export default DailyUpdateBase;





// // DailyUpdateBase.tsx
// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { internsByBatch } from "../data/internsData"; // adjust path if needed

// type TaskRow = {
//   id: string;
//   topic: string;
//   plannedActivities: string;
//   completedActivities: string;
//   estimatedTime: string;
//   actualTime: string;
//   status: "pending" | "completed";
// };

// interface DailyUpdateBaseProps {
//   role: "admin" | "mentor" | "interviewer" | "intern";
// }

// const batches = ["2024", "2025", "2026"];

// const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// const yyyyMMdd = (date: Date) =>
//   `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

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

// const keyFor = (userId: string, dateIso: string, batch?: string) =>
//   `daily_updates_${batch || "default"}_${userId}_${dateIso}`;

// const emptyTask = (): TaskRow => ({
//   id: uid(),
//   topic: "",
//   plannedActivities: "",
//   completedActivities: "",
//   estimatedTime: "",
//   actualTime: "",
//   status: "pending",
// });

// const DailyUpdateBase: React.FC<DailyUpdateBaseProps> = ({ role }) => {
//   const { user } = useAuth();
//   const userId = user?.uid || "guest";
//   const isIntern = role === "intern";

//   // 🔹 UI state
//   const [selectedBatch, setSelectedBatch] = useState<string>("");
//   const [isFlippingBatch, setIsFlippingBatch] = useState<string | null>(null);

//   // 🔹 Date state
//   const today = useMemo(() => {
//     const d = new Date();
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }, []);

//   const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(today));
//   const [selectedDate, setSelectedDate] = useState<Date>(() => today);

//   // 🔹 Per-intern tasks map
//   const [internsTasks, setInternsTasks] = useState<Record<string, TaskRow[]>>({});
//   const [popupMsg, setPopupMsg] = useState<string | null>(null);

//   const scrollRef = useRef<HTMLDivElement>(null);

//   // 🔹 Storage helpers
//   const fetchTasksFor = async (uid: string, dateIso: string, batch: string) => {
//     const raw = localStorage.getItem(keyFor(uid, dateIso, batch));
//     return raw ? (JSON.parse(raw) as TaskRow[]) : [];
//   };

//   const saveTasksFor = async (
//     uid: string,
//     dateIso: string,
//     data: TaskRow[],
//     batch: string
//   ) => {
//     localStorage.setItem(keyFor(uid, dateIso, batch), JSON.stringify(data));
//   };

//   // 🔹 Load all interns' tasks for selected batch + date (non-interns)
//   useEffect(() => {
//     const loadBatchTasks = async () => {
//       if (!selectedBatch) {
//         setInternsTasks({});
//         return;
//       }
//       const list = internsByBatch[selectedBatch] || [];
//       const iso = yyyyMMdd(selectedDate);
//       const map: Record<string, TaskRow[]> = {};
//       for (const intern of list) {
//         const t = await fetchTasksFor(intern.id, iso, selectedBatch);
//         map[intern.id] = t || [];
//       }
//       setInternsTasks(map);
//     };

//     if (!isIntern) {
//       loadBatchTasks();
//     }
//   }, [selectedBatch, selectedDate, isIntern]);

//   // 🔹 Load current intern's tasks when role === intern
//   useEffect(() => {
//     if (!isIntern) return;
//     const load = async () => {
//       const iso = yyyyMMdd(selectedDate);
//       const t = await fetchTasksFor(userId, iso, "interns");
//       setInternsTasks({ [userId]: t || [] });
//     };
//     load();
//   }, [isIntern, userId, selectedDate]);

//   const showPopup = (msg: string) => {
//     setPopupMsg(msg);
//     setTimeout(() => setPopupMsg(null), 3500);
//   };

//   // 🔹 Intern-only editing helpers
//   const addTaskIntern = () =>
//     setInternsTasks((s) => ({
//       ...s,
//       [userId]: [...(s[userId] || []), emptyTask()],
//     }));

//   const deleteTaskIntern = (taskId: string) =>
//     setInternsTasks((s) => ({
//       ...s,
//       [userId]: (s[userId] || []).filter((t) => t.id !== taskId),
//     }));

//   const updateTaskIntern = (
//     taskId: string,
//     field: keyof TaskRow,
//     value: any
//   ) =>
//     setInternsTasks((s) => ({
//       ...s,
//       [userId]: (s[userId] || []).map((r) =>
//         r.id === taskId ? { ...r, [field]: value } : r
//       ),
//     }));

//   const saveInternTasks = async () => {
//     if (!isIntern) return;
//     const data = internsTasks[userId] || [];

//     for (const t of data) {
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

//     await saveTasksFor(userId, yyyyMMdd(selectedDate), data, "interns");
//     showPopup("✅ Tasks saved successfully!");
//   };

//   // 🔹 Batch flip animation
//   const handleBatchClick = (batch: string) => {
//     setIsFlippingBatch(batch);
//     setTimeout(() => {
//       setSelectedBatch(batch);
//       setIsFlippingBatch(null);
//       setSelectedDate(today);
//       setWeekStart(startOfWeek(today));
//     }, 350);
//   };

//   // 🔹 Week & date logic
//   const weekDates = useMemo(
//     () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
//     [weekStart]
//   );

//   const onDateClick = (d: Date) => {
//     if (d.getTime() > today.getTime()) return;
//     setSelectedDate(d);
//   };

//   // -------------------------------
//   // CONTENT BRANCHES (no UI yet)
//   // -------------------------------
//   let content: React.ReactNode = null;

//   // 1️⃣ Non-intern, no batch selected → Batch grid with flip
//   if (!isIntern && !selectedBatch) {
//     content = (
//       <div>
//         <h2 className="text-2xl font-semibold text-[#1E2A35] mb-4">
//           Select a <span className="text-[#3B6E8F]">Batch</span> to view daily
//           updates
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {batches.map((b) => {
//             const flipping = isFlippingBatch === b;
//             return (
//               <motion.div
//                 key={b}
//                 layout
//                 initial={{ rotateY: 0 }}
//                 animate={flipping ? { rotateY: 180, scale: 0.98 } : { rotateY: 0 }}
//                 transition={{ duration: 0.35 }}
//                 onClick={() => handleBatchClick(b)}
//                 className="
//                   cursor-pointer rounded-2xl p-6 text-center select-none
//                   bg-white/80 border border-[#96C2DB]/40 shadow-md
//                   hover:shadow-lg hover:-translate-y-1 transition-all
//                 "
//                 style={{ perspective: 800 }}
//               >
//                 <div className="text-sm uppercase tracking-wide text-[#3A4750] mb-1">
//                   Intern Batch
//                 </div>
//                 <div className="text-2xl font-bold text-[#1E2A35]">
//                   {b}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   // 2️⃣ Non-intern, batch selected → Read-only daily updates for all interns
//   if (!isIntern && selectedBatch) {
//     const internList = internsByBatch[selectedBatch] || [];

//     content = (
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <button
//               onClick={() => setSelectedBatch("")}
//               className="px-3 py-1 rounded-md text-xs font-medium
//                 bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]"
//             >
//               Back to batches
//             </button>
//             <h2 className="text-2xl font-semibold text-[#1E2A35] mt-2">
//               Batch <span className="text-[#3B6E8F]">{selectedBatch}</span> —
//               Daily Updates
//             </h2>
           
//           </div>

//           {/* Week / date nav */}
//           <div className="flex flex-col items-end gap-2">
//             <button
//               onClick={() => {
//                 setWeekStart(startOfWeek(today));
//                 setSelectedDate(today);
//               }}
//               className="
//                 px-3 py-1 rounded-md text-xs font-medium
//                 bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]
//               "
//             >
//               Go to Today
//             </button>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, -7))}
//                 className="p-2 rounded-md bg-white/80 border border-[#96C2DB]/40 hover:bg-white"
//               >
//                 <ChevronLeft size={18} className="text-[#1E2A35]" />
//               </button>
//               <div className="text-xs sm:text-sm text-[#3A4750] text-center">
//                 {weekDates[0].toLocaleDateString()} →{" "}
//                 {weekDates[6].toLocaleDateString()}
//               </div>
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, 7))}
//                 className="p-2 rounded-md bg-white/80 border border-[#96C2DB]/40 hover:bg-white"
//               >
//                 <ChevronRight size={18} className="text-[#1E2A35]" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Week date pills */}
//         <div
//           ref={scrollRef}
//           className="flex gap-3 overflow-x-auto pb-3 mb-6 no-scrollbar"
//         >
//           {weekDates.map((d) => {
//             const iso = yyyyMMdd(d);
//             const selected = yyyyMMdd(selectedDate) === iso;
//             const disabled = d.getTime() > today.getTime();

//             return (
//               <button
//                 key={iso}
//                 disabled={disabled}
//                 onClick={() => onDateClick(d)}
//                 className={`
//                   min-w-[120px] rounded-2xl px-4 py-3 border text-left transition-all
//                   ${
//                     selected
//                       ? "bg-[#96C2DB] text-[#08212d] border-[#3B6E8F]"
//                       : "bg-white/80 text-[#1E2A35] border-[#96C2DB]/40"
//                   }
//                   ${
//                     disabled
//                       ? "opacity-40 cursor-not-allowed"
//                       : "hover:-translate-y-1 hover:shadow-md"
//                   }
//                 `}
//               >

                
//                 <div className="text-xs uppercase tracking-wide">
//                   {d.toLocaleString("default", { weekday: "short" })}
//                 </div>
//                 <div className="text-2xl font-bold leading-none mt-1">
//                   {d.getDate()}
//                 </div>
//                 <div className="text-xs mt-1">
//                   {d.toLocaleString("default", { month: "short" })}
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Interns grouped updates */}
//         <div className="space-y-6">
//           {internList.map((intern) => {
//             const tasks = internsTasks[intern.id] || [];
//             return (
//               <div
//                 key={intern.id}
//                 className="
//                   rounded-2xl p-4 sm:p-5
//                   bg-white/85 border border-[#96C2DB]/40 shadow-sm
//                 "
//               >
//                 <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//                   <div>
//                     <div className="font-semibold text-[#1E2A35]">
//                       {intern.name}
//                     </div>
//                     <div className="text-xs text-[#3A4750]">
//                       Intern ID: {intern.id}
//                     </div>
//                   </div>
//                   <div className="text-xs text-[#3A4750]">
//                     Date:{" "}
//                     <span className="font-medium">
//                       {selectedDate.toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>

//                 {tasks.length === 0 ? (
//                   <div className="text-sm text-[#3A4750] italic">
//                     No updates submitted for this date.
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {tasks.map((t) => (
//                       <div
//                         key={t.id}
//                         className="
//                           rounded-xl p-3 grid grid-cols-12 gap-3
//                           bg-[#E5EDF1] border border-[#96C2DB]/40
//                         "
//                       >
//                         {[
//                           "topic",
//                           "plannedActivities",
//                           "completedActivities",
//                           "estimatedTime",
//                           "actualTime",
//                         ].map((field) => (
//                           <div
//                             key={field}
//                             className={`col-span-${
//                               field === "completedActivities" ? "3" : "2"
//                             } min-w-[120px]`}
//                           >
//                             <div className="text-[11px] uppercase tracking-wide text-[#3A4750] mb-1">
//                               {field}
//                             </div>
//                             <div className="text-sm text-[#1E2A35]">
//                               {(t as any)[field] || "-"}
//                             </div>
//                           </div>
//                         ))}

//                         <div className="col-span-2 flex flex-col justify-center">
//                           <div className="text-[11px] uppercase tracking-wide text-[#3A4750] mb-1">
//                             Status
//                           </div>
//                           <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
//                             bg-[#96C2DB] text-[#08212d]
//                           ">
//                             {t.status === "completed" ? "Completed" : "Pending"}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   // 3️⃣ Intern view – editable tasks
//   if (isIntern) {
//     const tasks = internsTasks[userId] || [];

//     content = (
//       <div>
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//           <div>
//             <h2 className="text-2xl font-semibold text-[#1E2A35]">
//               My <span className="text-[#3B6E8F]">Daily Updates</span>
//             </h2>
//             <p className="text-sm text-[#3A4750]">
//               Plan, track and complete your daily internship tasks.
//             </p>
//           </div>

//           {/* Week / date nav */}
//           <div className="flex flex-col items-end gap-2">
//             <button
//               onClick={() => {
//                 setWeekStart(startOfWeek(today));
//                 setSelectedDate(today);
//               }}
//               className="
//                 px-3 py-1 rounded-md text-xs font-medium
//                 bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]
//               "
//             >
//               Go to Today
//             </button>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, -7))}
//                 className="p-2 rounded-md bg-white/80 border border-[#96C2DB]/40 hover:bg-white"
//               >
//                 <ChevronLeft size={18} className="text-[#1E2A35]" />
//               </button>
//               <div className="text-xs sm:text-sm text-[#3A4750] text-center">
//                 {weekDates[0].toLocaleDateString()} →{" "}
//                 {weekDates[6].toLocaleDateString()}
//               </div>
//               <button
//                 onClick={() => setWeekStart(addDays(weekStart, 7))}
//                 className="p-2 rounded-md bg-white/80 border border-[#96C2DB]/40 hover:bg-white"
//               >
//                 <ChevronRight size={18} className="text-[#1E2A35]" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Week date pills */}
//         <div
//           ref={scrollRef}
//           className="flex gap-3 overflow-x-auto pb-3 mb-6 no-scrollbar"
//         >
//           {weekDates.map((d) => {
//             const iso = yyyyMMdd(d);
//             const selected = yyyyMMdd(selectedDate) === iso;
//             const disabled = d.getTime() > today.getTime();

//             return (
//               <button
//                 key={iso}
//                 disabled={disabled}
//                 onClick={() => onDateClick(d)}
//                 className={`
//                   min-w-[120px] rounded-2xl px-4 py-3 border text-left transition-all
//                   ${
//                     selected
//                       ? "bg-[#96C2DB] text-[#08212d] border-[#3B6E8F]"
//                       : "bg-white/80 text-[#1E2A35] border-[#96C2DB]/40"
//                   }
//                   ${
//                     disabled
//                       ? "opacity-40 cursor-not-allowed"
//                       : "hover:-translate-y-1 hover:shadow-md"
//                   }
//                 `}
//               >
//                 <div className="text-xs uppercase tracking-wide">
//                   {d.toLocaleString("default", { weekday: "short" })}
//                 </div>
//                 <div className="text-2xl font-bold leading-none mt-1">
//                   {d.getDate()}
//                 </div>
//                 <div className="text-xs mt-1">
//                   {d.toLocaleString("default", { month: "short" })}
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Editable tasks */}
//         <div className="space-y-4">
//           {tasks.length === 0 && (
//             <div className="text-sm text-[#3A4750] italic">
//               No tasks added yet — use “Add Task” to start your day.
//             </div>
//           )}

//           {tasks.map((t) => (
//             <div
//               key={t.id}
//               className="
//                 rounded-2xl p-4
//                 bg-white/85 border border-[#96C2DB]/40 shadow-sm
//               "
//             >
//               <div className="grid grid-cols-12 gap-3">
//                 {[
//                   "topic",
//                   "plannedActivities",
//                   "completedActivities",
//                   "estimatedTime",
//                   "actualTime",
//                 ].map((field) => (
//                   <div
//                     key={field}
//                     className={`col-span-${
//                       field === "completedActivities" ? "3" : "2"
//                     } min-w-[140px]`}
//                   >
//                     <input
//                       type={field.includes("Time") ? "number" : "text"}
//                       placeholder={field}
//                       value={t[field as keyof TaskRow] as string}
//                       onChange={(e) =>
//                         updateTaskIntern(
//                           t.id,
//                           field as keyof TaskRow,
//                           e.target.value
//                         )
//                       }
//                       className="
//                         w-full p-2 rounded-lg text-sm
//                         bg-white border border-[#96C2DB]/40
//                         placeholder-gray-500 text-[#1E2A35]
//                         focus:outline-none focus:ring-2 focus:ring-[#96C2DB]
//                       "
//                     />
//                   </div>
//                 ))}

//                 <div className="col-span-2 flex items-center gap-2">
//                   <select
//                     value={t.status}
//                     onChange={(e) =>
//                       updateTaskIntern(t.id, "status", e.target.value as any)
//                     }
//                     className="
//                       p-2 rounded-lg text-sm
//                       bg-white border border-[#96C2DB]/40 text-[#1E2A35]
//                       focus:outline-none focus:ring-2 focus:ring-[#96C2DB]
//                     "
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                   <button
//                     onClick={() => deleteTaskIntern(t.id)}
//                     className="
//                       ml-auto p-2 rounded-lg
//                       bg-red-500 text-white text-xs
//                       hover:bg-red-600
//                     "
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="flex flex-wrap gap-3 mt-6">
//           <button
//             onClick={addTaskIntern}
//             className="
//               inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
//               bg-[#96C2DB] text-[#08212d] hover:bg-[#7DB3CE]
//               shadow-md hover:shadow-lg transition-all
//             "
//           >
//             <Plus size={16} /> Add Task
//           </button>
//           <button
//             onClick={saveInternTasks}
//             className="
//               inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
//               bg-[#3B6E8F] text-white hover:bg-[#2c5670]
//               shadow-md hover:shadow-lg transition-all
//             "
//           >
//             Save Tasks
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // fallback
//   if (!content) return null;

//   // -------------------------------
//   // WRAP CONTENT IN PREMIUM LAGOON UI
//   // -------------------------------
//   return (
//     <div className="relative min-h-[70vh] flex items-start justify-center px-2 sm:px-4 py-6">
//       {/* 🌊 Soft Blue Blobs (background, like SignIn) */}
//       <motion.div
//         className="absolute w-64 sm:w-80 h-64 sm:h-80 bg-[#C6DFF1] rounded-full mix-blend-multiply filter blur-3xl opacity-60 top-0 left-0 -translate-x-1/3 -translate-y-1/3 pointer-events-none"
//         animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
//         transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute w-64 sm:w-80 h-64 sm:h-80 bg-[#A4C7DF] rounded-full mix-blend-multiply filter blur-3xl opacity-60 bottom-0 right-0 translate-x-1/4 translate-y-1/4 pointer-events-none"
//         animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
//         transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* 🔔 Popup Toast */}
//       <AnimatePresence>
//         {popupMsg && (
//           <motion.div
//             initial={{ opacity: 0, x: 80, y: -10 }}
//             animate={{ opacity: 1, x: 0, y: 0 }}
//             exit={{ opacity: 0, x: 80 }}
//             transition={{ duration: 0.25 }}
//             className="
//               fixed top-6 right-4 sm:right-10
//               px-4 py-3 rounded-xl shadow-lg z-50
//               bg-[#3B6E8F] text-white text-sm
//             "
//           >
//             {popupMsg}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 💎 Glass Card Wrapper (like SignIn) */}
//       <motion.div
//         initial={{ opacity: 0, y: 25, scale: 0.97 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="
//           relative w-full max-w-6xl
//           bg-white/60 backdrop-blur-2xl
//           border border-[#96C2DB]/40
//           shadow-xl rounded-3xl
//           p-5 sm:p-7 md:p-8
//           z-10
//         "
//       >
//         {content}
//       </motion.div>
//     </div>
//   );
// };

// export default DailyUpdateBase;
