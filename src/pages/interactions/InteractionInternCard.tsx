


// import { motion } from "framer-motion";
// import { CalendarDays, Clock, Hourglass } from "lucide-react";

// interface Props {
//   data: {
//     internId: string;
//     internName: string;
//     designation?: string;
//     batch?: string;
//     year?: string;

//     // interaction info
//     scheduled?: boolean;
//     interactionName?: string;
//     mentorName?: string;
//     interviewerName?: string;
//     date?: string;          // YYYY-MM-DD
//     startTime?: string;     // HH:mm
//     duration?: number;      // minutes
//     status?: "scheduled" | "feedback_pending" | "completed";
//   };
//   onClick: () => void;
// }

// const formatDuration = (minutes: number) => {
//   const hrs = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return `${hrs}h ${mins}m`;
// };

// const InteractionInternCard: React.FC<Props> = ({ data, onClick }) => {
//   const now = new Date();

//   let isBusyNow = false;
//   let isUpcoming = false;

//   if (data.date && data.startTime && data.duration) {
//     const start = new Date(`${data.date} ${data.startTime}`);
//     const end = new Date(start.getTime() + data.duration * 60000);

//     if (now >= start && now <= end) isBusyNow = true;
//     else if (now < start) isUpcoming = true;
//   }

//   /* ---------------- COLOR LOGIC ---------------- */
//   let cardColor =
//     "bg-white border border-gray-200";

//   if (isBusyNow)
//     cardColor =
//       "bg-red-100 border border-red-400 cursor-not-allowed";

//   else if (isUpcoming)
//     cardColor =
//       "bg-orange-100 border border-orange-400";

//   /* ---------------- CLICK HANDLER ---------------- */
//   const handleClick = () => {
//     if (isBusyNow) {
//       alert(
//         `Already scheduled from ${data.startTime} for ${data.duration} mins`
//       );
//       return;
//     }
//     onClick();
//   };

//   return (
//     // <motion.div
//     //   whileHover={!isBusyNow ? { scale: 1.02 } : {}}
//     //   onClick={handleClick}
//     //   className={`rounded-2xl shadow-md p-6 h-[180px] flex flex-col justify-between ${cardColor}`}
//     // >
//     <motion.div
//   whileHover={{ scale: 1.03 }}
//   onClick={handleClick}
//   className="bg-white rounded-2xl shadow-md p-6 h-[170px] flex flex-col justify-between"
// >

//       {!data.scheduled ? (
//         <>
//           <div>
//             <p className="text-sm text-gray-500">Intern</p>
//             <h3 className="text-lg font-semibold">
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
//       ) : (
//         <>
//           <h3 className="font-semibold">
//             {data.interactionName}
//           </h3>

//           <div className="grid grid-cols-3 text-sm mt-2">
//             <div>
//               <p className="text-gray-500">Intern</p>
//               <p>{data.internName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Mentor</p>
//               <p>{data.mentorName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Interviewer</p>
//               <p>{data.interviewerName}</p>
//             </div>
//           </div>

//           <div className="flex justify-between mt-3 text-sm text-gray-600">
//             <span className="flex items-center gap-1">
//               <CalendarDays size={14} /> {data.date}
//             </span>
//             <span className="flex items-center gap-1">
//               <Clock size={14} /> {data.startTime}
//             </span>
//             <span className="flex items-center gap-1">
//               <Hourglass size={14} />{" "}
//               {formatDuration(data.duration || 0)}
//             </span>
//           </div>
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default InteractionInternCard;






import { motion } from "framer-motion";
import { CalendarDays, Clock, Hourglass } from "lucide-react";

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
//     startTime?: string;
//     duration?: number;
//     status?: "scheduled" | "feedback_pending" | "completed";
//   };
//   onClick: () => void;
// }

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
    startTime?: string;
    duration?: number;
    status?: "scheduled" | "feedback_pending" | "completed";
    feedback?: {
      allowInternView?: boolean;
    };
  };
  onClick: () => void;
  onViewFeedback?: () => void;
}

const formatDuration = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

const InteractionInternCard: React.FC<Props> = ({ data, onClick,  onViewFeedback,}) => {
  const now = new Date();

  let isBusyNow = false;
  let isUpcoming = false;

  if (data.date && data.startTime && data.duration) {
    const start = new Date(`${data.date}T${data.startTime}`);
    const end = new Date(start.getTime() + data.duration * 60000);

    if (now >= start && now <= end) isBusyNow = true;
    else if (now < start) isUpcoming = true;
  }

  /* ---------------- COLOR STATE ---------------- */
  let stateStyle =
    "bg-white border border-gray-200";

  if (isBusyNow)
    stateStyle =
      "bg-red-100 border border-red-400 cursor-not-allowed";

  else if (isUpcoming)
    stateStyle =
      "bg-orange-100 border border-orange-400";

  /* ---------------- CLICK HANDLER ---------------- */
  const handleClick = () => {
    if (isBusyNow) {
      alert(
        `Already scheduled from ${data.startTime} for ${data.duration} mins`
      );
      return;
    }
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={
        !isBusyNow
          ? {
              scale: 1.04,
              y: -6,
              boxShadow: "0px 18px 35px rgba(0,0,0,0.14)",
            }
          : {}
      }
      onClick={handleClick}
      className={`
        rounded-3xl p-6 h-[220px]
        flex flex-col justify-between
        ${stateStyle}
      `}
    >
      {/* ---------- UNSCHEDULED ---------- */}
      {!data.scheduled ? (
        <>
          <div>
            <p className="text-sm text-gray-500">Intern</p>
            <h3 className="text-xl font-bold text-gray-800">
              {data.internName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {data.batch} {data.year}
            </p>
          </div>

          <p className="text-base font-semibold text-[#3B6E8F]">
            {data.designation || "—"}
          </p>
        </>
      ) : (
        <>
          {/* ---------- SCHEDULED ---------- */}
          <h3 className="text-xl font-bold text-gray-800">
            {data.interactionName}
          </h3>

          <div className="grid grid-cols-3 text-base mt-2">
            <div>
              <p className="text-sm text-gray-500">Intern</p>
              <p className="font-semibold truncate">
                {data.internName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Mentor</p>
              <p className="font-semibold truncate">
                {data.mentorName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Interviewer</p>
              <p className="font-semibold truncate">
                {data.interviewerName}
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-3 text-base text-gray-700">
            <span className="flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-500" />
              {data.date}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={18} className="text-green-500" />
              {data.startTime}
            </span>

            <span className="flex items-center gap-2">
              <Hourglass size={18} className="text-orange-500" />
              {formatDuration(data.duration || 0)}
            </span>
          </div>
        </>
      )}
      
      {/* ---------- VIEW FEEDBACK (INTERN ONLY) ---------- */}
{data.status === "completed" &&
  data.feedback?.allowInternView &&
  onViewFeedback && (
    <div className="pt-3">
      <button
        onClick={(e) => {
          e.stopPropagation(); // ⛔ don’t trigger card click
          onViewFeedback();
        }}
        className="
          w-full text-sm font-semibold
          py-2 rounded-xl
          bg-[#3B6E8F] text-white
          hover:bg-[#315f7a]
          transition
        "
      >
        View Feedback
      </button>
    </div>
)}

    </motion.div>
  );
};

export default InteractionInternCard;
