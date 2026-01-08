





// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchMetrics,
//   createMetric,
//   deleteMetric,
// } from "../../api/interactionMetricsApi";
// import CreateInteractionCard from "../../components/interactions/CreateInteractionCard";
// import InteractionCard from "../../components/interactions/InteractionCard";
// import CreateInteractionModal from "../../components/interactions/CreateInteractionModal";
// import type { InteractionMetricDefinition } from "../../types/interaction";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

// const InteractionMetricsPage = () => {
//   const [list, setList] = useState<InteractionMetricDefinition[]>([]);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] =
//     useState<InteractionMetricDefinition | null>(null);
//     const [deleteTarget, setDeleteTarget] =
//   useState<InteractionMetricDefinition | null>(null);


//   const navigate = useNavigate();
//   const { year, batch } = useParams<{
//     year: string;
//     batch: string;
//   }>();

//   /* ---------------- FETCH METRICS ---------------- */
//   useEffect(() => {
//     fetchMetrics().then(setList);
//   }, []);

//   /* ---------------- CREATE / UPDATE ---------------- */
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

//   /* ---------------- NAVIGATION ---------------- */
//   const goToInternList = (interactionId: string) => {
//     navigate(
//       `/admin/interactions/${interactionId}/intern/list/${year}/${batch}`
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">
//         Interactions
//       </h1>

//       <p className="text-gray-600 mb-6">
//         Year: <b>{year}</b> &nbsp;|&nbsp; Batch: <b>{batch}</b>
//       </p>

//       {/* ================= METRICS GRID ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <CreateInteractionCard onClick={() => setOpen(true)} />

//         {list.map((item) => (
//          <InteractionCard
//   key={item.id}
//   interaction={item}
//   onClick={() => goToInternList(item.id!)}
//   onEdit={() => {
//     setEditing(item);
//     setOpen(true);
//   }}
//   onRequestDelete={() => setDeleteTarget(item)} 
// />


//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       {open && (
//   <CreateInteractionModal
//     initialData={editing}
//     allMetrics={list}   
//     onClose={() => {
//       setOpen(false);
//       setEditing(null);
//     }}
//     onSave={handleSave}
//   />
// )}

//       {deleteTarget && (
//   <ConfirmDeleteModal
//     open={true}
//     onCancel={() => setDeleteTarget(null)}
//     onConfirm={async () => {
//       try {

//         await deleteMetric(deleteTarget.id!);


//         setList((prev) =>
//           prev.filter((i) => i.id !== deleteTarget.id)
//         );

//         setDeleteTarget(null);
//       } catch (err) {
//         console.error("Delete failed", err);
//         alert("Failed to delete interaction");
//       }
//     }}
//   />
// )}

//     </div>
//   );
// };

// export default InteractionMetricsPage;




///after flow change 






// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   fetchInteractions,
//   createInteraction,
//   updateInteraction,
//   deleteInteraction,
// } from "../../api/interactionsApi";

// import type { Interaction } from "../../types/interaction";

// import CreateInteractionCard from "../../components/interactions/CreateInteractionCard";
// import InteractionCard from "../../components/interactions/InteractionCard";
// import CreateInteractionModal from "../../components/interactions/CreateInteractionModal";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

// const InteractionMetricsPage = () => {
//   const [list, setList] = useState<Interaction[]>([]);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Interaction | null>(null);
//   const [deleteTarget, setDeleteTarget] =
//     useState<Interaction | null>(null);

//   const navigate = useNavigate();
//   const { year, batch } = useParams<{
//     year: string;
//     batch: string;
//   }>();

//   /* ---------------- FETCH INTERACTIONS ---------------- */
//   useEffect(() => {
//     if (!year || !batch) return;
//     fetchInteractions(year, batch).then(setList);
//   }, [year, batch]);

//   /* ---------------- CREATE / UPDATE ---------------- */
//   const handleSave = async (data: Interaction) => {
//     if (editing?.id) {
//       const updated = await updateInteraction(editing.id, data);

//       setList((prev) =>
//         prev.map((i) => (i.id === updated.id ? updated : i))
//       );
//     } else {
//       const created = await createInteraction({
//         ...data,
//         year: year!,
//         batch: batch!,
//       });

