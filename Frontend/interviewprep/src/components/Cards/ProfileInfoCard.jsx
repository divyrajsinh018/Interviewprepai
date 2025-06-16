// src/components/ProfileInfoCard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/usercontext.jsx';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  const profileImage = user?.profileImageUrl || user?.profilePic || '/default-avatar.jpg';
  const userName = user?.name || 'Guest User';

  return (
    <div className="flex items-center gap-3 pr-2">
      <img
        src={profileImage}
        alt="User Profile"
        className="w-11 h-11 rounded-full object-cover border border-gray-300"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-black dark:text-white truncate max-w-[120px]">
          {userName}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-orange-600 dark:text-orange-400 hover:underline text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
