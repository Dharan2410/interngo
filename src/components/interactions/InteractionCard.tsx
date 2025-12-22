// // import type { InteractionMetricDefinition } from "../../types/interaction";

// // const InteractionCard = ({
// //   interaction,
// // }: {
// //   interaction: InteractionMetricDefinition;
// // }) => {
// //   return (
// //     <div className="bg-white shadow rounded-xl p-5">
// //       <h3 className="font-semibold text-lg">
// //         {interaction.name}
// //       </h3>
// //       <p className="text-xs text-gray-500 mb-3">
// //         {interaction.type.toUpperCase()}
// //       </p>

// //       <ul className="text-sm space-y-1">
// //         {interaction.metrics.map((m, i) => (
// //           <li key={i}>
// //             • {m.title} ({m.maxScore})
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default InteractionCard;





// import { motion } from "framer-motion";
// import { Edit, Trash } from "lucide-react";
// import type { InteractionMetricDefinition } from "../../types/interaction";

// interface Props {
//   interaction: InteractionMetricDefinition;
//   onEdit: () => void;
//   onDelete: () => void;
//   onClick: () => void;
// }

// const InteractionCard: React.FC<Props> = ({
//   interaction,
//   onEdit,
//   onDelete,
//   onClick,
// }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       onClick={onClick}
//       className="
//         relative cursor-pointer
//         bg-white/70 backdrop-blur-2xl
//         border border-[#96C2DB]/40
//         rounded-3xl p-6 shadow-md
//         hover:shadow-xl transition-all
//       "
//     >
//       {/* ACTION BUTTONS */}
//       <div
//         className="absolute top-4 right-4 flex gap-2"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onEdit}
//           className="p-2 rounded-full bg-[#C6DFF1] hover:bg-[#96C2DB]"
//         >
//           <Edit size={16} />
//         </button>

//         <button
//           onClick={onDelete}
//           className="p-2 rounded-full bg-red-100 hover:bg-red-200"
//         >
//           <Trash size={16} />
//         </button>
//       </div>

//       {/* INTERACTION NAME ONLY */}
//       <h2 className="text-xl font-bold text-[#1E2A35] text-center">
//         {interaction.name}
//       </h2>

      
//     </motion.div>
//   );
// };

// export default InteractionCard;






import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import type { InteractionMetricDefinition } from "../../types/interaction";

interface Props {
  interaction: InteractionMetricDefinition;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const InteractionCard: React.FC<Props> = ({
  interaction,
  onEdit,
  onDelete,
  onClick,
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
      {/* ACTION BUTTONS */}
      <div
        className="absolute top-4 right-4 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-[#C6DFF1] hover:bg-[#96C2DB]"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200"
        >
          <Trash size={16} />
        </button>
      </div>

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
