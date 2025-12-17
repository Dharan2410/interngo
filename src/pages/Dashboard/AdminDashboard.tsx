

import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList,Megaphone } from "lucide-react";
import { useAuth} from "../../context/AuthContext";
// import { useEffect, useState } from "react";


const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<any[]>([]);

   useEffect(() => {
  fetch("http://localhost:4000/interngo/announcements")
    .then((res) => res.json())
    .then((data) => setAnnouncements(data))
    .catch(() => setAnnouncements([]));
}, []);


const finalProfileImage =
  user?.profileImage?.trim()
    ? user.profileImage
    : "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <>
      {/*  Lagoon Soft Blobs */}
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
<div className="flex items-center gap-4 mb-8 relative z-10 mt-0.5">

  {/* Profile Image */}
  <img
    src={finalProfileImage}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover border-4 border-[#96C2DB]"
  />

  <div>
    <h2 className="text-3xl font-bold text-[#1E2A35]">
      Welcome, <span className="text-[#3B6E8F]">{user?.name}</span>
    </h2>
    <p className="text-lg mt-1 text-[#3A4750]">
      You are logged in as{" "}
      <span className="font-semibold text-[#3B6E8F]">{user?.role}</span>.
    </p>
  </div>

</div>
{/* 📢 ANNOUNCEMENTS */}
<motion.div
  whileHover={{ scale: 1.02 }}
  className="
    bg-white/60 backdrop-blur-2xl
    border border-[#96C2DB]/40
    rounded-3xl p-6
    shadow-xl transition-all mb-10
  "
>

{/* <div className="relative z-10 mb-10"> */}
  {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5"> */}

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">📢</span>
        <h3 className="text-lg font-semibold text-[#1E2A35]">
          Announcements
        </h3>
      </div>

      {/* Admin Action */}
      <button
        onClick={() => navigate("/admin/announcement")}
        className="text-sm px-4 py-1.5 rounded-lg 
                   bg-[#3B6E8F] text-white 
                   hover:bg-[#2A516A] transition"
      >
        + New
      </button>
    </div>

    {/* Content */}
    {announcements.length === 0 ? (
      <div className="bg-gray-50 rounded-xl py-10 text-center text-sm text-gray-500">
        🚀 No announcements yet. Create one to notify users.
      </div>
    ) : (
      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 px-4 py-3 rounded-xl 
                       bg-gray-50 border border-gray-200
                       hover:bg-gray-100 transition"
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
  {/* </div> */}
{/* </div> */}
</motion.div>


      {/* CARDS */}
      <div className="grid sm:grid-cols-2 gap-6 relative z-10">

        {/* Manage Mentors */}
        <motion.div
          whileHover={{ scale: 1.03 }}
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
          whileHover={{ scale: 1.03 }}
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
