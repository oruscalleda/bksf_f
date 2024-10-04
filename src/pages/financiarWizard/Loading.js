import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A9E3" />
              <stop offset="100%" stopColor="#004E9C" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="30" fill="none" strokeWidth="10" stroke="url(#gradient)" />
        </svg>
      </div>
      <h1>Generando la mejor cuota</h1>
      <p>En unos segundos estará listo</p>
    </div>
  );
};

const getStroke = () => {
    return `url(#gradient)`;
  };

export default LoadingScreen;


