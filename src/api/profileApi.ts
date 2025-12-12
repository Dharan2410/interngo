



// const BASE = "http://localhost:8080/interngo";

// // ---------------------------------------------------------
// //  GET PROFILE (Nested Response)
// //  GET /interngo/profile/:role/:userId
// // ---------------------------------------------------------
// export const fetchProfile = async (role: string, userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/profile/${role}/${userId}`);

//     if (res.status === 404) return null;

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("fetchProfile error:", err);
//     return null;
//   }
// };

// // ---------------------------------------------------------
// //  SAVE PROFILE (PUT if exists → else POST)
// //  PUT  /interngo/profile/:role/:userId
// //  POST /interngo/profile
// // ---------------------------------------------------------
// export const saveProfile = async (
//   role: string,
//   userId: string,
//   payload: any
// ) => {
//   try {
//     // 1️⃣ Check if existing profile is there
//     const checkRes = await fetch(`${BASE}/profile/${role}/${userId}`);

//     // ---------------------------------------------------
//     // 🟢 Case 1: Exists → UPDATE
//     // ---------------------------------------------------
//     if (checkRes.ok) {
//       const updateRes = await fetch(`${BASE}/profile/${role}/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       return { success: updateRes.ok, mode: "updated" };
//     }

//     // ---------------------------------------------------
//     // 🔵 Case 2: Does NOT exist → CREATE NEW
//     // ---------------------------------------------------
//     const createRes = await fetch(`${BASE}/profile`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     return { success: createRes.ok, mode: "created" };
//   } catch (err) {
//     console.error("saveProfile error:", err);
//     return { success: false, error: err };
//   }
// };

// // ---------------------------------------------------------
// //  PROFESSIONAL INFO
// //  GET /interngo/professional/:userId
// // ---------------------------------------------------------
// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professional/${userId}`);

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("profInfo error:", err);
//     return null;
//   }
// };






// export const fetchProfilesByBatch = async (batch: string) => {
//   try {
//     const res = await fetch(`${BASE}/profiles?batch=${batch}`);
//     const data = await res.json();

//     if (Array.isArray(data)) {
//       return data;
//     }

//     return []; // fallback
//   } catch (e) {
//     console.log("fetchProfilesByBatch error:", e);
//     return [];
//   }
// };





///dharan's use for db



// const BASE = "http://localhost:4000/interngo";

// // ---------------------------------------------------------
// //  GET PROFILE (Nested Response)
// //  GET /interngo/profile/:role/:userId
// // ---------------------------------------------------------
// export const fetchProfile = async (userId: string) => {
//   try {
//     console.log(userId)
//     const res = await fetch(`${BASE}/profile/${userId}`);
//     console.log(res)
//     if (res.status === 404) return null;
    
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error("fetchProfile error:", err);
//     return null;
//   }
// };

// // ---------------------------------------------------------
// //  SAVE PROFILE (PUT if exists → else POST)
// //  PUT  /interngo/profile/:role/:userId
// //  POST /interngo/profile
// // ---------------------------------------------------------
// export const saveProfile = async (
//   role: string,
//   userId: string,
//   payload: any
// ) => {
//   try {
//     // :one: Check if existing profile is there
//     const checkRes = await fetch(`${BASE}/profile/${userId}`);

//     // ---------------------------------------------------
//     // :large_green_circle: Case 1: Exists → UPDATE
//     // ---------------------------------------------------
//     if (checkRes.ok) {
//       const updateRes = await fetch(`${BASE}/profile/${role}/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       return { success: updateRes.ok, mode: "updated" };
//     }

//     // ---------------------------------------------------
//     // :large_blue_circle: Case 2: Does NOT exist → CREATE NEW
//     // --------ser:userdata-------------------------------------------
//     const createRes = await fetch(`${BASE}/profile`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     return { success: createRes.ok, mode: "created" };
//   } catch (err) {
//     console.error("saveProfile error:", err);
//     return { success: false, error: err };
//   }
// };

