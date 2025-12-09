// // src/components/ProfileForm.tsx
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { fetchProfile, saveProfile } from "../api/profileApi";
// import { useAuth } from "../context/AuthContext";
// import Cropper from "react-easy-crop";

// // Local type for crop area (instead of importing Area)
// type CropArea = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// // ---------- Helper to create image ----------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = url;
//     image.onload = () => resolve(image);
//     image.onerror = (err) => reject(err);
//   });

// // ---------- Crop image to base64 ----------
// const getCroppedImg = async (
//   imageSrc: string,
//   pixelCrop: CropArea
// ): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Failed to get canvas context");

//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return canvas.toDataURL("image/png");
// };

// const skillOptions = [
//   "React",
//   "Node.js",
//   "Python",
//   "Java",
//   "C++",
//   "UI/UX Design",
//   "Data Analysis",
//   "Machine Learning",
//   "Cloud Computing",
//   "SQL",
// ];

// const genderOptions = ["Male", "Female", "Other"];

// type DropdownType = "gender" | "primarySkill" | "secondarySkill";

// const ProfileForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const role = user?.role;
//   const userId = user?.uid;

//   const [formData, setFormData] = useState<any>({
//     name: "",
//     personalEmail: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     bloodGroup: "",
//     currentAddress: "",
//     permanentAddress: "",
//     college: "",
//     degree: "",
//     educationBatch: "",
//     primarySkill: "",
//     secondarySkills: [],
//     experienceYears: "",
//     profileImage: "",
//   });

//   const [dropdown, setDropdown] = useState({
//     gender: false,
//     primarySkill: false,
//     secondarySkill: false,
//   });

//   const [customPrimary, setCustomPrimary] = useState("");
//   const [customSecondary, setCustomSecondary] = useState("");
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // Image cropper states
//   const [showCropper, setShowCropper] = useState(false);
//   const [cropSrc, setCropSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] =
//     useState<CropArea | null>(null);
//   const [isCropping, setIsCropping] = useState(false);

//   // Load profile + local image
//   useEffect(() => {
//     if (!role || !userId) return;
//     const load = async () => {
//       try {
//         // 1️⃣ localStorage image
//         const localImg = localStorage.getItem(`profileImage_${userId}`);
//         if (localImg) {
//           setFormData((prev: any) => ({ ...prev, profileImage: localImg }));
//         }

//         // 2️⃣ backend profile
//         const res = await fetchProfile(role, userId);
//         setFormData((prev: any) => ({ ...prev, ...res }));
//       } catch (err) {
//         console.error("Failed to load:", err);
//       }
//     };
//     load();
//   }, [role, userId]);

//   // Dropdown helpers
//   const dropdownItem =
//     "p-2 cursor-pointer hover:bg-[#96C2DB] hover:text-black transition rounded-md";

//   const closeAllDropdowns = () =>
//     setDropdown({ gender: false, primarySkill: false, secondarySkill: false });

//   useEffect(() => {
//     const handle = () => closeAllDropdowns();
//     window.addEventListener("click", handle);
//     return () => window.removeEventListener("click", handle);
//   }, []);

//   const handleDropdownToggle = (
//     e: React.MouseEvent<HTMLDivElement>,
//     type: DropdownType
//   ) => {
//     e.stopPropagation();
//     setDropdown((prev) => ({
//       gender: type === "gender" ? !prev.gender : false,
//       primarySkill: type === "primarySkill" ? !prev.primarySkill : false,
//       secondarySkill: type === "secondarySkill" ? !prev.secondarySkill : false,
//     }));
//   };

//   // File select → crop
//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;

//     const url = URL.createObjectURL(f);
//     setCropSrc(url);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = (_: CropArea, croppedPixels: CropArea) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   const handleApplyCrop = async () => {
//     if (!cropSrc || !croppedAreaPixels) return;
//     try {
//       setIsCropping(true);
//       const croppedBase64 = await getCroppedImg(cropSrc, croppedAreaPixels);

//       setFormData((prev: any) => ({ ...prev, profileImage: croppedBase64 }));

//       if (userId) {
//         localStorage.setItem(`profileImage_${userId}`, croppedBase64);
//       }

//       setShowCropper(false);
//       setCropSrc(null);
//     } catch (err) {
//       console.error("Crop failed:", err);
//       alert("Failed to crop image");
//     } finally {
//       setIsCropping(false);
//     }
//   };

//   const toggleSecondarySkill = (skill: string) => {
//     setFormData((prev: any) => {
//       const arr = prev.secondarySkills || [];
//       return {
//         ...prev,
//         secondarySkills: arr.includes(skill)
//           ? arr.filter((x: string) => x !== skill)
//           : [...arr, skill],
//       };
//     });
//   };


// // const handleSave = async () => {
// //   if (!role || !userId) {
// //     alert("User role missing");
// //     return;
// //   }

// //   // NEW STRUCTURE FOR BACKEND
// //   const payload = {
// //     user: {
// //       name: formData.name,
// //       email: formData.personalEmail,
// //       role,
// //       profilePicture: formData.profileImage || ""
// //     },

// //     personalInfo: {
// //       personalEmail: formData.personalEmail,
// //       phone: formData.phone,
// //       dob: formData.dob,
// //       gender: formData.gender,
// //       bloodGroup: formData.bloodGroup,
// //       currentAddress: formData.currentAddress,
// //       permanentAddress: formData.permanentAddress
// //     },

// //     education: {
// //       college: formData.college,
// //       degree: formData.degree,
// //       education_batch: formData.educationBatch
// //     },

// //     skills: {
// //       primarySkills: [formData.primarySkill],
// //       secondarySkills: formData.secondarySkills
// //     },

// //     userId,
// //     role
// //   };

// //   try {
// //     // CHECK IF PROFILE EXISTS
// //     const existingRes = await fetch(`http://localhost:8080/profiles?userId=${userId}`);
// //     const existing = await existingRes.json();

// //     if (existing.length > 0) {
// //       // UPDATE PROFILE
// //       const pid = existing[0].id;
// //       await fetch(`http://localhost:8080/profiles/${pid}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload)
// //       });
// //     } else {
// //       // CREATE PROFILE
// //       await fetch(`http://localhost:8080/profiles`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload)
// //       });
// //     }

// //     // UPDATE USERS ARRAY TOO (profilePicture)
// //     const userRes = await fetch(`http://localhost:8080/users?uid=${userId}`);
// //     const u = await userRes.json();

// //     if (u.length > 0) {
// //       const userObj = u[0];
// //       await fetch(`http://localhost:8080/users/${userObj.id}`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ profilePicture: formData.profileImage })
// //       });
// //     }

// //     navigate(`/${role}/profile`);

// //   } catch (err) {
// //     console.error("Save error:", err);
// //     alert("Failed to save profile");
// //   }
// // };



// const handleSave = async () => {
//   if (!role || !userId) {
//     alert("User role missing");
//     return;
//   }

//   // NEW PAYLOAD FORMAT FOR BACKEND
//   const payload = {
//     user: {
//       name: formData.name,
//       email: formData.personalEmail,
//       role,
//       profilePicture: formData.profileImage || ""
//     },

//     personalInfo: {
//       personalEmail: formData.personalEmail,
//       phone: formData.phone,
//       dob: formData.dob,
//       gender: formData.gender,
//       bloodGroup: formData.bloodGroup,
//       currentAddress: formData.currentAddress,
//       permanentAddress: formData.permanentAddress
//     },

//     education: {
//       college: formData.college,
//       degree: formData.degree,
//       education_batch: formData.educationBatch
//     },

//     skills: {
//       primarySkills: [formData.primarySkill],
//       secondarySkills: formData.secondarySkills
//     },

//     userId,
//     role
//   };

