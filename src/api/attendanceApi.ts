// const BASE = "http://localhost:4000";

// export interface AttendanceRow {
//   userId: string;
//   name: string;
//   session1: "Present" | "Absent" | "WFH";
//   session2: "Present" | "Absent" | "WFH";
//   overall: "Present" | "Absent" | "Half Day";
// }

// export const fetchAttendance = async (
//   year: string,
//   batch: string,
//   date: string
// ): Promise<AttendanceRow[]> => {
//   const res = await fetch(
//     `${BASE}/interngo/attendance/${year}/${batch}/${date}`
//   );
//   if (!res.ok) return [];
//   return res.json();
// };

// export const saveAttendance = async (payload: {
//   userId: string;
//   year: string;
//   batch: string;
//   date: string;
//   session1: string;
//   session2: string;
// }) => {
//   await fetch(`${BASE}/interngo/attendance`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
// };



const BASE = "http://localhost:4000/interngo";

// GET attendance for batch + date
export const fetchAttendanceBatch = async (
  year: string,
  batch: string,
  date: string
) => {
  const res = await fetch(
    `${BASE}/attendance?year=${year}&batch=${batch}&date=${date}`
  );

  if (!res.ok) return []; // 🛡️ prevent crash
  return res.json();
};

// SAVE or UPDATE attendance
export const saveAttendance = async (data: any) => {
  return fetch(`${BASE}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
