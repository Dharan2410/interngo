


// // src/api/profileApi.ts

// /**
//  * This file will later connect to your backend database.
//  * Replace the commented FETCH sections with your real backend API URLs.
//  */

// export const fetchProfile = async (role: string, userId: string) => {
//   try {
//     // ----------------------------------------------
//     // TODO: Fetch from backend when DB is ready
//     // const res = await fetch(`/api/profile/${role}/${userId}`);
//     // return await res.json();
//     // ----------------------------------------------

//     // TEMPORARY (fallback for UI without DB)
//     const localData = localStorage.getItem(`profile-${role}-${userId}`);
//     return localData ? JSON.parse(localData) : {};
//   } catch (err) {
//     console.error("Fetch profile error:", err);
//     return {};
//   }
// };

// export const saveProfile = async (role: string, userId: string, data: any) => {
//   try {
//     // ----------------------------------------------
//     // TODO: Save to backend when DB is ready
//     // const res = await fetch(`/api/profile/${role}/${userId}`, {
//     //   method: "PUT",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(data),
//     // });
//     // return await res.json();
//     // ----------------------------------------------

//     // TEMPORARY (local save fallback)
//     localStorage.setItem(`profile-${role}-${userId}`, JSON.stringify(data));
//     return { success: true };
//   } catch (err) {
//     console.error("Save profile error:", err);
//     return { success: false };
//   }
// };


// /**
//  * PROFESSIONAL INFORMATION (ADMIN-ONLY EDIT)
//  * (VISIBLE to all roles except admin)
//  */

// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     // ----------------------------------------------
//     // TODO: Fetch professional info from backend
//     // const res = await fetch(`/api/professional/${userId}`);
//     // return await res.json();
//     // ----------------------------------------------

//     // TEMP fallback
//     const local = localStorage.getItem(`professional-${userId}`);
//     return local ? JSON.parse(local) : {};
//   } catch (err) {
//     console.error("Fetch professional info error:", err);
//     return {};
//   }
// };

// export const saveProfessionalInfo = async (userId: string, data: any) => {
//   try {
//     // ----------------------------------------------
//     // TODO: Save professional info to backend
//     // const res = await fetch(`/api/professional/${userId}`, {
//     //   method: "PUT",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(data),
//     // });
//     // return await res.json();
//     // ----------------------------------------------

//     // TEMP fallback
//     localStorage.setItem(`professional-${userId}`, JSON.stringify(data));
//     return { success: true };
//   } catch (err) {
//     console.error("Save professional info error:", err);
//     return { success: false };
//   }
// };






//after json server setup






// // src/api/profileApi.ts

// const BASE = "http://localhost:8080";

// /* =========================================================
//    FETCH PROFILE (NESTED FORMAT)
//    ========================================================= */
// export const fetchProfile = async (role: string, userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/profiles?userId=${userId}`);
//     const data = await res.json();

//     if (!Array.isArray(data) || data.length === 0) return {};

//     const p = data[0];

//     return {
//       // USER
//       name: p.user?.name || "",
//       personalEmail: p.user?.email || "",
//       profileImage: p.user?.profilePicture || "",
//       role: p.user?.role || "",

//       // PERSONAL
//       phone: p.personalInfo?.phone || "",
//       dob: p.personalInfo?.dob || "",
//       gender: p.personalInfo?.gender || "",
//       bloodGroup: p.personalInfo?.bloodGroup || "",
//       currentAddress: p.personalInfo?.currentAddress || "",
//       permanentAddress: p.personalInfo?.permanentAddress || "",

//       // EDUCATION
//       college: p.education?.college || "",
//       degree: p.education?.degree || "",
//       educationBatch: p.education?.education_batch || "",

//       // SKILLS
//       primarySkill: p.skills?.primarySkills?.[0] || "",
//       secondarySkills: p.skills?.secondarySkills || [],
//     };
//   } catch (err) {
//     console.error("Fetch profile error:", err);
//     return {};
//   }
// };

