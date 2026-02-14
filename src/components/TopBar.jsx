import React from 'react';
import ScoreCounter from './ScoreCounter';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTopBar } from '../context/TopBarContext';

const TopBar = ({ showBackButton, backButtonLink }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, leftContent, rightContent } = useTopBar() || {};
  const isExamsPage = location.pathname === '/';

  const handleBackClick = () => {
    if (backButtonLink) {
      navigate(backButtonLink);
    } else {
      navigate(-1); // Go back to the previous page by default
    }
  };

  const defaultLeftContent = showBackButton ? (
    <button onClick={handleBackClick} className="p-2 rounded-full hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  ) : (
    <ScoreCounter />
  );

  const defaultRightContent = null;

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4 h-16 flex justify-between items-center md:mr-20" dir="rtl">
      <div className="flex items-center gap-2">
        {leftContent || defaultLeftContent}
        {title && <h1 className="text-base font-bold whitespace-nowrap">{title}</h1>}
      </div>
      <div>
        {rightContent || defaultRightContent}
      </div>
    </div>
  );
};

export default TopBar;
