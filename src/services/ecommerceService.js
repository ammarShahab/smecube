// src/services/ecommerceService.js
import api from './api';

const ecommerceService = {
  // PUBLIC ROUTE - for client page (no auth needed)
  getPageData: () => api.get('/ecommerce/page-data'),
  
  // ADMIN ROUTES - for admin panel (auth required)
  getHero: () => api.get('/admin/ecommerce/hero'),
  getFeatures: () => api.get('/admin/ecommerce/features'),
  getProcessSteps: () => api.get('/admin/ecommerce/process-steps'),
  getDemoProjects: () => api.get('/admin/ecommerce/demo-projects'),
  getClients: () => api.get('/admin/ecommerce/clients'),
  
  updateHero: (data) => api.put('/admin/ecommerce/hero', data),
  createFeature: (data) => api.post('/admin/ecommerce/features', data),
  updateFeature: (id, data) => api.put(`/admin/ecommerce/features/${id}`, data),
  deleteFeature: (id) => api.delete(`/admin/ecommerce/features/${id}`),
  
  createProcessStep: (data) => api.post('/admin/ecommerce/process-steps', data),
  updateProcessStep: (id, data) => api.put(`/admin/ecommerce/process-steps/${id}`, data),
  deleteProcessStep: (id) => api.delete(`/admin/ecommerce/process-steps/${id}`),
  
  createDemoProject: (data) => api.post('/admin/ecommerce/demo-projects', data),
  updateDemoProject: (id, data) => api.put(`/admin/ecommerce/demo-projects/${id}`, data),
  deleteDemoProject: (id) => api.delete(`/admin/ecommerce/demo-projects/${id}`),
  
  createClient: (data) => api.post('/admin/ecommerce/clients', data),
  updateClient: (id, data) => api.put(`/admin/ecommerce/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/admin/ecommerce/clients/${id}`),
};

export default ecommerceService