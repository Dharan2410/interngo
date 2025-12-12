// src/api/attendanceApi.ts
import axios from "axios";

const BASE = "http://localhost:8080/interngo";

// ===============================
// FETCH ATTENDANCE FOR A BATCH
// ===============================
//
// GET  /interngo/attendance/batch/:year/:batch/:date
//
// Returns:
// [
//   {
//     id: "user123",
//     name: "Gopika",
//     status: "present"  // "absent" | "leave" | "half-day"
//   },
//   ...
// ]
//
export const fetchAttendanceBatch = async (
  year: string,
  batch: string,
  date: string
) => {
  try {
    const res = await axios.get(
      `${BASE}/attendance/batch/${year}/${batch}/${date}`
    );

    return res.data || [];
  } catch (err) {
    console.error("❌ Error fetching attendance batch:", err);
    return [];
  }
};

// ===============================
// SAVE / UPDATE ATTENDANCE STATUS
// ===============================
//
// POST /interngo/attendance/mark
//
// Payload:
// {
//   userId,
//   year,
//   batch,
//   date,
//   status
// }
//
// Response:
// { success: true }
//
export const saveAttendance = async (payload: {
  userId: string;
  year: string;
  batch: string;
  date: string;
  status: string;  // "present" | "absent" | "leave" | "half-day"
//
}) => {
  try {
    const res = await axios.post(`${BASE}/attendance/mark`, payload);
    return res.data;
  } catch (err) {
    console.error("❌ Error saving attendance:", err);
    return { success: false };
  }
};
