import React from 'react';

const AnimatedPage = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'white' // To prevent seeing the page underneath during transition
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedPage;
