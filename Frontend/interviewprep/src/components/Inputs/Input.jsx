import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 w-full">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {isPassword && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye size={18} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={18} className="text-gray-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
