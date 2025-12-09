



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BASE = "http://localhost:8080/interngo";

const BatchSelect: React.FC = () => {
  const { year } = useParams(); // example: "2025"
  const [batches, setBatches] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!year) return;

    fetch(`${BASE}/professional`)
      .then((res) => res.json())
      .then((data: any[]) => {
        // 🔥 Filter only the interns who belong to this specific YEAR
        const sameYearRecords = data.filter((item) => item.year === year);

        // 🔥 Extract "Batch 1", "Batch 2", etc.
        const batchNames = [
          ...new Set(
            sameYearRecords
              .map((item) => item.batch?.trim())
              .filter((b) => b && b !== "")
          ),
        ];

        setBatches(batchNames);
      })
      .catch((err) => console.error("Batch fetch error:", err));
  }, [year]);

  const handleSelectBatch = (batch: string) => {
    if (user?.role === "admin") {
      navigate(`/admin/resources/intern/list/${year}/${batch}`);
    } else if (user?.role === "mentor") {
      navigate(`/mentor/resources/intern/list/${year}/${batch}`);
    } else if (user?.role === "interviewer") {
      navigate(`/interviewer/resources/intern/list/${year}/${batch}`);
    }
  };

  return (
    <>
      {/* Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 className="text-3xl font-bold text-[#1E2A35] mb-6 relative z-10">
        Select a <span className="text-[#3B6E8F]">Batch</span> for Year {year}
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {batches.map((batch) => (
          <motion.div
            key={batch}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSelectBatch(batch)}
            className="
              cursor-pointer bg-white/60 backdrop-blur-2xl 
              border border-[#96C2DB]/40 rounded-3xl p-6 
              shadow-xl hover:shadow-2xl transition-all text-center
            "
          >
            <p className="text-sm text-[#3A4750]">Batch</p>
            <h3 className="text-xl font-bold text-[#1E2A35]">{batch}</h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default BatchSelect;
