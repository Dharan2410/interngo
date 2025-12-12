import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DailyUpdateBase from "../common/DailyUpdateBase";

const MentorDailyUpdate = () => {
  return (
    <DashboardLayout >
      <DailyUpdateBase role="mentor" />
    </DashboardLayout>
  );
};

export default MentorDailyUpdate;
