





import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CalendarPopup from "../../components/Daily/CalendarPopup";
interface User {
  uid: string;
  name: string;
}

interface Props {
  open: boolean;
  data: any;
  mentors: User[];
  interviewers: User[];
  interactionName: string;
  onClose: () => void;
  onSave: (payload: any) => void;
  onRemove?: () => void;
}

const ScheduleInteractionModal: React.FC<Props> = ({
  open,
  data,
  mentors,
  interviewers,
  interactionName,
  onClose,
  onSave,
  onRemove,
}) => {
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const [dropdown, setDropdown] = useState({
    mentor: false,
    interviewer: false,
  });


  const calendarRef = useRef<HTMLDivElement | null>(null);

const today = new Date();
const [showCalendar, setShowCalendar] = useState(false);

const [selectedDate, setSelectedDate] = useState<Date>(
  data?.date ? new Date(data.date) : today
);

const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// Disable future dates (reuse your logic)
// const isFuture = (d: Date) => d > today;

const isPastDate = (d: Date) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0); // normalize today

  const checkDate = new Date(d);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate < todayDate;
};


useEffect(() => {
  if (showCalendar) {
    const t = new Date();

    setSelectedDate(t);
    setSelectedMonth(t.getMonth());
    setSelectedYear(t.getFullYear());
  }
}, [showCalendar]);



  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- INIT FORM ---------------- */
  useEffect(() => {
    if (!data) return;

    setForm({
      internId: data.internId,
      internName: data.internName,
      internEmail: data.internEmail || "",
      mentorId: data.mentorId || "",
      interviewerId: data.interviewerId || "",
      date: data.date || "",
      time: data.time || "",
      duration: data.duration || "",
    });

    setErrors({});
  }, [data]);

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = () =>
      setDropdown({ mentor: false, interviewer: false });
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  if (!open) return null;

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e: any = {};

    if (!form.mentorId) e.mentorId = "Please select a mentor";
    if (!form.interviewerId)
      e.interviewerId = "Please select an interviewer";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    if (!form.duration) e.duration = "Please enter duration";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatDuration = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hStr = String(hrs).padStart(2, "0");
  const mStr = String(mins).padStart(2, "0");

  return `${hStr} hr ${mStr} mins`;
};


  const inputClass =
    "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] backdrop-blur-md outline-none";

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

        {/* FORM */}
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
            disabled
            className={inputClass}
          />
          <input
            value={form.internEmail}
            disabled
            className={inputClass}
          />

          {/* ================= MENTOR DROPDOWN ================= */}
          <div className="relative">
            <div
              className={`${inputClass} cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setDropdown({
                  mentor: !dropdown.mentor,
                  interviewer: false,
                });
              }}
            >
              {mentors.find((m) => m.uid === form.mentorId)
                ?.name || "Select Mentor"}
              <span className="absolute right-4 top-3">▼</span>
            </div>

            {dropdown.mentor && (
              <div
                ref={dropdownRef}
                className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto"
              >
                {mentors.map((m) => (
                  <div
                    key={m.uid}
                    className="p-2 hover:bg-[#96C2DB] cursor-pointer rounded-md"
                    onClick={() => {
                      setForm({ ...form, mentorId: m.uid });
                      setErrors({ ...errors, mentorId: "" });
                      setDropdown({ mentor: false, interviewer: false });
                    }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}
            {errors.mentorId && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mentorId}
              </p>
            )}
          </div>

          {/* ================= INTERVIEWER DROPDOWN ================= */}
          <div className="relative">
            <div
              className={`${inputClass} cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setDropdown({
                  mentor: false,
                  interviewer: !dropdown.interviewer,
                });
              }}
            >
              {interviewers.find(
                (i) => i.uid === form.interviewerId
              )?.name || "Select Interviewer"}
              <span className="absolute right-4 top-3">▼</span>
            </div>

            {dropdown.interviewer && (
              <div
                ref={dropdownRef}
                className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 max-h-40 overflow-y-auto"
              >
                {interviewers.map((i) => (
                  <div
                    key={i.uid}
                    className="p-2 hover:bg-[#96C2DB] cursor-pointer rounded-md"
                    onClick={() => {
                      setForm({
                        ...form,
                        interviewerId: i.uid,
                      });
                      setErrors({ ...errors, interviewerId: "" });
                      setDropdown({ mentor: false, interviewer: false });
                    }}
                  >
                    {i.name}
                  </div>
                ))}
              </div>
            )}
            {errors.interviewerId && (
              <p className="text-red-600 text-sm mt-1">
                {errors.interviewerId}
              </p>
            )}
          </div>

          {/* DATE */}
          {/* <div>
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className={inputClass}
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1">
                {errors.date}
              </p>
            )}
          </div> */}



          <div className="relative">
  <input
    readOnly
    value={
      selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : ""
    }
    onClick={() => setShowCalendar(true)}
    className="w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 cursor-pointer"
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

  {errors.date && (
    <p className="text-red-600 text-sm mt-1">{errors.date}</p>
  )}
</div>


          {/* TIME */}
          <div>
            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className={inputClass}
            />
            {errors.time && (
              <p className="text-red-600 text-sm mt-1">
                {errors.time}
              </p>
            )}
          </div>

          {/* DURATION */}
          {/* <div className="col-span-2">
            <input
              type="number"
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration: Number(e.target.value),
                })
              }
              className={inputClass}
              placeholder="Duration (minutes)"
            />
            {errors.duration && (
              <p className="text-red-600 text-sm mt-1">
                {errors.duration}
              </p>
            )}
          </div> */}



          <div className="col-span-2">
  <input
    type="number"
    min={1}
    value={form.duration}
    onChange={(e) =>
      setForm({ ...form, duration: Number(e.target.value) })
    }
    className="w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40"
    placeholder="Enter duration in minutes"
  />

  {form.duration && (
    <p className="text-sm text-[#3A4750] mt-1">
      Duration: <b>{formatDuration(form.duration)}</b>
    </p>
  )}

  {errors.duration && (
    <p className="text-red-600 text-sm mt-1">
      {errors.duration}
    </p>
  )}
</div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-6">
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-red-600 font-semibold"
            >
              Remove Interaction
            </button>
          )}

          <div className="flex gap-4">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => validate() && onSave(form)}
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
