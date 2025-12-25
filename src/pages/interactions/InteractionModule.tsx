import { useAuth } from "../../context/AuthContext";
import InternScheduledInteractions from "./InternScheduledInteractions";
import MentorInterviewerInteractions from "./MentorInterviewerInteractions";

const InteractionModule = () => {
  const { user } = useAuth();

  if (!user) return null;

  // INTERN VIEW
  if (user.role === "intern") {
    return <InternScheduledInteractions />;
  }


  if (user.role === "mentor") return <MentorInterviewerInteractions role = "mentor"/>;
 if (user.role === "interviewer") return < MentorInterviewerInteractions role ="interviewer"/>;


  return (
    <div className="p-6 text-gray-500">
      Interactions not available for this role yet.
    </div>
  );
};

export default InteractionModule;
