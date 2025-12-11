

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
