



// import { motion } from "framer-motion";
// import { useState } from "react";
// import type { InteractionMetricDefinition } from "../../types/interaction";

// const DEFAULT_METRICS = [
//   { title: "Communication", maxScore: 10 },
//   { title: "Technical Knowledge", maxScore: 10 },
//   { title: "Problem Solving", maxScore: 10 },
//   { title: "Attitude", maxScore: 10 },
// ];

// interface Props {
//   initialData?: InteractionMetricDefinition | null;
//   onClose: () => void;
//   onSave: (data: InteractionMetricDefinition) => void;
// }

// const CreateInteractionModal: React.FC<Props> = ({
//   initialData,
//   onClose,
//   onSave,
// }) => {
//   const [name, setName] = useState(initialData?.name || "");
//   const [metrics, setMetrics] = useState(
//     initialData?.metrics || DEFAULT_METRICS
//   );

//   const addMetric = () =>
//     setMetrics([...metrics, { title: "", maxScore: 10 }]);

//   const removeMetric = (i: number) =>
//     setMetrics(metrics.filter((_, idx) => idx !== i));

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[20000]">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="
//           bg-white backdrop-blur-xl
//           border border-white/40
//           p-8 rounded-2xl shadow-xl
//           w-[90%] max-w-2xl
//         "
//       >
//         <h2 className="text-2xl font-bold text-[#3B6E8F] mb-6">
//           {initialData ? "Edit Interaction" : "Create Interaction"}
//         </h2>

//         {/* BASIC FIELDS */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="font-bold text-[#3B6E8F]">
//               Interaction Name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 rounded-xl border border-[#96C2DB]/40"
//             />
//           </div>
//           </div>

//         {/* METRICS */}
//         <div className="space-y-4">
//           {metrics.map((m, i) => (
//             <div key={i} className="flex gap-3">
//               <input
//                 placeholder="Metric title"
//                 value={m.title}
//                 onChange={(e) => {
//                   const copy = [...metrics];
//                   copy[i].title = e.target.value;
//                   setMetrics(copy);
//                 }}
//                 className="flex-1 p-3 rounded-xl border"
//               />

//               <input
//                 type="number"
//                 value={m.maxScore}
//                 onChange={(e) => {
//                   const copy = [...metrics];
//                   copy[i].maxScore = Number(e.target.value);
//                   setMetrics(copy);
//                 }}
//                 className="w-28 p-3 rounded-xl border"
//               />

//               <button onClick={() => removeMetric(i)}>❌</button>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={addMetric}
//           className="mt-4 text-[#3B6E8F] font-semibold"
//         >
//           ➕ Add Metric
//         </button>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 rounded-xl hover:bg-gray-200"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => onSave({ name,metrics })}
//             className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
//           >
//             Save
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CreateInteractionModal;





import { motion } from "framer-motion";
import { useState } from "react";
import type { InteractionMetricDefinition } from "../../types/interaction";

const DEFAULT_METRICS = [
  { title: "Communication", maxScore: 10 },
  { title: "Technical Knowledge", maxScore: 10 },
  { title: "Problem Solving", maxScore: 10 },
  { title: "Attitude", maxScore: 10 },
];

interface Props {
  initialData?: InteractionMetricDefinition | null;
  onClose: () => void;
  onSave: (data: InteractionMetricDefinition) => void;
}

const CreateInteractionModal: React.FC<Props> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [metrics, setMetrics] = useState(
    initialData?.metrics || DEFAULT_METRICS
  );

  const addMetric = () =>
    setMetrics([...metrics, { title: "", maxScore: 10 }]);

  const removeMetric = (i: number) =>
    setMetrics(metrics.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[20000]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-white backdrop-blur-xl
          border border-white/40
          p-8 rounded-2xl shadow-xl
          w-[90%] max-w-2xl
        "
      >
        <h2 className="text-2xl font-bold text-[#3B6E8F] mb-6">
          {initialData ? "Edit Interaction" : "Create Interaction"}
        </h2>

        {/* INTERACTION NAME */}
        <div className="mb-6">
          <label className="font-bold text-[#3B6E8F]">
            Interaction Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-[#96C2DB]/40"
          />
        </div>

        {/* METRICS */}
        <div className="space-y-4">
          {metrics.map((m, i) => (
            <div key={i} className="flex gap-3">
              <input
                placeholder="Metric title"
                value={m.title}
                onChange={(e) => {
                  const copy = [...metrics];
                  copy[i].title = e.target.value;
                  setMetrics(copy);
                }}
                className="flex-1 p-3 rounded-xl border"
              />

              <input
                type="number"
                value={m.maxScore}
                onChange={(e) => {
                  const copy = [...metrics];
                  copy[i].maxScore = Number(e.target.value);
                  setMetrics(copy);
                }}
                className="w-28 p-3 rounded-xl border"
              />

              <button onClick={() => removeMetric(i)}>❌</button>
            </div>
          ))}
        </div>

        <button
          onClick={addMetric}
          className="mt-4 text-[#3B6E8F] font-semibold"
        >
          ➕ Add Metric
        </button>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave({ name, metrics })}
            className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateInteractionModal;
