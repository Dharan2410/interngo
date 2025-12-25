


// // import { motion } from "framer-motion";

// // const ViewFeedbackModal = ({ open, data, onClose }: any) => {
// //   if (!open) return null;

// //   const fb = data.feedback;

// //   return (
// //     <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
// //       <motion.div
// //         initial={{ scale: 0.92, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         transition={{ duration: 0.25 }}
// //         className="bg-white w-full max-w-3xl rounded-3xl p-8"
// //       >
// //         {/* HEADER */}
// //         <div className="mb-6">
// //           <h2 className="text-2xl font-bold text-[#3B6E8F]">
// //             Feedback Overview
// //           </h2>
// //           <p className="text-sm text-gray-600 mt-1">
// //             Interaction performance summary
// //           </p>
// //         </div>

// //         {/* BASIC INFO */}
// //         <div className="grid grid-cols-3 gap-4 text-sm mb-6">
// //           <div>
// //             <p className="text-gray-500">Interaction</p>
// //             <p className="font-semibold">{data.interactionName}</p>
// //           </div>

// //           <div>
// //             <p className="text-gray-500">Intern</p>
// //             <p className="font-semibold">{data.internName}</p>
// //           </div>

// //           <div>
// //             <p className="text-gray-500">Feedback By</p>
// //             <p className="font-semibold capitalize">
// //               {fb.givenBy}
// //             </p>
// //           </div>
// //         </div>

// //         {/* METRIC BARS */}
// //         <div className="space-y-4">
// //           {fb.metrics.map((m: any) => {
// //             const percent = Math.round(
// //               (m.score / m.maxScore) * 100
// //             );

// //             return (
// //               <div key={m.title}>
// //                 <div className="flex justify-between text-sm mb-1">
// //                   <span className="font-medium">
// //                     {m.title}
// //                   </span>
// //                   <span className="text-gray-600">
// //                     {m.score} / {m.maxScore}
// //                   </span>
// //                 </div>

// //                 <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
// //                   <div
// //                     className="h-full rounded-full transition-all"
// //                     style={{
// //                       width: `${percent}%`,
// //                       background:
// //                         percent >= 75
// //                           ? "#22c55e"
// //                           : percent >= 50
// //                           ? "#f59e0b"
// //                           : "#ef4444",
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* COMMENTS */}
// //         {fb.comments && (
// //           <div className="mt-8">
// //             <p className="font-semibold mb-2">
// //               Descriptive Feedback
// //             </p>
// //             <div className="bg-gray-50 border rounded-xl p-4 text-gray-700">
// //               {fb.comments}
// //             </div>
// //           </div>
// //         )}

// //         {/* FOOTER */}
// //         <div className="flex justify-end mt-8">
// //           <button
// //             onClick={onClose}
// //             className="px-6 py-2 rounded-xl border 
// //                        hover:bg-gray-100 font-semibold"
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default ViewFeedbackModal;




// import { motion } from "framer-motion";
// import { Star } from "lucide-react";

// const ViewFeedbackModal = ({ open, data, onClose }: any) => {
//   if (!open) return null;

//   const fb = data.feedback;

//   const totalScore = fb.metrics.reduce(
//     (sum: number, m: any) => sum + m.score,
//     0
//   );

//   const totalMax = fb.metrics.reduce(
//     (sum: number, m: any) => sum + m.maxScore,
//     0
//   );

//   const percent = Math.round((totalScore / totalMax) * 100);
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
//             <p className="font-semibold">{data.interactionName}</p>
//           </div>

//           <div>
//             <p className="text-gray-700">Intern</p>
//             <p className="font-semibold">{data.internName}</p>
//           </div>

//           <div>
//             <p className="text-gray-700">Mentor</p>
//             <p className="font-semibold">{data.mentorName}</p>
//           </div>

//           <div>
//             <p className="text-gray-700">Interviewer</p>
//             <p className="font-semibold">{data.interviewerName}</p>
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

//         {/* METRIC CHART (BAR STYLE) */}
//         <div className="space-y-5">
//           {fb.metrics.map((m: any) => {
//             const p = Math.round((m.score / m.maxScore) * 100);

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

const ViewFeedbackModal = ({
  open,
  data,
  onClose,
  viewer = "admin", // "admin" | "intern"
}: any) => {
  if (!open) return null;

  const fb = data.feedback;

  const totalScore = fb.metrics.reduce(
    (s: number, m: any) => s + m.score,
    0
  );

  const totalMax = fb.metrics.reduce(
    (s: number, m: any) => s + m.maxScore,
    0
  );

  const percent = Math.round((totalScore / totalMax) * 100);
  const starRating = Math.round((percent / 100) * 5);

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-4xl rounded-3xl p-10"
      >
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-[#3B6E8F] mb-6">
          Feedback Summary
        </h2>

        {/* INTERN INFO (ONLY INTERN NAME) */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Intern</p>
          <p className="font-semibold text-lg">
            {data.internName}
          </p>
        </div>

        {/* OVERALL RATING */}
        <div className="bg-gray-50 border rounded-2xl p-6 mb-8">
          <p className="text-lg font-semibold mb-2">
            Overall Rating
          </p>

          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={26}
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

        {/* METRIC BAR CHART */}
        <div className="space-y-5">
          {fb.metrics.map((m: any) => {
            const p = Math.round((m.score / m.maxScore) * 100);

            return (
              <div key={m.title}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">
                    {m.title}
                  </span>
                  <span className="text-gray-600">
                    {m.score}/{m.maxScore}
                  </span>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
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

        {/* COMMENTS */}
        {fb.comments && (
          <div className="mt-8">
            <p className="text-lg font-semibold mb-2">
              Feedback
            </p>
            <div className="bg-gray-50 border rounded-xl p-5 text-gray-700">
              {fb.comments}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-end mt-10">
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
