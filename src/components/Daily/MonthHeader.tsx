import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthHeaderProps {
  monthLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onToggleCalendar: () => void;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({
  monthLabel,
  onPrevMonth,
  onNextMonth,
  onToday,
  onToggleCalendar,
}) => {
  return (
    <div className="flex items-center gap-4 relative">
      {/* Month label (fixed width so arrows don't move) */}
      <div className="w-48 text-center">
        <button
          onClick={onToggleCalendar}
          className="text-2xl font-bold text-[#3B6E8F] hover:text-[#1E2A35] transition w-full"
        >
          {monthLabel}
        </button>
      </div>

      {/* Month arrows */}
      <button
        onClick={onPrevMonth}
        className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
      >
        <ChevronLeft size={18} className="text-[#3B6E8F]" />
      </button>
      <button
        onClick={onNextMonth}
        className="p-2 bg-white/70 border border-[#96C2DB]/60 rounded-lg hover:bg-[#C6DFF1]/60"
      >
        <ChevronRight size={18} className="text-[#3B6E8F]" />
      </button>

      {/* Today button */}
      <button
        onClick={onToday}
        className="px-3 py-1 bg-[#3B6E8F] hover:bg-[#3B6E8F]/80 text-white text-sm rounded-md shadow-sm"
      >
        Today
      </button>
    </div>
  );
};

export default MonthHeader;
