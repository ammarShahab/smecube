// src/pages/admin/dashboard/AdminEcommerceSolution.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Plus, Edit, Zap, Shield, Globe, Rocket, Sparkles, Clock } from 'lucide-react';
import ecommerceService from '../../../services/ecommerceService';

// Icon mapping for dynamic rendering
const iconMap = {
  Zap,
  Shield,
  Globe,
  Rocket,
  Sparkles,
  Clock,
};

const AdminEcommerceSolution = () => {
  // State for all data
  const [heroData, setHeroData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [demoProjects, setDemoProjects] = useState([]);
  const [clients, setClients] = useState([]);
  
  // State for editing
  const [editingHero, setEditingHero] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [editingProcessStep, setEditingProcessStep] = useState(null);
  const [editingDemoProject, setEditingDemoProject] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use Promise.all to load all data concurrently
      const [heroResponse, featuresResponse, stepsResponse, projectsResponse, clientsResponse] = await Promise.all([
        ecommerceService.getHero(),
        ecommerceService.getFeatures(),
        ecommerceService.getProcessSteps(),
        ecommerceService.getDemoProjects(),
        ecommerceService.getClients()
      ]);

      // Log responses to debug
      console.log('API Responses:', {
        hero: heroResponse,
        features: featuresResponse,
        steps: stepsResponse,
        projects: projectsResponse,
        clients: clientsResponse
      });

      // FIXED: Better response handling
      // The API returns { data: { data: [...] } } structure
      setHeroData(heroResponse?.data?.data || heroResponse?.data || null);
      
      // Handle features - check multiple levels
      const featuresData = featuresResponse?.data?.data || featuresResponse?.data || featuresResponse;
      setFeatures(Array.isArray(featuresData) ? featuresData : []);
      
      // Handle process steps
      const stepsData = stepsResponse?.data?.data || stepsResponse?.data || stepsResponse;
      setProcessSteps(Array.isArray(stepsData) ? stepsData : []);
      
      // Handle demo projects
      const projectsData = projectsResponse?.data?.data || projectsResponse?.data || projectsResponse;
      setDemoProjects(Array.isArray(projectsData) ? projectsData : []);
      
      // Handle clients
      const clientsData = clientsResponse?.data?.data || clientsResponse?.data || clientsResponse;
      setClients(Array.isArray(clientsData) ? clientsData : []);

      console.log('Processed data:', {
        heroData: heroResponse?.data?.data || heroResponse?.data,
        featuresCount: Array.isArray(featuresData) ? featuresData.length : 0,
        stepsCount: Array.isArray(stepsData) ? stepsData.length : 0,
        projectsCount: Array.isArray(projectsData) ? projectsData.length : 0,
        clientsCount: Array.isArray(clientsData) ? clientsData.length : 0
      });

    } catch (error) {
      console.error('Error loading data:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Failed to load data. Please check your authentication and try again.');
      
      // Set empty arrays as fallback
      setFeatures([]);
      setProcessSteps([]);
      setDemoProjects([]);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // Hero Section Functions
  const handleHeroChange = (e) => {
    setHeroData({ ...heroData, [e.target.name]: e.target.value });
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...(heroData?.stats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setHeroData({ ...heroData, stats: updatedStats });
  };

  const handleSaveHero = async () => {
    try {
      await ecommerceService.updateHero(heroData);
      setEditingHero(false);
      alert('Hero section updated successfully!');
    } catch (error) {
      console.error('Error saving hero:', error);
      alert('Error saving hero section');
    }
  };

  // Features Functions
  const addFeature = async () => {
    const newFeature = {
      title: 'নতুন ফিচার',
      description: 'বর্ণনা লিখুন...',
      icon: 'Zap',
      gradient: 'from-blue-500 to-cyan-600',
      icon_bg: 'bg-blue-100',
      display_order: features.length + 1,
      is_active: true
    };

    try {
      const response = await ecommerceService.createFeature(newFeature);
      const newFeatureData = response?.data?.data || response?.data || response;
      setFeatures(prev => [...prev, newFeatureData]);
      setEditingFeature(newFeatureData.id);
    } catch (error) {
      console.error('Error creating feature:', error);
      alert('Error creating feature');
    }
  };

  const updateFeature = async (id, updatedData) => {
    try {
      await ecommerceService.updateFeature(id, updatedData);
      setFeatures(features.map((f) => (f.id === id ? { ...f, ...updatedData } : f)));
      setEditingFeature(null);
    } catch (error) {
      console.error('Error updating feature:', error);
      alert('Error updating feature');
    }
  };

  const deleteFeature = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await ecommerceService.deleteFeature(id);
        setFeatures(features.filter((f) => f.id !== id));
      } catch (error) {
        console.error('Error deleting feature:', error);
        alert('Error deleting feature');
      }
    }
  };

  // Process Steps Functions
  const addProcessStep = async () => {
    const newStep = {
      step_number: `০${processSteps.length + 1}`,
      title: 'নতুন ধাপ',
      description: 'বর্ণনা লিখুন...',
      gradient: 'from-blue-500 to-cyan-600',
      icon_bg: 'bg-blue-100',
      display_order: processSteps.length + 1,
      is_active: true
    };

    try {
      const response = await ecommerceService.createProcessStep(newStep);
      const newStepData = response?.data?.data || response?.data || response;
      setProcessSteps(prev => [...prev, newStepData]);
      setEditingProcessStep(newStepData.id);
    } catch (error) {
      console.error('Error creating process step:', error);
      alert('Error creating process step');
    }
  };

  const updateProcessStep = async (id, updatedData) => {
    try {
      await ecommerceService.updateProcessStep(id, updatedData);
      setProcessSteps(processSteps.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
      setEditingProcessStep(null);
    } catch (error) {
      console.error('Error updating process step:', error);
      alert('Error updating process step');
    }
  };

  const deleteProcessStep = async (id) => {
    if (window.confirm('Are you sure you want to delete this process step?')) {
      try {
        await ecommerceService.deleteProcessStep(id);
        setProcessSteps(processSteps.filter((s) => s.id !== id));
      } catch (error) {
        console.error('Error deleting process step:', error);
        alert('Error deleting process step');
      }
    }
  };

  // Demo Projects Functions
  const addDemoProject = async () => {
    const newProject = {
      title: 'নতুন প্রজেক্ট',
      description: 'বর্ণনা লিখুন...',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      gradient: 'from-blue-500 to-cyan-600',
      display_order: demoProjects.length + 1,
      is_active: true
    };

    try {
      const response = await ecommerceService.createDemoProject(newProject);
      const newProjectData = response?.data?.data || response?.data || response;
      setDemoProjects(prev => [...prev, newProjectData]);
      setEditingDemoProject(newProjectData.id);
    } catch (error) {
      console.error('Error creating demo project:', error);
      alert('Error creating demo project');
    }
  };

  const updateDemoProject = async (id, updatedData) => {
    try {
      await ecommerceService.updateDemoProject(id, updatedData);
      setDemoProjects(demoProjects.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
      setEditingDemoProject(null);
    } catch (error) {
      console.error('Error updating demo project:', error);
      alert('Error updating demo project');
    }
  };

  const deleteDemoProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this demo project?')) {
      try {
        await ecommerceService.deleteDemoProject(id);
        setDemoProjects(demoProjects.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting demo project:', error);
        alert('Error deleting demo project');
      }
    }
  };

  // Clients Functions
  const addClient = async () => {
    const newClient = {
      name: 'নতুন ক্লায়েন্ট',
      domain: 'example.com',
      display_order: clients.length + 1,
      is_active: true
    };

    try {
      const response = await ecommerceService.createClient(newClient);
      const newClientData = response?.data?.data || response?.data || response;
      setClients(prev => [...prev, newClientData]);
      setEditingClient(newClientData.id);
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Error creating client');
    }
  };

  const updateClient = async (id, updatedData) => {
    try {
      await ecommerceService.updateClient(id, updatedData);
      setClients(clients.map((c) => (c.id === id ? { ...c, ...updatedData } : c)));
      setEditingClient(null);
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Error updating client');
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await ecommerceService.deleteClient(id);
        setClients(clients.filter((c) => c.id !== id));
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client');
      }
    }
  };

  // Icon options for features
  const iconOptions = ['Zap', 'Shield', 'Globe', 'Rocket', 'Sparkles', 'Clock'];

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Loading admin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={loadAllData}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen font-hind">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-hind {
          font-family: 'Hind Siliguri', sans-serif;
        }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-hind">Ecommerce Solution Admin Panel</h1>
        <button
          onClick={loadAllData}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Refresh Data
        </button>
      </div>

      {/* Debug Info */}
      <div className="mb-6 p-4 bg-yellow-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <div className="text-sm">
          Features: {Array.isArray(features) ? features.length : 'Not an array'} | 
          Process Steps: {Array.isArray(processSteps) ? processSteps.length : 'Not an array'} | 
          Demo Projects: {Array.isArray(demoProjects) ? demoProjects.length : 'Not an array'} | 
          Clients: {Array.isArray(clients) ? clients.length : 'Not an array'}
        </div>
      </div>

      {/* Hero Section Editor */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 font-hind text-gray-700">Hero Section</h2>
        {!heroData ? (
          <div className="text-gray-500">No hero data available</div>
        ) : editingHero ? (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1 font-hind">Title</label>
              <input
                type="text"
                name="title"
                value={heroData.title || ''}
                onChange={handleHeroChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 font-hind">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={heroData.subtitle || ''}
                onChange={handleHeroChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 font-hind">Description</label>
              <textarea
                name="description"
                value={heroData.description || ''}
                onChange={handleHeroChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                rows="4"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 font-hind">CTA 1 Text</label>
                <input
                  type="text"
                  name="cta1_text"
                  value={heroData.cta1_text || ''}
                  onChange={handleHeroChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 font-hind">CTA 2 Text</label>
                <input
                  type="text"
                  name="cta2_text"
                  value={heroData.cta2_text || ''}
                  onChange={handleHeroChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold font-hind">Stats</h3>
              {(heroData.stats || []).map((stat, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 font-hind">Value</label>
                    <input
                      type="text"
                      value={stat.value || stat.number || ''}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 font-hind">Label</label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveHero}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
              >
                <Save size={18} /> Save
              </button>
              <button
                onClick={() => setEditingHero(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold font-hind">Preview</h3>
              <p className="text-lg font-bold font-hind">{heroData.subtitle}</p>
              <p className="text-xl font-bold font-hind">{heroData.title}</p>
              <p className="text-gray-600 font-hind whitespace-pre-line">{heroData.description}</p>
              <div className="flex gap-4 mt-2">
                <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-hind">{heroData.cta1_text}</button>
                <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-hind">{heroData.cta2_text}</button>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {(heroData.stats || []).map((stat, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded-lg text-center">
                    <p className="font-bold font-hind">{stat.value || stat.number}</p>
                    <p className="text-sm text-gray-600 font-hind">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setEditingHero(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <Edit size={18} /> Edit Hero
            </button>
          </div>
        )}
      </motion.section>

      {/* Features Editor */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-hind text-gray-700">
            Features ({features.length})
          </h2>
          <button
            onClick={addFeature}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <Plus size={18} /> Add Feature
          </button>
        </div>
        
        {!Array.isArray(features) || features.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No features found. Create your first feature!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="border border-gray-200 p-4 rounded-lg">
                {editingFeature === feature.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Title</label>
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => setFeatures(features.map(f => f.id === feature.id ? {...f, title: e.target.value} : f))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Description</label>
                      <input
                        type="text"
                        value={feature.description || ''}
                        onChange={(e) => setFeatures(features.map(f => f.id === feature.id ? {...f, description: e.target.value} : f))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Icon</label>
                      <select
                        value={feature.icon || 'Zap'}
                        onChange={(e) => setFeatures(features.map(f => f.id === feature.id ? {...f, icon: e.target.value} : f))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Gradient</label>
                      <input
                        type="text"
                        value={feature.gradient || ''}
                        onChange={(e) => setFeatures(features.map(f => f.id === feature.id ? {...f, gradient: e.target.value} : f))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="e.g., from-blue-500 to-cyan-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Icon Background</label>
                      <input
                        type="text"
                        value={feature.icon_bg || ''}
                        onChange={(e) => setFeatures(features.map(f => f.id === feature.id ? {...f, icon_bg: e.target.value} : f))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="e.g., bg-blue-100"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateFeature(feature.id, feature)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                      >
                        <Save size={18} /> Save
                      </button>
                      <button
                        onClick={() => setEditingFeature(null)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteFeature(feature.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`inline-flex items-center justify-center w-10 h-10 ${feature.icon_bg || 'bg-gray-100'} rounded-lg`}>
                        {iconMap[feature.icon] ? (
                          React.createElement(iconMap[feature.icon], { className: 'w-6 h-6 text-gray-700' })
                        ) : (
                          <span className="text-gray-500">No Icon</span>
                        )}
                      </div>
                      <h3 className="font-semibold font-hind">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 font-hind">{feature.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Gradient: {feature.gradient}</p>
                    <button
                      onClick={() => setEditingFeature(feature.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                    >
                      <Edit size={18} /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Process Steps Editor */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-hind text-gray-700">
            Process Steps ({processSteps.length})
          </h2>
          <button
            onClick={addProcessStep}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <Plus size={18} /> Add Process Step
          </button>
        </div>
        
        {!Array.isArray(processSteps) || processSteps.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No process steps found. Create your first step!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processSteps.map((step) => (
              <div key={step.id} className="border border-gray-200 p-4 rounded-lg">
                {editingProcessStep === step.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Step Number</label>
                      <input
                        type="text"
                        value={step.step_number || ''}
                        onChange={(e) => setProcessSteps(processSteps.map(s => s.id === step.id ? {...s, step_number: e.target.value} : s))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Title</label>
                      <input
                        type="text"
                        value={step.title || ''}
                        onChange={(e) => setProcessSteps(processSteps.map(s => s.id === step.id ? {...s, title: e.target.value} : s))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Description</label>
                      <input
                        type="text"
                        value={step.description || ''}
                        onChange={(e) => setProcessSteps(processSteps.map(s => s.id === step.id ? {...s, description: e.target.value} : s))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Gradient</label>
                      <input
                        type="text"
                        value={step.gradient || ''}
                        onChange={(e) => setProcessSteps(processSteps.map(s => s.id === step.id ? {...s, gradient: e.target.value} : s))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="e.g., from-blue-500 to-cyan-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Icon Background</label>
                      <input
                        type="text"
                        value={step.icon_bg || ''}
                        onChange={(e) => setProcessSteps(processSteps.map(s => s.id === step.id ? {...s, icon_bg: e.target.value} : s))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="e.g., bg-blue-100"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateProcessStep(step.id, step)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                      >
                        <Save size={18} /> Save
                      </button>
                      <button
                        onClick={() => setEditingProcessStep(null)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteProcessStep(step.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold font-hind">{step.step_number} - {step.title}</h3>
                    <p className="text-gray-600 font-hind">{step.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Gradient: {step.gradient}</p>
                    <button
                      onClick={() => setEditingProcessStep(step.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                    >
                      <Edit size={18} /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Demo Projects Editor */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-hind text-gray-700">
            Demo Projects ({demoProjects.length})
          </h2>
          <button
            onClick={addDemoProject}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <Plus size={18} /> Add Demo Project
          </button>
        </div>
        
        {!Array.isArray(demoProjects) || demoProjects.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No demo projects found. Create your first project!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 p-4 rounded-lg">
                {editingDemoProject === project.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Title</label>
                      <input
                        type="text"
                        value={project.title || ''}
                        onChange={(e) => setDemoProjects(demoProjects.map(p => p.id === project.id ? {...p, title: e.target.value} : p))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Description</label>
                      <input
                        type="text"
                        value={project.description || ''}
                        onChange={(e) => setDemoProjects(demoProjects.map(p => p.id === project.id ? {...p, description: e.target.value} : p))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Image URL</label>
                      <input
                        type="url"
                        value={project.image_url || ''}
                        onChange={(e) => setDemoProjects(demoProjects.map(p => p.id === project.id ? {...p, image_url: e.target.value} : p))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Gradient</label>
                      <input
                        type="text"
                        value={project.gradient || ''}
                        onChange={(e) => setDemoProjects(demoProjects.map(p => p.id === project.id ? {...p, gradient: e.target.value} : p))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="e.g., from-blue-500 to-cyan-600"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateDemoProject(project.id, project)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                      >
                        <Save size={18} /> Save
                      </button>
                      <button
                        onClick={() => setEditingDemoProject(null)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteDemoProject(project.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img src={project.image_url} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                    <h3 className="font-semibold font-hind">{project.title}</h3>
                    <p className="text-gray-600 font-hind text-sm">{project.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Gradient: {project.gradient}</p>
                    <button
                      onClick={() => setEditingDemoProject(project.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                    >
                      <Edit size={18} /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Clients Editor */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold font-hind text-gray-700">
            Clients ({clients.length})
          </h2>
          <button
            onClick={addClient}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <Plus size={18} /> Add Client
          </button>
        </div>
        
        {!Array.isArray(clients) || clients.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No clients found. Add your first client!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="border border-gray-200 p-4 rounded-lg">
                {editingClient === client.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Name</label>
                      <input
                        type="text"
                        value={client.name || ''}
                        onChange={(e) => setClients(clients.map(c => c.id === client.id ? {...c, name: e.target.value} : c))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 font-hind">Domain</label>
                      <input
                        type="text"
                        value={client.domain || ''}
                        onChange={(e) => setClients(clients.map(c => c.id === client.id ? {...c, domain: e.target.value} : c))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => updateClient(client.id, client)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                      >
                        <Save size={18} /> Save
                      </button>
                      <button
                        onClick={() => setEditingClient(null)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={`https://logo.clearbit.com/${client.domain}`}
                        alt={client.name}
                        className="h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://via.placeholder.com/120x40?text=${encodeURIComponent(client.name)}`;
                        }}
                      />
                      <h3 className="font-semibold font-hind">{client.name}</h3>
                    </div>
                    <p className="text-gray-600 font-hind text-sm">Domain: {client.domain}</p>
                    <button
                      onClick={() => setEditingClient(client.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                    >
                      <Edit size={18} /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default AdminEcommerceSolution;