import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DailyUpdateBase from "../../components/DailyUpdateBase";

const MentorDailyUpdate = () => {
  return (
    <DashboardLayout title ="Mentor Daily Update">
      <DailyUpdateBase role="mentor" />
    </DashboardLayout>
  );
};

export default MentorDailyUpdate;
