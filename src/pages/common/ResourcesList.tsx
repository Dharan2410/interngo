import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InternCard from "../../components/Resources/InternCard";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BASE = "http://localhost:4000"; // json-server root

const ITEMS_PER_PAGE = 12;

const ResourcesList: React.FC = () => {
  const { year, batch } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [list, setList] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [page, setPage] = useState(1);

  const topRef = useRef<HTMLDivElement>(null);

  const isInternList = location.pathname.includes("/intern/list");
  const isMentorList = location.pathname.includes("/mentor/list");
  const isInterviewerList = location.pathname.includes("/interviewer/list");
  const normalizeBatch = (batch: string) =>
  batch.toLowerCase().replace(/[\s-_]/g, "");


  // Scroll to top when pagination changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (isInternList) loadInterns();
    if (isMentorList) loadMentors();
    if (isInterviewerList) loadInterviewers();
  }, [year, batch, location.pathname]);

 
const mapIntern = (u: any) => ({
  role: "intern",
  name: u.name,
  email: u.email,
  userId: u.uid,
  empId: u.empId || "--",
  designation: u.designation || "--",
  batch: u.batch || "--",
  year: u.year || "--",
  status: u.activeStatus ? "Active" : "Inactive",
  profilePicture: u.profileImage || "",
});




const loadInterns = async () => {
  const res = await fetch(`${BASE}/users`);
  const users = await res.json();

  // 1️⃣ Only interns
  const interns = users.filter((u: any) => u.role === "intern");

  // 2️⃣ Not Assigned interns (pure data logic)
  const notAssignedInterns = interns.filter(
    (u: any) =>
      !u.year ||
      !u.batch ||
      u.year === "N/A" ||
      u.batch === "N/A"
  );

  // 3️⃣ Default list → ALL interns
  let finalInterns = interns;

  // 4️⃣ If route is "not-assigned"
  if (year === "not-assigned") {
    finalInterns = notAssignedInterns;
  } 
  else {
    // 5️⃣ Apply YEAR filter only if it exists
    if (year) {
      finalInterns = finalInterns.filter(
        (u: any) => u.year === year
      );
    }

    // 6️⃣ Apply BATCH filter only if it exists
    if (batch) {
  finalInterns = finalInterns.filter(
    (u: any) =>
      normalizeBatch(u.batch || "") === normalizeBatch(batch)
  );
}

  }

  // 7️⃣ Map for UI
  // setList(
  //   finalInterns.map((u: any) => ({
  //     role: "intern",
  //     name: u.name,
  //     email: u.email,
  //     userId: u.uid,
  //     empId: u.empId || "--",
  //     designation: u.designation || "--",
  //     batch: u.batch || "--",
  //     year: u.year || "--",
  //     status: u.activeStatus ? "Active" : "Inactive",
  //     profilePicture: u.profileImage || "",
  //   }))
  // );
  setList(finalInterns.map(mapIntern));


  setPage(1);
};


const loadMentors = async () => {
  const usersRes = await fetch(`${BASE}/users`);
  const users = await usersRes.json();

  const mentors = users.filter((u: any) => u.role === "mentor");

  setList(
    mentors.map((u: any) => ({
      role: "mentor",
      name: u.name,
      email: u.email,
      userId: u.uid,
      designation: u.designation,
      batch: u.batch,
      year: u.year,
      status: u.activeStatus ? "Active" : "Inactive",
      profilePicture: u.profileImage,
      primarySkill: u.primaryskills?.[0] || "--",
    }))
  );

  setPage(1);
};





