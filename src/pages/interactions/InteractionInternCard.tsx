




// import { motion } from "framer-motion";
// import { CalendarDays, Clock, Hourglass } from "lucide-react";

// interface Props {
//   data: {
//     internId: string;
//     internName: string;
//     designation?: string;
//     batch?: string;
//     year?: string;

//     scheduled?: boolean;
//     interactionName?: string;
//     mentorName?: string;
//     interviewerName?: string;
//     date?: string;
//     time?: string;
//     duration?: number;
//   };
//   onClick: () => void;
// }

// const formatDuration = (minutes: number) => {
//   const hrs = Math.floor(minutes / 60);
//   const mins = minutes % 60;

//   const hStr = String(hrs).padStart(2, "0");
//   const mStr = String(mins).padStart(2, "0");

//   return `${hStr} hr ${mStr} mins`;
// };

// const InteractionInternCard: React.FC<Props> = ({ data, onClick }) => {
//   const scheduled = data.scheduled;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       onClick={onClick}
//       className="
//         cursor-pointer
//         bg-white
//         rounded-2xl
//         shadow-md hover:shadow-xl
//         transition-all
//         p-6
//         h-[180px]          /* SAME HEIGHT ALWAYS */
//         flex flex-col justify-between
//       "
//     >
//       {/* ================= NOT SCHEDULED ================= */}
//       {!scheduled && (
//         <>
//           <div>
//             <p className="text-sm text-gray-500">Intern</p>
//             <h3 className="text-lg font-semibold text-[#1E2A35]">
//               {data.internName}
//             </h3>

//             <p className="text-sm text-gray-500 mt-1">
//               {data.batch} {data.year}
//             </p>
//           </div>

//           <p className="text-sm font-semibold text-[#3B6E8F]">
//             {data.designation || "—"}
//           </p>
//         </>
//       )}

//       {/* ================= SCHEDULED ================= */}
//       {scheduled && (
//         <>
//           {/* Interaction name */}
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 bg-yellow-400 rounded-full" />
//             <h3 className="font-semibold text-[#1E2A35]">
//               {data.interactionName}
//             </h3>
//           </div>

//           {/* Names */}
//           <div className="grid grid-cols-3 gap-4 text-sm mt-2">
//             <div>
//               <p className="text-gray-500">Intern</p>
//               <p className="font-semibold">{data.internName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Mentor</p>
//               <p className="font-semibold">{data.mentorName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Interviewer</p>
//               <p className="font-semibold">{data.interviewerName}</p>
//             </div>
//           </div>

//           {/* Date / Time / Duration */}
//           <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
//             <div className="flex items-center gap-1">
//               <CalendarDays size={14} />
//               {data.date}
//             </div>
//             <div className="flex items-center gap-1">
//               <Clock size={14} />
//               {data.time}
//             </div>
//             <div className="flex items-center gap-1">
//               <Hourglass size={14} />
//               {/* {data.duration} min */}
//               {formatDuration(data.duration || 0)}
//             </div>
//           </div>
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default InteractionInternCard;






import { motion } from "framer-motion";
import { CalendarDays, Clock, Hourglass } from "lucide-react";

interface Props {
  data: {
    internId: string;
    internName: string;
    designation?: string;
    batch?: string;
    year?: string;

    scheduled?: boolean;
    interactionName?: string;
    mentorName?: string;
    interviewerName?: string;
    date?: string;
    time?: string;
    duration?: number; // ✅ minutes
  };
  onClick: () => void;
}

const formatDuration = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hrs).padStart(2, "0")} hr ${String(mins).padStart(2, "0")} mins`;
};

const InteractionInternCard: React.FC<Props> = ({ data, onClick }) => {
  const scheduled = data.scheduled;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-6 h-[180px] flex flex-col justify-between"
    >
      {!scheduled ? (
        <>
          <div>
            <p className="text-sm text-gray-500">Intern</p>
            <h3 className="text-lg font-semibold">{data.internName}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {data.batch} {data.year}
            </p>
          </div>
          <p className="text-sm font-semibold text-[#3B6E8F]">
            {data.designation || "—"}
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold">{data.interactionName}</h3>

          <div className="grid grid-cols-3 text-sm mt-2">
            <div>
              <p className="text-gray-500">Intern</p>
              <p>{data.internName}</p>
            </div>
            <div>
              <p className="text-gray-500">Mentor</p>
              <p>{data.mentorName}</p>
            </div>
            <div>
              <p className="text-gray-500">Interviewer</p>
              <p>{data.interviewerName}</p>
            </div>
          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <span><CalendarDays size={14} /> {data.date}</span>
            <span><Clock size={14} /> {data.time}</span>
            <span><Hourglass size={14} /> {formatDuration(data.duration || 0)}</span>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default InteractionInternCard;


