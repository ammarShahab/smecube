/* AdminBulkSMS.jsx - COMPLETE VERSION */
import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Sparkles,
  Eye,
  CheckCircle2,
  Plus,
  X,
  Trash2,
  Save,
  Edit2,
  Check,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from 'lucide-react';
import { bulkSmsService } from '../../../services/bulkSmsService';

const AdminBulkSMS = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // All state variables
  const [heroData, setHeroData] = useState({ title: '', description: '', cta_text: '' });
  const [features, setFeatures] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [stats, setStats] = useState([]);
  const [packages, setPackages] = useState([]);
  const [ctaData, setCtaData] = useState({ title: '', description: '', button_text: '' });

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        hero, feat, uses, proc, stat, pack, cta
      ] = await Promise.all([
        bulkSmsService.getHero(),
        bulkSmsService.getFeatures(),
        bulkSmsService.getUseCases(),
        bulkSmsService.getProcessSteps(),
        bulkSmsService.getStats(),
        bulkSmsService.getPackages(),
        bulkSmsService.getCta(),
      ]);

      setHeroData(hero || { title: '', description: '', cta_text: '' });
      setFeatures(feat || []);
      setUseCases(uses || []);
      setProcessSteps(proc || []);
      setStats(stat || []);
      setPackages(pack || []);
      setCtaData(cta || { title: '', description: '', button_text: '' });
    } catch (err) {
      showMessage('error', 'Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'features', label: 'Features' },
    { id: 'usecases', label: 'Use Cases' },
    { id: 'process', label: 'Process Steps' },
    { id: 'stats', label: 'Statistics' },
    { id: 'packages', label: 'Packages' },
    { id: 'cta', label: 'CTA Section' },
  ];

  // ====================== HERO SECTION ======================
  const handleHeroChange = (field, value) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateHero = async () => {
    try {
      setSaving(true);
      await bulkSmsService.updateHero(heroData);
      showMessage('success', 'Hero updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== FEATURES SECTION ======================
  const handleCreateFeature = async () => {
    try {
      setSaving(true);
      const newFeature = await bulkSmsService.createFeature(formData);
      setFeatures(prev => [...prev, newFeature]);
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Feature created successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFeature = async (id) => {
    try {
      setSaving(true);
      const updatedFeature = await bulkSmsService.updateFeature(id, formData);
      setFeatures(prev => prev.map(f => f.id === id ? updatedFeature : f));
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Feature updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFeature = async (id) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    try {
      setSaving(true);
      await bulkSmsService.deleteFeature(id);
      setFeatures(prev => prev.filter(f => f.id !== id));
      showMessage('success', 'Feature deleted successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== USE CASES SECTION ======================
  const handleCreateUseCase = async () => {
    try {
      setSaving(true);
      const newUseCase = await bulkSmsService.createUseCase(formData);
      setUseCases(prev => [...prev, newUseCase]);
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Use case created successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUseCase = async (id) => {
    try {
      setSaving(true);
      const updatedUseCase = await bulkSmsService.updateUseCase(id, formData);
      setUseCases(prev => prev.map(u => u.id === id ? updatedUseCase : u));
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Use case updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUseCase = async (id) => {
    if (!confirm('Are you sure you want to delete this use case?')) return;
    try {
      setSaving(true);
      await bulkSmsService.deleteUseCase(id);
      setUseCases(prev => prev.filter(u => u.id !== id));
      showMessage('success', 'Use case deleted successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== PROCESS STEPS SECTION ======================
  const handleCreateProcessStep = async () => {
    try {
      setSaving(true);
      const newStep = await bulkSmsService.createProcessStep(formData);
      setProcessSteps(prev => [...prev, newStep]);
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Process step created successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProcessStep = async (id) => {
    try {
      setSaving(true);
      const updatedStep = await bulkSmsService.updateProcessStep(id, formData);
      setProcessSteps(prev => prev.map(step => step.id === id ? updatedStep : step));
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Process step updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProcessStep = async (id) => {
    if (!confirm('Are you sure you want to delete this process step?')) return;
    try {
      setSaving(true);
      await bulkSmsService.deleteProcessStep(id);
      setProcessSteps(prev => prev.filter(step => step.id !== id));
      showMessage('success', 'Process step deleted successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== STATS SECTION ======================
  const handleCreateStat = async () => {
    try {
      setSaving(true);
      const newStat = await bulkSmsService.createStat(formData);
      setStats(prev => [...prev, newStat]);
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Stat created successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStat = async (id) => {
    try {
      setSaving(true);
      const updatedStat = await bulkSmsService.updateStat(id, formData);
      setStats(prev => prev.map(s => s.id === id ? updatedStat : s));
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Stat updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStat = async (id) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;
    try {
      setSaving(true);
      await bulkSmsService.deleteStat(id);
      setStats(prev => prev.filter(s => s.id !== id));
      showMessage('success', 'Stat deleted successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== PACKAGES SECTION ======================
  const handlePackageChange = (pkgId, field, value) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === pkgId ? { ...pkg, [field]: value } : pkg
    ));
  };

  const handleCreatePackage = async () => {
    try {
      setSaving(true);
      const newPackage = await bulkSmsService.createPackage(formData);
      setPackages(prev => [...prev, newPackage]);
      setEditingItem(null);
      setFormData({});
      showMessage('success', 'Package created successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePackage = async (id) => {
    const pkg = packages.find(p => p.id === id);
    try {
      setSaving(true);
      const updatedPackage = await bulkSmsService.updatePackage(id, pkg);
      setPackages(prev => prev.map(p => p.id === id ? updatedPackage : p));
      showMessage('success', 'Package updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      setSaving(true);
      await bulkSmsService.deletePackage(id);
      setPackages(prev => prev.filter(p => p.id !== id));
      showMessage('success', 'Package deleted successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const updatePackageFeature = (pkgId, idx, value) => {
    setPackages(prev => prev.map(pkg => {
      if (pkg.id !== pkgId) return pkg;
      const features = [...pkg.features];
      features[idx] = value;
      return { ...pkg, features };
    }));
  };

  const addPackageFeature = (pkgId) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === pkgId 
        ? { ...pkg, features: [...pkg.features, 'New feature'] } 
        : pkg
    ));
  };

  const removePackageFeature = (pkgId, idx) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === pkgId 
        ? { ...pkg, features: pkg.features.filter((_, i) => i !== idx) } 
        : pkg
    ));
  };

  const togglePackagePopular = async (id) => {
    const pkg = packages.find(p => p.id === id);
    try {
      setSaving(true);
      const updatedPackage = await bulkSmsService.updatePackage(id, { 
        ...pkg, 
        popular: !pkg.popular 
      });
      setPackages(prev => prev.map(p => p.id === id ? updatedPackage : p));
      showMessage('success', 'Package updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePackageEnabled = async (id) => {
    const pkg = packages.find(p => p.id === id);
    try {
      setSaving(true);
      const updatedPackage = await bulkSmsService.updatePackage(id, { 
        ...pkg, 
        enabled: !pkg.enabled 
      });
      setPackages(prev => prev.map(p => p.id === id ? updatedPackage : p));
      showMessage('success', 'Package updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // ====================== CTA SECTION ======================
  const handleCtaChange = (field, value) => {
    setCtaData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateCta = async () => {
    try {
      setSaving(true);
      await bulkSmsService.updateCta(ctaData);
      showMessage('success', 'CTA updated successfully');
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img src="/icons/admin/sms.png" alt="sms" className="w-8" />
            <h1 className="text-3xl font-bold">Bulk SMS Service Management</h1>
          </div>
          <p className="text-gray-600">Manage your bulk SMS service content and pricing</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* HERO SECTION */}
          {activeTab === 'hero' && !loading && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => handleHeroChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={heroData.description}
                    onChange={(e) => handleHeroChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter hero description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                  <input
                    type="text"
                    value={heroData.cta_text}
                    onChange={(e) => handleHeroChange('cta_text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter CTA button text"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateHero}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} /> {saving ? 'Saving...' : 'Save Hero Section'}
              </button>
            </div>
          )}

          {/* FEATURES SECTION */}
          {activeTab === 'features' && !loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                <button
                  onClick={() => {
                    setEditingItem('new-feature');
                    setFormData({ icon: '⭐', title: '', description: '', order: features.length });
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={18} /> Add Feature
                </button>
              </div>

              {/* Add Feature Form */}
              {editingItem === 'new-feature' && (
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Add New Feature</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="⭐"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Feature title"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Feature description"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateFeature}
                      disabled={saving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Check size={18} /> {saving ? 'Creating...' : 'Create Feature'}
                    </button>
                    <button
                      onClick={() => { setEditingItem(null); setFormData({}); }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    {editingItem === `feature-${feature.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                            <input
                              value={formData.icon}
                              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateFeature(feature.id)}
                            disabled={saving}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                          >
                            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => { setEditingItem(null); setFormData({}); }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(`feature-${feature.id}`);
                              setFormData(feature);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteFeature(feature.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
                    {/* PROCESS STEPS SECTION */}
          {activeTab === 'process' && !loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Process Steps</h2>
                  <p className="text-gray-600 mt-1">Set up the steps users will follow to use your service</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingItem('new-process');
                    setFormData({ 
                      step: `${processSteps.length + 1}`, 
                      title: '', 
                      description: '',
                      order: processSteps.length
                    });
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={18} /> Add Process Step
                </button>
              </div>

              {/* Add Process Step Form */}
              {editingItem === 'new-process' && (
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Add New Process Step</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Step Number</label>
                      <input
                        type="text"
                        value={formData.step || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, step: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="1, 2, 3..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Step title"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Step description"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateProcessStep}
                      disabled={saving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Check size={18} /> {saving ? 'Creating...' : 'Create Step'}
                    </button>
                    <button
                      onClick={() => { setEditingItem(null); setFormData({}); }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Process Steps List */}
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step.id} className="border rounded-lg p-4">
                    {editingItem === `process-${step.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Step Number</label>
                            <input
                              value={formData.step}
                              onChange={(e) => setFormData(prev => ({ ...prev, step: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateProcessStep(step.id)}
                            disabled={saving}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                          >
                            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => { setEditingItem(null); setFormData({}); }}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(`process-${step.id}`);
                              setFormData(step);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProcessStep(step.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {processSteps.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No process steps added yet</p>
                  <p className="text-sm text-gray-400 mt-1">Click the button above to add your first step</p>
                </div>
              )}
            </div>
          )}
          {/* PROCESS STEPS SECTION - Keep your existing process steps code here */}
          {activeTab === 'process' && !loading && (
            <div className="space-y-6">
              {/* Your existing process steps code */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Process Steps</h2>
                  <p className="text-gray-600 mt-1">Set up the steps users will follow to use your service</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingItem('new-process');
                    setFormData({ 
                      step: `${processSteps.length + 1}`, 
                      title: '', 
                      description: '',
                      order: processSteps.length
                    });
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={18} /> Add Process Step
                </button>
              </div>

              {/* Add your existing process steps form and list here */}
              {/* ... */}
            </div>
          )}
          {/* USE CASES SECTION */}
{activeTab === 'usecases' && !loading && (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Use Cases</h2>
      <button
        onClick={() => {
          setEditingItem('new-usecase');
          setFormData({ icon: '🛒', title: '', description: '', order: useCases.length });
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
      >
        <Plus size={18} /> Add Use Case
      </button>
    </div>

    {/* Add Use Case Form */}
    {editingItem === 'new-usecase' && (
      <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Add New Use Case</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="🛒"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Use case title"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Use case description"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateUseCase}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Check size={18} /> {saving ? 'Creating...' : 'Create Use Case'}
          </button>
          <button
            onClick={() => { setEditingItem(null); setFormData({}); }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Use Cases List */}
    <div className="grid md:grid-cols-2 gap-4">
      {useCases.map((useCase) => (
        <div key={useCase.id} className="border rounded-lg p-4">
          {editingItem === `usecase-${useCase.id}` ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateUseCase(useCase.id)}
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => { setEditingItem(null); setFormData({}); }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-2xl">{useCase.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingItem(`usecase-${useCase.id}`);
                    setFormData(useCase);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-2"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteUseCase(useCase.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}
{/* STATS SECTION */}
{activeTab === 'stats' && !loading && (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
      <button
        onClick={() => {
          setEditingItem('new-stat');
          setFormData({ number: '100+', label: '', order: stats.length });
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
      >
        <Plus size={18} /> Add Stat
      </button>
    </div>

    {/* Add Stat Form */}
    {editingItem === 'new-stat' && (
      <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Add New Statistic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number/Value</label>
            <input
              type="text"
              value={formData.number || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="98%, 100+, 2s"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={formData.label || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Success Rate, Happy Clients"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateStat}
            disabled={saving}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Check size={18} /> {saving ? 'Creating...' : 'Create Stat'}
          </button>
          <button
            onClick={() => { setEditingItem(null); setFormData({}); }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Stats List */}
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="border rounded-lg p-6 text-center">
          {editingItem === `stat-${stat.id}` ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number/Value</label>
                <input
                  value={formData.number}
                  onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleUpdateStat(stat.id)}
                  disabled={saving}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => { setEditingItem(null); setFormData({}); }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
              <div className="flex justify-center gap-1 mt-4">
                <button
                  onClick={() => {
                    setEditingItem(`stat-${stat.id}`);
                    setFormData(stat);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
)}
{/* PACKAGES SECTION */}
{activeTab === 'packages' && !loading && (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">SMS Packages</h2>
      <button
        onClick={() => {
          setEditingItem('new-package');
          setFormData({
            name: 'New Package',
            price: '0',
            sms_count: '0 SMS',
            features: ['Feature 1', 'Feature 2'],
            button_link: '',
            popular: false,
            enabled: true,
            order: packages.length
          });
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
      >
        <Plus size={18} /> Add Package
      </button>
    </div>

    {/* Add Package Form */}
    {editingItem === 'new-package' && (
      <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">Add New Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Starter, Business, Enterprise"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              value={formData.price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="1,000, 5,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMS Count</label>
            <input
              type="text"
              value={formData.sms_count || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, sms_count: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="1,000 SMS, 5,000 SMS"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link (Optional)</label>
          <input
            type="url"
            value={formData.button_link || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="https://example.com/order"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to show "Contact Us" button</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <div className="space-y-2">
            {formData.features?.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...formData.features];
                    newFeatures[index] = e.target.value;
                    setFormData(prev => ({ ...prev, features: newFeatures }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Feature description"
                />
                <button
                  onClick={() => {
                    const newFeatures = formData.features.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, features: newFeatures }));
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setFormData(prev => ({ ...prev, features: [...prev.features, 'New feature'] }))}
            className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            + Add Feature
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.popular || false}
              onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.checked }))}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.enabled || true}
              onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Enabled</span>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCreatePackage}
            disabled={saving}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Check size={18} /> {saving ? 'Creating...' : 'Create Package'}
          </button>
          <button
            onClick={() => { setEditingItem(null); setFormData({}); }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Packages List */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <div key={pkg.id} className={`border rounded-xl p-6 ${pkg.popular ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-200'} ${!pkg.enabled ? 'opacity-60' : ''}`}>
          {pkg.popular && (
            <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
              <Sparkles className="w-3 h-3 inline mr-1" /> Most Popular
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => handlePackageChange(pkg.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(pkg.id, 'price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMS Count</label>
                <input
                  type="text"
                  value={pkg.sms_count}
                  onChange={(e) => handlePackageChange(pkg.id, 'sms_count', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link (Optional)</label>
              <input
                type="url"
                value={pkg.button_link || ''}
                onChange={(e) => handlePackageChange(pkg.id, 'button_link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="https://example.com/order"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updatePackageFeature(pkg.id, index, e.target.value)}
                      className="flex-1 h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => removePackageFeature(pkg.id, index)}
                      className="h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPackageFeature(pkg.id)}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  <Plus size={14} /> Add Feature
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-700">Popular</label>
                <p className="text-xs text-gray-500">Highlight this package</p>
              </div>
              <button
                onClick={() => togglePackagePopular(pkg.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pkg.popular ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pkg.popular ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Enabled</label>
                <p className="text-xs text-gray-500">Show on website</p>
              </div>
              <button
                onClick={() => togglePackageEnabled(pkg.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pkg.enabled ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pkg.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => handleUpdatePackage(pkg.id)}
                disabled={saving}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Package'}
              </button>
              <button
                onClick={() => handleDeletePackage(pkg.id)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
{/* CTA SECTION */}
{activeTab === 'cta' && !loading && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Call to Action Section</h2>
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={ctaData.title}
          onChange={(e) => handleCtaChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Start Your Bulk SMS Marketing Today"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={ctaData.description}
          onChange={(e) => handleCtaChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Try with 100 free SMS credits"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
        <input
          type="text"
          value={ctaData.button_text}
          onChange={(e) => handleCtaChange('button_text', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Get Free Trial →"
        />
      </div>
    </div>
    <button
      onClick={handleUpdateCta}
      disabled={saving}
      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
    >
      <Save size={18} /> {saving ? 'Saving...' : 'Save CTA Section'}
    </button>
  </div>
)}

          {/* Add other sections (useCases, stats, packages, cta) following the same pattern */}

        </div>
      </div>
    </div>
  );
};

export default AdminBulkSMS;