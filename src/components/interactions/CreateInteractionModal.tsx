import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Interaction } from "../../types/interaction";
import type { Metric } from "../../types/metric";

interface Props {
  initialData?: Interaction | null;
  allInteractions: Interaction[];
  onClose: () => void;
  onSave: (data: Interaction) => void;
}

const CreateInteractionModal: React.FC<Props> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [metricIds, setMetricIds] = useState<string[]>(
    initialData?.metricIds || []
  );
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Add Metric popup
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newScore, setNewScore] = useState(10);

  /* ---------------- FETCH METRICS ---------------- */
  useEffect(() => {
    fetch("http://localhost:4000/metrics")
      .then((r) => r.json())
      .then(setMetrics);
  }, []);

  /* ---------------- TOGGLE METRIC ---------------- */
  const toggleMetric = (id: string) => {
    setMetricIds((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  /* ---------------- ADD METRIC ---------------- */
  // const addMetric = async () => {
  //   if (!newTitle.trim()) {
  //     alert("Metric title required");
  //     return;
  //   }

  //   const metric: Metric = {
  //     id: crypto.randomUUID(),
  //     title: newTitle,
  //     maxScore: newScore,
  //   };

  //   await fetch("http://localhost:4000/metrics", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(metric),
  //   });

  //   setMetrics((prev) => [...prev, metric]);
  //   setNewTitle("");
  //   setNewScore(10);
  //   setShowAddMetric(false);
  // };

  const addMetric = () => {
  if (!newTitle.trim()) return;

  const metric: Metric = {
    id: crypto.randomUUID(),
    title: newTitle,
    maxScore: newScore,
    isTemp: true, // 👈 mark as temporary
  };

  setMetrics((prev) => [...prev, metric]);
  setMetricIds((prev) => [...prev, metric.id]);

  setNewTitle("");
  setNewScore(10);
  setShowAddMetric(false);
};

  /* ---------------- SELECTED METRICS ---------------- */
  const selectedMetrics = useMemo(
    () => metrics.filter((m) => metricIds.includes(m.id)),
    [metrics, metricIds]
  );

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
  if (!name.trim()) {
    alert("Interaction name required");
    return;
  }

  if (metricIds.length === 0) {
    alert("Select at least one metric");
    return;
  }

  // ✅ Save ONLY newly added metrics
  const newMetrics = metrics.filter(
    (m) => m.isTemp && metricIds.includes(m.id)
  );

  for (const m of newMetrics) {
    await fetch("http://localhost:4000/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: m.id,
        title: m.title,
        maxScore: m.maxScore,
      }),
    });
  }

  onSave({
    ...initialData,
    name,
    metricIds,
  } as Interaction);
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[20000]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-[#3B6E8F]">
            {initialData ? "Edit Interaction" : "Create Interaction"}
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Interaction Name */}
          <div>
            <label className="font-semibold text-[#3B6E8F]">
              Interaction Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl border"
            />
          </div>

          {/* METRICS LIST */}
          <div>
            <label className="font-semibold text-[#3B6E8F] block mb-2">
              Evaluation Metrics
            </label>

            <div className="max-h-[260px] overflow-y-auto space-y-2 pr-2">
              {metrics.map((m) => (
                <label
                  key={m.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={metricIds.includes(m.id)}
                      onChange={() => toggleMetric(m.id)}
                      className="w-4 h-4"
                    />
                    <span>{m.title}</span>
                  </div>

                  <span className="text-gray-600">
                    {m.maxScore}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAddMetric(true)}
              className="mt-3 text-[#3B6E8F] font-semibold"
            >
              ➕ Add Metric
            </button>
          </div>

          {/* SELECTED PREVIEW */}
          {selectedMetrics.length > 0 && (
            <div className="p-4 rounded-xl bg-[#F3F8FC]">
              <p className="font-semibold text-[#3B6E8F] mb-2">
                Selected Metrics
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedMetrics.map((m) => (
                  <span
                    key={m.id}
                    className="px-3 py-1 text-xs rounded-full bg-white border"
                  >
                    {m.title} ({m.maxScore})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t flex justify-end gap-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
          >
            Save
          </button>
        </div>
      </motion.div>

      {/* ADD METRIC MODAL */}
      {showAddMetric && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[21000]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-[90%] max-w-sm"
          >
            <h3 className="text-lg font-bold mb-4 text-[#3B6E8F]">
              Add Metric
            </h3>

            <input
              placeholder="Metric title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <input
              type="number"
              min={1}
              value={newScore}
              onChange={(e) => setNewScore(Number(e.target.value))}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddMetric(false)}>
                Cancel
              </button>
              <button
                onClick={addMetric}
                className="px-4 py-1 bg-[#3B6E8F] text-white rounded"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CreateInteractionModal;
