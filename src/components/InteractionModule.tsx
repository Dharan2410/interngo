// import React, { useEffect, useState } from "react";

// // Types
// type Role = "admin" | "mentor" | "interviewer" | "intern";

// interface Interaction {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   mentorId: string;
//   mentorName: string;
//   interviewerId: string;
//   interviewerName: string;
//   interns: string[];
//   batch?: string;
// }

// interface User {
//   id: string;
//   role: Role;
//   name: string;
// }

// // Dummy data for testing, replace with API calls
// const batches: string[] = ["Batch A", "Batch B"];
// const allInteractions: Interaction[] = [
//   {
//     id: 1,
//     title: "AI Project Discussion",
//     date: "2025-12-05",
//     time: "10:00 AM",
//     mentorId: "mentor1",
//     mentorName: "Dr. Smith",
//     interviewerId: "interviewer1",
//     interviewerName: "Ms. Jane",
//     interns: ["intern1", "intern2"],
//   },
//   {
//     id: 2,
//     title: "Web Dev Workshop",
//     date: "2025-12-06",
//     time: "02:00 PM",
//     mentorId: "mentor2",
//     mentorName: "Mr. John",
//     interviewerId: "interviewer2",
//     interviewerName: "Mrs. Mary",
//     interns: ["intern3", "intern4"],
//   },
// ];

// // Dummy current user
// const currentUser: User = {
//   id: "intern1",
//   role: "intern", // 'admin', 'mentor', 'interviewer', 'intern'
//   name: "Gopika Muruganantham",
// };

// const InteractionModule: React.FC = () => {
//   const [selectedBatch, setSelectedBatch] = useState<string>("");
//   const [visibleInteractions, setVisibleInteractions] = useState<Interaction[]>([]);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [newInteraction, setNewInteraction] = useState<Interaction>({
//     id: 0,
//     title: "",
//     date: "",
//     time: "",
//     mentorId: "",
//     mentorName: "",
//     interviewerId: "",
//     interviewerName: "",
//     interns: [],
//     batch: "",
//   });

//   useEffect(() => {
//     if (!selectedBatch) return;

//     // Filter interactions based on role and batch
//     let filtered = allInteractions.filter(
//       (i) => i.batch === selectedBatch || !i.batch
//     );

//     if (currentUser.role === "admin") {
//       setVisibleInteractions(filtered);
//     } else if (currentUser.role === "mentor") {
//       filtered = filtered.filter((i) => i.mentorId === currentUser.id);
//       setVisibleInteractions(filtered);
//     } else if (currentUser.role === "interviewer") {
//       filtered = filtered.filter((i) => i.interviewerId === currentUser.id);
//       setVisibleInteractions(filtered);
//     } else if (currentUser.role === "intern") {
//       filtered = filtered.filter((i) => i.interns.includes(currentUser.id));
//       setVisibleInteractions(filtered);
//     }
//   }, [selectedBatch]);

//   const handleSchedule = () => {
//     console.log("Scheduled Interaction:", newInteraction);
//     alert("Interaction scheduled! Notifications will be sent to participants.");
//     setShowModal(false);

//     setNewInteraction({
//       id: 0,
//       title: "",
//       date: "",
//       time: "",
//       mentorId: "",
//       mentorName: "",
//       interviewerId: "",
//       interviewerName: "",
//       interns: [],
//       batch: "",
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Interaction Module</h1>

//       {/* Batch Selection */}
//       <div className="mb-4">
//         <label className="mr-2 font-semibold">Select Batch:</label>
//         <select
//           className="border p-2 rounded"
//           value={selectedBatch}
//           onChange={(e) => setSelectedBatch(e.target.value)}
//         >
//           <option value="">-- Select Batch --</option>
//           {batches.map((b) => (
//             <option key={b} value={b}>
//               {b}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Schedule Interaction Button - Admin only */}
//       {currentUser.role === "admin" && (
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
//           onClick={() => setShowModal(true)}
//         >
//           Schedule Interaction
//         </button>
//       )}

//       {/* Interaction Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {visibleInteractions.map((i) => (
//           <div key={i.id} className="bg-white shadow rounded p-4">
//             <h3 className="text-lg font-bold">{i.title}</h3>
//             <p className="text-sm text-gray-600">Date: {i.date}</p>
//             <p className="text-sm text-gray-600">Time: {i.time}</p>
//             <p className="text-sm">Mentor: {i.mentorName}</p>
//             <p className="text-sm">Interviewer: {i.interviewerName}</p>
//             <p className="text-sm">Interns: {i.interns.join(", ")}</p>
//           </div>
//         ))}
//       </div>

