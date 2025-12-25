






import { motion } from "framer-motion";

const CreateInteractionCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="
        relative cursor-pointer
        bg-white/70 backdrop-blur-2xl
        border-2  border-[#96C2DB]/40
        rounded-3xl shadow-md
        hover:shadow-xl transition-all

        h-40
        flex flex-col
        justify-center
        items-center
        p-6
      "
    >
      {/* PLUS ICON */}
      <span className="text-4xl font-bold text-[#3B6E8F]">+</span>

      {/* TEXT */}
      <p className="mt-2 text-lg font-bold text-[#1E2A35] text-center">
        Create Interaction
      </p>
    </motion.div>
  );
};

export default CreateInteractionCard;
