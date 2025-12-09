import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Check,
  Zap,
  Crown,
  Star,
  Loader,
  AlertCircle
} from 'lucide-react';
import { pricingPlansAPI, extraServicesAPI, planComparisonsAPI } from '../../../services/api';

const AdminPricing = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [pricingPlans, setPricingPlans] = useState([]);
  const [addOnServices, setAddOnServices] = useState([]);
  const [planComparisons, setPlanComparisons] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingComparison, setEditingComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [plansRes, servicesRes, comparisonsRes] = await Promise.all([
        pricingPlansAPI.getAll(),
        extraServicesAPI.getAll(),
        planComparisonsAPI.getAll()
      ]);
      
      setPricingPlans(plansRes.data.data);
      setAddOnServices(servicesRes.data.data);
      setPlanComparisons(comparisonsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // ==================== PRICING PLANS MANAGEMENT ====================
  
  const handleAddPlan = () => {
    const newPlan = {
      name: "নতুন প্ল্যান",
      type: "monthly",
      subtitle: "বর্ণনা লিখুন",
      price: 0,
      price_unit: "BDT",
      price_period: "/মাস",
      discount_info: null,
      features: ["ফিচার ১", "ফিচার ২"],
      is_popular: false,
      display_order: pricingPlans.length + 1,
      is_active: true
    };
    setEditingPlan(newPlan);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({...plan});
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;
    
    try {
      setSaving(true);
      
      if (editingPlan.id) {
        await pricingPlansAPI.update(editingPlan.id, editingPlan);
      } else {
        await pricingPlansAPI.create(editingPlan);
      }
      
      await fetchAllData();
      setEditingPlan(null);
      alert('Plan saved successfully!');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePlan = async (id) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      await pricingPlansAPI.delete(id);
      await fetchAllData();
      alert('Plan deleted successfully!');
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAddFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, "নতুন ফিচার"]
      });
    }
  };

  const handleUpdateFeature = (index, value) => {
    if (editingPlan) {
      const updatedFeatures = [...editingPlan.features];
      updatedFeatures[index] = value;
      setEditingPlan({
        ...editingPlan,
        features: updatedFeatures
      });
    }
  };

  const handleRemoveFeature = (index) => {
    if (editingPlan) {
      const updatedFeatures = editingPlan.features.filter((_, i) => i !== index);
      setEditingPlan({
        ...editingPlan,
        features: updatedFeatures
      });
    }
  };

  // ==================== ADD-ON SERVICES MANAGEMENT ====================
  
  const handleAddService = () => {
    const newService = {
      title: "নতুন সার্ভিস",
      description: null,
      price: 0,
      unit: "/মাস",
      is_active: true,
      display_order: addOnServices.length + 1
    };
    setEditingService(newService);
  };

  const handleEditService = (service) => {
    setEditingService({...service});
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    
    try {
      setSaving(true);
      
      if (editingService.id) {
        await extraServicesAPI.update(editingService.id, editingService);
      } else {
        await extraServicesAPI.create(editingService);
      }
      
      await fetchAllData();
      setEditingService(null);
      alert('Service saved successfully!');
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await extraServicesAPI.delete(id);
      await fetchAllData();
      alert('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service: ' + (error.response?.data?.message || error.message));
    }
  };

  // ==================== PLAN COMPARISON MANAGEMENT ====================
  
  const handleAddComparison = () => {
    const newComparison = {
      feature_name: "নতুন ফিচার",
      starter_value: "",
      professional_value: "",
      enterprise_value: ""
    };
    setEditingComparison(newComparison);
  };

  const handleEditComparison = (comparison) => {
    setEditingComparison({...comparison});
  };

  const handleSaveComparison = async () => {
    if (!editingComparison) return;
    
    try {
      setSaving(true);
      
      if (editingComparison.id) {
        await planComparisonsAPI.update(editingComparison.id, editingComparison);
      } else {
        await planComparisonsAPI.create(editingComparison);
      }
      
      await fetchAllData();
      setEditingComparison(null);
      alert('Comparison saved successfully!');
    } catch (error) {
      console.error('Error saving comparison:', error);
      alert('Failed to save comparison: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteComparison = async (id) => {
    if (!confirm('Are you sure you want to delete this comparison?')) return;
    
    try {
      await planComparisonsAPI.delete(id);
      await fetchAllData();
      alert('Comparison deleted successfully!');
    } catch (error) {
      console.error('Error deleting comparison:', error);
      alert('Failed to delete comparison: ' + (error.response?.data?.message || error.message));
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <p className="text-2xl font-bold text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pricing Management</h1>
        <p className="text-gray-600">Manage your pricing plans, add-on services, and comparison table</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['plans', 'services', 'comparison'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'plans' && 'Pricing Plans'}
              {tab === 'services' && 'Add-on Services'}
              {tab === 'comparison' && 'Plan Comparison'}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== PRICING PLANS TAB ==================== */}
      {activeTab === 'plans' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Pricing Plans</h2>
              <button
                onClick={handleAddPlan}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                disabled={saving}
              >
                <Plus size={18} />
                Add New Plan
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Edit Form */}
            {editingPlan && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingPlan.id ? `Edit Plan: ${editingPlan.name}` : 'Create New Plan'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSavePlan}
                      disabled={saving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check size={18} />}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingPlan(null)}
                      disabled={saving}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
                    <input
                      type="text"
                      value={editingPlan.name}
                      onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      value={editingPlan.type}
                      onChange={(e) => setEditingPlan({...editingPlan, type: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Period</label>
                    <input
                      type="text"
                      value={editingPlan.price_period}
                      onChange={(e) => setEditingPlan({...editingPlan, price_period: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="/মাস or /বছর"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Unit</label>
                    <input
                      type="text"
                      value={editingPlan.price_unit}
                      onChange={(e) => setEditingPlan({...editingPlan, price_unit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="BDT"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={editingPlan.display_order}
                      onChange={(e) => setEditingPlan({...editingPlan, display_order: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingPlan.subtitle || ''}
                      onChange={(e) => setEditingPlan({...editingPlan, subtitle: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ছোট ব্যবসার জন্য আদর্শ"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Info</label>
                    <input
                      type="text"
                      value={editingPlan.discount_info || ''}
                      onChange={(e) => setEditingPlan({...editingPlan, discount_info: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="২০% ছাড়"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPlan.is_popular}
                        onChange={(e) => setEditingPlan({...editingPlan, is_popular: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Mark as Popular</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPlan.is_active}
                        onChange={(e) => setEditingPlan({...editingPlan, is_active: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Features *</label>
                      <button
                        onClick={handleAddFeature}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editingPlan.features && editingPlan.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleUpdateFeature(index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Feature name"
                          />
                          <button
                            onClick={() => handleRemoveFeature(index)}
                            className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plans List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans.sort((a, b) => a.display_order - b.display_order).map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white border-2 rounded-xl p-6 relative transition-all hover:shadow-lg ${
                    plan.is_popular ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-200'
                  }`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        জনপ্রিয়
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                      <Zap className="w-6 h-6" />
                    </div>
                    {!plan.is_active && (
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                        Inactive
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{plan.subtitle}</p>
                  <p className="text-xs text-gray-500 mb-4">Type: {plan.type}</p>

                  <div className="mb-4">
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-gray-900">৳{parseFloat(plan.price).toLocaleString()}</span>
                      <span className="text-gray-600 text-sm">{plan.price_period}</span>
                    </div>
                    {plan.discount_info && (
                      <p className="text-xs text-green-600 font-semibold mt-1">{plan.discount_info}</p>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features && plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {plan.features && plan.features.length > 3 && (
                      <li className="text-sm text-gray-500">+ {plan.features.length - 3} more features</li>
                    )}
                  </ul>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      disabled={saving}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      disabled={saving}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pricingPlans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No pricing plans found. Create your first plan!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== ADD-ON SERVICES TAB ==================== */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Add-on Services</h2>
              <button
                onClick={handleAddService}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                <Plus size={18} />
                Add New Service
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Edit Form */}
            {editingService && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingService.id ? `Edit Service: ${editingService.title}` : 'Create New Service'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveService}
                      disabled={saving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check size={18} />}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      disabled={saving}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <input
                      type="number"
                      value={editingService.price}
                      onChange={(e) => setEditingService({...editingService, price: parseFloat(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={editingService.unit}
                      onChange={(e) => setEditingService({...editingService, unit: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="/মাস">/মাস</option>
                      <option value="/বছর">/বছর</option>
                      <option value="/একবার">/একবার</option>
                      <option value="/এসএমএস">/এসএমএস</option>
                      <option value="/পোস্ট">/পোস্ট</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={editingService.display_order}
                      onChange={(e) => setEditingService({...editingService, display_order: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Service description..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingService.is_active}
                      onChange={(e) => setEditingService({...editingService, is_active: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addOnServices.sort((a, b) => a.display_order - b.display_order).map((service) => (
                <div key={service.id} className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 flex-1">{service.title}</h3>
                    {!service.is_active && (
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold ml-2">
                        Inactive
                      </span>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                  )}
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-xl font-bold text-gray-900">৳{parseFloat(service.price).toLocaleString()}</span>
                    <span className="text-gray-600 text-sm">{service.unit}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditService(service)}
                      disabled={saving}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      disabled={saving}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {addOnServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found. Create your first service!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== PLAN COMPARISON TAB ==================== */}
      {activeTab === 'comparison' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Plan Comparison Table</h2>
              <button
                onClick={handleAddComparison}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                <Plus size={18} />
                Add New Feature
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Edit Form */}
            {editingComparison && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingComparison.id ? 'Edit Comparison Feature' : 'Create New Comparison Feature'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveComparison}
                      disabled={saving}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check size={18} />}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingComparison(null)}
                      disabled={saving}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feature Name *</label>
                    <input
                      type="text"
                      value={editingComparison.feature_name}
                      onChange={(e) => setEditingComparison({...editingComparison, feature_name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. ওয়েবসাইট সংখ্যা"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Starter Value</label>
                    <input
                      type="text"
                      value={editingComparison.starter_value || ''}
                      onChange={(e) => setEditingComparison({...editingComparison, starter_value: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. ১টি"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Value</label>
                    <input
                      type="text"
                      value={editingComparison.professional_value || ''}
                      onChange={(e) => setEditingComparison({...editingComparison, professional_value: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. ৩টি"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enterprise Value</label>
                    <input
                      type="text"
                      value={editingComparison.enterprise_value || ''}
                      onChange={(e) => setEditingComparison({...editingComparison, enterprise_value: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. আনলিমিটেড"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-full bg-white border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Feature</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">Starter</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">Professional</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">Enterprise</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {planComparisons.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-700">{row.feature_name}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.starter_value || '-'}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.professional_value || '-'}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.enterprise_value || '-'}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditComparison(row)}
                            disabled={saving}
                            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors disabled:text-gray-400"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteComparison(row.id)}
                            disabled={saving}
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors disabled:text-gray-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {planComparisons.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No comparison features found. Create your first feature!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricing;