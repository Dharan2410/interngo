const BASE = "http://localhost:4000";

// ---------- NORMALIZER ----------
const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");

// ---------- FETCH ----------
export const fetchAttendanceBatch = async (
  year: string,
  batch: string,
  date: string
) => {
  // 1️⃣ Users
  const usersRes = await fetch(`${BASE}/interngo/users`);
  const users = await usersRes.json();

  const interns = users.filter(
    (u: any) =>
      u.role === "intern" &&
      String(u.year) === String(year) &&
      normalizeBatch(u.batch || "") === normalizeBatch(batch)
  );

  // 2️⃣ Attendance by date
  const attRes = await fetch(`${BASE}/interngo/attendance/${date}`);
  const attData = await attRes.json();

  const attendance = Array.isArray(attData.attendance)
    ? attData.attendance
    : [];

  // 3️⃣ Merge (🔥 UNIQUE identity)
  return interns.map((intern: any) => {
    const record = attendance.find(
      (a: any) => a.userId === intern.uid
    );

    return {
      rowId: intern.uid,     // FRONTEND UNIQUE ID
      userId: intern.uid,    // BACKEND ID
      empId: intern.empId || "-", // UI only
      name: intern.name,
      year: intern.year,
      batch: intern.batch,
      session1: record?.session1?.toLowerCase() || "present",
      session2: record?.session2?.toLowerCase() || "present",
    };
  });
};
export const saveAttendance = async (payload: {
  year: string;
  batch: string;
  date: string;
  markedBy: string;
  attendance: {
    userId: string;
    session1: string;
    session2: string;
  }[];
}) => {
  const res = await fetch(`${BASE}/interngo/attendance/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("saveAttendance response:", data);

  return data; // ✅ return parsed data
};





///dhara's use for DB


// const BASE = "http://localhost:4000";

// // ---------- NORMALIZER ----------
// const normalizeBatch = (batch: string) =>
//   batch.toLowerCase().replace(/[\s-_]/g, "");

// // ---------- FETCH ----------
// export const fetchAttendanceBatch = async (
//   year: string,
//   batch: string,
//   date: string
// ) => {
//   // 1️⃣ Users
//   const usersRes = await fetch(`${BASE}/interngo/getallprofiles`);
//   const users = await usersRes.json();
//   const data = users.users
//   const interns = data.filter(
//     (u: any) =>
//       u.role === "intern" &&
//       String(u.year) === String(year) &&
//       normalizeBatch(u.batch || "") === normalizeBatch(batch)
//   );

//   // 2️⃣ Attendance by date
//   const attRes = await fetch(`${BASE}/interngo/attendance/${date}`);
//   const attData = await attRes.json();

//   const attendance = Array.isArray(attData.attendance)
//     ? attData.attendance
//     : [];

//   // 3️⃣ Merge (🔥 UNIQUE identity)
//   return interns.map((intern: any) => {
//     const record = attendance.find(
//       (a: any) => a.userId === intern.uid
//     );

//     return {
//       rowId: intern._id,     // FRONTEND UNIQUE ID
//       userId: intern._id,    // BACKEND ID
//       empId: intern.empId || "-", // UI only
//       name: intern.name,
//       year: intern.year,
//       batch: intern.batch,
//       session1: record?.session1?.toLowerCase() || "present",
//       session2: record?.session2?.toLowerCase() || "present",
//     };
//   });
// };
// export const saveAttendance = async (payload: {
//   year: string;
//   batch: string;
//   date: string;
//   markedBy:string;
//   attendance: {
//     userId: string;
//     session1: string;
//     session2: string;
//   }[];
// }) => {
//   const res = await fetch(`${BASE}/interngo/attendance/getAttendance`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   console.log("saveAttendance response:", data);

//   return data; // ✅ return parsed data
// };