import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext'; // Import the ThemeContext
import './header.css'; // Ensure you have this CSS file for styles

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Access the theme context

  return (
    <header
      className={`fixed top-0 left-0 w-full py-3 px-6 z-50 transition-all ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-extrabold text-yellow-600">
          Management Documents
        </NavLink>

        {/* Hamburger Menu (Visible on Small Screens) */}
        <button
          className={`lg:hidden focus:outline-none ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto ${
            menuOpen ? 'block' : 'hidden'
          } lg:flex items-center bg-white dark:bg-gray-800 shadow-md lg:shadow-none rounded-lg lg:rounded-none p-4 lg:p-0 transition-all duration-300`}
        >
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block lg:inline-block py-2 px-4 font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? 'text-yellow-500' : ''
              }`
            }
          >
            Home
          </NavLink>

          {/* Sign-In */}
          <NavLink
            to="/login"
            className="block lg:inline-block py-2 px-5 font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Sign In
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 flex items-center justify-center p-2 rounded-full transition-all duration-300"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400 w-6 h-6" />
            ) : (
              <FaMoon className="text-blue-500 w-6 h-6" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
