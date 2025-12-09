// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, type Transition } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import { validateEmail, validatePassword } from "../utils/validation";

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!validateEmail(email)) {
//       setError("Enter a valid email address.");
//       setIsLoading(false);
//       return;
//     }
//     if (!validatePassword(password)) {
//       setError("Password must be at least 6 characters long.");
//       setIsLoading(false);
//       return;
//     }
//     if (password !== confirm) {
//       setError("Passwords do not match.");
//       setIsLoading(false);
//       return;
//     }

//     // Simulate sign-up success
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate("/signin");
//     }, 1000);
//   };

//   const pageVariants = {
//     initial: { opacity: 0, y: 50 },
//     in: { opacity: 1, y: 0 },
//     out: { opacity: 0, y: -50 },
//   };

//   const pageTransition: Transition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.5,
//   };

//   return (
//     <motion.div
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={pageVariants}
//       transition={pageTransition}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden"
//     >
//       {/* Background Animation Elements */}
//       <motion.div
//         className="absolute w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob top-1/4 left-1/4"
//         animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 bottom-1/4 right-1/4"
//         animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>
//       <motion.div
//         className="absolute w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         animate={{ x: [0, 60, 0], y: [0, 120, 0] }}
//         transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
//         className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-3xl rounded-3xl p-8 sm:p-10 w-full max-w-md z-10 transform-gpu perspective-1000 hover:rotate-y-1 hover:rotate-x-1 transition-all duration-500"
//       >
//         <h2 className="text-5xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
//           Create Account
//         </h2>
//         <p className="text-center text-white/90 mb-8 text-lg font-light">
//           Join us and start your journey
//         </p>

//         {error && (
//           <motion.p
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-red-300 text-center mb-4 bg-red-800/40 p-3 rounded-lg"
//           >
//             {error}
//           </motion.p>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//           <div className="relative">
//             <input
//               type="email"
//               placeholder="Company Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-4 pl-12 bg-white/15 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-gray-300 transition-all duration-300 text-lg"
//               required
//             />
//             <svg
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
//               width="24"
//               height="24"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//               ></path>
//             </svg>
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 pl-12 pr-12 bg-white/15 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-gray-300 transition-all duration-300 text-lg"
//               required
//             />
//             <svg
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
//               width="24"
//               height="24"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               ></path>
//             </svg>
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
//             >
//               {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//             </button>
//           </div>

//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               className="w-full p-4 pl-12 pr-12 bg-white/15 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-gray-300 transition-all duration-300 text-lg"
//               required
//             />
//             <svg
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
//               width="24"
//               height="24"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               ></path>
//             </svg>
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
//             >
//               {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//             </button>
//           </div>

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             disabled={isLoading}
//           >
//             {isLoading ? "Signing Up..." : "Sign Up"}
//           </motion.button>
//         </form>

//         <p className="text-center text-white/90 mt-8 text-lg">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-blue-300 font-semibold hover:underline transition-colors duration-200"
//           >
//             Sign In
//           </Link>
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SignUp;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, type Transition } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Company email validation
    if (
      !email.endsWith("@finestcoder.com") &&
      !email.endsWith("@finestcoder.in")
    ) {
      setError("Use company email (e.g. name@finestcoder.com)");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // CHECK IF USER EXISTS
      const exists = await fetch(
        `http://localhost:8080/users?email=${email}`
      ).then((res) => res.json());

      if (exists.length > 0) {
        setError("User already exists!");
        setIsLoading(false);
        return;
      }

      // CREATE USER IN MOCK DB
      await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: `uid-${Date.now()}`,
          email,
          password,
          role: "intern",
          token: "mock-token",
        }),
      });

      navigate("/signin");
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="
        min-h-screen flex items-center justify-center p-4 relative overflow-hidden
        bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
        text-[#1E2A35]
      "
    >
      {/* Same Blob Background */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply filter blur-2xl opacity-60 top-1/4 left-1/4"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply filter blur-2xl opacity-60 bottom-1/4 right-1/4"
        animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Card UI SAME AS SIGNIN */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="
          relative bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
          shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md z-10
        "
      >
        <h2 className="text-4xl font-extrabold text-center text-[#1E2A35] mb-4">
          Create Account
        </h2>
        <p className="text-center text-[#3A4750] mb-8 text-lg">
          Join and Start Your Journey
        </p>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-center mb-4 bg-red-200/60 p-3 rounded-lg"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
              focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl
                focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl
                focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {/* SIGN UP BUTTON */}
          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#96C2DB] text-white font-bold text-xl shadow-md hover:bg-[#7DB3CE]"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-[#1E2A35] mt-8 text-lg">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#3B6E8F] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
