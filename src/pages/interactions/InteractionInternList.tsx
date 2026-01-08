





// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft } from "lucide-react";
// import Toast from "../../components/Toast";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
// import ViewFeedbackModal from "../../components/interactions/ViewFeedbackModal";

// import {
//   scheduleInteraction,
//   removeInteraction,
//   getScheduledByInteraction,
// } from "../../api/interactionsApi";

// import InteractionInternCard from "./InteractionInternCard";
// import InteractionScheduleCard from "./InteractionScheduleCard";
// import ScheduleInteractionModal from "./ScheduleInteractionModal";

// const normalizeBatch = (batch: string) =>
//   batch.toLowerCase().replace(/[\s-_]/g, "");

// type TabKey = "not_scheduled" | "scheduled" | "completed";
// const ITEMS_PER_PAGE = 12;





// const InteractionInternList = () => {
//   const navigate = useNavigate();
//   const { interactionId, year, batch } = useParams<{
//     interactionId: string;
//     year: string;
//     batch: string;
//   }>();
//   const [toast, setToast] = useState({
//   show: false,
//   message: "",
//   type: "success" as "success" | "error",
// });
// const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
// const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

// const [confirmOpen, setConfirmOpen] = useState(false);

// const [refreshKey, setRefreshKey] = useState(0);
// const [page, setPage] = useState(1);


//   const [interactionName, setInteractionName] = useState("");
//   const [metricId, setMetricId] = useState<string | null>(null);

//   const [users, setUsers] = useState<any[]>([]);
//   const [interns, setInterns] = useState<any[]>([]);
//   const [scheduledMap, setScheduledMap] =
//     useState<Record<string, any>>({});

//   const [activeTab, setActiveTab] =
//     useState<TabKey>("not_scheduled");

//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<any>(null);

//   /* ---------------- FETCH METRIC ---------------- */
//   useEffect(() => {
//     if (!interactionId) return;

//     fetch(`http://localhost:4000/metricDefinitions/${interactionId}`)
//       .then((r) => r.json())
//       .then((d) => {
//         setInteractionName(d?.name || "Interaction");
//         setMetricId(String(d?.id));
//       });
//   }, [interactionId]);

//   /* ---------------- FETCH USERS + INTERNS ---------------- */
//   useEffect(() => {
//     const load = async () => {
//       const usersRes = await fetch("http://localhost:4000/users");
//       const usersJson = await usersRes.json();
//       const all = Array.isArray(usersJson)
//         ? usersJson
//         : usersJson.users || [];

//       setUsers(all);

//       const internsList = all
//         .filter(
//           (u: any) =>
//             u.role === "intern" &&
//             String(u.year) === String(year) &&
//             normalizeBatch(u.batch || "") === normalizeBatch(batch || "")
//         )
//         .map((i: any) => ({
//           internId: i.uid,
//           internName: i.name,
//           internEmail: i.email,
//           batch: i.batch,
//           year: i.year,
//           designation: i.designation,
//         }));

//       setInterns(internsList);
//     };

//     load();
//   }, [year, batch]);

//   /* ---------------- FETCH SCHEDULED ---------------- */

// useEffect(() => {
//   if (!interactionId) return;

//   getScheduledByInteraction(interactionId).then((scheduled) => {
//     const map: Record<string, any> = {};
//     scheduled.forEach((s: any) => {
//       map[`${s.internId}_${s.interactionId}`] = s;
//     });
//     setScheduledMap(map);
//   });
// }, [interactionId, open, refreshKey]); 



//   /* ---------------- MERGED LIST ---------------- */
 

//   const merged = interns.map((intern) => {
//   const scheduled =
//     scheduledMap[`${intern.internId}_${interactionId}`];

//   if (!scheduled) {
//     return { ...intern, status: "not_scheduled" };
//   }
//   const mentorName =
//     users.find((u) => u.uid === scheduled.mentorId)?.name || "—";

//   const interviewerName =
//     users.find((u) => u.uid === scheduled.interviewerId)?.name || "—";

//   return {
//     ...intern,
//     ...scheduled, 
//     mentorName,
//     interviewerName,
//     status: scheduled.status || "scheduled",
//   };
// });


//   /* ---------------- FILTER BY TAB ---------------- */
//   const filtered = merged.filter((item) => {
//     if (activeTab === "not_scheduled")
//       return item.status === "not_scheduled";
//     if (activeTab === "scheduled")
//       return item.status === "scheduled";
//     if (activeTab === "completed")
//       return item.status === "completed";
//     return false;
//   });

//   const mentors = users.filter((u) => u.role === "mentor");
//   const interviewers = users.filter((u) => u.role === "interviewer");
// useEffect(() => {
//   setPage(1);
// }, [activeTab, filtered.length]);

