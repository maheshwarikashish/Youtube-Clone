import React, { useState } from 'react';
import { useUserData } from '../../context/UserDataContext';
import './UserStats.css';

const UserStats = () => {
  const { getWatchStats, clearHistory } = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const stats = getWatchStats();

  return (
    <div className="user-stats">
      <button 
        className="stats-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="View Statistics"
      >
        📊
      </button>
      
      {isOpen && (
        <div className="stats-dropdown">
          <h4>Your Watch Stats</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.today}</span>
              <span className="stat-label">Today</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.thisWeek}</span>
              <span className="stat-label">This Week</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Watched</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.favorites}</span>
              <span className="stat-label">Favorites</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.watchLater}</span>
              <span className="stat-label">Watch Later</span>
            </div>
          </div>
          <button 
            className="clear-history-btn"
            onClick={clearHistory}
            title="Clear Watch History"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStats;