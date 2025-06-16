// src/components/Cards/SummaryCard.jsx
import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../Utils/helper";

const SummaryCard = ({
  colors = "bg-green-50",
  role = "",
  topicsToFocus = "",
  experience = "-",
  questions = "-",
  description = "",
  lastUpdated = "",
  onSelect,
  onDelete,
}) => {
  const initials = getInitials(role);

  return (
    <div
      className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col justify-between ${colors}`}
      onClick={onSelect}
    >
      {/* Top: Avatar + Role */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
          {initials}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{role}</h3>
          <p className="text-sm text-gray-700">{topicsToFocus}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs mb-4 font-medium">
        <span className="bg-white px-3 py-1 rounded-full text-gray-800 border border-gray-200">
          Experience: {experience} yrs
        </span>
        <span className="bg-white px-3 py-1 rounded-full text-gray-800 border border-gray-200">
          {questions} Q&A
        </span>
        <span className="bg-white px-3 py-1 rounded-full text-gray-800 border border-gray-200">
          Last updated: {lastUpdated}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {description || `Preparing for ${role.toLowerCase()} roles`}
      </p>

      {/* Delete Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          onDelete?.();
        }}
        title="Delete session"
        className="self-end text-red-500 hover:text-red-700"
      >
        <LuTrash2 size={20} />
      </button>
    </div>
  );
};

export default SummaryCard;