//       setList((prev) => [created, ...prev]);
//     }

//     setOpen(false);
//     setEditing(null);
//   };

//   /* ---------------- NAVIGATION ---------------- */
//   const goToInternList = (interactionId: string) => {
//     navigate(
//       `/admin/interactions/${interactionId}/intern/list/${year}/${batch}`
//     );
//   };

//   if (!year || !batch) {
//     return (
//       <div className="p-6 text-gray-500">
//         Invalid year or batch
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">
//         Interactions
//       </h1>

//       <p className="text-gray-600 mb-6">
//         Year: <b>{year}</b> &nbsp;|&nbsp; Batch: <b>{batch}</b>
//       </p>

//       {/* ================= INTERACTIONS GRID ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <CreateInteractionCard onClick={() => setOpen(true)} />

//         {list.map((item) => (
//           <InteractionCard
//             key={item.id}
//             interaction={item}
//             onClick={() => goToInternList(item.id!)}
//             onEdit={() => {
//               setEditing(item);
//               setOpen(true);
//             }}
//             onRequestDelete={() => setDeleteTarget(item)}
//           />
//         ))}
//       </div>

//       {/* ================= CREATE / EDIT MODAL ================= */}
//       {open && (
//         <CreateInteractionModal
//           initialData={editing}
//           allMetrics={list}
//           onClose={() => {
//             setOpen(false);
//             setEditing(null);
//           }}
//           onSave={handleSave}
//         />
//       )}

//       {/* ================= DELETE CONFIRM ================= */}
//       {deleteTarget && (
//         <ConfirmDeleteModal
//           open={true}
//           onCancel={() => setDeleteTarget(null)}
//           onConfirm={async () => {
//             try {
//               await deleteInteraction(deleteTarget.id!);

//               setList((prev) =>
//                 prev.filter((i) => i.id !== deleteTarget.id)
//               );

//               setDeleteTarget(null);
//             } catch (err) {
//               console.error("Delete failed", err);
//               alert("Failed to delete interaction");
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default InteractionMetricsPage;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchInteractions,
  createInteraction,
  updateInteraction,
  deleteInteraction,
} from "../../api/interactionsApi";

import type { Interaction } from "../../types/interaction";

import CreateInteractionCard from "../../components/interactions/CreateInteractionCard";
import InteractionCard from "../../components/interactions/InteractionCard";
import CreateInteractionModal from "../../components/interactions/CreateInteractionModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const InteractionMetricsPage = () => {
  const [list, setList] = useState<Interaction[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Interaction | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<Interaction | null>(null);

  const navigate = useNavigate();
  const { year, batch } = useParams<{
    year: string;
    batch: string;
  }>();

  /* ---------------- FETCH INTERACTIONS ---------------- */
  useEffect(() => {
    if (!year || !batch) return;
    fetchInteractions(year, batch).then(setList);
  }, [year, batch]);

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSave = async (data: Interaction) => {
    if (editing?.id) {
      const updated = await updateInteraction(editing.id, data);
      setList((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
    } else {
      const created = await createInteraction({
        ...data,
        year: year!,
        batch: batch!,
      });
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

  if (!year || !batch) {
    return (
      <div className="p-6 text-gray-500">
        Invalid year or batch
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">
        Interactions
      </h1>

      <p className="text-gray-600 mb-6">
        Year: <b>{year}</b> &nbsp;|&nbsp; Batch: <b>{batch}</b>
      </p>

      {/* ================= INTERACTIONS GRID ================= */}
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
            onRequestDelete={() => setDeleteTarget(item)}
          />
        ))}
      </div>

      {/* ================= CREATE / EDIT MODAL ================= */}
      {open && (
        <CreateInteractionModal
          initialData={editing}
          allInteractions={list} 
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteTarget && (
        <ConfirmDeleteModal
          open={true}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await deleteInteraction(deleteTarget.id!);
            setList((prev) =>
              prev.filter((i) => i.id !== deleteTarget.id)
            );
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default InteractionMetricsPage;