//   try {
//     // 1️⃣ CHECK IF PROFILE EXISTS (backend will handle nested return)
//     const check = await fetch(
//       `http://localhost:8080/interngo/profile/${role}/${userId}`
//     );

//     if (check.ok) {
//       const existing = await check.json();

//       // If exists → UPDATE
//       if (existing && existing.id) {
//         await fetch(
//           `http://localhost:8080/interngo/profile/${role}/${userId}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           }
//         );
//       }
//     } else {
//       // 2️⃣ CREATE A NEW PROFILE
//       await fetch(`http://localhost:8080/interngo/profile`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//     }

//     // 3️⃣ UPDATE USERS TABLE (profilePicture)
//     const userRes = await fetch(
//       `http://localhost:8080/users?uid=${userId}`
//     );
//     const list = await userRes.json();

//     if (list.length > 0) {
//       const userObj = list[0];

//       await fetch(`http://localhost:8080/users/${userObj.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           profilePicture: formData.profileImage,
//         }),
//       });
//     }

//     navigate(`/${role}/profile`);
//   } catch (err) {
//     console.error("Save error:", err);
//     alert("Failed to save profile");
//   }
// };

//   // INPUT STYLE (Lagoon Style)
//   const inputClass =
//     "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] placeholder-gray-600 backdrop-blur-md focus:ring-2 focus:ring-[#96C2DB] outline-none";

//   // CARD STYLE
//   const cardClass =
//     "p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

//   return (
//     <>
//       {/* 🌊 Lagoon blobs – content area only */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-20 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-20 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* MAIN FORM WRAPPER – same layout as before */}
//       <div className="relative z-10 w-full h-[calc(100vh-80px)] overflow-y-auto no-scrollbar flex justify-center pt-10 pb-10 px-6">
//         <div className="w-[95%] space-y-12 text-[#1E2A35]">
//           {/* HEADER */}
//           <div className="flex justify-between items-center flex-wrap gap-6">
//             <h2 className="text-4xl font-bold text-[#3B6E8F]">Edit Profile</h2>

//             <div
//               className="w-32 h-32 rounded-full border border-white/40 bg-white/40 overflow-hidden cursor-pointer shadow-lg"
//               style={{
//                 backgroundImage: formData.profileImage
//                   ? `url(${formData.profileImage})`
//                   : undefined,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               {!formData.profileImage && (
//                 <div className="w-full h-full flex justify-center items-center text-[#1E2A35]/70">
//                   Upload
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFile}
//             />
//           </div>

//           {/* PERSONAL INFO */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">
//               Personal Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Full Name</label>
//                 <input
//                   className={inputClass}
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Email</label>
//                 <input
//                   className={inputClass}
//                   value={formData.personalEmail}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       personalEmail: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Phone Number
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={formData.dob}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dob: e.target.value })
//                   }
//                 />
//               </div>

//               {/* GENDER */}
//               <div className="relative">
//                 <label className="text-[#3B6E8F] mb-1 block">Gender</label>

//                 <div
//                   className={`${inputClass} cursor-pointer`}
//                   onClick={(e) => handleDropdownToggle(e, "gender")}
//                 >
//                   {formData.gender || "Select Gender"}
//                 </div>

//                 {dropdown.gender && (
//                   <div className="absolute z-[9999] top-full mt-1 w-full bg-white rounded-lg shadow-xl">
//                     {genderOptions.map((g) => (
//                       <div
//                         key={g}
//                         className={dropdownItem}
//                         onClick={() => {
//                           setFormData({ ...formData, gender: g });
//                           closeAllDropdowns();
//                         }}
//                       >
//                         {g}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Blood Group
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.bloodGroup}
//                   onChange={(e) =>
//                     setFormData({ ...formData, bloodGroup: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Current Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.currentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       currentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Permanent Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.permanentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       permanentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EDUCATION */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Education</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">College</label>
//                 <input
//                   className={inputClass}
//                   value={formData.college}
//                   onChange={(e) =>
//                     setFormData({ ...formData, college: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Degree</label>
//                 <input
//                   className={inputClass}
//                   value={formData.degree}
//                   onChange={(e) =>
//                     setFormData({ ...formData, degree: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Education Batch
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.educationBatch}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       educationBatch: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EXPERIENCE */}
//           {(role === "mentor" || role === "interviewer") && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl mb-4 text-[#3B6E8F]">Experience</h3>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Years of Experience
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.experienceYears}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       experienceYears: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* SKILLS */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Skills</h3>

//             {/* PRIMARY SKILL */}
//             <div className="relative w-full mb-6">
//               <label className="text-[#3B6E8F] mb-1 block">Primary Skill</label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "primarySkill")}
//               >
//                 {formData.primarySkill || "Select Primary Skill"}
//               </div>

//               {/* Chip */}
//               {formData.primarySkill && (
//                 <div className="mt-2 flex gap-2">
//                   <span className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1">
//                     {formData.primarySkill}
//                     <button
//                       className="text-red-500"
//                       onClick={() =>
//                         setFormData({ ...formData, primarySkill: "" })
//                       }
//                     >
//                       ×
//                     </button>
//                   </span>
//                 </div>
//               )}

//               {dropdown.primarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => {
//                         setFormData({ ...formData, primarySkill: s });
//                         closeAllDropdowns();
//                       }}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom primary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customPrimary}
//                       onChange={(e) => setCustomPrimary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customPrimary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           primarySkill: customPrimary.trim(),
//                         });
//                         setCustomPrimary("");
//                         closeAllDropdowns();
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SECONDARY SKILLS */}
//             <div className="relative w-full">
//               <label className="text-[#3B6E8F] mb-1 block">
//                 Secondary Skills
//               </label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "secondarySkill")}
//               >
//                 {formData.secondarySkills.length === 0
//                   ? "Select Secondary Skills"
//                   : formData.secondarySkills.join(", ")}
//               </div>

//               {/* Chips */}
//               {formData.secondarySkills.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.secondarySkills.map((skill: string) => (
//                     <span
//                       key={skill}
//                       className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1"
//                     >
//                       {skill}
//                       <button
//                         className="text-red-500"
//                         onClick={() =>
//                           setFormData({
//                             ...formData,
//                             secondarySkills:
//                               formData.secondarySkills.filter(
//                                 (x: string) => x !== skill
//                               ),
//                           })
//                         }
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {dropdown.secondarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => toggleSecondarySkill(s)}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom secondary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customSecondary}
//                       onChange={(e) => setCustomSecondary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customSecondary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           secondarySkills: [
//                             ...formData.secondarySkills,
//                             customSecondary.trim(),
//                           ],
//                         });
//                         setCustomSecondary("");
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* BUTTONS */}
//           <div className="flex justify-center gap-6 pb-10">
//             <button
//               className="px-6 py-3 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-bold hover:bg-[#7DB3CE] transition shadow"
//               onClick={handleSave}
//             >
//               Save
//             </button>

//             <button
//               className="px-6 py-3 bg-gray-300 text-black rounded-xl font-bold hover:bg-gray-400 transition shadow"
//               onClick={() => navigate(`/${role}/profile`)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CROP MODAL */}
//       {showCropper && cropSrc && (
//         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-lg">
//           <div className="w-full max-w-lg bg-white/10 rounded-2xl border border-white/30 p-6 shadow-2xl backdrop-blur-2xl">
//             <h3 className="text-xl text-[#3B6E8F] mb-4 text-center">
//               Crop Profile Picture
//             </h3>

//             <div className="relative w-full aspect-square bg-black/40 rounded-xl overflow-hidden">
//               <Cropper
//                 image={cropSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="rect"
//                 showGrid={false}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>

//             <div className="mt-4">
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>

//             <div className="mt-5 flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
//                 onClick={() => {
//                   setShowCropper(false);
//                   setCropSrc(null);
//                 }}
//                 disabled={isCropping}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
//                 onClick={handleApplyCrop}
//                 disabled={isCropping}
//               >
//                 {isCropping ? "Saving..." : "Apply Crop"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileForm;



