import React, { createContext, useState, useContext } from 'react';

const TopBarContext = createContext();

export const useTopBar = () => useContext(TopBarContext);

export const TopBarProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [rightContent, setRightContent] = useState(null);
  const [leftContent, setLeftContent] = useState(null);

  const value = {
    title,
    setTitle,
    rightContent,
    setRightContent,
    leftContent,
    setLeftContent
  };

  return (
    <TopBarContext.Provider value={value}>
      {children}
    </TopBarContext.Provider>
  );
};
