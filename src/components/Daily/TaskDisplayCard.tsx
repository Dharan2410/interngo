// import React from "react";

// export interface TaskDisplayCardProps {
//   internName: string;
//   internId: string;
//   selectedDate: Date;
//   totalTime: string; 
//   tasks: {
//     id: string;
//     topic: string;
//     plannedActivities: string;
//     completedActivities: string;
//     estimatedTime: string;
//     actualTime: string;
//     status: "Pending" | "Completed";
    
//   }[];
// }

// const TaskDisplayCard: React.FC<TaskDisplayCardProps> = ({
//   internName,
//   internId,
//   selectedDate,
//   tasks,
//   totalTime
// }) => {
//   return (
//     <div className="rounded-2xl p-5 bg-white/85 border border-[#96C2DB]/40 shadow-sm">
//       {/* Intern Header */}
//       <div className="flex justify-between items-center mb-3">
//         <div>
//           <div className="font-semibold text-[#1E2A35] text-lg">
//             {internName}
//           </div>
//           <div className="text-xs text-[#3A4750]">ID: {internId}</div>
//           <div className="text-xs text-[#3A4750]">
//   Total Time: <span className="font-semibold text-[#1E2A35]">{totalTime}</span>
// </div>

//         </div>

//         <div className="text-xs text-[#3A4750]">
//           {selectedDate.toLocaleDateString()}
//         </div>
//       </div>

//       {/* Tasks */}
//       {tasks.length === 0 ? (
//         <div className="text-sm italic text-[#3A4750]">
//           No updates submitted for this date.
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {tasks.map((t) => (
//             <div
//               key={t.id}
//               className="rounded-xl p-4 bg-[#E5EDF1] border border-[#96C2DB]/40"
//             >
//               <div className="grid grid-cols-12 gap-2">
//                 {[
//                   "topic",
//                   "plannedActivities",
//                   "completedActivities",
//                   "estimatedTime",
//                   "actualTime",
//                   "totaltime"
//                 ].map((field) => (
//                   <div
//                     key={field}
//                     className={`col-span-${
//                       field === "completedActivities" ? "3" : "2"
//                     }`}
//                   >
//                     <div className="text-[11px] uppercase text-[#3A4750]">
//                       {field}
//                     </div>
//                     <div className="text-sm text-[#08212d]">
//                       {(t as any)[field] || "-"}
//                     </div>
//                   </div>
//                 ))}

//                 {/* Status */}
//                 <div className="col-span-2">
//                   <div className="text-[11px] uppercase text-[#3A4750]">
//                     Status
//                   </div>
//                   <div className="px-3 py-1 mt-1 rounded-full bg-[#96C2DB] text-[#08212d] text-xs inline-block">
//                     {t.status}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskDisplayCard;



//dhara's use for DB



import React from "react";

export interface TaskDisplayCardProps {
  internName: string;
  internId: string;
  selectedDate: Date;
  totalTime: string; 
  tasks: {
    id: string;
    topic: string;
    plannedActivities: string;
    completedActivities: string;
    estimatedTime: string;
    actualTime: string;
    status: "Pending" | "Completed";
    
  }[];
}

const TaskDisplayCard: React.FC<TaskDisplayCardProps> = ({
  internName,
  internId,
  selectedDate,
  tasks,
  totalTime
}) => {
  return (
    <div className="rounded-2xl p-5 bg-white/85 border border-[#96C2DB]/40 shadow-sm">
      {/* Intern Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <div className="font-semibold text-[#1E2A35] text-lg">
            {internName}
          </div>
          <div className="text-xs text-[#3A4750]">ID: {internId}</div>
          <div className="text-xs text-[#3A4750]">
  Total Time: <span className="font-semibold text-[#1E2A35]">{totalTime}</span>
</div>

        </div>

        <div className="text-xs text-[#3A4750]">
          {selectedDate.toLocaleDateString()}
        </div>
      </div>

      {/* Tasks */}
      {tasks.length === 0 ? (
        <div className="text-sm italic text-[#3A4750]">
          No updates submitted for this date.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="rounded-xl p-4 bg-[#E5EDF1] border border-[#96C2DB]/40"
            >
              <div className="grid grid-cols-12 gap-2">
                {[
                  "topic",
                  "plannedActivities",
                  "completedActivities",
                  "estimatedTime",
                  "actualTime",
                  "totaltime"
                ].map((field) => (
                  <div
                    key={field}
                    className={`col-span-${
                      field === "completedActivities" ? "3" : "2"
                    }`}
                  >
                    <div className="text-[11px] uppercase text-[#3A4750]">
                      {field}
                    </div>
                    <div className="text-sm text-[#08212d]">
                      {(t as any)[field] || "-"}
                    </div>
                  </div>
                ))}

                {/* Status */}
                <div className="col-span-2">
                  <div className="text-[11px] uppercase text-[#3A4750]">
                    Status
                  </div>
                  <div className="px-3 py-1 mt-1 rounded-full bg-[#96C2DB] text-[#08212d] text-xs inline-block">
                    {t.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDisplayCard;