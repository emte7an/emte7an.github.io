import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center p-3 rounded-lg md:justify-center ${
      isActive ? 'text-blue-600' : 'text-gray-500'
    }`;

  const navClasses = `fixed bottom-0 left-0 w-full bg-white shadow-2xl z-10 
    md:fixed md:right-0 md:top-[4rem] md:h-[calc(100vh-4rem)] md:shadow-lg md:rounded-l-lg
    md:flex md:flex-col md:p-4 transition-all duration-500 smooth-transition 
    ${'md:w-20'}`;

  return (
    <nav className={navClasses}>
      <div className="flex justify-around items-center h-16 md:h-auto md:flex-col md:items-stretch md:space-y-6">
        <NavLink to="/" className={navLinkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          <span className={'text-xs mt-1'}>الامتحانات</span>
        </NavLink>
        <NavLink to="/evaluations" className={navLinkClass}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9H21M9 15L11 17L15 13M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={'text-xs mt-1'}>التقييمات</span>
        </NavLink>
        <NavLink to="/store" className={navLinkClass}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 1 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={'text-xs mt-1'}>المتجر</span>
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={'text-xs mt-1'}>البروفايل</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;