const loadInterviewers = async () => {
  const usersRes = await fetch(`${BASE}/users`);
  const users = await usersRes.json();

  const interviewers = users.filter((u: any) => u.role === "interviewer");

  setList(
    interviewers.map((u: any) => ({
      role: "interviewer",
      name: u.name,
      email: u.email,
      userId: u.uid,
      designation: u.designation,
      batch: u.batch,
      year: u.year,
      status: u.activeStatus ? "Active" : "Inactive",
      profilePicture: u.profileImage,
      primarySkill: u.primaryskills?.[0] || "--",
    }))
  );

  setPage(1);
};

  // ----------------------------------------
  // FILTER BAR
  // ----------------------------------------
  // const filteredList = list.filter((item) => {
  //   const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
  //   const designationMatch = item.designation
  //     ?.toLowerCase()
  //     .includes(searchDesignation.toLowerCase());

  //   return nameMatch && designationMatch;
  // });


  const filteredList = list.filter((item) => {
  const nameMatch =
    !searchName ||
    item.name?.toLowerCase().includes(searchName.toLowerCase());

  const designationMatch =
    !searchDesignation ||
    item.designation?.toLowerCase().includes(searchDesignation.toLowerCase());

  return nameMatch && designationMatch;
});


  // PAGINATION
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const visibleList = filteredList.slice(pageStart, pageStart + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

 

  const goBack = () => {
  if (user?.role === "admin") {
    // If admin is inside intern listing (any year/batch or all/all)
    if (isInternList) {
      navigate("/admin/resources/intern/select"); 
      return;
    }
    navigate("/admin/resources"); // default fallback
    return;
  }

  if (user?.role === "mentor") {
    navigate("/mentor/resources");
    return;
  }

  if (user?.role === "interviewer") {
    navigate("/interviewer/resources");
    return;
  }
};


 


  const renderTitle = () => {
  if (isMentorList) {
    return <>All <span className="text-[#3B6E8F]">Mentors</span></>;
  }

  if (isInterviewerList) {
    return <>All <span className="text-[#3B6E8F]">Interviewers</span></>;
  }

  // ✅ ALL INTERNS
  if (!year || year === "all") {
    return <>All <span className="text-[#3B6E8F]">Interns</span></>;
  }

  // ✅ YEAR + BATCH
  return (
    <>
      Interns of{" "}
      <span className="text-[#3B6E8F]">{batch}</span>{" "}
      -{" "}
      <span className="text-[#3B6E8F]">{year}</span>
    </>
  );
};

  return (
    <>
      <div ref={topRef}></div>

      {/* BACK */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
      >
        <ChevronLeft size={20} /> Back
      </button>

      {/* HEADER + SEARCH */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-[#1E2A35]">{renderTitle()}</h2>

        {/* SEARCH FILTERS */}
        {isInternList && (
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search name..."
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border rounded-xl w-52 bg-white/70 backdrop-blur-md outline-none"
            />

            <input
              type="text"
              placeholder="Search designation..."
              value={searchDesignation}
              onChange={(e) => {
                setSearchDesignation(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border rounded-xl w-52 bg-white/70 backdrop-blur-md outline-none"
            />
          </div>
        )}
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {visibleList.map((item) => (
          // <InternCard key={item.userId} intern={item} onClick={() => {}} />
          <InternCard
  key={item.userId}
  intern={item}
  onClick={() => {
    if (user?.role === "admin") navigate(`/admin/profile/${item.userId}`);
    if (user?.role === "mentor") navigate(`/mentor/profile/${item.userId}`);
    if (user?.role === "interviewer") navigate(`/interviewer/profile/${item.userId}`);
  }}
/>

        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {/* Left Arrow */}
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border 
            ${
              page === 1
                ? "border-gray-300 text-gray-400"
                : "border-[#96C2DB] text-[#1E2A35] hover:bg-[#96C2DB]/20"
            }`}
        >
          ‹
        </button>

        {/* Active Page */}
        <div className="w-10 h-10 flex items-center justify-center rounded-xl 
                        bg-[#96C2DB] text-white font-semibold shadow-md">
          {page}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border 
            ${
              page === totalPages
                ? "border-gray-300 text-gray-400"
                : "border-[#96C2DB] text-[#1E2A35] hover:bg-[#96C2DB]/20"
            }`}
        >
          ›
        </button>
      </div>
    </>
  );
};

export default ResourcesList;
