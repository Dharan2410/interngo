


// // src/pages/intern/HelpDesk.tsx
// import React, { useState,useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../../context/AuthContext";




// const HelpDesk: React.FC = () => {
//   const [tab, setTab] = useState<"new" | "your">("new");
//   const [subject, setSubject] = useState("");
//   const [priority, setPriority] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [mentor, setMentor] = useState("");
//   const [issue, setIssue] = useState("");
//   const [popup, setPopup] = useState("");
//   const [mentors, setMentors] = useState<any[]>([]);
// const { user } = useAuth();
// const [myTickets, setMyTickets] = useState<any[]>([]);

// useEffect(() => {
//   if (tab === "your" && user?.uid) {
//     fetch(`http://localhost:4000/helpTickets?fromUserId=${user.uid}`)
//       .then((r) => r.json())
//       .then(setMyTickets);
//   }
// }, [tab, user]);


//   useEffect(() => {
//   fetch("http://localhost:4000/users?role=mentor")
//     .then((res) => res.json())
//     .then(setMentors)
//     .catch(console.error);
// }, []);


//   const [dropdown, setDropdown] = useState({
//     priority: false,
//     recipient: false,
//     mentor: false,
//   });

//   const closeAllDropdowns = () =>
//     setDropdown({ priority: false, recipient: false, mentor: false });

//   const submitTicket = async () => {
//   if (
//     !subject ||
//     !priority ||
//     !recipient ||
//     (recipient === "Mentor" && !mentor) ||
//     !issue
//   ) {
//     setPopup("Please fill in all fields");
//     setTimeout(() => setPopup(""), 2000);
//     return;
//   }

//   const ticket = {
//     id: Date.now(),
//     fromUserId: user?.uid,
//     fromName: user?.name,
//     role: user?.role,
//     subject,
//     priority,
//     recipientRole: recipient,
//     recipientUserId: recipient === "Mentor" ? mentor : null,
//     message: issue,
//     status: "pending",
//     createdAt: new Date().toISOString(),
//   };

//   await fetch("http://localhost:4000/helpTickets", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(ticket),
//   });

//   setPopup("Help Request Sent Successfully!");
//   setTimeout(() => setPopup(""), 2000);

//   setSubject("");
//   setPriority("");
//   setRecipient("");
//   setMentor("");
//   setIssue("");
//   closeAllDropdowns();
// };

//   // const inputClass =
//   //   "w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";
// const inputBase =
//   "w-full mt-2 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";

// const inputWithMargin = inputBase + " mb-6";

//   const cardClass =
//     "bg-white/80 border border-[#96C2DB]/40 shadow-xl rounded-3xl p-10 w-full max-w-3xl";

//   return (
//     <div
//       className="w-full flex flex-col items-center"
//       onClick={closeAllDropdowns}
//     >
//       <h1 className="text-4xl font-bold text-[#1E2A35] mb-8">
//         Help Desk
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-10">
//         {["new", "your"].map((t) => (
//           <button
//             key={t}
//             onClick={(e) => {
//               e.stopPropagation();
//               setTab(t as any);
//             }}
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
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className={cardClass}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Subject */}
//           <label className="font-semibold">Subject</label>
//           <input
//             className={inputWithMargin}
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />

//           {/* Priority */}
//           <div className="relative mb-6">
//             <label className="font-semibold">Priority</label>

//             <div
//               className={`${inputBase} cursor-pointer relative`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setDropdown({
//                   priority: !dropdown.priority,
//                   recipient: false,
//                   mentor: false,
//                 });
//               }}
//             >
//               {priority || "Select Priority"}
//               <span className="absolute right-4 top-3 text-gray-600">▼</span>
//             </div>

//             {dropdown.priority && (
//               <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
//                 {["High", "Medium", "Low"].map((p) => (
//                   <div
//                     key={p}
//                     className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
//                     onClick={() => {
//                       setPriority(p);
//                       closeAllDropdowns();
//                     }}
//                   >
//                     {p}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Recipient */}
//           <div className="relative mb-6">
//             <label className="font-semibold">Recipient</label>

//             <div
//               className={`${inputBase} cursor-pointer relative`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setDropdown({
//                   recipient: !dropdown.recipient,
//                   priority: false,
//                   mentor: false,
//                 });
//               }}
//             >
//               {recipient || "Select Recipient"}
//               <span className="absolute right-4 top-3 text-gray-600">▼</span>
//             </div>

//             {dropdown.recipient && (
//               <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
//                 {["Admin", "Mentor"].map((r) => (
//                   <div
//                     key={r}
//                     className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
//                     onClick={() => {
//                       setRecipient(r);
//                       setMentor("");
//                       closeAllDropdowns();
//                     }}
//                   >
//                     {r}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Mentor */}
//           {recipient === "Mentor" && (
//             <div className="relative mb-6">
//               <label className="font-semibold">Select Mentor</label>

//               <div
//                 className={`${inputBase} cursor-pointer relative`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setDropdown({
//                     mentor: !dropdown.mentor,
//                     priority: false,
//                     recipient: false,
//                   });
//                 }}
//               >
//                 {mentor || "Select Mentor"}
//                 <span className="absolute right-4 top-3 text-gray-600">▼</span>
//               </div>

//               {dropdown.mentor && (
//                 <div className="absolute z-[9999] bg-white w-full rounded-xl shadow-xl mt-1">
//                   {mentors.map((m) => (
//   <div
//     key={m.uid}
//     className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
//     onClick={() => {
//       setMentor(m.uid);
//       closeAllDropdowns();
//     }}
//   >
//     {m.name}
//   </div>
// ))}

