// // src/api/dailyUpdateApi.ts
// const BASE = "http://localhost:8080/interngo";

// export type TaskRow = {
//   id: string;
//   topic: string;
//   plannedActivities: string;
//   completedActivities: string;
//   estimatedTime: string;
//   actualTime: string;
//   status: "pending" | "completed";
// };

// export type DailyUpdateRecord = {
//   id?: number;
//   userId: string;
//   date: string;
//   totalTime: string;
//   tasks: TaskRow[];
// };

// export type BatchDailyRecord = {
//   userId: string;
//   internName: string;
//   date: string;
//   totalTime: string;
//   tasks: TaskRow[];
// };

// // 🔹 Intern: GET one day
// export const fetchInternDaily = async (
//   userId: string,
//   dateIso: string
// ): Promise<DailyUpdateRecord | null> => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${dateIso}`);

//     if (res.status === 404) return null;
//     if (!res.ok) throw new Error("fetchInternDaily failed");

//     return await res.json();
//   } catch (err) {
//     console.error("fetchInternDaily error:", err);
//     return null;
//   }
// };

// // 🔹 Intern: UPSERT one day
// export const saveInternDaily = async (
//   userId: string,
//   dateIso: string,
//   payload: Omit<DailyUpdateRecord, "id">
// ): Promise<{ success: boolean; mode?: "created" | "updated" }> => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${dateIso}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       return { success: false };
//     }

//     const body = await res.json().catch(() => ({}));
//     return { success: true, mode: body.mode };
//   } catch (err) {
//     console.error("saveInternDaily error:", err);
//     return { success: false };
//   }
// };

// // 🔹 Batch view: GET all interns for batch+date
// export const fetchBatchDaily = async (
//   batch: string,
//   dateIso: string
// ): Promise<BatchDailyRecord[]> => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/batch/${batch}/${dateIso}`);

//     if (!res.ok) return [];
//     return await res.json();
//   } catch (err) {
//     console.error("fetchBatchDaily error:", err);
//     return [];
//   }
// };






// src/api/dailyUpdateApi.ts
const BASE = "http://localhost:8080/interngo";

export type TaskRow = {
  id: string;
  topic: string;
  plannedActivities: string;
  completedActivities: string;
  estimatedTime: string;
  actualTime: string;
  status: "pending" | "completed";
};

export type DailyUpdateRecord = {
  id?: number;
  userId: string;
  date: string;
  totalTime: string;
  tasks: TaskRow[];
};

export type BatchDailyRecord = {
  userId: string;
  internName: string;
  date: string;
  totalTime: string;
  tasks: TaskRow[];
};

// Intern — GET a day's data
export const fetchInternDaily = async (userId: string, dateIso: string) => {
  try {
    const res = await fetch(`${BASE}/dailyupdate/${userId}/${dateIso}`);

    if (res.status === 404) return null;
    if (!res.ok) throw new Error("fetchInternDaily failed");

    return await res.json();
  } catch (err) {
    console.error("fetchInternDaily error:", err);
    return null;
  }
};

// Intern — UPSERT
export const saveInternDaily = async (
  userId: string,
  dateIso: string,
  payload: Omit<DailyUpdateRecord, "id">
) => {
  try {
    const res = await fetch(`${BASE}/dailyupdate/${userId}/${dateIso}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return { success: false };

    const body = await res.json().catch(() => ({}));
    return { success: true, mode: body.mode };
  } catch (err) {
    console.error("saveInternDaily error:", err);
    return { success: false };
  }
};

// Admin/Mentor — Batch load
export const fetchBatchDaily = async (batch: string, dateIso: string) => {
  try {
    const res = await fetch(`${BASE}/dailyupdate/batch/${batch}/${dateIso}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("fetchBatchDaily error:", err);
    return [];
  }
};
