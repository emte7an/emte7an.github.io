import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext(undefined);

export const NavigationProvider = ({ children }) => {
  const [direction, setDirection] = useState('forward');
  const reactNavigate = useNavigate();

  const navigate = (to, dir) => {
    setDirection(dir);
    reactNavigate(to);
  };

  return (
    <NavigationContext.Provider value={{ direction, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
