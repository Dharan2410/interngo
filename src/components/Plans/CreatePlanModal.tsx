// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import CalendarPopup from "../../components/Daily/CalendarPopup";

// const addDays = (date: Date, days: number) => {
//   const d = new Date(date);
//   d.setDate(d.getDate() + days - 1);
//   return d;
// };

// const CreatePlanModal = ({
//   open,
//   onClose,
//   onSave,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSave: (data: any) => void;
// }) => {
//   const today = new Date();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     days: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date>(today);

//   /* AUTO END DATE */
//   useEffect(() => {
//     if (!form.days || !form.startDate) return;

//     const end = addDays(
//       new Date(form.startDate),
//       Number(form.days)
//     );

//     setForm((f) => ({
//       ...f,
//       endDate: end.toISOString().split("T")[0],
//     }));
//   }, [form.days, form.startDate]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[20000]">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl p-8 w-[90%] max-w-xl"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-[#3B6E8F]">
//           Create New Plan
//         </h2>

//         <div className="space-y-4">
//           <input
//             placeholder="Plan Name"
//             className="w-full p-3 border rounded-xl"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <textarea
//             placeholder="Description"
//             className="w-full p-3 border rounded-xl"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <input
//             type="number"
//             placeholder="Number of Days"
//             className="w-full p-3 border rounded-xl"
//             value={form.days}
//             onChange={(e) =>
//               setForm({ ...form, days: e.target.value })
//             }
//           />

//           {/* START DATE */}
//           <input
//             readOnly
//             value={form.startDate}
//             onClick={() => setShowCalendar(true)}
//             placeholder="Start Date"
//             className="w-full p-3 border rounded-xl cursor-pointer"
//           />

//           {/* END DATE (EDITABLE) */}
//           <input
//             type="date"
//             value={form.endDate}
//             onChange={(e) =>
//               setForm({ ...form, endDate: e.target.value })
//             }
//             className="w-full p-3 border rounded-xl"
//           />
//         </div>

//         {showCalendar && (
//           <CalendarPopup
//             calendarRef={null}
//             monthNames={[]}
//             selectedYear={selectedDate.getFullYear()}
//             selectedMonth={selectedDate.getMonth()}
//             today={today}
//             selectedDate={selectedDate}
//             isFuture={() => false}
//             onSelectDate={(d) => {
//               setSelectedDate(d);
//               setForm({
//                 ...form,
//                 startDate: d.toISOString().split("T")[0],
//               });
//               setShowCalendar(false);
//             }}
//             onChangeMonth={() => {}}
//             onChangeYear={() => {}}
//             onClose={() => setShowCalendar(false)}
//           />
//         )}

//         <div className="flex justify-end gap-4 mt-6">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={() => onSave(form)}
//             className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
//           >
//             Create
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CreatePlanModal;
