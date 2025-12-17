// // src/pages/common/PendingTickets.tsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// // ------------------------------------------------------------------
// // MOCK TICKETS (REPLACE WITH DB LATER)
// // ------------------------------------------------------------------
// // TODO: Replace with real API call based on role & userId, eg:
// // const res = await fetch(`/api/tickets?recipientRole=${role}&recipientId=${userId}`);
// // setTickets(res.data);
// type TicketStatus = "Pending" | "RESOLVED";
// type TicketPriority = "Low" | "Medium" | "High";

// interface Ticket {
//   id: string;
//   subject: string;
//   description: string;
//   raisedByName: string;
//   raisedByRole: string;
//   priority: TicketPriority;
//   status: TicketStatus;
//   recipientRole: "admin" | "mentor";
//   recipientId?: string; // for mentor-specific tickets
// }

// const mockTickets: Ticket[] = [
//   {
//     id: "t1",
//     subject: "Test",
//     description: "testing",
//     raisedByName: "Intern A",
//     raisedByRole: "intern",
//     priority: "High",
//     status: "Pending",
//     recipientRole: "admin",
//   },
//   {
//     id: "t2",
//     subject: "Doubt in task",
//     description: "Need clarification on API integration.",
//     raisedByName: "Intern B",
//     raisedByRole: "intern",
//     priority: "Medium",
//     status: "Pending",
//     recipientRole: "mentor",
//     recipientId: "m1",
//   },
// ];

// const PendingTickets: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const role = (user?.role || "").toLowerCase(); // "admin" | "mentor" | etc.
//   const userId = user?.uid;

//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [activeTab, setActiveTab] = useState<"Pending" | "resolved">("Pending");

//   useEffect(() => {
//     // ----------------------------------------------------------------
//     // TODO: Replace entire useEffect with real DB fetch
//     // Example:
//     // const res = await fetch(`/api/help-tickets?for=${role}&id=${userId}`);
//     // setTickets(res.data);
//     // ----------------------------------------------------------------
//     let filtered = mockTickets;

//     if (role === "admin") {
//       filtered = mockTickets.filter((t) => t.recipientRole === "admin");
//     } else if (role === "mentor") {
//       filtered = mockTickets.filter(
//         (t) => t.recipientRole === "mentor" && (!t.recipientId || t.recipientId === userId)
//       );
//     }

//     setTickets(filtered);
//   }, [role, userId]);

//   const cardClass =
//     "p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl";

//   const statusColors: Record<TicketStatus, string> = {
//     PENDING: "bg-red-100 text-red-700",
//     RESOLVED: "bg-emerald-100 text-emerald-700",
//   };

//   const priorityColors: Record<TicketPriority, string> = {
//     Low: "bg-gray-100 text-gray-700",
//     Medium: "bg-amber-100 text-amber-700",
//     High: "bg-red-100 text-red-700",
//   };

//   const visibleTickets = tickets.filter(
//     (t) => t.status === (activeTab === "Pending" ? "Pending" : "RESOLVED")
//   );

//   return (
//     <div className="min-h-screen w-full flex justify-center p-6 overflow-y-auto no-scrollbar">
//       <div className="w-full max-w-5xl text-white space-y-8">
//         {/* HEADER + TABS */}
//         <div className="flex flex-col items-center gap-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
//             Help Requests
//           </h2>

//           <div className="flex gap-3">
//             <button
//               onClick={() => setActiveTab("Pending")}
//               className={`px-4 py-2 rounded-xl font-semibold ${
//                 activeTab === "Pending"
//                   ? "bg-blue-500 text-white"
//                   : "bg-white/10 border border-white/20 hover:bg-white/20"
//               }`}
//             >
//               New / Pending Requests
//             </button>

