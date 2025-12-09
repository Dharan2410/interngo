

// import React from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../context/AuthContext";

// const InternDashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden p-6"
//     >
//       {/* 🪄 Animated Background Blobs */}
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
//         className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
//           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
//             Intern Dashboard
//           </h1>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={logout}
//             className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
//             Welcome, <span className="text-blue-300">{user?.email}</span>
//           </h2>
//           <p className="text-white/80 text-lg">
//             You are logged in as{" "}
//             <span className="font-bold text-purple-300">{user?.role}</span>.
//           </p>
//         </motion.div>

//         {/* Dashboard Content */}
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
//               boxShadow: "0 15px 30px rgba(79, 70, 229, 0.4)",
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-md hover:bg-white/20 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-blue-300 mb-2">📋 My Tasks</h3>
//             <p className="text-white/80">
//               Track your assigned tasks, deadlines, and progress effortlessly.
//             </p>
//           </motion.div>

//           {/* Card 2 */}
//           <motion.div
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 15px 30px rgba(147, 51, 234, 0.4)",
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-md hover:bg-white/20 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-purple-300 mb-2">💬 Mentor Feedback</h3>
//             <p className="text-white/80">
//               View mentor feedback, improve your performance, and track growth.
//             </p>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default InternDashboard;




// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { ClipboardList, MessageSquare } from "lucide-react";

// const InternDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="mb-6 text-white/90">
//         <h2 className="text-2xl font-semibold mb-2">
//           Welcome, <span className="text-blue-300">{user?.email}</span>
//         </h2>
//         <p className="text-lg">
//           You are logged in as{" "}
//           <span className="font-bold text-purple-300">{user?.role}</span>.
//         </p>
//       </div>

//       {/* Dashboard Cards */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         {/* 🧾 My Tasks */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/intern/tasks")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <ClipboardList className="text-blue-300" size={28} />
//             <h3 className="text-xl font-semibold">My Tasks</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             Track your assigned tasks, deadlines, and progress effortlessly.
//           </p>
//         </motion.div>

//         {/* 💬 Mentor Feedback */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/intern/feedback")}
//           className="cursor-pointer bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl text-white transition-all"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <MessageSquare className="text-purple-300" size={28} />
//             <h3 className="text-xl font-semibold">Mentor Feedback</h3>
//           </div>
//           <p className="text-white/80 text-sm">
//             View mentor feedback, improve your performance, and track growth.
//           </p>
//         </motion.div>
//       </div>
//       </>
//   );
// };

// export default InternDashboard;






// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { ClipboardList, MessageSquare } from "lucide-react";

// const InternDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="
//         relative min-h-screen w-full p-6 overflow-hidden
//         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
//         text-[#1E2A35]
//       "
//     >
//       {/* 🌊 SOFT LAGOON BLOBS (same as SignIn) */}
//       <motion.div
//         className="absolute w-96 h-96 bg-[#C6DFF1] rounded-full mix-blend-multiply filter blur-2xl opacity-60 top-20 left-32"
//         animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       <motion.div
//         className="absolute w-96 h-96 bg-[#A4C7DF] rounded-full mix-blend-multiply filter blur-2xl opacity-60 bottom-20 right-32"
//         animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       {/* CONTENT AREA */}
//       <div className="relative z-10 max-w-5xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-8 text-[#1E2A35]">
//           <h2 className="text-3xl font-extrabold mb-2">
//             Welcome, <span className="text-[#3B6E8F]">{user?.email}</span>
//           </h2>
//           <p className="text-lg">
//             You are logged in as{" "}
//             <span className="font-bold text-[#3B6E8F]">{user?.role}</span>.
//           </p>
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid sm:grid-cols-2 gap-8">
//           {/* 🧾 My Tasks */}
//           <motion.div
//             whileHover={{ scale: 1.04 }}
//             onClick={() => navigate("/intern/tasks")}
//             className="
//               cursor-pointer bg-white/40 backdrop-blur-2xl
//               border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl
//               hover:shadow-2xl transition-all text-[#1E2A35]
//             "
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <ClipboardList className="text-[#3B6E8F]" size={32} />
//               <h3 className="text-2xl font-bold">My Tasks</h3>
//             </div>
//             <p className="text-[#1E2A35]/70 text-base leading-relaxed">
//               Track your assigned tasks, deadlines, and progress effortlessly.
//             </p>
//           </motion.div>

//           {/* 💬 Mentor Feedback */}
//           <motion.div
//             whileHover={{ scale: 1.04 }}
//             onClick={() => navigate("/intern/feedback")}
//             className="
//               cursor-pointer bg-white/40 backdrop-blur-2xl 
//               border border-[#96C2DB]/40 rounded-3xl p-6 shadow-xl
//               hover:shadow-2xl transition-all text-[#1E2A35]
//             "
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <MessageSquare className="text-[#3B6E8F]" size={32} />
//               <h3 className="text-2xl font-bold">Mentor Feedback</h3>
//             </div>
//             <p className="text-[#1E2A35]/70 text-base leading-relaxed">
//               View mentor feedback, improve your performance, and track growth.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default InternDashboard;




// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { ClipboardList, MessageSquare } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const InternDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div className="relative overflow-hidden">

//       {/* 🌊 Lagoon SOFT Blobs (same as AdminDashboard) */}
//       {/* <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-10 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//       />

//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-10 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
//       /> */}



//        {/* Blobs */}
//             <motion.div
//               className="absolute w-80 h-80 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-50 top-1/4 left-20"
//               animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//               transition={{ duration: 12, repeat: Infinity }}
//             />
//             <motion.div
//               className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-50 bottom-10 right-20"
//               animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
//               transition={{ duration: 12, repeat: Infinity }}
//             />
      

