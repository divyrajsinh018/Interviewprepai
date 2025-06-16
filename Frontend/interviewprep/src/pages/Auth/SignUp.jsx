// src/pages/Auth/SignUp.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import { UserContext } from "../../context/usercontext";
import uploadImage from "../../Utils/uploedImage";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../Utils/axiousInstance";
import { API_PATHS } from "../../Utils/apiPath";

const SignUp = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError(null);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
   <div className="w-[400px] bg-white rounded-2xl px-10 py-8 shadow-xl">
  <h3 className="text-2xl font-bold text-black mb-1">Create an Account</h3>
  <p className="text-sm text-gray-500 mb-6">
    Join us today by entering your details below.
  </p>

  <form onSubmit={handleSignUp} className="space-y-4">
    <ProfilePhotoSelector
      image={profilePic}
      setImage={setProfilePic}
      preview={preview}
      setPreview={setPreview}
    />

    <Input
      value={fullName}
      onChange={({ target }) => setFullName(target.value)}
      label="Full Name"
      placeholder="John"
      type="text"
    />

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
      SIGN UP
    </button>

    <p className="text-center text-sm text-gray-600 mt-4">
      Already have an account?{" "}
      <button
        className="text-orange-500 font-medium hover:underline"
        onClick={() => setCurrentPage("login")}
      >
        Login
      </button>
    </p>
  </form>
</div>

  );
};

export default SignUp;
