import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Calendar,
  MessageSquare,
  BarChart,
  AlertCircle,
  Megaphone,
  LogOut,
  Bell,
  HelpCircle,
  ClipboardList
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"

interface LayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({children }) => {
  const [hovered, setHovered] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(0);

  const menuItemsByRole: Record<
    string,
    { name: string; icon: React.ReactElement; path: string }[]
  > = {
    admin: [
      { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
      { name: "Profile", icon: <User />, path: "/admin/profile" },
    { name: "Attendance", icon: <ClipboardList />, path: "/admin/attendance" },
      { name: "Resources", icon: <BookOpen />, path: "/admin/resources" },
      { name: "Plans", icon: <Calendar />, path: "/admin/plans" },
      { name: "Daily Update", icon: <MessageSquare />, path: "/admin/daily-update" },
      { name: "Interactions", icon: <MessageSquare />, path: "/admin/interactions" },
      { name: "Analytics", icon: <BarChart />, path: "/admin/analytics" },
      { name: "Pending Tickets", icon: <AlertCircle />, path: "/admin/pending-tickets" },
      { name: "Announcement", icon: <Megaphone />, path: "/admin/announcement" },
    ],
    mentor: [
      { name: "Dashboard", icon: <LayoutDashboard />, path: "/mentor/dashboard" },
      { name: "Profile", icon: <User />, path: "/mentor/profile" },
      { name: "Daily Update", icon: <Calendar />, path: "/mentor/daily-update" },
      { name: "Interactions", icon: <MessageSquare />, path: "/mentor/interactions" },
      { name: "Pending Tickets", icon: <AlertCircle />, path: "/mentor/pending-tickets" },
    ],
    interviewer: [
      { name: "Dashboard", icon: <LayoutDashboard />, path: "/interviewer/dashboard" },
      { name: "Profile", icon: <User />, path: "/interviewer/profile" },
      { name: "Daily Update", icon: <Calendar />, path: "/interviewer/daily-update" },
      { name: "Interactions", icon: <MessageSquare />, path: "/interviewer/interactions" },
      { name: "Help Desk", icon: <HelpCircle />, path: "/interviewer/helpdesk" },
    ],
    intern: [
      { name: "Dashboard", icon: <LayoutDashboard />, path: "/intern/dashboard" },
      { name: "Profile", icon: <User />, path: "/intern/profile" },
      { name: "Daily Update", icon: <Calendar />, path: "/intern/daily-update" },
      { name: "Interactions", icon: <MessageSquare />, path: "/intern/interactions" },
      { name: "Help Desk", icon: <HelpCircle />, path: "/intern/helpdesk" },
    ],
  };

  const role = user?.role?.toLowerCase() || "intern";
  const menuItems = menuItemsByRole[role];

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-[#E5EDF1] to-[#96C2DB] text-[#1E2A35]">

      {/* 🌊 Lagoon Sidebar */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: hovered ? 230 : 70 }}
        transition={{ duration: 0.2 }}
        className="
          fixed left-0 top-16 bottom-0 bg-white/40 backdrop-blur-xl 
          shadow-lg border-r border-[#96C2DB]/40
          flex flex-col py-6 z-30 transition-all
        "
      >
        {/* Menu */}
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                  ${
                    active
                      ? "bg-[#96C2DB] text-[#08212d] shadow-md"
                      : "text-[#08212d]/70 hover:bg-[#96C2DB]/30 hover:text-[#08212d]"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {hovered && (
  <motion.span
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, delay: 0.30 }}
    className="text-sm font-medium whitespace-nowrap"
  >
    {item.name}
  </motion.span>
)}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* 🌊 Main Content */}
      <div className="flex-1 ml-[70px] mt-16">

        {/* Header */}
        <header
  className="fixed top-0 left-0 right-0 h-16 bg-white/40 backdrop-blur-xl
             border-b border-[#96C2DB]/50 flex justify-between items-center px-8 shadow-md z-20"
>

<img 
  src={logo}
  alt="Interngo Logo"
  className="h-10 object-contain"
/>

          

          <div className="flex items-center gap-6">

            {/* Notifications */}
            <div className="relative cursor-pointer">
              <Bell size={24} className="text-[#08212d] hover:text-[#1E2A35]" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#96C2DB] text-[#08212d]
                  text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md"
                >
                  {notifications}
                </span>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#96C2DB] text-[#08212d] px-4 py-2 
                        rounded-lg shadow-md hover:bg-[#7DB3CE] transition-all"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline font-semibold">Logout</span>
            </button>
          </div>
        </header>

        {/* BODY */}
        <main className="pt-16 px-10 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