//       {/* Schedule Interaction Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Schedule New Interaction</h2>
//             <input
//               type="text"
//               placeholder="Title"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.title}
//               onChange={(e) =>
//                 setNewInteraction({ ...newInteraction, title: e.target.value })
//               }
//             />
//             <input
//               type="date"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.date}
//               onChange={(e) =>
//                 setNewInteraction({ ...newInteraction, date: e.target.value })
//               }
//             />
//             <input
//               type="time"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.time}
//               onChange={(e) =>
//                 setNewInteraction({ ...newInteraction, time: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Mentor ID"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.mentorId}
//               onChange={(e) =>
//                 setNewInteraction({ ...newInteraction, mentorId: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Interviewer ID"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.interviewerId}
//               onChange={(e) =>
//                 setNewInteraction({
//                   ...newInteraction,
//                   interviewerId: e.target.value,
//                 })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Intern IDs (comma separated)"
//               className="border p-2 w-full mb-2 rounded"
//               value={newInteraction.interns.join(",")}
//               onChange={(e) =>
//                 setNewInteraction({
//                   ...newInteraction,
//                   interns: e.target.value.split(",").map((id) => id.trim()),
//                 })
//               }
//             />
//             <select
//               className="border p-2 w-full mb-4 rounded"
//               value={newInteraction.batch}
//               onChange={(e) =>
//                 setNewInteraction({ ...newInteraction, batch: e.target.value })
//               }
//             >
//               <option value="">-- Select Batch --</option>
//               {batches.map((b) => (
//                 <option key={b} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleSchedule}
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InteractionModule;






import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

// Types
type Role = "admin" | "mentor" | "interviewer" | "intern";

interface Interaction {
  id: number;
  title: string;
  date: string;
  time: string;
  mentorId: string;
  mentorName: string;
  interviewerId: string;
  interviewerName: string;
  interns: string[];
  batch?: string;
}

interface User {
  id: string;
  role: Role;
  name: string;
}

// Dummy data
const batches = ["Batch A", "Batch B"];

const allInteractions: Interaction[] = [
  {
    id: 1,
    title: "AI Project Discussion",
    date: "2025-12-05",
    time: "10:00 AM",
    mentorId: "mentor1",
    mentorName: "Dr. Smith",
    interviewerId: "interviewer1",
    interviewerName: "Ms. Jane",
    interns: ["intern1", "intern2"],
  },
  {
    id: 2,
    title: "Web Dev Workshop",
    date: "2025-12-06",
    time: "02:00 PM",
    mentorId: "mentor2",
    mentorName: "Mr. John",
    interviewerId: "interviewer2",
    interviewerName: "Mrs. Mary",
    interns: ["intern3", "intern4"],
  },
];

// Current user
const currentUser: User = {
  id: "intern1",
  role: "intern",
  name: "Gopika Muruganantham",
};

