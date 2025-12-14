import React from "react";

const AttendanceReport: React.FC = () => {
  return (
    <div className="min-h-[80vh] px-6 py-6">
      <h2 className="text-3xl font-bold mb-6">Monthly Attendance Report</h2>
      <p className="text-sm text-gray-500">
        (Excel + PDF export logic same as DailyUpdate)
      </p>
    </div>
  );
};

export default AttendanceReport;
