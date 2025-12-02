import React from 'react';
import { useMiniPlayer } from '../../context/MiniPlayerContext';
import { useUserData } from '../../context/UserDataContext';
import './DemoButton.css';

const DemoButton = () => {
  const { openMiniPlayer, updateProgress, updateDuration } = useMiniPlayer();
  const { addToHistory, addToFavorites } = useUserData();

  const demoVideo = {
    videoId: 'demo-1',
    title: 'Amazing Nature Documentary - Wildlife Adventure',
    channel: 'Nature Explorer',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=320&h=180&fit=crop&crop=entropy&auto=format',
    duration: 2580, // 43 minutes
    views: '2.1M'
  };

  const handleOpenMiniPlayer = () => {
    // Add to history when opening
    addToHistory(demoVideo);
    
    // Open mini player with demo video
    openMiniPlayer(demoVideo);
    
    // Simulate video progress for demo
    updateDuration(2580);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      updateProgress(progress);
      if (progress >= 30) { // Stop demo after 30 seconds
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleAddToFavorites = () => {
    addToFavorites(demoVideo);
    alert('Video added to favorites! Check your stats.');
  };

  return (
    <div className="demo-section">
      <h3>🎬 Try Our Features</h3>
      <div className="demo-buttons">
        <button onClick={handleOpenMiniPlayer} className="demo-btn primary">
          🎥 Open Mini Player Demo
        </button>
        <button onClick={handleAddToFavorites} className="demo-btn secondary">
          ❤️ Add to Favorites
        </button>
      </div>
      <p className="demo-note">
        Click the buttons above to test the mini-player and favorites features!
      </p>
    </div>
  );
};

export default DemoButton;