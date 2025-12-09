// import { motion } from "framer-motion";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SplashScreen = () => {
//   const navigate = useNavigate();

//    useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/signin");
//     },60000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
    
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1 }}
//       className="relative h-screen w-full flex justify-center items-center overflow-hidden 
//                  bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
//     >
//       {/* 💫 Floating glowing blobs */}
//       <motion.div
//         className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 top-1/4 left-1/3"
//         animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
//       ></motion.div>

//       <motion.div
//         className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bottom-1/4 right-1/3"
//         animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
//         transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
//       ></motion.div>

//       <motion.div
//         className="absolute w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 top-2/3 left-1/4"
//         animate={{ x: [0, 60, 0], y: [0, 120, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//       ></motion.div>

//       {/* ⚙️ Glassmorphic Splash Card */}
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 
//                    shadow-2xl rounded-3xl p-10 w-[90%] max-w-md text-center z-10"
//       >
//         <motion.h1
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 1 }}
//           className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 
//                      bg-clip-text text-transparent drop-shadow-lg"
//         >
//           InternGo
//         </motion.h1>

//         <motion.h2
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="mt-4 text-gray-200 text-lg"
//         >
//           India’s First Intern Management Platform
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="text-gray-400 mt-3"
//         >
//           Connecting Interns, Mentors & Interviewers
//         </motion.p>

//         <motion.div
//           animate={{ opacity: [0.3, 1, 0.3] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="mt-8 text-indigo-300 text-sm font-medium"
//         >
//           Loading your workspace...
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SplashScreen;





import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 60000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="
        relative h-screen w-full flex justify-center items-center overflow-hidden
        bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
      "
    >
      {/* 🌊 Soft Floating Blue Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-3xl opacity-50 top-1/4 left-1/3"
        animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-3xl opacity-50 bottom-1/4 right-1/3"
        animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#BBD4E7] rounded-full mix-blend-multiply blur-3xl opacity-50 top-2/3 left-1/4"
        animate={{ x: [0, 60, 0], y: [0, 120, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💎 Glassmorphic Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="
          relative bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
          shadow-xl rounded-3xl p-10 w-[90%] max-w-md text-center z-10
        "
      >
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl font-extrabold text-[#1E2A35]"
        >
          InternGo
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-[#3A4750] text-lg"
        >
          India’s First Intern Management Platform
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-[#4C5B66] mt-3"
        >
          Connecting Interns, Mentors & Interviewers
        </motion.p>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 text-[#3B6E8F] text-sm font-medium"
        >
          Loading your workspace...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
