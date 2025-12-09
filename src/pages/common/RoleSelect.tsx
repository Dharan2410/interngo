// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const RoleSelect: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSelect = (role: string) => {
//     if (role === "intern") {
//       navigate("intern/batch");
//     } else if (role === "mentor") {
//       navigate("mentor/list");
//     } else if (role === "interviewer") {
//       navigate("interviewer/list");
//     }
//   };

//   const roles = [
//     { label: "Intern", value: "intern" },
//     { label: "Mentor", value: "mentor" },
//     { label: "Interviewer", value: "interviewer" },
//   ];

//   return (
//     <>
//       {/* Background Soft Blobs */}
//       <motion.div
//         className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
//         mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
//         mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
//         animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <h2 className="text-3xl font-bold text-[#1E2A35] mb-6 relative z-10">
//         Select a <span className="text-[#3B6E8F]">Role</span>
//       </h2>

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
//         {roles.map((role) => (
//           <motion.div
//             key={role.value}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => handleSelect(role.value)}
//             className="
//               cursor-pointer bg-white/60 backdrop-blur-2xl 
//               border border-[#96C2DB]/40 rounded-3xl p-8 
//               shadow-xl hover:shadow-2xl transition-all text-center
//             "
//           >
//             <h3 className="text-xl font-bold text-[#1E2A35]">{role.label}</h3>
//           </motion.div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default RoleSelect;






import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, Users, Briefcase } from "lucide-react";

const RoleSelect: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goTo = (role: string) => {
    const base =
      user?.role === "admin"
        ? "/admin/resources"
        : user?.role === "mentor"
        ? "/mentor/resources"
        : "/interviewer/resources";

    if (role === "intern") navigate(`${base}/intern/years`);
    if (role === "mentor") navigate(`${base}/mentor/list`);
    if (role === "interviewer") navigate(`${base}/interviewer/list`);
  };

  return (
    <>
      {/* Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 60, 0], y: [0, 35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
        animate={{ x: [0, -60, 0], y: [0, -35, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 className="text-3xl font-bold text-[#1E2A35] mb-10 relative z-10">
        Select a <span className="text-[#3B6E8F]">Role</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">

        {/* Intern */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => goTo("intern")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-8 
            shadow-xl hover:shadow-2xl transition-all text-center
          "
        >
          <Users className="text-[#3B6E8F] mx-auto" size={40} />
          <h3 className="text-xl font-bold text-[#1E2A35] mt-3">Interns</h3>
          <p className="text-sm text-[#3A4750]">View all interns by batch/year</p>
        </motion.div>

        {/* Mentor */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => goTo("mentor")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-8 
            shadow-xl hover:shadow-2xl transition-all text-center
          "
        >
          <User className="text-[#3B6E8F] mx-auto" size={40} />
          <h3 className="text-xl font-bold text-[#1E2A35] mt-3">Mentors</h3>
          <p className="text-sm text-[#3A4750]">View all mentors</p>
        </motion.div>

        {/* Interviewer */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => goTo("interviewer")}
          className="
            cursor-pointer bg-white/60 backdrop-blur-2xl 
            border border-[#96C2DB]/40 rounded-3xl p-8 
            shadow-xl hover:shadow-2xl transition-all text-center
          "
        >
          <Briefcase className="text-[#3B6E8F] mx-auto" size={40} />
          <h3 className="text-xl font-bold text-[#1E2A35] mt-3">Interviewers</h3>
          <p className="text-sm text-[#3A4750]">View all interviewers</p>
        </motion.div>
      </div>
    </>
  );
};

export default RoleSelect;
