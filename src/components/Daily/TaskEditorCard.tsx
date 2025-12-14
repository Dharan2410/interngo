import React from "react";
import { Trash2 } from "lucide-react";

type TaskRowIntern = {
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

interface TaskEditorCardProps {
  tasks: TaskRowIntern[];
  isToday: boolean;
  normalizeTime: (value: string) => string;
  onUpdateTask: (id: string, field: keyof TaskRowIntern, value: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskEditorCard: React.FC<TaskEditorCardProps> = ({
  tasks,
  isToday,
  normalizeTime,
  onUpdateTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-sm text-[#3A4750] py-6 text-center">
        No tasks yet 
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div
          key={t.id}
          className="bg-white/80 border border-[#96C2DB]/40 rounded-xl p-4 shadow-sm"
        >
          <div className="grid grid-cols-12 gap-3">
            {[
              "topic",
              "plannedActivities",
              "completedActivities",
              "estimatedTime",
              "actualTime",
            ].map((field) => (
              <div
                key={field}
                className={`col-span-${
                  field === "completedActivities"
                    ? "3"
                    : field === "topic" || field === "plannedActivities"
                    ? "2"
                    : "1"
                }`}
              >
                <input
                  type="text"
                  placeholder={field}
                  value={
                    field === "estimatedTime" || field === "actualTime"
                      ? t.__editing === field && t.__editingId === t.id
                        ? (t[field as keyof TaskRowIntern] as string)
                        : normalizeTime(
                            t[field as keyof TaskRowIntern] as string
                          )
                      : (t[field as keyof TaskRowIntern] as string)
                  }
                  disabled={!isToday}
                  onFocus={() => {
                    onUpdateTask(t.id, "__editing", field);
                    onUpdateTask(t.id, "__editingId", t.id);
                  }}
                  onBlur={() => {
                    onUpdateTask(t.id, "__editing", "");
                  }}
                  onChange={(e) => {
                    let v = e.target.value;

                    if (field === "estimatedTime" || field === "actualTime") {
                      if (v !== "" && isNaN(parseFloat(v))) return;
                      if (parseFloat(v) < 0) return;
                      onUpdateTask(
                        t.id,
                        field as keyof TaskRowIntern,
                        v
                      );
                    } else {
                      onUpdateTask(
                        t.id,
                        field as keyof TaskRowIntern,
                        v
                      );
                    }
                  }}
                  className={`w-full p-2 rounded-md bg-white/80 border border-[#96C2DB]/40
                        text-sm text-[#1E2A35] placeholder:text-[#3A4750]/60
                        focus:outline-none focus:ring-1 focus:ring-[#3B6E8F]
                        ${!isToday ? "opacity-60 cursor-not-allowed" : ""}`}
                />
              </div>
            ))}

            <div className="col-span-2 flex items-center gap-2">
              <select
                value={t.status}
                disabled={!isToday}
                onChange={(e) =>
                  onUpdateTask(
                    t.id,
                    "status",
                    e.target.value as TaskRowIntern["status"]
                  )
                }
                className="p-2 rounded-md bg-white/80 border border-[#96C2DB]/40 text-sm text-[#1E2A35] focus:outline-none focus:ring-1 focus:ring-[#3B6E8F]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              {isToday && (
                <button
                  onClick={() => onDeleteTask(t.id)}
                  className="ml-auto p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskEditorCard;
