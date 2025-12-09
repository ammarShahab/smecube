// src/pages/Register.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { register, googleSignup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for URL errors or success messages on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check for error from location state (from Google callback or Login redirect)
    if (location.state?.error) {
      setError(location.state.error);
    }
    
    // Prefill phone number if coming from Login page
    if (location.state?.phone) {
      setPhone(location.state.phone);
    }
  }, [location]);

  const handleRegister = async () => {
    // Validation
    if (!name || name.trim().length < 2) {
      setError('নাম কমপক্ষে ২ অক্ষরের হতে হবে');
      return;
    }
    if (!phone || phone.length < 10) {
      setError('সঠিক ফোন নম্বর দিন');
      return;
    }
    if (email && !email.includes('@')) {
      setError('সঠিক ইমেইল দিন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await register({ name, phone, email });
      
      // ✅ Check if backend wants us to redirect to login
      if (response.redirect_to_login) {
        navigate('/login', {
          state: {
            success: 'নিবন্ধন সফল হয়েছে! এখন লগইন করুন।',
            phone: phone
          }
        });
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    googleSignup();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 py-24 px-4 sm:px-6 lg:px-8" 
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            রেজিস্টার
          </h2>
          <p className="mt-2 text-gray-600">আপনার তথ্য দিন</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Google Register Button - Top Position */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full bg-white border-2 border-red-500 text-gray-700 py-3 rounded-full font-semibold hover:shadow-lg hover:bg-red-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Google দিয়ে রেজিস্টার করুন
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">অথবা ফোন নম্বর দিয়ে</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
            disabled={loading}
          />
          <input
            type="tel"
            placeholder="ফোন নম্বর (০১XXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="ইমেইল (ঐচ্ছিক)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
            disabled={loading}
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'রেজিস্ট্রেশন হচ্ছে...' : 'রেজিস্টার করুন'}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </button>

          <div className="text-center mt-4">
            <Link 
              to="/login" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;