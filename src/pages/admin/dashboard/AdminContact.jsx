import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import contactService from '../../../services/contactService';

const AdminContact = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [heroData, setHeroData] = useState({
    title: '',
    description: ''
  });

  const [contactInfo, setContactInfo] = useState({
    address: '',
    email1: '',
    email2: '',
    phone1: '',
    phone2: '',
    workingHours: '',
    supportMessage: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAdminData();
      if (response.data.hero) {
        setHeroData(response.data.hero);
      }
      if (response.data.contactInfo) {
        setContactInfo(response.data.contactInfo);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading contact data:', err);
      setError('ডেটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleHeroChange = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await contactService.saveAdminData({
        hero: heroData,
        contactInfo: contactInfo
      });
      setSuccess('ডেটা সফলভাবে সংরক্ষণ করা হয়েছে!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving contact data:', err);
      setError('ডেটা সংরক্ষণে সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">যোগাযোগ পৃষ্ঠা পরিচালনা</h1>
        <p className="text-gray-600 mt-2">যোগাযোগ পৃষ্ঠার সমস্ত বিষয়বস্তু এখানে সম্পাদনা করুন</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">ত্রুটি</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">সফল</h3>
            <p className="text-green-700 text-sm mt-1">{success}</p>
          </div>
        </div>
      )}

      {/* Form Sections */}
      <div className="grid gap-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">শীর্ষ বিভাগ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">শিরোনাম</label>
              <input
                type="text"
                value={heroData.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="যোগাযোগ করুন"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">বিবরণ</label>
              <textarea
                value={heroData.description}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="পৃষ্ঠার বিবরণ লিখুন"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">যোগাযোগের তথ্য</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ঠিকানা</label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) => handleContactInfoChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ঢাকা, বাংলাদেশ"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল ১</label>
                <input
                  type="email"
                  value={contactInfo.email1}
                  onChange={(e) => handleContactInfoChange('email1', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="info@smecube.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল ২</label>
                <input
                  type="email"
                  value={contactInfo.email2}
                  onChange={(e) => handleContactInfoChange('email2', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="support@smecube.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ফোন ১</label>
                <input
                  type="tel"
                  value={contactInfo.phone1}
                  onChange={(e) => handleContactInfoChange('phone1', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+৮৮০ ১৭XX-XXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ফোন ২</label>
                <input
                  type="tel"
                  value={contactInfo.phone2}
                  onChange={(e) => handleContactInfoChange('phone2', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+৮৮০ ১৮XX-XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">কর্মঘন্টা</label>
              <input
                type="text"
                value={contactInfo.workingHours}
                onChange={(e) => handleContactInfoChange('workingHours', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="শনিবার - বৃহস্পতিবার, সকাল ৯টা - বিকাল ৫টা"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">জরুরি সহায়তা বার্তা</label>
              <textarea
                value={contactInfo.supportMessage}
                onChange={(e) => handleContactInfoChange('supportMessage', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আমাদের ২৪/৭ সাপোর্ট টিম সর্বদা আপনার সেবায় প্রস্তুত"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save className="w-5 h-5" />
          {saving ? 'সংরক্ষণ করছে...' : 'সংরক্ষণ করুন'}
        </button>
      </div>
    </div>
  );
};

export default AdminContact;
