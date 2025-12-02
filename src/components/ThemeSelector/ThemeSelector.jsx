import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const { currentTheme, availableThemes, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    switchTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector">
      <button 
        className="theme-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
      >
        🎨
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          <h4>Choose Theme</h4>
          <div className="theme-options">
            {Object.entries(availableThemes).map(([key, theme]) => (
              <div
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => handleThemeChange(key)}
              >
                <div 
                  className="theme-preview"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.accent} 100%)`
                  }}
                />
                <span className="theme-name">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;