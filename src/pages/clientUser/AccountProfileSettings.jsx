import { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";

function AccountProfileSettings() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Profile form
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Check if user is Google OAuth user
  const isGoogleUser = user?.google_id;

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // For Google users, only send name
      const updateData = isGoogleUser 
        ? { name: profileData.name }
        : profileData;

      console.log('Sending update data:', updateData); // Debug log
      console.log('Is Google user:', isGoogleUser); // Debug log

      // ✅ FIXED: Use the correct API endpoint
      const response = await api.put('/client/profile', updateData);
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update profile. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
              {isGoogleUser && (
                <div className="mt-2 flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-9h2v9h-2zm1-11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                  </svg>
                  Google Account User
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}
         
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {isGoogleUser 
                    ? "Update your basic profile details (Email and phone cannot be changed for Google accounts)" 
                    : "Update your basic profile details"
                  }
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email"
                      value={profileData.email}
                      onChange={(e) => !isGoogleUser && setProfileData({...profileData, email: e.target.value})}
                      disabled={isGoogleUser}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isGoogleUser ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    />
                    {isGoogleUser && (
                      <p className="text-sm text-gray-500 mt-1">
                        Email cannot be changed for Google accounts
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={profileData.phone}
                      onChange={(e) => !isGoogleUser && setProfileData({...profileData, phone: e.target.value})}
                      disabled={isGoogleUser}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isGoogleUser ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      required={!isGoogleUser}
                    />
                    {isGoogleUser && (
                      <p className="text-sm text-gray-500 mt-1">
                        Phone number cannot be changed for Google accounts
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md font-medium disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Login Method</p>
                  <p className="font-medium text-gray-900">
                    {isGoogleUser ? 'Google OAuth' : 'Phone OTP'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">Our support team is here to assist you</p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfileSettings;