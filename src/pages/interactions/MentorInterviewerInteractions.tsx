

// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { getAllScheduled ,updateInteraction} from "../../api/interactionsApi";
// import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
// import FeedbackModal from "../../components/feedback/feebbackModal";

// type FilterKey = "scheduled" | "feedback_pending" | "completed";

// interface Props {
//   role: "mentor" | "interviewer";
// }

// const MentorInterviewerInteractions: React.FC<Props> = ({ role }) => {
//   const { user } = useAuth();

//   const [users, setUsers] = useState<any[]>([]);
//   const [list, setList] = useState<any[]>([]);
//   const [filter, setFilter] = useState<FilterKey>("scheduled");
//   const [openFeedback, setOpenFeedback] = useState(false);
// const [selected, setSelected] = useState<any>(null);
// const [metricDefinitions, setMetricDefinitions] = useState<any[]>([]);


//   /* ---------------- FETCH USERS ---------------- */
//   useEffect(() => {
//     fetch("http://localhost:4000/users")
//       .then((r) => r.json())
//       .then((data) => {
//         setUsers(Array.isArray(data) ? data : data.users || []);
//       });
//   }, []);
//   useEffect(() => {
//   fetch("http://localhost:4000/metricDefinitions")
//     .then((r) => r.json())
//     .then(setMetricDefinitions);
// }, []);


//   /* ---------------- FETCH INTERACTIONS ---------------- */
//   useEffect(() => {
//     if (!user?.uid || users.length === 0) return;

//     getAllScheduled().then((all) => {
//       const mine = all
//         .filter((i: any) =>
//           role === "mentor"
//             ? i.mentorId === user.uid
//             : i.interviewerId === user.uid
//         )
//         .map((i: any) => ({
//           ...i,
//           mentorName:
//             users.find((u) => u.uid === i.mentorId)?.name || "—",
//           interviewerName:
//             users.find((u) => u.uid === i.interviewerId)?.name || "—",
//         }));

//       setList(mine);
//     });
//   }, [user, role, users]);

//   const filtered = list.filter((i) => i.status === filter);
//   const handleFeedbackSubmit = async (payload: any) => {
//   await updateInteraction(selected.id, payload);

//   // 🔥 Optimistic UI update (instant move to Completed tab)
//   setList((prev) =>
//     prev.map((i) =>
//       i.id === selected.id
//         ? { ...i, ...payload }
//         : i
//     )
//   );
// };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-2">
//         Interactions
//       </h2>

//       <p className="text-gray-600 mb-6">
//         Role: <b>{role === "mentor" ? "Mentor" : "Interviewer"}</b>
//       </p>

//       {/* FILTERS */}
//       <div className="flex gap-4 mb-8">
//         {[
//           { key: "scheduled", label: "Scheduled" },
//           { key: "feedback_pending", label: "Feedback Pending" },
//           { key: "completed", label: "Completed" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key as FilterKey)}
//             className={`px-6 py-2 rounded-xl font-semibold transition ${
//               filter === f.key
//                 ? "bg-[#96C2DB] shadow"
//                 : "bg-white border"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">
//           No interactions here.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((item) => (
//             <InteractionScheduleCard
//   data={item}
//   showFeedbackAction
  
//   onGiveFeedback={() => {
//     setSelected(item);
//     setOpenFeedback(true);
//   }}
// />
//           ))}
//         </div>
//       )}
//       {openFeedback && selected && (
//   <FeedbackModal
//     open={openFeedback}
//     interaction={selected}
//     metrics={
//       metricDefinitions.find(
//         (m) => m.id === Number(selected.metricId)
//       )?.metrics || []
//     }
//     role={role}
//     onClose={() => setOpenFeedback(false)}
//     onSubmit={handleFeedbackSubmit}
//   />
// )}

//     </div>
//   );
// };

// export default MentorInterviewerInteractions;





// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import {
//   getAllScheduled,
//   scheduleInteraction,
//   deleteScheduledInteraction,
//   updateScheduledInteraction,
// } from "../../api/scheduledInteractionsApi";


// import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
// import FeedbackModal from "../../components/feedback/feebbackModal";

// type FilterKey = "scheduled" | "feedback_pending" | "completed";

// interface Props {
//   role: "mentor" | "interviewer";
// }

// const MentorInterviewerInteractions: React.FC<Props> = ({ role }) => {
//   const { user } = useAuth();

//   const [users, setUsers] = useState<any[]>([]);
//   const [list, setList] = useState<any[]>([]);
//   const [filter, setFilter] = useState<FilterKey>("scheduled");

//   const [openFeedback, setOpenFeedback] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   /* ---------------- FETCH USERS ---------------- */
//   useEffect(() => {
//     fetch("http://localhost:4000/users")
//       .then((r) => r.json())
//       .then((data) =>
//         setUsers(Array.isArray(data) ? data : data.users || [])
//       );
//   }, []);

//   /* ---------------- FETCH SCHEDULED INTERACTIONS ---------------- */
//   useEffect(() => {
//     if (!user?.uid || users.length === 0) return;

//     getAllScheduled().then((all : any ) => {
//       const mine = all
//         .filter((i: any) =>
//           role === "mentor"
//             ? i.mentorId === user.uid
//             : i.interviewerId === user.uid
//         )
//         .map((i: any) => ({
//           ...i,
//           mentorName:
//             users.find((u) => u.uid === i.mentorId)?.name || "—",
//           interviewerName:
//             users.find((u) => u.uid === i.interviewerId)?.name || "—",
//         }));

//       setList(mine);
//     });
//   }, [user, role, users]);

//   /* ---------------- FILTER ---------------- */
//   const filtered = list.filter((i) => i.status === filter);

//   /* ---------------- SUBMIT FEEDBACK ---------------- */
//  const handleFeedbackSubmit = async (payload: any) => {
//   await updateScheduledInteraction(selected.id, {
//     ...payload,
//     status: "completed",
//   });

//   setList((prev) =>
//     prev.map((i) =>
//       i.id === selected.id
//         ? { ...i, ...payload, status: "completed" }
//         : i
//     )
//   );

//   setOpenFeedback(false);
// };


//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-2">
//         Interactions
//       </h2>

//       <p className="text-gray-600 mb-6">
//         Role: <b>{role === "mentor" ? "Mentor" : "Interviewer"}</b>
//       </p>

//       {/* FILTERS */}
//       <div className="flex gap-4 mb-8">
//         {[
//           { key: "scheduled", label: "Scheduled" },
//           { key: "feedback_pending", label: "Feedback Pending" },
//           { key: "completed", label: "Completed" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key as FilterKey)}
//             className={`px-6 py-2 rounded-xl font-semibold ${
//               filter === f.key
//                 ? "bg-[#96C2DB] shadow"
//                 : "bg-white border"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">
//           No interactions here.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((item) => (
//             <InteractionScheduleCard
//               key={item.id}
//               data={item}
//               showFeedbackAction
//               onGiveFeedback={() => {
//                 setSelected(item);
//                 setOpenFeedback(true);
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* FEEDBACK MODAL */}
//       {openFeedback && selected && (
//         <FeedbackModal
//           open={openFeedback}
//           interaction={selected}
//           metrics={selected.metrics || []}   // 🔥 NEW FLOW
//           role={role}
//           onClose={() => setOpenFeedback(false)}
//           onSubmit={handleFeedbackSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default MentorInterviewerInteractions;







// import { useEffect, useMemo, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import {
//   getAllScheduled,
//   updateScheduledInteraction,
// } from "../../api/scheduledInteractionsApi";

// import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
// import FeedbackModal from "../../components/feedback/feebbackModal";

// interface Metric {
//   id: string;
//   title: string;
//   maxScore: number;
// }

// type FilterKey = "scheduled" | "feedback_pending" | "completed";

// interface Props {
//   role: "mentor" | "interviewer";
// }

// const MentorInterviewerInteractions: React.FC<Props> = ({ role }) => {
//   const { user } = useAuth();

//   const [users, setUsers] = useState<any[]>([]);
//   const [list, setList] = useState<any[]>([]);
//   const [filter, setFilter] = useState<FilterKey>("scheduled");

//   const [openFeedback, setOpenFeedback] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   const [allMetrics, setAllMetrics] = useState<Metric[]>([]); // ✅ NEW

//   /* ---------------- FETCH USERS ---------------- */
//   useEffect(() => {
//     fetch("http://localhost:4000/users")
//       .then((r) => r.json())
//       .then((data) =>
//         setUsers(Array.isArray(data) ? data : data.users || [])
//       );
//   }, []);

//   /* ---------------- FETCH METRICS ---------------- */
//   useEffect(() => {
//     fetch("http://localhost:4000/metrics")
//       .then((r) => r.json())
//       .then(setAllMetrics);
//   }, []);

//   /* ---------------- FETCH SCHEDULED ---------------- */
//   useEffect(() => {
//     if (!user?.uid || users.length === 0) return;

//     getAllScheduled().then((all: any[]) => {
//       const mine = all
//         .filter((i) =>
//           role === "mentor"
//             ? i.mentorId === user.uid
//             : i.interviewerId === user.uid
//         )
//         .map((i) => ({
//           ...i,
//           mentorName:
//             users.find((u) => u.uid === i.mentorId)?.name || "—",
//           interviewerName:
//             users.find((u) => u.uid === i.interviewerId)?.name || "—",
//         }));

//       setList(mine);
//     });
//   }, [user, role, users]);

//   /* ---------------- FILTER ---------------- */
//   const filtered = list.filter((i) => i.status === filter);

//   /* ---------------- RESOLVE METRICS (🔥 CORE FIX) ---------------- */
//   const metricsForFeedback = useMemo(() => {
//     if (!selected) return [];

//     return allMetrics.filter((m) =>
//       selected.metricIds?.includes(m.id)
//     );
//   }, [selected, allMetrics]);

//   /* ---------------- SUBMIT FEEDBACK ---------------- */
//   const handleFeedbackSubmit = async (payload: any) => {
//     await updateScheduledInteraction(selected.id, {
//       ...payload,
//       status: "completed",
//     });

//     setList((prev) =>
//       prev.map((i) =>
//         i.id === selected.id
//           ? { ...i, ...payload, status: "completed" }
//           : i
//       )
//     );

//     setOpenFeedback(false);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-2">Interactions</h2>

//       <p className="text-gray-600 mb-6">
//         Role: <b>{role === "mentor" ? "Mentor" : "Interviewer"}</b>
//       </p>

//       {/* FILTERS */}
//       <div className="flex gap-4 mb-8">
//         {[
//           { key: "scheduled", label: "Scheduled" },
//           { key: "feedback_pending", label: "Feedback Pending" },
//           { key: "completed", label: "Completed" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key as FilterKey)}
//             className={`px-6 py-2 rounded-xl font-semibold ${
//               filter === f.key
//                 ? "bg-[#96C2DB] shadow"
//                 : "bg-white border"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* GRID */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">No interactions here.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((item) => (
//             <InteractionScheduleCard
//               key={item.id}
//               data={item}
//               showFeedbackAction
//               onGiveFeedback={() => {
//                 setSelected(item);
//                 setOpenFeedback(true);
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* FEEDBACK MODAL */}
//       {openFeedback && selected && (
//         <FeedbackModal
//           open={openFeedback}
//           interaction={selected}
//           metrics={metricsForFeedback} // ✅ FIXED
//           role={role}
//           onClose={() => setOpenFeedback(false)}
//           onSubmit={handleFeedbackSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default MentorInterviewerInteractions;





import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllScheduled,
  updateScheduledInteraction,
} from "../../api/scheduledInteractionsApi";

import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
import FeedbackModal from "../../components/feedback/feebbackModal";

