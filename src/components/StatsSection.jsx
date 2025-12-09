import React from 'react'

const StatsSection = ({stats}) => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-red-500' })}
                                </div>
                                <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:text-white">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium group-hover:text-white">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
