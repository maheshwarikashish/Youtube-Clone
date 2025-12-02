import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    border: '#e2e8f0',
    hover: '#f1f5f9',
    shadow: 'rgba(0, 0, 0, 0.1)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBg: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.8)'
  },
  dark: {
    name: 'Dark',
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    border: '#334155',
    hover: '#1e293b',
    shadow: 'rgba(0, 0, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBg: '#1e293b',
    glass: 'rgba(30, 41, 59, 0.8)'
  },
  midnight: {
    name: 'Midnight',
    primary: '#0c0a1e',
    secondary: '#1a1625',
    tertiary: '#2a2438',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    accent: '#06d6a0',
    accentHover: '#05b890',
    border: '#2a2438',
    hover: '#1a1625',
    shadow: 'rgba(0, 0, 0, 0.4)',
    gradient: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
    cardBg: '#1a1625',
    glass: 'rgba(26, 22, 37, 0.8)'
  },
  sunset: {
    name: 'Sunset',
    primary: '#1a0b2e',
    secondary: '#2d1b4e',
    tertiary: '#432874',
    text: '#fde8ff',
    textSecondary: '#d8b4fe',
    accent: '#f59e0b',
    accentHover: '#d97706',
    border: '#432874',
    hover: '#2d1b4e',
    shadow: 'rgba(245, 158, 11, 0.2)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    cardBg: '#2d1b4e',
    glass: 'rgba(45, 27, 78, 0.8)'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0a1628',
    secondary: '#102a43',
    tertiary: '#1e3a5f',
    text: '#e0f2fe',
    textSecondary: '#67e8f9',
    accent: '#06b6d4',
    accentHover: '#0891b2',
    border: '#1e3a5f',
    hover: '#102a43',
    shadow: 'rgba(6, 182, 212, 0.2)',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    cardBg: '#102a43',
    glass: 'rgba(16, 42, 67, 0.8)'
  },
  neon: {
    name: 'Neon',
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    accent: '#ff0080',
    accentHover: '#e6006b',
    border: '#333333',
    hover: '#1a1a1a',
    shadow: 'rgba(255, 0, 128, 0.3)',
    gradient: 'linear-gradient(135deg, #ff0080 0%, #7928ca 100%)',
    cardBg: '#1a1a1a',
    glass: 'rgba(26, 26, 26, 0.8)'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('youtube-clone-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('youtube-clone-theme', currentTheme);
    
    // Apply CSS custom properties
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--color-${key}`, value);
      }
    });
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    availableThemes: themes,
    switchTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};