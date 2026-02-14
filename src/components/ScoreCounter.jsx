import React from 'react';
import useUserPoints from '../hooks/useUserPoints';
import useAuth from '../hooks/useAuth'; // Import useAuth

const ScoreCounter = () => {
  const { user } = useAuth(); // Get user from auth context
  const { points, loading } = useUserPoints();

  if (loading) {
    return <div className="text-gray-800">...</div>;
  }

  if (!user) { // If no user, show grayed out message
    return (
      <div className="flex items-center bg-gray-400 text-white font-bold py-1 px-3 rounded-full shadow-md text-xs">
        لن يتم احتساب النقاط الا عند تسجيل الدخول
      </div>
    );
  }

  return (
    <div className="flex items-center bg-yellow-400 text-white font-bold py-1 px-3 rounded-full shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.12.501-.414.923-.877.683l-4.72-2.881a.563.563 0 00-.586 0l-4.72 2.881c-.463.24-.997-.182-.877-.683l1.285-5.385a.562.562 0 00-.182-.557L3.92 9.34a.562.562 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      <span className="text-base">{points}</span>
      <span className="mr-2 text-sm">نقاط</span>
    </div>
  );
};

export default ScoreCounter;