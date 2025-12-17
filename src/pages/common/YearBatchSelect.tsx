import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ChevronLeft } from "lucide-react";

const BASE = "http://localhost:4000";

interface YearGroup {
  year: string;
  batches: string[];
}

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-]/g, "");

const YearBatchSelect: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [groups, setGroups] = useState<YearGroup[]>([]);

  useEffect(() => {
  fetch(`${BASE}/users`)
    .then((res) => res.json())
    .then((data) => {
     const yearMap: Record<string, Map<string, string>> = {};

data
  .filter((u: any) => u.role === "intern")
  .forEach((item: any) => {
    const year = String(item.year || "").trim();
    const rawBatch = String(item.batch || "").trim();

    if (!year || !rawBatch) return;

    const normalized = normalizeBatch(rawBatch);

    if (!yearMap[year]) yearMap[year] = new Map();

    if (!yearMap[year].has(normalized)) {
      // Standard display format → Batch-1, Batch-2
      const batchNumber = rawBatch.replace(/[^0-9]/g, "");
      const displayBatch = batchNumber
        ? `Batch-${batchNumber}`
        : rawBatch;

      yearMap[year].set(normalized, displayBatch);
    }
  });

const grouped = Object.keys(yearMap)
.sort((a, b) => parseInt(b) - parseInt(a))
.map((year) => ({
  year,
  batches: Array.from(yearMap[year].values()),
}));

setGroups(grouped);

    });
}, []);

  const handleBatchClick = (year: string, batch: string) => {
    if (user?.role === "admin")
      navigate(`/admin/resources/intern/list/${year}/${batch}`);
    else if (user?.role === "mentor")
      navigate(`/mentor/resources/intern/list/${year}/${batch}`);
    else if (user?.role === "interviewer")
      navigate(`/interviewer/resources/intern/list/${year}/${batch}`);
  };
  const goBack = () => {
  navigate("/admin/resources");
  }

  return (
    <>
      {/* Background Blobs */}
      <motion.div className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10" />

      <motion.div className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10" />
        <button
        onClick={goBack}
        className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <h2 className="text-3xl font-bold text-[#1E2A35] mb-10 relative z-10">
        Select <span className="text-[#3B6E8F]">Year & Batch</span>
      </h2>

      <div className="space-y-16 relative z-10 w-full">
        {groups.map((group) => (
          <div key={group.year} className="space-y-6">

            {/* YEAR LABEL */}
            <div className="flex items-center justify-center my-4">
              <div className="flex items-center w-full max-w-xl">
                <div className="flex-grow border-t border-[#96C2DB]/40"></div>

                <div className="
                 bg-[#96C2DB]/50
                  border border-[#96C2DB]/50 
                  rounded-2xl shadow-sm 
                  px-48 py-2 text-center 
                  hover:shadow-md transition-all duration-300
                ">
                  <h3 className="text-xl font-bold text-[#1E2A35]">
                    {group.year}
                  </h3>
                </div>

                <div className="flex-grow border-t border-[#96C2DB]/40"></div>
              </div>
            </div>

            {/* BATCH CARDS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {group.batches.map((batch) => (
                <motion.div
                  key={batch}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleBatchClick(group.year, batch)}
                  className="cursor-pointer bg-white/70 backdrop-blur-2xl 
                  border border-[#96C2DB]/40 rounded-3xl p-6 shadow-md
                  hover:shadow-xl transition-all text-center"
                >
                  <p className="text-sm text-[#3A4750]">Batch</p>
                  <h3 className="text-xl font-bold text-[#1E2A35]">{batch}</h3>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
        {/* ALL INTERNS CARD */}
{/* ALL INTERNS + NOT ASSIGNED */}
<div className="flex justify-center gap-6 mb-10 relative z-10 px-4">

  {/* VIEW ALL INTERNS */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={() => {
      if (user?.role === "admin")
        navigate(`/admin/resources/intern/list/all/all`);
      else if (user?.role === "mentor")
        navigate(`/mentor/resources/intern/list/all/all`);
      else if (user?.role === "interviewer")
        navigate(`/interviewer/resources/intern/list/all/all`);
    }}
    className="
      cursor-pointer bg-white/80 backdrop-blur-2xl 
      border border-[#96C2DB]/50 rounded-3xl 
      p-8 w-full max-w-md text-center shadow-lg 
      hover:shadow-2xl transition-all
    "
  >
    <h3 className="text-2xl font-bold text-[#1E2A35]">
      View All Interns
    </h3>
  </motion.div>

  {/* NOT ASSIGNED CARD */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={() => {
      if (user?.role === "admin")
        navigate(`/admin/resources/intern/list/not-assigned/all`);
      else if (user?.role === "mentor")
        navigate(`/mentor/resources/intern/list/not-assigned/all`);
      else if (user?.role === "interviewer")
        navigate(`/interviewer/resources/intern/list/not-assigned/all`);
    }}
    className="
      cursor-pointer bg-white/80 backdrop-blur-2xl 
      border border-[#96C2DB]/50 rounded-3xl 
      p-8 w-full max-w-md text-center shadow-lg 
      hover:shadow-2xl transition-all
    "
  >
    <h3 className="text-2xl font-bold text-[#1E2A35]">
      Not Assigned
    </h3>
    <p className="text-sm text-[#3A4750] mt-1">
      Interns without batch/year
    </p>
  </motion.div>

</div>
      </div>
    </>
  );
};

export default YearBatchSelect;






// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { ChevronLeft } from "lucide-react";
// import YearBatchSelector from "../../components/YearBatchSelector";

// const BASE = "http://localhost:4000";

// interface YearGroup {
//   year: string;
//   batches: string[];
// }

// const normalizeBatch = (batch: string) =>
//   batch.toLowerCase().replace(/[\s-]/g, "");

// const YearBatchSelect: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [groups, setGroups] = useState<YearGroup[]>([]);

//   useEffect(() => {
//   fetch(`${BASE}/users`)
//     .then((res) => res.json())
//     .then((data) => {
//      const yearMap: Record<string, Map<string, string>> = {};

// data
//   .filter((u: any) => u.role === "intern")
//   .forEach((item: any) => {
//     const year = String(item.year || "").trim();
//     const rawBatch = String(item.batch || "").trim();

//     if (!year || !rawBatch) return;

//     const normalized = normalizeBatch(rawBatch);

//     if (!yearMap[year]) yearMap[year] = new Map();

//     if (!yearMap[year].has(normalized)) {
//       // Standard display format → Batch-1, Batch-2
//       const batchNumber = rawBatch.replace(/[^0-9]/g, "");
//       const displayBatch = batchNumber
//         ? `Batch-${batchNumber}`
//         : rawBatch;

//       yearMap[year].set(normalized, displayBatch);
//     }
//   });

// const grouped = Object.keys(yearMap).map((year) => ({
//   year,
//   batches: Array.from(yearMap[year].values()),
// }));

// setGroups(grouped);

//     });
// }, []);

//   const handleBatchClick = (year: string, batch: string) => {
//     if (user?.role === "admin")
//       navigate(`/admin/resources/intern/list/${year}/${batch}`);
//     else if (user?.role === "mentor")
//       navigate(`/mentor/resources/intern/list/${year}/${batch}`);
//     else if (user?.role === "interviewer")
//       navigate(`/interviewer/resources/intern/list/${year}/${batch}`);
//   };
//   const goBack = () => {
//   navigate("/admin/resources");
//   }

//   return (
//     <>
//       {/* Background Blobs */}
//       <motion.div className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
//         mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10" />

//       <motion.div className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
//         mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10" />
//         <button
//         onClick={goBack}
//         className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
//       >
//         <ChevronLeft size={20} /> Back
//       </button>

//       <h2 className="text-3xl font-bold text-[#1E2A35] mb-10 relative z-10">
//         Select <span className="text-[#3B6E8F]">Year & Batch</span>
//       </h2>

//      <YearBatchSelector
//   onSelect={(year, batch) => handleBatchClick(year, batch)}
// />

//         {/* ALL INTERNS CARD */}
// {/* ALL INTERNS + NOT ASSIGNED */}
// <div className="flex justify-center gap-6 mb-10 relative z-10 px-4">

//   {/* VIEW ALL INTERNS */}
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     onClick={() => {
//       if (user?.role === "admin")
//         navigate(`/admin/resources/intern/list/all/all`);
//       else if (user?.role === "mentor")
//         navigate(`/mentor/resources/intern/list/all/all`);
//       else if (user?.role === "interviewer")
//         navigate(`/interviewer/resources/intern/list/all/all`);
//     }}
//     className="
//       cursor-pointer bg-white/80 backdrop-blur-2xl 
//       border border-[#96C2DB]/50 rounded-3xl 
//       p-8 w-full max-w-md text-center shadow-lg 
//       hover:shadow-2xl transition-all
//     "
//   >
//     <h3 className="text-2xl font-bold text-[#1E2A35]">
//       View All Interns
//     </h3>
//   </motion.div>

//   {/* NOT ASSIGNED CARD */}
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     onClick={() => {
//       if (user?.role === "admin")
//         navigate(`/admin/resources/intern/list/not-assigned/all`);
//       else if (user?.role === "mentor")
//         navigate(`/mentor/resources/intern/list/not-assigned/all`);
//       else if (user?.role === "interviewer")
//         navigate(`/interviewer/resources/intern/list/not-assigned/all`);
//     }}
//     className="
//       cursor-pointer bg-white/80 backdrop-blur-2xl 
//       border border-[#96C2DB]/50 rounded-3xl 
//       p-8 w-full max-w-md text-center shadow-lg 
//       hover:shadow-2xl transition-all
//     "
//   >
//     <h3 className="text-2xl font-bold text-[#1E2A35]">
//       Not Assigned
//     </h3>
//     <p className="text-sm text-[#3A4750] mt-1">
//       Interns without batch/year
//     </p>
//   </motion.div>

// </div>
// </>
//   );
// };

// export default YearBatchSelect;
