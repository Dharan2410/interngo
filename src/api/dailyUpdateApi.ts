



const BASE = "http://localhost:4000/interngo";

// ================= TYPES =================
export type TaskRow = {
  id: string;
  topic: string;
  plannedActivities: string;
  completedActivities: string;
  estimatedTime: string;
  actualTime: string;
  status: "Pending" | "Completed";
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





// //dhara's use for DB
// const BASE = "http://localhost:4000/interngo";

// // ================= TYPES =================
// export type TaskRow = {
//   id: string;
//   topic: string;
//   plannedActivities: string;
//   completedActivities: string;
//   estimatedTime: string;
//   actualTime: string;
//   status:"Pending" | "Completed";
// };

// export type DailyUpdateRecord = {
//   userId: string;
//   date: string;
//   totalTime: string;
//   tasks: TaskRow[];
// };

// export type BatchDailyRecord = {
//   _id: string;
//   internName: string;
//   date: string;
//   totalTime: string;
//   tasks: TaskRow[];
// };

// // ================= INTERN =================
// export const fetchInternDaily = async (
//   userId: string,
//   date: string
// ): Promise<DailyUpdateRecord | null> => {
//   const res = await fetch(
//     `${BASE}/tasks/getTasks/${userId}/${date}`
//   );

//   if (res.status === 404) return null;
//   if (!res.ok) throw new Error("fetchInternDaily failed");

//   return await res.json();
// };

// export const saveInternDaily = async (
//   userId: string,
//   date: string,
//   payload: DailyUpdateRecord
// ) => {
//   const res = await fetch(
//     `${BASE}/tasks/${userId}/${date}`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (!res.ok) return { success: false };
//   return { success: true };
// };


// export const fetchBatchDaily = async (
//   year: string,
//   date: string
// ): Promise<TaskRow[]> => {
//   const res = await fetch(
//     `${BASE}/tasks/getTasksByYearDate/${year}/${date}`
//   );

//   const data = await res.json();

//   if (!res.ok) return [];

//   return data.tasks; // flat task rows
// };