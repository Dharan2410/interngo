import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import {
  fetchMetrics,
  createMetric,
  deleteMetric
} from "../../api/interactionMetricsApi";
import CreateInteractionCard from "../../components/interactions/CreateInteractionCard";
import InteractionCard from "../../components/interactions/InteractionCard";
import CreateInteractionModal from "../../components/interactions/CreateInteractionModal";
import type { InteractionMetricDefinition } from "../../types/interaction";

const InteractionMetricsPage = () => {
  const [list, setList] = useState<InteractionMetricDefinition[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<InteractionMetricDefinition | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMetrics().then(setList);
  }, []);

  const handleSave = async (
  data: InteractionMetricDefinition
) => {
  if (editing?.id) {
    // EDIT
    await fetch(
      `http://localhost:4000/metricDefinitions/${editing.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    setList((prev) =>
      prev.map((i) =>
        i.id === editing.id ? { ...data, id: editing.id } : i
      )
    );
  } else {
    // CREATE
    const created = await createMetric(data);
    setList((prev) => [created, ...prev]);
  }

  setOpen(false);
  setEditing(null);
};

  const handleCardClick = (interactionId: string) => {
  navigate(`/admin/interactions/${interactionId}/year-batch`);
};


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">
        Interaction Metrics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateInteractionCard onClick={() => setOpen(true)} />
        {list.map((item) => (
          <InteractionCard
           key={item.id}   
  interaction={item}
  onClick={() => handleCardClick(item.id!)}
  onEdit={() => {
    setEditing(item);
    setOpen(true);
  }}
  onDelete={async () => {
    await deleteMetric(item.id!);
    setList((prev) =>
      prev.filter((i) => i.id !== item.id)
    );
  }}
/>

        ))}
      </div>

     {open && (
  <CreateInteractionModal
    initialData={editing}   
    onClose={() => {
      setOpen(false);
      setEditing(null);
    }}
    onSave={handleSave}
  />
)}

    </div>
  );
};

export default InteractionMetricsPage;
