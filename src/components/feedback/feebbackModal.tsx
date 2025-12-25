import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Metric {
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
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState("");
  const [allowInternView, setAllowInternView] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init: any = {};
    metrics.forEach((m) => (init[m.title] = 0));
    setScores(init);
  }, [metrics]);

  if (!open) return null;

 const handleSubmit = async () => {
  try {
    setLoading(true);

    const payload = {
      feedback: {
        givenBy: role,
        metrics: metrics.map((m) => ({
          title: m.title,
          score: scores[m.title],
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

    onClose();
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-2xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-[#3B6E8F] mb-4">
          Feedback Form
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          <b>Interaction:</b> {interaction.interactionName} <br />
          <b>Intern:</b> {interaction.internName}
        </p>

        {/* METRICS */}
        <div className="space-y-4">
          {metrics.map((m) => (
            <div
              key={m.title}
              className="flex justify-between items-center gap-4"
            >
              <span className="font-medium">
                {m.title} ( / {m.maxScore})
              </span>

              <input
                type="number"
                min={0}
                max={m.maxScore}
                value={scores[m.title]}
                onChange={(e) =>
                  setScores({
                    ...scores,
                    [m.title]: Number(e.target.value),
                  })
                }
                className="w-20 border rounded-lg px-3 py-1"
              />
            </div>
          ))}
        </div>

        {/* COMMENTS */}
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Descriptive feedback..."
          className="w-full mt-6 border rounded-xl p-3 min-h-[100px]"
        />

        {/* PERMISSION */}
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            checked={allowInternView}
            onChange={() => setAllowInternView(!allowInternView)}
          />
          Allow intern to view feedback
        </label>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose}>Cancel</button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#3B6E8F] text-white rounded-xl"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
