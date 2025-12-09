import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for authentication (same as blog service)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const businessConsultingService = {
  // ==================== PUBLIC APIS ====================
  getPageData: async () => {
    try {
      const response = await apiClient.get("/business-consulting/page-data");
      return response.data;
    } catch (error) {
      console.error("Error fetching business consulting page data:", error);
      throw error;
    }
  },

  // ==================== ADMIN APIS ====================

  // Get all admin data
  getAdminData: async () => {
    try {
      const response = await apiClient.get("/admin/business-consulting");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin data:", error);
      throw error;
    }
  },

  // Save all admin data (bulk update)
  saveAdminData: async (data) => {
    try {
      const response = await apiClient.post("/admin/business-consulting", data);
      return response.data;
    } catch (error) {
      console.error("Error saving admin data:", error);
      throw error;
    }
  },

  // Hero
  getHero: async () => {
    try {
      const response = await apiClient.get("/admin/business-consulting/hero");
      return response.data;
    } catch (error) {
      console.error("Error fetching hero:", error);
      throw error;
    }
  },

  updateHero: async (heroData) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/hero",
        heroData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating hero:", error);
      throw error;
    }
  },

  // Services
  getServices: async () => {
    try {
      const response = await apiClient.get(
        "/admin/business-consulting/services"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  },

  createService: async (serviceData) => {
    try {
      const response = await apiClient.post(
        "/admin/business-consulting/services",
        serviceData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  },

  updateService: async (id, serviceData) => {
    try {
      const response = await apiClient.put(
        `/admin/business-consulting/services/${id}`,
        serviceData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  },

  deleteService: async (id) => {
    try {
      const response = await apiClient.delete(
        `/admin/business-consulting/services/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  },

  // Consulting Areas
  updateConsultingAreas: async (consultingAreas) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/consulting-areas",
        { consulting_areas: consultingAreas }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating consulting areas:", error);
      throw error;
    }
  },

  // Packages
  updatePackages: async (packages) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/packages",
        { packages }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating packages:", error);
      throw error;
    }
  },

  // Process
  updateProcess: async (process) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/process",
        { process }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating process:", error);
      throw error;
    }
  },

  // Testimonials
  updateTestimonials: async (testimonials) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/testimonials",
        { testimonials }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating testimonials:", error);
      throw error;
    }
  },

  // Stats
  updateStats: async (stats) => {
    try {
      const response = await apiClient.put("/admin/business-consulting/stats", {
        stats,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating stats:", error);
      throw error;
    }
  },

  // SEO
  getSeo: async () => {
    try {
      const response = await apiClient.get("/admin/business-consulting/seo");
      return response.data;
    } catch (error) {
      console.error("Error fetching SEO data:", error);
      throw error;
    }
  },

  updateSeo: async (seoData) => {
    try {
      const response = await apiClient.put(
        "/admin/business-consulting/seo",
        seoData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating SEO data:", error);
      throw error;
    }
  },
};

export default businessConsultingService;
