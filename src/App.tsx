// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SplashScreen from "./components/SplashScreen";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import InternDashboard from "./pages/InternDashboard";
// import MentorDashboard from "./pages/MentorDashboard";
// import InterviewerDashboard from "./pages/InterviewerDashboard";
// import DashboardHome from "./pages/DashboardHome";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import { AuthProvider } from "./context/AuthContext";

// const App: React.FC = () => {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <AuthProvider>
//       <Router>
//         {showSplash ? (
//           <SplashScreen />
//         ) : (
//           <Routes>
//             {/* Authentication Routes */}
//             <Route path="/" element={<Navigate to="/signin" />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <DashboardHome />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute role="admin">
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/intern"
//               element={
//                 <ProtectedRoute role="intern">
//                   <InternDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/mentor"
//               element={
//                 <ProtectedRoute role="mentor">
//                   <MentorDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/interviewer"
//               element={
//                 <ProtectedRoute role="interviewer">
//                   <InterviewerDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Handle any unknown route */}
//             <Route path="*" element={<Navigate to="/signin" />} />
//           </Routes>
//         )}
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;




import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;
  

  return (
  // <div className="flex-10 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
    // <div className="flex-10 min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-gray-800 overflow-hidden">
     <div className="min-h-screen bg-[#323232] text-[#DDD0C8] overflow-hidden">
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </div>
  );
}
