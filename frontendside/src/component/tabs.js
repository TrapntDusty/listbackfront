import React, { useState, useEffect } from 'react';

const Tabs = ({ activeTab, onToggleTab, onSortingChange, onSearchChange }) => {
  const [sortingOption, setSortingOption] = useState('start');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSortingChange = (option) => {
    setSortingOption(option);
    onSortingChange(option);
    closeDropdown();
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  return (
    <div className="mt-20 flex items-center space-x-4">
      {/* Toggle tab button */}
      <button
        className="ml-5 bg-transparent hover:bg-blue-100 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => onToggleTab()}
      >
        {activeTab === 'main' ? 'Show Side Table' : 'Show Main Table'}
      </button>
  
      {/* Sorting dropdown */}
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="text-blue-500 inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            id="sorting-options-menu"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onClick={isDropdownOpen ? closeDropdown : openDropdown}
          >
            {/* SVG icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-4 h-4 mr-2 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            Sort
          </button>
        </div>
        {/* Dropdown content */}
        {isDropdownOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="sorting-options-menu"
            style={{ backgroundColor: '#ffffff' }}  // Set white background color
          >
          <div className="py-1" role="none">
          <button
              onClick={() => handleSortingChange('start')}
              className={`block px-4 py-2 text-sm ${
                sortingOption === 'start'
                  ? 'text-blue-700 bg-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              role="menuitem"
            >
              none
            </button>
            <button
              onClick={() => handleSortingChange('created')}
              className={`block px-4 py-2 text-sm ${
                sortingOption === 'created'
                  ? 'text-blue-700 bg-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              role="menuitem"
            >
              Created Date
            </button>
            <button
              onClick={() => handleSortingChange('edited')}
              className={`block px-4 py-2 text-sm ${
                sortingOption === 'edited'
                  ? 'text-blue-700 bg-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              role="menuitem"
            >
              Edited Date
            </button>
            <button
              onClick={() => handleSortingChange('alphabetical')}
              className={`block px-4 py-2 text-sm ${
                sortingOption === 'alphabetical'
                  ? 'text-blue-700 bg-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              role="menuitem"
            >
              Alphabetical
            </button>
          </div>
        </div>
      )}
      </div>
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, description, or creation..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setSearchTerm('')}
          >
            {/* X Icon for Clearing Search */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Tabs;