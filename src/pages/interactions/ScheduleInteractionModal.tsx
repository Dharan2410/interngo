


// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import CalendarPopup from "../../components/Daily/CalendarPopup";

// interface User {
//   uid: string;
//   name: string;
// }

// interface Props {
//   open: boolean;
//   data: any;
//   mentors: User[];
//   interviewers: User[];
//   interactionName: string;
//   onClose: () => void;
//   onSave: (payload: any) => void; 
//   onRemove?: () => void;
// }

// const ScheduleInteractionModal: React.FC<Props> = ({
//   open,
//   data,
//   mentors,
//   interviewers,
//   interactionName,
//   onClose,
//   onSave,
//   onRemove,
// }) => {
//   const [form, setForm] = useState<any>({});
//   const [errors, setErrors] = useState<any>({});

//   const [dropdown, setDropdown] = useState({
//     mentor: false,
//     interviewer: false,
//   });
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   const calendarRef = useRef<HTMLDivElement | null>(null);
//   const today = new Date();

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date>(today);
//   const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
//   const [selectedYear, setSelectedYear] = useState(today.getFullYear());

//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];

//   const isPastDate = (d: Date) => {
//     const t = new Date();
//     t.setHours(0,0,0,0);
//     const c = new Date(d);
//     c.setHours(0,0,0,0);
//     return c < t;
//   };

//   /* ---------------- INIT FORM ---------------- */
//   useEffect(() => {
//     if (!data) return;

//     setForm({
//       internId: data.internId,
//       internName: data.internName || "",
//       internEmail: data.internEmail || "",
//       mentorId: data.mentorId || "",
//       interviewerId: data.interviewerId || "",
//       date: data.date || "",
//       time: data.time || "",
//       duration: data.duration ? String(data.duration) : "",
//       mode: data.mode || "online",
//     });

//     setErrors({});
//   }, [data]);

//   /* ---------------- VALIDATION ---------------- */
//   const validate = () => {
//     const e: any = {};
//     if (!form.internName) e.internName = "Required";
//     if (!form.mentorId) e.mentorId = "Select mentor";
//     if (!form.interviewerId) e.interviewerId = "Select interviewer";
//     if (!form.date) e.date = "Select date";
//     if (!form.time) e.time = "Select time";
//     if (!form.duration) e.duration = "Enter duration";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const convertToMinutes = (value: string) => {
//     const num = parseFloat(value);
//     if (isNaN(num) || num <= 0) return 0;

//     // <10 → hours, >=10 → minutes
//     return num < 10 ? Math.round(num * 60) : Math.round(num);
//   };

//   const previewDuration = (value: string) => {
//     const minutes = convertToMinutes(value);
//     const hrs = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${String(hrs).padStart(2, "0")} hr ${String(mins).padStart(2, "0")} mins`;
//   };

//   if (!open) return null;

//   const inputClass =
//     "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40";

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[20000]">
//       <motion.div
//         initial={{ scale: 0.85, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl p-8 w-[90%] max-w-2xl"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-[#3B6E8F]">
//           Schedule Interaction
//         </h2>

//         <div className="grid grid-cols-2 gap-4">

//           {/* Interaction */}
//           <input value={interactionName} disabled className={`${inputClass} col-span-2`} />

//           {/* Intern (NOW EDITABLE ✅) */}
//           <input
//             value={form.internName}
//             onChange={(e) => setForm({ ...form, internName: e.target.value })}
//             className={inputClass}
//           />
//           {/* ---------------- MODE SELECT ---------------- */}
// <div className="col-span-2">
//   <p className="text-sm font-medium text-gray-600 mb-2">
//     Interaction Mode
//   </p>

//   <div className="flex gap-4">
//     {/* ONLINE */}
//     <button
//       type="button"
//       onClick={() => setForm({ ...form, mode: "online" })}
//       className={`
//         px-5 py-2 rounded-xl font-semibold border transition
//         ${
//           form.mode === "online"
//             ? "bg-[#3B6E8F] text-white border-[#3B6E8F]"
//             : "bg-white border-gray-300 hover:bg-gray-100"
//         }
//       `}
//     >
//       Online
//     </button>

