import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export const LoadingDots = ({ size = 'medium' }) => {
  return (
    <div className={`loading-dots ${size}`}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export const LoadingBar = ({ progress = 0 }) => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar">
        <div 
          className="loading-bar-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default Loading;