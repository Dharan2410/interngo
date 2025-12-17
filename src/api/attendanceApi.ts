// const BASE = "http://localhost:4000";

// export interface AttendanceRow {
//   userId: string;
//   name: string;
//   session1: "Present" | "Absent" | "WFH";
//   session2: "Present" | "Absent" | "WFH";
//   overall: "Present" | "Absent" | "Half Day";
// }

// export const fetchAttendanceBatch = async (
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



const BASE = "http://localhost:4000";

// ---------- NORMALIZER ----------
const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");

// ---------- FETCH + MERGE ----------
export const fetchAttendanceBatch = async (
  year: string,
  batch: string,
  date: string
) => {
  // 1️⃣ Fetch users
  const usersRes = await fetch(`${BASE}/interngo/users`);
  const users = await usersRes.json();

  const interns = users.filter(
    (u: any) =>
      u.role === "intern" &&
      String(u.year) === String(year) &&
      normalizeBatch(u.batch || "") === normalizeBatch(batch)
  );

  // 2️⃣ Fetch attendance
  const attRes = await fetch(`${BASE}/attendance`);
  const attendance = await attRes.json();

  // 3️⃣ Merge users + attendance
  return interns.map((intern: any) => {
    const record = attendance.find(
      (a: any) =>
        a.userId === intern.uid &&
        a.date === date
    );

    return {
      userId: intern.uid,
      name: intern.name,
      batch: intern.batch,
      year: intern.year,
      session1: record?.session1?.toLowerCase() || "present",
      session2: record?.session2?.toLowerCase() || "present",
    };
  });
};

// ---------- SAVE (UPSERT) ----------
export const saveAttendance = async (payload: any) => {
  const res = await fetch(`${BASE}/attendance`);
  const data = await res.json();

  const existing = data.find(
    (a: any) =>
      a.userId === payload.userId &&
      a.date === payload.date
  );

  // UPDATE
  if (existing) {
    return fetch(`${BASE}/attendance/${existing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...existing, ...payload }),
    });
  }

  // CREATE
  return fetch(`${BASE}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

