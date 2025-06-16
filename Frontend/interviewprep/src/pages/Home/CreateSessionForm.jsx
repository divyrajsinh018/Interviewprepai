// src/pages/Home/CreateSessionForm.jsx
import React, { useState } from "react";
import axiosInstance from "../../Utils/axiousInstance";
import { API_PATHS } from "../../Utils/apiPath";
import toast from "react-hot-toast";

const CreateSessionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "", // ✅ Added description here
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role, topicsToFocus, experience, description } = formData;

    if (!role || !topicsToFocus || !experience || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post(API_PATHS.SESSION.CREATE, formData);
      toast.success("Session created!");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="role"
        placeholder="Role (e.g. Frontend Developer)"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <input
        type="text"
        name="topicsToFocus"
        placeholder="Topics to focus (e.g. React, DSA)"
        value={formData.topicsToFocus}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <input
        type="number"
        name="experience"
        placeholder="Experience in years"
        value={formData.experience}
        onChange={handleChange}
        min="0"
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
      <textarea
        name="description"
        rows={3}
        placeholder="Briefly describe what you're preparing for..."
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md text-white ${loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-black hover:bg-zinc-900"
          }`}
      >
        {loading ? "Creating..." : "Create Session"}
      </button>

    </form>
  );
};

export default CreateSessionForm;
