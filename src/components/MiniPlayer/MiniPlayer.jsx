import React, { useState, useRef, useEffect } from 'react';
import { useMiniPlayer } from '../../context/MiniPlayerContext';
import './MiniPlayer.css';

const MiniPlayer = () => {
  const {
    isMinimized,
    currentVideo,
    isPlaying,
    volume,
    currentTime,
    duration,
    playbackSpeed,
    closeMiniPlayer,
    toggleMinimize,
    togglePlayPause,
    seekTo,
    changeVolume,
    changePlaybackSpeed
  } = useMiniPlayer();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const miniPlayerRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  if (!isMinimized || !currentVideo) return null;

  return (
    <div
      ref={miniPlayerRef}
      className={`mini-player ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }}
    >
      {/* Drag Handle */}
      <div 
        className="mini-player-drag-handle"
        onMouseDown={handleMouseDown}
      />
      
      {/* Video Display */}
      <div className="mini-player-video">
        {/* Placeholder for video - in real implementation, this would be a video element */}
        <div className="video-placeholder">
          <img 
            src={currentVideo.thumbnail || '/api/placeholder/320/180'} 
            alt={currentVideo.title} 
          />
          <div className="video-overlay">
            <button
              className="play-pause-btn"
              onClick={togglePlayPause}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div 
          className="mini-progress-bar"
          onClick={handleProgressClick}
        >
          <div 
            className="mini-progress-fill"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls (shown on hover) */}
      {showControls && (
        <div className="mini-player-controls">
          <div className="control-row">
            <button
              className="control-btn"
              onClick={togglePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="volume-control">
              <button className="control-btn" title="Volume">
                🔊
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>

            <div className="speed-control">
              <button
                className="control-btn"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                title="Playback Speed"
              >
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="speed-menu">
                  {speedOptions.map(speed => (
                    <button
                      key={speed}
                      className={`speed-option ${playbackSpeed === speed ? 'active' : ''}`}
                      onClick={() => {
                        changePlaybackSpeed(speed);
                        setShowSpeedMenu(false);
                      }}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <button
              className="control-btn"
              onClick={toggleMinimize}
              title="Restore"
            >
              🔄
            </button>

            <button
              className="control-btn close-btn"
              onClick={closeMiniPlayer}
              title="Close"
            >
              ❌
            </button>
          </div>

          <div className="video-info">
            <div className="video-title" title={currentVideo.title}>
              {currentVideo.title}
            </div>
            <div className="video-channel">
              {currentVideo.channel || 'Unknown Channel'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniPlayer;