import { motion } from "framer-motion";

const CreatePlanCard = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="
      cursor-pointer
      bg-white/70 backdrop-blur-2xl
      border-2 border-dashed border-[#96C2DB]/60
      rounded-3xl shadow-md hover:shadow-xl
      h-40 flex flex-col justify-center items-center
    "
  >
    <span className="text-4xl font-bold text-[#3B6E8F]">+</span>
    <p className="mt-2 text-lg font-bold text-[#1E2A35]">
      Create Plan
    </p>
  </motion.div>
);

export default CreatePlanCard;
