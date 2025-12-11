// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import InternCard from "../../components/Resources/InternCard";
// import { ChevronLeft } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const BASE = "http://localhost:8080";

// const ITEMS_PER_PAGE = 12;

// const ResourcesList: React.FC = () => {
//   const { year, batch } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const [list, setList] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const topRef = React.useRef<HTMLDivElement>(null);
//   const [searchName, setSearchName] = useState("");
// const [searchDesignation, setSearchDesignation] = useState("");



//   const isInternList = location.pathname.includes("/intern/list");
//   const isMentorList = location.pathname.includes("/mentor/list");
//   const isInterviewerList = location.pathname.includes("/interviewer/list");
//   const scrollToTop = () => {
//   topRef.current?.scrollIntoView({ behavior: "smooth" });
// };

// useEffect(() => {
//   scrollToTop();
// }, [page]);


//   useEffect(() => {
//     if (isInternList) loadInterns();
//     if (isMentorList) loadMentors();
//     if (isInterviewerList) loadInterviewers();
//   }, [year, batch, location.pathname]);

//   // ----------------------------------------
//   // 🟩 LOAD INTERNS (Year + Batch filter)
//   // ----------------------------------------
//   const loadInterns = async () => {
//     const profRes = await fetch(`${BASE}/interngo/professional`);
//     const profList = await profRes.json();

//     const filtered = profList.filter(
//       (p: any) =>
//         p.year === year &&
//         p.batch.toLowerCase() === batch?.toLowerCase()
//     );

//     const profileRes = await fetch(`${BASE}/profiles`);
//     const profiles = await profileRes.json();

//     const final = filtered.map((prof: any) => {
//       const profile = profiles.find((p: any) => p.userId === prof.userId);

//       return {
//         role: "intern",
//         name: profile?.user?.name || "Unknown",
//         email: profile?.user?.email || "",
//         empId: prof.empId,
//         designation: prof.designation,
//         batch: prof.batch,
//         status: prof.status,
//         year: prof.year,
//         userId: prof.userId,
//         profilePicture: profile?.user?.profilePicture || "",
//       };
//     });

//     setList(final);
//   };

//   // ----------------------------------------
//   // 🟦 LOAD MENTORS
//   // ----------------------------------------
//   const loadMentors = async () => {
//     const profileRes = await fetch(`${BASE}/profiles`);
//     const profiles = await profileRes.json();

//     const mentors = profiles.filter((p: any) => p.role === "mentor");

//     const final = mentors.map((m: any) => ({
//       role: "mentor",
//       name: m.user.name,
//       email: m.user.email,
//       primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
//       userId: m.userId,
//       profilePicture: m.user.profilePicture || "",
//     }));

//     setList(final);
//   };

//   // ----------------------------------------
//   // 🟧 LOAD INTERVIEWERS
//   // ----------------------------------------
//   const loadInterviewers = async () => {
//     const profileRes = await fetch(`${BASE}/profiles`);
//     const profiles = await profileRes.json();

//     const interviewers = profiles.filter((p: any) => p.role === "interviewer");

//     const final = interviewers.map((m: any) => ({
//       role: "interviewer",
//       name: m.user.name,
//       email: m.user.email,
//       primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
//       userId: m.userId,
//       profilePicture: m.user.profilePicture || "",
//     }));

//     setList(final);
//   };


//   const filteredList = list.filter((item) => {
//   const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
//   const designationMatch = item.designation
//     ?.toLowerCase()
//     .includes(searchDesignation.toLowerCase());

//   return nameMatch && designationMatch;
// });

//   // Pagination
//   const pageStart = (page - 1) * ITEMS_PER_PAGE;
//   // const visibleList = list.slice(pageStart, pageStart + ITEMS_PER_PAGE);
//   const visibleList = filteredList.slice(pageStart, pageStart + ITEMS_PER_PAGE);


//   const goBack = () => {
//     if (user?.role === "admin") navigate("/admin/resources");
//     if (user?.role === "mentor") navigate("/mentor/resources");
//     if (user?.role === "interviewer") navigate("/interviewer/resources");
//   };

//   return (
//     <>
//     <div ref={topRef}></div>
//       <button
//         onClick={goBack}
//         className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
//       >
//         <ChevronLeft size={20} /> Back
//       </button>
//       {/* HEADER + FILTERS */}
// <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

//   {/* Title */}
//   <h2 className="text-3xl font-bold text-[#1E2A35]">
//     {isInternList && (
//       <>
//         Interns of <span className="text-[#3B6E8F]">{batch}</span> —{" "}
//         <span className="text-[#3B6E8F]">{year}</span>
//       </>
//     )}
//     {isMentorList && <>All <span className="text-[#3B6E8F]">Mentors</span></>}
//     {isInterviewerList && <>All <span className="text-[#3B6E8F]">Interviewers</span></>}
//   </h2>

