// // src/components/ProfileCards.tsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { fetchProfile, fetchProfessionalInfo } from "../api/profileApi";
// import { motion } from "framer-motion";
// import { useNavigate,useParams} from "react-router-dom";
// import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

// const tabs = [
//   "Personal Information",
//   "Education",
//   "Experience",
//   "Skills",
//   "Professional Information",
// ];

// const ProfileCards: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // const role = user?.role;
//   // const userId = user?.uid;
//  const { userId: paramId } = useParams();

// const isAdmin = user?.role === "admin";
// const isAdminViewingOther = isAdmin && paramId;  // ONLY true when viewing intern via /admin/profile/:userId

// // Role to fetch
// const role = isAdminViewingOther ? "intern" : user?.role;

// // UserId to fetch
// const userId = isAdminViewingOther ? paramId : user?.uid;

// // Should show edit button?
// const canEditProfile = !(isAdminViewingOther); 


// const [showProEdit, setShowProEdit] = useState(false);

//   const [activeTab, setActiveTab] = useState("Personal Information");
//   const [data, setData] = useState<any>(null);
//   const [professionalInformation, setProfessionalInformation] = useState<any>({
//     empId: "",
//     companyEmail: "",
//     designation: "",
//     batch: "",
//     year: "",
//     phase: "",
//     joiningDate: "",
//     status: "",
//   });

//   // ---------------------------------------------------------
//   // LOAD PROFILE + PROFESSIONAL INFO
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (!role || !userId) return;

//     const load = async () => {
//       const res = await fetchProfile(role, userId);

//       const profile = {
//         name: res?.user?.name || "",
//         personalEmail:
//           res?.personalInfo?.personalEmail || res?.user?.email || "",
//         phone: res?.personalInfo?.phone || "",
//         dob: res?.personalInfo?.dob || "",
//         gender: res?.personalInfo?.gender || "",
//         bloodGroup: res?.personalInfo?.bloodGroup || "",
//         currentAddress: res?.personalInfo?.currentAddress || "",
//         permanentAddress: res?.personalInfo?.permanentAddress || "",
//         college: res?.education?.college || "",
//         degree: res?.education?.degree || "",
//         educationBatch: res?.education?.education_batch || "",
//         primarySkill: res?.skills?.primarySkills?.[0] || "",
//         secondarySkills: res?.skills?.secondarySkills || [],
//         experienceYears: res?.experienceYears || "",
//         profileImage:
//           res?.user?.profilePicture ||
//           localStorage.getItem(`profileImage_${userId}`) ||
//           "",
//       };

//       setData(profile);

//       // const prof = await fetchProfessionalInfo(userId);
//       // if (prof) setProfessionalInformation(prof);
//       // Admin's own profile → DO NOT FETCH PROFESSIONAL INFO
// const isAdminViewingSelf = user?.role === "admin" && !paramId;  

// if (!isAdminViewingSelf) {
//   const prof = await fetchProfessionalInfo(userId);
//   if (prof) setProfessionalInformation(prof);
// }

//     };

//     load();
//   }, [role, userId]);

//   if (!data)
//     return <p className="text-center text-white mt-10 text-lg">Loading…</p>;

//   // CARD STYLE
//   const cardClass =
//     "p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

//   const label = "text-[#3B6E8F] text-sm font-semibold";
//   const value = "text-[#1E2A35] text-md";

//   const Item = (title: string, info: any) => (
//     <div className="flex flex-col">
//       <span className={label}>{title}</span>
//       <span className={value}>{info || "—"}</span>
//     </div>
//   );

//   return (
//     <div className="relative w-full min-h-screen">
//       {/* Background Blobs */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-10 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-10 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />

//       <div className="relative z-10 w-[95%] mx-auto py-6 flex gap-8">

//         {/* LEFT SIDEBAR */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className={`${cardClass} w-full md:w-[26rem] h-fit sticky md:top-6 self-start`}
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
//               {data.profileImage ? (
//                 <img
//                   src={data.profileImage}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-600">
//                   No Image
//                 </div>
//               )}
//             </div>

//             <h2 className="text-3xl mt-4 font-bold text-[#1E2A35]">
//               {data.name}
//             </h2>

//             <p className="text-[#3B6E8F] uppercase text-sm">{role}</p>

//             <hr className="w-full border-[#96C2DB]/30 my-6" />

