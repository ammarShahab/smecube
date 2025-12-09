import api from './api';

const contactService = {
  getPageData: () => api.get('/contact/page-data'),

  getAdminData: () => api.get('/admin/contact'),

  saveAdminData: (data) => api.post('/admin/contact', data)
};

export default contactService;