// // src/components/ProfileForm.tsx
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { fetchProfile, saveProfile } from "../api/profileApi";
// import { useAuth } from "../context/AuthContext";
// import Cropper from "react-easy-crop";

// // Local type for crop area (instead of importing Area)
// type CropArea = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// // ---------- Helper to create image ----------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = url;
//     image.onload = () => resolve(image);
//     image.onerror = (err) => reject(err);
//   });

// // ---------- Crop image to base64 ----------
// const getCroppedImg = async (
//   imageSrc: string,
//   pixelCrop: CropArea
// ): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Failed to get canvas context");

//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return canvas.toDataURL("image/png");
// };

// const skillOptions = [
//   "React",
//   "Node.js",
//   "Python",
//   "Java",
//   "C++",
//   "UI/UX Design",
//   "Data Analysis",
//   "Machine Learning",
//   "Cloud Computing",
//   "SQL",
// ];

// const genderOptions = ["Male", "Female", "Other"];

// type DropdownType = "gender" | "primarySkill" | "secondarySkill";

// const ProfileForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const role = user?.role;
//   const userId = user?.uid;

//   const [formData, setFormData] = useState<any>({
//     name: "",
//     personalEmail: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     bloodGroup: "",
//     currentAddress: "",
//     permanentAddress: "",
//     college: "",
//     degree: "",
//     educationBatch: "",
//     primarySkill: "",
//     secondarySkills: [],
//     experienceYears: "",
//     profileImage: "",
//   });

//   const [dropdown, setDropdown] = useState({
//     gender: false,
//     primarySkill: false,
//     secondarySkill: false,
//   });

//   const [customPrimary, setCustomPrimary] = useState("");
//   const [customSecondary, setCustomSecondary] = useState("");
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // Image cropper states
//   const [showCropper, setShowCropper] = useState(false);
//   const [cropSrc, setCropSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] =
//     useState<CropArea | null>(null);
//   const [isCropping, setIsCropping] = useState(false);

//   // =========================================
//   // LOAD PROFILE (nested → flat formData)
//   // =========================================
//   useEffect(() => {
//     if (!role || !userId) return;

//     const load = async () => {
//       try {
//         // 1️⃣ localStorage image
//         const localImg = localStorage.getItem(`profileImage_${userId}`);
//         let baseProfileImage = localImg || "";

//         // 2️⃣ backend profile (nested format)
//         const res: any = await fetchProfile(role, userId);

//         if (res && res.user) {
//           // Prefer backend profile picture
//           if (res.user.profilePicture) {
//             baseProfileImage = res.user.profilePicture;
//           }

//           setFormData((prev: any) => ({
//             ...prev,
//             // USER
//             name: res.user.name || "",
//             personalEmail:
//               res.personalInfo?.personalEmail ||
//               res.user.email ||
//               prev.personalEmail,
//             // PERSONAL INFO
//             phone: res.personalInfo?.phone || "",
//             dob: res.personalInfo?.dob || "",
//             gender: res.personalInfo?.gender || "",
//             bloodGroup: res.personalInfo?.bloodGroup || "",
//             currentAddress: res.personalInfo?.currentAddress || "",
//             permanentAddress: res.personalInfo?.permanentAddress || "",
//             // EDUCATION
//             college: res.education?.college || "",
//             degree: res.education?.degree || "",
//             educationBatch: res.education?.education_batch || "",
//             // SKILLS
//             primarySkill:
//               (res.skills?.primarySkills &&
//                 res.skills.primarySkills[0]) ||
//               "",
//             secondarySkills: res.skills?.secondarySkills || [],
//             // EXPERIENCE (if any)
//             experienceYears: res.experienceYears || "",
//             // IMAGE
//             profileImage: baseProfileImage,
//           }));
//         } else if (res && !res.user) {
//           // OLD FLAT FORMAT (fallback support)
//           setFormData((prev: any) => ({
//             ...prev,
//             name: res.name || "",
//             personalEmail: res.personalEmail || "",
//             phone: res.phone || "",
//             dob: res.dob || "",
//             gender: res.gender || "",
//             bloodGroup: res.bloodGroup || "",
//             currentAddress: res.currentAddress || "",
//             permanentAddress: res.permanentAddress || "",
//             college: res.college || "",
//             degree: res.degree || "",
//             educationBatch: res.educationBatch || "",
//             primarySkill: res.primarySkill || "",
//             secondarySkills: res.secondarySkills || [],
//             experienceYears: res.experienceYears || "",
//             profileImage: baseProfileImage || res.profileImage || "",
//           }));
//         } else if (baseProfileImage) {
//           // Only local image
//           setFormData((prev: any) => ({
//             ...prev,
//             profileImage: baseProfileImage,
//           }));
//         }
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       }
//     };

//     load();
//   }, [role, userId]);

//   // Dropdown helpers
//   const dropdownItem =
//     "p-2 cursor-pointer hover:bg-[#96C2DB] hover:text-black transition rounded-md";

//   const closeAllDropdowns = () =>
//     setDropdown({ gender: false, primarySkill: false, secondarySkill: false });

//   useEffect(() => {
//     const handle = () => closeAllDropdowns();
//     window.addEventListener("click", handle);
//     return () => window.removeEventListener("click", handle);
//   }, []);

//   const handleDropdownToggle = (
//     e: React.MouseEvent<HTMLDivElement>,
//     type: DropdownType
//   ) => {
//     e.stopPropagation();
//     setDropdown((prev) => ({
//       gender: type === "gender" ? !prev.gender : false,
//       primarySkill: type === "primarySkill" ? !prev.primarySkill : false,
//       secondarySkill: type === "secondarySkill" ? !prev.secondarySkill : false,
//     }));
//   };

//   // File select → crop
//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;

//     const url = URL.createObjectURL(f);
//     setCropSrc(url);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = (_: CropArea, croppedPixels: CropArea) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   const handleApplyCrop = async () => {
//     if (!cropSrc || !croppedAreaPixels) return;
//     try {
//       setIsCropping(true);
//       const croppedBase64 = await getCroppedImg(cropSrc, croppedAreaPixels);

//       setFormData((prev: any) => ({ ...prev, profileImage: croppedBase64 }));

//       if (userId) {
//         localStorage.setItem(`profileImage_${userId}`, croppedBase64);
//       }

//       setShowCropper(false);
//       setCropSrc(null);
//     } catch (err) {
//       console.error("Crop failed:", err);
//       alert("Failed to crop image");
//     } finally {
//       setIsCropping(false);
//     }
//   };

//   const toggleSecondarySkill = (skill: string) => {
//     setFormData((prev: any) => {
//       const arr = prev.secondarySkills || [];
//       return {
//         ...prev,
//         secondarySkills: arr.includes(skill)
//           ? arr.filter((x: string) => x !== skill)
//           : [...arr, skill],
//       };
//     });
//   };

//   // =========================================
//   // SAVE PROFILE → NESTED STRUCTURE
//   // =========================================
//   const handleSave = async () => {
//     if (!role || !userId) {
//       alert("User role missing");
//       return;
//     }

//     // NEW PAYLOAD FORMAT FOR BACKEND
//     const payload = {
//       user: {
//         name: formData.name,
//         email: formData.personalEmail,
//         role,
//         profilePicture: formData.profileImage || "",
//       },

//       personalInfo: {
//         personalEmail: formData.personalEmail,
//         phone: formData.phone,
//         dob: formData.dob,
//         gender: formData.gender,
//         bloodGroup: formData.bloodGroup,
//         currentAddress: formData.currentAddress,
//         permanentAddress: formData.permanentAddress,
//       },

//       education: {
//         college: formData.college,
//         degree: formData.degree,
//         education_batch: formData.educationBatch,
//       },

//       skills: {
//         primarySkills: [formData.primarySkill],
//         secondarySkills: formData.secondarySkills,
//       },

//       userId,
//       role,
//     };

//     try {
//       // Use shared API function → it will PUT/POST to /interngo/profile
//       const result = await saveProfile(role, userId, payload);
//       if (!result.success) {
//         alert("Failed to save profile");
//         return;
//       }

//       // 3️⃣ UPDATE USERS TABLE (profilePicture) for navbar etc.
//       const userRes = await fetch(
//         `http://localhost:8080/users?uid=${userId}`
//       );
//       const list = await userRes.json();

//       if (Array.isArray(list) && list.length > 0) {
//         const userObj = list[0];

//         await fetch(`http://localhost:8080/users/${userObj.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             profilePicture: formData.profileImage,
//           }),
//         });
//       }

//       navigate(`/${role}/profile`);
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Failed to save profile");
//     }
//   };

//   // INPUT STYLE (Lagoon Style)
//   const inputClass =
//     "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] placeholder-gray-600 backdrop-blur-md focus:ring-2 focus:ring-[#96C2DB] outline-none";

//   // CARD STYLE
//   const cardClass =
//     "p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

//   return (
//     <>
//       {/* 🌊 Lagoon blobs – content area only */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-20 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-20 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* MAIN FORM WRAPPER – same layout as before */}
//       <div className="relative z-10 w-full h-[calc(100vh-80px)] overflow-y-auto no-scrollbar flex justify-center pt-10 pb-10 px-6">
//         <div className="w-[95%] space-y-12 text-[#1E2A35]">
//           {/* HEADER */}
//           <div className="flex justify-between items-center flex-wrap gap-6">
//             <h2 className="text-4xl font-bold text-[#3B6E8F]">Edit Profile</h2>

//             <div
//               className="w-32 h-32 rounded-full border border-white/40 bg-white/40 overflow-hidden cursor-pointer shadow-lg"
//               style={{
//                 backgroundImage: formData.profileImage
//                   ? `url(${formData.profileImage})`
//                   : undefined,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               {!formData.profileImage && (
//                 <div className="w-full h-full flex justify-center items-center text-[#1E2A35]/70">
//                   Upload
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFile}
//             />
//           </div>

//           {/* PERSONAL INFO */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">
//               Personal Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Full Name</label>
//                 <input
//                   className={inputClass}
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Email</label>
//                 <input
//                   className={inputClass}
//                   value={formData.personalEmail}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       personalEmail: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Phone Number
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={formData.dob}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dob: e.target.value })
//                   }
//                 />
//               </div>

//               {/* GENDER */}
//               <div className="relative">
//                 <label className="text-[#3B6E8F] mb-1 block">Gender</label>

//                 <div
//                   className={`${inputClass} cursor-pointer`}
//                   onClick={(e) => handleDropdownToggle(e, "gender")}
//                 >
//                   {formData.gender || "Select Gender"}
//                 </div>

//                 {dropdown.gender && (
//                   <div className="absolute z-[9999] top-full mt-1 w-full bg-white rounded-lg shadow-xl">
//                     {genderOptions.map((g) => (
//                       <div
//                         key={g}
//                         className={dropdownItem}
//                         onClick={() => {
//                           setFormData({ ...formData, gender: g });
//                           closeAllDropdowns();
//                         }}
//                       >
//                         {g}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Blood Group
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.bloodGroup}
//                   onChange={(e) =>
//                     setFormData({ ...formData, bloodGroup: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Current Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.currentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       currentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Permanent Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.permanentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       permanentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EDUCATION */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Education</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">College</label>
//                 <input
//                   className={inputClass}
//                   value={formData.college}
//                   onChange={(e) =>
//                     setFormData({ ...formData, college: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Degree</label>
//                 <input
//                   className={inputClass}
//                   value={formData.degree}
//                   onChange={(e) =>
//                     setFormData({ ...formData, degree: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Education Batch
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.educationBatch}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       educationBatch: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EXPERIENCE */}
//           {(role === "mentor" || role === "interviewer") && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl mb-4 text-[#3B6E8F]">Experience</h3>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Years of Experience
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.experienceYears}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       experienceYears: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* SKILLS */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Skills</h3>

//             {/* PRIMARY SKILL */}
//             <div className="relative w-full mb-6">
//               <label className="text-[#3B6E8F] mb-1 block">Primary Skill</label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "primarySkill")}
//               >
//                 {formData.primarySkill || "Select Primary Skill"}
//               </div>

//               {/* Chip */}
//               {formData.primarySkill && (
//                 <div className="mt-2 flex gap-2">
//                   <span className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1">
//                     {formData.primarySkill}
//                     <button
//                       className="text-red-500"
//                       onClick={() =>
//                         setFormData({ ...formData, primarySkill: "" })
//                       }
//                     >
//                       ×
//                     </button>
//                   </span>
//                 </div>
//               )}

//               {dropdown.primarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => {
//                         setFormData({ ...formData, primarySkill: s });
//                         closeAllDropdowns();
//                       }}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom primary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customPrimary}
//                       onChange={(e) => setCustomPrimary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customPrimary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           primarySkill: customPrimary.trim(),
//                         });
//                         setCustomPrimary("");
//                         closeAllDropdowns();
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SECONDARY SKILLS */}
//             <div className="relative w-full">
//               <label className="text-[#3B6E8F] mb-1 block">
//                 Secondary Skills
//               </label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "secondarySkill")}
//               >
//                 {formData.secondarySkills.length === 0
//                   ? "Select Secondary Skills"
//                   : formData.secondarySkills.join(", ")}
//               </div>

//               {/* Chips */}
//               {formData.secondarySkills.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.secondarySkills.map((skill: string) => (
//                     <span
//                       key={skill}
//                       className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1"
//                     >
//                       {skill}
//                       <button
//                         className="text-red-500"
//                         onClick={() =>
//                           setFormData({
//                             ...formData,
//                             secondarySkills:
//                               formData.secondarySkills.filter(
//                                 (x: string) => x !== skill
//                               ),
//                           })
//                         }
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {dropdown.secondarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => toggleSecondarySkill(s)}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom secondary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customSecondary}
//                       onChange={(e) => setCustomSecondary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customSecondary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           secondarySkills: [
//                             ...formData.secondarySkills,
//                             customSecondary.trim(),
//                           ],
//                         });
//                         setCustomSecondary("");
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* BUTTONS */}
//           <div className="flex justify-center gap-6 pb-10">
//             <button
//               className="px-6 py-3 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-bold hover:bg-[#7DB3CE] transition shadow"
//               onClick={handleSave}
//             >
//               Save
//             </button>

//             <button
//               className="px-6 py-3 bg-gray-300 text-black rounded-xl font-bold hover:bg-gray-400 transition shadow"
//               onClick={() => navigate(`/${role}/profile`)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CROP MODAL */}
//       {showCropper && cropSrc && (
//         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-lg">
//           <div className="w-full max-w-lg bg-white/10 rounded-2xl border border-white/30 p-6 shadow-2xl backdrop-blur-2xl">
//             <h3 className="text-xl text-[#3B6E8F] mb-4 text-center">
//               Crop Profile Picture
//             </h3>

//             <div className="relative w-full aspect-square bg-black/40 rounded-xl overflow-hidden">
//               <Cropper
//                 image={cropSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="rect"
//                 showGrid={false}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>

//             <div className="mt-4">
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>

//             <div className="mt-5 flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
//                 onClick={() => {
//                   setShowCropper(false);
//                   setCropSrc(null);
//                 }}
//                 disabled={isCropping}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
//                 onClick={handleApplyCrop}
//                 disabled={isCropping}
//               >
//                 {isCropping ? "Saving..." : "Apply Crop"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileForm;