//             {/* CONTACT */}
//             <div className="w-full text-left">
//               <h3 className="text-lg font-semibold text-[#3B6E8F] mb-3">
//                 Contact
//               </h3>
//               <div className="flex items-center gap-3 mb-3">
//                 <FiPhone className="text-[#3B6E8F]" />
//                 <span>{data.phone}</span>
//               </div>

//               <div className="flex items-center gap-3 mb-3">
//                 <FiMail className="text-[#3B6E8F]" />
//                 <span>{data.personalEmail}</span>
//               </div>

//               <div className="flex items-start gap-3 mb-4">
//                 <FiMapPin className="text-[#3B6E8F] mt-1" />
//                 <span>{data.currentAddress}</span>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold text-[#3B6E8F] mt-4">
//               Primary Skill
//             </h3>
//             <span className="px-4 py-1 mt-2 bg-[#96C2DB] text-[#1E2A35] rounded-lg shadow text-sm">
//               {data.primarySkill}
//             </span>
//           </div>
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <div className="flex-1 flex flex-col gap-8">

//           {/* TABS + EDIT */}
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <div className="flex gap-3 flex-wrap">

//               {tabs
//                 .filter(
//                   (t) =>
//                     !(t === "Experience" && role === "intern") &&
//                     !(t === "Professional Information" && role === "admin")
//                 )
//                 .map((t) => (
//                   <motion.button
//                     whileHover={{ scale: 1.07 }}
//                     whileTap={{ scale: 0.96 }}
//                     key={t}
//                     onClick={() => setActiveTab(t)}
//                     className={`px-5 py-2 rounded-xl font-semibold transition 
//                       ${
//                         activeTab === t
//                           ? " bg-[#96C2DB] text-black shadow"
//                           : "bg-white/10 border hover:bg-white/20"
//                       }`}
//                   >
//                     {t}
//                   </motion.button>
//                 ))}
//             </div>

//            {canEditProfile && (
//   <button
//     onClick={() => navigate(`/${role}/profile/edit`)}
//     className="px-5 py-2 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-semibold"
//   >
//     Edit Profile
//   </button>
// )}

//           </div>


//           {/* ============================
//     ADMIN PROFESSION EDIT MODAL
// =============================== */}
// {showProEdit && (
//   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[20000]">
//     <motion.div
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       className="bg-white backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-xl w-[90%] max-w-2xl"
//     >
//       <h2 className="text-2xl font-bold text-[#3B6E8F] mb-6">
//         Edit Professional Information
//       </h2>

//       {/* FORM */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {["empId","companyEmail","designation","batch","year","phase","joiningDate","status"].map((field) => (
//           <div key={field} className="flex flex-col">
//             <label className="text-[#3B6E8F] font-bold mb-1 capitalize">
//               {field.replace(/([A-Z])/g, " $1")}
//             </label>
//             <input
//               className="p-3 rounded-xl bg-white/40 border border-[#96C2DB]/40 focus:ring-2 focus:ring-[#96C2DB] outline-none"
//               value={professionalInformation[field] || ""}
//               onChange={(e) =>
//                 setProfessionalInformation({
//                   ...professionalInformation,
//                   [field]: e.target.value,
//                 })
//               }
//             />
//           </div>
//         ))}

//       </div>

//       {/* BUTTONS */}
//       <div className="flex justify-end gap-4 mt-8">
//         <button
//           onClick={() => setShowProEdit(false)}
//           className="px-6 py-2 bg-white-300 rounded-xl hover:bg-gray-400"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={async () => {
//             const res = await fetch(
//               `http://localhost:8080/interngo/professional/${userId}`,
//               {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   ...professionalInformation,
//                   userId,
//                 }),
//               }
//             );

//             if (res.ok) {
              
//               setShowProEdit(false);
//             } else {
//               alert("Failed to update!");
//             }
//           }}
//           className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl hover:bg-[#2A516A]"
//         >
//           Save
//         </button>
//       </div>
//     </motion.div>
//   </div>
// )}


