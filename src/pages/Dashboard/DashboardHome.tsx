import React from "react";
import { useAuth } from "../../context/AuthContext";

const MentorDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-200 flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-pink-700">Mentor Dashboard</h1>
        <button
          onClick={logout}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Logout
        </button>
      </header>

      <main className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Welcome, {user?.email}
        </h2>
        <p className="text-gray-600 mb-6">
          You are logged in as a <span className="font-bold text-pink-700">{user?.role}</span>.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-pink-100 rounded-lg shadow-sm hover:shadow-md">
            <h3 className="font-semibold text-pink-700">Assigned Interns</h3>
            <p className="text-sm text-gray-600 mt-2">View and guide your assigned interns.</p>
          </div>

          <div className="p-4 bg-pink-100 rounded-lg shadow-sm hover:shadow-md">
            <h3 className="font-semibold text-pink-700">Schedule Sessions</h3>
            <p className="text-sm text-gray-600 mt-2">Plan mentorship sessions and evaluations.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