// // ---------------------------------------------------------
// //  PROFESSIONAL INFO
// //  GET /interngo/professional/:userId
// // ---------------------------------------------------------
// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professional/${userId}`);

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("profInfo error:", err);
//     return null;
//   }
// };






// export const fetchProfilesByBatch = async (batch: string) => {
//   try {
//     const res = await fetch(`${BASE}/profiles?batch=${batch}`);
//     const data = await res.json();

//     if (Array.isArray(data)) {
//       return data;
//     }

//     return []; // fallback
//   } catch (e) {
//     console.log("fetchProfilesByBatch error:", e);
//     return [];
//   }
// };




// // src/api/profileApi.ts
// const BASE = "http://localhost:4000/interngo";

// // ----------------------------------------
// // GET USER PROFILE 
// // GET /interngo/profile/:userId
// // ----------------------------------------
// export const fetchProfile = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/profile/${userId}`, {
//       credentials: "include",
//     });

//     if (!res.ok) return null;

//     const json = await res.json();
//     return json.user;
//   } catch (err) {
//     console.error("fetchProfile error:", err);
//     return null;
//   }
// };

// // ----------------------------------------
// // SAVE PROFILE 
// // PUT /interngo/profile/edit
// // Supports FormData (file upload)
// // ----------------------------------------
// export const saveProfile = async (
//   userId: string,
//   payload: any,
//   isFormData: boolean = false
// ) => {
//   try {
//     const res = await fetch(`${BASE}/profile/edit`, {
//       method: "PUT",
//       credentials: "include",
//       headers: isFormData
//         ? undefined
//         : { "Content-Type": "application/json" },
//       body: isFormData ? payload : JSON.stringify(payload),
//     });

//     const json = await res.json();
//     return { success: res.ok, data: json };
//   } catch (err) {
//     console.error("saveProfile error:", err);
//     return { success: false };
//   }
// };

// // ----------------------------------------
// // GET PROFESSIONAL INFO 
// // GET /interngo/professional/:userId
// // ----------------------------------------
// export const fetchProfessionalInfo = async (userId: string) => {
//   try {
//     const res = await fetch(`${BASE}/professional/${userId}`, {
//       credentials: "include",
//     });

//     if (!res.ok) return null;

//     const json = await res.json();
//     return json;
//   } catch (err) {
//     console.error("profInfo error:", err);
//     return null;
//   }
// };





const BASE = "http://localhost:4000/interngo";

// GET USER PROFILE
export const fetchProfile = async (userId: string) => {
  try {
    const res = await fetch(`${BASE}/profile/${userId}`);

    if (!res.ok) return null;

    const json = await res.json();
    return json; // IMPORTANT FIX
  } catch (err) {
    console.error("fetchProfile error:", err);
    return null;
  }
};

// SAVE PROFILE
export const saveProfile = async (
  userId: string,
  payload: any,
  isFormData: boolean = false
) => {
  try {
    const res = await fetch(`${BASE}/profile/${userId}`, {
      method: "PUT",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? payload : JSON.stringify(payload),
    });

    const json = await res.json();
    return { success: res.ok, data: json };
  } catch (err) {
    console.error("saveProfile error:", err);
    return { success: false };
  }
};

// PROFESSIONAL INFO
export const fetchProfessionalInfo = async (userId: string) => {
  try {
    const res = await fetch(`${BASE}/professional/${userId}`);

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("profInfo error:", err);
    return null;
  }
};


export const checkPhoneExists = async (phone: string) => {
  try {
    const res = await fetch(`${BASE}/check-phone?phone=${phone}`);
    if (!res.ok) return false;

    const data = await res.json();
    return data.exists; // backend will return { exists: true/false }
  } catch (err) {
    console.error("Phone check error", err);
    return false;
  }
};
