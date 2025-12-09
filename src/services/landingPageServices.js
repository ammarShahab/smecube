// src/services/landingPageServices.js
import api from './api';

const handleResponse = (response) => {
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || 'Request failed');
};

export const landingPageService = {
  // Get all page data in one call (FASTER!)
  getPageData: async () => {
    const response = await api.get('/landing-page/page-data');
    return handleResponse(response);
  },

  // Hero Section
  getHero: async () => {
    const response = await api.get('/admin/landing-page/hero');
    return handleResponse(response);
  },
  updateHero: async (data) => {
    const response = await api.put('/admin/landing-page/hero', data);
    return handleResponse(response);
  },

  // Features
  getFeatures: async () => {
    const response = await api.get('/admin/landing-page/features');
    return handleResponse(response);
  },
  createFeature: async (data) => {
    const response = await api.post('/admin/landing-page/features', data);
    return handleResponse(response);
  },
  updateFeature: async (id, data) => {
    const response = await api.put(`/admin/landing-page/features/${id}`, data);
    return handleResponse(response);
  },
  deleteFeature: async (id) => {
    const response = await api.delete(`/admin/landing-page/features/${id}`);
    return handleResponse(response);
  },

  // Elements
  getElements: async () => {
    const response = await api.get('/admin/landing-page/elements');
    return handleResponse(response);
  },
  createElement: async (data) => {
    const response = await api.post('/admin/landing-page/elements', data);
    return handleResponse(response);
  },
  updateElement: async (id, data) => {
    const response = await api.put(`/admin/landing-page/elements/${id}`, data);
    return handleResponse(response);
  },
  deleteElement: async (id) => {
    const response = await api.delete(`/admin/landing-page/elements/${id}`);
    return handleResponse(response);
  },

  // Process Steps
  getProcessSteps: async () => {
    const response = await api.get('/admin/landing-page/process-steps');
    return handleResponse(response);
  },
  createProcessStep: async (data) => {
    const response = await api.post('/admin/landing-page/process-steps', data);
    return handleResponse(response);
  },
  updateProcessStep: async (id, data) => {
    const response = await api.put(`/admin/landing-page/process-steps/${id}`, data);
    return handleResponse(response);
  },
  deleteProcessStep: async (id) => {
    const response = await api.delete(`/admin/landing-page/process-steps/${id}`);
    return handleResponse(response);
  },

  // Use Cases
  getUseCases: async () => {
    const response = await api.get('/admin/landing-page/use-cases');
    return handleResponse(response);
  },
  createUseCase: async (data) => {
    const response = await api.post('/admin/landing-page/use-cases', data);
    return handleResponse(response);
  },
  updateUseCase: async (id, data) => {
    const response = await api.put(`/admin/landing-page/use-cases/${id}`, data);
    return handleResponse(response);
  },
  deleteUseCase: async (id) => {
    const response = await api.delete(`/admin/landing-page/use-cases/${id}`);
    return handleResponse(response);
  },

  // Packages
  getPackages: async () => {
    const response = await api.get('/admin/landing-page/packages');
    return handleResponse(response);
  },
  createPackage: async (data) => {
    const response = await api.post('/admin/landing-page/packages', data);
    return handleResponse(response);
  },
  updatePackage: async (id, data) => {
    const response = await api.put(`/admin/landing-page/packages/${id}`, data);
    return handleResponse(response);
  },
  deletePackage: async (id) => {
    const response = await api.delete(`/admin/landing-page/packages/${id}`);
    return handleResponse(response);
  },

  // CTA
  getCta: async () => {
    const response = await api.get('/admin/landing-page/cta');
    return handleResponse(response);
  },
  updateCta: async (data) => {
    const response = await api.put('/admin/landing-page/cta', data);
    return handleResponse(response);
  },
};