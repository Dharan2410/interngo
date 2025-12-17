



import React,{useState,useEffect}from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserCircle, FileText, MessageSquare, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MentorDashboard: React.FC = () => {
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
