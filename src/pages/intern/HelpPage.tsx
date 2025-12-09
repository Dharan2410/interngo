









// // // // // // // src/pages/intern/HelpDesk.tsx
// // // // // // import React, { useState } from "react";
// // // // // // import { motion } from "framer-motion";

// // // // // // const mentorMock = [
// // // // // //   { id: "m1", name: "Priya (Frontend Mentor)" },
// // // // // //   { id: "m2", name: "Arun (Backend Mentor)" },
// // // // // //   { id: "m3", name: "Divya (UI/UX Mentor)" },
// // // // // // ];

// // // // // // const myTicketsMock = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     subject: "Laptop Issue",
// // // // // //     description: "My VS Code keeps crashing",
// // // // // //     priority: "HIGH",
// // // // // //     recipient: "Mentor",
// // // // // //     status: "Pending",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     subject: "Access Request",
// // // // // //     description: "Need access to GitHub repo",
// // // // // //     priority: "MEDIUM",
// // // // // //     recipient: "Admin",
// // // // // //     status: "Resolved",
// // // // // //   },
// // // // // // ];

// // // // // // const HelpDesk: React.FC = () => {
// // // // // //   const [activeTab, setActiveTab] = useState<"new" | "my">("new");

// // // // // //   const [recipient, setRecipient] = useState("");
// // // // // //   const [selectedMentor, setSelectedMentor] = useState("");
// // // // // //   const [subject, setSubject] = useState("");
// // // // // //   const [priority, setPriority] = useState("");
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   const raiseHelp = () => {
// // // // // //     if (!recipient || !subject || !priority || !message)
// // // // // //       return alert("Please fill all fields");

// // // // // //     if (recipient === "Mentor" && !selectedMentor)
// // // // // //       return alert("Select mentor");

// // // // // //     alert("Help ticket submitted (mock)");
// // // // // //   };

// // // // // //   return (
// // // // // //     <div
// // // // // //       className="
// // // // // //         relative w-full min-h-[85vh]
// // // // // //         flex flex-col items-center
// // // // // //         overflow-hidden
// // // // // //         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
// // // // // //         p-6
// // // // // //       "
// // // // // //     >
// // // // // //       {/* Floating Blobs */}
// // // // // //       <motion.div
// // // // // //         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-20 left-10"
// // // // // //         animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
// // // // // //         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
// // // // // //       />
// // // // // //       <motion.div
// // // // // //         className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-20 right-10"
// // // // // //         animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
// // // // // //         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
// // // // // //       />

// // // // // //       {/* PAGE TITLE */}
// // // // // //       <h2 className="text-4xl font-bold text-[#1E2A35] z-20 mt-4">
// // // // // //         Help Page
// // // // // //       </h2>

// // // // // //       {/* TABS */}
// // // // // //       <div className="flex gap-4 mt-6 mb-8 z-20">
// // // // // //         <button
// // // // // //           onClick={() => setActiveTab("new")}
// // // // // //           className={`
// // // // // //             px-6 py-3 rounded-xl font-semibold text-lg shadow
// // // // // //             ${activeTab === "new"
// // // // // //               ? "bg-[#96C2DB] text-white"
// // // // // //               : "bg-white/70 text-[#1E2A35] hover:bg-white"}
// // // // // //           `}
// // // // // //         >
// // // // // //           New Help Request
// // // // // //         </button>

// // // // // //         <button
// // // // // //           onClick={() => setActiveTab("my")}
// // // // // //           className={`
// // // // // //             px-6 py-3 rounded-xl font-semibold text-lg shadow
// // // // // //             ${activeTab === "my"
// // // // // //               ? "bg-[#96C2DB] text-white"
// // // // // //               : "bg-white/70 text-[#1E2A35] hover:bg-white"}
// // // // // //           `}
// // // // // //         >
// // // // // //           Your Help Requests
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* CARD WRAPPER */}
// // // // // //       <div className="relative z-20 w-full flex justify-center">
// // // // // //         <motion.div
// // // // // //           initial={{ scale: 0.9, opacity: 0 }}
// // // // // //           animate={{ scale: 1, opacity: 1 }}
// // // // // //           transition={{ duration: 0.5 }}
// // // // // //           className="
// // // // // //             bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
// // // // // //             shadow-xl rounded-3xl p-10 w-full max-w-3xl
// // // // // //           "
// // // // // //         >
// // // // // //           {/* ------------------------ */}
// // // // // //           {/* TAB 1 — NEW HELP REQUEST */}
// // // // // //           {/* ------------------------ */}
// // // // // //           {activeTab === "new" && (
// // // // // //             <>
// // // // // //               {/* Subject */}
// // // // // //               <label className="font-semibold">Subject</label>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 className="
// // // // // //                   w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // // //                   text-[#1E2A35] mt-2 mb-6 focus:ring-2 focus:ring-[#96C2DB]
// // // // // //                 "
// // // // // //                 placeholder="Enter subject..."
// // // // // //                 value={subject}
// // // // // //                 onChange={(e) => setSubject(e.target.value)}
// // // // // //               />

// // // // // //               {/* Recipient */}
// // // // // //               <label className="font-semibold">Recipient</label>
// // // // // //               <select
// // // // // //                 className="
// // // // // //                   w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // // //                   text-[#1E2A35] mt-2 mb-6 focus:ring-2 focus:ring-[#96C2DB]
// // // // // //                 "
// // // // // //                 value={recipient}
// // // // // //                 onChange={(e) => {
// // // // // //                   setRecipient(e.target.value);
// // // // // //                   setSelectedMentor("");
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <option value="">Select</option>
// // // // // //                 <option value="Admin">Admin</option>
// // // // // //                 <option value="Mentor">Mentor</option>
// // // // // //               </select>

// // // // // //               {/* Mentor ONLY when Mentor selected */}
// // // // // //               {recipient === "Mentor" && (
// // // // // //                 <>
// // // // // //                   <label className="font-semibold">Select Mentor</label>
// // // // // //                   <select
// // // // // //                     className="
// // // // // //                       w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // // //                       text-[#1E2A35] mt-2 mb-6 focus:ring-2 focus:ring-[#96C2DB]
// // // // // //                     "
// // // // // //                     value={selectedMentor}
// // // // // //                     onChange={(e) => setSelectedMentor(e.target.value)}
// // // // // //                   >
// // // // // //                     <option value="">Select Mentor</option>
// // // // // //                     {mentorMock.map((m) => (
// // // // // //                       <option value={m.id} key={m.id}>
// // // // // //                         {m.name}
// // // // // //                       </option>
// // // // // //                     ))}
// // // // // //                   </select>
// // // // // //                 </>
// // // // // //               )}

// // // // // //               {/* Priority */}
// // // // // //               <label className="font-semibold">Priority</label>
// // // // // //               <select
// // // // // //                 className="
// // // // // //                   w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // // //                   text-[#1E2A35] mt-2 mb-6 focus:ring-2 focus:ring-[#96C2DB]
// // // // // //                 "
// // // // // //                 value={priority}
// // // // // //                 onChange={(e) => setPriority(e.target.value)}
// // // // // //               >
// // // // // //                 <option value="">Select Priority</option>
// // // // // //                 <option value="LOW">Low</option>
// // // // // //                 <option value="MEDIUM">Medium</option>
// // // // // //                 <option value="HIGH">High</option>
// // // // // //               </select>