//     {/* OFFLINE */}
//     <button
//       type="button"
//       onClick={() => setForm({ ...form, mode: "offline" })}
//       className={`
//         px-5 py-2 rounded-xl font-semibold border transition
//         ${
//           form.mode === "offline"
//             ? "bg-[#3B6E8F] text-white border-[#3B6E8F]"
//             : "bg-white border-gray-300 hover:bg-gray-100"
//         }
//       `}
//     >
//       Offline
//     </button>
//   </div>

//   {errors.mode && (
//     <p className="text-red-600 text-sm mt-1">
//       {errors.mode}
//     </p>
//   )}
// </div>

//           <input
//             value={form.internEmail}
//             onChange={(e) => setForm({ ...form, internEmail: e.target.value })}
//             className={inputClass}
//           />

//              {/* ================= MENTOR DROPDOWN ================= */}
//           <div className="relative">
//             <div
//               className={`${inputClass} cursor-pointer`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setDropdown({
//                   mentor: !dropdown.mentor,
//                   interviewer: false,
//                 });
//               }}
//             >
//               {mentors.find((m) => m.uid === form.mentorId)
//                 ?.name || "Select Mentor"}
//               <span className="absolute right-4 top-3">▼</span>
//             </div>

//             {dropdown.mentor && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto"
//               >
//                 {mentors.map((m) => (
//                   <div
//                     key={m.uid}
//                     className="p-2 hover:bg-[#96C2DB] cursor-pointer rounded-md"
//                     onClick={() => {
//                       setForm({ ...form, mentorId: m.uid });
//                       setErrors({ ...errors, mentorId: "" });
//                       setDropdown({ mentor: false, interviewer: false });
//                     }}
//                   >
//                     {m.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.mentorId && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.mentorId}
//               </p>
//             )}
//           </div>

//           {/* ================= INTERVIEWER DROPDOWN ================= */}
//           <div className="relative">
//             <div
//               className={`${inputClass} cursor-pointer`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setDropdown({
//                   mentor: false,
//                   interviewer: !dropdown.interviewer,
//                 });
//               }}
//             >
//               {interviewers.find(
//                 (i) => i.uid === form.interviewerId
//               )?.name || "Select Interviewer"}
//               <span className="absolute right-4 top-3">▼</span>
//             </div>

//             {dropdown.interviewer && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto"
//               >
//                 {interviewers.map((i) => (
//                   <div
//                     key={i.uid}
//                     className="p-2 hover:bg-[#96C2DB] cursor-pointer rounded-md"
//                     onClick={() => {
//                       setForm({
//                         ...form,
//                         interviewerId: i.uid,
//                       });
//                       setErrors({ ...errors, interviewerId: "" });
//                       setDropdown({ mentor: false, interviewer: false });
//                     }}
//                   >
//                     {i.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.interviewerId && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.interviewerId}
//               </p>
//             )}
//           </div>
//                     <div className="relative">
//   <input
//     readOnly
//     value={
//       selectedDate
//         ? selectedDate.toISOString().split("T")[0]
//         : ""
//     }
//     onClick={() => setShowCalendar(true)}
//     className="w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 cursor-pointer"
//     placeholder="Select date"
//   />

//   {showCalendar && (
//     <CalendarPopup
//       calendarRef={calendarRef}
//       monthNames={monthNames}
//       selectedYear={selectedYear}
//       selectedMonth={selectedMonth}
//       today={today}
//       selectedDate={selectedDate}
//       isFuture={isPastDate} 
//       onSelectDate={(date) => {
//         setSelectedDate(date);
//         setForm({
//           ...form,
//           date: date.toISOString().split("T")[0],
//         });
//         setShowCalendar(false);
//       }}
//       onChangeMonth={setSelectedMonth}
//       onChangeYear={setSelectedYear}
//       onClose={() => setShowCalendar(false)}
//     />
//   )}

//   {errors.date && (
//     <p className="text-red-600 text-sm mt-1">{errors.date}</p>
//   )}
// </div>

