import React from "react";

interface WeekStripProps {
  weekDates: Date[];
  today: Date;
  selectedDate: Date;
  isFuture: (d: Date) => boolean;
  onSelectDate: (d: Date) => void;
}

const WeekStrip: React.FC<WeekStripProps> = ({
  weekDates,
  today,
  selectedDate,
  isFuture,
  onSelectDate,
}) => {
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
      {weekDates.map((d) => {
        const selected = isSameDay(selectedDate, d);
        const disabled = isFuture(d);

        return (
          <button
            key={d.toISOString()}
            onClick={() => !disabled && onSelectDate(d)}
            disabled={disabled}
            className={`w-[130px] h-[130px] 
rounded-2xl px-5 py-4
flex flex-col items-center justify-center
 border transition 
                ${
                  selected
                    ? "bg-[#3B6E8F] text-white border-[#3B6E8F]"
                    : "bg-white/70 text-[#1E2A35] border-[#96C2DB]/40"
                }
                ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#C6DFF1]/70"
                }`}
          >
            <div className="text-xs text-[#3A4750]">
              {d.toLocaleString("default", { weekday: "short" })}
            </div>
            <div className="text-2xl font-bold mt-2">{d.getDate()}</div>
            <div className="text-xs mt-1 text-[#3A4750]">
              {d.toLocaleString("default", { month: "short" })}
            </div>
            {isSameDay(today, d) && (
              <div className="text-[10px] mt-2 inline-block px-2 py-1 rounded bg-[#96C2DB]/40 text-[#1E2A35]">
                Today
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default WeekStrip;
