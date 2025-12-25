// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchMetrics,
//   createMetric,
//   deleteMetric,
// } from "../../api/interactionMetricsApi";
// import CreateInteractionCard from "../../components/interactions/CreateInteractionCard";
// import InteractionCard from "../../components/interactions/InteractionCard";
// import CreateInteractionModal from "../../components/interactions/CreateInteractionModal";
// import type { InteractionMetricDefinition } from "../../types/interaction";

// const tabs = ["Interaction Metrics", "Scheduled Interactions"] as const;
// type TabType = (typeof tabs)[number];

// const InteractionMetricsPage = () => {
//   const [list, setList] = useState<InteractionMetricDefinition[]>([]);
//   const [open, setOpen] = useState(false);
  
//   const [editing, setEditing] =
//     useState<InteractionMetricDefinition | null>(null);

//   const [activeTab, setActiveTab] =
//     useState<TabType>("Interaction Metrics");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMetrics().then(setList);
//   }, []);

//   const handleSave = async (data: InteractionMetricDefinition) => {
//     if (editing?.id) {
//       await fetch(
//         `http://localhost:4000/metricDefinitions/${editing.id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       setList((prev) =>
//         prev.map((i) =>
//           i.id === editing.id ? { ...data, id: editing.id } : i
//         )
//       );
//     } else {
//       const created = await createMetric(data);
//       setList((prev) => [created, ...prev]);
//     }

//     setOpen(false);
//     setEditing(null);
//   };


// const goToScheduleYearBatch = (interactionId: string) => {
//   navigate(`/admin/interactions/${interactionId}/year-batch/schedule`);
// };

// const goToViewYearBatch = (interactionId: string) => {
//   navigate(`/admin/interactions/${interactionId}/year-batch/view`);
// };


//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Interactions
//       </h1>

//       {/* ================= TABS ================= */}
//       <div className="flex gap-4 mb-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`
//               px-6 py-2 rounded-xl font-semibold transition
//               ${
//                 activeTab === tab
//                   ? "bg-[#96C2DB] text-black shadow"
//                   : "bg-white/60 border hover:bg-white/80"
//               }
//             `}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ================= TAB CONTENT ================= */}

//       {activeTab === "Interaction Metrics" && (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <CreateInteractionCard onClick={() => setOpen(true)} />

//             {list.map((item) => (

//               <InteractionCard
//               key={item.id} 
//   interaction={item}
//   onClick={() => goToScheduleYearBatch(item.id!)}
//   onEdit={() => {
//     setEditing(item);
//     setOpen(true);
//   }}
//   onDelete={async () => {
//     await deleteMetric(item.id!);
//     setList((prev) =>
//       prev.filter((i) => i.id !== item.id)
//     );
//   }}
// />

//             ))}
//           </div>

//           {open && (
//             <CreateInteractionModal
//               initialData={editing}
//               onClose={() => {
//                 setOpen(false);
//                 setEditing(null);
//               }}
//               onSave={handleSave}
//             />
//           )}
//         </>
//       )}

//       {/* -------- TAB 2 : SCHEDULED INTERACTIONS -------- */}
//       {activeTab === "Scheduled Interactions" && (
//         <>
//           {list.length === 0 ? (
//             <p className="text-gray-500">
//               No interactions created yet.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {list.map((item) => (
//                 <InteractionCard
//                 key={item.id}
//   interaction={item}
//   onClick={() => goToViewYearBatch(item.id!)}
//   showActions={false}   
// />

//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default InteractionMetricsPage;








import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMetrics,
  createMetric,
  deleteMetric,
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
  const { year, batch } = useParams<{
    year: string;
    batch: string;
  }>();

  /* ---------------- FETCH METRICS ---------------- */
  useEffect(() => {
    fetchMetrics().then(setList);
  }, []);

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSave = async (data: InteractionMetricDefinition) => {
    if (editing?.id) {
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
      const created = await createMetric(data);
      setList((prev) => [created, ...prev]);
    }

    setOpen(false);
    setEditing(null);
  };

  /* ---------------- NAVIGATION ---------------- */
  const goToInternList = (interactionId: string) => {
    navigate(
      `/admin/interactions/${interactionId}/intern/list/${year}/${batch}`
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">
        Interactions
      </h1>

      <p className="text-gray-600 mb-6">
        Year: <b>{year}</b> &nbsp;|&nbsp; Batch: <b>{batch}</b>
      </p>

      {/* ================= METRICS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateInteractionCard onClick={() => setOpen(true)} />

        {list.map((item) => (
          <InteractionCard
            key={item.id}
            interaction={item}
            onClick={() => goToInternList(item.id!)}
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

      {/* ================= MODAL ================= */}
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
