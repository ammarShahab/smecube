import axios from 'axios';

// Use import.meta.env for Vite projects
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const blogService = {
  // ==================== PUBLIC APIS ====================
  
  getBlogPageData: async () => {
    try {
      const response = await apiClient.get('/blogs/page-data');
      return {
        posts: response.data.posts || [],
        categories: response.data.categories || [],
        reviews: response.data.reviews || []
      };
    } catch (error) {
      console.error('Error fetching blog page data:', error);
      throw error;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/blogs/${slug}`);
      return {
        post: response.data.post,
        relatedPosts: response.data.relatedPosts || []
      };
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  },

  // ==================== ADMIN APIS ====================
  
  getAllPosts: async () => {
    try {
      const response = await apiClient.get('/admin/blogs/posts');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await apiClient.post('/admin/blogs/posts', postData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    try {
      const response = await apiClient.put(`/admin/blogs/posts/${id}`, postData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/blogs/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // ==================== CATEGORIES ====================
  
  getCategories: async () => {
    try {
      const response = await apiClient.get('/admin/blogs/categories');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/admin/blogs/categories', categoryData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/admin/blogs/categories/${id}`, categoryData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/blogs/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // ==================== REVIEWS ====================
  
  getReviews: async () => {
    try {
      const response = await apiClient.get('/admin/blogs/reviews');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  createReview: async (reviewData) => {
    try {
      const response = await apiClient.post('/admin/blogs/reviews', reviewData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  updateReview: async (id, reviewData) => {
    try {
      const response = await apiClient.put(`/admin/blogs/reviews/${id}`, reviewData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  deleteReview: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/blogs/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};

export default blogService;