import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-6 overflow-y-auto bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Welcome to the Dashboard</h1>
          <p className="text-gray-700 mb-8">
            Use the navigation menu on the left to explore features like fraud detection, view statistics, and manage your settings.
          </p>

          {/* Dashboard Summary Cards (Example) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Card 1 */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Fraud Detection</h3>
              <p className="text-gray-200">Analyze potential fraud in MahaDBT schemes.</p>
            </div>
            {/* Example Card 2 */}
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Statistics</h3>
              <p className="text-gray-200">View detailed statistics of detected frauds.</p>
            </div>
            {/* Example Card 3 */}
            <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-gray-200">Manage user settings and preferences.</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
