
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
    profileImage: user.profileImage || "",
  };
}
