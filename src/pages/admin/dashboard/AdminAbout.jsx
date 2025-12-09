import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Plus, Trash2 } from 'lucide-react';
import aboutService from '../../../services/aboutService';

const AdminAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');

  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  const [stats, setStats] = useState([]);
  const [values, setValues] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await aboutService.getAdminData();
      if (response.data.hero) setHeroData(response.data.hero);
      if (response.data.stats) setStats(response.data.stats);
      if (response.data.values) setValues(response.data.values);
      if (response.data.successStories) setSuccessStories(response.data.successStories);
      if (response.data.testimonials) setTestimonials(response.data.testimonials);
      if (response.data.services) setServices(response.data.services);
      setError(null);
    } catch (err) {
      console.error('Error loading about data:', err);
      setError('ডেটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await aboutService.saveAdminData({
        hero: heroData,
        stats,
        values,
        successStories,
        testimonials,
        services
      });
      setSuccess('ডেটা সফলভাবে সংরক্ষণ করা হয়েছে!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving about data:', err);
      setError('ডেটা সংরক্ষণে সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const updateArrayItem = (array, index, field, value) => {
    const updated = [...array];
    updated[index] = { ...updated[index], [field]: value };
    return updated;
  };

  const deleteArrayItem = (array, index) => {
    return array.filter((_, i) => i !== index);
  };

  const addArrayItem = (array, template) => {
    return [...array, template];
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
        <h1 className="text-3xl font-bold text-gray-900">আমাদের সম্পর্কে পৃষ্ঠা পরিচালনা</h1>
        <p className="text-gray-600 mt-2">সমস্ত বিষয়বস্তু এখানে সম্পাদনা করুন</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b flex-wrap">
          {['hero', 'stats', 'values', 'stories', 'testimonials', 'services'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'hero' && 'শীর্ষ বিভাগ'}
              {tab === 'stats' && 'পরিসংখ্যান'}
              {tab === 'values' && 'মূল্যবোধ'}
              {tab === 'stories' && 'সফলতার গল্প'}
              {tab === 'testimonials' && 'প্রশংসাপত্র'}
              {tab === 'services' && 'সেবাসমূহ'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">শিরোনাম</label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="আমাদের সম্পর্কে"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">সাবটাইটেল</label>
                <input
                  type="text"
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="SMECube BD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">বিবরণ</label>
                <textarea
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">পরিসংখ্যান {index + 1}</h3>
                    <button
                      onClick={() => setStats(deleteArrayItem(stats, index))}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="সংখ্যা (যেমন: 500+)"
                    value={stat.number}
                    onChange={(e) => setStats(updateArrayItem(stats, index, 'number', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    placeholder="লেবেল"
                    value={stat.label}
                    onChange={(e) => setStats(updateArrayItem(stats, index, 'label', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setStats(addArrayItem(stats, { number: '', label: '' }))}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Plus className="w-5 h-5" /> যোগ করুন
              </button>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">মূল্যবোধ {index + 1}</h3>
                    <button
                      onClick={() => setValues(deleteArrayItem(values, index))}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="শিরোনাম"
                    value={value.title}
                    onChange={(e) => setValues(updateArrayItem(values, index, 'title', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <textarea
                    placeholder="বিবরণ"
                    value={value.description}
                    onChange={(e) => setValues(updateArrayItem(values, index, 'description', e.target.value))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setValues(addArrayItem(values, { title: '', description: '' }))}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Plus className="w-5 h-5" /> যোগ করুন
              </button>
            </div>
          )}

          {/* Success Stories Tab */}
          {activeTab === 'stories' && (
            <div className="space-y-4">
              {successStories.map((story, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">গল্প {index + 1}</h3>
                    <button
                      onClick={() => setSuccessStories(deleteArrayItem(successStories, index))}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="ব্র্যান্ড নাম"
                    value={story.brand}
                    onChange={(e) => setSuccessStories(updateArrayItem(successStories, index, 'brand', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    placeholder="বৃদ্ধি (যেমন: 350%)"
                    value={story.growth}
                    onChange={(e) => setSuccessStories(updateArrayItem(successStories, index, 'growth', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <textarea
                    placeholder="বিবরণ"
                    value={story.description}
                    onChange={(e) => setSuccessStories(updateArrayItem(successStories, index, 'description', e.target.value))}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setSuccessStories(addArrayItem(successStories, { brand: '', growth: '', description: '' }))}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Plus className="w-5 h-5" /> যোগ করুন
              </button>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">প্রশংসাপত্র {index + 1}</h3>
                    <button
                      onClick={() => setTestimonials(deleteArrayItem(testimonials, index))}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="নাম"
                    value={testimonial.name}
                    onChange={(e) => setTestimonials(updateArrayItem(testimonials, index, 'name', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    placeholder="কোম্পানি"
                    value={testimonial.company}
                    onChange={(e) => setTestimonials(updateArrayItem(testimonials, index, 'company', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <textarea
                    placeholder="মন্তব্য"
                    value={testimonial.text}
                    onChange={(e) => setTestimonials(updateArrayItem(testimonials, index, 'text', e.target.value))}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="number"
                    placeholder="রেটিং (1-5)"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) => setTestimonials(updateArrayItem(testimonials, index, 'rating', parseInt(e.target.value)))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setTestimonials(addArrayItem(testimonials, { name: '', company: '', text: '', rating: 5 }))}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Plus className="w-5 h-5" /> যোগ করুন
              </button>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">সেবা {index + 1}</h3>
                    <button
                      onClick={() => setServices(deleteArrayItem(services, index))}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="শিরোনাম"
                    value={service.title}
                    onChange={(e) => setServices(updateArrayItem(services, index, 'title', e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <textarea
                    placeholder="বিবরণ"
                    value={service.description}
                    onChange={(e) => setServices(updateArrayItem(services, index, 'description', e.target.value))}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setServices(addArrayItem(services, { title: '', description: '' }))}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Plus className="w-5 h-5" /> যোগ করুন
              </button>
            </div>
          )}
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

export default AdminAbout;
