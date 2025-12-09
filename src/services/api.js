import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request with token:', config.url);
    }
    // Don't override Content-Type for FormData (let browser set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pricing APIs
export const pricingPlansAPI = {
  getAll: () => api.get('/pricing/plans'),
  create: (data) => api.post('/pricing/plans', data),
  update: (id, data) => api.put(`/pricing/plans/${id}`, data),
  delete: (id) => api.delete(`/pricing/plans/${id}`),
};

export const extraServicesAPI = {
  getAll: () => api.get('/pricing/services'),
  create: (data) => api.post('/pricing/services', data),
  update: (id, data) => api.put(`/pricing/services/${id}`, data),
  delete: (id) => api.delete(`/pricing/services/${id}`),
};

export const planComparisonsAPI = {
  getAll: () => api.get('/pricing/comparisons'),
  create: (data) => api.post('/pricing/comparisons', data),
  update: (id, data) => api.put(`/pricing/comparisons/${id}`, data),
  delete: (id) => api.delete(`/pricing/comparisons/${id}`),
};

// Navbar APIs
export const navbarAPI = {
  // Get navbar configuration
  getConfig: () => api.get('/navbar/config'),
  
  // Update navbar configuration
  updateConfig: (data) => api.put('/navbar/config', data),
  
  // Upload logo
  uploadLogo: (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post('/navbar/upload-logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    });
  },
  
  // Menu items CRUD
  createMenuItem: (data) => api.post('/navbar/menu-items', data),
  updateMenuItem: (id, data) => api.put(`/navbar/menu-items/${id}`, data),
  deleteMenuItem: (id) => api.delete(`/navbar/menu-items/${id}`),
  reorderMenuItems: (items) => api.post('/navbar/menu-items/reorder', { items }),
};

export default api;