




  // import React, { useEffect, useMemo, useState } from "react";
  // import { useParams } from "react-router-dom";
  // import AttendanceRow from "../../components/Attendance/AttendanceRow";
  // import { fetchAttendanceBatch, saveAttendance } from "../../api/attendanceApi";

  // type Status = "present" | "absent" | "wfh";
  // const normalizeBatch = (batch: string) =>
  //   batch.toLowerCase().replace(/[\s-_]/g, "");


  // const AttendanceSheet: React.FC = () => {
  //   const { year, batch, date } = useParams();
  //   const [rows, setRows] = useState<any[]>([]);

  //   // ---------------- LOAD DATA ----------------
  //   useEffect(() => {
  //   fetchAttendanceBatch(year!, batch!, date!).then((data) => {
  //     if (!Array.isArray(data)) {
  //       setRows([]);
  //       return;
  //     }

  //     const filtered = data.filter(
  //       (r) =>
  //         normalizeBatch(r.batch || "") === normalizeBatch(batch || "")
  //     );

  //     const normalized = filtered.map((r) => ({
  //       ...r,
  //       session1: (r.session1 || "present").toLowerCase(),
  //       session2: (r.session2 || "present").toLowerCase(),
  //     }));

  //     setRows(normalized);
  //   });
  // }, [year, batch, date]);


  //   // ---------------- UPDATE SINGLE INTERN ----------------
  //   const update = (id: string, s1: Status, s2: Status) => {
  //     saveAttendance({
  //       userId: id,
  //       year,
  //       batch,
  //       date,
  //       session1: s1,
  //       session2: s2,
  //     });

  //     setRows((prev) =>
  //       prev.map((r) =>
  //         r.userId === id ? { ...r, session1: s1, session2: s2 } : r
  //       )
  //     );
  //   };

  //   // ---------------- BULK ACTIONS ----------------
  //   const markAll = (status: Status) => {
  //     const updated = rows.map((r) => ({
  //       ...r,
  //       session1: status,
  //       session2: status,
  //     }));

  //     setRows(updated);

  //     updated.forEach((r) => {
  //       saveAttendance({
  //         userId: r.userId,
  //         year,
  //         batch,
  //         date,
  //         session1: status,
  //         session2: status,
  //       });
  //     });
  //   };

  //   // ---------------- COUNTS ----------------
  //   const stats = useMemo(() => {
  //     let present = 0,
  //       absent = 0,
  //       wfh = 0;

  //     rows.forEach((r) => {
  //       const overall =
  //         r.session1 === "absent" || r.session2 === "absent"
  //           ? "absent"
  //           : r.session1 === "wfh" || r.session2 === "wfh"
  //           ? "wfh"
  //           : "present";

  //       if (overall === "present") present++;
  //       if (overall === "absent") absent++;
  //       if (overall === "wfh") wfh++;
  //     });

  //     return {
  //       total: rows.length,
  //       present,
  //       absent,
  //       wfh,
  //     };
  //   }, [rows]);

  //   // ---------------- UI ----------------
  //   return (
  //     <div className="relative min-h-[80vh] px-4 py-6">
  //       {/* HEADER */}
  //       <div className="flex items-center justify-between mb-6">
  //         <div>
  //           <h2 className="text-2xl font-bold">
  //             Attendance — {year} / {batch}
  //           </h2>
  //           <p className="text-sm text-gray-500">Date: {date}</p>
  //         </div>

  //         <div className="flex gap-4 text-sm font-semibold">
  //           <span>Total: {stats.total}</span>
  //           <span className="text-green-700">Present: {stats.present}</span>
  //           <span className="text-red-700">Absent: {stats.absent}</span>
  //           <span className="text-orange-700">WFH: {stats.wfh}</span>
  //         </div>
  //       </div>

  //       {/* BULK BUTTONS */}
  //       <div className="flex gap-3 justify-end mb-4">
  //         <button
  //           onClick={() => markAll("present")}
  //           className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm font-semibold"
  //         >
  //           Mark All Present
  //         </button>
  //         <button
  //           onClick={() => markAll("wfh")}
  //           className="px-3 py-1 rounded bg-orange-100 text-orange-700 text-sm font-semibold"
  //         >
  //           Mark All WFH
  //         </button>
  //       </div>

  //       {/* TABLE HEADER */}
  //       <div className="grid grid-cols-3 px-4 mb-2 text-xs font-semibold text-gray-500">
  //         <div>Intern Name</div>
  //         <div>Session 1</div>
  //         <div>Session 2</div>
  //       </div>

  //       {/* ROWS */}
  //       <div className="space-y-3">
  //         {rows.map((r) => (
  //           <AttendanceRow
  //             key={r.userId}
  //             name={r.name}
  //             session1={r.session1}
  //             session2={r.session2}
  //             onChange={(s1, s2) => update(r.userId, s1, s2)}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default AttendanceSheet;






  import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceRow from "../../components/Attendance/AttendanceRow";
import { fetchAttendanceBatch, saveAttendance } from "../../api/attendanceApi";

type Status = "present" | "absent" | "wfh";

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

      {/* <div className="flex gap-4 mb-4">
        <span>Total: {stats.total}</span>
        <span className="text-green-600">Present: {stats.present}</span>
        <span className="text-red-600">Absent: {stats.absent}</span>
        <span className="text-orange-600">WFH: {stats.wfh}</span>
      </div>

      <div className="flex gap-3 justify-end mb-4">
        <button onClick={() => markAll("present")} className="btn-green">
          Mark All Present
        </button>
        <button onClick={() => markAll("wfh")} className="btn-orange">
          Mark All WFH
        </button>
      </div> */}


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
    <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700">
      WFH: {stats.wfh}
    </span>
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

    <button
      onClick={() => markAll("wfh")}
      className="px-5 py-2 rounded-xl font-semibold 
                 bg-orange-100 text-orange-700 cursor-pointer
                 transition-all duration-200
                 hover:scale-110 hover:shadow-lg"
    >
      Mark All WFH
    </button>
  </div>
</div>

{/* HEADER ROW */}
<div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 
                bg-[#E8F1F7] border border-[#96C2DB]/50 
                rounded-xl font-semibold text-[#3B6E8F] mb-3">
  <span>Emp ID</span>
  <span>Name</span>
  <span className="text-center">Session 1</span>
  <span className="text-center">Session 2</span>
</div>

      <div className="space-y-4">
  {rows.map((r) => (
    <div
      key={r.userId}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 
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
    </div>
  ))}
</div>

    </div>
  );
};

export default AttendanceSheet;