//   const removeSchedule = async () => {
//     if (!selected?.id) return;
//     await removeInteraction(selected.id);
//     setOpen(false);
//   };

// const confirmDelete = async () => {
//   if (!selected?.id) return;

//   await removeInteraction(selected.id);

//   setToast({
//     show: true,
//     message: "Interaction removed successfully",
//     type: "success",
//   });

//   setConfirmOpen(false);

//   setRefreshKey((k) => k + 1);

//   setTimeout(() => {
//     setToast((t) => ({ ...t, show: false }));
//   }, 2000);
// };


// const totalPages = Math.ceil(
//   filtered.length / ITEMS_PER_PAGE
// );

// const pageStart = (page - 1) * ITEMS_PER_PAGE;

// const paginated = filtered.slice(
//   pageStart,
//   pageStart + ITEMS_PER_PAGE
// );


//   const saveSchedule = async (form: any) => {
//   const payload = {
//     ...form,
//     interactionId,
//     metricId,
//     interactionName,
//   };

//   try {
//     await scheduleInteraction(payload);

//     setToast({
//       show: true,
//       message: "Interaction scheduled successfully",
//       type: "success",
//     });

//     setOpen(false);

//     setTimeout(() => {
//       setToast((t) => ({ ...t, show: false }));
//     }, 2000);
//   } catch (err: any) {
//     setToast({
//       show: true,
//       message: err.message || "Scheduling failed",
//       type: "error",
//     });

//     setTimeout(() => {
//       setToast((t) => ({ ...t, show: false }));
//     }, 3000);
//   }
// };


// const getPageNumbers = () => {
//   const pages: number[] = [];

//   const start = Math.max(1, page - 2);
//   const end = Math.min(totalPages, page + 2);

//   for (let i = start; i <= end; i++) {
//     pages.push(i);
//   }

//   return pages;
// };

//   return (
//     <div className="p-6">
//       {/* BACK */}
//       <button
//         onClick={() =>
//           navigate(`/admin/interactions/${year}/${batch}`)
//         }
//         className="flex items-center gap-2 mb-4 text-[#3B6E8F]"
//       >
//         <ChevronLeft size={20} /> Back
//       </button>
// <h2 className="text-3xl font-bold mb-4">
//   {interactionName}
// </h2>

// <div className="flex items-center justify-between mb-8">
//   {/* LEFT: Year + Batch */}
//   <p className="text-gray-600">
//     Year: <b>{year}</b> | Batch: <b>{batch}</b>
//   </p>

//   {/* RIGHT: Tabs */}
//   <div className="flex gap-3">
//     {[
//       { key: "not_scheduled", label: "Not Scheduled" },
//       { key: "scheduled", label: "Scheduled" },
//       { key: "completed", label: "Completed" },
//     ].map((t) => (
//       <button
//         key={t.key}
//         onClick={() => {
//           setActiveTab(t.key as TabKey);
//           setPage(1);
//         }}
//         className={`px-5 py-2 rounded-xl font-semibold transition ${
//           activeTab === t.key
//             ? "bg-[#96C2DB] shadow"
//             : "bg-white border hover:bg-gray-100"
//         }`}
//       >
//         {t.label}
//       </button>
//     ))}
//   </div>
// </div>