// // // // // //               {/* Description */}
// // // // // //               <label className="font-semibold">Your Issue</label>
// // // // // //               <textarea
// // // // // //                 className="
// // // // // //                   w-full p-4 h-32 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // // //                   text-[#1E2A35] mt-2 focus:ring-2 focus:ring-[#96C2DB]
// // // // // //                 "
// // // // // //                 placeholder="Describe your issue…"
// // // // // //                 value={message}
// // // // // //                 onChange={(e) => setMessage(e.target.value)}
// // // // // //               />

// // // // // //               {/* Submit */}
// // // // // //               <motion.button
// // // // // //                 whileHover={{ scale: 1.03 }}
// // // // // //                 whileTap={{ scale: 0.97 }}
// // // // // //                 onClick={raiseHelp}
// // // // // //                 className="
// // // // // //                   w-full mt-6 py-4 bg-[#96C2DB] text-white rounded-xl
// // // // // //                   text-lg font-semibold hover:bg-[#7DB3CE]
// // // // // //                 "
// // // // // //               >
// // // // // //                 Submit Request
// // // // // //               </motion.button>
// // // // // //             </>
// // // // // //           )}

// // // // // //           {/* ------------------------ */}
// // // // // //           {/* TAB 2 — MY TICKETS LIST */}
// // // // // //           {/* ------------------------ */}
// // // // // //           {activeTab === "my" && (
// // // // // //             <div className="space-y-6">
// // // // // //               {myTicketsMock.map((t) => (
// // // // // //                 <div
// // // // // //                   key={t.id}
// // // // // //                   className="
// // // // // //                     bg-white/70 backdrop-blur-lg border border-[#96C2DB]/30
// // // // // //                     p-6 rounded-2xl shadow
// // // // // //                     flex justify-between items-start
// // // // // //                   "
// // // // // //                 >
// // // // // //                   <div>
// // // // // //                     <p className="font-bold text-lg">Subject: {t.subject}</p>
// // // // // //                     <p>Description: {t.description}</p>
// // // // // //                     <p>Recipient: {t.recipient}</p>
// // // // // //                   </div>

// // // // // //                   <div className="text-right">
// // // // // //                     <p
// // // // // //                       className={`px-4 py-1 rounded-full text-sm font-semibold
// // // // // //                         ${t.status === "Resolved" ? "bg-green-200 text-green-700" :
// // // // // //                           t.status === "Pending" ? "bg-red-200 text-red-700" :
// // // // // //                           "bg-gray-200 text-gray-700"}
// // // // // //                       `}
// // // // // //                     >
// // // // // //                       {t.status}
// // // // // //                     </p>

// // // // // //                     <p className="mt-3 font-bold text-[#1E2A35]">
// // // // // //                       Priority: {t.priority}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </motion.div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default HelpDesk;





// // // // // // src/pages/intern/HelpDesk.tsx
// // // // // import React, { useState } from "react";
// // // // // import { motion } from "framer-motion";

// // // // // const mentorMock = [
// // // // //   { id: "m1", name: "Priya (Frontend Mentor)" },
// // // // //   { id: "m2", name: "Arun (Backend Mentor)" },
// // // // //   { id: "m3", name: "Divya (UI/UX Mentor)" },
// // // // // ];

// // // // // // Temporary Mock DB (Will replace with backend later)
// // // // // let adminTicketDB: any[] = [];
// // // // // let mentorTicketDB: Record<string, any[]> = {
// // // // //   m1: [],
// // // // //   m2: [],
// // // // //   m3: [],
// // // // // };

// // // // // const HelpDesk: React.FC = () => {
// // // // //   const [activeTab, setActiveTab] = useState<"new" | "my">("new");

// // // // //   const [recipient, setRecipient] = useState("");
// // // // //   const [selectedMentor, setSelectedMentor] = useState("");
// // // // //   const [subject, setSubject] = useState("");
// // // // //   const [priority, setPriority] = useState("");
// // // // //   const [message, setMessage] = useState("");
// // // // //   const [myTickets, setMyTickets] = useState<any[]>([]);

// // // // //   const raiseHelp = () => {
// // // // //     if (!subject || !priority || !recipient || !message)
// // // // //       return alert("Please fill all fields");

// // // // //     if (recipient === "Mentor" && !selectedMentor)
// // // // //       return alert("Select a mentor");

// // // // //     // Construct new ticket
// // // // //     const newTicket = {
// // // // //       id: Date.now(),
// // // // //       subject,
// // // // //       description: message,
// // // // //       priority,
// // // // //       recipient,
// // // // //       mentor: selectedMentor || null,
// // // // //       status: "Pending",
// // // // //     };

// // // // //     // Save to intern's own list
// // // // //     setMyTickets((prev) => [...prev, newTicket]);

// // // // //     // Send to correct person
// // // // //     if (recipient === "Admin") {
// // // // //       adminTicketDB.push(newTicket);
// // // // //     } else {
// // // // //       mentorTicketDB[selectedMentor].push(newTicket);
// // // // //     }

// // // // //     // Reset form
// // // // //     setRecipient("");
// // // // //     setSelectedMentor("");
// // // // //     setSubject("");
// // // // //     setPriority("");
// // // // //     setMessage("");

// // // // //     // Switch to "Your Requests"
// // // // //     setActiveTab("my");

// // // // //     alert("Help Request Submitted Successfully!");
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="
// // // // //         relative w-full h-[calc(100vh-4rem)]
// // // // //         flex flex-col items-center justify-start
// // // // //         overflow-hidden
// // // // //         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
// // // // //         p-6
// // // // //       "
// // // // //     >
// // // // //       {/* BLOBS */}
// // // // //       <motion.div
// // // // //         className="absolute w-64 h-64 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-20 left-12"
// // // // //         animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
// // // // //         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
// // // // //       />

// // // // //       <motion.div
// // // // //         className="absolute w-64 h-64 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-20 right-12"
// // // // //         animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
// // // // //         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
// // // // //       />

// // // // //       {/* PAGE TITLE */}
// // // // //       <h2 className="text-4xl font-bold text-[#1E2A35] z-20 mt-4">
// // // // //         Help Page
// // // // //       </h2>

// // // // //       {/* TABS */}
// // // // //       <div className="flex gap-4 mt-6 z-20">
// // // // //         <button
// // // // //           onClick={() => setActiveTab("new")}
// // // // //           className={`
// // // // //             px-6 py-3 rounded-xl font-semibold text-lg shadow
// // // // //             ${activeTab === "new" ? "bg-[#96C2DB] text-white" : "bg-white/80"}
// // // // //           `}
// // // // //         >
// // // // //           New Help Request
// // // // //         </button>

// // // // //         <button
// // // // //           onClick={() => setActiveTab("my")}
// // // // //           className={`
// // // // //             px-6 py-3 rounded-xl font-semibold text-lg shadow
// // // // //             ${activeTab === "my" ? "bg-[#96C2DB] text-white" : "bg-white/80"}
// // // // //           `}
// // // // //         >
// // // // //           Your Help Requests
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* CARD */}
// // // // //       <motion.div
// // // // //         initial={{ scale: 0.9, opacity: 0 }}
// // // // //         animate={{ scale: 1, opacity: 1 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //         className="
// // // // //           bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 shadow-xl
// // // // //           rounded-3xl p-10 w-full max-w-3xl mt-8
// // // // //         "
// // // // //       >
// // // // //         {/* TAB – NEW REQUEST */}
// // // // //         {activeTab === "new" && (
// // // // //           <>
// // // // //             {/* Subject */}
// // // // //             <label className="font-semibold">Subject</label>
// // // // //             <input
// // // // //               type="text"
// // // // //               className="
// // // // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // //                 mt-2 mb-6 text-[#1E2A35]
// // // // //               "
// // // // //               value={subject}
// // // // //               onChange={(e) => setSubject(e.target.value)}
// // // // //               placeholder="Enter subject..."
// // // // //             />

