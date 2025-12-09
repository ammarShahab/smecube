// src/pages/GoogleCallback.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [status, setStatus] = useState('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      console.log('Already processed, skipping...');
      return;
    }

    const handleCallback = async () => {
      try {
        hasProcessed.current = true;
        
        console.log('=== GOOGLE CALLBACK STARTED ===', {
          fullUrl: window.location.href,
          hasToken: searchParams.has('token'),
          hasUser: searchParams.has('user'),
          hasError: searchParams.has('error'),
          hasRegistration: searchParams.has('registration'),
        });

        // Check for error from backend
        const error = searchParams.get('error');
        if (error) {
          const decodedError = decodeURIComponent(error);
          console.error('OAuth Error:', decodedError);
          setErrorMessage(decodedError);
          setStatus('error');
          
          const isNotRegisteredError = decodedError.includes('নিবন্ধন') || 
                                       decodedError.includes('অ্যাকাউন্ট পাওয়া যায়নি') ||
                                       decodedError.toLowerCase().includes('register') ||
                                       decodedError.toLowerCase().includes('not found');
          
          setTimeout(() => {
            if (isNotRegisteredError) {
              navigate('/register', { 
                state: { error: decodedError },
                replace: true
              });
            } else {
              navigate('/login', { 
                state: { error: decodedError },
                replace: true
              });
            }
          }, 2500);
          return;
        }

        // Check if this is a registration success
        const registrationSuccess = searchParams.get('registration');
        if (registrationSuccess === 'success') {
          console.log('Registration success detected');
          const email = searchParams.get('email');
          setStatus('registration_success');
          setTimeout(() => {
            navigate('/login', { 
              state: { 
                success: 'নিবন্ধন সফল হয়েছে! এখন Google দিয়ে লগইন করুন।',
                email: email ? decodeURIComponent(email) : null
              },
              replace: true
            });
          }, 2500);
          return;
        }

        // Get token and user data from URL
        const token = searchParams.get('token');
        const userJson = searchParams.get('user');

        if (!token || !userJson) {
          console.error('Missing authentication data');
          setErrorMessage('Authentication data missing. Please try again.');
          setStatus('error');
          setTimeout(() => {
            navigate('/login', { 
              state: { error: 'Authentication failed. Please try again.' },
              replace: true
            });
          }, 2500);
          return;
        }

        // Parse user data
        let userData;
        try {
          userData = JSON.parse(decodeURIComponent(userJson));
          console.log('Google OAuth Login Success:', {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role
          });
        } catch (parseError) {
          console.error('Failed to parse user data:', parseError);
          setErrorMessage('Failed to parse user data.');
          setStatus('error');
          setTimeout(() => {
            navigate('/login', { 
              state: { error: 'Authentication data invalid.' },
              replace: true
            });
          }, 2500);
          return;
        }

        // Save to localStorage FIRST
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✓ Saved to localStorage');

        // Update auth context state directly
        if (auth && typeof auth.setUser === 'function' && typeof auth.setIsAuthenticated === 'function') {
          auth.setUser(userData);
          auth.setIsAuthenticated(true);
          console.log('✓ Auth context updated');
        }

        setStatus('success');

        // Redirect based on user role with a longer delay to ensure state updates
        const redirectPath = userData.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
        console.log('✓ Will redirect to:', redirectPath);
        
        // Use window.location for a hard redirect to ensure fresh state
        setTimeout(() => {
          console.log('✓ Redirecting now...');
          window.location.href = redirectPath;
        }, 2000);

      } catch (error) {
        console.error('=== CALLBACK PROCESSING ERROR ===', error);
        setErrorMessage(`Processing error: ${error.message}`);
        setStatus('error');
        setTimeout(() => {
          navigate('/login', { 
            state: { error: 'Authentication processing failed. Please try again.' },
            replace: true
          });
        }, 2500);
      }
    };

    handleCallback();
  }, []); // Empty dependency array - only run once on mount

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <p className="text-gray-600">Loading authentication context...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'processing' && (
          <>
            <div className="mb-6">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">
                লোড হচ্ছে<span className="animate-pulse">...</span>
              </p>
            </div>
          </>
        )}

        {status === 'registration_success' && (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 shadow-lg animate-scale-in">
                <svg 
                  className="w-10 h-10 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                নিবন্ধন সফল! ✓
              </h2>
              <p className="text-gray-600">
                আপনার অ্যাকাউন্ট তৈরি হয়ে গেছে
              </p>
              <p className="text-sm text-gray-500 mt-2">
                আপনাকে লগইন পেজে নিয়ে যাওয়া হচ্ছে...
              </p>
            </div>
            <div className="w-full bg-green-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full animate-progress"></div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 shadow-lg animate-scale-in">
                <svg 
                  className="w-10 h-10 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                লগইন সফল! ✓
              </h2>
              <p className="text-gray-600">
                Google দিয়ে লগইন সম্পন্ন হয়েছে
              </p>
              <p className="text-sm text-gray-500 mt-2">
                আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
              </p>
            </div>
            <div className="w-full bg-green-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full animate-progress"></div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full mb-4 shadow-lg">
                <svg 
                  className="w-10 h-10 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {errorMessage.includes('নিবন্ধন') || errorMessage.includes('অ্যাকাউন্ট পাওয়া যায়নি') 
                  ? 'নিবন্ধন প্রয়োজন' 
                  : 'কিছু ভুল হয়েছে'}
              </h2>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}
              <p className="text-gray-600 text-sm">
                {errorMessage.includes('নিবন্ধন') || errorMessage.includes('অ্যাকাউন্ট পাওয়া যায়নি')
                  ? 'আপনাকে নিবন্ধন পেজে নিয়ে যাওয়া হচ্ছে...'
                  : 'আপনাকে লগইন পেজে রিডাইরেক্ট করা হচ্ছে...'}
              </p>
            </div>
            <div className="w-full bg-red-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-rose-500 h-full animate-progress"></div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        
        @keyframes progress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GoogleCallback;