//       {/* ---------------- GRID ---------------- */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-500">
//           No records in this section.
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {paginated.map((item) =>
//             activeTab === "not_scheduled" ? (
//               <InteractionInternCard
//                 key={item.internId}
//                 data={item}
//                 onClick={() => {
//                   setSelected(item);
//                   setOpen(true);
//                 }}
//               />
//             ) : (
//                   <InteractionScheduleCard
//   key={item.id}
//   data={item}
//   hideActions={activeTab === "completed"}   // 🔥 MAGIC LINE
//   onEdit={
//     activeTab !== "completed"
//       ? () => {
//           setSelected(item);
//           setOpen(true);
//         }
//       : undefined
//   }
//   onDelete={
//     activeTab !== "completed"
//       ? () => {
//           setSelected(item);
//           setConfirmOpen(true);
//         }
//       : undefined
//   }
//   onViewFeedback={
//     activeTab === "completed"
//       ? () => {
//           setSelectedFeedback(item);
//           setViewFeedbackOpen(true);
//         }
//       : undefined
//   }
// />



//             )
//           )}
//         </div>
//       )}

// {totalPages > 1 && (
//   <div className="flex justify-center items-center gap-2 mt-10">
//     {/* PREV */}
//     <button
//       disabled={page === 1}
//       onClick={() => setPage((p) => p - 1)}
//       className="px-3 py-1 rounded-lg border disabled:opacity-40"
//     >
//       ‹
//     </button>

//     {/* PAGE NUMBERS */}
//     {getPageNumbers().map((p) => (
//       <button
//         key={p}
//         onClick={() => setPage(p)}
//         className={`px-3 py-1 rounded-lg font-semibold ${
//           p === page
//             ? "bg-[#96C2DB] text-black"
//             : "bg-white border hover:bg-gray-100"
//         }`}
//       >
//         {p}
//       </button>
//     ))}

//     {/* NEXT */}
//     <button
//       disabled={page === totalPages}
//       onClick={() => setPage((p) => p + 1)}
//       className="px-3 py-1 rounded-lg border disabled:opacity-40"
//     >
//       ›
//     </button>
//   </div>
// )}


//       {/* ---------------- MODAL ---------------- */}
//       {open && selected && (
//         <ScheduleInteractionModal
//           open={open}
//           data={selected}
//           mentors={mentors}
//           interviewers={interviewers}
//           interactionName={interactionName}
//           onClose={() => setOpen(false)}
//           onSave={saveSchedule}
//           onRemove={removeSchedule}
//         />
//       )}

//       <Toast
//   show={toast.show}
//   message={toast.message}
//   type={toast.type}
// />

// <ConfirmDeleteModal
//   open={confirmOpen}
//   onCancel={() => setConfirmOpen(false)}
//   onConfirm={confirmDelete}
// />
// {viewFeedbackOpen && selectedFeedback && (
//   <ViewFeedbackModal
//     open={viewFeedbackOpen}
//     data={selectedFeedback}
//     viewer="admin"
//     onClose={() => setViewFeedbackOpen(false)}
//   />
// )}

//     </div>
//   );
// };

// export default InteractionInternList;




///after flow chnage 


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import Toast from "../../components/Toast";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import ViewFeedbackModal from "../../components/interactions/ViewFeedbackModal";

import {
  scheduleInteraction,
  deleteScheduledInteraction,
  getScheduledByInteraction,
} from "../../api/scheduledInteractionsApi";

import InteractionInternCard from "./InteractionInternCard";
import InteractionScheduleCard from "./InteractionScheduleCard";
import ScheduleInteractionModal from "./ScheduleInteractionModal";

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");

type TabKey = "not_scheduled" | "scheduled" | "completed";
const ITEMS_PER_PAGE = 12;

const InteractionInternList = () => {
  const navigate = useNavigate();
  const { interactionId, year, batch } = useParams<{
    interactionId: string;
    year: string;
    batch: string;
  }>();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(1);

  const [interactionName, setInteractionName] =
    useState("Interaction");
    const [metricIds, setMetricIds] = useState<string[]>([]);


  const [users, setUsers] = useState<any[]>([]);
  const [interns, setInterns] = useState<any[]>([]);
  const [scheduledMap, setScheduledMap] =
    useState<Record<string, any>>({});

  const [activeTab, setActiveTab] =
    useState<TabKey>("not_scheduled");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  /* ---------------- FETCH INTERACTION NAME ---------------- */
  useEffect(() => {
    if (!interactionId) return;

    fetch(`http://localhost:4000/interactions/${interactionId}`)
      .then((r) => r.json())
      .then((d) => {
        setInteractionName(d?.name || "Interaction");
        setMetricIds(d?.metricIds || []);
      });
  }, [interactionId]);

  /* ---------------- FETCH USERS + INTERNS ---------------- */
  useEffect(() => {
    const load = async () => {
      const usersRes = await fetch(
        "http://localhost:4000/users"
      );
      const usersJson = await usersRes.json();
      const all = Array.isArray(usersJson)
        ? usersJson
        : usersJson.users || [];

      setUsers(all);

      const internsList = all
        .filter(
          (u: any) =>
            u.role === "intern" &&
            String(u.year) === String(year) &&
            normalizeBatch(u.batch || "") ===
              normalizeBatch(batch || "")
        )
        .map((i: any) => ({
          internId: i.uid,
          internName: i.name,
          internEmail: i.email,
          batch: i.batch,
          year: i.year,
          designation: i.designation,
        }));

      setInterns(internsList);
    };

    load();
  }, [year, batch]);

  /* ---------------- FETCH SCHEDULED ---------------- */
  useEffect(() => {
    if (!interactionId) return;

    getScheduledByInteraction(interactionId).then(
      (scheduled) => {
        const map: Record<string, any> = {};
        scheduled.forEach((s: any) => {
          map[`${s.internId}_${s.interactionId}`] = s;
        });
        setScheduledMap(map);
      }
    );
  }, [interactionId, open, refreshKey]);

  /* ---------------- MERGED LIST ---------------- */
  const merged = interns.map((intern) => {
    const scheduled =
      scheduledMap[`${intern.internId}_${interactionId}`];

    if (!scheduled) {
      return { ...intern, status: "not_scheduled" };
    }

    const mentorName =
      users.find((u) => u.uid === scheduled.mentorId)
        ?.name || "—";

    const interviewerName =
      users.find(
        (u) => u.uid === scheduled.interviewerId
      )?.name || "—";

    return {
      ...intern,
      ...scheduled,
      mentorName,
      interviewerName,
      status: scheduled.status || "scheduled",
    };
  });

  /* ---------------- FILTER BY TAB ---------------- */
  const filtered = merged.filter((item) => {
    if (activeTab === "not_scheduled")
      return item.status === "not_scheduled";
    if (activeTab === "scheduled")
      return item.status === "scheduled";
    if (activeTab === "completed")
      return item.status === "completed";
    return false;
  });

  const mentors = users.filter((u) => u.role === "mentor");
  const interviewers = users.filter(
    (u) => u.role === "interviewer"
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, filtered.length]);

  /* ---------------- DELETE SCHEDULE ---------------- */
  const confirmDelete = async () => {
    if (!selected?.id) return;

    await deleteScheduledInteraction(selected.id);

    setToast({
      show: true,
      message: "Interaction removed successfully",
      type: "success",
    });

    setConfirmOpen(false);
    setRefreshKey((k) => k + 1);

    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2000);
  };

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE
  );

  /* ---------------- SAVE SCHEDULE ---------------- */
  const saveSchedule = async (form: any) => {
    try {
      await scheduleInteraction({
        ...form,
        interactionId,
        interactionName,
      });

      setToast({
        show: true,
        message: "Interaction scheduled successfully",
        type: "success",
      });

      setOpen(false);
      setRefreshKey((k) => k + 1);

      setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 2000);
    } catch (err: any) {
      setToast({
        show: true,
        message: err.message || "Scheduling failed",
        type: "error",
      });

      setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 3000);
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6">
      {/* BACK */}
      <button
        onClick={() =>
          navigate(`/admin/interactions/${year}/${batch}`)
        }
        className="flex items-center gap-2 mb-4 text-[#3B6E8F]"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <h2 className="text-3xl font-bold mb-4">
        {interactionName}
      </h2>

      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600">
          Year: <b>{year}</b> | Batch: <b>{batch}</b>
        </p>

        <div className="flex gap-3">
          {[
            { key: "not_scheduled", label: "Not Scheduled" },
            { key: "scheduled", label: "Scheduled" },
            { key: "completed", label: "Completed" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() =>
                setActiveTab(t.key as TabKey)
              }
              className={`px-5 py-2 rounded-xl font-semibold ${
                activeTab === t.key
                  ? "bg-[#96C2DB]"
                  : "bg-white border"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">
          No records in this section.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((item) =>
            activeTab === "not_scheduled" ? (
              <InteractionInternCard
                key={item.internId}
                data={item}
                onClick={() => {
                  setSelected(item);
                  setOpen(true);
                }}
              />
            ) : (
              <InteractionScheduleCard
                key={item.id}
                data={item}
                hideActions={activeTab === "completed"}
                onEdit={
                  activeTab !== "completed"
                    ? () => {
                        setSelected(item);
                        setOpen(true);
                      }
                    : undefined
                }
                onDelete={
                  activeTab !== "completed"
                    ? () => {
                        setSelected(item);
                        setConfirmOpen(true);
                      }
                    : undefined
                }
                onViewFeedback={
                  activeTab === "completed"
                    ? () => {
                        setSelectedFeedback(item);
                        setViewFeedbackOpen(true);
                      }
                    : undefined
                }
              />
            )
          )}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹
          </button>

          {getPageNumbers().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                p === page ? "font-bold" : ""
              }
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      )}

      {/* MODAL */}
      {open && selected && (
        <ScheduleInteractionModal
          open={open}
          data={selected}
          mentors={mentors}
          interviewers={interviewers}
          interactionId={interactionId!}
          interactionName={interactionName}
          onClose={() => setOpen(false)}
          metricIds={metricIds}
          onSave={saveSchedule}
        />
      )}

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />

      {viewFeedbackOpen && selectedFeedback && (
        <ViewFeedbackModal
          open={viewFeedbackOpen}
          data={selectedFeedback}
          viewer="admin"
          onClose={() => setViewFeedbackOpen(false)}
        />
      )}
    </div>
  );
};

export default InteractionInternList;
