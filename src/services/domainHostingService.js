import api from './api';

const domainHostingService = {
  getPageData: () => api.get('/domain-hosting/page-data'),

  getAdminData: () => api.get('/admin/domain-hosting'),

  saveAdminData: (data) => api.post('/admin/domain-hosting', data),

  // SEO Methods
  getSeo: () => api.get('/admin/domain-hosting/seo'),
  
  updateSeo: (seoData) => api.put('/admin/domain-hosting/seo', seoData)
};

export default domainHostingService;