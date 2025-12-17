



import React from "react";
import { motion } from "framer-motion";

interface InternProps {
  role: "intern" | "mentor" | "interviewer" | string;
  name: string;
  empId?: string;
  designation?: string;
  batch?: string;
  year?: string;
  status?: string;
  email?: string;
  primarySkill?: string;
  profilePicture?: string;
  userId?: string;
}

interface Props {
  intern: InternProps;
  onClick: () => void;
}

const InternCard: React.FC<Props> = ({ intern, onClick }) => {
  const placeholder = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const imageSrc =
    intern.profilePicture && intern.profilePicture.startsWith("data:image")
      ? intern.profilePicture
      : placeholder;

  const isIntern = (intern.role || "").toLowerCase() === "intern";

  const statusLower =
    typeof intern.status === "string" ? intern.status.toLowerCase() : "";

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="
        cursor-pointer relative bg-white/60 backdrop-blur-2xl 
        border border-[#96C2DB]/40 rounded-3xl p-6 w-full 
        shadow-xl hover:shadow-2xl transition-all focus:outline-none
      "
    >
      {/* Status badge only for interns */}
      {isIntern && intern.status && (
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-lg 
            ${
              statusLower === "active"
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
        >
          {intern.status}
        </span>
      )}

      <div className="flex flex-col items-center mt-2 text-center">
        <img
          src={imageSrc}
          alt={`${intern.name || "User"} avatar`}
          className="w-20 h-20 rounded-full mb-2 object-cover border border-[#96C2DB]"
        />

        {/* Intern detailed card */}
        {isIntern ? (
          <>
            <p className="text-sm text-[#3A4750] mb-1">
              Emp ID: {intern.empId || "Not Provided"}
            </p>

            <h3 className="text-lg font-semibold text-[#1E2A35]">
              {intern.name || "Unknown"}
            </h3>

            <p className="text-sm text-[#3A4750]">{intern.batch || intern.year || ""}</p>

            <p className="text-sm font-semibold text-[#3B6E8F] mt-1">
              {intern.designation || "—"}
            </p>
          </>
        ) : (
          /* Mentor / Interviewer simplified card */
          <>
            <h3 className="text-lg font-semibold text-[#1E2A35]">
              {intern.name || "Unknown"}
            </h3>

            {intern.email && (
              <p className="text-sm text-[#3A4750]">{intern.email}</p>
            )}

            <p className="text-sm font-semibold text-[#3B6E8F] mt-1">
              {intern.primarySkill || intern.designation || intern.role}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default InternCard;


