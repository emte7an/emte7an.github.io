import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ icon, text, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      setTimeout(() => {
        navigate(path);
      }, 100);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className="w-full font-bold py-4 px-2 rounded-lg flex justify-between items-center border-b border-gray-200 transition-colors duration-75 ease-in-out active:bg-gray-200">
      <div className="flex items-center">
        {icon}
        <span className="mr-4">{text}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

export default ProfileButton;
