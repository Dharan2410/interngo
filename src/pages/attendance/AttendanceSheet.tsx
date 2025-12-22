

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceRow from "../../components/Attendance/AttendanceRow";
import { fetchAttendanceBatch, saveAttendance } from "../../api/attendanceApi";
import { useAuth } from "../../context/AuthContext";


type Status = "present" | "absent";
type OverallStatus = "Present" | "Absent" | "Half Day";

const getOverallStatus = (s1: Status, s2: Status): OverallStatus => {
  if (s1 === "absent" && s2 === "absent") return "Absent";
  if (s1 === "present" && s2 === "present") return "Present";
  return "Half Day";
};



const AttendanceSheet: React.FC = () => {
  const { year, batch, date } = useParams();
  const { user } = useAuth(); // logged-in admin / mentor
  const [toast, setToast] = useState<{
  type: "success" | "error";
  message: string;
} | null>(null);

  const [rows, setRows] = useState<any[]>([]);

  // ---------- LOAD ----------
  useEffect(() => {
    fetchAttendanceBatch(year!, batch!, date!)
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]));
  }, [year, batch, date]);

  const update = (rowId: string, s1: Status, s2: Status) => {
  setRows((prev) =>
    prev.map((r) =>
      r.rowId === rowId
        ? { ...r, session1: s1, session2: s2 }
        : r
    )
  );
};

  // ---------- BULK MARK (STATE ONLY) ----------
  const markAll = (status: Status) => {
    const updated = rows.map((r) => ({
      ...r,
      session1: status,
      session2: status,
    }));
    setRows(updated);
  };

 


const handleSaveAll = async () => {
  if (!rows.length || !user?.uid) return;

  try {
    await saveAttendance({
      year: year!,
      batch: batch!,
      date: date!,
      markedBy: user.uid, 
      attendance: rows.map((r) => ({
        userId: r.userId,
        session1: r.session1,
        session2: r.session2,
      })),
    });

     setToast({
      type: "success",
      message: "Attendance saved successfully",
    });

    setTimeout(() => setToast(null), 3000);
  } catch {
    setToast({
      type: "error",
      message: "Failed to save attendance",
    });

    setTimeout(() => setToast(null), 3000);
  }
};


  

  const stats = useMemo(() => {
  let present = 0;
  let absent = 0;
  let halfDay = 0;

  rows.forEach((r) => {
    if (r.session1 === "absent" && r.session2 === "absent") {
      absent++;
    } else if (
      (r.session1 === "absent" && r.session2 === "present") ||
      (r.session1 === "present" && r.session2 === "absent")
    ) {
      halfDay++;
    } else {
      present++;
    }
  });

  return {
    total: rows.length,
    present,
    absent,
    halfDay,
  };
}, [rows]);


  // ---------- UI ----------
  return (
    <>

    {toast && (
  <div
    className={`fixed top-5 right-5 z-50 
                px-6 py-4 rounded-xl shadow-xl 
                text-white font-semibold
                animate-slide-in
                ${
                  toast.type === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
  >
    {toast.message}
  </div>
)}

    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-1">
        Attendance {year} - {batch}
      </h2>
      <p className="text-sm text-gray-500 mb-4">Date: {date}</p>

      {/* STATS + ACTIONS */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        {/* STATS */}
        <div className="flex gap-5 flex-wrap text-sm font-semibold">
          <span className="px-3 py-1 rounded-lg bg-[#E8F1F7]">
            Total: {stats.total}
          </span>
          <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700">
            Present: {stats.present}
          </span>
          <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700">
            Absent: {stats.absent}
          </span>
          <span className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700">
  Half Day: {stats.halfDay}
</span>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => markAll("present")}
            className="px-5 py-2 rounded-xl font-semibold 
                       bg-green-100 text-green-700
                       transition-all duration-200
                       hover:scale-105 hover:shadow-lg"
          >
            Mark All Present
          </button>

          <button
            onClick={handleSaveAll}
            className="px-6 py-2 rounded-xl font-semibold
                       bg-[#3B6E8F] text-white
                       transition-all duration-200
                       hover:scale-105 hover:shadow-lg"
          >
            Save Attendance
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div
        className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 
                   bg-[#E8F1F7] border border-[#96C2DB]/50 
                   rounded-xl font-semibold text-[#3B6E8F] mb-3"
      >
        <span>Emp ID</span>
        <span>Name</span>
        <span className="text-center">Session 1</span>
        <span className="text-center">Session 2</span>
        <span className="text-center">Overall</span>
      </div>

      {/* ROWS */}
      <div className="space-y-4">
        {rows.map((r) => (
          <div
            key={r.rowId}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 
                       bg-white/70 backdrop-blur-xl 
                       border border-[#96C2DB]/40 
                       rounded-2xl px-6 py-4 shadow-sm"
          >
            {/* EMP ID */}
            <div className="flex flex-col">
              <span className="text-xs text-[#3B6E8F] md:hidden">Emp ID</span>
              <span className="font-semibold text-[#1E2A35]">
                {r.empId}
              </span>
            </div>

            {/* NAME */}
            <div className="flex flex-col">
              <span className="text-xs text-[#3B6E8F] md:hidden">Name</span>
              <span className="font-medium text-[#1E2A35]">{r.name}</span>
            </div>

            {/* SESSION 1 */}
            <div className="flex justify-center items-center">
              <AttendanceRow
  session1={r.session1}
  session2={r.session2}
  only="session1"
  onChange={(s1, s2) => update(r.rowId, s1, s2)}
/>

            </div>

            {/* SESSION 2 */}
            <div className="flex justify-center items-center">
              <AttendanceRow
  session1={r.session1}
  session2={r.session2}
  only="session2"
  onChange={(s1, s2) => update(r.rowId, s1, s2)}
/>

            </div>

            {/* OVERALL */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-xs text-[#3B6E8F] md:hidden">Overall</span>
              <span
                className={`
                  min-w-[100px] px-4 py-2 rounded-xl 
                  text-sm font-bold uppercase text-center
                  transition-all duration-200
                  hover:scale-105 hover:shadow-md
                  ${
                    getOverallStatus(r.session1, r.session2) === "Present"
                      ? "bg-green-100 text-green-700"
                      : getOverallStatus(r.session1, r.session2) === "Absent"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {getOverallStatus(r.session1, r.session2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AttendanceSheet;
