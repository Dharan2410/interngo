// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { validateEmail, validatePassword } from "../utils/validation";

// const AuthForm: React.FC = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//     setError("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (!validatePassword(password)) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
//     setError("");
//     alert(`${isSignIn ? "Signed In" : "Signed Up"} successfully!`);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl relative overflow-hidden"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-3xl font-bold text-center text-gray-800 mb-6"
//         >
//           {isSignIn ? "Welcome Back 👋" : "Create Your Account ✨"}
//         </motion.h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition-all duration-300"
//           >
//             {isSignIn ? "Sign In" : "Sign Up"}
//           </motion.button>
//         </form>

//         <div className="text-center mt-4">
//           <button
//             onClick={toggleForm}
//             className="text-indigo-600 hover:text-indigo-800 font-medium transition-all"
//           >
//             {isSignIn
//               ? "Don't have an account? Sign Up"
//               : "Already have an account? Sign In"}
//           </button>
//         </div>

//         {/* Decorative animated background elements */}
//         <motion.div
//           className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 blur-2xl"
//           animate={{
//             x: [0, 10, -10, 0],
//             y: [0, 10, -10, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         ></motion.div>

//         <motion.div
//           className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-300 rounded-full opacity-20 blur-2xl"
//           animate={{
//             x: [0, -10, 10, 0],
//             y: [0, -10, 10, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         ></motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default AuthForm;




import React, { useState } from "react";
import { motion } from "framer-motion";
import { validateEmail, validatePassword } from "../utils/validation";

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    alert(`${isSignIn ? "Signed In" : "Signed Up"} successfully!`);
  };

  return (
    <div
      className="
      flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB] 
      text-[#1E2A35] relative overflow-hidden
    "
    >
      {/* 🌊 Soft Lagoon Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
        filter blur-3xl opacity-50 top-10 left-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
        filter blur-3xl opacity-40 bottom-10 right-10"
        animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💎 Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          w-full max-w-md p-8 
          bg-white/70 backdrop-blur-2xl 
          border border-[#96C2DB]/40 
          rounded-2xl shadow-xl relative z-10
        "
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-center text-[#08212d] mb-6"
        >
          {isSignIn ? "Welcome Back 👋" : "Create Your Account ✨"}
        </motion.h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full p-3 rounded-lg bg-white border border-[#96C2DB]/50 
              focus:ring-2 focus:ring-[#96C2DB] outline-none 
              text-[#1E2A35] placeholder-gray-500
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full p-3 rounded-lg bg-white border border-[#96C2DB]/50 
              focus:ring-2 focus:ring-[#96C2DB] outline-none 
              text-[#1E2A35] placeholder-gray-500
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="
              w-full py-3 rounded-lg bg-[#96C2DB] 
              text-[#08212d] font-bold text-lg 
              shadow-md hover:bg-[#7DB3CE] transition-all
            "
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </motion.button>
        </form>

        {/* SWITCH */}
        <div className="text-center mt-5">
          <button
            onClick={toggleForm}
            className="text-[#3B6E8F] hover:text-[#1E2A35] font-medium transition"
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
