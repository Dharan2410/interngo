import React from "react";

interface Props {
  name: string;
  session1: string;
  session2: string;
  onChange: (s1: string, s2: string) => void;
}

const btn = (active: boolean, color: string) =>
  `px-3 py-1 rounded-lg text-sm ${
    active ? color + " text-white" : "bg-white border"
  }`;

const AttendanceRow: React.FC<Props> = ({
  name,
  session1,
  session2,
  onChange,
}) => {
  return (
    <div className="bg-white/70 rounded-2xl p-4 shadow flex justify-between items-center">
      <div className="font-semibold">{name}</div>

      <div className="flex gap-2">
        <button
          className={btn(session1 === "Present", "bg-green-500")}
          onClick={() => onChange("Present", session2)}
        >
          S1 P
        </button>
        <button
          className={btn(session1 === "Absent", "bg-red-500")}
          onClick={() => onChange("Absent", session2)}
        >
          S1 A
        </button>
        <button
          className={btn(session2 === "Present", "bg-green-500")}
          onClick={() => onChange(session1, "Present")}
        >
          S2 P
        </button>
        <button
          className={btn(session2 === "Absent", "bg-red-500")}
          onClick={() => onChange(session1, "Absent")}
        >
          S2 A
        </button>
      </div>
    </div>
  );
};

export default AttendanceRow;






// const STATUS_COLORS: any = {
//   present: "bg-green-100 text-green-700 border-green-300",
//   absent: "bg-red-100 text-red-700 border-red-300",
//   wfh: "bg-orange-100 text-orange-700 border-orange-300",
// };

// const StatusPill = ({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) => {
//   const statuses = ["present", "absent", "wfh"];

//   return (
//     <div className="flex gap-2">
//       {statuses.map((s) => (
//         <button
//           key={s}
//           onClick={() => onChange(s)}
//           className={`px-3 py-1 rounded-full border text-xs font-semibold transition
//             ${value === s ? STATUS_COLORS[s] : "bg-white border-gray-300"}
//           `}
//         >
//           {s.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   );
// };

// const AttendanceRow = ({
//   name,
//   session1,
//   session2,
//   onChange,
// }: any) => {
//   const overall =
//     session1 === "absent" || session2 === "absent"
//       ? "absent"
//       : session1 === "wfh" || session2 === "wfh"
//       ? "wfh"
//       : "present";

//   return (
//     <div className="grid grid-cols-4 items-center gap-4 bg-white/70 rounded-xl p-4 border shadow-sm">
//       <div className="font-medium text-[#1E2A35]">{name}</div>

//       <StatusPill
//         value={session1}
//         onChange={(v) => onChange(v, session2)}
//       />

//       <StatusPill
//         value={session2}
//         onChange={(v) => onChange(session1, v)}
//       />

     
//     </div>
//   );
// };

// export default AttendanceRow;
