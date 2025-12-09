import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bulkSmsService = {
  // ==================== PUBLIC API ====================
  getPageData: async () => {
    try {
      const response = await apiClient.get('/bulk-sms/page-data');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching page data:', error);
      throw error;
    }
  },

  // ==================== ADMIN SINGLE API ====================
  getAdminData: async () => {
    try {
      const response = await apiClient.get('/admin/bulk-sms');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  },

  saveAdminData: async (data) => {
    try {
      const response = await apiClient.post('/admin/bulk-sms', data);
      return response.data;
    } catch (error) {
      console.error('Error saving admin data:', error);
      throw error;
    }
  },

  // ==================== INDIVIDUAL ENDPOINTS ====================
  
  // Hero
  getHero: async () => {
    const response = await apiClient.get('/admin/bulk-sms/hero');
    return response.data.data;
  },
  
  updateHero: async (data) => {
    const response = await apiClient.put('/admin/bulk-sms/hero', data);
    return response.data.data;
  },

  // Features
  getFeatures: async () => {
    const response = await apiClient.get('/admin/bulk-sms/features');
    return response.data.data;
  },
  
  createFeature: async (data) => {
    const response = await apiClient.post('/admin/bulk-sms/features', data);
    return response.data.data;
  },
  
  updateFeature: async (id, data) => {
    const response = await apiClient.put(`/admin/bulk-sms/features/${id}`, data);
    return response.data.data;
  },
  
  deleteFeature: async (id) => {
    const response = await apiClient.delete(`/admin/bulk-sms/features/${id}`);
    return response.data;
  },

  // Use Cases
  getUseCases: async () => {
    const response = await apiClient.get('/admin/bulk-sms/use-cases');
    return response.data.data;
  },
  
  createUseCase: async (data) => {
    const response = await apiClient.post('/admin/bulk-sms/use-cases', data);
    return response.data.data;
  },
  
  updateUseCase: async (id, data) => {
    const response = await apiClient.put(`/admin/bulk-sms/use-cases/${id}`, data);
    return response.data.data;
  },
  
  deleteUseCase: async (id) => {
    const response = await apiClient.delete(`/admin/bulk-sms/use-cases/${id}`);
    return response.data;
  },

  // Process Steps
  getProcessSteps: async () => {
    const response = await apiClient.get('/admin/bulk-sms/process-steps');
    return response.data.data;
  },
  
  createProcessStep: async (data) => {
    const response = await apiClient.post('/admin/bulk-sms/process-steps', data);
    return response.data.data;
  },
  
  updateProcessStep: async (id, data) => {
    const response = await apiClient.put(`/admin/bulk-sms/process-steps/${id}`, data);
    return response.data.data;
  },
  
  deleteProcessStep: async (id) => {
    const response = await apiClient.delete(`/admin/bulk-sms/process-steps/${id}`);
    return response.data;
  },

  // Stats
  getStats: async () => {
    const response = await apiClient.get('/admin/bulk-sms/stats');
    return response.data.data;
  },
  
  createStat: async (data) => {
    const response = await apiClient.post('/admin/bulk-sms/stats', data);
    return response.data.data;
  },
  
  updateStat: async (id, data) => {
    const response = await apiClient.put(`/admin/bulk-sms/stats/${id}`, data);
    return response.data.data;
  },
  
  deleteStat: async (id) => {
    const response = await apiClient.delete(`/admin/bulk-sms/stats/${id}`);
    return response.data;
  },

  // Packages
  getPackages: async () => {
    const response = await apiClient.get('/admin/bulk-sms/packages');
    return response.data.data;
  },
  
  createPackage: async (data) => {
    const response = await apiClient.post('/admin/bulk-sms/packages', data);
    return response.data.data;
  },
  
  updatePackage: async (id, data) => {
    const response = await apiClient.put(`/admin/bulk-sms/packages/${id}`, data);
    return response.data.data;
  },
  
  deletePackage: async (id) => {
    const response = await apiClient.delete(`/admin/bulk-sms/packages/${id}`);
    return response.data;
  },

  // CTA
  getCta: async () => {
    const response = await apiClient.get('/admin/bulk-sms/cta');
    return response.data.data;
  },
  
  updateCta: async (data) => {
    const response = await apiClient.put('/admin/bulk-sms/cta', data);
    return response.data.data;
  },
};

export default bulkSmsService;