import { useState, useEffect } from "react";
import api from "../../../services/api";
import { Shield, AlertCircle, CheckCircle, Lock, Unlock } from "lucide-react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState(null);
  const [demoting, setDemoting] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [securityStatus, setSecurityStatus] = useState(null);
  const [disablingOtp, setDisablingOtp] = useState(false);
  const [enablingOtp, setEnablingOtp] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchSecurityStatus();
  }, [filterRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?role=${filterRole}`);
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchSecurityStatus = async () => {
    try {
      const response = await api.get('/admin/security/status');
      if (response.data.success) {
        setSecurityStatus(response.data.security_status);
      }
    } catch (error) {
      console.error('Error fetching security status:', error);
    }
  };

  const promoteUser = async (userId) => {
    try {
      setPromoting(userId);
      const response = await api.post('/admin/users/promote-to-admin', { user_id: userId });
      if (response.data.success) {
        setSuccessMessage(`User promoted to admin successfully!`);
        fetchUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to promote user');
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setPromoting(null);
    }
  };

  const demoteUser = async (userId) => {
    try {
      setDemoting(userId);
      const response = await api.post('/admin/users/demote-from-admin', { user_id: userId });
      if (response.data.success) {
        setSuccessMessage(`User demoted successfully!`);
        fetchUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error demoting user:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to demote user');
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setDemoting(null);
    }
  };

  const disableDefaultOtp = async () => {
    try {
      setDisablingOtp(true);
      const response = await api.post('/admin/security/disable-default-otp');
      if (response.data.success) {
        setSuccessMessage('Default OTP disabled successfully!');
        fetchSecurityStatus();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error disabling OTP:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to disable OTP');
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setDisablingOtp(false);
    }
  };

  const enableDefaultOtp = async (userId) => {
    try {
      setEnablingOtp(true);
      const response = await api.post('/admin/security/enable-default-otp', { user_id: userId });
      if (response.data.success) {
        setSuccessMessage('Default OTP enabled successfully!');
        fetchSecurityStatus();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error enabling OTP:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to enable OTP');
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setEnablingOtp(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">Manage system users and their roles</p>
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Users</option>
          <option value="client">Clients</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Security Settings Card */}
      {securityStatus && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
          </div>
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Default OTP (12345) Status</p>
                <p className="text-sm text-gray-600 mt-1">
                  Control whether the default OTP login (01700000000) is enabled
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  securityStatus.default_otp_disabled
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {securityStatus.default_otp_disabled ? 'Disabled' : 'Enabled'}
                </span>
                {!securityStatus.default_otp_disabled && (
                  <button
                    onClick={disableDefaultOtp}
                    disabled={disablingOtp}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    {disablingOtp ? 'Disabling...' : 'Disable OTP'}
                  </button>
                )}
                {securityStatus.default_otp_disabled && (
                  <button
                    onClick={() => enableDefaultOtp(securityStatus.id)}
                    disabled={enablingOtp}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Unlock className="w-4 h-4" />
                    {enablingOtp ? 'Enabling...' : 'Enable OTP'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Clients</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.role === 'client').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Admins</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="w-full flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{user.email || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.email_verified ? (
                        <span className="inline-flex items-center text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">{user.created_at}</p>
                        <p className="text-sm text-gray-500">{user.created_at_human}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.role === 'client' && (
                          <button
                            onClick={() => promoteUser(user.id)}
                            disabled={promoting === user.id}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            {promoting === user.id ? 'Promoting...' : 'Make Admin'}
                          </button>
                        )}
                        {user.role === 'admin' && securityStatus?.id !== user.id && (
                          <button
                            onClick={() => demoteUser(user.id)}
                            disabled={demoting === user.id}
                            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            {demoting === user.id ? 'Demoting...' : 'Remove Admin'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;