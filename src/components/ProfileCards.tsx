// src/components/ProfileCards.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProfile, fetchProfessionalInfo } from "../api/profileApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const tabs = [
  "Personal Information",
  "Education",
  "Experience",
  "Skills",
  "Professional Information",
];

const ProfileCards: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;
  const userId = user?.uid;

  const [activeTab, setActiveTab] = useState("Personal Information");
  const [data, setData] = useState<any>(null);
  const [professionalInformation, setProfessionalInformation] = useState<any>({
    empId: "",
    companyEmail: "",
    designation: "",
    batch: "",
    year: "",
    phase: "",
    joiningDate: "",
    status: "",
  });

  // ---------------------------------------------------------
  // LOAD PROFILE + PROFESSIONAL INFO
  // ---------------------------------------------------------
  useEffect(() => {
    if (!role || !userId) return;

    const load = async () => {
      const res = await fetchProfile(role, userId);

      const profile = {
        name: res?.user?.name || "",
        personalEmail:
          res?.personalInfo?.personalEmail || res?.user?.email || "",
        phone: res?.personalInfo?.phone || "",
        dob: res?.personalInfo?.dob || "",
        gender: res?.personalInfo?.gender || "",
        bloodGroup: res?.personalInfo?.bloodGroup || "",
        currentAddress: res?.personalInfo?.currentAddress || "",
        permanentAddress: res?.personalInfo?.permanentAddress || "",
        college: res?.education?.college || "",
        degree: res?.education?.degree || "",
        educationBatch: res?.education?.education_batch || "",
        primarySkill: res?.skills?.primarySkills?.[0] || "",
        secondarySkills: res?.skills?.secondarySkills || [],
        experienceYears: res?.experienceYears || "",
        profileImage:
          res?.user?.profilePicture ||
          localStorage.getItem(`profileImage_${userId}`) ||
          "",
      };

      setData(profile);

      const prof = await fetchProfessionalInfo(userId);
      if (prof) setProfessionalInformation(prof);
    };

    load();
  }, [role, userId]);

  if (!data)
    return <p className="text-center text-white mt-10 text-lg">Loading…</p>;

  // CARD STYLE
  const cardClass =
    "p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

  const label = "text-[#3B6E8F] text-sm font-semibold";
  const value = "text-[#1E2A35] text-md";

  const Item = (title: string, info: any) => (
    <div className="flex flex-col">
      <span className={label}>{title}</span>
      <span className={value}>{info || "—"}</span>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
                   filter blur-3xl opacity-40 top-10 left-10 -z-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
                   filter blur-3xl opacity-40 bottom-10 right-10 -z-10"
        animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative z-10 w-[95%] mx-auto py-6 flex gap-8">

        {/* LEFT SIDEBAR */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`${cardClass} w-full md:w-[26rem] h-fit sticky md:top-6 self-start`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
            </div>

            <h2 className="text-3xl mt-4 font-bold text-[#1E2A35]">
              {data.name}
            </h2>

            <p className="text-[#3B6E8F] uppercase text-sm">{role}</p>

            <hr className="w-full border-[#96C2DB]/30 my-6" />

            {/* CONTACT */}
            <div className="w-full text-left">
              <h3 className="text-lg font-semibold text-[#3B6E8F] mb-3">
                Contact
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <FiPhone className="text-[#3B6E8F]" />
                <span>{data.phone}</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <FiMail className="text-[#3B6E8F]" />
                <span>{data.personalEmail}</span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <FiMapPin className="text-[#3B6E8F] mt-1" />
                <span>{data.currentAddress}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#3B6E8F] mt-4">
              Primary Skill
            </h3>
            <span className="px-4 py-1 mt-2 bg-[#96C2DB] text-[#1E2A35] rounded-lg shadow text-sm">
              {data.primarySkill}
            </span>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col gap-8">

          {/* TABS + EDIT */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-3 flex-wrap">

              {tabs
                .filter(
                  (t) =>
                    !(t === "Experience" && role === "intern") &&
                    !(t === "Professional Information" && role === "admin")
                )
                .map((t) => (
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.96 }}
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-5 py-2 rounded-xl font-semibold transition 
                      ${
                        activeTab === t
                          ? " bg-[#96C2DB] text-black shadow"
                          : "bg-white/10 border hover:bg-white/20"
                      }`}
                  >
                    {t}
                  </motion.button>
                ))}
            </div>

            <button
              onClick={() => navigate(`/${role}/profile/edit`)}
              className="px-5 py-2 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-semibold"
            >
              Edit Profile
            </button>
          </div>

          {/* CONTENT CARDS */}
          {activeTab === "Personal Information" && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Item("DOB", data.dob)}
                {Item("Gender", data.gender)}
                {Item("Blood Group", data.bloodGroup)}
                {Item("Phone", data.phone)}
                {Item("Current Address", data.currentAddress)}
                {Item("Permanent Address", data.permanentAddress)}
              </div>
            </motion.div>
          )}

          {activeTab === "Education" && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-6">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Item("College", data.college)}
                {Item("Degree", data.degree)}
                {Item("Batch", data.educationBatch)}
              </div>
            </motion.div>
          )}

          {activeTab === "Experience" &&
            (role === "mentor" || role === "interviewer") && (
              <motion.div className={cardClass}>
                <h3 className="text-2xl text-[#3B6E8F] mb-6">Experience</h3>
                {Item("Years of Experience", data.experienceYears)}
              </motion.div>
            )}

          {activeTab === "Professional Information" && role !== "admin" && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-6">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Item("Emp ID", professionalInformation.empId)}
                {Item("Company Email", professionalInformation.companyEmail)}
                {Item("Designation", professionalInformation.designation)}
                {Item("Batch", professionalInformation.batch)}
                {Item("Year", professionalInformation.year)}
                {Item("Phase", professionalInformation.phase)}
                {Item("Joining Date", professionalInformation.joiningDate)}
                {Item("Status", professionalInformation.status)}
              </div>
            </motion.div>
          )}

          {activeTab === "Skills" && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-6">Skills</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Item("Primary Skill", data.primarySkill)}
                {Item(
                  "Secondary Skills",
                  data.secondarySkills.length
                    ? data.secondarySkills.join(", ")
                    : "—"
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
