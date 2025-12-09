// import React from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../context/AuthContext";

// const MentorDashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden p-6"
//     >
//       {/* ✨ Animated Glowing Background Blobs */}
//       <motion.div
//         className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-1/3 left-1/4"
//         animate={{ x: [0, 100, 0], y: [0, 80, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 bottom-1/3 right-1/4"
//         animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
//         transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         animate={{ x: [0, 70, 0], y: [0, 60, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       {/* 💠 Glass Dashboard Card */}
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 40 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-3xl rounded-3xl p-10 w-full max-w-4xl text-white z-10"
//       >
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 mb-8">
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-lg">
//             Mentor Dashboard
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
//             You are logged in as a{" "}
//             <span className="font-bold text-purple-300">{user?.role}</span>.
//           </p>
//         </motion.div>

//         {/* Mentor Functionalities */}
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
//               👩‍🎓 Assigned Interns
//             </h3>
//             <p className="text-white/80">
//               View and guide your assigned interns through their learning path.
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
//               📅 Schedule Sessions
//             </h3>
//             <p className="text-white/80">
//               Plan mentorship sessions, evaluations, and feedback meetings effortlessly.
//             </p>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default MentorDashboard;


// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { UserCircle, FileText, MessageSquare, Clock } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const MentorDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Welcome Section */}
//       <div className="mb-6 text-white/90">
//         <h2 className="text-2xl font-semibold mb-2">
//           Welcome, <span className="text-pink-300">{user?.email}</span>
//         </h2>
//         <p className="text-lg">
//           You are logged in as{" "}
//           <span className="font-bold text-pink-400">{user?.role}</span>.
//         </p>
//       </div>

//       {/* Mentor Cards */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/mentor/profile")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <UserCircle className="text-pink-300" size={28} />
//             <h3 className="text-xl font-semibold">Profile</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             View and update your mentor profile and personal details.
//           </p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/mentor/daily-update")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <FileText className="text-pink-300" size={28} />
//             <h3 className="text-xl font-semibold">Daily Update</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             Log your daily mentoring activities and progress.
//           </p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/mentor/interactions")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <MessageSquare className="text-pink-300" size={28} />
//             <h3 className="text-xl font-semibold">Interactions</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             View and manage your intern interactions and meetings.
//           </p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/mentor/pending-tickets")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <Clock className="text-pink-300" size={28} />
//             <h3 className="text-xl font-semibold">Pending Tickets</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             Track pending requests or issues assigned to you.
//           </p>
//         </motion.div>
//       </div>
  
//     </>
//   );
// };

// export default MentorDashboard;






import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserCircle, FileText, MessageSquare, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MentorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* 🌊 Lagoon Soft Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
                   blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 70, 0], y: [0, 45, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
                   blur-3xl opacity-40 bottom-20 right-10 -z-10"
        animate={{ x: [0, -70, 0], y: [0, -45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Welcome Section */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-[#1E2A35]">
          Welcome, <span className="text-[#3B6E8F]">{user?.email}</span>
        </h2>
        <p className="text-lg mt-1 text-[#3A4750]">
          You are logged in as{" "}
          <span className="font-semibold text-[#3B6E8F]">{user?.role}</span>.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 gap-6 relative z-10">

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/mentor/profile")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl 
            hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <UserCircle className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">Profile</h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            View and update your mentor profile and personal details.
          </p>
        </motion.div>

        {/* Daily Update */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/mentor/daily-update")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl 
            hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Daily Update
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Log your daily mentoring activities and progress.
          </p>
        </motion.div>

        {/* Interactions */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/mentor/interactions")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl 
            hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Interactions
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            View and manage your intern interactions and meetings.
          </p>
        </motion.div>

        {/* Pending Tickets */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/mentor/pending-tickets")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl 
            hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Pending Tickets
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Track pending requests or issues assigned to you.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default MentorDashboard;