// // // // //             {/* Priority */}
// // // // //             <label className="font-semibold">Priority</label>
// // // // //             <select
// // // // //               className="
// // // // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // //                 mt-2 mb-6 text-[#1E2A35]
// // // // //               "
// // // // //               value={priority}
// // // // //               onChange={(e) => setPriority(e.target.value)}
// // // // //             >
// // // // //               <option value="">Select Priority</option>
// // // // //               <option value="LOW">Low</option>
// // // // //               <option value="MEDIUM">Medium</option>
// // // // //               <option value="HIGH">High</option>
// // // // //             </select>

// // // // //             {/* Recipient */}
// // // // //             <label className="font-semibold">Recipient</label>
// // // // //             <select
// // // // //               className="
// // // // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // //                 mt-2 mb-6 text-[#1E2A35]
// // // // //               "
// // // // //               value={recipient}
// // // // //               onChange={(e) => {
// // // // //                 setRecipient(e.target.value);
// // // // //                 setSelectedMentor("");
// // // // //               }}
// // // // //             >
// // // // //               <option value="">Select</option>
// // // // //               <option value="Admin">Admin</option>
// // // // //               <option value="Mentor">Mentor</option>
// // // // //             </select>

// // // // //             {/* Mentor list when Mentor selected */}
// // // // //             {recipient === "Mentor" && (
// // // // //               <>
// // // // //                 <label className="font-semibold">Select Mentor</label>
// // // // //                 <select
// // // // //                   className="
// // // // //                     w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // //                     mt-2 mb-6 text-[#1E2A35]
// // // // //                   "
// // // // //                   value={selectedMentor}
// // // // //                   onChange={(e) => setSelectedMentor(e.target.value)}
// // // // //                 >
// // // // //                   <option value="">Select Mentor</option>
// // // // //                   {mentorMock.map((m) => (
// // // // //                     <option value={m.id} key={m.id}>
// // // // //                       {m.name}
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </>
// // // // //             )}

// // // // //             {/* Message */}
// // // // //             <label className="font-semibold">Your Issue</label>
// // // // //             <textarea
// // // // //               className="
// // // // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // // // //                 mt-2 h-32 text-[#1E2A35]
// // // // //               "
// // // // //               placeholder="Describe your issue..."
// // // // //               value={message}
// // // // //               onChange={(e) => setMessage(e.target.value)}
// // // // //             />

// // // // //             {/* Submit Button */}
// // // // //             <button
// // // // //               onClick={raiseHelp}
// // // // //               className="
// // // // //                 w-full mt-6 py-4 bg-[#96C2DB] text-white rounded-xl
// // // // //                 text-lg font-semibold hover:bg-[#7DB3CE]
// // // // //               "
// // // // //             >
// // // // //               Submit Request
// // // // //             </button>
// // // // //           </>
// // // // //         )}

// // // // //         {/* TAB – MY REQUESTS */}
// // // // //         {activeTab === "my" && (
// // // // //           <div className="space-y-6">
// // // // //             {myTickets.length === 0 && (
// // // // //               <p className="text-center text-lg text-gray-600">
// // // // //                 No help requests yet.
// // // // //               </p>
// // // // //             )}

// // // // //             {myTickets.map((t) => (
// // // // //               <div
// // // // //                 key={t.id}
// // // // //                 className="
// // // // //                   bg-white/70 backdrop-blur-lg border border-[#96C2DB]/30
// // // // //                   p-6 rounded-2xl shadow flex justify-between
// // // // //                 "
// // // // //               >
// // // // //                 <div>
// // // // //                   <p className="font-bold text-lg">Subject: {t.subject}</p>
// // // // //                   <p>Description: {t.description}</p>
// // // // //                   <p>Recipient: {t.recipient}</p>
// // // // //                 </div>

// // // // //                 <div className="text-right">
// // // // //                   <p
// // // // //                     className={`px-4 py-1 rounded-full text-sm font-semibold ${
// // // // //                       t.status === "Pending"
// // // // //                         ? "bg-red-200 text-red-700"
// // // // //                         : "bg-green-200 text-green-700"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {t.status}
// // // // //                   </p>
// // // // //                   <p className="mt-2 font-bold">Priority: {t.priority}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HelpDesk;



// // // // // src/pages/intern/HelpDesk.tsx
// // // // import React, { useState } from "react";
// // // // import { motion } from "framer-motion";

// // // // const mentorMock = [
// // // //   { id: "m1", name: "Priya (Frontend Mentor)" },
// // // //   { id: "m2", name: "Arun (Backend Mentor)" },
// // // //   { id: "m3", name: "Divya (UI/UX Mentor)" },
// // // // ];

// // // // const HelpDesk: React.FC = () => {
// // // //   const [tab, setTab] = useState<"new" | "my">("new");
// // // //   const [recipient, setRecipient] = useState("");
// // // //   const [mentor, setMentor] = useState("");
// // // //   const [subject, setSubject] = useState("");
// // // //   const [priority, setPriority] = useState("");
// // // //   const [message, setMessage] = useState("");

// // // //   const [myTickets, setMyTickets] = useState<any[]>([]);

// // // //   const raiseTicket = () => {
// // // //     if (!subject) return alert("Enter subject");
// // // //     if (!priority) return alert("Select priority");
// // // //     if (!recipient) return alert("Select recipient");
// // // //     if (recipient === "Mentor" && !mentor)
// // // //       return alert("Select mentor");
// // // //     if (!message) return alert("Enter issue");

// // // //     const newTicket = {
// // // //       id: Date.now(),
// // // //       subject,
// // // //       priority,
// // // //       recipient,
// // // //       mentor: mentor || null,
// // // //       message,
// // // //       status: "Pending",
// // // //     };

// // // //     setMyTickets([newTicket, ...myTickets]);
// // // //     alert("Ticket submitted!");

// // // //     // reset
// // // //     setSubject("");
// // // //     setPriority("");
// // // //     setRecipient("");
// // // //     setMentor("");
// // // //     setMessage("");

// // // //     setTab("my");
// // // //   };

// // // //   return (
// // // //   <div className="relative w-full h-[calc(100vh-64px)] bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB] overflow-hidden">

// // // //     {/* BLOBS FIXED */}
// // // //     <motion.div
// // // //       className="fixed w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-32 left-20"
// // // //       animate={{ x: [0, 100, 0], y: [0, 40, 0] }}
// // // //       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
// // // //     />

// // // //     <motion.div
// // // //       className="fixed w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-20 right-20"
// // // //       animate={{ x: [0, -100, 0], y: [0, -40, 0] }}
// // // //       transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
// // // //     />

// // // //     {/* ===== FIXED HEADER (NEVER SCROLLS) ===== */}
// // // //     <div className="relative z-20 w-full flex flex-col items-center py-6">
// // // //       <h1 className="text-4xl font-bold text-[#1E2A35] mb-6">
// // // //         Help Page
// // // //       </h1>

// // // //       {/* TABS */}
// // // //       <div className="flex gap-4 mb-4">
// // // //         <button
// // // //           onClick={() => setTab("new")}
// // // //           className={`px-6 py-3 rounded-xl font-semibold transition ${
// // // //             tab === "new"
// // // //               ? "bg-[#96C2DB] text-white shadow-md"
// // // //               : "bg-white/70 border border-[#96C2DB]/40 text-[#1E2A35]"
// // // //           }`}
// // // //         >
// // // //           New Help Request
// // // //         </button>

