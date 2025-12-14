
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

// // Intern — GET a day's data
// export const fetchInternDaily = async (userId: string, taskDate: string) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${taskDate}`);

//     if (res.status === 404) return null;
//     if (!res.ok) throw new Error("fetchInternDaily failed");

//     return await res.json();
//   } catch (err) {
//     console.error("fetchInternDaily error:", err);
//     return null;
//   }
// };

// // Intern — UPSERT
// export const saveInternDaily = async (
//   userId: string,
//   taskDate: string,
//   payload: Omit<DailyUpdateRecord, "id">
// ) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${taskDate}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) return { success: false };

//     const body = await res.json().catch(() => ({}));
//     return { success: true, mode: body.mode };
//   } catch (err) {
//     console.error("saveInternDaily error:", err);
//     return { success: false };
//   }
// };

// // Admin/Mentor — Batch load
// export const fetchBatchDaily = async (batch: string, taskDate: string) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/batch/${batch}/${taskDate}`);
//     if (!res.ok) return [];
//     return await res.json();
//   } catch (err) {
//     console.error("fetchBatchDaily error:", err);
//     return [];
//   }
// };





//////dharan's use for db




// // src/api/dailyUpdateApi.ts
// const BASE = "http://localhost:4000/interngo";

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

// // Intern — GET a day's data
// export const fetchInternDaily = async (userId: string, taskDate: string) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${taskDate}`);

//     if (res.status === 404) return null;
//     if (!res.ok) throw new Error("fetchInternDaily failed");

//     return await res.json();
//   } catch (err) {
//     console.error("fetchInternDaily error:", err);
//     return null;
//   }
// };

// // Intern — UPSERT
// export const saveInternDaily = async (
//   userId: string,
//   taskDate: string,
//   payload: Omit<DailyUpdateRecord, "id">
// ) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/${userId}/${taskDate}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) return { success: false };

//     const body = await res.json().catch(() => ({}));
//     return { success: true, mode: body.mode };
//   } catch (err) {
//     console.error("saveInternDaily error:", err);
//     return { success: false };
//   }
// };

// // Admin/Mentor — Batch load
// export const fetchBatchDaily = async (batch: string, taskDate: string) => {
//   try {
//     const res = await fetch(`${BASE}/dailyupdate/batch/${batch}/${taskDate}`);
//     if (!res.ok) return [];
//     return await res.json();
//   } catch (err) {
//     console.error("fetchBatchDaily error:", err);
//     return [];
//   }
// };





const BASE = "http://localhost:4000/interngo";

// ================= TYPES =================
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

// ================= INTERN =================
export const fetchInternDaily = async (
  userId: string,
  date: string
): Promise<DailyUpdateRecord | null> => {
  const res = await fetch(
    `${BASE}/tasks/${userId}/${date}`
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("fetchInternDaily failed");

  return await res.json();
};

export const saveInternDaily = async (
  userId: string,
  date: string,
  payload: DailyUpdateRecord
) => {
  const res = await fetch(
    `${BASE}/tasks/${userId}/${date}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) return { success: false };
  return { success: true };
};

// ================= ADMIN / MENTOR =================
export const fetchBatchDaily = async (
  year: string,
  date: string
): Promise<BatchDailyRecord[]> => {
  const res = await fetch(
    `${BASE}/tasks/batch/${year}/${date}`
  );

  if (!res.ok) return [];
  return await res.json();
};
