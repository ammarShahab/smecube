import api from './api';

const aboutService = {
  getPageData: () => api.get('/about/page-data'),

  getAdminData: () => api.get('/admin/about'),

  saveAdminData: (data) => api.post('/admin/about', data)
};

export default aboutService;
