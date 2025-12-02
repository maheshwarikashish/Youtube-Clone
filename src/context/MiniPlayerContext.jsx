import React, { createContext, useContext, useState } from 'react';

const MiniPlayerContext = createContext();

export const useMiniPlayer = () => {
  const context = useContext(MiniPlayerContext);
  if (!context) {
    throw new Error('useMiniPlayer must be used within MiniPlayerProvider');
  }
  return context;
};

export const MiniPlayerProvider = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const openMiniPlayer = (video) => {
    setCurrentVideo(video);
    setIsMinimized(true);
    setIsPlaying(true);
  };

  const closeMiniPlayer = () => {
    setIsMinimized(false);
    setCurrentVideo(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const updateProgress = (time) => {
    setCurrentTime(time);
  };

  const updateDuration = (time) => {
    setDuration(time);
  };

  const seekTo = (time) => {
    setCurrentTime(time);
  };

  const changeVolume = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
  };

  const value = {
    isMinimized,
    currentVideo,
    isPlaying,
    volume,
    currentTime,
    duration,
    playbackSpeed,
    openMiniPlayer,
    closeMiniPlayer,
    toggleMinimize,
    togglePlayPause,
    updateProgress,
    updateDuration,
    seekTo,
    changeVolume,
    changePlaybackSpeed
  };

  return (
    <MiniPlayerContext.Provider value={value}>
      {children}
    </MiniPlayerContext.Provider>
  );
};