// // // //         <button
// // // //           onClick={() => setTab("my")}
// // // //           className={`px-6 py-3 rounded-xl font-semibold transition ${
// // // //             tab === "my"
// // // //               ? "bg-[#96C2DB] text-white shadow-md"
// // // //               : "bg-white/70 border border-[#96C2DB]/40 text-[#1E2A35]"
// // // //           }`}
// // // //         >
// // // //           Your Help Requests
// // // //         </button>
// // // //       </div>
// // // //     </div>

// // // //     {/* ===== SCROLLABLE CONTENT ONLY ===== */}
// // // //     <div
// // // //       className="
// // // //         relative z-20 w-full flex flex-col items-center
// // // //         h-[calc(100vh-230px)]
// // // //         overflow-y-auto no-scrollbar px-4 pb-10
// // // //       "
// // // //     >
// // // //       {/* NEW HELP REQUEST FORM */}
// // // //       {tab === "new" && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           className="
// // // //             bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
// // // //             shadow-xl rounded-3xl p-10 w-full max-w-2xl mb-10
// // // //           "
// // // //         >
// // // //           {/* ------------------ FORM CONTENT ------------------ */}
// // // //           {/* Subject */}
// // // //           <label className="font-semibold">Subject</label>
// // // //           <input
// // // //             type="text"
// // // //             value={subject}
// // // //             onChange={(e) => setSubject(e.target.value)}
// // // //             placeholder="Enter subject..."
// // // //             className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// // // //           />

// // // //           {/* Priority */}
// // // //           <label className="font-semibold">Priority</label>
// // // //           <select
// // // //             value={priority}
// // // //             onChange={(e) => setPriority(e.target.value)}
// // // //             className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// // // //           >
// // // //             <option value="">Select Priority</option>
// // // //             <option value="LOW">Low</option>
// // // //             <option value="MEDIUM">Medium</option>
// // // //             <option value="HIGH">High</option>
// // // //           </select>

// // // //           {/* Recipient */}
// // // //           <label className="font-semibold">Recipient</label>
// // // //           <select
// // // //             value={recipient}
// // // //             onChange={(e) => {
// // // //               setRecipient(e.target.value);
// // // //               setMentor("");
// // // //             }}
// // // //             className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// // // //           >
// // // //             <option value="">Select</option>
// // // //             <option value="Admin">Admin</option>
// // // //             <option value="Mentor">Mentor</option>
// // // //           </select>

// // // //           {/* Mentor */}
// // // //           {recipient === "Mentor" && (
// // // //             <>
// // // //               <label className="font-semibold">Select Mentor</label>
// // // //               <select
// // // //                 value={mentor}
// // // //                 onChange={(e) => setMentor(e.target.value)}
// // // //                 className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// // // //               >
// // // //                 <option value="">Select Mentor</option>
// // // //                 {mentorMock.map((m) => (
// // // //                   <option key={m.id} value={m.id}>
// // // //                     {m.name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </>
// // // //           )}

// // // //           {/* Message */}
// // // //           <label className="font-semibold">Your Issue</label>
// // // //           <textarea
// // // //             value={message}
// // // //             onChange={(e) => setMessage(e.target.value)}
// // // //             placeholder="Describe your issue..."
// // // //             className="w-full p-4 h-32 bg-white border border-[#96C2DB]/50 rounded-xl mt-2"
// // // //           ></textarea>

// // // //           {/* Submit button */}
// // // //           <button
// // // //             onClick={raiseTicket}
// // // //             className="w-full mt-6 py-4 bg-[#96C2DB] text-white rounded-xl text-lg font-semibold hover:bg-[#7DB3CE]"
// // // //           >
// // // //             Submit Ticket
// // // //           </button>
// // // //         </motion.div>
// // // //       )}

// // // //       {/* MY HELP REQUESTS */}
// // // //       {tab === "my" && (
// // // //         <div className="w-full max-w-3xl space-y-6 pb-10">
// // // //           {myTickets.length === 0 ? (
// // // //             <p className="text-center text-[#1E2A35] text-lg">
// // // //               No help requests yet.
// // // //             </p>
// // // //           ) : (
// // // //             myTickets.map((t) => (
// // // //               <motion.div
// // // //                 key={t.id}
// // // //                 initial={{ opacity: 0, y: 20 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 className="
// // // //                   bg-white/60 backdrop-blur-xl border border-[#96C2DB]/40
// // // //                   shadow rounded-2xl p-6
// // // //                 "
// // // //               >
// // // //                 <h3 className="font-bold text-xl mb-2 text-[#1E2A35]">
// // // //                   {t.subject}
// // // //                 </h3>

// // // //                 <p className="text-gray-700">Recipient: {t.recipient}</p>

// // // //                 {t.mentor && (
// // // //                   <p className="text-gray-700">Mentor: {t.mentor}</p>
// // // //                 )}

// // // //                 <p className="text-gray-700 mt-2">{t.message}</p>

// // // //                 <p className="mt-3 font-semibold">
// // // //                   Priority: <span className="text-blue-700">{t.priority}</span>
// // // //                 </p>

// // // //                 <p className="mt-1">
// // // //                   Status:{" "}
// // // //                   <span
// // // //                     className={
// // // //                       t.status === "Pending"
// // // //                         ? "text-red-600"
// // // //                         : "text-green-600"
// // // //                     }
// // // //                   >
// // // //                     {t.status}
// // // //                   </span>
// // // //                 </p>
// // // //               </motion.div>
// // // //             ))
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   </div>
// // // // );

// // // // };

// // // // export default HelpDesk;






// // // // src/pages/intern/HelpDesk.tsx
// // // import React, { useState } from "react";
// // // import { motion } from "framer-motion";

// // // const mentorMock = [
// // //   { id: "m1", name: "Priya (Frontend Mentor)" },
// // //   { id: "m2", name: "Arun (Backend Mentor)" },
// // //   { id: "m3", name: "Divya (UI/UX Mentor)" },
// // // ];

// // // const HelpDesk: React.FC = () => {
// // //   const [tab, setTab] = useState("new");
// // //   const [subject, setSubject] = useState("");
// // //   const [priority, setPriority] = useState("");
// // //   const [recipient, setRecipient] = useState("");
// // //   const [mentor, setMentor] = useState("");
// // //   const [message, setMessage] = useState("");

// // //   const [toast, setToast] = useState(false);

// // //   const raiseTicket = () => {
// // //     if (!subject) return alert("Enter a subject");
// // //     if (!priority) return alert("Select priority");
// // //     if (!recipient) return alert("Select recipient");
// // //     if (recipient === "Mentor" && !mentor)
// // //       return alert("Select a mentor");

// // //     setToast(true);
// // //     setTimeout(() => setToast(false), 3000);

// // //     // RESET FORM
// // //     setSubject("");
// // //     setPriority("");
// // //     setRecipient("");
// // //     setMentor("");
// // //     setMessage("");
// // //   };

// // //   return (
// // //     <div
// // //       className="
// // //         relative w-full h-[calc(100vh-64px)] 
// // //         overflow-y-auto no-scrollbar 
// // //         bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
// // //         px-4 py-10
// // //       "
// // //     >
// // //       {/* BLOBS */}
// // //       <motion.div
// // //         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-40 left-32"
// // //         animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
// // //         transition={{ duration: 11, repeat: Infinity }}
// // //       />
// // //       <motion.div
// // //         className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-40 right-32"
// // //         animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
// // //         transition={{ duration: 12, repeat: Infinity }}
// // //       />

// // //       {/* PAGE CONTENT (SCROLLS AS ONE FULL PAGE) */}
// // //       <div className="relative z-20 w-full max-w-3xl mx-auto">

// // //         {/* PAGE TITLE */}
// // //         <h1 className="text-4xl font-bold text-center text-[#1E2A35] mb-6">
// // //           Help Page
// // //         </h1>

// // //         {/* TABS */}
// // //         <div className="flex justify-center gap-4 mb-8">
// // //           <button
// // //             onClick={() => setTab("new")}
// // //             className={`px-6 py-3 rounded-xl font-semibold transition ${
// // //               tab === "new"
// // //                 ? "bg-[#96C2DB] text-white shadow-md"
// // //                 : "bg-white/70 border text-[#1E2A35]"
// // //             }`}
// // //           >
// // //             New Help Request
// // //           </button>

// // //           <button
// // //             onClick={() => setTab("my")}
// // //             className={`px-6 py-3 rounded-xl font-semibold transition ${
// // //               tab === "my"
// // //                 ? "bg-[#96C2DB] text-white shadow-md"
// // //                 : "bg-white/70 border text-[#1E2A35]"
// // //             }`}
// // //           >
// // //             Your Help Requests
// // //           </button>
// // //         </div>

// // //         {/* FORM / TICKET LIST */}
// // //         {tab === "new" && (
// // //           <motion.div
// // //             initial={{ scale: 0.95, opacity: 0 }}
// // //             animate={{ scale: 1, opacity: 1 }}
// // //             className="
// // //               bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
// // //               shadow-xl rounded-3xl p-10 mb-20
// // //             "
// // //           >
// // //             {/* SUBJECT */}
// // //             <label className="font-semibold">Subject</label>
// // //             <input
// // //               value={subject}
// // //               onChange={(e) => setSubject(e.target.value)}
// // //               placeholder="Enter subject…"
// // //               className="
// // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl
// // //                 mt-2 mb-6
// // //               "
// // //             />

// // //             {/* PRIORITY */}
// // //             <label className="font-semibold">Priority</label>
// // //             <select
// // //               value={priority}
// // //               onChange={(e) => setPriority(e.target.value)}
// // //               className="
// // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl 
// // //                 mt-2 mb-6
// // //               "
// // //             >
// // //               <option value="">Select Priority</option>
// // //               <option value="Low">Low</option>
// // //               <option value="Medium">Medium</option>
// // //               <option value="High">High</option>
// // //             </select>

// // //             {/* RECIPIENT */}
// // //             <label className="font-semibold">Recipient</label>
// // //             <select
// // //               value={recipient}
// // //               onChange={(e) => {
// // //                 setRecipient(e.target.value);
// // //                 setMentor("");
// // //               }}
// // //               className="
// // //                 w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl 
// // //                 mt-2 mb-6
// // //               "
// // //             >
// // //               <option value="">Select</option>
// // //               <option value="Admin">Admin</option>
// // //               <option value="Mentor">Mentor</option>
// // //             </select>

// // //             {recipient === "Mentor" && (
// // //               <>
// // //                 <label className="font-semibold">Select Mentor</label>
// // //                 <select
// // //                   value={mentor}
// // //                   onChange={(e) => setMentor(e.target.value)}
// // //                   className="
// // //                     w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl 
// // //                     mt-2 mb-6
// // //                   "
// // //                 >
// // //                   <option value="">Select Mentor</option>
// // //                   {mentorMock.map((m) => (
// // //                     <option key={m.id} value={m.id}>
// // //                       {m.name}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </>
// // //             )}

// // //             {/* MESSAGE */}
// // //             <label className="font-semibold">Your Issue</label>
// // //             <textarea
// // //               value={message}
// // //               onChange={(e) => setMessage(e.target.value)}
// // //               placeholder="Describe your issue..."
// // //               className="
// // //                 w-full p-4 h-32 bg-white border border-[#96C2DB]/50 rounded-xl
// // //                 mt-2
// // //               "
// // //             ></textarea>

// // //             {/* SUBMIT */}
// // //             <button
// // //               onClick={raiseTicket}
// // //               className="
// // //                 w-full mt-6 py-4 bg-[#96C2DB] text-white rounded-xl text-lg 
// // //                 font-semibold hover:bg-[#7DB3CE]
// // //               "
// // //             >
// // //               Submit Ticket
// // //             </button>
// // //           </motion.div>
// // //         )}

// // //         {/* EMPTY LIST FOR NOW */}
// // //         {tab === "my" && (
// // //           <p className="text-center text-xl text-[#1E2A35] py-20">
// // //             No help requests yet.
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* TOAST → TOP RIGHT */}
// // //       {toast && (
// // //         <motion.div
// // //           initial={{ x: 200, opacity: 0 }}
// // //           animate={{ x: 0, opacity: 1 }}
// // //           exit={{ x: 200, opacity: 0 }}
// // //           className="
// // //             fixed top-6 right-6 z-50 
// // //             bg-white/60 backdrop-blur-xl border border-[#96C2DB]/50 
// // //             shadow-xl px-6 py-4 rounded-2xl text-[#1E2A35]
// // //           "
// // //         >
// // //           Help Request Sent Successfully 🎉
// // //         </motion.div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default HelpDesk;





// // // src/pages/intern/HelpDesk.tsx
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";

// // const mentorMock = [
// //   { id: "m1", name: "Priya (Frontend Mentor)" },
// //   { id: "m2", name: "Arun (Backend Mentor)" },
// //   { id: "m3", name: "Divya (UI/UX Mentor)" },
// // ];

// // const HelpDesk: React.FC = () => {
// //   const [tab, setTab] = useState("new");

// //   const [subject, setSubject] = useState("");
// //   const [priority, setPriority] = useState("");
// //   const [recipient, setRecipient] = useState("");
// //   const [mentor, setMentor] = useState("");
// //   const [issue, setIssue] = useState("");

// //   const [tickets, setTickets] = useState<any[]>([]);

// //   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(
// //     null
// //   );

// //   const showToast = (msg: string, type: "success" | "error") => {
// //     setToast({ message: msg, type });
// //     setTimeout(() => setToast(null), 2500);
// //   };

// //   const handleSubmit = () => {
// //     if (!subject || !priority || !recipient || (recipient === "Mentor" && !mentor) || !issue) {
// //       showToast("Please fill all fields", "error");
// //       return;
// //     }

// //     const newTicket = {
// //       id: Date.now(),
// //       subject,
// //       priority,
// //       recipient,
// //       mentor,
// //       issue,
// //       status: "Pending",
// //     };

// //     setTickets((prev) => [...prev, newTicket]);

// //     showToast("Help Request Sent Successfully 🎉", "success");

// //     // Reset form
// //     setSubject("");
// //     setPriority("");
// //     setRecipient("");
// //     setMentor("");
// //     setIssue("");

// //     setTab("my");
// //   };

// //   return (
// //     <div
// //       className="
// //       relative w-full h-[calc(100vh-64px)]
// //       overflow-y-auto no-scrollbar
// //       bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]
// //       p-6
// //       "
// //     >
// //       {/* BLOBS */}
// //       <motion.div
// //         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-60 top-40 left-32"
// //         animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
// //         transition={{ duration: 11, repeat: Infinity }}
// //       />
// //       <motion.div
// //         className="absolute w-72 h-72 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-60 bottom-40 right-32"
// //         animate={{ x: [0, -120, 0], y: [0, -60, 0] }}
// //         transition={{ duration: 12, repeat: Infinity }}
// //       />

