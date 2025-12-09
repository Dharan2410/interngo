

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";


const AdminDashboard: React.FC = () => {
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
      {/* 🌊 Lagoon Soft Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   top-20 left-10 -z-10"
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
                   mix-blend-multiply blur-3xl opacity-40 
                   bottom-20 right-10 -z-10"
        animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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

        {/* Manage Mentors */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin/manage-mentors")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Manage Mentors
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Add, update, or remove mentors from the system.
          </p>
        </motion.div>

        {/* Review Interns */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin/review-interns")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-6 
            shadow-xl hover:shadow-2xl transition-all
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="text-[#3B6E8F]" size={30} />
            <h3 className="text-xl font-semibold text-[#1E2A35]">
              Review Interns
            </h3>
          </div>
          <p className="text-[#3A4750] text-sm">
            Monitor intern performance, attendance, and reports.
          </p>
        </motion.div>

      </div>
    </>
  );
};

export default AdminDashboard;
