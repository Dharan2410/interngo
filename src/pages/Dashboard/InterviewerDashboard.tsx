// import React from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../context/AuthContext";

// const InterviewerDashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden p-6"
//     >
//       {/* ✨ Animated Background Blobs */}
//       <motion.div
//         className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-1/4 left-1/4"
//         animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 bottom-1/4 right-1/4"
//         animate={{ x: [0, -100, 0], y: [0, -60, 0] }}
//         transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         animate={{ x: [0, 80, 0], y: [0, 100, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       {/* 💠 Glassmorphism Dashboard Card */}
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 40 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-3xl rounded-3xl p-10 w-full max-w-4xl text-white z-10"
//       >
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 mb-8">
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-lg">
//             Interviewer Dashboard
//           </h1>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={logout}
//             className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             Logout
//           </motion.button>
//         </header>

//         {/* Welcome Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-center mb-8"
//         >
//           <h2 className="text-2xl font-semibold mb-2">
//             Welcome, <span className="text-pink-300">{user?.email}</span>
//           </h2>
//           <p className="text-white/80 text-lg">
//             You are logged in as an{" "}
//             <span className="font-bold text-purple-300">{user?.role}</span>.
//           </p>
//         </motion.div>

//         {/* Dashboard Functionalities */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           {/* Card 1 */}
//           <motion.div
//             whileHover={{
//               scale: 1.05,
//               rotateY: 5,
//               rotateX: -5,
//               boxShadow: "0 15px 30px rgba(236, 72, 153, 0.4)",
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-md hover:bg-white/20 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-pink-300 mb-2">
//               🎯 Upcoming Interviews
//             </h3>
//             <p className="text-white/80">
//               Manage interview slots, schedules, and assigned candidates with ease.
//             </p>
//           </motion.div>

//           {/* Card 2 */}
//           <motion.div
//             whileHover={{
//               scale: 1.05,
//               rotateY: -5,
//               rotateX: 5,
//               boxShadow: "0 15px 30px rgba(168, 85, 247, 0.4)",
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-md hover:bg-white/20 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-purple-300 mb-2">
//               🧾 Evaluation Reports
//             </h3>
//             <p className="text-white/80">
//               Submit feedback and access evaluation summaries for each intern.
//             </p>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default InterviewerDashboard;



// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { CalendarDays, ClipboardCheck } from "lucide-react";

// const InterviewerDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
    
//       {/* Welcome Section */}
//       <div className="mb-6 text-white/90">
//         <h2 className="text-2xl font-semibold mb-2">
//           Welcome, <span className="text-indigo-300">{user?.email}</span>
//         </h2>
//         <p className="text-lg">
//           You are logged in as{" "}
//           <span className="font-bold text-purple-300">{user?.role}</span>.
//         </p>
//       </div>

//       {/* Dashboard Cards */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         {/* 📅 Upcoming Interviews */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/interviewer/schedule")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <CalendarDays className="text-blue-300" size={28} />
//             <h3 className="text-xl font-semibold">Upcoming Interviews</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             Manage and track your interview schedules and assigned interns efficiently.
//           </p>
//         </motion.div>

//         {/* 🧾 Evaluation Reports */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/interviewer/evaluations")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <ClipboardCheck className="text-purple-300" size={28} />
//             <h3 className="text-xl font-semibold">Evaluation Reports</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             Review and submit evaluation reports for each candidate with ease.
//           </p>
//         </motion.div>
//       </div>

//     </>
//   );
// };

// export default InterviewerDashboard;







import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, ClipboardCheck } from "lucide-react";

const InterviewerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<any[]>([]);
useEffect(() => {
  fetch("http://localhost:4000/interngo/announcements")
    .then((res) => res.json())
    .then((data) => setAnnouncements(data))
    .catch(() => setAnnouncements([]));
}, []);


  return (
    <>
      {/* 🌊 Lagoon Soft Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   top-20 left-10 -z-10"
        animate={{ x: [0, 70, 0], y: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   bottom-20 right-10 -z-10"
        animate={{ x: [0, -70, 0], y: [0, -45, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Welcome Section */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-[#1E2A35]">
          Welcome, <span className="text-[#3B6E8F]">{user?.name}</span>
        </h2>
        <p className="text-lg mt-1 text-[#3A4750]">
          You are logged in as{" "}
          <span className="font-semibold text-[#3B6E8F]">{user?.role}</span>.
        </p>
      </div>


      {/* 📢 ANNOUNCEMENTS (VIEW ONLY) */}
<motion.div
  whileHover={{ scale: 1.02 }}
  className="
    bg-white/60 backdrop-blur-2xl
    border border-[#96C2DB]/40
    rounded-3xl p-6
    shadow-xl transition-all
    mb-12
  "
>
  {/* Header (NO +New button) */}
  <div className="flex items-center gap-2 mb-4">
    <span className="text-lg">📢</span>
    <h3 className="text-lg font-semibold text-[#1E2A35]">
      Announcements
    </h3>
  </div>

  {/* Content */}
  {announcements.length === 0 ? (
    <div className="bg-gray-50 rounded-xl py-10 text-center text-sm text-gray-500">
      🚀 No announcements yet. Stay tuned!
    </div>
  ) : (
    <div className="space-y-3">
      {announcements.map((a) => (
        <div
          key={a.id}
          className="
            flex items-start gap-3
            px-4 py-3 rounded-xl
            bg-gray-50 border border-gray-200
            hover:bg-gray-100 transition
          "
        >
          <span className="mt-1">📌</span>

          <div className="flex-1">
            <p className="font-medium text-[#1E2A35]">
              {a.title}
            </p>
            <p className="text-sm text-gray-600">
              {a.message}
            </p>
          </div>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {new Date(a.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )}
</motion.div>


      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 gap-6 relative z-10">

        {/* 📅 Upcoming Interviews */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/interviewer/schedule")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <CalendarDays className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Upcoming Interviews
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Manage and track your interview schedules and assigned interns
            efficiently.
          </p>
        </motion.div>

        {/* 🧾 Evaluation Reports */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/interviewer/evaluations")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <ClipboardCheck className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Evaluation Reports
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Review and submit evaluation reports for each candidate with ease.
          </p>
        </motion.div>

      </div>
    </>
  );
};

export default InterviewerDashboard;
