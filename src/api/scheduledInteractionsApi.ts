// const BASE = "http://localhost:4000";

// /* ---------------- CREATE / SCHEDULE ---------------- */
// // export const scheduleInteraction = async (payload: any) => {
// //   const res = await fetch(`${BASE}/scheduledInteractions`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(payload),
// //   });

// //   if (!res.ok) throw new Error("Failed to schedule interaction");
// //   return res.json();
// // };

// export const scheduleInteraction = async (payload: any) => {
//   // 1️⃣ Get all scheduled interactions
//   const existingRes = await fetch(`${BASE}/scheduledInteractions`);
//   const existing = await existingRes.json();

//   // 2️⃣ Time conflict check (same intern, same date)
//   const conflict = existing.some((i: any) => {
//     if (i.internId !== payload.internId) return false;
//     if (i.date !== payload.date) return false;

//     const start = new Date(`${i.date} ${i.startTime}`);
//     const end = new Date(start.getTime() + i.duration * 60000);

//     const newStart = new Date(`${payload.date} ${payload.startTime}`);
//     const newEnd = new Date(
//       newStart.getTime() + payload.duration * 60000
//     );

//     return newStart < end && newEnd > start;
//   });

//   if (conflict) {
//     throw new Error(
//       "Intern already scheduled for an interaction during this time"
//     );
//   }

//   // 3️⃣ Save
//   const res = await fetch(`${BASE}/scheduledInteractions`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       ...payload,
//       status: "scheduled",
//       feedbackStatus: "pending"
//     }),
//   });

//   if (!res.ok) throw new Error("Failed to schedule interaction");
//   return res.json();
// };


// /* ---------------- UPDATE ---------------- */
// // export const updateInteraction = async (
// //   id: string,
// //   payload: any
// // ) => {
// //   const res = await fetch(`${BASE}/scheduledInteractions/${id}`, {
// //     method: "PUT",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(payload),
// //   });

// //   if (!res.ok) throw new Error("Failed to update interaction");
// //   return res.json();
// // };

// export const updateInteraction = async (id: string, payload: any) => {
//   const res = await fetch(`${BASE}/scheduledInteractions/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Failed to update interaction");
//   return res.json();
// };


// /* ---------------- DELETE ---------------- */
// export const removeInteraction = async (id: string) => {
//   const res = await fetch(
//     `${BASE}/scheduledInteractions/${id}`,
//     { method: "DELETE" }
//   );

//   if (!res.ok) throw new Error("Failed to remove interaction");
// };

// /* ---------------- FETCH BY INTERACTION ---------------- */
// export const getScheduledByInteraction = async (
//   interactionId: string
// ) => {
//   const res = await fetch(
//     `${BASE}/scheduledInteractions?interactionId=${interactionId}`
//   );

//   if (!res.ok) throw new Error("Failed to fetch interactions");
//   return res.json();
// };


// export const getAllScheduled = async () => {
//   const res = await fetch(`${BASE}/scheduledInteractions`);
//   return res.json();
// };







//after flow change
const BASE = "http://localhost:4000/scheduledInteractions";

/* ---------------- CREATE / SCHEDULE ---------------- */
export const scheduleInteraction = async (payload: any) => {
  // 1️⃣ Get all scheduled interactions
  const existingRes = await fetch(BASE);
  const existing = await existingRes.json();

  // 2️⃣ Time conflict check (same intern, same date)
  const conflict = existing.some((i: any) => {
    if (i.internId !== payload.internId) return false;
    if (i.date !== payload.date) return false;

    const start = new Date(`${i.date} ${i.time}`);
    const end = new Date(start.getTime() + i.duration * 60000);

    const newStart = new Date(`${payload.date} ${payload.time}`);
    const newEnd = new Date(
      newStart.getTime() + payload.duration * 60000
    );

    return newStart < end && newEnd > start;
  });

  if (conflict) {
    throw new Error(
      "Intern already scheduled for an interaction during this time"
    );
  }

  // 3️⃣ Save
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      status: "scheduled",
      feedbackStatus: "pending",
    }),
  });

  if (!res.ok) throw new Error("Failed to schedule interaction");
  return res.json();
};

/* ---------------- UPDATE SCHEDULE ---------------- */
export const updateScheduledInteraction = async (
  id: string,
  payload: any
) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok)
    throw new Error("Failed to update scheduled interaction");
  return res.json();
};

/* ---------------- DELETE SCHEDULE ---------------- */
export const deleteScheduledInteraction = async (id: string) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok)
    throw new Error("Failed to delete scheduled interaction");
};

/* ---------------- FETCH BY INTERACTION ---------------- */
export const getScheduledByInteraction = async (
  interactionId: string
) => {
  const res = await fetch(
    `${BASE}?interactionId=${interactionId}`
  );

  if (!res.ok)
    throw new Error("Failed to fetch scheduled interactions");

  return res.json();
};

/* ---------------- FETCH ALL ---------------- */
export const getAllScheduled = async () => {
  const res = await fetch(BASE);
  if (!res.ok)
    throw new Error("Failed to fetch scheduled interactions");
  return res.json();
};
