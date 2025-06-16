// src/components/Layouts/DashboardLayout.jsx
import React from "react";
import Sidebar from "../Sidebar";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const DashboardLayout = ({ children, hideSidebar = false }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 font-urbanist">
      {/* Conditionally Render Sidebar */}
      {!hideSidebar && (
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <Sidebar />
        </aside>
      )}

      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-bold text-black">Interview Prep AI</h1>
          <ProfileInfoCard />
        </header>

        {/* Page Content */}
        <main className="px-6 py-6 w-full max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
