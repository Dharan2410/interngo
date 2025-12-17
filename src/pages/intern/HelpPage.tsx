



// // src/pages/intern/HelpDesk.tsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const mentorMock = [
//   { id: "m1", name: "Priya (Frontend Mentor)" },
//   { id: "m2", name: "Arun (Backend Mentor)" },
//   { id: "m3", name: "Divya (UI/UX Mentor)" },
// ];

// const HelpDesk: React.FC = () => {
//   const [tab, setTab] = useState<"new" | "your">("new");
//   const [subject, setSubject] = useState("");
//   const [priority, setPriority] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [mentor, setMentor] = useState("");
//   const [issue, setIssue] = useState("");
//   const [popup, setPopup] = useState("");


//   const [dropdown, setDropdown] = useState({
//   priority: false,
//   recipient: false,
//   mentor: false,
// });


//   const submitTicket = () => {
//     if (!subject || !priority || !recipient || (recipient === "Mentor" && !mentor) || !issue) {
//       setPopup("Please fill in all fields");
//       setTimeout(() => setPopup(""), 2000);
//       return;
//     }

//     setPopup("Help Request Sent Successfully!");
//     setTimeout(() => setPopup(""), 2000);

//     // reset
//     setSubject("");
//     setPriority("");
//     setRecipient("");
//     setMentor("");
//     setIssue("");
//   };

//   const inputClass =
//     "w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";

//   const cardClass =
//     "bg-white/80 border border-[#96C2DB]/40 shadow-xl rounded-3xl p-10 w-full max-w-3xl";

//   return (
//     <div className="w-full flex flex-col items-center">

//       <h1 className="text-4xl font-bold text-[#1E2A35] mb-8">
//         Help Desk
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-10">
//         {["new", "your"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t as any)}
//             className={`px-6 py-3 rounded-xl font-semibold transition ${
//               tab === t
//                 ? "bg-[#96C2DB] text-white shadow-lg"
//                 : "bg-white border border-[#96C2DB]/40 text-[#1E2A35] hover:bg-[#E5EDF1]"
//             }`}
//           >
//             {t === "new" ? "New Help Request" : "Your Help Requests"}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {tab === "new" ? (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cardClass}>
//           <label className="font-semibold">Subject</label>
//           <input className={inputClass} value={subject} onChange={(e) => setSubject(e.target.value)} />

//           <div className="relative mb-6">
//   <label className="font-semibold text-[#1E2A35]">Priority</label>

//   <div
//     className={`${inputClass} cursor-pointer relative`}
//     onClick={() =>
//       setDropdown({ priority: !dropdown.priority, recipient: false, mentor: false })
//     }
//   >
//     {priority || "Select Priority"}
//     <span className="absolute right-4 top-3 text-gray-600">▼</span>
//   </div>

//   {dropdown.priority && (
//     <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
//       {["High", "Medium", "Low"].map((p) => (
//         <div
//           key={p}
//           className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
//           onClick={() => {
//             setPriority(p);
//             setDropdown({ ...dropdown, priority: false });
//           }}
//         >
//           {p}
//         </div>
//       ))}
//     </div>
//   )}
// </div>

// <div className="relative mb-6">
//   <label className="font-semibold text-[#1E2A35]">Recipient</label>

//   <div
//     className={`${inputClass} cursor-pointer relative`}
//     onClick={() =>
//       setDropdown({ recipient: !dropdown.recipient, priority: false, mentor: false })
//     }
//   >
//     {recipient || "Select Recipient"}
//     <span className="absolute right-4 top-3 text-gray-600">▼</span>
//   </div>

//   {dropdown.recipient && (
//     <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
//       {["Admin", "Mentor"].map((r) => (
//         <div
//           key={r}
//           className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
//           onClick={() => {
//             setRecipient(r);
//             setMentor("");
//             setDropdown({ ...dropdown, recipient: false });
//           }}
//         >
//           {r}
//         </div>
//       ))}
//     </div>
//   )}
// </div>

            

//           {recipient === "Mentor" && (
//             <>
//               <label className="font-semibold">Select Mentor</label>
//               <select className={inputClass} value={mentor} onChange={(e) => setMentor(e.target.value)}>
//                 <option value="">Select Mentor</option>
//                 {mentorMock.map((m) => (
//                   <option key={m.id}>{m.name}</option>
//                 ))}
//               </select>
//             </>
//           )}

//           <label className="font-semibold">Your Issue</label>
//           <textarea className={`${inputClass} h-32`} value={issue} onChange={(e) => setIssue(e.target.value)} />

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             onClick={submitTicket}
//             className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold shadow-lg"
//           >
//             Submit Ticket
//           </motion.button>
//         </motion.div>
//       ) : (
//         <div className={`${cardClass} text-center text-lg`}>
//           No requests yet…
//         </div>
//       )}

//       {/* Popup */}
//       <AnimatePresence>
//   {popup && (
//     <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 100 }}
//       className="
//         fixed top-8 right-8
//         bg-[#3B6E8F] text-white
//         px-6 py-3 rounded-xl
//         shadow-lg z-[9999]
//       "
//     >
//       {popup}
//     </motion.div>
//   )}
// </AnimatePresence>

