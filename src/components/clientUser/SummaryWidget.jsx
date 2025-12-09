function SummaryWidget({ title, value, description, trend, icon, color = "blue" }) {
  const colorVariants = {
    blue: {
      bg: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      light: "bg-blue-50",
      text: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    green: {
      bg: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      light: "bg-green-50",
      text: "text-green-600",
      iconBg: "bg-green-100"
    },
    purple: {
      bg: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      light: "bg-purple-50",
      text: "text-purple-600",
      iconBg: "bg-purple-100"
    },
    orange: {
      bg: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      text: "text-orange-600",
      iconBg: "bg-orange-100"
    }
  };

  const { gradient, light, text, iconBg } = colorVariants[color];

  return (
    <div className="group relative">
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 group-hover:shadow-md group-hover:border-gray-200">
        {/* Header with icon and trend indicator */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${iconBg} transition-colors duration-300`}>
            {icon || (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )}
          </div>
          
          {trend && (
            <div className={`flex items-center px-2 py-1 rounded-full ${light} ${text} text-sm font-medium`}>
              <svg 
                className={`w-3 h-3 mr-1 ${trend.value > 0 ? 'rotate-0' : 'rotate-180'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {trend.value}%
            </div>
          )}
        </div>

        {/* Main value */}
        <div className="mb-2">
          <p className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
            {value}
          </p>
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-gray-800">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
            {description}
          </p>
        </div>

        {/* Progress bar for percentage values */}
        {typeof value === 'string' && value.includes('%') && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
                style={{ width: value }}
              ></div>
            </div>
          </div>
        )}

        {/* Bottom border accent on hover */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} rounded-b-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
      </div>
    </div>
  );
}

export default SummaryWidget;