//           {/* Time */}
//           <input
//             type="time"
//             value={form.time}
//             onChange={(e) => setForm({ ...form, time: e.target.value })}
//             className={inputClass}
//           />

//           {/* Duration */}
//           <div className="col-span-2">
//             <input
//               type="text"
//               inputMode="decimal"
//               value={form.duration}
//               onChange={(e) => {
//                 const v = e.target.value;
//                 if (/^\d*\.?\d*$/.test(v)) {
//                   setForm({ ...form, duration: v });
//                 }
//               }}
//               className={inputClass}
//               placeholder=" Duration 1 = 1hr, 30 = 30 mins"
//             />
//             {form.duration && (
//               <p className="text-sm mt-1">
//                 Duration: <b>{previewDuration(form.duration)}</b>
//               </p>
//             )}
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-between mt-6">
//           {onRemove && (
//             <button onClick={onRemove} className="text-red-600">
//               Remove Interaction
//             </button>
//           )}

//           <div className="flex gap-4">
//             <button onClick={onClose}>Cancel</button>
//             <button
//               onClick={() =>
//                 validate() &&
//                 onSave({
//                   ...form,
//                   duration: convertToMinutes(form.duration), // ✅ DB SAFE
//                 })
//               }
//               className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ScheduleInteractionModal;




///after flow change



import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CalendarPopup from "../../components/Daily/CalendarPopup";

interface User {
  uid: string;
  name: string;
}

interface ScheduleForm {
  internId: string;
  internName: string;
  internEmail: string;

  mentorId: string;
  interviewerId: string;

  date: string;
  time: string;
  duration: string | number;

  mode: "online" | "offline";
}

interface Props {
  open: boolean;

  data: {
    internId: string;
    internName: string;
    internEmail?: string;
  };

  mentors: User[];
  interviewers: User[];

  interactionId: string;
  interactionName: string;

  metricIds: string[]; // ✅ ADD THIS

  onClose: () => void;
  onSave: (payload: any) => void;
  onRemove?: () => void;
}


