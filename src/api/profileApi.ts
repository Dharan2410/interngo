



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



const BASE = "http://localhost:4000/interngo";

// ---------------------------------------------------------
//  GET PROFILE (Nested Response)
//  GET /interngo/profile/:role/:userId
// ---------------------------------------------------------
export const fetchProfile = async (userId: string) => {
  try {
    console.log(userId)
    const res = await fetch(`${BASE}/profile/${userId}`);
    console.log(res)
    if (res.status === 404) return null;
    
    const data = await res.json();
    console.log(data);
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
    const checkRes = await fetch(`${BASE}/profile/${userId}`);

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
    // --------ser:userdata-------------------------------------------
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