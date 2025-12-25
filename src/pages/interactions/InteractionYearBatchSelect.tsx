// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft } from "lucide-react";
// import YearBatchSelector from "../../components/YearBatchSelector";

// const InteractionYearBatchSelect = () => {
//   const navigate = useNavigate();
//   // const { interactionId } = useParams<{ interactionId: string }>();
//   const { interactionId, mode } = useParams<{
//   interactionId: string;
//   mode: "schedule" | "view";
// }>();


//   const goBack = () => {
//     navigate("/admin/interactions");
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

//       <YearBatchSelector
//   key={location.pathname}
//   onSelect={(year, batch) => {
//     if (mode === "schedule") {
//       navigate(
//         `/admin/interactions/${interactionId}/intern/list/${year}/${batch}`
//       );
//     } else {
//       navigate(
//         `/admin/interactions/${interactionId}/scheduled/${year}/${batch}`
//       );
//     }
//   }}
// />
//     </>
//   );
// };

// export default InteractionYearBatchSelect;




import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import YearBatchSelector from "../../components/YearBatchSelector";

const InteractionYearBatchSelect = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 mb-6 text-[#3B6E8F] hover:underline"
      >
        <ChevronLeft size={20} /> Back
      </button>
{/* 
      <h1 className="text-2xl font-bold mb-6">
        Select Year & Batch
      </h1> */}

      <YearBatchSelector
        onSelect={(year, batch) => {
          navigate(`/admin/interactions/${year}/${batch}`);
        }}
      />
    </div>
  );
};

export default InteractionYearBatchSelect;
