import express from "express";
import cors from "cors";
import axios from "axios";
import XLSX from "xlsx";

const app = express();
app.use(cors());

const JSON_BASE = "http://localhost:4000";

app.get("/attendance/report", async (req, res) => {
  const { from, to, year, batch } = req.query;
const normalizeBatch = (v) =>
  String(v).toLowerCase().replace(/[\s-_]/g, "");

  if (!from || !to || !year || !batch) {
    return res.status(400).send("Missing query params");
  }

  // 1️⃣ Get users
  const usersRes = await axios.get(`${JSON_BASE}/interngo/users`);
//   const interns = usersRes.data.filter(
//     (u) =>
//       u.role === "intern" &&
//       String(u.year) === String(year) &&
//       String(u.batch).toLowerCase() === String(batch).toLowerCase()
//   );
const interns = usersRes.data.filter(
  (u) =>
    u.role === "intern" &&
    String(u.year) === String(year) &&
    normalizeBatch(u.batch) === normalizeBatch(batch)
);


  // 2️⃣ Get ALL attendance directly from db.json
  const attendanceRes = await axios.get(`${JSON_BASE}/attendance`);
  const attendance = attendanceRes.data;

  const map = {};

  attendance.forEach((a) => {
    if (a.date < from || a.date > to) return;

    const intern = interns.find((i) => i.uid === a.userId);
    if (!intern) return;

    if (!map[intern.uid]) {
      map[intern.uid] = {
        empId: intern.empId || intern.uid,
        name: intern.name,
        present: 0,
        absent: 0,
        daily: {},
      };
    }

    const s1 = a.session1?.toLowerCase();
    const s2 = a.session2?.toLowerCase();

    let status = "Absent";
    if (s1 === "present" && s2 === "present") {
      status = "Present";
    } else if (s1 === "present" || s2 === "present") {
      status = "Half Day";
    }

    map[intern.uid].daily[a.date] = status;

    if (status === "Present") map[intern.uid].present++;
    else map[intern.uid].absent++;
  });

  const rows = Object.values(map).map((r) => ({
    "Emp ID": r.empId,
    "Intern Name": r.name,
    "Days Present": r.present,
    "Days Absent": r.absent,
    "Date-wise Attendance": JSON.stringify(r.daily),
  }));

  if (!rows.length) {
    return res.status(200).send("No attendance data found");
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");

  const buffer = XLSX.write(wb, {
    type: "buffer",
    bookType: "xlsx",
  });

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=attendance-report.xlsx"
  );
  res.send(buffer);
});

app.listen(4001, () =>
  console.log("📊 Report server running at http://localhost:4001")
);
