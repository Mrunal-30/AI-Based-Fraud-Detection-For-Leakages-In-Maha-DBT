import React from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { path: "/fraud-check", label: "Fraud Detection", icon: <FiSearch /> },
    { path: "/statistics", label: "Statistics", icon: <FiBarChart2 /> },
    { path: "/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="w-1/4 bg-blue-900 text-white flex flex-col justify-between shadow-lg min-h-screen p-6">
      {/* Dashboard Title */}
      <div>
        <h2 className="text-3xl font-semibold tracking-wide mb-8 text-yellow-400">Dashboard</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-md transition duration-300 ${
                    isActive
                      ? "bg-yellow-500 text-blue-900 font-semibold"
                      : "hover:bg-blue-800 hover:text-yellow-300"
                  }`
                }
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-5 py-3 bg-red-600 hover:bg-red-500 rounded-md text-lg transition duration-300 w-full justify-center mt-4"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