//   {/* FILTER BAR */}
//   <div className="flex gap-3">
//     <input
//       type="text"
//       placeholder="Search name..."
//       value={searchName}
//       onChange={(e) => {
//         setSearchName(e.target.value);
//         setPage(1);
//       }}
//       className="px-4 py-2 border rounded-xl w-52 bg-white/70 backdrop-blur-md outline-none"
//     />

//     <input
//       type="text"
//       placeholder="Search designation..."
//       value={searchDesignation}
//       onChange={(e) => {
//         setSearchDesignation(e.target.value);
//         setPage(1);
//       }}
//       className="px-4 py-2 border rounded-xl w-52 bg-white/70 backdrop-blur-md outline-none"
//     />
//   </div>
// </div>


//       <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
//         {visibleList.map((item) => (
//           <InternCard key={item.userId} intern={item} onClick={() => {}} />
//         ))}
//       </div>

//      {/* Pagination — minimal clean style */}
// <div className="flex justify-center items-center gap-3 mt-10">

//   {/* Left Arrow */}
//   <button
//     onClick={() => {
//       setPage((p) => Math.max(1, p - 1));
//       scrollToTop();
//     }}
//     disabled={page === 1}
//     className={`w-10 h-10 flex items-center justify-center rounded-xl border 
//       ${page === 1 ? "border-gray-300 text-gray-400" : "border-[#96C2DB] text-[#1E2A35] hover:bg-[#96C2DB]/20"}`}
//   >
//     ‹
//   </button>

//   {/* Active Page */}
//   <div className="w-10 h-10 flex items-center justify-center rounded-xl 
//                   bg-[#96C2DB] text-white font-semibold shadow-md">
//     {page}
//   </div>

//   {/* Right Arrow */}
//   <button
//     onClick={() => {
//       const max = Math.ceil(list.length / ITEMS_PER_PAGE);
//       if (page < max) setPage(page + 1);
//       scrollToTop();
//     }}
//     disabled={page === Math.ceil(list.length / ITEMS_PER_PAGE)}
//     className={`w-10 h-10 flex items-center justify-center rounded-xl border 
//       ${
//         page === Math.ceil(list.length / ITEMS_PER_PAGE)
//           ? "border-gray-300 text-gray-400"
//           : "border-[#96C2DB] text-[#1E2A35] hover:bg-[#96C2DB]/20"
//       }`}
//   >
//     ›
//   </button>
// </div>


//     </>
//   );
// };

// export default ResourcesList;





