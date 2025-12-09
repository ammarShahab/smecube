import api from "./api";

const graphicDesignService = {
  getPageData: () => api.get("/graphic-design/page-data"),
  getAdminData: () => api.get("/admin/graphic-design"),
  saveAdminData: (data) => api.post("/admin/graphic-design", data),
  getSeo: () => api.get("/admin/graphic-design/seo"),
  updateSeo: (data) => api.put("/admin/graphic-design/seo", data),
};

export default graphicDesignService;
