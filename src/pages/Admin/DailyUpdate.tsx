
import React from "react";
import DailyUpdateBase from "../../components/DailyUpdateBase";
import DashboardLayout from "../../components/DashboardLayout";

const AdminDailyUpdate = () => (
    <DashboardLayout title ="Admin Daily Update">
    <DailyUpdateBase role="admin" />
    </DashboardLayout>
);

export default AdminDailyUpdate;