import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InternCard from "../../components/Resources/InternCard";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BASE = "http://localhost:8080"; // json-server root

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

  // Scroll to top when pagination changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (isInternList) loadInterns();
    if (isMentorList) loadMentors();
    if (isInterviewerList) loadInterviewers();
  }, [year, batch, location.pathname]);

  // ----------------------------------------
  // LOAD INTERNS (Supports year/batch/all)
  // ----------------------------------------
  const loadInterns = async () => {
    console.log(">>> USERS", await (await fetch(`${BASE}/users`)).json());
console.log(">>> PROFILES", await (await fetch(`${BASE}/profiles`)).json());
console.log(">>> PROFESSIONAL", await (await fetch(`${BASE}/interngo/professional`)).json());
console.log(">>> PARAMS", year, batch);

    const profRes = await fetch(`${BASE}/professionalInfo`);
    const profList = await profRes.json();

    // ⭐⭐ CASE: ALL INTERNS — IGNORE PROFESSIONAL/BATCH/YEAR FILTERS ⭐⭐
if (year === "all" && batch === "all") {
  const usersRes = await fetch(`${BASE}/users`);
  const users = await usersRes.json();

  const profileRes = await fetch(`${BASE}/profiles`);
  const profiles = await profileRes.json();

  const profRes = await fetch(`${BASE}/professionalInfo`);
  const professional = await profRes.json();

  const profileMap = new Map();
  profiles.forEach((p: any) => profileMap.set(p.userId, p));

  const professionalMap = new Map();
  professional.forEach((p: any) => professionalMap.set(p.userId, p));

  const interns = users.filter((u: any) => u.role === "intern");

  const fullList = interns.map((u: any) => {
    const key = u.uid || u.id;   // FIXED
    const pro = professionalMap.get(key);
    const prof = profileMap.get(key);

    return {
      role: "intern",
      name: prof?.user?.name || u.name || "Unknown",
      email: u.email || "",
      userId: key,
      empId: pro?.empId || "--",
      designation: pro?.designation || "--",
      batch: pro?.batch || "--",
      status: pro?.status || "--",
      year: pro?.year || "--",
      profilePicture: prof?.user?.profilePicture || "",
    };
  });

  setList(fullList);
  setPage(1);
  return;
}

    let filtered = profList;

    // If year is NOT "all", filter by year
    if (year !== "all") {
      filtered = filtered.filter((p: any) => p.year === year);
    }

    // If batch is NOT "all", filter by batch
    if (batch !== "all") {
      filtered = filtered.filter(
        (p: any) => p.batch.toLowerCase() === batch?.toLowerCase()
      );
    }

    const profileRes = await fetch(`${BASE}/profiles`);
    const profiles = await profileRes.json();

    const final = filtered.map((prof: any) => {
      const profile = profiles.find((p: any) => p.userId === prof.userId);

      return {
        role: "intern",
        name: profile?.user?.name || "Unknown",
        email: profile?.user?.email || "",
        empId: prof.empId,
        designation: prof.designation,
        batch: prof.batch,
        status: prof.status,
        year: prof.year,
        userId: prof.userId,
        profilePicture: profile?.user?.profilePicture || "",
      };
    });

    setList(final);
    setPage(1);
  };

  // ----------------------------------------
  // LOAD MENTORS
  // ----------------------------------------
  // const loadMentors = async () => {
  //   const profileRes = await fetch(`${BASE}/profiles`);
  //   const profiles = await profileRes.json();

  //   const mentors = profiles.filter((p: any) => p.role === "mentor");

  //   const final = mentors.map((m: any) => ({
  //     role: "mentor",
  //     name: m.user.name,
  //     email: m.user.email,
  //     primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
  //     userId: m.userId,
  //     profilePicture: m.user.profilePicture || "",
  //   }));

  //   setList(final);
  //   setPage(1);
  // };


  const loadMentors = async () => {
  const usersRes = await fetch(`${BASE}/users`);
  const users = await usersRes.json();

  const profileRes = await fetch(`${BASE}/profiles`);
  const profiles = await profileRes.json();

  const professionalRes = await fetch(`${BASE}/professionalInfo`);
  const professional = await professionalRes.json();

  const mentors = users.filter((u: any) => u.role === "mentor");

  const final = mentors.map((u: any) => {
    const id = u.uid || u.id;

    const profile = profiles.find((p: any) => p.userId === id);
    const pro = professional.find((p: any) => p.userId === id);

    return {
      role: "mentor",
      userId: id,
      name: profile?.user?.name || u.email.split("@")[0] || "--",
      email: u.email,
      primarySkill: profile?.skills?.primarySkills?.[0] || "--",
      designation: pro?.designation || "--",
      batch: pro?.batch || "--",
      year: pro?.year || "--",
      status: pro?.status || "--",
      profilePicture: profile?.user?.profilePicture || "",
    };
  });

  setList(final);
  setPage(1);
};


  // ----------------------------------------
  // LOAD INTERVIEWERS
  // ----------------------------------------
  // const loadInterviewers = async () => {
  //   const profileRes = await fetch(`${BASE}/profiles`);
  //   const profiles = await profileRes.json();

  //   const interviewers = profiles.filter((p: any) => p.role === "interviewer");

  //   const final = interviewers.map((m: any) => ({
  //     role: "interviewer",
  //     name: m.user.name,
  //     email: m.user.email,
  //     primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
  //     userId: m.userId,
  //     profilePicture: m.user.profilePicture || "",
  //   }));

  //   setList(final);
  //   setPage(1);
  // };


  const loadInterviewers = async () => {
  const usersRes = await fetch(`${BASE}/users`);
  const users = await usersRes.json();

  const profileRes = await fetch(`${BASE}/profiles`);
  const profiles = await profileRes.json();

  const professionalRes = await fetch(`${BASE}/professionalInfo`);
  const professional = await professionalRes.json();

  const interviewers = users.filter((u: any) => u.role === "interviewer");

  const final = interviewers.map((u: any) => {
    const id = u.uid || u.id;

    const profile = profiles.find((p: any) => p.userId === id);
    const pro = professional.find((p: any) => p.userId === id);

    return {
      role: "interviewer",
      userId: id,
      name: profile?.user?.name || u.email.split("@")[0] || "--",
      email: u.email,
      primarySkill: profile?.skills?.primarySkills?.[0] || "--",
      designation: pro?.designation || "--",
      batch: pro?.batch || "--",
      year: pro?.year || "--",
      status: pro?.status || "--",
      profilePicture: profile?.user?.profilePicture || "",
    };
  });

  setList(final);
  setPage(1);
};

  // ----------------------------------------
  // FILTER BAR
  // ----------------------------------------
  const filteredList = list.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
    const designationMatch = item.designation
      ?.toLowerCase()
      .includes(searchDesignation.toLowerCase());

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


  // ----------------------------------------
  // HEADER TITLE
  // ----------------------------------------
  const renderTitle = () => {
    if (isMentorList) return <>All <span className="text-[#3B6E8F]">Mentors</span></>;
    if (isInterviewerList) return <>All <span className="text-[#3B6E8F]">Interviewers</span></>;

    if (year === "all") {
      return <>All <span className="text-[#3B6E8F]">Interns</span></>;
    }

    return (
      <>
        Interns of <span className="text-[#3B6E8F]">{batch}</span> —{" "}
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
