

// const BASE = "http://localhost:4000/interngo";

// // GET PROFILE
// export const fetchProfile = async (userId: string) => {
//   const res = await fetch(`${BASE}/profile/${userId}`);
//   return await res.json();  // NOT array
// };

// // SAVE PROFILE
// export const saveProfile = async (userId: string, payload: any) => {
//   const res = await fetch(`${BASE}/profile/${userId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return { success: res.ok };
// };

// // PHONE CHECK
// export const checkPhoneExists = async (phone: string) => {
//   const res = await fetch(`${BASE}/check-phone/${phone}`);
//   const arr = await res.json();
//   return arr.length > 0;
// };




//dhara's use for DB

const BASE = "http://localhost:4000/interngo";

// GET USER PROFILE
export const fetchProfile = async (userId: string) => {
  try {
    const res = await fetch(`${BASE}/profile/${userId}`);

    if (!res.ok) return null;

    const json = await res.json();
    console.log(json.user)
    return json.user; // IMPORTANT FIX
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
    const res = await fetch(`${BASE}/editprofile/${userId}`, {
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