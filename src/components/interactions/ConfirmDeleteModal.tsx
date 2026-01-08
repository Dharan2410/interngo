// import { motion, AnimatePresence } from "framer-motion";
// import { createPortal } from "react-dom";

// interface Props {
//   open: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
// }

// const ConfirmDeleteModal: React.FC<Props> = ({
//   open,
//   onCancel,
//   onConfirm,
// }) => {
//   if (!open) return null;

//   return createPortal(
//     <AnimatePresence>
//       {/* 🔥 BACKDROP (SEPARATE LAYER) */}
//       <motion.div
//         className="fixed inset-0 z-[10000] bg-black/50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onMouseDown={onCancel}   
//       />

//       {/* 🧊 MODAL LAYER */}
//       <motion.div
//         className="fixed inset-0 z-[10001] flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 25 }}
//           onMouseDown={(e) => e.stopPropagation()} // 🔒 SAFE
//           className="
//             bg-white rounded-3xl
//             w-[90%] max-w-md
//             p-6 shadow-2xl
//           "
//         >
//           <h2 className="text-lg font-bold text-[#1E2A35]">
//             Confirm Delete
//           </h2>

//           <p className="text-sm text-gray-600 mt-2">
//             Are you sure you want to delete this scheduled interaction?
//           </p>

//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               onClick={onCancel}
//               className="px-4 py-2 rounded-xl border hover:bg-gray-100"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>,
//     document.body
//   );
// };

// export default ConfirmDeleteModal;




import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  open,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onCancel(); // ✅ always fires
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {/* BACKDROP (visual only) */}
      <motion.div
        className="fixed inset-0 z-[999999] bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 z-[1000000] flex items-center justify-center"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="
            bg-white rounded-3xl
            w-[90%] max-w-md
            p-6 shadow-2xl
          "
        >
          <h2 className="text-lg font-bold text-[#1E2A35]">
            Confirm Delete
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Are you sure you want to delete this scheduled interaction?
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDeleteModal;
