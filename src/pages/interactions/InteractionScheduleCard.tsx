import { motion } from "framer-motion";
import { Edit } from "lucide-react";

interface Props {
  data: any;
  onClick: () => void;
  onEdit?: () => void;
}

const InteractionScheduleCard: React.FC<Props> = ({
  data,
  onClick,
  onEdit,
}) => {
  const isScheduled = Boolean(data.scheduled);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="
        relative cursor-pointer
        bg-white/80 backdrop-blur-xl
        border border-[#96C2DB]/40
        rounded-3xl shadow-md
        hover:shadow-xl transition-all
        p-6
        h-40 w-full
        flex flex-col justify-between
      "
    >
      {/* EDIT */}
      {isScheduled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="absolute top-4 right-4 p-2 bg-[#C6DFF1] rounded-full"
        >
          <Edit size={16} />
        </button>
      )}

      {/* CONTENT */}
      {!isScheduled ? (
        <>
          <h3 className="text-lg font-bold text-[#1E2A35]">
            {data.internName}
          </h3>
          <p className="text-sm text-[#3A4750]">
            {data.batch}
          </p>
          <p className="text-sm text-[#3A4750]">
            {data.designation}
          </p>
        </>
      ) : (
        <>
          <h3 className="font-bold text-[#1E2A35]">
            {data.interactionName}
          </h3>

          <div className="text-sm text-[#3A4750] grid grid-cols-3 gap-2 mt-2">
            <div>
              <p className="font-semibold">Intern</p>
              <p>{data.internName}</p>
            </div>
            <div>
              <p className="font-semibold">Mentor</p>
              <p>{data.mentorName}</p>
            </div>
            <div>
              <p className="font-semibold">Interviewer</p>
              <p>{data.interviewerName}</p>
            </div>
          </div>

          <div className="flex justify-between text-xs text-[#3A4750] mt-2">
            <span>{data.date}</span>
            <span>{data.time}</span>
            <span>{data.duration} mins</span>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default InteractionScheduleCard;
