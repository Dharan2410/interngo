import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onSelect: (year: string, batch: string) => void;
};

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");

const YearBatchSelector: React.FC<Props> = ({ onSelect }) => {
  const [groups, setGroups] = useState<
    { year: string; batches: string[] }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:4000/interngo/users")
      .then((r) => r.json())
      .then((data) => {
        const yearMap: Record<string, Map<string, string>> = {};

        data
          .filter((u: any) => u.role === "intern")
          .forEach((u: any) => {
            const year = String(u.year || "").trim();
            const rawBatch = String(u.batch || "").trim();
            if (!year || !rawBatch) return;

            const norm = normalizeBatch(rawBatch);
            if (!yearMap[year]) yearMap[year] = new Map();

            if (!yearMap[year].has(norm)) {
              const num = rawBatch.replace(/[^0-9]/g, "");
              yearMap[year].set(norm, num ? `Batch-${num}` : rawBatch);
            }
          });

        setGroups(
          Object.keys(yearMap)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((year) => ({
            year,
            batches: Array.from(yearMap[year].values()),
          }))
        );
      });
  }, []);

  return (
    <div className="space-y-16">
      {groups.map((g) => (
        <div key={g.year}>
          <div className="flex justify-center mb-6">
            <div className="bg-[#96C2DB]/50 px-16 py-2 rounded-2xl">
              <h3 className="text-xl font-bold">{g.year}</h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {g.batches.map((b) => (
              <motion.div
                key={b}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelect(g.year, b)}
                className="cursor-pointer bg-white/70 backdrop-blur-2xl 
                border border-[#96C2DB]/40 rounded-3xl p-6 shadow-md
                hover:shadow-xl transition-all text-center"
              >
                <p className="text-sm text-[#3A4750]">Batch</p>
                <h3 className="text-xl font-bold">{b}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default YearBatchSelector;