// // src/components/ProfileForm.tsx
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { fetchProfile, saveProfile } from "../api/profileApi";
// import { useAuth } from "../context/AuthContext";
// import Cropper from "react-easy-crop";

// // Local type for crop area (instead of importing Area)
// type CropArea = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// // ---------- Helper to create image ----------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = url;
//     image.onload = () => resolve(image);
//     image.onerror = (err) => reject(err);
//   });

// // ---------- Crop image to base64 ----------
// const getCroppedImg = async (
//   imageSrc: string,
//   pixelCrop: CropArea
// ): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Failed to get canvas context");

//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return canvas.toDataURL("image/png");
// };

// const skillOptions = [
//   "React",
//   "Node.js",
//   "Python",
//   "Java",
//   "C++",
//   "UI/UX Design",
//   "Data Analysis",
//   "Machine Learning",
//   "Cloud Computing",
//   "SQL",
// ];

// const genderOptions = ["Male", "Female", "Other"];

// type DropdownType = "gender" | "primarySkill" | "secondarySkill";

// const ProfileForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const role = user?.role;
//   const userId = user?.uid;

//   const [formData, setFormData] = useState<any>({
//     name: "",
//     personalEmail: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     bloodGroup: "",
//     currentAddress: "",
//     permanentAddress: "",
//     college: "",
//     degree: "",
//     educationBatch: "",
//     primarySkill: "",
//     secondarySkills: [],
//     experienceYears: "",
//     profileImage: "",
//   });

//   const [dropdown, setDropdown] = useState({
//     gender: false,
//     primarySkill: false,
//     secondarySkill: false,
//   });

//   const [customPrimary, setCustomPrimary] = useState("");
//   const [customSecondary, setCustomSecondary] = useState("");
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // Image cropper states
//   const [showCropper, setShowCropper] = useState(false);
//   const [cropSrc, setCropSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] =
//     useState<CropArea | null>(null);
//   const [isCropping, setIsCropping] = useState(false);

//   // =========================================
//   // LOAD PROFILE (nested → flat formData)
//   // =========================================
//   useEffect(() => {
//     if (!role || !userId) return;

//     const load = async () => {
//       try {
//         // 1️⃣ localStorage image
//         const localImg = localStorage.getItem(`profileImage_${userId}`);
//         let baseProfileImage = localImg || "";

//         // 2️⃣ backend profile (nested format)
//         const res: any = await fetchProfile(role, userId);

//         if (res && res.user) {
//           // Prefer backend profile picture
//           if (res.user.profilePicture) {
//             baseProfileImage = res.user.profilePicture;
//           }

//           setFormData((prev: any) => ({
//             ...prev,
//             // USER
//             name: res.user.name || "",
//             personalEmail:
//               res.personalInfo?.personalEmail ||
//               res.user.email ||
//               prev.personalEmail,
//             // PERSONAL INFO
//             phone: res.personalInfo?.phone || "",
//             dob: res.personalInfo?.dob || "",
//             gender: res.personalInfo?.gender || "",
//             bloodGroup: res.personalInfo?.bloodGroup || "",
//             currentAddress: res.personalInfo?.currentAddress || "",
//             permanentAddress: res.personalInfo?.permanentAddress || "",
//             // EDUCATION
//             college: res.education?.college || "",
//             degree: res.education?.degree || "",
//             educationBatch: res.education?.education_batch || "",
//             // SKILLS
//             primarySkill:
//               (res.skills?.primarySkills &&
//                 res.skills.primarySkills[0]) ||
//               "",
//             secondarySkills: res.skills?.secondarySkills || [],
//             // EXPERIENCE (if any)
//             experienceYears: res.experienceYears || "",
//             // IMAGE
//             profileImage: baseProfileImage,
//           }));
//         } else if (res && !res.user) {
//           // OLD FLAT FORMAT (fallback support)
//           setFormData((prev: any) => ({
//             ...prev,
//             name: res.name || "",
//             personalEmail: res.personalEmail || "",
//             phone: res.phone || "",
//             dob: res.dob || "",
//             gender: res.gender || "",
//             bloodGroup: res.bloodGroup || "",
//             currentAddress: res.currentAddress || "",
//             permanentAddress: res.permanentAddress || "",
//             college: res.college || "",
//             degree: res.degree || "",
//             educationBatch: res.educationBatch || "",
//             primarySkill: res.primarySkill || "",
//             secondarySkills: res.secondarySkills || [],
//             experienceYears: res.experienceYears || "",
//             profileImage: baseProfileImage || res.profileImage || "",
//           }));
//         } else if (baseProfileImage) {
//           // Only local image
//           setFormData((prev: any) => ({
//             ...prev,
//             profileImage: baseProfileImage,
//           }));
//         }
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       }
//     };

//     load();
//   }, [role, userId]);

//   // Dropdown helpers
//   const dropdownItem =
//     "p-2 cursor-pointer hover:bg-[#96C2DB] hover:text-black transition rounded-md";

//   const closeAllDropdowns = () =>
//     setDropdown({ gender: false, primarySkill: false, secondarySkill: false });

//   useEffect(() => {
//     const handle = () => closeAllDropdowns();
//     window.addEventListener("click", handle);
//     return () => window.removeEventListener("click", handle);
//   }, []);

//   const handleDropdownToggle = (
//     e: React.MouseEvent<HTMLDivElement>,
//     type: DropdownType
//   ) => {
//     e.stopPropagation();
//     setDropdown((prev) => ({
//       gender: type === "gender" ? !prev.gender : false,
//       primarySkill: type === "primarySkill" ? !prev.primarySkill : false,
//       secondarySkill: type === "secondarySkill" ? !prev.secondarySkill : false,
//     }));
//   };

//   // File select → crop
//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;

//     const url = URL.createObjectURL(f);
//     setCropSrc(url);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = (_: CropArea, croppedPixels: CropArea) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   const handleApplyCrop = async () => {
//     if (!cropSrc || !croppedAreaPixels) return;
//     try {
//       setIsCropping(true);
//       const croppedBase64 = await getCroppedImg(cropSrc, croppedAreaPixels);

//       setFormData((prev: any) => ({ ...prev, profileImage: croppedBase64 }));

//       if (userId) {
//         localStorage.setItem(`profileImage_${userId}`, croppedBase64);
//       }

//       setShowCropper(false);
//       setCropSrc(null);
//     } catch (err) {
//       console.error("Crop failed:", err);
//       alert("Failed to crop image");
//     } finally {
//       setIsCropping(false);
//     }
//   };

//   const toggleSecondarySkill = (skill: string) => {
//     setFormData((prev: any) => {
//       const arr = prev.secondarySkills || [];
//       return {
//         ...prev,
//         secondarySkills: arr.includes(skill)
//           ? arr.filter((x: string) => x !== skill)
//           : [...arr, skill],
//       };
//     });
//   };

//   // =========================================
//   // SAVE PROFILE → NESTED STRUCTURE
//   // =========================================
//   const handleSave = async () => {
//     if (!role || !userId) {
//       alert("User role missing");
//       return;
//     }

//     // NEW PAYLOAD FORMAT FOR BACKEND
//     const payload = {
//       user: {
//         name: formData.name,
//         email: formData.personalEmail,
//         role,
//         profilePicture: formData.profileImage || "",
//       },

//       personalInfo: {
//         personalEmail: formData.personalEmail,
//         phone: formData.phone,
//         dob: formData.dob,
//         gender: formData.gender,
//         bloodGroup: formData.bloodGroup,
//         currentAddress: formData.currentAddress,
//         permanentAddress: formData.permanentAddress,
//       },

//       education: {
//         college: formData.college,
//         degree: formData.degree,
//         education_batch: formData.educationBatch,
//       },

//       skills: {
//         primarySkills: [formData.primarySkill],
//         secondarySkills: formData.secondarySkills,
//       },

//       userId,
//       role,
//     };

