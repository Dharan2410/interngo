// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, type Transition } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   getAuth,
// } from "firebase/auth";
// import app from "../firebase";

// const SignIn: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const auth = getAuth(app);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!email.endsWith("@finestcoder.com") && !email.endsWith("@finestcoder.in")) {
//       setError("Use company email (e.g. name@finestcoder.com)");
//       setIsLoading(false);
//       return;
//     }

//     const USE_MOCK = true;

//     if (USE_MOCK) {
//       setTimeout(() => {
//         if (email === "gopika@finestcoder.com") {
//           login({
//             uid: "admin-001",
//             email,
//             role: "admin",
//             token: "mock-admin-token",
//           });
//           navigate("/admin/dashboard");
//           return;
//         }
//         if (email === "mentor@finestcoder.com") {
//           login({
//             uid: "mentor-001",
//             email,
//             role: "mentor",
//             token: "mock-mentor-token",
//           });
//           navigate("/mentor/dashboard");
//           return;
//         }
//         if (email === "interviewer@finestcoder.com") {
//           login({
//             uid: "interviewer-001",
//             email,
//             role: "interviewer",
//             token: "mock-interviewer-token",
//           });
//           navigate("/interviewer/dashboard");
//           return;
//         }
//         if (email === "intern@finestcoder.com") {
//           login({
//             uid: "intern-001",
//             email,
//             role: "intern",
//             token: "mock-intern-token",
//           });
//           navigate("/intern/dashboard");
//           return;
//         }

//         setError("Invalid credentials");
//         setIsLoading(false);
//       }, 800);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       if (
//         user.email?.endsWith("@finestcoder.com") ||
//         user.email?.endsWith("@finestcoder.in")
//       ) {
//         login({
//           uid: user.uid,
//           email: user.email!,
//           role: "intern",
//           token: "google-token",
//         });
//         navigate("/intern/dashboard");
//       } else {
//         await auth.signOut();
//         setError("Only company-registered emails are allowed!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Google sign-in failed. Please try again.");
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Enter your email to reset password");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Password reset link sent to your email!");
//     } catch (error) {
//       console.error("Error sending reset email:", error);
//       setError("Could not send reset link. Try again later.");
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
//       {/* 🌊 Soft Blue Blobs */}
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

//       {/* 💎 Card */}
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
//           Welcome Back
//         </h2>
//         <p className="text-center text-[#3A4750] mb-8 text-lg">
//           Login to continue your journey
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
//           {/* ✉️ Email Input */}
//           <input
//             type="email"
//             placeholder="Company Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="
//               w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
//               focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35]
//               placeholder-gray-500 text-lg
//             "
//             required
//           />

//           {/* 🔒 Password Input */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="
//                 w-full p-4 pr-12 bg-white border border-[#96C2DB]/50 rounded-xl
//                 focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35]
//                 placeholder-gray-500 text-lg
//               "
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
//             >
//               {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//             </button>
//           </div>

//           <p
//             onClick={handleForgotPassword}
//             className="text-[#3B6E8F] text-right text-sm font-medium cursor-pointer hover:underline"
//           >
//             Forgot Password?
//           </p>

//           {/* 🚀 Sign In Button */}
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             className="
//               w-full py-4 rounded-xl bg-[#96C2DB]
//               text-white font-bold text-xl shadow-md hover:bg-[#7DB3CE]
//               transition-all duration-300
//             "
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </motion.button>

//           {/* 🆕 Google Sign-In */}
//           <motion.button
//             type="button"
//             onClick={handleGoogleSignIn}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             className="
//               w-full py-4 rounded-xl bg-white/80 backdrop-blur
//               text-[#1E2A35] font-semibold text-lg shadow-md 
//               hover:bg-white transition-all duration-300
//             "
//           >
//             <span className="flex items-center justify-center gap-3">
//               <img
//                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                 className="w-6 h-6"
//               />
//               <span>Sign in with Google</span>
//             </span>
//           </motion.button>
//         </form>

//         <p className="text-center text-[#1E2A35] mt-8 text-lg">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[#3B6E8F] font-semibold hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SignIn;







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

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-[#96C2DB] text-white font-bold text-xl"
          >
            {isLoading ? "Signing In..." : "Sign In"}
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



