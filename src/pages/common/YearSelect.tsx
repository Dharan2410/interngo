import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BASE = "http://localhost:8080/interngo";

// Extract numeric year "2025" from strings like "Batch 2025"
const extractYear = (value: string): string => {
  if (!value) return "";
  const year = value.replace(/\D/g, "");
  return year.length === 4 ? year : "";
};

const YearSelect: React.FC = () => {
  const [years, setYears] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${BASE}/professional`)
      .then((res) => res.json())
      .then((data: any[]) => {
        const extracted = data
          .map((item) => extractYear(item.year || item.batch))
          .filter((y) => y !== "");

        const uniqueYears = Array.from(new Set(extracted));
        setYears(uniqueYears);
      })
      .catch((err) => console.error("Year fetch error:", err));
  }, []);

  const handleYearSelect = (year: string) => {
    if (user?.role === "admin") {
      navigate(`/admin/resources/intern/batches/${year}`);
    } else if (user?.role === "mentor") {
      navigate(`/mentor/resources/intern/batches/${year}`);
    } else if (user?.role === "interviewer") {
      navigate(`/interviewer/resources/intern/batches/${year}`);
    }
  };

  return (
    <>
      {/* Background Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
          mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
          mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 className="text-3xl font-bold text-[#1E2A35] mb-6 relative z-10">
        Select a <span className="text-[#3B6E8F]">Year</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {years.map((year) => (
          <motion.div
            key={year}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleYearSelect(year)}
            className="
              cursor-pointer bg-white/60 backdrop-blur-2xl 
              border border-[#96C2DB]/40 rounded-3xl p-6 
              shadow-xl hover:shadow-2xl transition-all text-center
            "
          >
            <p className="text-sm text-[#3A4750]">Intern Batch Year</p>
            <h3 className="text-2xl font-bold text-[#1E2A35]">{year}</h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default YearSelect;
