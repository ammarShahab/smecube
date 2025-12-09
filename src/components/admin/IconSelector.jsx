// src/components/admin/IconSelector.jsx
import React, { useState } from 'react';
import IconLibrary, { iconList } from './IconLibrary';

const IconSelector = ({ 
  value, 
  onChange, 
  label = "Select Icon",
  placeholder = "Choose an icon...",
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedIcon = iconList.find(icon => icon.value === value);

  return (
    <div className={`relative ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 rounded border border-gray-300 bg-white px-3 py-2 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <div className="flex items-center gap-3">
          {selectedIcon ? (
            <>
              <IconLibrary name={selectedIcon.value} size={24} className="text-gray-600" />
              <span>{selectedIcon.label}</span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <svg 
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-1 p-3">
            {iconList.map((icon) => (
              <button
                key={icon.value}
                type="button"
                onClick={() => {
                  onChange(icon.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-center rounded p-2 transition-all duration-150 ${
                  value === icon.value 
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={icon.label}
              >
                <IconLibrary name={icon.value} size={32} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector; 