// //       {/* MAIN CONTENT */}
// //       <div className="relative z-20 w-full max-w-3xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-[#1E2A35] mb-6">
// //           Help Page
// //         </h1>

// //         {/* TABS */}
// //         <div className="flex justify-center gap-4 mb-10">
// //           <button
// //             onClick={() => setTab("new")}
// //             className={`px-6 py-3 rounded-xl font-semibold transition ${
// //               tab === "new"
// //                 ? "bg-[#96C2DB] text-white shadow-md"
// //                 : "bg-white/70 border text-[#1E2A35]"
// //             }`}
// //           >
// //             New Help Request
// //           </button>

// //           <button
// //             onClick={() => setTab("my")}
// //             className={`px-6 py-3 rounded-xl font-semibold transition ${
// //               tab === "my"
// //                 ? "bg-[#96C2DB] text-white shadow-md"
// //                 : "bg-white/70 border text-[#1E2A35]"
// //             }`}
// //           >
// //             Your Help Requests
// //           </button>
// //         </div>

// //         {/* NEW TICKET FORM */}
// //         {tab === "new" && (
// //           <motion.div
// //             initial={{ scale: 0.95, opacity: 0 }}
// //             animate={{ scale: 1, opacity: 1 }}
// //             className="
// //               bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40
// //               shadow-xl rounded-3xl p-10 mb-20
// //             "
// //           >
// //             <label className="font-semibold">Subject</label>
// //             <input
// //               className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// //               value={subject}
// //               onChange={(e) => setSubject(e.target.value)}
// //             />

// //             <label className="font-semibold">Priority</label>
// //             <select
// //               className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// //               value={priority}
// //               onChange={(e) => setPriority(e.target.value)}
// //             >
// //               <option value="">Select Priority</option>
// //               <option value="Low">Low</option>
// //               <option value="Medium">Medium</option>
// //               <option value="High">High</option>
// //             </select>

// //             <label className="font-semibold">Recipient</label>
// //             <select
// //               className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// //               value={recipient}
// //               onChange={(e) => {
// //                 setRecipient(e.target.value);
// //                 setMentor("");
// //               }}
// //             >
// //               <option value="">Select Recipient</option>
// //               <option value="Admin">Admin</option>
// //               <option value="Mentor">Mentor</option>
// //             </select>

// //             {recipient === "Mentor" && (
// //               <>
// //                 <label className="font-semibold">Select Mentor</label>
// //                 <select
// //                   className="w-full p-4 bg-white border border-[#96C2DB]/50 rounded-xl mt-2 mb-6"
// //                   value={mentor}
// //                   onChange={(e) => setMentor(e.target.value)}
// //                 >
// //                   <option value="">Select Mentor</option>
// //                   {mentorMock.map((m) => (
// //                     <option key={m.id} value={m.id}>
// //                       {m.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </>
// //             )}

// //             <label className="font-semibold">Your Issue</label>
// //             <textarea
// //               className="w-full p-4 h-32 bg-white border border-[#96C2DB]/50 rounded-xl mt-2"
// //               value={issue}
// //               onChange={(e) => setIssue(e.target.value)}
// //             />

// //             <button
// //               onClick={handleSubmit}
// //               className="
// //                 w-full mt-6 py-4 bg-[#96C2DB] text-white rounded-xl text-lg 
// //                 font-semibold hover:bg-[#7DB3CE]
// //               "
// //             >
// //               Submit Ticket
// //             </button>
// //           </motion.div>
// //         )}

// //         {/* YOUR REQUESTS */}
// //         {tab === "my" && (
// //           <div className="space-y-6 mb-20">
// //             {tickets.length === 0 ? (
// //               <p className="text-center text-xl text-[#1E2A35]">No requests yet</p>
// //             ) : (
// //               tickets.map((t) => (
// //                 <motion.div
// //                   key={t.id}
// //                   initial={{ opacity: 0, y: 30 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   className="
// //                     bg-white/50 backdrop-blur-xl border border-[#96C2DB]/30 
// //                     shadow-lg rounded-2xl p-6
// //                   "
// //                 >
// //                   <h3 className="font-bold text-lg">Subject: {t.subject}</h3>
// //                   <p>Description: {t.issue}</p>
// //                   <p>Recipient: {t.recipient}</p>

// //                   <p className="font-semibold">Priority: {t.priority}</p>

// //                   <span
// //                     className={`inline-block mt-3 px-4 py-1 rounded-full text-sm text-white ${
// //                       t.status === "Pending" ? "bg-red-500" : "bg-green-500"
// //                     }`}
// //                   >
// //                     {t.status}
// //                   </span>
// //                 </motion.div>
// //               ))
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* TOAST NOTIFICATIONS */}
// //       {toast && (
// //         <motion.div
// //           initial={{ x: 200, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           exit={{ x: 200, opacity: 0 }}
// //           className={`
// //             fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl
// //             backdrop-blur-xl border 
// //             ${
// //               toast.type === "success"
// //                 ? "bg-green-200/60 border-green-400 text-green-900"
// //                 : "bg-red-200/60 border-red-400 text-red-900"
// //             }
// //         `}
// //         >
// //           {toast.message}
// //         </motion.div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HelpDesk;





// // src/pages/intern/HelpDesk.tsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const mentorMock = [
//   { id: "m1", name: "Priya (Frontend Mentor)" },
//   { id: "m2", name: "Arun (Backend Mentor)" },
//   { id: "m3", name: "Divya (UI/UX Mentor)" },
// ];

// const HelpDesk: React.FC = () => {
//   const [tab, setTab] = useState("new");
//   const [subject, setSubject] = useState("");
//   const [priority, setPriority] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [mentor, setMentor] = useState("");
//   const [issue, setIssue] = useState("");

//   const [popup, setPopup] = useState("");

//   const submitTicket = () => {
//     if (!subject || !priority || !recipient || (recipient === "Mentor" && !mentor) || !issue) {
//       setPopup("Please fill in all fields");
//       setTimeout(() => setPopup(""), 2000);
//       return;
//     }

//     setPopup("Help Request Sent Successfully!");
//     setTimeout(() => setPopup(""), 2000);
//   };

//   return (
//     <div
//       className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br 
//       from-white via-[#E5EDF1] to-[#96C2DB] pb-20"
//     >
//       {/* Hide scrollbar */}
//       <style>
//         {`
//           ::-webkit-scrollbar { width: 0px; background: transparent; }
//         `}
//       </style>

//       {/* Floating Popup */}
//       {popup && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-[9999]"
//         >
//           {popup}
//         </motion.div>
//       )}

//       {/* Blobs */}
//       <motion.div
//         className="absolute w-80 h-80 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-50 top-1/4 left-20"
//         animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-50 bottom-10 right-20"
//         animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Content Wrapper — scrolls UNDER navbar */}
//       <div className="pt-28 flex flex-col items-center z-20 relative">

//         <h1 className="text-4xl font-bold text-[#1E2A35] mb-6">Help Page</h1>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-8">
//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "new"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("new")}
//           >
//             New Help Request
//           </button>

//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "your"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("your")}
//           >
//             Your Help Requests
//           </button>
//         </div>

