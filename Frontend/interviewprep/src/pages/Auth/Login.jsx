// src/pages/Auth/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiousInstance.js";
import { API_PATHS } from "../../Utils/apiPath.js";
import { UserContext } from "../../context/usercontext.jsx";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
      <div className="w-[400px] bg-white rounded-2xl px-10 py-8 shadow-xl">
  <h3 className="text-2xl font-bold text-black mb-1">Welcome Back</h3>
  <p className="text-sm text-gray-500 mb-6">
    Please enter your details to log in
  </p>

  <form onSubmit={handleLogin} className="space-y-4">
    <Input
      value={email}
      onChange={({ target }) => setEmail(target.value)}
      label="Email Address"
      placeholder="john@example.com"
      type="text"
    />

    <Input
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      label="Password"
      placeholder="Min 8 Characters"
      type="password"
    />

    {error && <p className="text-red-500 text-sm pt-1">{error}</p>}

    <button
      type="submit"
      className="w-full py-3 mt-2 rounded-md text-white bg-black hover:opacity-90 transition"
    >
      LOGIN
    </button>

    <p className="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?{" "}
      <button
        type="button"
        className="text-orange-500 font-medium hover:underline"
        onClick={() => setCurrentPage("signup")}
      >
        SignUp
      </button>
    </p>
  </form>
</div>

  );
};

export default Login;
