import React, { useState, useRef, useEffect } from 'react';

const VideoPost = () => {
  // State for dropdown visibility and selected option
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Public');
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Set selected dropdown value
  const selectOption = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold tracking-tight">Create Post</h2>
        <button
          className="text-gray-500 hover:text-red-500 transition duration-200 text-xl font-semibold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* User Profile with Dropdown */}
      <div className="flex items-center space-x-3 mb-5 relative">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile Pic"
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div>
          <h3 className="font-semibold text-base">Single Post</h3>
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-sm bg-gray-100 text-gray-600 px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-200 transition duration-200"
            >
              <span>{selectedOption}</span>
              <span>&#9660;</span>
            </button>
            {dropdownVisible && (
              <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg w-40 z-20">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition duration-200"
                  onClick={() => selectOption('Public')}
                >
                  🌐 Public
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition duration-200"
                  onClick={() => selectOption('Friends')}
                >
                  👥 Friends
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition duration-200"
                  onClick={() => selectOption('Only Me')}
                >
                  🔒 Only Me
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Input */}
      <textarea
        rows="4"
        className="w-full bg-gray-100 text-gray-700 rounded-lg p-4 resize-none outline-none border border-gray-300 focus:border-blue-400 transition duration-200"
        placeholder="What's on your mind?"
      ></textarea>

      {/* Post Button */}
      <div className="w-full mt-5">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-base hover:bg-blue-600 active:bg-blue-700 transition duration-200">
          Post
        </button>
      </div>
    </div>
  );
};

export default VideoPost;
