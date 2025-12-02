import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('youtube-clone-history');
    const savedFavorites = localStorage.getItem('youtube-clone-favorites');
    const savedWatchLater = localStorage.getItem('youtube-clone-watch-later');

    if (savedHistory) setWatchHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedWatchLater) setWatchLater(JSON.parse(savedWatchLater));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('youtube-clone-history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('youtube-clone-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('youtube-clone-watch-later', JSON.stringify(watchLater));
  }, [watchLater]);

  const addToHistory = (video) => {
    const videoWithTimestamp = {
      ...video,
      watchedAt: new Date().toISOString(),
      watchTime: 0 // Can be updated with actual watch progress
    };

    setWatchHistory(prev => {
      // Remove if already exists, then add to beginning
      const filtered = prev.filter(v => v.videoId !== video.videoId);
      return [videoWithTimestamp, ...filtered].slice(0, 100); // Keep only last 100 videos
    });
  };

  const addToFavorites = (video) => {
    setFavorites(prev => {
      if (prev.find(v => v.videoId === video.videoId)) {
        return prev; // Already in favorites
      }
      return [{ ...video, addedAt: new Date().toISOString() }, ...prev];
    });
  };

  const removeFromFavorites = (videoId) => {
    setFavorites(prev => prev.filter(v => v.videoId !== videoId));
  };

  const addToWatchLater = (video) => {
    setWatchLater(prev => {
      if (prev.find(v => v.videoId === video.videoId)) {
        return prev; // Already in watch later
      }
      return [{ ...video, addedAt: new Date().toISOString() }, ...prev];
    });
  };

  const removeFromWatchLater = (videoId) => {
    setWatchLater(prev => prev.filter(v => v.videoId !== videoId));
  };

  const clearHistory = () => {
    setWatchHistory([]);
  };

  const isFavorite = (videoId) => {
    return favorites.some(v => v.videoId === videoId);
  };

  const isInWatchLater = (videoId) => {
    return watchLater.some(v => v.videoId === videoId);
  };

  const getWatchStats = () => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const todayVideos = watchHistory.filter(v => 
      new Date(v.watchedAt) > new Date(today.toDateString())
    ).length;
    
    const weekVideos = watchHistory.filter(v => 
      new Date(v.watchedAt) > thisWeek
    ).length;

    return {
      today: todayVideos,
      thisWeek: weekVideos,
      total: watchHistory.length,
      favorites: favorites.length,
      watchLater: watchLater.length
    };
  };

  const value = {
    watchHistory,
    favorites,
    watchLater,
    addToHistory,
    addToFavorites,
    removeFromFavorites,
    addToWatchLater,
    removeFromWatchLater,
    clearHistory,
    isFavorite,
    isInWatchLater,
    getWatchStats
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};