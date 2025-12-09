import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const facebookBoostingService = {
  // Client-facing endpoints
  getPageData: () => axios.get(`${API_URL}/facebook-boosting/page-data`),
  
  submitForm: (data) => axios.post(`${API_URL}/facebook-boosting/submit`, data),

  // Admin endpoints
  getAdminData: () => axios.get(`${API_URL}/admin/facebook-boosting`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

  saveAdminData: (data) => axios.post(`${API_URL}/admin/facebook-boosting`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

  getSubmissions: () => axios.get(`${API_URL}/admin/facebook-boosting/submissions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

  getSubmissionStats: () => axios.get(`${API_URL}/admin/facebook-boosting/submissions/stats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
};

export default facebookBoostingService;