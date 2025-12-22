



import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BASE = "http://localhost:4000/interngo";

interface YearGroup {
  year: string;
  batches: string[];
}

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-]/g, "");

interface Props {
  onSelect: (year: string, batch: string) => void;

  // 👇 optional (ONLY for resources)
  
  showExtras?: boolean;
  onViewAll?: () => void;
  onNotAssigned?: () => void;
}

const YearBatchSelector: React.FC<Props> = ({
  onSelect,
  showExtras = false,
  onViewAll,
  onNotAssigned,
}) => {
  const [groups, setGroups] = useState<YearGroup[]>([]);

  useEffect(() => {
    fetch(`${BASE}/users`)
      .then((res) => res.json())
      .then((res) => {
        // ✅ SAFE NORMALIZATION (IMPORTANT)
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.users)
          ? res.users
          : [];

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
              const batchNumber = rawBatch.replace(/[^0-9]/g, "");
              const displayBatch = batchNumber
                ? `Batch-${batchNumber}`
                : rawBatch;

              yearMap[year].set(normalized, displayBatch);
            }
          });

        const grouped = Object.keys(yearMap)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => ({
            year,
            batches: Array.from(yearMap[year].values()),
          }));

        setGroups(grouped);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* SAME BACKGROUND BLOBS */}
      <motion.div
        className="absolute w-72 h-72 bg-[#C6DFF1] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 top-20 left-10 -z-10"
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#96C2DB] rounded-full 
        mix-blend-multiply blur-3xl opacity-40 bottom-20 right-10 -z-10"
      />

      <h2 className="text-3xl font-bold text-[#1E2A35] mb-10 relative z-10">
        Select <span className="text-[#3B6E8F]">Year & Batch</span>
      </h2>

      <div className="space-y-16 relative z-10 w-full">
        {groups.map((group) => (
          <div key={group.year} className="space-y-6">
            {/* YEAR LABEL */}
            <div className="flex items-center justify-center my-4">
              <div className="flex items-center w-full max-w-xl">
                <div className="flex-grow border-t border-[#96C2DB]/40" />
                <div
                  className="
                  bg-[#96C2DB]/50
                  border border-[#96C2DB]/50
                  rounded-2xl shadow-sm
                  px-48 py-2 text-center
                "
                >
                  <h3 className="text-xl font-bold text-[#1E2A35]">
                    {group.year}
                  </h3>
                </div>
                <div className="flex-grow border-t border-[#96C2DB]/40" />
              </div>
            </div>

            {/* BATCH CARDS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {group.batches.map((batch) => (
                <motion.div
                  key={batch}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onSelect(group.year, batch)}
                  className="
                    cursor-pointer bg-white/70 backdrop-blur-2xl
                    border border-[#96C2DB]/40 rounded-3xl p-6
                    shadow-md hover:shadow-xl transition-all text-center
                  "
                >
                  <p className="text-sm text-[#3A4750]">Batch</p>
                  <h3 className="text-xl font-bold text-[#1E2A35]">
                    {batch}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

     {showExtras && (
  <div className="flex justify-center gap-6 mb-10 px-4">
    {/* VIEW ALL */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onViewAll}
      className="cursor-pointer bg-white/80 backdrop-blur-2xl 
      border border-[#96C2DB]/50 rounded-3xl 
      p-8 w-full max-w-md text-center shadow-lg"
    >
      <h3 className="text-2xl font-bold">View All Interns</h3>
    </motion.div>

    {/* NOT ASSIGNED */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onNotAssigned}
      className="cursor-pointer bg-white/80 backdrop-blur-2xl 
      border border-[#96C2DB]/50 rounded-3xl 
      p-8 w-full max-w-md text-center shadow-lg"
    >
      <h3 className="text-2xl font-bold">Not Assigned</h3>
      <p className="text-sm mt-1">
        Interns without batch/year
      </p>
    </motion.div>
  </div>
)}
      </div>
    </>
  );
};

export default YearBatchSelector;