// /* =========================================================
//    SAVE PROFILE (PUT or POST) — NESTED FORMAT
//    ========================================================= */
// export const saveProfile = async (role: string, userId: string, formData: any) => {
//   try {
//     // Format backend required structure
//     const payload = {
//       user: {
//         name: formData.name,
//         email: formData.personalEmail,
//         role,
//         profilePicture: formData.profileImage,
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

//     // Check if existing
//     const existingRes = await fetch(`${BASE}/profiles?userId=${userId}`);
//     const existing = await existingRes.json();

//     if (existing.length > 0) {
//       // UPDATE
//       const id = existing[0].id;
//       const updateRes = await fetch(`${BASE}/profiles/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!updateRes.ok) return { success: false };
//     } else {
//       // CREATE
//       const createRes = await fetch(`${BASE}/profiles`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!createRes.ok) return { success: false };
//     }

//     /* ---------------------------------------
//        ALSO UPDATE USERS TABLE → profilePicture
//        --------------------------------------- */
//     const uRes = await fetch(`${BASE}/users?uid=${userId}`);
//     const users = await uRes.json();

//     if (users.length > 0) {
//       const u = users[0];

//       await fetch(`${BASE}/users/${u.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profilePicture: formData.profileImage }),
//       });
//     }

//     return { success: true };
//   } catch (err) {
//     console.error("Save profile error:", err);
//     return { success: false };
//   }
// };

// /* =========================================================
//    PROFESSIONAL INFORMATION (FETCH)
//    ========================================================= */
// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professionalInfo?userId=${userId}`);
//     const data = await res.json();

//     if (!Array.isArray(data) || data.length === 0) return {};

//     return data[0];
//   } catch (err) {
//     console.error("Fetch professional info error:", err);
//     return {};
//   }
// };

// /* =========================================================
//    SAVE PROFESSIONAL INFORMATION (PUT/POST)
//    ========================================================= */
// export const saveProfessionalInfo = async (userId: string, data: any) => {
//   try {
//     const existingRes = await fetch(`${BASE}/professionalInfo?userId=${userId}`);
//     const existing = await existingRes.json();

//     if (existing.length > 0) {
//       const id = existing[0].id;

//       const updateRes = await fetch(`${BASE}/professionalInfo/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...data, userId }),
//       });

//       if (!updateRes.ok) return { success: false };
//       return { success: true };
//     }

//     const createRes = await fetch(`${BASE}/professionalInfo`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...data, userId }),
//     });

//     if (!createRes.ok) return { success: false };
//     return { success: true };
//   } catch (err) {
//     console.error("Save professional info error:", err);
//     return { success: false };
//   }
// };




// // src/api/profileApi.ts
// // src/api/profileApi.ts

// const BASE = "http://localhost:8080/interngo";

// // ------------------------------------------------------
// // GET PROFILE
// // ------------------------------------------------------
// export const fetchProfile = async (role: string, userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/profile/${role}/${userId}`);

//     if (!res.ok) return {};

//     return await res.json();
//   } catch (err) {
//     console.error("Fetch profile error:", err);
//     return {};
//   }
// };

// // ------------------------------------------------------
// // SAVE PROFILE (PUT or POST)
// // ------------------------------------------------------
// export const saveProfile = async (role: string, userId: string, data: any) => {
//   try {
//     const check = await fetch(`${BASE}/profile/${role}/${userId}`);
//     const existing = check.ok ? await check.json() : null;

//     // UPDATE
//     if (existing && existing.id) {
//       const res = await fetch(`${BASE}/profile/${role}/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...existing,
//           ...data,
//           role,
//           userId,
//         }),
//       });

//       return { success: res.ok };
//     }

//     // CREATE
//     const res = await fetch(`${BASE}/profile`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...data,
//         role,
//         userId,
//       }),
//     });

//     return { success: res.ok };
//   } catch (err) {
//     console.error("Save profile error:", err);
//     return { success: false };
//   }
// };

// // ------------------------------------------------------
// // GET PROFESSIONAL INFO
// // ------------------------------------------------------
// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professional/${userId}`);

//     if (!res.ok) return {};

