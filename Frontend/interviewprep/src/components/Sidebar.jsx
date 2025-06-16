// src/components/Sidebar.jsx
import React from "react";
import { FaHome, FaRegCalendarAlt, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white text-orange-500 shadow-lg p-6 font-urbanist border-r border-gray-200">
      <h2 className="text-2xl font-extrabold text-orange-600 mb-8 tracking-tight">
        Dashboard
      </h2>

      <nav className="space-y-3 text-base font-semibold">
        <SidebarItem icon={<FaHome />} label="Home" />
        <SidebarItem icon={<FaRegCalendarAlt />} label="Sessions" />
        <SidebarItem icon={<FaCog />} label="Settings" />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2 rounded-md text-orange-500 hover:border-b-4 hover:border-black transition-all duration-300 cursor-pointer">
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