//         {/* New Help Request */}
//         {tab === "new" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//             shadow-xl rounded-3xl p-10 w-full max-w-3xl"
//           >
//             {/* Subject */}
//             <label className="font-semibold">Subject</label>
//             <input
//               type="text"
//               placeholder="Enter subject…"
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//             />

//             {/* Priority */}
//             <label className="font-semibold">Priority</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="">Select Priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>

//             {/* Recipient */}
//             <label className="font-semibold">Recipient</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={recipient}
//               onChange={(e) => {
//                 setRecipient(e.target.value);
//                 setMentor("");
//               }}
//             >
//               <option value="">Select Recipient</option>
//               <option value="Admin">Admin</option>
//               <option value="Mentor">Mentor</option>
//             </select>

//             {/* Mentor Select */}
//             {recipient === "Mentor" && (
//               <>
//                 <label className="font-semibold">Select Mentor</label>
//                 <select
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//                   value={mentor}
//                   onChange={(e) => setMentor(e.target.value)}
//                 >
//                   <option value="">Select Mentor</option>
//                   {mentorMock.map((m) => (
//                     <option key={m.id} value={m.name}>
//                       {m.name}
//                     </option>
//                   ))}
//                 </select>
//               </>
//             )}

//             {/* Issue */}
//             <label className="font-semibold">Your Issue</label>
//             <textarea
//               className="w-full mt-2 mb-6 p-4 h-32 rounded-xl bg-white border border-[#96C2DB]/50"
//               placeholder="Describe your issue…"
//               value={issue}
//               onChange={(e) => setIssue(e.target.value)}
//             />

//             {/* Submit */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={submitTicket}
//               className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold"
//             >
//               Submit Ticket
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Your Help Requests */}
//         {tab === "your" && (
//           <div className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//           shadow-xl rounded-3xl p-8 w-full max-w-3xl text-center text-xl text-[#1E2A35]">
//             No requests yet…
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpDesk;






// // src/pages/intern/HelpDesk.tsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const mentorMock = [
//   { id: "m1", name: "Priya (Frontend Mentor)" },
//   { id: "m2", name: "Arun (Backend Mentor)" },
//   { id: "m3", name: "Divya (UI/UX Mentor)" },
// ];

// const HelpDesk: React.FC = () => {
//   const [tab, setTab] = useState("new");
//   const [subject, setSubject] = useState("");
//   const [priority, setPriority] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [mentor, setMentor] = useState("");
//   const [issue, setIssue] = useState("");

//   const [popup, setPopup] = useState("");

//   const submitTicket = () => {
//     if (
//       !subject ||
//       !priority ||
//       !recipient ||
//       (recipient === "Mentor" && !mentor) ||
//       !issue
//     ) {
//       setPopup("Please fill in all fields");
//       setTimeout(() => setPopup(""), 2000);
//       return;
//     }

//     setPopup("Help Request Sent Successfully!");
//     setTimeout(() => setPopup(""), 2000);
//   };

//   return (
//     <div
//       className="min-h-screen w-full relative bg-gradient-to-br 
//       from-white via-[#E5EDF1] to-[#96C2DB] pb-20 pt-24 overflow-y-auto"
//     >
//       {/* Hide scrollbar */}
//       <style>
//         {`
//           ::-webkit-scrollbar { width: 0px; background: transparent; }
//         `}
//       </style>

//       {/* Floating Popup */}
//       {popup && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-[9999]"
//         >
//           {popup}
//         </motion.div>
//       )}

//       {/* Blobs */}
//       <motion.div
//         className="absolute w-80 h-80 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-50 top-1/4 left-20"
//         animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-50 bottom-10 right-20"
//         animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Content Wrapper */}
//       <div className="flex flex-col items-center z-20 relative">

//         <h1 className="text-4xl font-bold text-[#1E2A35] mb-6 mt-4">Help Page</h1>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-8">
//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "new"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("new")}
//           >
//             New Help Request
//           </button>

//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "your"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("your")}
//           >
//             Your Help Requests
//           </button>
//         </div>

//         {/* New Help Request */}
//         {tab === "new" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//             shadow-xl rounded-3xl p-10 w-full max-w-3xl"
//           >
//             {/* Subject */}
//             <label className="font-semibold">Subject</label>
//             <input
//               type="text"
//               placeholder="Enter subject…"
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//             />

//             {/* Priority */}
//             <label className="font-semibold">Priority</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="">Select Priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>

//             {/* Recipient */}
//             <label className="font-semibold">Recipient</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={recipient}
//               onChange={(e) => {
//                 setRecipient(e.target.value);
//                 setMentor("");
//               }}
//             >
//               <option value="">Select Recipient</option>
//               <option value="Admin">Admin</option>
//               <option value="Mentor">Mentor</option>
//             </select>

//             {/* Mentor Select */}
//             {recipient === "Mentor" && (
//               <>
//                 <label className="font-semibold">Select Mentor</label>
//                 <select
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//                   value={mentor}
//                   onChange={(e) => setMentor(e.target.value)}
//                 >
//                   <option value="">Select Mentor</option>
//                   {mentorMock.map((m) => (
//                     <option key={m.id} value={m.name}>
//                       {m.name}
//                     </option>
//                   ))}
//                 </select>
//               </>
//             )}

//             {/* Issue */}
//             <label className="font-semibold">Your Issue</label>
//             <textarea
//               className="w-full mt-2 mb-6 p-4 h-32 rounded-xl bg-white border border-[#96C2DB]/50"
//               placeholder="Describe your issue…"
//               value={issue}
//               onChange={(e) => setIssue(e.target.value)}
//             />

//             {/* Submit */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={submitTicket}
//               className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold"
//             >
//               Submit Ticket
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Your Help Requests */}
//         {tab === "your" && (
//           <div
//             className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//           shadow-xl rounded-3xl p-8 w-full max-w-3xl text-center text-xl text-[#1E2A35]"
//           >
//             No requests yet…
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpDesk;






// // src/pages/intern/HelpDesk.tsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const mentorMock = [
//   { id: "m1", name: "Priya (Frontend Mentor)" },
//   { id: "m2", name: "Arun (Backend Mentor)" },
//   { id: "m3", name: "Divya (UI/UX Mentor)" },
// ];

// const HelpDesk: React.FC = () => {
//   const [tab, setTab] = useState("new");
//   const [subject, setSubject] = useState("");
//   const [priority, setPriority] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [mentor, setMentor] = useState("");
//   const [issue, setIssue] = useState("");

//   const [popup, setPopup] = useState("");

//   const submitTicket = () => {
//     if (!subject || !priority || !recipient || (recipient === "Mentor" && !mentor) || !issue) {
//       setPopup("Please fill in all fields");
//       setTimeout(() => setPopup(""), 2000);
//       return;
//     }

//     setPopup("Help Request Sent Successfully!");
//     setTimeout(() => setPopup(""), 2000);
//   };

//   return (
//     <div
//       className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br 
//       from-white via-[#E5EDF1] to-[#96C2DB] pb-20"
//     >
//       {/* Hide scrollbar */}
//       <style>
//         {`
//           ::-webkit-scrollbar { width: 0px; background: transparent; }
//         `}
//       </style>

//       {/* Floating Popup */}
//       {popup && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-[9999]"
//         >
//           {popup}
//         </motion.div>
//       )}