const InteractionModule: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [visibleInteractions, setVisibleInteractions] = useState<Interaction[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [newInteraction, setNewInteraction] = useState<Interaction>({
    id: 0,
    title: "",
    date: "",
    time: "",
    mentorId: "",
    mentorName: "",
    interviewerId: "",
    interviewerName: "",
    interns: [],
    batch: "",
  });

  // Filter interactions by role
  useEffect(() => {
    if (!selectedBatch) return;

    let filtered = allInteractions.filter(
      (i) => i.batch === selectedBatch || !i.batch
    );

    if (currentUser.role === "mentor") {
      filtered = filtered.filter((i) => i.mentorId === currentUser.id);
    } else if (currentUser.role === "interviewer") {
      filtered = filtered.filter((i) => i.interviewerId === currentUser.id);
    } else if (currentUser.role === "intern") {
      filtered = filtered.filter((i) => i.interns.includes(currentUser.id));
    }

    setVisibleInteractions(filtered);
  }, [selectedBatch]);

  const handleSchedule = () => {
    alert("Interaction scheduled (mock). Notifications will be sent!");
    setShowModal(false);

    setNewInteraction({
      id: 0,
      title: "",
      date: "",
      time: "",
      mentorId: "",
      mentorName: "",
      interviewerId: "",
      interviewerName: "",
      interns: [],
      batch: "",
    });
  };

  return (
    <div className="relative min-h-[80vh] p-6">

      {/* 🌊 Lagoon Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full blur-3xl opacity-40 top-10 left-5"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-[#96C2DB] rounded-full blur-3xl opacity-40 bottom-10 right-10"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* MAIN CONTENT CARD */}
      <div
        className="
          relative bg-white/60 backdrop-blur-2xl 
          border border-[#96C2DB]/40 shadow-xl 
          rounded-3xl p-8 z-10
        "
      >
        <h1 className="text-3xl font-extrabold text-[#1E2A35] mb-6">
          Interaction Module
        </h1>

        {/* Batch Selection */}
        <div className="mb-6">
          <label className="font-semibold text-[#1E2A35]">Select Batch:</label>
          <select
            className="
              ml-3 p-2 rounded-xl bg-white border border-[#96C2DB]/50
              text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB]
            "
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {batches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Schedule button */}
        {currentUser.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="
              mb-6 inline-flex items-center gap-2 px-4 py-3 bg-[#96C2DB] 
              text-[#08212d] font-semibold rounded-xl shadow-md 
              hover:bg-[#7DB3CE] transition-all
            "
          >
            <Plus size={18} /> Schedule Interaction
          </button>
        )}

        {/* Interactions List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleInteractions.map((i) => (
            <motion.div
              key={i.id}
              whileHover={{ scale: 1.02 }}
              className="
                bg-white/80 backdrop-blur-xl border border-[#96C2DB]/40 
                p-5 rounded-2xl shadow-md transition-all
              "
            >
              <h3 className="text-xl font-bold text-[#1E2A35]">{i.title}</h3>
              <p className="text-sm text-[#3A4750] mt-1">
                📅 {i.date} — ⏰ {i.time}
              </p>
              <p className="text-sm mt-2 text-[#1E2A35]">
                Mentor: <span className="font-semibold">{i.mentorName}</span>
              </p>
              <p className="text-sm text-[#1E2A35]">
                Interviewer: <span className="font-semibold">{i.interviewerName}</span>
              </p>
              <p className="text-sm text-[#3A4750] mt-2">
                Interns: {i.interns.join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 bg-black/40 backdrop-blur-sm 
              flex justify-center items-center z-50
            "
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="
                bg-white/80 backdrop-blur-xl 
                p-6 rounded-2xl shadow-xl w-full max-w-md 
                border border-[#96C2DB]/40
              "
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#1E2A35]">
                  Schedule Interaction
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#1E2A35] hover:text-red-500"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                {[
                  { key: "title", label: "Title" },
                  { key: "date", label: "Date", type: "date" },
                  { key: "time", label: "Time", type: "time" },
                  { key: "mentorId", label: "Mentor ID" },
                  { key: "interviewerId", label: "Interviewer ID" },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type || "text"}
                    placeholder={f.label}
                    className="
                      w-full p-3 rounded-xl bg-white border border-[#96C2DB]/40
                      focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35]
                    "
                    value={(newInteraction as any)[f.key]}
                    onChange={(e) =>
                      setNewInteraction({
                        ...newInteraction,
                        [f.key]: e.target.value,
                      })
                    }
                  />
                ))}

                <input
                  type="text"
                  placeholder="Intern IDs (comma separated)"
                  className="
                    w-full p-3 rounded-xl bg-white border border-[#96C2DB]/40
                    focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35]
                  "
                  value={newInteraction.interns.join(",")}
                  onChange={(e) =>
                    setNewInteraction({
                      ...newInteraction,
                      interns: e.target.value
                        .split(",")
                        .map((id) => id.trim()),
                    })
                  }
                />

                <select
                  className="
                    w-full p-3 rounded-xl bg-white border border-[#96C2DB]/40
                    focus:ring-2 focus:ring-[#96C2DB] outline-none text-[#1E2A35]
                  "
                  value={newInteraction.batch}
                  onChange={(e) =>
                    setNewInteraction({ ...newInteraction, batch: e.target.value })
                  }
                >
                  <option value="">Select Batch</option>
                  {batches.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="
                      px-4 py-2 rounded-xl bg-gray-400 text-white 
                      hover:bg-gray-500
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSchedule}
                    className="
                      px-4 py-2 rounded-xl bg-[#3B6E8F] text-white 
                      hover:bg-[#2c5670]
                    "
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractionModule;
