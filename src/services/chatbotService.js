// src/services/chatbotService.js
import api from "./api"; // Import your configured axios instance

const chatbotService = {
  // Client API - matches your route: GET /api/chatbot/page-data
  getPageData: () => api.get("/chatbot/page-data"),

  // Admin API - matches your route: GET /api/admin/chatbot
  getAdminData: () => api.get("/admin/chatbot"),

  // Save admin data - matches your route: POST /api/admin/chatbot
  saveAdminData: (data) => api.post("/admin/chatbot", data),

  // SEO API
  getSeo: () => api.get("/admin/chatbot/seo"),
  updateSeo: (data) => api.put("/admin/chatbot/seo", data),
};

export default chatbotService;
