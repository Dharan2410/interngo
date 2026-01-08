


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Toast from "../Toast";
interface Metric {
  id: string;
  title: string;
  maxScore: number;
}

interface Props {
  open: boolean;
  interaction: any;
  metrics: Metric[];
  role: "mentor" | "interviewer";
  onClose: () => void;
  onSubmit: (payload: any) => Promise<void>;
}

const FeedbackModal: React.FC<Props> = ({
  open,
  interaction,
  metrics,
  role,
  onClose,
  onSubmit,
}) => {
  const [scores, setScores] = useState<Record<string, number | "">>({});
  const [comments, setComments] = useState("");
  const [allowInternView, setAllowInternView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "error" as "success" | "error",
});

useEffect(() => {
  if (!toast.show) return;
  const t = setTimeout(
    () => setToast((p) => ({ ...p, show: false })),
    2500
  );
  return () => clearTimeout(t);
}, [toast.show]);


  /* ---------------- INIT SCORES ---------------- */
  useEffect(() => {
    const init: Record<string, number| ""> = {};
    metrics.forEach((m) => {
      init[m.id] = "";
    });
    setScores(init);
  }, [metrics]);

  if (!open) return null;

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
  // 1️⃣ Validate scores
  for (const m of metrics) {
    const val = scores[m.id];

    if (val === "") {
      setToast({
        show: true,
        message: "Please fill all metric scores",
        type: "error",
      });
      return;
    }

    if (val < 0 || val > m.maxScore) {
      setToast({
        show: true,
        message: `Score for "${m.title}" must be between 0 and ${m.maxScore}`,
        type: "error",
      });
      return;
    }
  }

  // 2️⃣ Validate comments
  if (!comments.trim()) {
    setToast({
      show: true,
      message: "Please add descriptive feedback",
      type: "error",
    });
    return;
  }

  try {
    setLoading(true);

    const payload = {
      feedback: {
        givenBy: role,
        metrics: metrics.map((m) => ({
          metricId: m.id,
          title: m.title,
          score: scores[m.id],
          maxScore: m.maxScore,
        })),
        comments,
        allowInternView,
        submittedAt: new Date().toISOString(),
      },
      status: "completed",
      feedbackStatus: "completed",
    };

    await onSubmit(payload);

    setToast({
      show: true,
      message: "Feedback submitted successfully",
      type: "success",
    });

    setTimeout(() => onClose(), 800);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-2xl rounded-2xl
                   p-6 max-h-[85vh] flex flex-col"
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-[#3B6E8F] mb-2">
          Feedback Form
        </h2>

        <p className="text-medium text-gray-600 mb-4">
          <b>Interaction:</b> {interaction.interactionName} <br />
          <b>Intern:</b> {interaction.internName}
        </p>

        {/* BODY (SCROLL SAFE) */}
        <div className="flex-1 overflow-y-auto pr-2">

          {/* METRICS */}
          <div>
            <p className="text-medium font-semibold mb-3 text-[#3B6E8F]">
              Evaluation Metrics
            </p>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
              {metrics.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-4 text-medium"
                >
                  <span className="font-medium text-base text-gray-800 truncate">
                    {m.title}
                  </span>

                  <div className="flex items-center gap-2">
                  <input
  type="number"
  min={0}
  max={m.maxScore}
  value={scores[m.id] ?? ""}
  onChange={(e) =>
    setScores({
      ...scores,
      [m.id]:
        e.target.value === ""
          ? ""
          : Number(e.target.value),
    })
  }
  className="w-16 px-2 py-1 border rounded-md text-base
             [appearance:textfield]
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:appearance-none"
/>

                    <span className="text-gray-500 text-xs">
                      / {m.maxScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMMENTS */}
          <div className="mt-5">
            <p className="text-xl font-semibold mb-2">
              Descriptive Feedback
            </p>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write qualitative feedback..."
              className="w-full border rounded-xl p-3 text-medium
                         min-h-[80px] max-h-[120px]"
            />
          </div>

          {/* PERMISSION */}
          <label className="flex items-center gap-2 mt-4 text-medium">
            <input
              type="checkbox"
              checked={allowInternView}
              onChange={() =>
                setAllowInternView(!allowInternView)
              }
            />
            Allow intern to view feedback
          </label>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#3B6E8F] text-white
                       rounded-xl text-medium"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#3B6E8F] text-white
                       rounded-xl text-medium"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </motion.div>
      <Toast
  show={toast.show}
  message={toast.message}
  type={toast.type}
/>

    </div>
  );
};

export default FeedbackModal;
