const BASE = "http://localhost:4000";

/* ---------------- CREATE / SCHEDULE ---------------- */
export const scheduleInteraction = async (payload: any) => {
  const res = await fetch(`${BASE}/scheduledInteractions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to schedule interaction");
  return res.json();
};

/* ---------------- UPDATE ---------------- */
export const updateInteraction = async (
  id: string,
  payload: any
) => {
  const res = await fetch(`${BASE}/scheduledInteractions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update interaction");
  return res.json();
};

/* ---------------- DELETE ---------------- */
export const removeInteraction = async (id: string) => {
  const res = await fetch(
    `${BASE}/scheduledInteractions/${id}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error("Failed to remove interaction");
};

/* ---------------- FETCH BY INTERACTION ---------------- */
export const getScheduledByInteraction = async (
  interactionId: string
) => {
  const res = await fetch(
    `${BASE}/scheduledInteractions?interactionId=${interactionId}`
  );

  if (!res.ok) throw new Error("Failed to fetch interactions");
  return res.json();
};
