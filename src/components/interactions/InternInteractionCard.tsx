

// import { motion } from "framer-motion";
// import { Calendar, Clock, Hourglass } from "lucide-react";

// const InternInteractionCard = ({ data }: { data: any }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       whileHover={{
//         scale: 1.04,
//         y: -6,
//         boxShadow: "0px 18px 35px rgba(0,0,0,0.14)",
//       }}
//       className="
//         bg-white rounded-3xl shadow-md 
//         p-6 h-[220px]
//         flex flex-col justify-between
//         cursor-default
//       "
//     >
//       {/* TITLE */}
//       <h3 className="text-xl font-bold text-gray-800">
//         {data.interactionName}
//       </h3>

//       {/* PEOPLE */}
//       <div className="grid grid-cols-3 text-base mt-2">
//         <div>
//           <p className="text-gray-500 text-sm">Intern</p>
//           <p className="font-semibold text-gray-800 truncate">
//             {data.internName}
//           </p>
//         </div>

//         <div>
//           <p className="text-gray-500 text-sm">Mentor</p>
//           <p className="font-semibold text-gray-800 truncate">
//             {data.mentorName}
//           </p>
//         </div>

//         <div>
//           <p className="text-gray-500 text-sm">Interviewer</p>
//           <p className="font-semibold text-gray-800 truncate">
//             {data.interviewerName}
//           </p>
//         </div>
//       </div>

//       {/* META */}
//       <div className="flex justify-between text-base text-gray-700 mt-3">
//         <span className="flex items-center gap-2">
//           <Calendar size={18} className="text-blue-500" />
//           {data.date}
//         </span>

//         <span className="flex items-center gap-2">
//           <Clock size={18} className="text-green-500" />
//           {data.time}
//         </span>

//         <span className="flex items-center gap-2">
//           <Hourglass size={18} className="text-orange-500" />
//           {data.duration} min
//         </span>
//       </div>
      
//     </motion.div>
//   );
// };

// export default InternInteractionCard;




import { motion } from "framer-motion";
import { Calendar, Clock, Hourglass } from "lucide-react";

interface Props {
  data: any;
  showFeedbackAction?: boolean;
  onGiveFeedback?: () => void;
}

const InternInteractionCard: React.FC<Props> = ({
  data,
  showFeedbackAction = false,
  onGiveFeedback,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        y: -6,
        boxShadow: "0px 18px 35px rgba(0,0,0,0.14)",
      }}
      className="
        bg-white rounded-3xl shadow-md 
        p-6 h-[240px]
        flex flex-col justify-between
      "
    >
      {/* TITLE */}
      <h3 className="text-xl font-bold text-gray-800">
        {data.interactionName}
      </h3>

      {/* PEOPLE */}
      <div className="grid grid-cols-3 text-base mt-2">
        <div>
          <p className="text-gray-500 text-sm">Intern</p>
          <p className="font-semibold truncate">
            {data.internName}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Mentor</p>
          <p className="font-semibold truncate">
            {data.mentorName}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Interviewer</p>
          <p className="font-semibold truncate">
            {data.interviewerName}
          </p>
        </div>
      </div>

      {/* META */}
      <div className="flex justify-between text-base text-gray-700 mt-3">
        <span className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-500" />
          {data.date}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={18} className="text-green-500" />
          {data.time}
        </span>

        <span className="flex items-center gap-2">
          <Hourglass size={18} className="text-orange-500" />
          {data.duration} min
        </span>
      </div>

      {/* GIVE FEEDBACK (ONLY IF ALLOWED) */}
      {showFeedbackAction && data.feedbackStatus !== "completed" && (
        <button
          onClick={onGiveFeedback}
          className="
            mt-4 py-2 rounded-xl
            bg-[#3B6E8F] text-white
            font-semibold text-sm
            hover:opacity-90
          "
        >
          Give Feedback
        </button>
      )}
    </motion.div>
  );
};

export default InternInteractionCard;
