import React from 'react';

const FeaturesSection = ({ features }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile: 3 BIG square boxes – BIG TITLE, NO white space */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:hidden -mx-4 sm:-mx-6 lg:-mx-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 h-full border-t border-b border-l border-r border-gray-100 first:border-l-0 last:border-r-0"
              style={{ aspectRatio: '1 / 1' }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm:rounded-2xl">
                {React.cloneElement(feature.icon, {
                  className: 'w-6 h-6 sm:w-8 sm:h-8 text-white',
                })}
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Desktop: Original large cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;