//           {/* CONTENT CARDS */}
//           {activeTab === "Personal Information" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("DOB", data.dob)}
//                 {Item("Gender", data.gender)}
//                 {Item("Blood Group", data.bloodGroup)}
//                 {Item("Phone", data.phone)}
//                 {Item("Current Address", data.currentAddress)}
//                 {Item("Permanent Address", data.permanentAddress)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Education" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Education</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("College", data.college)}
//                 {Item("Degree", data.degree)}
//                 {Item("Batch", data.educationBatch)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Experience" &&
//             (role === "mentor" || role === "interviewer") && (
//               <motion.div className={cardClass}>
//                 <h3 className="text-2xl text-[#3B6E8F] mb-6">Experience</h3>
//                 {Item("Years of Experience", data.experienceYears)}
//               </motion.div>
//             )}

//           {activeTab === "Professional Information" && role !== "admin" && (
//             <motion.div className={cardClass}>
              

//               <div className="flex justify-between items-center mb-6">
//   <h3 className="text-2xl text-[#3B6E8F]">Professional Information</h3>

//   {user?.role === "admin" && (
//     <button
//   onClick={() => setShowProEdit(true)}
//   className="text-sm px-4 py-1 bg-[#3B6E8F] text-white rounded-lg shadow hover:bg-[#2A516A]"
// >
//   Edit
// </button>
//   )}
// </div>


//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("Emp ID", professionalInformation.empId)}
//                 {Item("Company Email", professionalInformation.companyEmail)}
//                 {Item("Designation", professionalInformation.designation)}
//                 {Item("Batch", professionalInformation.batch)}
//                 {Item("Year", professionalInformation.year)}
//                 {Item("Phase", professionalInformation.phase)}
//                 {Item("Joining Date", professionalInformation.joiningDate)}
//                 {Item("Status", professionalInformation.status)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Skills" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Skills</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("Primary Skill", data.primarySkill)}
//                 {Item(
//                   "Secondary Skills",
//                   data.secondarySkills.length
//                     ? data.secondarySkills.join(", ")
//                     : "—"
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCards;





////dharan's use for db


// // src/components/ProfileCards.tsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { fetchProfile, fetchProfessionalInfo } from "../api/profileApi";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

// const tabs = [
//   "Personal Information",
//   "Education",
//   "Experience",
//   "Skills",
//   "Professional Information",
// ];

// const ProfileCards: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const role = user?.role;
//   const userId = user?.uid;

//   const [activeTab, setActiveTab] = useState("Personal Information");
//   const [data, setData] = useState<any>(null);
//   const [professionalInformation, setProfessionalInformation] = useState<any>({
//     empId: "",
//     companyEmail: "",
//     designation: "",
//     batch: "",
//     year: "",
//     phase: "",
//     joiningDate: "",
//     status: "",
//   });

//   // ---------------------------------------------------------
//   // LOAD PROFILE + PROFESSIONAL INFO
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (!role || !userId) return;

//     const load = async () => {
//       console.log(userId);
//       const res = await fetchProfile(userId);

//       const profile = {
//         name: res?.user?.name || "",
//         personalEmail:
//           res?.personalEmail || res?.user?.email || "",
//         phone: res?.phone || "",
//         dob: res?.dob || "",
//         gender: res?.gender || "",
//         bloodGroup: res?.bloodGroup || "",
//         currentAddress: res?.currentAddress || "",
//         permanentAddress: res?.permanentAddress || "",
//         college: res?.college || "",
//         degree: res?.degree || "",
//         educationBatch: res?.education_batch || "",
//         primarySkill: res?.primarySkills?.[0] || "",
//         secondarySkills: res?.secondarySkills || [],
//         experienceYears: res?.experienceYears || "",
//         profileImage:
//           res?.user?.profilePicture ||
//           localStorage.getItem(`profileImage_${userId}`) ||
//           "",
//       };

//       setData(profile);

//       const prof = await fetchProfessionalInfo(userId);
//       if (prof) setProfessionalInformation(prof);
//     };

//     load();
//   }, [role, userId]);

//   if (!data)
//     return <p className="text-center text-white mt-10 text-lg">Loading…</p>;

//   // CARD STYLE
//   const cardClass =
//     "p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

//   const label = "text-[#3B6E8F] text-sm font-semibold";
//   const value = "text-[#1E2A35] text-md";

//   const Item = (title: string, info: any) => (
//     <div className="flex flex-col">
//       <span className={label}>{title}</span>
//       <span className={value}>{info || "—"}</span>
//     </div>
//   );

//   return (
//     <div className="relative w-full min-h-screen">
//       {/* Background Blobs */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-10 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-10 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />

//       <div className="relative z-10 w-[95%] mx-auto py-6 flex gap-8">

