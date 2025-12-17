




  import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceRow from "../../components/Attendance/AttendanceRow";
import { fetchAttendanceBatch, saveAttendance } from "../../api/attendanceApi";

type Status = "present" | "absent";
type OverallStatus = "Present" | "Absent" | "Half Day";

const getOverallStatus = (
  s1: Status,
  s2: Status
): OverallStatus => {
  if (s1 === "absent" && s2 === "absent") return "Absent";
  if (s1 === "present" && s2 === "present") return "Present";
  return "Half Day";
};


const AttendanceSheet: React.FC = () => {
  const { year, batch, date } = useParams();
  const [rows, setRows] = useState<any[]>([]);

  // ---------- LOAD ----------
  useEffect(() => {
    fetchAttendanceBatch(year!, batch!, date!).then(setRows);
  }, [year, batch, date]);

  // ---------- UPDATE ----------
  const update = (id: string, s1: Status, s2: Status) => {
    setRows((prev) =>
      prev.map((r) =>
        r.userId === id ? { ...r, session1: s1, session2: s2 } : r
      )
    );
    


    saveAttendance({
      userId: id,
      year,
      batch,
      date,
      session1: s1,
      session2: s2,
    });
  };

  // ---------- BULK ----------
  const markAll = (status: Status) => {
    const updated = rows.map((r) => ({
      ...r,
      session1: status,
      session2: status,
    }));
    setRows(updated);

    updated.forEach((r) =>
      saveAttendance({
        userId: r.userId,
        year,
        batch,
        date,
        session1: status,
        session2: status,
      })
    );
  };

  // ---------- STATS ----------
  const stats = useMemo(() => {
    let present = 0,
      absent = 0,
      wfh = 0;

    rows.forEach((r) => {
      if (r.session1 === "absent" || r.session2 === "absent") absent++;
      else if (r.session1 === "wfh" || r.session2 === "wfh") wfh++;
      else present++;
    });

    return { total: rows.length, present, absent, wfh };
  }, [rows]);

  // ---------- UI ----------
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-1">
        Attendance {year} - {batch}
      </h2>
      <p className="text-sm text-gray-500 mb-4">Date: {date}</p>


      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
  
  {/* 📊 STATS — LEFT */}
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
    {/* <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700">
      WFH: {stats.wfh}
    </span> */}
  </div>

  {/* ⚡ ACTION BUTTONS — RIGHT */}
  <div className="flex gap-3">
    <button
      onClick={() => markAll("present")}
      className="px-5 py-2 rounded-xl font-semibold 
                 bg-green-100 text-green-700 cursor-pointer
                 transition-all duration-200
                 hover:scale-110 hover:shadow-lg"
    >
      Mark All Present
    </button>

    {/* <button
      onClick={() => markAll("wfh")}
      className="px-5 py-2 rounded-xl font-semibold 
                 bg-orange-100 text-orange-700 cursor-pointer
                 transition-all duration-200
                 hover:scale-110 hover:shadow-lg"
    >
      Mark All WFH
    </button> */}
  </div>
</div>

{/* HEADER ROW */}
<div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 
                bg-[#E8F1F7] border border-[#96C2DB]/50 
                rounded-xl font-semibold text-[#3B6E8F] mb-3">
  <span>Emp ID</span>
  <span>Name</span>
  <span className="text-center">Session 1</span>
  <span className="text-center">Session 2</span>
  <span className="text-center">Overall</span>
</div>

      <div className="space-y-4">
  {rows.map((r) => (
    <div
      key={r.userId}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 
                 bg-white/70 backdrop-blur-xl 
                 border border-[#96C2DB]/40 
                 rounded-2xl px-6 py-4 shadow-sm"
    >
      {/* EMP ID */}
      <div className="flex flex-col">
        <span className="text-xs text-[#3B6E8F] md:hidden">Emp ID</span>
        <span className="font-semibold text-[#1E2A35]">
          {r.empId || r.userId}
        </span>
      </div>

      {/* NAME */}
      <div className="flex flex-col">
        <span className="text-xs text-[#3B6E8F] md:hidden">Name</span>
        <span className="font-medium text-[#1E2A35]">
          {r.name}
        </span>
      </div>

      {/* SESSION 1 */}
      <div className="flex justify-center items-center">
        <AttendanceRow
          session1={r.session1}
          session2={r.session2}
          only="session1"
          onChange={(s1, s2) => update(r.userId, s1, s2)}
        />
      </div>

      {/* SESSION 2 */}
      <div className="flex justify-center items-center">
        <AttendanceRow
          session1={r.session1}
          session2={r.session2}
          only="session2"
          onChange={(s1, s2) => update(r.userId, s1, s2)}
        />
      </div>

      {/* OVERALL STATUS */}
<div className="flex flex-col justify-center items-center">
  <span className="text-xs text-[#3B6E8F] md:hidden">Overall</span>

  <span
    className={`min-w-[90px] px-4 py-2 rounded-xl text-sm font-semibold 
                    transition shadow-sm hover:scale-105'
      ${
        getOverallStatus(r.session1, r.session2) === "Present"
          ? "bg-green-100 text-green-700"
          : getOverallStatus(r.session1, r.session2) === "Absent"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
  >
    {getOverallStatus(r.session1, r.session2)}
  </span>
</div>

    </div>
  ))}
</div>

    </div>
  );
};

export default AttendanceSheet;
