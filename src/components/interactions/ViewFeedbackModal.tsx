



// ///after flow change
// import { motion } from "framer-motion";
// import { Star } from "lucide-react";

// interface Props {
//   open: boolean;
//   data: any;
//   viewer?: "admin" | "intern"; // ✅ FIX
//   onClose: () => void;
// }

// const ViewFeedbackModal: React.FC<Props> = ({
//   open,
//   data,
//   viewer = "admin", // default, future-proof
//   onClose,
// }) => {
//   if (!open || !data?.feedback) return null;

//   const fb = data.feedback;
//   const metrics = Array.isArray(fb.metrics) ? fb.metrics : [];

//   const totalScore = metrics.reduce(
//     (sum: number, m: any) => sum + (m.score || 0),
//     0
//   );

//   const totalMax = metrics.reduce(
//     (sum: number, m: any) => sum + (m.maxScore || 0),
//     0
//   );

//   const percent =
//     totalMax > 0
//       ? Math.round((totalScore / totalMax) * 100)
//       : 0;

//   const starRating = Math.round((percent / 100) * 5);

//   return (
//     <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white w-full max-w-4xl rounded-3xl p-10"
//       >
//         {/* HEADER */}
//         <h2 className="text-3xl font-bold text-[#3B6E8F] mb-6">
//           Feedback Overview
//         </h2>

//         {/* BASIC DETAILS */}
//         <div className="grid grid-cols-4 gap-6 text-sm mb-8">
//           <div>
//             <p className="text-gray-700">Interaction</p>
//             <p className="font-semibold">
//               {data.interactionName}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-700">Intern</p>
//             <p className="font-semibold">
//               {data.internName}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-700">Mentor</p>
//             <p className="font-semibold">
//               {data.mentorName || "—"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-700">Interviewer</p>
//             <p className="font-semibold">
//               {data.interviewerName || "—"}
//             </p>
//           </div>
//         </div>

//         {/* OVERALL RATING */}
//         <div className="bg-gray-50 border rounded-2xl p-6 mb-8">
//           <p className="text-lg font-semibold mb-2">
//             Overall Rating
//           </p>

//           <div className="flex items-center gap-3">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Star
//                 key={i}
//                 size={26}
//                 className={
//                   i <= starRating
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }
//               />
//             ))}
//             <span className="text-gray-700 font-semibold">
//               ({percent}%)
//             </span>
//           </div>
//         </div>

//         {/* METRICS */}
//         <div className="space-y-5">
//           {metrics.map((m: any) => {
//             const p =
//               m.maxScore > 0
//                 ? Math.round((m.score / m.maxScore) * 100)
//                 : 0;

//             return (
//               <div key={m.title}>
//                 <div className="flex justify-between mb-1 text-sm">
//                   <span className="font-medium">
//                     {m.title}
//                   </span>
//                   <span className="text-gray-600">
//                     {m.score} / {m.maxScore}
//                   </span>
//                 </div>

//                 <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full rounded-full transition-all"
//                     style={{
//                       width: `${p}%`,
//                       background:
//                         p >= 75
//                           ? "#22c55e"
//                           : p >= 50
//                           ? "#f59e0b"
//                           : "#ef4444",
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* COMMENTS */}
//         {fb.comments && (
//           <div className="mt-8">
//             <p className="text-lg font-semibold mb-2">
//               Descriptive Feedback
//             </p>
//             <div className="bg-gray-50 border rounded-xl p-5 text-gray-700">
//               {fb.comments}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-end mt-10">
//           <button
//             onClick={onClose}
//             className="px-8 py-2 rounded-xl border font-semibold hover:bg-gray-100"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ViewFeedbackModal;



import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  open: boolean;
  data: any;
  viewer?: "admin" | "intern";
  onClose: () => void;
}

const ViewFeedbackModal: React.FC<Props> = ({
  open,
  data,
  viewer = "admin",
  onClose,
}) => {
  if (!open || !data?.feedback) return null;

  const fb = data.feedback;
  const metrics = Array.isArray(fb.metrics) ? fb.metrics : [];

  const totalScore = metrics.reduce(
    (sum: number, m: any) => sum + (m.score || 0),
    0
  );

  const totalMax = metrics.reduce(
    (sum: number, m: any) => sum + (m.maxScore || 0),
    0
  );

  const percent =
    totalMax > 0
      ? Math.round((totalScore / totalMax) * 100)
      : 0;

  const starRating = Math.round((percent / 100) * 5);

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
          bg-white w-full max-w-4xl rounded-3xl
          max-h-[85vh] flex flex-col overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}
        <div className="p-8 border-b">
          <h2 className="text-2xl font-bold text-[#3B6E8F]">
            Feedback Overview
          </h2>

          <div className="grid grid-cols-4 gap-6 text-sm mt-4">
            <div>
              <p className="text-gray-600">Interaction</p>
              <p className="font-semibold">
                {data.interactionName}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Intern</p>
              <p className="font-semibold">
                {data.internName}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Mentor</p>
              <p className="font-semibold">
                {data.mentorName || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Interviewer</p>
              <p className="font-semibold">
                {data.interviewerName || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= BODY (SCROLL) ================= */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* OVERALL RATING */}
          <div className="bg-gray-50 border rounded-2xl p-5">
            <p className="text-lg font-semibold mb-2">
              Overall Rating
            </p>

            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={24}
                  className={
                    i <= starRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="font-semibold text-gray-700">
                ({percent}%)
              </span>
            </div>
          </div>

          {/* METRICS (SCROLL SAFE) */}
          <div>
            <p className="text-lg font-semibold text-[#3B6E8F] mb-4">
              Evaluation Metrics
            </p>

            <div className="space-y-4">
              {metrics.map((m: any) => {
                const p =
                  m.maxScore > 0
                    ? Math.round((m.score / m.maxScore) * 100)
                    : 0;

                return (
                  <div key={m.title}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">
                        {m.title}
                      </span>
                      <span className="text-gray-600">
                        {m.score}/{m.maxScore}
                      </span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${p}%`,
                          background:
                            p >= 75
                              ? "#22c55e"
                              : p >= 50
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COMMENTS */}
          {fb.comments && (
            <div>
              <p className="text-lg font-semibold mb-2">
                Descriptive Feedback
              </p>
              <div className="bg-gray-50 border rounded-xl p-5 text-gray-700">
                {fb.comments}
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-xl border font-semibold hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewFeedbackModal;