//         {/* LEFT SIDEBAR */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className={`${cardClass} w-full md:w-[26rem] h-fit sticky md:top-6 self-start`}
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
//               {data.profileImage ? (
//                 <img
//                   src={data.profileImage}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-600">
//                   No Image
//                 </div>
//               )}
//             </div>

//             <h2 className="text-3xl mt-4 font-bold text-[#1E2A35]">
//               {data.name}
//             </h2>

//             <p className="text-[#3B6E8F] uppercase text-sm">{role}</p>

//             <hr className="w-full border-[#96C2DB]/30 my-6" />

//             {/* CONTACT */}
//             <div className="w-full text-left">
//               <h3 className="text-lg font-semibold text-[#3B6E8F] mb-3">
//                 Contact
//               </h3>
//               <div className="flex items-center gap-3 mb-3">
//                 <FiPhone className="text-[#3B6E8F]" />
//                 <span>{data.phone}</span>
//               </div>

//               <div className="flex items-center gap-3 mb-3">
//                 <FiMail className="text-[#3B6E8F]" />
//                 <span>{data.personalEmail}</span>
//               </div>

//               <div className="flex items-start gap-3 mb-4">
//                 <FiMapPin className="text-[#3B6E8F] mt-1" />
//                 <span>{data.currentAddress}</span>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold text-[#3B6E8F] mt-4">
//               Primary Skill
//             </h3>
//             <span className="px-4 py-1 mt-2 bg-[#96C2DB] text-[#1E2A35] rounded-lg shadow text-sm">
//               {data.primarySkill}
//             </span>
//           </div>
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <div className="flex-1 flex flex-col gap-8">

//           {/* TABS + EDIT */}
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <div className="flex gap-3 flex-wrap">

//               {tabs
//                 .filter(
//                   (t) =>
//                     !(t === "Experience" && role === "intern") &&
//                     !(t === "Professional Information" && role === "admin")
//                 )
//                 .map((t) => (
//                   <motion.button
//                     whileHover={{ scale: 1.07 }}
//                     whileTap={{ scale: 0.96 }}
//                     key={t}
//                     onClick={() => setActiveTab(t)}
//                     className={`px-5 py-2 rounded-xl font-semibold transition 
//                       ${
//                         activeTab === t
//                           ? " bg-[#96C2DB] text-black shadow"
//                           : "bg-white/10 border hover:bg-white/20"
//                       }`}
//                   >
//                     {t}
//                   </motion.button>
//                 ))}
//             </div>

//             <button
//               onClick={() => navigate(`/${role}/profile/edit`)}
//               className="px-5 py-2 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-semibold"
//             >
//               Edit Profile
//             </button>
//           </div>

//           {/* CONTENT CARDS */}
//           {activeTab === "Personal Information" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("DOB", data.dob)}
//                 {Item("Gender", data.gender)}
//                 {Item("Blood Group", data.bloodGroup)}
//                 {Item("Phone", data.phone)}
//                 {Item("Current Address", data.currentAddress)}
//                 {Item("Permanent Address", data.permanentAddress)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Education" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Education</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("College", data.college)}
//                 {Item("Degree", data.degree)}
//                 {Item("Batch", data.educationBatch)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Experience" &&
//             (role === "mentor" || role === "interviewer") && (
//               <motion.div className={cardClass}>
//                 <h3 className="text-2xl text-[#3B6E8F] mb-6">Experience</h3>
//                 {Item("Years of Experience", data.experienceYears)}
//               </motion.div>
//             )}

//           {activeTab === "Professional Information" && role !== "admin" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">
//                 Professional Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("Emp ID", professionalInformation.empId)}
//                 {Item("Company Email", professionalInformation.companyEmail)}
//                 {Item("Designation", professionalInformation.designation)}
//                 {Item("Batch", professionalInformation.batch)}
//                 {Item("Year", professionalInformation.year)}
//                 {Item("Phase", professionalInformation.phase)}
//                 {Item("Joining Date", professionalInformation.joiningDate)}
//                 {Item("Status", professionalInformation.status)}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "Skills" && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl text-[#3B6E8F] mb-6">Skills</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {Item("Primary Skill", data.primarySkill)}
//                 {Item(
//                   "Secondary Skills",
//                   data.secondarySkills.length
//                     ? data.secondarySkills.join(", ")
//                     : "—"
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCards;





