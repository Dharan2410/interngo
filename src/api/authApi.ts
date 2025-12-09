// export async function loginUser(email: string, password: string) {
//   const res = await fetch(
//     `http://localhost:8080/users?email=${email}&password=${password}`
//   );

//   const data = await res.json();

//   if (!data || data.length === 0) {
//     throw new Error("Invalid email or password");
//   }

//   return data[0]; // returns { uid, email, role, token }
// }


// src/api/authApi.ts

const BASE = "http://localhost:8080/interngo";

// ----------------------
// LOGIN (POST)
// ----------------------
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Login failed");
  }

  const user = await res.json();

  return {
    uid: user.uid,
    email: user.email,
    role: user.role,
    token: user.token,
    profilePicture: user.profilePicture || "",
  };
}