//       {/* CONTENT */}
//       <div className="relative z-10">

//         {/* Header Text */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold mb-2 text-[#1E2A35]">
//             Welcome, <span className="text-[#3B6E8F]">{user?.email}</span>
//           </h2>
//           <p className="text-lg text-[#3A4750]">
//             You are logged in as{" "}
//             <span className="font-bold text-[#3B6E8F]">{user?.role}</span>.
//           </p>
//         </div>

//         {/* Dashboard Cards */}
//         <div className="grid sm:grid-cols-2 gap-6">

//           {/* 🧾 My Tasks */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             onClick={() => navigate("/intern/tasks")}
//             className="cursor-pointer bg-white/70 backdrop-blur-xl 
//                        border border-[#96C2DB]/40 rounded-2xl p-6 shadow-lg 
//                        hover:shadow-2xl transition-all"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <ClipboardList className="text-[#3B6E8F]" size={28} />
//               <h3 className="text-xl font-semibold text-[#1E2A35]">My Tasks</h3>
//             </div>
//             <p className="text-[#3A4750] text-sm">
//               Track your assigned tasks and progress effortlessly.
//             </p>
//           </motion.div>

//           {/* 💬 Mentor Feedback */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             onClick={() => navigate("/intern/feedback")}
//             className="cursor-pointer bg-white/70 backdrop-blur-xl 
//                        border border-[#96C2DB]/40 rounded-2xl p-6 shadow-lg 
//                        hover:shadow-2xl transition-all"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <MessageSquare className="text-[#3B6E8F]" size={28} />
//               <h3 className="text-xl font-semibold text-[#1E2A35]">
//                 Mentor Feedback
//               </h3>
//             </div>
//             <p className="text-[#3A4750] text-sm">
//               View mentor feedback and track your growth.
//             </p>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternDashboard;





// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { ClipboardList, MessageSquare } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const InternDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div
//       className="
//         relative min-h-screen p-6 overflow-hidden
//         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
//         text-[#1E2A35]
//       "
//     >
//       {/* 🌊 Soft Lagoon Blobs */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
//                    mix-blend-multiply blur-3xl opacity-50 top-20 left-10 -z-10"
//         animate={{ x: [0, 80, 0], y: [0, 70, 0] }}
//         transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full 
//                    mix-blend-multiply blur-3xl opacity-50 bottom-20 right-10 -z-10"
//         animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
//         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* HEADER */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold">
//           Welcome, <span className="text-[#3B6E8F]">{user?.email}</span>
//         </h2>
//         <p className="text-lg mt-1">
//           You are logged in as{" "}
//           <span className="font-semibold text-[#3B6E8F]">{user?.role}</span>.
//         </p>
//       </div>

//       {/* CARDS */}
//       <div className="grid sm:grid-cols-2 gap-6">

//         {/* 🧾 My Tasks */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/intern/tasks")}
//           className="
//             cursor-pointer bg-white/60 backdrop-blur-2xl 
//             border border-[#96C2DB]/40 rounded-3xl p-6 
//             shadow-xl hover:shadow-2xl transition-all
//           "
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <ClipboardList className="text-[#3B6E8F]" size={30} />
//             <h3 className="text-xl font-semibold">My Tasks</h3>
//           </div>
//           <p className="text-[#3A4750] text-sm">
//             Track your assigned tasks and progress effortlessly.
//           </p>
//         </motion.div>

//         {/* 💬 Mentor Feedback */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           onClick={() => navigate("/intern/feedback")}
//           className="
//             cursor-pointer bg-white/60 backdrop-blur-2xl 
//             border border-[#96C2DB]/40 rounded-3xl p-6 
//             shadow-xl hover:shadow-2xl transition-all
//           "
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <MessageSquare className="text-[#3B6E8F]" size={30} />
//             <h3 className="text-xl font-semibold">Mentor Feedback</h3>
//           </div>
//           <p className="text-[#3A4750] text-sm">
//             View mentor feedback and track your growth.
//           </p>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default InternDashboard;






import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ClipboardList, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState,useEffect } from "react";


const InternDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  
    useEffect(() => {
    if (!user?.role || !user?.uid) return;
  
    fetch(`http://localhost:8080/interngo/profile/${user.role}/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfilePic(data?.user?.profilePicture || "");
      })
      .catch((err) => console.log(err));
  }, [user]);
  
   const finalProfileImage =
    profilePic?.trim()
      ? profilePic
      : "https://i.ibb.co/4pDNDk1/avatar.png"; // default

  return (
    <>
      {/* 🌊 Lagoon Soft Blobs — no outer container */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   top-20 left-10 -z-10"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   bottom-20 right-10 -z-10"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

     {/* PROFILE + HEADER */}
<div className="flex items-center gap-4 mb-8 relative z-10">

  {/* Profile Image */}
  <img
    src={finalProfileImage}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover border-4 border-[#96C2DB]"
  />

  <div>
    <h2 className="text-3xl font-bold text-[#1E2A35]">
      Welcome, <span className="text-[#3B6E8F]">{user?.email}</span>
    </h2>
    <p className="text-lg mt-1 text-[#3A4750]">
      You are logged in as{" "}
      <span className="font-semibold text-[#3B6E8F]">{user?.role}</span>.
    </p>
  </div>

</div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 gap-6 relative z-10">

        {/* 🧾 My Tasks */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/intern/tasks")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              My Tasks
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Track your assigned tasks and progress effortlessly.
          </p>
        </motion.div>

        {/* 💬 Mentor Feedback */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/intern/feedback")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Mentor Feedback
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            View mentor feedback and track your growth.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default InternDashboard;