//                 </div>
//               )}
//             </div>
//           )}

//           {/* Issue */}
//           <label className="font-semibold">Your Issue</label>
//           <textarea
//             className={`${inputWithMargin} h-32`}
//             value={issue}
//             onChange={(e) => setIssue(e.target.value)}
//           />

//           {/* Submit */}
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
//         {popup && (
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="
//               fixed top-8 right-8
//               bg-[#3B6E8F] text-white
//               px-6 py-3 rounded-xl
//               shadow-lg z-[9999]
//             "
//           >
//             {popup}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HelpDesk;






// src/pages/intern/HelpDesk.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const HelpDesk: React.FC = () => {
  const [tab, setTab] = useState<"new" | "your">("new");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [recipient, setRecipient] = useState("");
  const [mentor, setMentor] = useState("");
  const [issue, setIssue] = useState("");
  const [popup, setPopup] = useState("");
  const [mentors, setMentors] = useState<any[]>([]);
  const [myTickets, setMyTickets] = useState<any[]>([]);
  const { user } = useAuth();

  // 🔹 Fetch MY tickets
 useEffect(() => {
  if (tab === "your" && user?.uid) {
    fetch(`http://localhost:4000/interngo/help-tickets/my/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMyTickets(data);
        } else {
          setMyTickets([]); // prevent crash
        }
      })
      .catch(() => setMyTickets([]));
  }
}, [tab, user]);


  // 🔹 Fetch mentors
  useEffect(() => {
    fetch("http://localhost:4000/interngo/users?role=mentor")
      .then((res) => res.json())
      .then(setMentors)
      .catch(console.error);
  }, []);

  const [dropdown, setDropdown] = useState({
    priority: false,
    recipient: false,
    mentor: false,
  });

  const closeAllDropdowns = () =>
    setDropdown({ priority: false, recipient: false, mentor: false });

  const submitTicket = async () => {
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

    const ticket = {
      id: Date.now(),
      fromUserId: user?.uid,
      fromName: user?.name,
      role: user?.role,
      subject,
      priority,
      recipientRole: recipient,
      recipientUserId: recipient === "Mentor" ? mentor : null,
      message: issue,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await fetch("http://localhost:4000/interngo/help-tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    setPopup("Help Request Sent Successfully!");
    setTimeout(() => setPopup(""), 2000);

    setSubject("");
    setPriority("");
    setRecipient("");
    setMentor("");
    setIssue("");
    closeAllDropdowns();
  };

  const inputBase =
    "w-full mt-2 p-4 rounded-xl bg-white border border-[#96C2DB]/40 text-[#1E2A35] focus:ring-2 focus:ring-[#96C2DB] outline-none";

  const inputWithMargin = inputBase + " mb-6";

  const cardClass =
    "bg-white/80 border border-[#96C2DB]/40 shadow-xl rounded-3xl p-10 w-full max-w-3xl";

  return (
    <div className="w-full flex flex-col items-center" onClick={closeAllDropdowns}>
      <h1 className="text-4xl font-bold text-[#1E2A35] mb-8">Help Desk</h1>

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

      {/* ================= NEW REQUEST ================= */}
      {tab === "new" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cardClass}
          onClick={(e) => e.stopPropagation()}
        >
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
                setDropdown({ priority: !dropdown.priority, recipient: false, mentor: false });
              }}
            >
              {priority || "Select Priority"}
              <span className="absolute right-4 top-3">▼</span>
            </div>
            {dropdown.priority && (
              <div className="absolute bg-white w-full rounded-xl shadow-xl mt-1 z-50">
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
                setDropdown({ recipient: !dropdown.recipient, priority: false, mentor: false });
              }}
            >
              {recipient || "Select Recipient"}
              <span className="absolute right-4 top-3">▼</span>
            </div>
            {dropdown.recipient && (
              <div className="absolute bg-white w-full rounded-xl shadow-xl mt-1 z-50">
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
                  setDropdown({ mentor: !dropdown.mentor, priority: false, recipient: false });
                }}
              >
                {mentor
                  ? mentors.find((m) => m.uid === mentor)?.name
                  : "Select Mentor"}
                <span className="absolute right-4 top-3">▼</span>
              </div>
              {dropdown.mentor && (
                <div className="absolute bg-white w-full rounded-xl shadow-xl mt-1 z-50">
                  {mentors.map((m) => (
                    <div
                      key={m.uid}
                      className="p-3 hover:bg-[#96C2DB]/40 cursor-pointer"
                      onClick={() => {
                        setMentor(m.uid);
                        closeAllDropdowns();
                      }}
                    >
                      {m.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <label className="font-semibold">Your Issue</label>
          <textarea
            className={`${inputWithMargin} h-32`}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={submitTicket}
            className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold shadow-lg"
          >
            Submit Ticket
          </motion.button>
        </motion.div>
      )}

      {/* ================= YOUR REQUESTS ================= */}
      {tab === "your" && (
        <div className={cardClass}>
          {myTickets.length === 0 ? (
            <div className="text-center text-gray-500">No requests yet…</div>
          ) : (
            <div className="space-y-4">
              {myTickets.map((t) => (
                <div key={t.id} className="border rounded-xl p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{t.subject}</h3>
                    <span className="text-xs font-bold uppercase text-yellow-700">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{t.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-8 right-8 bg-[#3B6E8F] text-white px-6 py-3 rounded-xl shadow-lg z-50"
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpDesk;
