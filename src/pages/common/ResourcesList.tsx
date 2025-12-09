// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import InternCard from "../../components/Resources/InternCard";
// import { ChevronLeft } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const BASE = "http://localhost:8080/interngo";

// const extractYear = (value: string): string => {
//   if (!value) return "";
//   const year = value.replace(/\D/g, "");
//   return year.length === 4 ? year : "";
// };

// const ITEMS_PER_PAGE = 12;

// const ResourcesList: React.FC = () => {
//   const { batch } = useParams(); // this will be "2025"
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [interns, setInterns] = useState<any[]>([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     // 1. Load all professional info
//     fetch(`${BASE}/professional`)
//       .then((res) => res.json())
//       .then((profList) => {
//         // filter interns by batch year
//         const filtered = profList.filter(
//           (p: any) => extractYear(p.batch) === batch
//         );

//         // 2. Fetch profile info for each intern
//         Promise.all(
//           filtered.map(async (prof: any) => {
//             const res = await fetch(
//               `${BASE}/profile/intern/${prof.userId}`
//             );
//             const profile = await res.json();

//             // return {
//             //   name: profile?.user?.name || "Unknown",
//             //   empId: prof.empId,
//             //   designation: prof.designation,
//             //   batch: prof.batch,
//             //   status: prof.status,
//             //   userId: prof.userId
//             // };
//           return {
//   name: profile?.user?.name || "Unknown",
//   empId: prof.empId,
//   designation: prof.designation,
//   batch: prof.batch,
//   status: prof.status,
//   userId: prof.userId,
//   profilePicture: profile?.user?.profilePicture || ""
// };


//           })
//         ).then((final) => setInterns(final));
//       });
//   }, [batch]);

//   const pageStart = (page - 1) * ITEMS_PER_PAGE;
//   const visibleInterns = interns.slice(pageStart, pageStart + ITEMS_PER_PAGE);

//   const goBack = () => {
//     if (user?.role === "admin") navigate("/admin/resources");
//     else if (user?.role === "mentor") navigate("/mentor/resources");
//     else if (user?.role === "interviewer") navigate("/interviewer/resources");
//   };

//   const openProfile = (uid: string) => {
//     navigate(`/admin/profile/intern/${uid}`); // open profile module
//   };

//   return (
//     <>
//       {/* BACK BUTTON */}
//       <button
//         onClick={goBack}
//         className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
//       >
//         <ChevronLeft size={20} /> Back
//       </button>

//       {/* HEADER */}
//       <h2 className="text-3xl font-bold text-[#1E2A35] mb-6">
//         Interns of Batch <span className="text-[#3B6E8F]">{batch}</span>
//       </h2>

//       {/* GRID */}
//       <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
//         {visibleInterns.map((intern) => (
//           <InternCard
//             key={intern.userId}
//             intern={intern}
//             onClick={() => openProfile(intern.userId)}
//           />
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
//         >
//           Prev
//         </button>

//         <button
//           onClick={() =>
//             setPage((p) =>
//               p < Math.ceil(interns.length / ITEMS_PER_PAGE) ? p + 1 : p
//             )
//           }
//           disabled={page === Math.ceil(interns.length / ITEMS_PER_PAGE)}
//           className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default ResourcesList;





// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import InternCard from "../../components/Resources/InternCard";
// import { ChevronLeft } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const BASE = "http://localhost:8080/interngo";

// // Extracts "2025" from "Batch 2025", "2025", etc.
// const extractYear = (value: string): string => {
//   if (!value) return "";
//   const year = value.replace(/\D/g, "");
//   return year.length === 4 ? year : "";
// };

// const ITEMS_PER_PAGE = 12;

// const ResourcesList: React.FC = () => {
//   const { batch } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const [list, setList] = useState<any[]>([]);
//   const [page, setPage] = useState(1);

//   // Determine what page we are on
//   const path = location.pathname;

//   const isInternList = path.includes("/intern/list");
//   const isMentorList = path.includes("/mentor/list");
//   const isInterviewerList = path.includes("/interviewer/list");

//   useEffect(() => {
//     if (isInternList) {
//       loadInterns();
//     } else if (isMentorList) {
//       loadMentors();
//     } else if (isInterviewerList) {
//       loadInterviewers();
//     }
//   }, [batch, path]);

//   // ---------------------------
//   // 🔹 INTERN LIST MODE
//   // ---------------------------
//   const loadInterns = async () => {
//     const profRes = await fetch(`${BASE}/professional`);
//     const profList = await profRes.json();

//     // Filter by selected batch
//     const filtered = profList.filter(
//       (p: any) => extractYear(p.batch) === batch
//     );

//     // Fetch profile details for each intern
//     const final = await Promise.all(
//       filtered.map(async (prof: any) => {
//         const res = await fetch(`${BASE}/profile/intern/${prof.userId}`);
//         const profile = await res.json();

//         return {
//           name: profile?.user?.name || "Unknown",
//           empId: prof.empId,
//           designation: prof.designation,
//           batch: prof.batch,
//           status: prof.status,
//           userId: prof.userId,
//           profilePicture: profile?.user?.profilePicture || "",
//         };
//       })
//     );

//     setList(final);
//   };

//   // ---------------------------
//   // 🔹 MENTOR LIST MODE
//   // ---------------------------
//   const loadMentors = async () => {
//     const userRes = await fetch(`${BASE.replace("/interngo", "")}/interngo/users`);
//     const users = await userRes.json();

//     const mentors = users.filter((u: any) => u.role === "mentor");

//     const final = await Promise.all(
//       mentors.map(async (mentor: any) => {
//         const res = await fetch(`${BASE}/profile/mentor/${mentor.uid}`).catch(() => null);
//         const profile = res ? await res.json() : null;

//         return {
//           name: profile?.user?.name || mentor.email,
//           empId: mentor.uid,
//           designation: "Mentor",
//           batch: "",
//           status: "Active",
//           userId: mentor.uid,
//           profilePicture: profile?.user?.profilePicture || "",
//         };
//       })
//     );

//     setList(final);
//   };

//   // ---------------------------
//   // 🔹 INTERVIEWER LIST MODE
//   // ---------------------------
//   const loadInterviewers = async () => {
//     const userRes = await fetch(`${BASE.replace("/interngo", "")}/interngo/users`);
//     const users = await userRes.json();

//     const interviewers = users.filter((u: any) => u.role === "interviewer");

//     const final = await Promise.all(
//       interviewers.map(async (inter: any) => {
//         const res = await fetch(`${BASE}/profile/interviewer/${inter.uid}`).catch(() => null);
//         const profile = res ? await res.json() : null;

//         return {
//           name: profile?.user?.name || inter.email,
//           empId: inter.uid,
//           designation: "Interviewer",
//           batch: "",
//           status: "Active",
//           userId: inter.uid,
//           profilePicture: profile?.user?.profilePicture || "",
//         };
//       })
//     );

//     setList(final);
//   };

//   const pageStart = (page - 1) * ITEMS_PER_PAGE;
//   const visibleList = list.slice(pageStart, pageStart + ITEMS_PER_PAGE);

//   const goBack = () => {
//     if (user?.role === "admin") navigate("/admin/resources");
//     else if (user?.role === "mentor") navigate("/mentor/resources");
//     else if (user?.role === "interviewer") navigate("/interviewer/resources");
//   };

//   const openProfile = (uid: string) => {
//     navigate(`/admin/profile/${uid}`);
//   };

//   return (
//     <>
//       {/* Back Button */}
//       <button
//         onClick={goBack}
//         className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
//       >
//         <ChevronLeft size={20} /> Back
//       </button>

//       {/* Header Title */}
//       <h2 className="text-3xl font-bold text-[#1E2A35] mb-6">
//         {isInternList && <>Interns of Batch <span className="text-[#3B6E8F]">{batch}</span></>}
//         {isMentorList && <>All <span className="text-[#3B6E8F]">Mentors</span></>}
//         {isInterviewerList && <>All <span className="text-[#3B6E8F]">Interviewers</span></>}
//       </h2>

//       {/* Grid Cards */}
//       <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
//         {visibleList.map((item) => (
//           <InternCard
//             key={item.userId}
//             intern={item}
//             onClick={() => openProfile(item.userId)}
//           />
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
//         >
//           Prev
//         </button>

//         <button
//           onClick={() =>
//             setPage((p) =>
//               p < Math.ceil(list.length / ITEMS_PER_PAGE) ? p + 1 : p
//             )
//           }
//           disabled={page === Math.ceil(list.length / ITEMS_PER_PAGE)}
//           className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default ResourcesList;





import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InternCard from "../../components/Resources/InternCard";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BASE = "http://localhost:8080/interngo";

const ITEMS_PER_PAGE = 12;

const ResourcesList: React.FC = () => {
  const { year, batch } = useParams(); // ⬅ NEW: read both params
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const path = location.pathname;

  const isInternList = path.includes("/intern/list");
  const isMentorList = path.includes("/mentor/list");
  const isInterviewerList = path.includes("/interviewer/list");

  useEffect(() => {
    if (isInternList) loadInterns();
    else if (isMentorList) loadMentors();
    else if (isInterviewerList) loadInterviewers();
  }, [year, batch, path]);

  // ---------------------------
  // 🔹 INTERN LIST MODE
  // ---------------------------
  const loadInterns = async () => {
    const profRes = await fetch(`${BASE}/professional`);
    const profList = await profRes.json();

    // Filter by selected YEAR + BATCH
    const filtered = profList.filter(
      (p: any) => p.year === year && p.batch === batch
    );

    const profileRes = await fetch(`${BASE.replace("/interngo", "")}/interngo/profiles`);
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
  };

  // ---------------------------
  // 🔹 MENTOR LIST MODE
  // ---------------------------
  const loadMentors = async () => {
    const profileRes = await fetch(`${BASE.replace("/interngo", "")}/interngo/profiles`);
    const profiles = await profileRes.json();

    const mentors = profiles.filter((p: any) => p.role === "mentor");

    const final = mentors.map((m: any) => ({
      role: "mentor",
      name: m.user.name,
      email: m.user.email,
      primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
      userId: m.userId,
      profilePicture: m.user.profilePicture || "",
    }));

    setList(final);
  };

  // ---------------------------
  // 🔹 INTERVIEWER LIST MODE
  // ---------------------------
  const loadInterviewers = async () => {
    const profileRes = await fetch(`${BASE.replace("/interngo", "")}/interngo/profiles`);
    const profiles = await profileRes.json();

    const interviewers = profiles.filter((p: any) => p.role === "interviewer");

    const final = interviewers.map((m: any) => ({
      role: "interviewer",
      name: m.user.name,
      email: m.user.email,
      primarySkill: m.skills?.primarySkills?.[0] || "Not Provided",
      userId: m.userId,
      profilePicture: m.user.profilePicture || "",
    }));

    setList(final);
  };

  // Pagination
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const visibleList = list.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const goBack = () => {
    if (user?.role === "admin") navigate("/admin/resources");
    else if (user?.role === "mentor") navigate("/mentor/resources");
    else if (user?.role === "interviewer") navigate("/interviewer/resources");
  };

  const openProfile = (uid: string) => {
    navigate(`/admin/profile/${uid}`);
  };

  return (
    <>
      <button
        onClick={goBack}
        className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
      >
        <ChevronLeft size={20} /> Back
      </button>

      {/* Header */}
      <h2 className="text-3xl font-bold text-[#1E2A35] mb-6">
        {isInternList && (
          <>
            Interns of <span className="text-[#3B6E8F]">{batch}</span> —{" "}
            <span className="text-[#3B6E8F]">{year}</span>
          </>
        )}
        {isMentorList && <>All <span className="text-[#3B6E8F]">Mentors</span></>}
        {isInterviewerList && <>All <span className="text-[#3B6E8F]">Interviewers</span></>}
      </h2>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {visibleList.map((item) => (
          <InternCard
            key={item.userId}
            intern={item}
            onClick={() => openProfile(item.userId)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
        >
          Prev
        </button>

        <button
          onClick={() =>
            setPage((p) =>
              p < Math.ceil(list.length / ITEMS_PER_PAGE) ? p + 1 : p
            )
          }
          disabled={page === Math.ceil(list.length / ITEMS_PER_PAGE)}
          className="px-4 py-2 bg-[#96C2DB] text-white rounded-xl disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ResourcesList;