//       {/* Blobs */}
//       <motion.div
//         className="absolute w-80 h-80 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-2xl opacity-50 top-1/4 left-20"
//         animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#A4C7DF] rounded-full mix-blend-multiply blur-2xl opacity-50 bottom-10 right-20"
//         animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Content Wrapper — scrolls UNDER navbar */}
//       <div className="pt-28 flex flex-col items-center z-20 relative">

//         <h1 className="text-4xl font-bold text-[#1E2A35] mb-6">Help Page</h1>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-8">
//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "new"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("new")}
//           >
//             New Help Request
//           </button>

//           <button
//             className={`px-6 py-3 rounded-xl font-semibold ${
//               tab === "your"
//                 ? "bg-[#96C2DB] text-white"
//                 : "bg-white text-[#1E2A35]"
//             }`}
//             onClick={() => setTab("your")}
//           >
//             Your Help Requests
//           </button>
//         </div>

//         {/* New Help Request */}
//         {tab === "new" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//             shadow-xl rounded-3xl p-10 w-full max-w-3xl"
//           >
//             {/* Subject */}
//             <label className="font-semibold">Subject</label>
//             <input
//               type="text"
//               placeholder="Enter subject…"
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//             />

//             {/* Priority */}
//             <label className="font-semibold">Priority</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="">Select Priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>

//             {/* Recipient */}
//             <label className="font-semibold">Recipient</label>
//             <select
//               className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//               value={recipient}
//               onChange={(e) => {
//                 setRecipient(e.target.value);
//                 setMentor("");
//               }}
//             >
//               <option value="">Select Recipient</option>
//               <option value="Admin">Admin</option>
//               <option value="Mentor">Mentor</option>
//             </select>

//             {/* Mentor Select */}
//             {recipient === "Mentor" && (
//               <>
//                 <label className="font-semibold">Select Mentor</label>
//                 <select
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-white border border-[#96C2DB]/50"
//                   value={mentor}
//                   onChange={(e) => setMentor(e.target.value)}
//                 >
//                   <option value="">Select Mentor</option>
//                   {mentorMock.map((m) => (
//                     <option key={m.id} value={m.name}>
//                       {m.name}
//                     </option>
//                   ))}
//                 </select>
//               </>
//             )}

//             {/* Issue */}
//             <label className="font-semibold">Your Issue</label>
//             <textarea
//               className="w-full mt-2 mb-6 p-4 h-32 rounded-xl bg-white border border-[#96C2DB]/50"
//               placeholder="Describe your issue…"
//               value={issue}
//               onChange={(e) => setIssue(e.target.value)}
//             />

//             {/* Submit */}
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={submitTicket}
//               className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold"
//             >
//               Submit Ticket
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Your Help Requests */}
//         {tab === "your" && (
//           <div className="bg-white/40 backdrop-blur-2xl border border-[#96C2DB]/40 
//           shadow-xl rounded-3xl p-8 w-full max-w-3xl text-center text-xl text-[#1E2A35]">
//             No requests yet…
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HelpDesk;






// src/pages/intern/HelpDesk.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const mentorMock = [
  { id: "m1", name: "Priya (Frontend Mentor)" },
  { id: "m2", name: "Arun (Backend Mentor)" },
  { id: "m3", name: "Divya (UI/UX Mentor)" },
];

const HelpDesk: React.FC = () => {
  const [tab, setTab] = useState("new");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [recipient, setRecipient] = useState("");
  const [mentor, setMentor] = useState("");
  const [issue, setIssue] = useState("");
  const [popup, setPopup] = useState("");

  const submitTicket = () => {
    if (!subject || !priority || !recipient || (recipient === "Mentor" && !mentor) || !issue) {
      setPopup("Please fill in all fields");
      setTimeout(() => setPopup(""), 2000);
      return;
    }

    setPopup("Help Request Sent Successfully!");
    setTimeout(() => setPopup(""), 2000);
  };

  // Input style (Lagoon)
  const inputClass =
    "w-full mt-2 mb-6 p-4 rounded-xl bg-white/20 border border-[#96C2DB]/40 text-[#1E2A35] backdrop-blur-md focus:ring-2 focus:ring-[#96C2DB] outline-none";

  const cardClass =
    "bg-white/30 backdrop-blur-2xl border border-[#96C2DB]/40 shadow-xl rounded-3xl p-10 w-full max-w-3xl";

  return (
    <div className="min-h-screen w-full relative overflow-hidden pb-20 bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB]">

      {/* Hide scrollbar */}
      <style>{`::-webkit-scrollbar { width: 0px; background: transparent; }`}</style>

      {/* Popup */}
   
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 80, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.25 }}
            className="
              fixed top-6 right-4 sm:right-10
              px-4 py-3 rounded-xl shadow-lg z-50
              bg-[#96C2DB] text-white text-sm
            "
          >
            {popup}
          </motion.div>
        )}
      
      

      {/* Soft Blobs (Dashboard style) */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full mix-blend-multiply blur-3xl opacity-40 top-24 left-10 -z-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Content Wrapper under dashboard navbar */}
      <div className="pt-28 flex flex-col items-center z-20 relative w-[95%] mx-auto">

        <h1 className="text-4xl font-bold text-[#1E2A35] mb-8">Help Desk</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setTab("new")}
            className={`px-6 py-3 rounded-xl font-semibold transition cursor-pointer ${
              tab === "new"
                ? "bg-[#96C2DB] text-white shadow-lg"
                : "bg-white/30 backdrop-blur-md border border-[#96C2DB]/40 text-[#1E2A35] hover:bg-white/50"
            }`}
          >
            New Help Request
          </button>

          <button
            onClick={() => setTab("your")}
            className={`px-6 py-3 rounded-xl font-semibold transition cursor-pointer ${
              tab === "your"
                ? "bg-[#96C2DB] text-white shadow-lg"
                : "bg-white/30 backdrop-blur-md border border-[#96C2DB]/40 text-[#1E2A35] hover:bg-white/50"
            }`}
          >
            Your Help Requests
          </button>
        </div>

        {/* --- New Help Request --- */}
        {tab === "new" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardClass}
          >
            {/* Subject */}
            <label className="font-semibold text-[#1E2A35]">Subject</label>
            <input
              className={inputClass}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject..."
            />

            {/* Priority */}
            <label className="font-semibold text-[#1E2A35]">Priority</label>
            <select
              className={inputClass}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            {/* Recipient */}
            <label className="font-semibold text-[#1E2A35]">Recipient</label>
            <select
              className={inputClass}
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setMentor("");
              }}
            >
              <option value="">Select Recipient</option>
              <option value="Admin">Admin</option>
              <option value="Mentor">Mentor</option>
            </select>

            {/* Mentor Dropdown */}
            {recipient === "Mentor" && (
              <>
                <label className="font-semibold text-[#1E2A35]">Select Mentor</label>
                <select
                  className={inputClass}
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                >
                  <option value="">Select Mentor</option>
                  {mentorMock.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Issue */}
            <label className="font-semibold text-[#1E2A35]">Your Issue</label>
            <textarea
              className={`${inputClass} h-32`}
              value={issue}
              placeholder="Describe your issue..."
              onChange={(e) => setIssue(e.target.value)}
            />

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={submitTicket}
              className="w-full py-4 bg-[#96C2DB] text-white rounded-xl font-semibold shadow-lg cursor-pointer"
            >
              Submit Ticket
            </motion.button>
          </motion.div>
        )}

        {/* --- Your tickets --- */}
        {tab === "your" && (
          <div
            className={`${cardClass} text-center text-xl text-[#1E2A35] flex items-center justify-center`}
          >
            No requests yet…
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpDesk;
