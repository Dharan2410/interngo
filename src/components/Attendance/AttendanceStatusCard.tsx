// src/components/Attendance/AttendanceStatusCard.tsx

import React from "react";
import { motion } from "framer-motion";

interface AttendanceStatusCardProps {
  internId: string;
  name: string;
  status: string; // "present" | "absent" | "leave" | "half-day" | ""
  onChangeStatus: (userId: string, newStatus: string) => void;
}

const AttendanceStatusCard: React.FC<AttendanceStatusCardProps> = ({
  internId,
  name,
  status,
  onChangeStatus,
}) => {

  const options = [
    { label: "Present", value: "present", color: "bg-green-500" },
    { label: "Absent", value: "absent", color: "bg-red-500" },
    { label: "Leave", value: "leave", color: "bg-yellow-500" },
    { label: "Half-Day", value: "half-day", color: "bg-blue-500" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="
        bg-white/70 backdrop-blur-2xl 
        border border-[#96C2DB]/40 
        rounded-2xl p-4 shadow-md 
        flex flex-col gap-3
      "
    >
      {/* Intern Name */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#1E2A35]">{name}</h3>

        {/* Selected status badge */}
        {status && (
          <span
            className={`text-xs px-3 py-1 rounded-xl text-white ${
              status === "present"
                ? "bg-green-500"
                : status === "absent"
                ? "bg-red-500"
                : status === "leave"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            {status.replace("-", " ").toUpperCase()}
          </span>
        )}
      </div>

      {/* Status Buttons */}
      <div className="flex flex-wrap gap-3 mt-2">
        {options.map((opt) => {
          const selected = status === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => onChangeStatus(internId, opt.value)}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold transition
                border 
                ${
                  selected
                    ? `${opt.color} text-white border-transparent shadow-md`
                    : "bg-white/80 text-[#1E2A35] border-[#96C2DB]/40 hover:bg-[#C6DFF1]/60"
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AttendanceStatusCard;
