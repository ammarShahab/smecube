import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const issueFixingService = {
  getPageData: () => axios.get(`${API_URL}/issue-fixing/page-data`),

  getAdminData: () => axios.get(`${API_URL}/admin/issue-fixing`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),

  saveAdminData: (data) => axios.post(`${API_URL}/admin/issue-fixing`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),

  // SEO API
  getSeo: () => axios.get(`${API_URL}/admin/issue-fixing/seo`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),

  updateSeo: (data) => axios.put(`${API_URL}/admin/issue-fixing/seo`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
};

export default issueFixingService;