//     try {
//       // Use shared API function → it will PUT/POST to /interngo/profile
//       const result = await saveProfile(role, userId, payload);
//       if (!result.success) {
//         alert("Failed to save profile");
//         return;
//       }

//       // 3️⃣ UPDATE USERS TABLE (profilePicture) for navbar etc.
//       const userRes = await fetch(
//         `http://localhost:8080/users?uid=${userId}`
//       );
//       const list = await userRes.json();

//       if (Array.isArray(list) && list.length > 0) {
//         const userObj = list[0];

//         await fetch(`http://localhost:8080/users/${userObj.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             profilePicture: formData.profileImage,
//           }),
//         });
//       }

//       navigate(`/${role}/profile`);
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Failed to save profile");
//     }
//   };

//   // INPUT STYLE (Lagoon Style)
//   const inputClass =
//     "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] placeholder-gray-600 backdrop-blur-md focus:ring-2 focus:ring-[#96C2DB] outline-none";

//   // CARD STYLE
//   const cardClass =
//     "p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

//   return (
//     <>
//       {/* 🌊 Lagoon blobs – content area only */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 top-20 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply 
//                    filter blur-3xl opacity-40 bottom-20 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
//         transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* MAIN FORM WRAPPER – same layout as before */}
//       <div className="relative z-10 w-full h-[calc(100vh-80px)] overflow-y-auto no-scrollbar flex justify-center pt-10 pb-10 px-6">
//         <div className="w-[95%] space-y-12 text-[#1E2A35]">
//           {/* HEADER */}
//           <div className="flex justify-between items-center flex-wrap gap-6">
//             <h2 className="text-4xl font-bold text-[#3B6E8F]">Edit Profile</h2>

//             <div
//               className="w-32 h-32 rounded-full border border-white/40 bg-white/40 overflow-hidden cursor-pointer shadow-lg"
//               style={{
//                 backgroundImage: formData.profileImage
//                   ? `url(${formData.profileImage})`
//                   : undefined,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               {!formData.profileImage && (
//                 <div className="w-full h-full flex justify-center items-center text-[#1E2A35]/70">
//                   Upload
//                 </div>
//               )}
//             </div>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFile}
//             />
//           </div>

//           {/* PERSONAL INFO */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">
//               Personal Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Full Name</label>
//                 <input
//                   className={inputClass}
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Email</label>
//                 <input
//                   className={inputClass}
//                   value={formData.personalEmail}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       personalEmail: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Phone Number
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={formData.dob}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dob: e.target.value })
//                   }
//                 />
//               </div>

//               {/* GENDER */}
//               <div className="relative">
//                 <label className="text-[#3B6E8F] mb-1 block">Gender</label>

//                 <div
//                   className={`${inputClass} cursor-pointer`}
//                   onClick={(e) => handleDropdownToggle(e, "gender")}
//                 >
//                   {formData.gender || "Select Gender"}
//                 </div>

//                 {dropdown.gender && (
//                   <div className="absolute z-[9999] top-full mt-1 w-full bg:white bg-white rounded-lg shadow-xl">
//                     {genderOptions.map((g) => (
//                       <div
//                         key={g}
//                         className={dropdownItem}
//                         onClick={() => {
//                           setFormData({ ...formData, gender: g });
//                           closeAllDropdowns();
//                         }}
//                       >
//                         {g}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Blood Group
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.bloodGroup}
//                   onChange={(e) =>
//                     setFormData({ ...formData, bloodGroup: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Current Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.currentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       currentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Permanent Address
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.permanentAddress}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       permanentAddress: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EDUCATION */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Education</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">College</label>
//                 <input
//                   className={inputClass}
//                   value={formData.college}
//                   onChange={(e) =>
//                     setFormData({ ...formData, college: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">Degree</label>
//                 <input
//                   className={inputClass}
//                   value={formData.degree}
//                   onChange={(e) =>
//                     setFormData({ ...formData, degree: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Education Batch
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.educationBatch}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       educationBatch: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* EXPERIENCE */}
//           {(role === "mentor" || role === "interviewer") && (
//             <motion.div className={cardClass}>
//               <h3 className="text-2xl mb-4 text-[#3B6E8F]">Experience</h3>

//               <div>
//                 <label className="text-[#3B6E8F] mb-1 block">
//                   Years of Experience
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={formData.experienceYears}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       experienceYears: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* SKILLS */}
//           <motion.div className={cardClass}>
//             <h3 className="text-2xl mb-4 text-[#3B6E8F]">Skills</h3>

//             {/* PRIMARY SKILL */}
//             <div className="relative w-full mb-6">
//               <label className="text-[#3B6E8F] mb-1 block">Primary Skill</label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "primarySkill")}
//               >
//                 {formData.primarySkill || "Select Primary Skill"}
//               </div>

//               {/* Chip */}
//               {formData.primarySkill && (
//                 <div className="mt-2 flex gap-2">
//                   <span className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1">
//                     {formData.primarySkill}
//                     <button
//                       className="text-red-500"
//                       onClick={() =>
//                         setFormData({ ...formData, primarySkill: "" })
//                       }
//                     >
//                       ×
//                     </button>
//                   </span>
//                 </div>
//               )}

//               {dropdown.primarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => {
//                         setFormData({ ...formData, primarySkill: s });
//                         closeAllDropdowns();
//                       }}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom primary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customPrimary}
//                       onChange={(e) => setCustomPrimary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customPrimary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           primarySkill: customPrimary.trim(),
//                         });
//                         setCustomPrimary("");
//                         closeAllDropdowns();
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* SECONDARY SKILLS */}
//             <div className="relative w-full">
//               <label className="text-[#3B6E8F] mb-1 block">
//                 Secondary Skills
//               </label>

//               <div
//                 className={`${inputClass} cursor-pointer`}
//                 onClick={(e) => handleDropdownToggle(e, "secondarySkill")}
//               >
//                 {formData.secondarySkills.length === 0
//                   ? "Select Secondary Skills"
//                   : formData.secondarySkills.join(", ")}
//               </div>

//               {/* Chips */}
//               {formData.secondarySkills.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.secondarySkills.map((skill: string) => (
//                     <span
//                       key={skill}
//                       className="px-4 py-1 bg-[#96C2DB] text-[#1E2A35] rounded-full shadow flex items-center gap-1"
//                     >
//                       {skill}
//                       <button
//                         className="text-red-500"
//                         onClick={() =>
//                           setFormData({
//                             ...formData,
//                             secondarySkills:
//                               formData.secondarySkills.filter(
//                                 (x: string) => x !== skill
//                               ),
//                           })
//                         }
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {dropdown.secondarySkill && (
//                 <div
//                   className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl z-[9999]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {skillOptions.map((s) => (
//                     <div
//                       key={s}
//                       className={dropdownItem}
//                       onClick={() => toggleSecondarySkill(s)}
//                     >
//                       {s}
//                     </div>
//                   ))}

//                   {/* Custom secondary */}
//                   <div className="p-3 border-t bg-gray-100">
//                     <input
//                       className="w-full border p-2 rounded"
//                       placeholder="Add custom skill"
//                       value={customSecondary}
//                       onChange={(e) => setCustomSecondary(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                     <button
//                       className="w-full mt-2 bg-blue-500 text:white text-white p-2 rounded"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (!customSecondary.trim()) return;
//                         setFormData({
//                           ...formData,
//                           secondarySkills: [
//                             ...formData.secondarySkills,
//                             customSecondary.trim(),
//                           ],
//                         });
//                         setCustomSecondary("");
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* BUTTONS */}
//           <div className="flex justify-center gap-6 pb-10">
//             <button
//               className="px-6 py-3 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-bold hover:bg-[#7DB3CE] transition shadow"
//               onClick={handleSave}
//             >
//               Save
//             </button>

//             <button
//               className="px-6 py-3 bg-gray-300 text-black rounded-xl font-bold hover:bg-gray-400 transition shadow"
//               onClick={() => navigate(`/${role}/profile`)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CROP MODAL */}
//       {showCropper && cropSrc && (
//         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-lg">
//           <div className="w-full max-w-lg bg-white/10 rounded-2xl border border-white/30 p-6 shadow-2xl backdrop-blur-2xl">
//             <h3 className="text-xl text-[#3B6E8F] mb-4 text-center">
//               Crop Profile Picture
//             </h3>

//             <div className="relative w-full aspect-square bg-black/40 rounded-xl overflow-hidden">
//               <Cropper
//                 image={cropSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="rect"
//                 showGrid={false}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>

//             <div className="mt-4">
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>

//             <div className="mt-5 flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
//                 onClick={() => {
//                   setShowCropper(false);
//                   setCropSrc(null);
//                 }}
//                 disabled={isCropping}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
//                 onClick={handleApplyCrop}
//                 disabled={isCropping}
//               >
//                 {isCropping ? "Saving..." : "Apply Crop"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileForm;





// src/components/ProfileForm.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchProfile, saveProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";
import Cropper from "react-easy-crop";

// -----------------------------
// Local type for crop area
// -----------------------------
type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// -----------------------------
// Create image object
// -----------------------------
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });

