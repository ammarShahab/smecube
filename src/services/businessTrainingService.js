import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const businessTrainingService = {
  // Client-facing endpoint
  getPageData: () => axios.get(`${API_URL}/business-training/page-data`),

  // Admin endpoints
  getAdminData: () => axios.get(`${API_URL}/admin/business-training`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),


  
  saveAdminData: (data) => axios.post(`${API_URL}/admin/business-training`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
};

export default businessTrainingService;