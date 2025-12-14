
import React from "react";
import { Plus } from "lucide-react";

interface SelectedDateCardProps {
  label?: string;
  selectedDate: Date;
  totalHours: number;
  totalMinutes: number;
  isToday: boolean;
  onAddTask?: () => void;

  showTotalTime?: boolean; // 🔥 NEW PROP
}

const SelectedDateCard: React.FC<SelectedDateCardProps> = ({
  label = "Selected Date",
  selectedDate,
  totalHours,
  totalMinutes,
  isToday,
  onAddTask,
  showTotalTime = true, // default = true for interns
}) => {
  const headerDateLabel = (d: Date) =>
    `${d.toLocaleString("default", { weekday: "short" })}, ${d.getDate()} ${d.toLocaleString(
      "default",
      { month: "short" }
    )} ${d.getFullYear()}`;

  return (
    <div className="flex justify-between mb-4">
      <div>
        <div className="text-sm text-[#3A4750]">{label}</div>
        <div className="text-xl font-semibold text-[#3B6E8F]">
          {headerDateLabel(selectedDate)}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {showTotalTime && (
          <div className="bg-white/70 border border-[#96C2DB]/40 rounded-xl px-4 py-2">
            <div className="text-xs text-[#3A4750]">Total Time</div>
            <div className="text-lg font-bold text-[#3B6E8F]">
              {totalHours}h {totalMinutes}m
            </div>
          </div>
        )}

        {isToday && onAddTask && (
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 bg-[#3B6E8F] hover:bg-[#3B6E8F]/80 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            <Plus size={16} /> Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedDateCard;
