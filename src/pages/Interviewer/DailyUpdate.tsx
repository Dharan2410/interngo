
import DashboardLayout from "../../components/DashboardLayout";
import DailyUpdateBase from "../../components/DailyUpdateBase";

const InterviewerDailyUpdate = () => {
  return (
    <DashboardLayout title="Interviewer Daily Update">
      <DailyUpdateBase role="intern" />
    </DashboardLayout>
  );
};

export default InterviewerDailyUpdate;
