import { motion } from "framer-motion";

const CreateInteractionCard = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="cursor-pointer rounded-xl border-2 border-dashed
               border-blue-400 bg-blue-50 p-6
               flex flex-col items-center justify-center"
  >
    <span className="text-4xl text-blue-600">+</span>
    <p className="mt-2 font-semibold text-blue-700">
      Create Interaction
    </p>
  </motion.div>
);

export default CreateInteractionCard;
