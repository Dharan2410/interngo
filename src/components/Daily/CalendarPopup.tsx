import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface CalendarPopupProps {
  calendarRef: React.RefObject<HTMLDivElement | null>;
  monthNames: string[];
  selectedYear: number;
  selectedMonth: number;
  today: Date;
  selectedDate: Date;
  isFuture: (d: Date) => boolean;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  onClose: () => void;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  calendarRef,
  monthNames,
  selectedYear,
  selectedMonth,
  today,
  selectedDate,
  isFuture,
  onSelectDate,
  onChangeMonth,
  onChangeYear,
  onClose,
}) => {
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sun

  const calendarCells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }).map(() => null),
    ...Array.from({ length: daysInMonth }).map((_, i) => i + 1),
  ];

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handlePrevMonth = () => {
    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    onChangeYear(newYear);
    onChangeMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    onChangeYear(newYear);
    onChangeMonth(newMonth);
  };

  return (
    <div
      ref={calendarRef}
      className="absolute top-12 left-0 bg-white/80 backdrop-blur-2xl 
                 border border-[#96C2DB]/40 rounded-2xl p-5 
                 text-[#1E2A35] shadow-xl z-50 w-72"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-semibold text-[#3A4750]">
            Select Date
          </div>
          <div className="text-base font-bold">
            {monthNames[selectedMonth]} {selectedYear}
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-3 py-1 rounded-lg bg-[#3B6E8F] text-white text-xs font-semibold hover:bg-[#3B6E8F]/80"
        >
          Close
        </button>
      </div>

      {/* Month & Year controls */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-md border border-[#96C2DB]/60 bg-white/70 hover:bg-[#C6DFF1]/60"
        >
          <ChevronLeft size={16} className="text-[#3B6E8F]" />
        </button>

        <select
          value={selectedMonth}
          onChange={(e) => {
            const newMonth = Number(e.target.value);
            onChangeMonth(newMonth);
          }}
          className="flex-1 bg-white/70 border border-[#96C2DB]/60 rounded-lg px-2 py-1 text-sm text-[#1E2A35] focus:outline-none"
        >
          {monthNames.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={selectedYear}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!Number.isNaN(val)) {
              onChangeYear(val);
            }
          }}
          className="w-20 bg-white/70 border border-[#96C2DB]/60 rounded-lg px-2 py-1 text-sm text-[#1E2A35] focus:outline-none"
        />

        <button
          onClick={handleNextMonth}
          className="p-1 rounded-md border border-[#96C2DB]/60 bg-white/70 hover:bg-[#C6DFF1]/60"
        >
          <ChevronRight size={16} className="text-[#3B6E8F]" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#3A4750] mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarCells.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="h-9" />;
          }
          const dateObj = new Date(selectedYear, selectedMonth, day);
          const disabled = isFuture(dateObj);
          const selected = isSameDay(selectedDate, dateObj);
          const isTodayDate = isSameDay(today, dateObj);

          let classes =
            "w-9 h-9 flex items-center justify-center rounded-full text-sm transition ";
          if (disabled) {
            classes += "text-gray-400 cursor-not-allowed bg-transparent";
          } else if (selected) {
            classes += "bg-[#3B6E8F] text-white font-semibold shadow-md";
          } else {
            classes +=
              "bg-white text-[#1E2A35] hover:bg-[#C6DFF1]/70 cursor-pointer";
          }
          if (isTodayDate && !selected && !disabled) {
            classes += " border border-[#3B6E8F]";
          }

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => !disabled && onSelectDate(dateObj)}
              className={classes}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPopup;
