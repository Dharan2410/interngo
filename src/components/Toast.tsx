import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message: string;
  type?: "success" | "error";
  show: boolean;
}

const Toast: React.FC<Props> = ({ message, type = "success", show }) => {
  if (!show) return null;

  const bg =
    type === "success"
      ? "bg-[#3B6E8F]"
      : "bg-red-600";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-6 right-6 z-[99999] px-6 py-3 rounded-xl text-white shadow-lg ${bg}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
