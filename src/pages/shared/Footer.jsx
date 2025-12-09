import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                <div className="text-white font-bold text-2xl">S</div>
                            </div>
                            <span className="text-2xl font-black">
                                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">sme</span>
                                <span className="text-white">cube</span>
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            আপনার ব্যবসার ডিজিটাল সমাধানী। আমরা সাথে আছি প্রতিটি পদক্ষেপে।
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">সার্ভিস সমূহ</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-red-400 transition-colors cursor-pointer">ই-কমার্স সলিউশন</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">ওয়েবসাইট ডেভেলপমেন্ট</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">গ্রাফিক ডিজাইন</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">ডিজিটাল মার্কেটিং</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">বিজনেস কনসালটিং</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">গুরুত্বপূর্ণ লিংক</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-red-400 transition-colors cursor-pointer">আমাদের সম্পর্কে</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">প্রাইসিং</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">পোর্টফলিও</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">ব্লগ</li>
                            <li className="hover:text-red-400 transition-colors cursor-pointer">ক্যারিয়ার</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">যোগাযোগ</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-400" />
                                <span>+880 1234-567890</span>
                            </li>
                            <li className="flex items-start">
                                <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-400" />
                                <span>info@smecube.com</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-400" />
                                <span>ঢাকা, বাংলাদেশ</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-400">©2025 All Rights Reserved By <span className="text-red-400 font-semibold">SME CUBE LTD</span></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
