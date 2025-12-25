// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { getAllScheduled } from "../../api/interactionsApi";
// import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
// type FilterKey = "scheduled" | "feedback_pending" | "completed";

// interface Props {
//   role: "mentor" | "interviewer";
// }

// const MentorInterviewerInteractions: React.FC<Props> = ({ role }) => {
//   const { user } = useAuth();
//   const [list, setList] = useState<any[]>([]);
//   const [filter, setFilter] = useState<FilterKey>("scheduled");

//   useEffect(() => {
//     if (!user?.uid) return;

//     getAllScheduled().then((all) => {
//       const mine = all.filter((i: any) =>
//         role === "mentor"
//           ? i.mentorId === user.uid
//           : i.interviewerId === user.uid
//       );

//       setList(mine);
//     });
//   }, [user, role]);

//   const filtered = list.filter(
//     (i) => i.status === filter
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-2">
//         My Interactions
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
//               key={item.id}
//               data={item}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MentorInterviewerInteractions;




import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllScheduled ,updateInteraction} from "../../api/interactionsApi";
import InteractionScheduleCard from "../../components/interactions/InternInteractionCard";
import FeedbackModal from "../../components/feedback/feebbackModal";

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
const [metricDefinitions, setMetricDefinitions] = useState<any[]>([]);


  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.users || []);
      });
  }, []);
  useEffect(() => {
  fetch("http://localhost:4000/metricDefinitions")
    .then((r) => r.json())
    .then(setMetricDefinitions);
}, []);


  /* ---------------- FETCH INTERACTIONS ---------------- */
  useEffect(() => {
    if (!user?.uid || users.length === 0) return;

    getAllScheduled().then((all) => {
      const mine = all
        .filter((i: any) =>
          role === "mentor"
            ? i.mentorId === user.uid
            : i.interviewerId === user.uid
        )
        .map((i: any) => ({
          ...i,
          mentorName:
            users.find((u) => u.uid === i.mentorId)?.name || "—",
          interviewerName:
            users.find((u) => u.uid === i.interviewerId)?.name || "—",
        }));

      setList(mine);
    });
  }, [user, role, users]);

  const filtered = list.filter((i) => i.status === filter);
  const handleFeedbackSubmit = async (payload: any) => {
  await updateInteraction(selected.id, payload);

  // 🔥 Optimistic UI update (instant move to Completed tab)
  setList((prev) =>
    prev.map((i) =>
      i.id === selected.id
        ? { ...i, ...payload }
        : i
    )
  );
};

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">
        Interactions
      </h2>

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
            className={`px-6 py-2 rounded-xl font-semibold transition ${
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
        <p className="text-gray-500">
          No interactions here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <InteractionScheduleCard
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
      {openFeedback && selected && (
  <FeedbackModal
    open={openFeedback}
    interaction={selected}
    metrics={
      metricDefinitions.find(
        (m) => m.id === Number(selected.metricId)
      )?.metrics || []
    }
    role={role}
    onClose={() => setOpenFeedback(false)}
    onSubmit={handleFeedbackSubmit}
  />
)}

    </div>
  );
};

export default MentorInterviewerInteractions;