const ScheduleInteractionModal: React.FC<Props> = ({
  open,
  data,
  mentors,
  interviewers,
  interactionId,
  interactionName,
  metricIds, // ✅ ADD THIS
  onClose,
  onSave,
  onRemove,
}) => {

  const [form, setForm] = useState<ScheduleForm>({
    internId: "",
    internName: "",
    internEmail: "",
    mentorId: "",
    interviewerId: "",
    date: "",
    time: "",
    duration: "",
    mode: "online",
  });

  const [errors, setErrors] = useState<any>({});
  const [dropdown, setDropdown] = useState({
    mentor: false,
    interviewer: false,
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const isPastDate = (d: Date) => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const c = new Date(d);
    c.setHours(0, 0, 0, 0);
    return c < t;
  };

  /* ---------------- INIT FORM ---------------- */
  useEffect(() => {
    if (!data) return;

    setForm((prev) => ({
      ...prev,
      internId: data.internId,
      internName: data.internName || "",
      internEmail: data.internEmail || "",
    }));

    setErrors({});
  }, [data]);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e: any = {};
    if (!form.internName) e.internName = "Required";
    if (!form.mentorId) e.mentorId = "Select mentor";
    if (!form.interviewerId) e.interviewerId = "Select interviewer";
    if (!form.date) e.date = "Select date";
    if (!form.time) e.time = "Select time";
    if (!form.duration) e.duration = "Enter duration";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const convertToMinutes = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) return 0;
    return num < 10 ? Math.round(num * 60) : Math.round(num);
  };

  const previewDuration = (value: string | number) => {
    const minutes = convertToMinutes(value);
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hrs).padStart(2, "0")} hr ${String(mins).padStart(2, "0")} mins`;
  };

  if (!open) return null;

  const inputClass =
    "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[20000]">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-[90%] max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#3B6E8F]">
          Schedule Interaction
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {/* Interaction */}
          <input
            value={interactionName}
            disabled
            className={`${inputClass} col-span-2`}
          />

          {/* Intern */}
          <input
            value={form.internName}
            onChange={(e) =>
              setForm({ ...form, internName: e.target.value })
            }
            className={inputClass}
          />

          {/* MODE */}
          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Interaction Mode
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, mode: "online" })}
                className={`px-5 py-2 rounded-xl font-semibold border ${
                  form.mode === "online"
                    ? "bg-[#3B6E8F] text-white"
                    : "bg-white"
                }`}
              >
                Online
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, mode: "offline" })}
                className={`px-5 py-2 rounded-xl font-semibold border ${
                  form.mode === "offline"
                    ? "bg-[#3B6E8F] text-white"
                    : "bg-white"
                }`}
              >
                Offline
              </button>
            </div>
          </div>

          <input
            value={form.internEmail}
            onChange={(e) =>
              setForm({ ...form, internEmail: e.target.value })
            }
            className={inputClass}
          />

          {/* Mentor */}
          <div className="relative">
            <div
              className={`${inputClass} cursor-pointer`}
              onClick={() =>
                setDropdown({ mentor: true, interviewer: false })
              }
            >
              {mentors.find((m) => m.uid === form.mentorId)?.name ||
                "Select Mentor"}
              <span className="absolute right-4 top-3">▼</span>
            </div>

            {dropdown.mentor && (
              <div className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto">
                {mentors.map((m) => (
                  <div
                    key={m.uid}
                    className="p-2 hover:bg-[#96C2DB] cursor-pointer"
                    onClick={() => {
                      setForm({ ...form, mentorId: m.uid });
                      setDropdown({ mentor: false, interviewer: false });
                    }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interviewer */}
          <div className="relative">
            <div
              className={`${inputClass} cursor-pointer`}
              onClick={() =>
                setDropdown({ mentor: false, interviewer: true })
              }
            >
              {interviewers.find(
                (i) => i.uid === form.interviewerId
              )?.name || "Select Interviewer"}
              <span className="absolute right-4 top-3">▼</span>
            </div>

            {dropdown.interviewer && (
              <div className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto">
                {interviewers.map((i) => (
                  <div
                    key={i.uid}
                    className="p-2 hover:bg-[#96C2DB] cursor-pointer"
                    onClick={() => {
                      setForm({
                        ...form,
                        interviewerId: i.uid,
                      });
                      setDropdown({ mentor: false, interviewer: false });
                    }}
                  >
                    {i.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATE */}
          <div className="relative">
            <input
              readOnly
              value={form.date}
              onClick={() => setShowCalendar(true)}
              className={inputClass}
              placeholder="Select date"
            />

            {showCalendar && (
              <CalendarPopup
                calendarRef={calendarRef}
                monthNames={monthNames}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                today={today}
                selectedDate={selectedDate}
                isFuture={isPastDate}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setForm({
                    ...form,
                    date: date.toISOString().split("T")[0],
                  });
                  setShowCalendar(false);
                }}
                onChangeMonth={setSelectedMonth}
                onChangeYear={setSelectedYear}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>

          {/* TIME */}
          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            className={inputClass}
          />

          {/* DURATION */}
          <div className="col-span-2">
            <input
              type="text"
              value={form.duration}
              onChange={(e) =>
                /^\d*\.?\d*$/.test(e.target.value) &&
                setForm({ ...form, duration: e.target.value })
              }
              className={inputClass}
              placeholder="1 = 1hr, 30 = 30 mins"
            />

            {form.duration && (
              <p className="text-sm mt-1">
                Duration:{" "}
                <b>{previewDuration(form.duration)}</b>
              </p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          {/* {onRemove && (
            <button onClick={onRemove} className="text-red-600">
              Remove Interaction
            </button>
          )} */}

          <div className="flex gap-4">
            <button onClick={onClose}>Cancel</button>

            <button
              onClick={() =>
                validate() &&
                onSave({
                  ...form,
                  interactionId,
                  interactionName,
                  metricIds,
                  duration: convertToMinutes(form.duration),
                })
              }
              className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleInteractionModal;
