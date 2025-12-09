


import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardLayout from "../components/DashboardLayout";

// Dashboards
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import MentorDashboard from "../pages/Dashboard/MentorDashboard";
import InterviewerDashboard from "../pages/Dashboard/InterviewerDashboard";
import InternDashboard from "../pages/Dashboard/InternDashboard";

// Profile
import ProfileCards from "../components/ProfileCards";
import ProfileForm from "../components/ProfileForm";

// Other Pages
import DailyUpdate from "../pages/DailyUpdate";
// import DailyUpdateBase from "../components/DailyUpdateBase";
import DailyUpdateBase from "../pages/common/DailyUpdateBase";
import InteractionModule from "../components/InteractionModule";
import InternHelpDesk from "../pages/intern/HelpPage";
import PendingTickets from "../pages/common/PendingTickets";
import ResourcesList from "../pages/common/ResourcesList";
import ResourcesBatchSelect from "../pages/Admin/ResourcesBatchSelect";
import BatchSelect from "../pages/common/BatchSelect";
import YearSelect from "../pages/common/YearSelect"
import RoleSelect from "../pages/common/RoleSelect";
export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardLayout title="Admin Panel" /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfileCards />} />
<Route path="profile/edit" element={<ProfileForm />} />
          <Route path="daily-update" element={<DailyUpdateBase role="admin"/>} />
          <Route path="interactions" element={<InteractionModule />} />
          <Route path="pending-tickets" element={<PendingTickets />} />
         <Route path="resources" element={<RoleSelect />} />

<Route path="resources/intern/years" element={<YearSelect />} />
<Route path="resources/intern/batches/:year" element={<BatchSelect />} />
<Route path="resources/intern/list/:year/:batch" element={<ResourcesList />} />

<Route path="resources/mentor/list" element={<ResourcesList />} />
<Route path="resources/interviewer/list" element={<ResourcesList />} />

        </Route>

        {/* Mentor */}
        <Route path="/mentor" element={<ProtectedRoute allowedRoles={["mentor"]}><DashboardLayout title="Mentor Panel" /></ProtectedRoute>}>
          <Route path="dashboard" element={<MentorDashboard />} />
          <Route path="profile" element={<ProfileCards />} />
<Route path="profile/edit" element={<ProfileForm />} />
          <Route path="daily-update" element={<DailyUpdateBase role="mentor"/>} />
          <Route path="interactions" element={<InteractionModule />} />
          <Route path="pending-tickets" element={<PendingTickets />} />
          <Route path="resources/:batch" element={<ResourcesList />} />
        </Route>

        {/* Interviewer */}
        <Route path="/interviewer" element={<ProtectedRoute allowedRoles={["interviewer"]}><DashboardLayout title="Interviewer Panel" /></ProtectedRoute>}>
          <Route path="dashboard" element={<InterviewerDashboard />} />
          <Route path="profile" element={<ProfileCards />} />
<Route path="profile/edit" element={<ProfileForm />} />
          <Route path="daily-update" element={<DailyUpdateBase role="interviewer"/>} />
          <Route path="interactions" element={<InteractionModule />} />
          <Route path="resources/:batch" element={<ResourcesList />} />
        </Route>

        {/* Intern */}
        <Route path="/intern" element={<ProtectedRoute allowedRoles={["intern"]}><DashboardLayout title="Intern Dashboard" /></ProtectedRoute>}>
          <Route path="dashboard" element={<InternDashboard />} />
          <Route path="profile" element={<ProfileCards />} />
<Route path="profile/edit" element={<ProfileForm />} />
          <Route path="daily-update" element={<DailyUpdate />} />
          <Route path="interactions" element={<InteractionModule />} />
          <Route path="helpdesk" element={<InternHelpDesk />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
