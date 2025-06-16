import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 min-h-[240px] flex flex-col justify-center">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-black">{role}</h2>
              <p className="text-sm text-medium text-gray-900 mt-1">
                {topicsToFocus}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                Experience: {experience} {experience == 1 ? "Year" : "Years"}
              </span>
              <span className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                {questions} Q&A
              </span>
              <span className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                Last Updated: {lastUpdated}
              </span>
            </div>

            {description && (
              <p className="mt-4 text-sm text-gray-700 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Blob Background */}
      <div className="absolute inset-x-0 top-0 h-[200px] -z-0 flex justify-center overflow-hidden">
        <div className="w-[80vw] h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1 mx-4" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2 mx-4" />
          <div className="w-16 h-16 bg-cyan-300 blur-[65px] animate-blob3 mx-4" />
          <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob1 mx-4" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