// -----------------------------
// Crop function (base64 output)
// -----------------------------
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: CropArea
): Promise<string> => {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas error");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/png");
};

// -----------------------------------------------------------------------
// Options
// -----------------------------------------------------------------------
const skillOptions = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "UI/UX Design",
  "Data Analysis",
  "Machine Learning",
  "Cloud Computing",
  "SQL",
];

const genderOptions = ["Male", "Female", "Other"];

type DropdownType = "gender" | "primarySkill" | "secondarySkill";

// ======================================================================
// MAIN COMPONENT
// ======================================================================
const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;
  const userId = user?.uid;

  // FORM STATE
  const [formData, setFormData] = useState<any>({
    name: "",
    personalEmail: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    currentAddress: "",
    permanentAddress: "",
    college: "",
    degree: "",
    educationBatch: "",
    primarySkill: "",
    secondarySkills: [],
    experienceYears: "",
    profileImage: "",
  });

  const [dropdown, setDropdown] = useState({
    gender: false,
    primarySkill: false,
    secondarySkill: false,
  });

  const [customPrimary, setCustomPrimary] = useState("");
  const [customSecondary, setCustomSecondary] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPicMenu, setShowPicMenu] = useState(false);

  

  // Cropper States
  const [showCropper, setShowCropper] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CropArea | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  // ======================================================================
  // LOAD NESTED PROFILE → FLATTEN → FORM DATA
  // ======================================================================
  useEffect(() => {
    if (!role || !userId) return;

    const load = async () => {
      try {
        let localImage =
          localStorage.getItem(`profileImage_${userId}`) || "";

        const res: any = await fetchProfile(role, userId);

        if (res?.user) {
          setFormData({
            name: res.user.name || "",
            personalEmail:
              res.personalInfo?.personalEmail || res.user.email || "",
            phone: res.personalInfo?.phone || "",
            dob: res.personalInfo?.dob || "",
            gender: res.personalInfo?.gender || "",
            bloodGroup: res.personalInfo?.bloodGroup || "",
            currentAddress: res.personalInfo?.currentAddress || "",
            permanentAddress: res.personalInfo?.permanentAddress || "",

            college: res.education?.college || "",
            degree: res.education?.degree || "",
            educationBatch: res.education?.education_batch || "",

            primarySkill: res.skills?.primarySkills?.[0] || "",
            secondarySkills: res.skills?.secondarySkills || [],

            experienceYears: res.experienceYears || "",

            profileImage:
              res.user.profilePicture || localImage || "",
          });
        }
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    };

    load();
  }, [role, userId]);

  // ------------------------
  // Dropdown Close
  // ------------------------
  const closeAllDropdowns = () =>
    setDropdown({
      gender: false,
      primarySkill: false,
      secondarySkill: false,
    });

  useEffect(() => {
    const handler = () => closeAllDropdowns();
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  // ------------------------
  // Dropdown Toggle
  // ------------------------
  const handleDropdownToggle = (
    e: any,
    type: DropdownType
  ) => {
    e.stopPropagation();
    setDropdown({
      gender: type === "gender" ? !dropdown.gender : false,
      primarySkill:
        type === "primarySkill" ? !dropdown.primarySkill : false,
      secondarySkill:
        type === "secondarySkill"
          ? !dropdown.secondarySkill
          : false,
    });
  };

  // ------------------------
  // File Upload → Crop
  // ------------------------
  const handleFile = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const url = URL.createObjectURL(f);
    setCropSrc(url);
    setShowCropper(true);
  };

  const onCropComplete = (_: any, area: CropArea) =>
    setCroppedAreaPixels(area);

  const handleApplyCrop = async () => {
    if (!cropSrc || !croppedAreaPixels) return;

    try {
      setIsCropping(true);

      const base64 = await getCroppedImg(
        cropSrc,
        croppedAreaPixels
      );

      setFormData((p: any) => ({
        ...p,
        profileImage: base64,
      }));

      localStorage.setItem(
        `profileImage_${userId}`,
        base64
      );

      setShowCropper(false);
      setCropSrc(null);
    } catch (err) {
      console.error("Crop failed:", err);
    } finally {
      setIsCropping(false);
    }
  };

  const toggleSecondary = (skill: string) => {
    setFormData((p: any) => ({
      ...p,
      secondarySkills: p.secondarySkills.includes(skill)
        ? p.secondarySkills.filter((x: string) => x !== skill)
        : [...p.secondarySkills, skill],
    }));
  };

  // ======================================================================
  // SAVE PROFILE → Perfect Nested Model
  // ======================================================================
  const handleSave = async () => {
    const payload = {
      user: {
        name: formData.name,
        email: formData.personalEmail,
        role,
        profilePicture: formData.profileImage,
      },

      personalInfo: {
        personalEmail: formData.personalEmail,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        currentAddress: formData.currentAddress,
        permanentAddress: formData.permanentAddress,
      },

      education: {
        college: formData.college,
        degree: formData.degree,
        education_batch: formData.educationBatch,
      },

      skills: {
        primarySkills: [formData.primarySkill],
        secondarySkills: formData.secondarySkills,
      },

      userId,
      role,
    };

    const result = await saveProfile(role!, userId!, payload);

    if (!result.success) {
      alert("Failed to save");
      return;
    }

    navigate(`/${role}/profile`);
  };

  // ======================================================================
  // UI CLASSES
  // ======================================================================
  const inputClass =
    "w-full p-3 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] backdrop-blur-md focus:ring-2 focus:ring-[#96C2DB] outline-none";

  const cardClass =
    "p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-[#96C2DB]/40 shadow-xl";

  // ======================================================================
  // RENDER
  // ======================================================================
  return (
    <>
      {/* Background */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply filter blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply filter blur-3xl opacity-40 bottom-10 right-10 -z-10"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* FORM WRAPPER */}
      <div className="relative z-10 w-full h-[calc(100vh-80px)] overflow-y-auto no-scrollbar flex justify-center pt-10 px-6 pb-20">
        <div className="w-[95%] space-y-10">
          {/* HEADER */}
          <div className="flex justify-between items-center flex-wrap gap-6">
            <h2 className="text-4xl font-bold text-[#3B6E8F]">
              Edit Profile
            </h2>
            {/* PROFILE IMAGE */}
<div className="relative flex flex-col items-center">
  <div
    className="w-32 h-32 rounded-full border border-white/40 bg-white/40 shadow-lg overflow-hidden cursor-pointer"
    style={{
      backgroundImage: formData.profileImage
        ? `url(${formData.profileImage})`
        : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    onClick={() => {
      if (!formData.profileImage) {
        // No image → directly open file picker
        fileInputRef.current?.click();
      } else {
        // Image exists → open menu
        setShowPicMenu((prev) => !prev);
      }
    }}
  >
    {!formData.profileImage && (
      <div className="w-full h-full flex justify-center items-center text-[#1E2A35]/70">
        Upload
      </div>
    )}
  </div>

  {/* 🔥 Small menu for Change / Remove */}
  {showPicMenu && formData.profileImage && (
    <div className="absolute top-36 bg-white shadow-xl rounded-lg border p-2 w-40 z-[9999]">
      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded-md"
        onClick={() => {
          fileInputRef.current?.click();
          setShowPicMenu(false);
        }}
      >
        Change Photo
      </button>

      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded-md text-red-600"
        onClick={() => {
          setFormData({ ...formData, profileImage: "" });
          localStorage.removeItem(`profileImage_${userId}`);
          setShowPicMenu(false);
        }}
      >
        Remove Photo
      </button>
    </div>
  )}

  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleFile}
  />
</div>

          </div>

          {/* PERSONAL INFO */}
          <motion.div className={cardClass}>
            <h3 className="text-2xl text-[#3B6E8F] mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NAME */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Full Name
                </label>
                <input
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">Email</label>
                <input
                  className={inputClass}
                  value={formData.personalEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalEmail: e.target.value,
                    })
                  }
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Phone
                </label>
                <input
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
              </div>

              {/* GENDER */}
              <div className="relative">
                <label className="text-[#3B6E8F] block mb-1">
                  Gender
                </label>

                <div
                  className={`${inputClass} cursor-pointer`}
                  onClick={(e) =>
                    handleDropdownToggle(e, "gender")
                  }
                >
                  {formData.gender || "Select Gender"}
                </div>

                {dropdown.gender && (
                  <div className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1">
                    {genderOptions.map((g) => (
                      <div
                        key={g}
                        className="p-2 hover:bg-[#96C2DB] rounded-md cursor-pointer"
                        onClick={() => {
                          setFormData({ ...formData, gender: g });
                          closeAllDropdowns();
                        }}
                      >
                        {g}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BLOOD GROUP */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Blood Group
                </label>
                <input
                  className={inputClass}
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bloodGroup: e.target.value,
                    })
                  }
                />
              </div>

              {/* ADDRESSES */}
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Current Address
                </label>
                <input
                  className={inputClass}
                  value={formData.currentAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentAddress: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Permanent Address
                </label>
                <input
                  className={inputClass}
                  value={formData.permanentAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      permanentAddress: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* EDUCATION */}
          <motion.div className={cardClass}>
            <h3 className="text-2xl text-[#3B6E8F] mb-4">
              Education
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  College
                </label>
                <input
                  className={inputClass}
                  value={formData.college}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      college: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Degree
                </label>
                <input
                  className={inputClass}
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      degree: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[#3B6E8F] block mb-1">
                  Education Batch
                </label>
                <input
                  className={inputClass}
                  value={formData.educationBatch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationBatch: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* EXPERIENCE */}
          {(role === "mentor" || role === "interviewer") && (
            <motion.div className={cardClass}>
              <h3 className="text-2xl text-[#3B6E8F] mb-4">
                Experience
              </h3>

              <input
                className={inputClass}
                value={formData.experienceYears}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceYears: e.target.value,
                  })
                }
              />
            </motion.div>
          )}

          {/* SKILLS */}
          <motion.div className={cardClass}>
            <h3 className="text-2xl text-[#3B6E8F] mb-4">
              Skills
            </h3>

            {/* PRIMARY */}
            <div className="relative mb-6">
              <label className="text-[#3B6E8F] block mb-1">
                Primary Skill
              </label>

              <div
                className={`${inputClass} cursor-pointer`}
                onClick={(e) =>
                  handleDropdownToggle(e, "primarySkill")
                }
              >
                {formData.primarySkill || "Select Primary Skill"}
              </div>

              {dropdown.primarySkill && (
                <div className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 p-2">
                  {skillOptions.map((s) => (
                    <div
                      key={s}
                      className="p-2 hover:bg-[#96C2DB] rounded-md cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, primarySkill: s });
                        closeAllDropdowns();
                      }}
                    >
                      {s}
                    </div>
                  ))}

                  <input
                    className="w-full border p-2 mt-2 rounded"
                    placeholder="Add Skill"
                    value={customPrimary}
                    onChange={(e) => setCustomPrimary(e.target.value)}
                  />
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                    onClick={() => {
                      if (!customPrimary.trim()) return;
                      setFormData({
                        ...formData,
                        primarySkill: customPrimary.trim(),
                      });
                      setCustomPrimary("");
                      closeAllDropdowns();
                    }}
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Chip */}
{formData.primarySkill && (
  <div className="mt-2 flex gap-2">
    <span className="px-3 py-1 bg-[#96C2DB] rounded-full flex items-center gap-2">
      {formData.primarySkill}
      <button
        className="text-red-600 font-bold"
        onClick={() => setFormData({ ...formData, primarySkill: "" })}
      >
        ×
      </button>
    </span>
  </div>
)}
</div>



            {/* SECONDARY */}
            <div className="relative">
              <label className="text-[#3B6E8F] block mb-1">
                Secondary Skills
              </label>

              <div
                className={`${inputClass} cursor-pointer`}
                onClick={(e) =>
                  handleDropdownToggle(e, "secondarySkill")
                }
              >
                {formData.secondarySkills.length
                  ? formData.secondarySkills.join(", ")
                  : "Select Secondary Skills"}
              </div>

              {dropdown.secondarySkill && (
                <div className="absolute z-[9999] bg-white w-full rounded-lg shadow-xl mt-1 p-2">
                  {skillOptions.map((s) => (
                    <div
                      key={s}
                      className="p-2 hover:bg-[#96C2DB] rounded-md cursor-pointer"
                      onClick={() => toggleSecondary(s)}
                    >
                      {s}
                    </div>
                  ))}

                  <input
                    className="w-full border p-2 mt-2 rounded"
                    placeholder="Add Skill"
                    value={customSecondary}
                    onChange={(e) => setCustomSecondary(e.target.value)}
                  />
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                    onClick={() => {
                      if (!customSecondary.trim()) return;
                      setFormData({
                        ...formData,
                        secondarySkills: [
                          ...formData.secondarySkills,
                          customSecondary.trim(),
                        ],
                      });
                      setCustomSecondary("");
                    }}
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Chips */}
              {formData.secondarySkills.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {formData.secondarySkills.map((skill: string) => (
      <span
        key={skill}
        className="px-3 py-1 bg-[#96C2DB] rounded-full flex items-center gap-2"
      >
        {skill}
        <button
          className="text-red-600 font-bold"
          onClick={() =>
            setFormData({
              ...formData,
              secondarySkills: formData.secondarySkills.filter(
                (x: string) => x !== skill
              ),
            })
          }
        >
          ×
        </button>
      </span>
    ))}
  </div>
)}

            </div>
          </motion.div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mb-10">
            <button
              className="px-6 py-3 bg-[#96C2DB] text-[#1E2A35] rounded-xl font-bold hover:bg-[#7DB3CE]"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="px-6 py-3 bg-gray-300 rounded-xl font-bold hover:bg-gray-400"
              onClick={() => navigate(`/${role}/profile`)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* CROP MODAL */}
      {showCropper && cropSrc && (
        <div className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h1 className="text-center text-[#1E2A35] text-2xl mb-4">
              Crop Image
            </h1>

            <div className="relative w-full aspect-square bg-black/30 rounded-xl overflow-hidden">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              className="w-full mt-4"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 rounded-lg text-white"
                onClick={() => {
                  setShowCropper(false);
                  setCropSrc(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleApplyCrop}
              >
                {isCropping ? "Saving..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
