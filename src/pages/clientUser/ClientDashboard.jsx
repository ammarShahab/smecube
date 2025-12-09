// src/pages/clientUser/ClientDashboard.jsx
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";

function ClientDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Available services and tools
  const availableServices = [
    { id: "fb-boosting", name: "Facebook Boosting", category: "Social Media" },
    { id: "ecommerce", name: "E-commerce Solution", category: "E-commerce" },
    { id: "web-dev", name: "Website Development", category: "Development" },
    { id: "domain-hosting", name: "Domain & Hosting", category: "Infrastructure" },
    { id: "bulk-sms", name: "Bulk SMS", category: "Marketing" },
    { id: "business-consulting", name: "Business Consulting", category: "Consulting" },
    { id: "chatbot", name: "Chatbot Setup", category: "Technology" },
    { id: "graphic-design", name: "Graphic Design", category: "Design" },
  ];

  const availableTools = [
    { id: "crm", name: "Online CRM", category: "Business" },
    { id: "social-automation", name: "Social Media Automation", category: "Social Media" },
    { id: "analytics", name: "Analytics Dashboard", category: "Analytics" },
    { id: "email-marketing", name: "Email Marketing", category: "Marketing" },
    { id: "seo-tools", name: "SEO Tools", category: "Marketing" },
    { id: "payment-gateway", name: "Payment Gateway", category: "E-commerce" },
  ];

  // Fetch user's projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/client/projects');
      if (response.data.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Don't show error to user, just log it
    }
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleToolToggle = (toolId) => {
    setSelectedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleSubmitRequest = async () => {
    if (selectedServices.length === 0 && selectedTools.length === 0) {
      setMessage({ type: "error", text: "Please select at least one service or tool" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post('/client/service-requests', {
        services: selectedServices,
        tools: selectedTools,
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Request submitted successfully! Admin will review it soon." });
        setSelectedServices([]);
        setSelectedTools([]);
        // Refresh projects
        fetchProjects();
        
        // Auto-clear message after 5 seconds
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to submit request" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your projects and services</p>
            </div>
            <Link
              to="/client/account-profile"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md font-medium"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("request")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "request"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Request Services
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Your Projects
                  </h2>
                </div>
                <div className="p-6">
                  {projects.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                      <p className="text-gray-600 mb-6">Request services to get started with your projects</p>
                      <button
                        onClick={() => setActiveTab("request")}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md font-medium"
                      >
                        Request Services
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  project.status === "completed" ? "bg-purple-100 text-purple-800" :
                                  project.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                                  project.status === "approved" ? "bg-green-100 text-green-800" :
                                  project.status === "rejected" ? "bg-red-100 text-red-800" :
                                  project.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {project.status}
                                </span>
                                <span className="text-gray-500">Created: {project.created_at}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Pending</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {projects.filter(p => p.status === "pending").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Approved</span>
                    <span className="text-2xl font-bold text-green-600">
                      {projects.filter(p => p.status === "approved").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Rejected</span>
                    <span className="text-2xl font-bold text-red-600">
                      {projects.filter(p => p.status === "rejected").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">In Progress</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {projects.filter(p => p.status === "in-progress").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {projects.filter(p => p.status === "completed").length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">Our support team is available 24/7</p>
                <Link 
                  to="/client/support-helpdesk"
                  className="block w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all text-center"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Request Services Tab */}
        {activeTab === "request" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Message */}
              {message.text && (
                <div className={`p-4 rounded-xl ${
                  message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {message.text}
                </div>
              )}

              {/* Services */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Select Services</h2>
                  <p className="text-gray-600 text-sm mt-1">Choose the services you need</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableServices.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedServices.includes(service.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="font-semibold text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.category}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Select Tools</h2>
                  <p className="text-gray-600 text-sm mt-1">Choose the tools you want to access</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableTools.map((tool) => (
                      <label
                        key={tool.id}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTools.includes(tool.id)
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTools.includes(tool.id)}
                          onChange={() => handleToolToggle(tool.id)}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="ml-3">
                          <div className="font-semibold text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-500">{tool.category}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected Services</p>
                    {selectedServices.length === 0 ? (
                      <p className="text-sm text-gray-500">No services selected</p>
                    ) : (
                      <div className="space-y-1">
                        {selectedServices.map((serviceId) => {
                          const service = availableServices.find(s => s.id === serviceId);
                          return (
                            <div key={serviceId} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                              {service?.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected Tools</p>
                    {selectedTools.length === 0 ? (
                      <p className="text-sm text-gray-500">No tools selected</p>
                    ) : (
                      <div className="space-y-1">
                        {selectedTools.map((toolId) => {
                          const tool = availableTools.find(t => t.id === toolId);
                          return (
                            <div key={toolId} className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-lg">
                              {tool?.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSubmitRequest}
                      disabled={loading || (selectedServices.length === 0 && selectedTools.length === 0)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;