// src/components/ProfileCards.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProfile, fetchProfessionalInfo } from "../api/profileApi";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
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
  const { userId: paramId } = useParams();

  const isAdmin = user?.role === "admin";
  const isAdminViewingOther = isAdmin && paramId;

  // UI Role Display (unchanged)
  const role = isAdminViewingOther ? "intern" : user?.role;

  // User ID to fetch
  const userId = isAdminViewingOther ? paramId : user?.uid;

  // Can edit own profile
  const canEditProfile = !isAdminViewingOther;

  const [showProEdit, setShowProEdit] = useState(false);

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
  // LOAD PROFILE + PROFESSIONAL INFO  (DB FIXED)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
  const res = await fetchProfile(userId);

  const profile = {
    name: res?.name || "",
    personalEmail: res?.personalEmail || res?.email || "",
    phone: res?.phone || "",
    dob: res?.dob || "",
    gender: res?.gender || "",
    bloodGroup: res?.bloodGroup || "",
    currentAddress: res?.currentAddress || "",
    permanentAddress: res?.permanentAddress || "",

    college: res?.college || "",
    degree: res?.degree || "",
    educationBatch: res?.educationYear || "",

    primarySkill: res?.primaryskills?.[0] || "",
    secondarySkills: res?.secondaryskills || [],

    experienceYears: res?.experienceYears || "",

    profileImage:
      res?.profileImage ||
      localStorage.getItem(`profileImage_${userId}`) ||
      "",
  };

  setData(profile);

  // PROFESSIONAL INFO FIXED
  const prof = await fetchProfessionalInfo(userId);
  if (prof) {
   setProfessionalInformation({
  empId: prof.empId,
  companyEmail: prof.empEmail, // FIXED
  designation: prof.designation,
  batch: prof.batch,
  year: prof.year,
  phase: prof.phase || "",
  joiningDate: prof.dateofjoining,
  status: prof.activeStatus ? "Active" : "Inactive",
});

  }
};
load();
  }, [userId]);

  if (!data)
    return <p className="text-center text-white mt-10 text-lg">Loading…</p>;

  // CARD STYLE (unchanged)
  const cardClass =
    "p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

  const label = "text-[#3B6E8F] text-sm font-semibold";
  const value = "text-[#1E2A35] text-md";

  const Item = (title: string, info: any) => (
    <div className="flex flex-col">
      <span className={label}>{title}</span>
      <span className={value}>{info || '—'}</span>
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

          {/* TABS + EDIT BUTTON */}
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

            {canEditProfile && (
              <button
                onClick={() => navigate(`/${role}/profile/edit`)}
                className="px-5 py-2 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* ============================
              ADMIN PROFESSIONAL EDIT MODAL
              =========================== */}
          {showProEdit && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[20000]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-xl w-[90%] max-w-2xl"
              >
                <h2 className="text-2xl font-bold text-[#3B6E8F] mb-6">
                  Edit Professional Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "empId",
                    "companyEmail",
                    "designation",
                    "batch",
                    "year",
                    "phase",
                    "joiningDate",
                    "status",
                  ].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-[#3B6E8F] font-bold mb-1 capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        className="p-3 rounded-xl bg-white/40 border border-[#96C2DB]/40 focus:ring-2 focus:ring-[#96C2DB] outline-none"
                        value={professionalInformation[field] || ""}
                        onChange={(e) =>
                          setProfessionalInformation({
                            ...professionalInformation,
                            [field]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={() => setShowProEdit(false)}
                    className="px-6 py-2 bg-white-300 rounded-xl hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      const res = await fetch(
                        `http://localhost:4000/interngo/professional/${userId}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            ...professionalInformation,
                            userId,
                          }),
                        }
                      );

                      if (res.ok) setShowProEdit(false);
                      else alert("Failed to update!");
                    }}
                    className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl hover:bg-[#2A516A]"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* ============================
              TABS — CONTENT
              =========================== */}

          {activeTab === "Personal Information" && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-6">
                Personal Information
              </h3>
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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl text-[#3B6E8F]">
                  Professional Information
                </h3>

                {user?.role === "admin" && (
                  <button
                    onClick={() => setShowProEdit(true)}
                    className="text-sm px-4 py-1 bg-[#3B6E8F] text-white rounded-lg shadow hover:bg-[#2A516A]"
                  >
                    Edit
                  </button>
                )}
              </div>

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