//     </div>
//   );
// };

// export default HelpDesk;





// src/pages/intern/HelpDesk.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mentorMock = [
  "Priya (Frontend Mentor)",
  "Arun (Backend Mentor)",
  "Divya (UI/UX Mentor)",
];

const HelpDesk: React.FC = () => {
  const [tab, setTab] = useState<"new" | "your">("new");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [recipient, setRecipient] = useState("");
  const [mentor, setMentor] = useState("");
  const [issue, setIssue] = useState("");
  const [popup, setPopup] = useState("");

  const [dropdown, setDropdown] = useState({
    priority: false,
    recipient: false,
    mentor: false,
  });

  const closeAllDropdowns = () =>
    setDropdown({ priority: false, recipient: false, mentor: false });

  const submitTicket = () => {
    if (
      !subject ||
      !priority ||
      !recipient ||
      (recipient === "Mentor" && !mentor) ||
      !issue
    ) {
      setPopup("Please fill in all fields");
      setTimeout(() => setPopup(""), 2000);
      return;
    }

    setPopup("Help Request Sent Successfully!");
    setTimeout(() => setPopup(""), 2000);

    // reset
    setSubject("");
    setPriority("");
    setRecipient("");
    setMentor("");
    setIssue("");
    closeAllDropdowns();
  };

  // const inputClass =
  //   "w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";
const inputBase =
  "w-full mt-2 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";

const inputWithMargin = inputBase + " mb-6";

  const cardClass =
    "bg-white/80 border border-[#96C2DB]/40 shadow-xl rounded-3xl p-10 w-full max-w-3xl";

  return (
    <div
      className="w-full flex flex-col items-center"
      onClick={closeAllDropdowns}
    >
      <h1 className="text-4xl font-bold text-[#1E2A35] mb-8">
        Help Desk
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        {["new", "your"].map((t) => (
          <button
            key={t}
            onClick={(e) => {
              e.stopPropagation();
              setTab(t as any);
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              tab === t
                ? "bg-[#96C2DB] text-white shadow-lg"
                : "bg-white border border-[#96C2DB]/40 text-[#1E2A35] hover:bg-[#E5EDF1]"
            }`}
          >
            {t === "new" ? "New Help Request" : "Your Help Requests"}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "new" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cardClass}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subject */}
          <label className="font-semibold">Subject</label>
          <input
            className={inputWithMargin}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* Priority */}
          <div className="relative mb-6">
            <label className="font-semibold">Priority</label>

            <div
              className={`${inputBase} cursor-pointer relative`}
              onClick={(e) => {
                e.stopPropagation();
                setDropdown({
                  priority: !dropdown.priority,
                  recipient: false,
                  mentor: false,
                });
              }}
            >
              {priority || "Select Priority"}
              <span className="absolute right-4 top-3 text-gray-600">▼</span>
            </div>

            {dropdown.priority && (
              <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
                {["High", "Medium", "Low"].map((p) => (
                  <div
                    key={p}
                    className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
                    onClick={() => {
                      setPriority(p);
                      closeAllDropdowns();
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recipient */}
          <div className="relative mb-6">
            <label className="font-semibold">Recipient</label>

            <div
              className={`${inputBase} cursor-pointer relative`}
              onClick={(e) => {
                e.stopPropagation();
                setDropdown({
                  recipient: !dropdown.recipient,
                  priority: false,
                  mentor: false,
                });
              }}
            >
              {recipient || "Select Recipient"}
              <span className="absolute right-4 top-3 text-gray-600">▼</span>
            </div>

            {dropdown.recipient && (
              <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
                {["Admin", "Mentor"].map((r) => (
                  <div
                    key={r}
                    className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
                    onClick={() => {
                      setRecipient(r);
                      setMentor("");
                      closeAllDropdowns();
                    }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mentor */}
          {recipient === "Mentor" && (
            <div className="relative mb-6">
              <label className="font-semibold">Select Mentor</label>

              <div
                className={`${inputBase} cursor-pointer relative`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdown({
                    mentor: !dropdown.mentor,
                    priority: false,
                    recipient: false,
                  });
                }}
              >
                {mentor || "Select Mentor"}
                <span className="absolute right-4 top-3 text-gray-600">▼</span>
              </div>

              {dropdown.mentor && (
                <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
                  {mentorMock.map((m) => (
                    <div
                      key={m}
                      className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
                      onClick={() => {
                        setMentor(m);
                        closeAllDropdowns();
                      }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Issue */}
          <label className="font-semibold">Your Issue</label>
          <textarea
            className={`${inputWithMargin} h-32`}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={submitTicket}
            className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold shadow-lg"
          >
            Submit Ticket
          </motion.button>
        </motion.div>
      ) : (
        <div className={`${cardClass} text-center text-lg`}>
          No requests yet…
        </div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="
              fixed top-8 right-8
              bg-[#3B6E8F] text-white
              px-6 py-3 rounded-xl
              shadow-lg z-[9999]
            "
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpDesk;
