

// const BASE = "http://localhost:8080/interngo";

// // ----------------------
// // LOGIN (POST)
// // ----------------------
// export async function loginUser(email: string, password: string) {
//   const res = await fetch(`${BASE}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.error || "Login failed");
//   }

//   const user = await res.json();

//   return {
//     uid: user.uid,
//     email: user.email,
//     role: user.role,
//     token: user.token,
//     profilePicture: user.profilePicture || "",
//   };
// }










// ///dharan's use for db




// const BASE = "http://localhost:4000/interngo";


// export async function loginUser(email: string, password: string) {
//   const res = await fetch(`${BASE}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//     credentials: "include" 
//   });
//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.message || "Login failed");
//   }
//   const data = await res.json();
//   const user = data.user;
//   return {
//     uid: user.uid,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     profilePicture: user.profileImage || null,
//   };
// }


const BASE = "http://localhost:4000/interngo";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const user = await res.json();   // your server returns user directly

  return {
    id: user.uid,
    name: user.name,
    email: user.email,
    role: user.role,

    // 🔥 Correct final field matching DB + Auth Context + UI
    profileImage: user.profileImage || "",
  };
}
