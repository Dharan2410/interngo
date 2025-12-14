import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceRow from "../../components/Attendance/AttendanceRow";
import { fetchAttendanceBatch, saveAttendance } from "../../api/attendanceApi";

const AttendanceSheet: React.FC = () => {
  const { year, batch, date } = useParams();
  const [rows, setRows] = useState<any[]>([]);
useEffect(() => {
  fetchAttendanceBatch(year!, batch!, date!)
    .then((data) => {
      if (Array.isArray(data)) setRows(data);
      else setRows([]);
    });
}, [year, batch, date]);
  const update = (id: string, s1: string, s2: string) => {
    saveAttendance({
      userId: id,
      year: year!,
      batch: batch!,
      date: date!,
      session1: s1,
      session2: s2,
    });

    setRows((r) =>
      r.map((x) =>
        x.userId === id ? { ...x, session1: s1, session2: s2 } : x
      )
    );
  };

  return (
    <div className="relative min-h-[80vh] px-4 py-6">
      <div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-2xl font-bold">
      Attendance — {year} / {batch}
    </h2>
    <p className="text-sm text-gray-500">
      Date: {date}
    </p>
  </div>

  <div className="flex gap-4 text-sm">
    <span className="text-green-700 font-semibold">Present: 22</span>
    <span className="text-red-700 font-semibold">Absent: 2</span>
    <span className="text-orange-700 font-semibold">WFH: 1</span>
  </div>
</div>

<div className="flex gap-3 mb-4 justify-end">
  <button className="px-3 py-1 text-sm rounded bg-green-100 text-green-700">
    Mark All Present
  </button>
  <button className="px-3 py-1 text-sm rounded bg-orange-100 text-orange-700">
    Mark All WFH
  </button>
</div>

<div className="grid grid-cols-4 text-xs font-semibold text-gray-500 mb-2 px-2">
  <div>Name</div>
  <div>Morning</div>
  <div>Evening</div>
</div>


      <div className="space-y-4">
        {rows.map((r) => (
          <AttendanceRow
            key={r.userId}
            name={r.name}
            session1={r.session1}
            session2={r.session2}
            onChange={(s1 : any , s2 : any) => update(r.userId, s1, s2)}
          />
        ))}
      </div>
    </div>
  );
};

export default AttendanceSheet;
