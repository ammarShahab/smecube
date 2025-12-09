import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center">
      {/* Animated spinner */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
      </div>
      
      {/* Loading text */}
      <p className="text-gray-600 text-lg font-medium">
        Loading<span className="animate-pulse">...</span>
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-32">
      {content}
    </div>
  );
};

export default LoadingSpinner;