//     return await res.json();
//   } catch (err) {
//     console.error("Fetch professional info error:", err);
//     return {};
//   }
// };

// // ------------------------------------------------------
// // SAVE PROFESSIONAL INFO
// // ------------------------------------------------------
// export const saveProfessionalInfo = async (userId: string, data: any) => {
//   try {
//     const check = await fetch(`${BASE}/professional/${userId}`);
//     const existing = check.ok ? await check.json() : null;

//     // UPDATE
//     if (existing && existing.id) {
//       const res = await fetch(`${BASE}/professional/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...existing,
//           ...data,
//           userId,
//         }),
//       });

//       return { success: res.ok };
//     }

//     // CREATE
//     const res = await fetch(`${BASE}/professional`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...data,
//         userId,
//       }),
//     });

//     return { success: res.ok };
//   } catch (err) {
//     console.error("Save professional info error:", err);
//     return { success: false };
//   }
// };






const BASE = "http://localhost:8080/interngo";

// ---------------------------------------------------------
//  GET PROFILE (Nested Response)
//  GET /interngo/profile/:role/:userId
// ---------------------------------------------------------
export const fetchProfile = async (role: string, userId: string) => {
  try {
    const res = await fetch(`${BASE}/profile/${role}/${userId}`);

    if (res.status === 404) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchProfile error:", err);
    return null;
  }
};

// ---------------------------------------------------------
//  SAVE PROFILE (PUT if exists → else POST)
//  PUT  /interngo/profile/:role/:userId
//  POST /interngo/profile
// ---------------------------------------------------------
export const saveProfile = async (
  role: string,
  userId: string,
  payload: any
) => {
  try {
    // 1️⃣ Check if existing profile is there
    const checkRes = await fetch(`${BASE}/profile/${role}/${userId}`);

    // ---------------------------------------------------
    // 🟢 Case 1: Exists → UPDATE
    // ---------------------------------------------------
    if (checkRes.ok) {
      const updateRes = await fetch(`${BASE}/profile/${role}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return { success: updateRes.ok, mode: "updated" };
    }

    // ---------------------------------------------------
    // 🔵 Case 2: Does NOT exist → CREATE NEW
    // ---------------------------------------------------
    const createRes = await fetch(`${BASE}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return { success: createRes.ok, mode: "created" };
  } catch (err) {
    console.error("saveProfile error:", err);
    return { success: false, error: err };
  }
};

// ---------------------------------------------------------
//  PROFESSIONAL INFO
//  GET /interngo/professional/:userId
// ---------------------------------------------------------
export const fetchProfessionalInfo = async (userId: string) => {
  try {
    const res = await fetch(`${BASE}/professional/${userId}`);

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("profInfo error:", err);
    return null;
  }
};






export const fetchProfilesByBatch = async (batch: string) => {
  try {
    const res = await fetch(`${BASE}/profiles?batch=${batch}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    }

    return []; // fallback
  } catch (e) {
    console.log("fetchProfilesByBatch error:", e);
    return [];
  }
};

// const BASE = "http://localhost:8080/interngo";

// export const fetchProfile = async (role: string, userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/profile/${role}/${userId}`);

//     if (res.status === 404) return null;

//     return await res.json();
//   } catch (err) {
//     console.error("fetchProfile error:", err);
//     return null;
//   }
// };


// export const saveProfile = async (role: string, userId: string, payload: any) => {
//   try {
//     const checkRes = await fetch(`${BASE}/profile/${role}/${userId}`);

//     if (checkRes.status === 200) {
//       const updateRes = await fetch(`${BASE}/profile/${role}/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       return { success: updateRes.ok, mode: "updated" };
//     }

//     if (checkRes.status === 404) {
//       const createRes = await fetch(`${BASE}/profile`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       return { success: createRes.ok, mode: "created" };
//     }

//     return { success: false };
//   } catch (err) {
//     console.error("saveProfile error:", err);
//     return { success: false };
//   }
// };


// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professional/${userId}`);

//     if (res.status !== 200) return null;

//     return await res.json();
//   } catch (err) {
//     console.error("profInfo error:", err);
//     return null;
//   }
// };
