


import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import type { InteractionMetricDefinition } from "../../types/interaction";

interface Props {
  interaction: InteractionMetricDefinition;
  onClick: () => void;

  // OPTIONAL (only for metrics tab)
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const InteractionCard: React.FC<Props> = ({
  interaction,
  onClick,
  onEdit,
  onDelete,
  showActions = true, // ✅ default
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="
        relative cursor-pointer
        bg-white/70 backdrop-blur-2xl
        border border-[#96C2DB]/40
        rounded-3xl shadow-md
        hover:shadow-xl transition-all

        h-40
        flex flex-col
        justify-center
        items-center
        p-6
      "
    >
      {/* ACTION BUTTONS (ONLY WHEN ENABLED) */}
      {showActions && (
        <div
          className="absolute top-4 right-4 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 rounded-full bg-[#C6DFF1] hover:bg-[#96C2DB]"
            >
              <Edit size={16} />
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200"
            >
              <Trash size={16} />
            </button>
          )}
        </div>
      )}

      {/* INTERACTION NAME */}
      <h2
        className="
          text-lg font-bold text-[#1E2A35]
          text-center
          leading-snug
          line-clamp-2
          break-words
        "
      >
        {interaction.name}
      </h2>
    </motion.div>
  );
};

export default InteractionCard;
