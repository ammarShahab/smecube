// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const Login = () => {
  const { sendOtp, login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for success/error messages on mount
  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      if (location.state?.phone) {
        setPhone(location.state.phone);
      }
    }
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location]);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError('সঠিক ফোন নম্বর দিন');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const userId = await sendOtp(phone);
      setUserId(userId);
      setStep(2);
    } catch (err) {
      console.error('Send OTP error:', err);
      
      // Check if user not found
      if (err.user_not_found) {
        setError(err.message);
        // Show a button to redirect to register
        setTimeout(() => {
          const shouldRegister = window.confirm(err.message + '\n\nক্লিক করুন রেজিস্টার করতে।');
          if (shouldRegister) {
            navigate('/register', { state: { phone: phone } });
          }
        }, 500);
      } else {
        setError(err.message || 'OTP পাঠাতে ব্যর্থ হয়েছে');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp || otp.length < 4) {
      setError('সঠিক OTP দিন');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = await login(phone, otp);

      // Token should be saved by AuthContext
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.warn('Token missing after login');
        setError('লগইন সফল কিন্তু টোকেন পাওয়া যায়নি');
        setLoading(false);
        return;
      }

      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'ভুল OTP বা লগইন ব্যর্থ');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
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
            লগইন
          </h2>
          <p className="mt-2 text-gray-600">
            {step === 1 ? 'আপনার ফোন নম্বর দিন' : 'OTP যাচাই করুন'}
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="ফোন নম্বর (০১XXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleSendOtp)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              disabled={loading}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'OTP পাঠান'}
              {!loading && <ChevronRight className="w-5 h-5" />}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">বা</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              Google দিয়ে লগইন করুন
            </button>

            <div className="text-center mt-4">
              <Link 
                to="/register" 
                className="text-red-600 hover:text-red-700 font-medium"
              >
                নতুন অ্যাকাউন্ট তৈরি করুন
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm text-center">
              OTP পাঠানো হয়েছে {phone} নম্বরে
            </div>
            <input
              type="text"
              placeholder="OTP লিখুন"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleLogin)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              maxLength="6"
              disabled={loading}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'যাচাই করা হচ্ছে...' : 'লগইন'}
              {!loading && <ChevronRight className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setOtp('');
                setError('');
                setSuccess('');
              }}
              className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
              disabled={loading}
            >
              ফোন নম্বর পরিবর্তন করুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;