
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import InteractionInternCard from "./InteractionInternCard";
import ScheduleInteractionModal from "./ScheduleInteractionModal";

const BASE = "http://localhost:4000/interngo";
const ITEMS_PER_PAGE = 12;

const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");

const InteractionInternList = () => {
  const navigate = useNavigate();
  const { interactionId, year, batch } = useParams();

  const [users, setUsers] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [interactionName, setInteractionName] = useState("");

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    fetch(`http://localhost:4000/metricDefinitions/${interactionId}`)
      .then((r) => r.json())
      .then((d) => setInteractionName(d?.name || "Interaction"));
  }, [interactionId]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${BASE}/users`);
      const json = await res.json();

      const all = Array.isArray(json) ? json : json.users || [];
      setUsers(all);

      const interns = all
        .filter(
          (u: any) =>
            u.role === "intern" &&
            String(u.year) === String(year) &&
            normalizeBatch(u.batch || "") === normalizeBatch(batch || "")
        )
        .map((i: any) => ({
          internId: i.uid,
          internName: i.name,
          internEmail: i.email,
          batch: i.batch,
          year: i.year,
          designation: i.designation,
          interactionName,
          scheduled: false,
        }));

      setList(interns);
      setPage(1);
    };

    load();
  }, [year, batch, interactionName]);

  const mentors = users.filter((u) => u.role === "mentor");
  const interviewers = users.filter((u) => u.role === "interviewer");

  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const visible = list.slice(pageStart, pageStart + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  const saveSchedule = (form: any) => {
    setList((prev) =>
      prev.map((i) =>
        i.internId === form.internId
          ? {
              ...i,
              ...form,
              interactionName,
              mentorName:
                mentors.find((m) => m.uid === form.mentorId)?.name,
              interviewerName:
                interviewers.find(
                  (iv) => iv.uid === form.interviewerId
                )?.name,
              scheduled: true,
            }
          : i
      )
    );
    setOpen(false);
  };

  const removeSchedule = () => {
    setList((prev) =>
      prev.map((i) =>
        i.internId === selected.internId
          ? { ...i, scheduled: false }
          : i
      )
    );
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div ref={topRef} />

      <button
        onClick={() =>
          navigate(`/admin/interactions/${interactionId}/year-batch`)
        }
        className="flex items-center gap-2 mb-4 text-[#3B6E8F]"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <h2 className="text-3xl font-bold mb-8">
        Schedule – <span className="text-[#3B6E8F]">{year} / {batch}</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((item) => (
          <InteractionInternCard
            key={item.internId}
            data={item}
            onClick={() => {
              setSelected(item);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          <button onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
          <div className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl">
            {page}
          </div>
          <button onClick={() => page < totalPages && setPage(p => p + 1)}>›</button>
        </div>
      )}

      {open && selected && (
        <ScheduleInteractionModal
          open={open}
          data={selected}
          mentors={mentors}
          interviewers={interviewers}
          interactionName={interactionName}
          onClose={() => setOpen(false)}
          onSave={saveSchedule}
          onRemove={removeSchedule}
        />
      )}
    </div>
  );
};

export default InteractionInternList;





