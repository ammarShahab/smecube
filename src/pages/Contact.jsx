import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import contactService from '../services/contactService';

const Contact = () => {
  const [heroData, setHeroData] = useState({
    title: 'যোগাযোগ করুন',
    description: 'আমাদের সাথে যোগাযোগ করুন এবং আপনার ব্যবসার জন্য সেরা সমাধান পান'
  });

  const [contactInfo, setContactInfo] = useState({
    address: 'ঢাকা, বাংলাদেশ',
    email1: 'info@smecube.com',
    email2: 'support@smecube.com',
    phone1: '+৮৮০ ১৭XX-XXXXXX',
    phone2: '+৮৮০ ১৮XX-XXXXXX',
    workingHours: 'শনিবার - বৃহস্পতিবার, সকাল ৯টা - বিকাল ৫টা',
    supportMessage: 'আমাদের ২৪/৭ সাপোর্ট টিম সর্বদা আপনার সেবায় প্রস্তুত'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      const response = await contactService.getPageData();
      if (response.hero) setHeroData(response.hero);
      if (response.contactInfo) setContactInfo(response.contactInfo);
    } catch (error) {
      console.error('Error loading contact data:', error);
      // Use default data if API fails
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('আপনার মেসেজ পাঠানো হয়েছে!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 pt-32 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{heroData.title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {heroData.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">মেসেজ পাঠান</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">নাম *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="+৮৮০ ১৭XX-XXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">বিষয় *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="মেসেজের বিষয়"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">মেসেজ *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার মেসেজ লিখুন..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              মেসেজ পাঠান
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">যোগাযোগের তথ্য</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">
                  <MapPin />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">ঠিকানা</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">
                  <Mail />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">ইমেইল</h3>
                  <p className="text-gray-600">{contactInfo.email1}</p>
                  <p className="text-gray-600">{contactInfo.email2}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">
                  <Phone />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">ফোন</h3>
                  <p className="text-gray-600">{contactInfo.phone1}</p>
                  <p className="text-gray-600">{contactInfo.phone2}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">
                  <Clock />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">কর্মঘন্টা</h3>
                  <p className="text-gray-600">{contactInfo.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">জরুরি সহায়তা?</h3>
            <p className="mb-6">{contactInfo.supportMessage}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              লাইভ চ্যাট শুরু করুন
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
