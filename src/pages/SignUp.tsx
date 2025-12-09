


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, type Transition } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Company email validation
//     if (
//       !email.endsWith("@finestcoder.com") &&
//       !email.endsWith("@finestcoder.in")
//     ) {
//       setError("Use company email (e.g. name@finestcoder.com)");
//       setIsLoading(false);
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       setIsLoading(false);
//       return;
//     }

//     if (password !== confirm) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // CHECK IF USER EXISTS
//       const exists = await fetch(
//         `http://localhost:8080/users?email=${email}`
//       ).then((res) => res.json());

//       if (exists.length > 0) {
//         setError("User already exists!");
//         setIsLoading(false);
//         return;
//       }

//       // CREATE USER IN MOCK DB
//       await fetch("http://localhost:8080/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           uid: `uid-${Date.now()}`,
//           email,
//           password,
//           role: "intern",
//           token: "mock-token",
//         }),
//       });

//       navigate("/signin");
//     } catch (err) {
//       setError("Signup failed. Try again.");
//     } finally {
//       setIsLoading(false);
//     }
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
//       className="
//         min-h-screen flex items-center justify-center p-4 relative overflow-hidden
//         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
//         text-[#1E2A35]
//       "
//     >
//       {/* Same Blob Background */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply filter blur-2xl opacity-60 top-1/4 left-1/4"
//         animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       <motion.div
//         className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply filter blur-2xl opacity-60 bottom-1/4 right-1/4"
//         animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       ></motion.div>

//       {/* Card UI SAME AS SIGNIN */}
//       <motion.div
//         initial={{ scale: 0.85, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className="
//           relative bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
//           shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md z-10
//         "
//       >
//         <h2 className="text-4xl font-extrabold text-center text-[#1E2A35] mb-4">
//           Create Account
//         </h2>
//         <p className="text-center text-[#3A4750] mb-8 text-lg">
//           Join and Start Your Journey
//         </p>

//         {error && (
//           <motion.p
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-red-600 text-center mb-4 bg-red-200/60 p-3 rounded-lg"
//           >
//             {error}
//           </motion.p>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//           {/* EMAIL */}
//           <input
//             type="email"
//             placeholder="Company Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
//               focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
//             required
//           />

//           {/* PASSWORD */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl
//                 focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
//             >
//               {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//             </button>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               className="w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl
//                 focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35] placeholder-gray-500 text-lg"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
//             >
//               {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//             </button>
//           </div>

//           {/* SIGN UP BUTTON */}
//           <motion.button
//             type="submit"
//             className="w-full py-4 rounded-xl bg-[#96C2DB] text-white font-bold text-xl shadow-md hover:bg-[#7DB3CE]"
//           >
//             {isLoading ? "Signing Up..." : "Sign Up"}
//           </motion.button>
//         </form>

//         <p className="text-center text-[#1E2A35] mt-8 text-lg">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-[#3B6E8F] font-semibold hover:underline"
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
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/authApi"; // <-- NEW

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 🔥 CALL JSON SERVER BACKEND
      const user = await loginUser(email, password);

      // 🔥 SAVE USER IN CONTEXT
      login({
        uid: user.uid,
        email: user.email,
        role: user.role,
        token: user.token,
        
      });

      // 🔥 REDIRECT BASED ON ROLE
      const roleRoutes: Record<string, string> = {
        admin: "/admin/dashboard",
        intern: "/intern/dashboard",
        mentor: "/mentor/dashboard",
        interviewer: "/interviewer/dashboard",
      };

      navigate(roleRoutes[user.role] || "/");
    } catch (err: any) {
      setError(err.message || "Login failed");
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
      {/* UI SAME — NOTHING CHANGED */}
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
          Welcome Back
        </h2>
        <p className="text-center text-[#3A4750] mb-8 text-lg">
          Login to continue your journey
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
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl"
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
          <div className="text-right -mt-4">
    <button
      type="button"
      onClick={() => navigate("/forgot-password")}
      className="text-[#3B6E8F] text-sm hover:underline"
    >
      Forgot Password?
    </button>
  </div>
  

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-[#96C2DB] text-white font-bold text-xl"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </motion.button>
           <motion.button
    type="button"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => console.log("Google Sign In pressed")}
    className="
      w-full py-3 rounded-xl
      bg-white border border-[#96C2DB]/60 
      flex items-center justify-center gap-3
      text-[#1E2A35] font-semibold
      shadow-sm hover:shadow-md transition
    "
  >
    <img
  src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
  alt="Google"
  className="w-6 h-6"
/>

    Sign in with Google
  </motion.button>
        </form>

        <p className="text-center text-[#1E2A35] mt-8 text-lg">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#3B6E8F] font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;