interface Metric {
  id: string;
  title: string;
  maxScore: number;
}

interface Interaction {
  id: number;
  name: string;
  metricIds: string[];
}

type FilterKey = "scheduled" | "feedback_pending" | "completed";

interface Props {
  role: "mentor" | "interviewer";
}

const MentorInterviewerInteractions: React.FC<Props> = ({ role }) => {
  const { user } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterKey>("scheduled");

  const [openFeedback, setOpenFeedback] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [allMetrics, setAllMetrics] = useState<Metric[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((r) => r.json())
      .then((data) =>
        setUsers(Array.isArray(data) ? data : data.users || [])
      );
  }, []);

  /* ---------------- FETCH METRICS ---------------- */
  useEffect(() => {
    fetch("http://localhost:4000/metrics")
      .then((r) => r.json())
      .then(setAllMetrics);
  }, []);

  /* ---------------- FETCH INTERACTIONS ---------------- */
  useEffect(() => {
    fetch("http://localhost:4000/interactions")
      .then((r) => r.json())
      .then(setInteractions);
  }, []);

  /* ---------------- FETCH SCHEDULED ---------------- */
  useEffect(() => {
    if (!user?.uid || users.length === 0) return;

    getAllScheduled().then((all: any[]) => {
      const mine = all
        .filter((i) =>
          role === "mentor"
            ? i.mentorId === user.uid
            : i.interviewerId === user.uid
        )
        .map((i) => ({
          ...i,
          mentorName:
            users.find((u) => u.uid === i.mentorId)?.name || "—",
          interviewerName:
            users.find((u) => u.uid === i.interviewerId)?.name || "—",
        }));

      setList(mine);
    });
  }, [user, role, users]);

  /* ---------------- FILTER ---------------- */
  const filtered = list.filter((i) => i.status === filter);

  /* ---------------- RESOLVE METRICS (🔥 ACTUAL FIX) ---------------- */
  // const metricsForFeedback = useMemo(() => {
  //   if (!selected) return [];

  //   const interaction = interactions.find(
  //     (i) => i.id === selected.interactionId
  //   );

  //   if (!interaction?.metricIds) return [];

  //   return allMetrics.filter((m) =>
  //     interaction.metricIds.includes(m.id)
  //   );
  // }, [selected, interactions, allMetrics]);
  const metricsForFeedback = useMemo(() => {
  if (!selected || !selected.metricIds) return [];

  return allMetrics.filter((m) =>
    selected.metricIds.includes(m.id)
  );
}, [selected, allMetrics]);


  /* ---------------- SUBMIT FEEDBACK ---------------- */
  const handleFeedbackSubmit = async (payload: any) => {
    await updateScheduledInteraction(selected.id, {
      ...payload,
      status: "completed",
    });

    setList((prev) =>
      prev.map((i) =>
        i.id === selected.id
          ? { ...i, ...payload, status: "completed" }
          : i
      )
    );

    setOpenFeedback(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Interactions</h2>

      <p className="text-gray-600 mb-6">
        Role: <b>{role === "mentor" ? "Mentor" : "Interviewer"}</b>
      </p>

      {/* FILTERS */}
      <div className="flex gap-4 mb-8">
        {[
          { key: "scheduled", label: "Scheduled" },
          { key: "feedback_pending", label: "Feedback Pending" },
          { key: "completed", label: "Completed" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as FilterKey)}
            className={`px-6 py-2 rounded-xl font-semibold ${
              filter === f.key
                ? "bg-[#96C2DB] shadow"
                : "bg-white border"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No interactions here.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <InteractionScheduleCard
              key={item.id}
              data={item}
              showFeedbackAction
              onGiveFeedback={() => {
                setSelected(item);
                setOpenFeedback(true);
              }}
            />
          ))}
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {openFeedback && selected && (
        <FeedbackModal
          open={openFeedback}
          interaction={selected}
          metrics={metricsForFeedback}
          role={role}
          onClose={() => setOpenFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default MentorInterviewerInteractions;
