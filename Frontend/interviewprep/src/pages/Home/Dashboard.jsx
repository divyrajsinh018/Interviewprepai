// src/pages/Home/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import SummaryCard from "../../components/Cards/SummaryCard";
import CreateSessionForm from "./CreateSessionForm";
import { LuPlus } from "react-icons/lu";
import axiosInstance from "../../Utils/axiousInstance";
import { API_PATHS } from "../../Utils/apiPath";
import { toast } from "react-hot-toast"; // ✅ Make sure toast is imported

const CARD_BG = [
  "bg-green-50",
  "bg-pink-50",
  "bg-blue-50",
  "bg-yellow-50",
  "bg-purple-50",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchSessions = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("Fetched sessions:", data);
      const validSessions = Array.isArray(data) ? data : data.sessions || [];
      setSessions(validSessions);
    } catch (e) {
      console.error("Failed to fetch sessions:", e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(id));
      toast.success("Session deleted");
      fetchSessions();
    } catch (error) {
      toast.error("Failed to delete session");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((s, i) => (
          <SummaryCard
            key={s._id}
            colors={CARD_BG[i % CARD_BG.length]}
            role={s.role}
            topicsToFocus={s.topicsToFocus}
            experience={s.experience}
            questions={s.questions?.length || 0}
            description={s.description}
            lastUpdated={moment(s.updatedAt).format("Do MMM YYYY")}
            onSelect={() => navigate(`/interviewprep/${s._id}`)}
            onDelete={() => handleDelete(s._id)} // ✅ Real delete function
          />
        ))}
      </div>

      <button
        onClick={() => setOpenCreateModal(true)}
        className="fixed bottom-8 right-8 flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition"
      >
        <LuPlus size={20} />
        Add New
      </button>

      {openCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
            <button
              className="absolute top-4 right-6 text-2xl"
              onClick={() => setOpenCreateModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2">Start a New Interview Journey</h2>
            <p className="text-sm mb-4">
              Fill out a few quick details and unlock your personalized set of interview questions!
            </p>
            <CreateSessionForm
              onSuccess={() => {
                setOpenCreateModal(false);
                fetchSessions();
              }}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
