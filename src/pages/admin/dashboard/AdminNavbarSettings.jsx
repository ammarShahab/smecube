import React, { useState, useEffect } from 'react';
import { Upload, Plus, Trash2, Edit2, Save, X, Eye, Settings, GripVertical, AlertCircle } from 'lucide-react';

const navbarAPI = {
  getConfig: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/navbar/config', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },
  updateConfig: async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/navbar/config', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },
  uploadLogo: async (file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('logo', file);
    const response = await fetch('http://localhost:8000/api/navbar/upload-logo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Upload failed');
    }
    return await response.json();
  },
  createMenuItem: async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/navbar/menu-items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },
  updateMenuItem: async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/navbar/menu-items/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },
  deleteMenuItem: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/navbar/menu-items/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
};

const AdminNavbarSettings = () => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    logo_url: null,
    logo_link: null,
    logo_text: 'SME CUBE',
    logo_bg_color: 'from-red-500 to-pink-600',
    show_logo_text: true,
    show_logo_icon: true,
  });

  const [menuItems, setMenuItems] = useState({
    public: [],
    client: [],
    admin: [],
  });

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    label: '',
    label_bn: '',
    path: '',
    role: 'public',
    icon: '',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');
  const [activeMenuTab, setActiveMenuTab] = useState('public');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchNavbarConfig();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchNavbarConfig = async () => {
    try {
      setLoading(true);
      const data = await navbarAPI.getConfig();
      console.log('Fetched navbar config:', data);
      
      if (data.success) {
        if (data.config) {
          setConfig(data.config);
        }
        if (data.menuItems) {
          setMenuItems(data.menuItems);
        }
      } else {
        showNotification(data.message || 'Failed to load configuration', 'error');
      }
    } catch (error) {
      console.error('Failed to fetch navbar config:', error);
      showNotification(`Failed to load navbar configuration: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size must be less than 5MB', 'error');
      return;
    }

    try {
      setLoading(true);
      const data = await navbarAPI.uploadLogo(file);
      console.log('Upload response:', data);
      
      if (data.success) {
        setConfig({ ...config, logo_url: data.logo_url });
        showNotification('Logo uploaded successfully!', 'success');
        await fetchNavbarConfig();
      } else {
        showNotification(data.message || 'Upload failed', 'error');
      }
    } catch (error) {
      console.error('Failed to upload logo:', error);
      showNotification(`Failed to upload logo: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigUpdate = async () => {
    try {
      setLoading(true);
      const data = await navbarAPI.updateConfig(config);
      
      if (data.success) {
        showNotification('Configuration updated successfully!', 'success');
        if (data.config) {
          setConfig(data.config);
        }
      } else {
        showNotification(data.message || 'Update failed', 'error');
      }
    } catch (error) {
      console.error('Failed to update config:', error);
      showNotification(`Failed to update configuration: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    if (!newItem.label || !newItem.path) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      setLoading(true);
      const data = await navbarAPI.createMenuItem(newItem);
      
      if (data.success) {
        await fetchNavbarConfig();
        setNewItem({ label: '', label_bn: '', path: '', role: 'public', icon: '' });
        setShowAddModal(false);
        showNotification('Menu item added successfully!', 'success');
      } else {
        showNotification(data.message || 'Failed to add menu item', 'error');
      }
    } catch (error) {
      console.error('Failed to add menu item:', error);
      showNotification(`Failed to add menu item: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMenuItem = async (id) => {
    try {
      setLoading(true);
      const data = await navbarAPI.updateMenuItem(id, editingItem);
      
      if (data.success) {
        await fetchNavbarConfig();
        setEditingItem(null);
        showNotification('Menu item updated successfully!', 'success');
      } else {
        showNotification(data.message || 'Update failed', 'error');
      }
    } catch (error) {
      console.error('Failed to update menu item:', error);
      showNotification(`Failed to update menu item: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      setLoading(true);
      const data = await navbarAPI.deleteMenuItem(id);
      
      if (data.success) {
        await fetchNavbarConfig();
        showNotification('Menu item deleted successfully!', 'success');
      } else {
        showNotification(data.message || 'Delete failed', 'error');
      }
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      showNotification(`Failed to delete menu item: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderMenuItem = (item) => {
    const isEditing = editingItem?.id === item.id;

    return (
      <div key={item.id} className="bg-white p-4 rounded-lg border-2 border-gray-100 hover:border-red-200 transition-all duration-200">
        {isEditing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={editingItem.label}
                onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Label (English)"
              />
              <input
                type="text"
                value={editingItem.label_bn || ''}
                onChange={(e) => setEditingItem({ ...editingItem, label_bn: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Label (Bangla)"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={editingItem.path}
                onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Path"
              />
              <input
                type="text"
                value={editingItem.icon || ''}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Icon (optional)"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleUpdateMenuItem(item.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{item.label}</span>
                  {item.label_bn && <span className="text-sm text-gray-500">({item.label_bn})</span>}
                </div>
                <div className="text-sm text-gray-500 mt-1">{item.path}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteMenuItem(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                disabled={loading}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading && !config.logo_text) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <AlertCircle className="w-5 h-5" />
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="w-10 h-10 text-red-600" />
            Navbar Settings
          </h1>
          <p className="text-gray-600 mt-2">Customize your navigation bar appearance and menu items for all user roles</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('logo')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'logo'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Logo & Branding
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${
                activeTab === 'menu'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Menu Management
            </button>
          </div>
        </div>

        {activeTab === 'logo' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-600" />
                Live Preview
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg">
                <div className="flex items-center gap-3">
                  {config.show_logo_icon && (
                    <div className="w-auto h-12 flex items-center justify-center">
                      {config.logo_url ? (
                        <img
                          src={config.logo_url}
                          alt="Logo"
                          className="h-12 w-auto object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-br ${config.logo_bg_color} rounded-xl flex items-center justify-center`}>
                          <span className="text-white font-bold text-2xl">S</span>
                        </div>
                      )}
                    </div>
                  )}
                  {config.show_logo_text && (
                    <span className={`text-2xl font-bold bg-gradient-to-r ${config.logo_bg_color} bg-clip-text text-transparent`}>
                      {config.logo_text}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Logo Image</h3>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 border-2 border-gray-200 rounded-xl flex items-center justify-center p-2 bg-gray-50">
                  {config.logo_url ? (
                    <img
                      src={config.logo_url}
                      alt="Logo"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${config.logo_bg_color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-3xl">S</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block">
                    <div className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer inline-flex items-center gap-2 transition">
                      <Upload className="w-5 h-5" />
                      Upload New Logo
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Any size or aspect ratio, max 5MB (PNG, JPG, SVG, WebP)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    The logo will maintain its aspect ratio and fit within the navbar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Logo Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={config.logo_link || ''}
                    onChange={(e) => setConfig({ ...config, logo_link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="/ or /home (leave empty to link to homepage)"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL where logo will redirect when clicked</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Text
                  </label>
                  <input
                    type="text"
                    value={config.logo_text}
                    onChange={(e) => setConfig({ ...config, logo_text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Gradient (Tailwind classes)
                  </label>
                  <input
                    type="text"
                    value={config.logo_bg_color}
                    onChange={(e) => setConfig({ ...config, logo_bg_color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., from-red-500 to-pink-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use Tailwind gradient classes (fallback when no logo image)</p>
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.show_logo_icon}
                      onChange={(e) => setConfig({ ...config, show_logo_icon: e.target.checked })}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Logo Icon</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.show_logo_text}
                      onChange={(e) => setConfig({ ...config, show_logo_text: e.target.checked })}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Brand Text</span>
                  </label>
                </div>

                <button
                  onClick={handleConfigUpdate}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-semibold"
                >
                  {loading ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b">
                {['public', 'client', 'admin'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveMenuTab(role)}
                    className={`flex-1 px-6 py-4 font-semibold capitalize transition-all ${
                      activeMenuTab === role
                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {role} Menu
                  </button>
                ))}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold capitalize">{activeMenuTab} Menu Items</h3>
                  <button
                    onClick={() => {
                      setNewItem({ ...newItem, role: activeMenuTab });
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {menuItems[activeMenuTab]?.length > 0 ? (
                    menuItems[activeMenuTab].map((item) => renderMenuItem(item))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <GripVertical className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No menu items yet. Click "Add Item" to create one.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-semibold mb-4">Add Menu Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label (English) *
                  </label>
                  <input
                    type="text"
                    value={newItem.label}
                    onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Dashboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label (Bangla)
                  </label>
                  <input
                    type="text"
                    value={newItem.label_bn}
                    onChange={(e) => setNewItem({ ...newItem, label_bn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="ড্যাশবোর্ড"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Path *
                  </label>
                  <input
                    type="text"
                    value={newItem.path}
                    onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="/dashboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (optional)
                  </label>
                  <input
                    type="text"
                    value={newItem.icon}
                    onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="LayoutDashboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    value={newItem.role}
                    onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddMenuItem}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Item'}
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbarSettings;