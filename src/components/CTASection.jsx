import { ChevronRight } from 'lucide-react'
import React from 'react'

const CTASection = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                <div className="inline-block bg-white/10 backdrop-blur-lg text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/20">
                    ✨ এক্সক্লুসিভ অফার
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                    আপনার প্রজেক্ট শুরু করতে
                    <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> প্রস্তুত?</span>
                </h2>

                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    আজই যোগাযোগ করুন এবং পান বিশেষ ছাড়। আপনার ব্যবসাকে নিয়ে যান নতুন উচ্চতায়।
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button className="group bg-gradient-to-r from-red-500 to-pink-600 text-white px-10 py-5 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center">
                        এখনই শুরু করুন
                        <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className="border-2 border-white text-white px-10 py-5 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold text-lg">
                        আরও জানুন
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CTASection
