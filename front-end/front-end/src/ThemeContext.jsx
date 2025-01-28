import React, { createContext, useContext, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

// Create a Context for the Theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const updatedTheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', updatedTheme);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the Theme Context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme Toggle Button Component
export const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-transform duration-300 hover:scale-110"
    >
      <div className="flex items-center justify-center">
        {isDarkMode ? (
          <FaMoon className="text-yellow-400 w-6 h-6 animate-spin" />
        ) : (
          <FaSun className="text-orange-500 w-6 h-6 animate-pulse" />
        )}
      </div>
    </button>
  );
};
