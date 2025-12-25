



import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Hourglass,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  data: any;
  isActive?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewFeedback?: () => void;
  hideActions?: boolean;
}

const InteractionScheduleCard: React.FC<Props> = ({
  data,
  isActive,
  onEdit,
  onDelete,
  onViewFeedback,
  hideActions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow: "0px 18px 35px rgba(0,0,0,0.14)",
      }}
      className={`
        relative
        bg-white rounded-3xl
        shadow-md hover:shadow-xl
        border transition-all
        ${isActive ? "border-green-400" : "border-gray-200"}
        p-6 h-[220px]
        flex flex-col justify-between
      `}
    >
      {/* ---------------- ACTIONS ---------------- */}
      {/* <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="p-2 rounded-lg hover:bg-[#96C2DB]/30"
          title="Edit"
        >
          <Pencil size={18} className="text-[#3B6E8F]" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="p-2 rounded-lg hover:bg-red-100"
          title="Delete"
        >
          <Trash2 size={18} className="text-red-600" />
        </button>
      </div> */}

      {/* ACTIONS */}
{!hideActions && (
  <div className="absolute top-4 right-4 flex gap-2">
    {onEdit && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1 rounded-lg hover:bg-[#96C2DB]/30"
        title="Edit"
      >
        <Pencil size={16} />
      </button>
    )}

    {onDelete && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 rounded-lg hover:bg-red-100 text-red-600"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    )}
  </div>
)}


      {/* ---------------- ACTIVE DOT ---------------- */}
      <span
        className={`
          absolute top-4 left-4 w-3 h-3 rounded-full
          ${isActive ? "bg-green-500" : "bg-yellow-400"}
        `}
      />

      {/* ---------------- TITLE ---------------- */}
      <h3 className="text-xl font-bold text-gray-800 pl-4">
        {data.interactionName}
      </h3>

      {/* ---------------- PEOPLE ---------------- */}
      <div className="grid grid-cols-3 text-base mt-2">
        <div className="text-center">
          <p className="text-sm text-gray-500">Intern</p>
          <p className="font-semibold truncate">
            {data.internName}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Mentor</p>
          <p className="font-semibold truncate">
            {data.mentorName}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Interviewer</p>
          <p className="font-semibold truncate">
            {data.interviewerName}
          </p>
        </div>
      </div>

      {/* ---------------- META ---------------- */}
      <div className="flex justify-between items-center text-base text-gray-700 mt-2">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-500" />
          <span>{data.date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} className="text-green-500" />
          <span>{data.startTime || data.time}</span>
        </div>

        <div className="flex items-center gap-2">
          <Hourglass size={18} className="text-orange-500" />
          <span>{data.duration} min</span>
        </div>
      </div>
      {data.feedbackStatus === "completed" && onViewFeedback && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onViewFeedback();
    }}
    className="mt-4 w-full py-2 rounded-xl 
               bg-[#3B6E8F] text-white font-semibold
               hover:opacity-90"
  >
    View Feedback
  </button>
)}

    </motion.div>
  );
};

export default InteractionScheduleCard;
