import React, { useState } from 'react';
import {
  Requirement2Icon,
  ChatbotdesignIcon,
  ChatbotSetupIcon,
  LivetestingIcon,
} from './IconLibrary';

const ChatbotSetupIconSelector = ({ value, onChange, label = "আইকন নির্বাচন", className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const chatbotIcons = [
    { name: 'Requirement2Icon', component: Requirement2Icon, label: 'প্রয়োজনীয়তা' },
    { name: 'ChatbotdesignIcon', component: ChatbotdesignIcon, label: 'চ্যাটবট ডিজাইন' },
    { name: 'ChatbotSetupIcon', component: ChatbotSetupIcon, label: 'চ্যাটবট সেটআপ' },
    { name: 'LivetestingIcon', component: LivetestingIcon, label: 'লাইভ টেস্টিং' },
  ];

  const selectedIcon = chatbotIcons.find(icon => icon.name === value);

  return (
    <div className={`${className}`}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 rounded border border-gray-300 bg-white px-3 py-2 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          {selectedIcon ? (
            <>
              <selectedIcon.component className="w-5 h-5 text-gray-600" />
              <span>{selectedIcon.label}</span>
            </>
          ) : (
            <span className="text-gray-500">আইকন বেছে নিন...</span>
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
        <div className="absolute z-10 mt-1 w-full max-w-xs rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2 space-y-2">
            {chatbotIcons.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => {
                  onChange(icon.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded px-3 py-2 transition-colors text-sm ${
                  value === icon.name 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <icon.component className="w-6 h-6 flex-shrink-0" />
                <span>{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotSetupIconSelector;