//             <button
//               onClick={() => setActiveTab("resolved")}
//               className={`px-4 py-2 rounded-xl font-semibold ${
//                 activeTab === "resolved"
//                   ? "bg-blue-500 text-white"
//                   : "bg-white/10 border border-white/20 hover:bg-white/20"
//               }`}
//             >
//               Resolved Requests
//             </button>
//           </div>

//           {/* Optional: quick navigation back to intern help page */}
//           {role !== "intern" && (
//             <button
//               onClick={() => navigate("/intern/help")}
//               className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15"
//             >
//               Go to New Help Request
//             </button>
//           )}
//         </div>

//         {/* TICKETS LIST CARD */}
//         <motion.div whileHover={{ scale: 1.01 }} className={cardClass}>
//           {visibleTickets.length === 0 ? (
//             <p className="text-center text-sm text-white/70">
//               No {activeTab === "Pending" ? "Pending" : "resolved"} help
//               requests.
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {visibleTickets.map((t) => (
//                 <motion.div
//                   key={t.id}
//                   whileHover={{ scale: 1.01 }}
//                   className="rounded-2xl bg-white/5 border border-white/15 px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-md"
//                 >
//                   {/* LEFT: subject + description + raised by */}
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-white">
//                       {t.subject}
//                     </h3>
//                     <p className="text-sm text-white/80 mt-1">
//                       {t.description}
//                     </p>
//                     <p className="text-xs text-blue-200 mt-2">
//                       raised by :{" "}
//                       <span className="font-semibold">{t.raisedByName}</span>{" "}
//                       <span className="opacity-80">
//                         ({t.raisedByRole?.toUpperCase()})
//                       </span>
//                     </p>
//                   </div>

//                   {/* RIGHT: priority + status */}
//                   <div className="flex flex-col items-end gap-2 min-w-[140px]">
//                     {/* STATUS BADGE */}
//                     <span
//                       className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold ${statusColors[t.status]}`}
//                     >
//                       {t.status === "Pending" ? "Pending" : "RESOLVED"}
//                     </span>

//                     {/* PRIORITY BADGE */}
//                     <span
//                       className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold ${priorityColors[t.priority]}`}
//                     >
//                       Priority: {t.priority.toUpperCase()}
//                     </span>

//                     {/* FUTURE: Toggle / Mark as resolved */}
//                     {/* 
//                     <button
//                       onClick={() => handleToggleStatus(t.id)}
//                       className="mt-1 text-[11px] px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
//                     >
//                       Mark as {t.status === "Pending" ? "Resolved" : "Pending"}
//                     </button>
//                     */}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PendingTickets;





// src/pages/PendingTickets.tsx
import React from "react";
import { motion } from "framer-motion";

const mockTickets = [
  {
    id: "T1001",
    from: "Gopika (Intern)",
    issue: "Need help to access admin panel",
    status: "Pending",
  },
  {
    id: "T1002",
    from: "Ravi (Intern)",
    issue: "Doubt in project submission",
    status: "Pending",
  },
];

const PendingTickets: React.FC = () => {
  return (
    // <div
    //   className="
    //   min-h-screen p-6 flex justify-center relative overflow-hidden
    //   bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
    //   no-scrollbar text-[#1E2A35]
    // "
    // >
        <>
      {/* Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-1/4 left-1/4"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-1/4 right-1/4"
        animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="
          relative z-10 bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
          shadow-xl rounded-3xl p-10 w-full max-w-3xl
        "
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Pending Tickets</h2>

        <div className="space-y-6">
          {mockTickets.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02 }}
              className="
                bg-white/70 border border-[#96C2DB]/40 rounded-2xl p-6
                shadow-md backdrop-blur-xl
              "
            >
              <p className="text-lg font-semibold">{t.from}</p>
              <p className="mt-2 text-gray-700">{t.issue}</p>
              <span className="inline-block mt-3 px-4 py-1 bg-yellow-300 text-black rounded-full text-sm font-bold">
                {t.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
    {/* </div> */}
    </>
  );
};

export default PendingTickets;
