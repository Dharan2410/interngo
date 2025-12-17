import React, { useState } from "react";
import { motion,AnimatePresence} from "framer-motion";
import { Megaphone } from "lucide-react";

const AdminAnnouncements: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [popupMsg, setPopupMsg] = useState<string | null>(null);


//   const handlePublish = () => {
//   if (!title || !message) {
//     setPopupMsg("⚠️ Title and message are required");
//     setTimeout(() => setPopupMsg(null), 2500);
//     return;
//   }

//   // 🔌 API call later
//   console.log({
//     title,
//     message,
//     priority,
//     createdAt: new Date(),
//   });

//   setPopupMsg("✅ Announcement published successfully");
//   setTimeout(() => setPopupMsg(null), 2500);

//   setTitle("");
//   setMessage("");
//   setPriority("normal");
// };

const handlePublish = async () => {
  if (!title || !message) {
    setPopupMsg("⚠️ Title and message required");
    setTimeout(() => setPopupMsg(null), 2500);
    return;
  }

  await fetch("http://localhost:4000/interngo/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      message,
      priority,
    }),
  });

  setPopupMsg("✅ Announcement published");
  setTimeout(() => setPopupMsg(null), 2500);

  setTitle("");
  setMessage("");
  setPriority("normal");
};


  return (
    <>
      {/* 🌊 Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full blur-3xl opacity-40 bottom-10 right-10 -z-10"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* 📢 Announcement Card */}
      <div className="relative z-10 max-w-3xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-white/60 backdrop-blur-2xl
            border border-[#96C2DB]/40
            rounded-3xl p-8 shadow-xl
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="text-[#3B6E8F]" size={30} />
            <h2 className="text-2xl font-bold text-[#1E2A35]">
              Create Announcement
            </h2>
          </div>

          {/* TITLE */}
          <input
            className="w-full p-4 rounded-xl border border-[#96C2DB]/40 bg-white/70 mb-4
                       focus:ring-2 focus:ring-[#96C2DB] outline-none"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* MESSAGE */}
          <textarea
            rows={4}
            className="w-full p-4 rounded-xl border border-[#96C2DB]/40 bg-white/70 mb-4
                       focus:ring-2 focus:ring-[#96C2DB] outline-none"
            placeholder="Announcement message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* PRIORITY */}
          <select
            className="w-full p-3 rounded-xl border border-[#96C2DB]/40 bg-white/70 mb-6"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* PUBLISH */}
          <button
            onClick={handlePublish}
            className="
              w-full py-3 rounded-xl font-bold
              bg-[#3B6E8F] text-white
              hover:scale-105 hover:shadow-xl
              transition-all cursor-pointer
            "
          >
            Publish Announcement
          </button>
        </motion.div>
      </div>
      {/* 🔔 Popup Toast */}
<AnimatePresence>
  {popupMsg && (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="
        fixed top-8 right-8
        bg-[#3B6E8F] text-white
        px-6 py-3 rounded-xl
        shadow-2xl z-50
      "
    >
      {popupMsg}
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default AdminAnnouncements;
