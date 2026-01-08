


// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { getAllScheduled } from "../../api/interactionsApi";
// import InternInteractionCard from "../../components/interactions/InternInteractionCard";

// type FilterKey = "all" | "scheduled" | "feedback_pending" | "completed";

// const InternScheduledInteractions = () => {
//   const { user } = useAuth();
//   const [list, setList] = useState<any[]>([]);
//   const [users, setUsers] = useState<any[]>([]);
//   const [filter, setFilter] = useState<FilterKey>("all");
//   const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
// const [selectedFeedback, setSelectedFeedback] = useState<any>(null);


//   /* ---------------- FETCH DATA ---------------- */
//   useEffect(() => {
//     if (!user?.uid) return;

//     Promise.all([
//       getAllScheduled(),
//       fetch("http://localhost:4000/users").then((r) => r.json()),
//     ]).then(([scheduled, usersData]) => {
//       const allUsers = Array.isArray(usersData)
//         ? usersData
//         : usersData.users || [];
//       setUsers(allUsers);

//       const mine = scheduled
//         .filter((i: any) => i.internId === user.uid)
//         .map((i: any) => ({
//           ...i,
//           mentorName:
//             allUsers.find((u: any) => u.uid === i.mentorId)?.name || "—",
//           interviewerName:
//             allUsers.find((u: any) => u.uid === i.interviewerId)?.name || "—",
//         }));

//       setList(mine);
//     });
//   }, [user]);

//   /* ---------------- FILTER ---------------- */
//   const filtered = list.filter((i) => {
//     if (filter === "all") return true;
//     if (filter === "scheduled") return i.status === "scheduled";
//     if (filter === "feedback_pending") return i.status === "feedback_pending";
//     if (filter === "completed") return i.status === "completed";
//     return true;
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">
//          Interactions
//       </h2>

//       {/* FILTERS */}
//       <div className="flex gap-3 mb-8">
//         {[
//           { key: "all", label: "All" },
//           { key: "scheduled", label: "Pending" },
//           { key: "feedback_pending", label: "Feedback Pending" },
//           { key: "completed", label: "Completed" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key as FilterKey)}
//             className={`px-5 py-2 rounded-xl font-semibold ${
//               filter === f.key
//                 ? "bg-[#96C2DB]"
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
//           No interactions found.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((item) => (
//             <InternInteractionCard
//               key={item.id}
//               data={item}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InternScheduledInteractions;



///after flow change 


import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllScheduled } from "../../api/scheduledInteractionsApi";
import InternInteractionCard from "../../components/interactions/InternInteractionCard";
import ViewFeedbackModal from "../../components/interactions/ViewFeedbackModal";

type FilterKey = "all" | "scheduled" | "feedback_pending" | "completed";

const InternScheduledInteractions = () => {
  const { user } = useAuth();

  const [list, setList] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");

  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      getAllScheduled(),
      fetch("http://localhost:4000/users").then((r) => r.json()),
    ]).then(([scheduled, usersData]) => {
      const allUsers = Array.isArray(usersData)
        ? usersData
        : usersData.users || [];

      setUsers(allUsers);

      const mine = scheduled
        .filter((i: any) => i.internId === user.uid)
        .map((i: any) => ({
          ...i,
          mentorName:
            allUsers.find((u: any) => u.uid === i.mentorId)?.name || "—",
          interviewerName:
            allUsers.find((u: any) => u.uid === i.interviewerId)?.name || "—",
        }));

      setList(mine);
    });
  }, [user]);

  /* ---------------- FILTER ---------------- */
  const filtered = list.filter((i) => {
    if (filter === "all") return true;

    if (filter === "scheduled")
      return i.status === "scheduled";

    if (filter === "feedback_pending")
      return (
        i.status === "scheduled" &&
        i.feedbackStatus === "pending"
      );

    if (filter === "completed")
      return i.status === "completed";

    return true;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Interactions
      </h2>

      {/* FILTERS */}
      <div className="flex gap-3 mb-8">
        {[
          { key: "all", label: "All" },
          { key: "scheduled", label: "Scheduled" },
          { key: "feedback_pending", label: "Feedback Pending" },
          { key: "completed", label: "Completed" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as FilterKey)}
            className={`px-5 py-2 rounded-xl font-semibold ${
              filter === f.key
                ? "bg-[#96C2DB]"
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
          No interactions found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <InternInteractionCard
            key={item.id}
            data={item}
            onGiveFeedback={
            item.status === "completed"
            ? () => {
            setSelectedFeedback(item);
            setViewFeedbackOpen(true);
            }
           : undefined
         }
/>

          ))}
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {viewFeedbackOpen && selectedFeedback && (
        <ViewFeedbackModal
          open={viewFeedbackOpen}
          data={selectedFeedback}
          viewer="intern"
          onClose={() => setViewFeedbackOpen(false)}
        />
      )}
    </div>
  );
};

export default InternScheduledInteractions;
