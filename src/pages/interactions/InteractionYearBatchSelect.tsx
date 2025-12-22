import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import YearBatchSelector from "../../components/YearBatchSelector";

const InteractionYearBatchSelect = () => {
  const navigate = useNavigate();
  const { interactionId } = useParams<{ interactionId: string }>();

  const goBack = () => {
    navigate("/admin/interactions");
  };

  return (
    <>
      {/* BACK BUTTON */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 mb-4 text-[#3B6E8F] hover:underline"
      >
        <ChevronLeft size={20} /> Back
      </button>

      {/* YEAR + BATCH SELECTOR */}
      <YearBatchSelector
        onSelect={(year, batch) =>
          navigate(
            `/admin/interactions/${interactionId}/intern/list/${year}/${batch}`
          )
        }
      />
    </>
  );
};

export default InteractionYearBatchSelect;
