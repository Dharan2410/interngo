// src/api/professionalInfoApi.ts

const BASE = "http://localhost:8080/interngo";

// ------------------------------------------------------
// GET PROFESSIONAL INFO
// ------------------------------------------------------
export const fetchProfessionalInfo = async (userId: string) => {
  try {
    const res = await fetch(`${BASE}/professional/${userId}`);

    if (!res.ok) return {};

    return await res.json();
  } catch (err) {
    console.error("Fetch professional info error:", err);
    return {};
  }
};

// ------------------------------------------------------
// SAVE PROFESSIONAL INFO
// ------------------------------------------------------
export const saveProfessionalInfo = async (userId: string, data: any) => {
  try {
    // check if exists
    const check = await fetch(`${BASE}/professional/${userId}`);
    const existing = check.ok ? await check.json() : null;

    // UPDATE
    if (existing && existing.id) {
      const res = await fetch(`${BASE}/professional/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...existing,
          ...data,
          userId,
        }),
      });

      return { success: res.ok };
    }

    // CREATE
    const res = await fetch(`${BASE}/professional`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        userId,
      }),
    });

    return { success: res.ok };
  } catch (err) {
    console.error("Save professional info error:", err);
    return { success: false };
  }
};
