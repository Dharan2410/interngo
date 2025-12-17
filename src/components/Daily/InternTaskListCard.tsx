
// // src/components/Daily/InternTaskListCard.tsx
// import React from "react";

// type TaskRow = {
//   id: string;
//   topic: string;
//   plannedActivities: string;
//   completedActivities: string;
//   estimatedTime: string;
//   actualTime: string;
//   status: "pending" | "completed";
// };

// interface Props {
//   internName: string;
//   internRole: string;
//   tasks: TaskRow[];
//   selectedDate: Date;
//   totalTime: string; 
// }

// const InternTaskListCard: React.FC<Props> = ({
//   internName,
//   internRole,
//   tasks,
//   selectedDate,
//   totalTime
// }) => {
//   return (
//     <div className="
//       bg-white/80 backdrop-blur-xl 
//       border border-[#96C2DB]/40 
//       rounded-2xl p-5 shadow-md
//     ">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <div className="text-lg font-semibold text-[#1E2A35]">{internName}</div>
//           <div className="text-sm text-[#3A4750]">{internRole}</div>
//         </div>

//         <div className="text-sm text-[#3A4750]">
//           {selectedDate.toLocaleDateString()}
//         </div>
//         <div className="text-xs mt-1 text-[#1E2A35] font-semibold">
//             Total: <span className="text-[#3B6E8F]">{totalTime}</span>
//           </div>
//       </div>

//       {tasks.length === 0 ? (
//         <div className="text-sm text-[#3A4750] italic">
//           No updates submitted for this date.
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {tasks.map((t) => (
//             <div
//               key={t.id}
//               className="
//                 grid grid-cols-12 gap-3
//                 bg-white border border-[#96C2DB]/40 rounded-xl p-3
//               "
//             >
//               {/* EXACT SAME GRID AS INTERN — but read-only */}
//               <input
//                 value={t.topic}
//                 disabled
//                 className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
//               />
//               <input
//                 value={t.plannedActivities}
//                 disabled
//                 className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
//               />
//               <input
//                 value={t.completedActivities}
//                 disabled
//                 className="col-span-3 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
//               />
//               <input
//                 value={t.estimatedTime}
//                 disabled
//                 className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
//               />
//               <input
//                 value={t.actualTime}
//                 disabled
//                 className="col-span-1 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
//               />
//               <div className="col-span-2 flex items-center">
//                 <span
//                   className={`
//                     px-3 py-1 rounded-full text-xs font-semibold
//                     ${
//                       t.status === "completed"
//                         ? "bg-green-200 text-green-700"
//                         : "bg-red-200 text-yellow-700"
//                     }
//                   `}
//                 >
//                   {t.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InternTaskListCard;



//dhara's use for DB


// src/components/Daily/InternTaskListCard.tsx
import React from "react";

type TaskRow = {
  id: string;
  topic: string;
  plannedActivities: string;
  completedActivities: string;
  estimatedTime: string;
  actualTime: string;
  status: "Pending" | "Completed";
};

interface Props {
  internName: string;
  internRole: string;
  tasks: TaskRow[];
  selectedDate: Date;
  totalTime: string; 
}

const InternTaskListCard: React.FC<Props> = ({
  internName,
  internRole,
  tasks,
  selectedDate,
  totalTime
}) => {
  return (
    <div className="
      bg-white/80 backdrop-blur-xl 
      border border-[#96C2DB]/40 
      rounded-2xl p-5 shadow-md
    ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-semibold text-[#1E2A35]">{internName}</div>
          <div className="text-sm text-[#3A4750]">{internRole}</div>
        </div>

        <div className="text-sm text-[#3A4750]">
          {selectedDate.toLocaleDateString()}
        </div>
        <div className="text-xs mt-1 text-[#1E2A35] font-semibold">
            Total: <span className="text-[#3B6E8F]">{totalTime}</span>
          </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-sm text-[#3A4750] italic">
          No updates submitted for this date.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="
                grid grid-cols-12 gap-3
                bg-white border border-[#96C2DB]/40 rounded-xl p-3
              "
            >
              {/* EXACT SAME GRID AS INTERN — but read-only */}
              <input
                value={t.topic}
                disabled
                className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
              />
              <input
                value={t.plannedActivities}
                disabled
                className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
              />
              <input
                value={t.completedActivities}
                disabled
                className="col-span-3 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
              />
              <input
                value={t.estimatedTime}
                disabled
                className="col-span-2 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
              />
              <input
                value={t.actualTime}
                disabled
                className="col-span-1 bg-white/70 border border-[#96C2DB]/40 rounded-lg p-2 text-sm"
              />
              <div className="col-span-2 flex items-center">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      t.status === "Completed"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-yellow-700"
                    }
                  `}
                >
                {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InternTaskListCard;