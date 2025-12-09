// src/services/webDevelopmentService.js
import api from './api';

const webDevelopmentService = {
  // Public routes
  getPageData: () => api.get('/web-development/page-data'),
  submitInquiry: (data) => api.post('/web-development/inquiry', data),
  submitCustomProject: (data) => api.post('/web-development/custom-project', data),
  
  // Admin routes
  getAdminData: () => api.get('/admin/web-development'),
  saveAdminData: (data) => api.post('/admin/web-development', data),
  getCustomProjectRequests: () => api.get('/admin/web-development/custom-requests'),
  updateCustomRequestStatus: (id, data) => api.put(`/admin/web-development/custom-requests/${id}/status`, data),
  getInquiries: () => api.get('/admin/web-development/inquiries'),
  getInquiryStats: () => api.get('/admin/web-development/inquiries/stats'),
  updateInquiryStatus: (id, data) => api.put(`/admin/web-development/inquiries/${id}/status`, data),
};

export default webDevelopmentService;