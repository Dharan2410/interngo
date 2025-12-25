import { motion } from "framer-motion";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this scheduled interaction?",
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
      >
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteModal;
