import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ServiceSection = ({ services }) => {
    return (
        <section className="py-12 sm:py-16 lg:py-24 px-3 sm:px-4 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50" id="services">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
                    <div className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg mb-4 sm:mb-6 lg:mb-10">
                        আমাদের সেবাসমূহ
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 px-4">
                        নিচ থেকে <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">সার্ভিস</span> সিলেক্ট করুন
                    </h2>
                    <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        আপনার ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সমাধান - এক ছাদের নিচে সব সেবা
                    </p>
                </div>

                <div className="grid grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                    {services.map((service, idx) => (
                        <Link
                            key={idx}
                            to={service.path}
                            className="block"
                        >
                            {/* The 'group' class enables hover effects on child elements */}
                            <div className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 md:hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 md:hover:border-transparent md:hover:-translate-y-2 h-full">
                                
                                {/* GRADIENT: Visible on mobile, appears on hover on desktop */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center space-y-2">
                                    
                                    {/* ICON WRAPPER */}
                                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 md:${service.iconBg} rounded-xl sm:rounded-2xl md:group-hover:bg-white/20 transition-all duration-300 md:group-hover:scale-110 md:group-hover:rotate-6`}>
                                        
                                        {/* ICON: White on mobile, gray on desktop, white on desktop hover */}
                                        {React.cloneElement(service.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white md:text-gray-700 md:group-hover:text-white transition-colors' })}
                                    </div>
                                    
                                    {/* TITLE: White on mobile, dark on desktop, white on desktop hover */}
                                    <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white md:text-gray-900 md:group-hover:text-white transition-colors leading-tight mb-0">
                                        {service.title}
                                    </h3>
                                    
                                    {/* DESCRIPTION: Visible from md screens up */}
                                    <p className="hidden md:block text-sm lg:text-base text-white/90 md:text-gray-600 md:group-hover:text-white/90 transition-colors leading-relaxed">
                                        {service.desc}
                                    </p>

                                    {/* DETAILS LINK: Visible from md screens up */}
                                    <div className="hidden md:flex items-center text-white md:text-red-500 md:group-hover:text-white font-semibold pt-2 text-sm lg:text-base">
                                        বিস্তারিত
                                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-1 md:group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceSection