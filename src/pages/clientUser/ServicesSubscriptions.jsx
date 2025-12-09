import { Link } from "react-router-dom";
import { useState } from "react";

function ServicesSubscriptions() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const services = [
    {
      name: "FB Boosting",
      status: "Active",
      dashboard: "/client/tools/facebook-boosting",
      category: "Social Media",
      price: "$99/mo",
      usage: "85%",
      nextBilling: "Nov 15, 2025",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    },
    {
      name: "E-commerce Solution",
      status: "Inactive",
      dashboard: "/client/tools/ecommerce",
      category: "E-commerce",
      price: "$299/mo",
      usage: "0%",
      nextBilling: "-",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      name: "Website Development",
      status: "Active",
      dashboard: "/client/tools/web-development",
      category: "Development",
      price: "$199/mo",
      usage: "45%",
      nextBilling: "Nov 20, 2025",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      name: "Domain Hosting",
      status: "Active",
      dashboard: "/client/tools/hosting",
      category: "Infrastructure",
      price: "$49/mo",
      usage: "92%",
      nextBilling: "Nov 10, 2025",
      icon: "M7 7h10m0 0v10M7 7v10m0 0H5a2 2 0 01-2-2V9a2 2 0 012-2h2z",
    },
    {
      name: "Bulk SMS",
      status: "Inactive",
      dashboard: "/client/tools/bulk-sms",
      category: "Marketing",
      price: "$79/mo",
      usage: "0%",
      nextBilling: "-",
      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
    },
    {
      name: "Business Consulting",
      status: "Active",
      dashboard: "/client/tools/consulting",
      category: "Consulting",
      price: "$399/mo",
      usage: "60%",
      nextBilling: "Nov 25, 2025",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  const categoryColors = {
    "Social Media": { bg: "from-indigo-600 to-indigo-700", badge: "bg-indigo-100 text-indigo-800", hover: "text-indigo-600" },
    "E-commerce": { bg: "from-purple-600 to-purple-700", badge: "bg-purple-100 text-purple-800", hover: "text-purple-600" },
    "Development": { bg: "from-slate-600 to-slate-700", badge: "bg-slate-100 text-slate-800", hover: "text-slate-600" },
    "Infrastructure": { bg: "from-teal-600 to-teal-700", badge: "bg-teal-100 text-teal-800", hover: "text-teal-600" },
    "Marketing": { bg: "from-cyan-600 to-cyan-700", badge: "bg-cyan-100 text-cyan-800", hover: "text-cyan-600" },
    "Consulting": { bg: "from-blue-800 to-blue-900", badge: "bg-blue-100 text-blue-800", hover: "text-blue-800" },
  };

  const categories = ["All", ...new Set(services.map((service) => service.category))];

  const filteredServices = filterCategory === "All"
    ? services.filter((service) => filterStatus === "All" || service.status === filterStatus)
    : services.filter((service) => service.category === filterCategory && (filterStatus === "All" || service.status === filterStatus));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">Services & Subscriptions</h1>
              <p className="text-gray-200 text-sm mt-2">Manage your active and inactive subscriptions</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all">
                + Add Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Services */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Your Services
                  </h2>
                  <div className="flex space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium">
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {filteredServices.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No services found</p>
                ) : (
                  filteredServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-10 h-10 bg-gradient-to-br ${categoryColors[service.category].bg} rounded-lg flex items-center justify-center`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className={`font-semibold text-gray-900 group-hover:${categoryColors[service.category].hover} transition-colors`}>
                              {service.name}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                service.status === "Active" ? categoryColors[service.category].badge : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <svg
                                className={`w-3 h-3 mr-1 ${service.status === "Active" ? categoryColors[service.category].hover : "text-gray-500"}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d={service.status === "Active" ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M6 18L18 6M6 6l12 12"}
                                />
                              </svg>
                              {service.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{service.category}</span>
                            <span>•</span>
                            <span className="font-semibold text-gray-900">{service.price}</span>
                            <span>•</span>
                            <span>Next billing: {service.nextBilling}</span>
                          </div>
                          {service.status === "Active" && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1 text-sm">
                                <span className="text-gray-600">Usage</span>
                                <span className="font-medium text-gray-900">{service.usage}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`bg-gradient-to-r ${categoryColors[service.category].bg} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: service.usage }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {service.status === "Inactive" ? (
                          <button
                            className={`bg-gradient-to-r ${categoryColors[service.category].bg} text-white px-4 py-1.5 rounded-lg hover:bg-gradient-to-r hover:${categoryColors[service.category].bg.replace("600 to-700", "700 to-800")} transition-all text-sm font-medium`}
                          >
                            Subscribe
                          </button>
                        ) : (
                          <>
                            <button
                              className={`bg-gradient-to-r ${categoryColors[service.category].bg} text-white px-4 py-1.5 rounded-lg hover:bg-gradient-to-r hover:${categoryColors[service.category].bg.replace("600 to-700", "700 to-800")} transition-all text-sm font-medium`}
                            >
                              Upgrade
                            </button>
                            <Link
                              to={service.dashboard}
                              className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-center"
                            >
                              Dashboard
                            </Link>
                          </>
                        )}
                        {service.status === "Active" && (
                          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9" />
                </svg>
                Subscription Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Active Services</span>
                  <span className="text-lg font-bold text-gray-900">4</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Monthly Cost</span>
                  <span className="text-lg font-bold text-gray-900">$846</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Next Billing</span>
                  <span className="text-lg font-bold text-gray-900">Nov 10</span>
                </div>
              </div>
            </div>

            {/* Schedule Consultation */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl shadow-xl border border-blue-900/50 p-6 text-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Consultation
              </h3>
              <p className="text-gray-200 text-sm mb-4">Book a personalized session with our experts</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Service Type</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-gray-400 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option className="text-gray-700">Select a service</option>
                    {services.filter((s) => s.status === "Active").map((service, index) => (
                      <option key={index} className="text-gray-700">{service.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-white/10 border border-gray-400 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Preferred Time</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-gray-400 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option className="text-gray-700">Select time</option>
                    <option className="text-gray-700">09:00 AM</option>
                    <option className="text-gray-700">10:00 AM</option>
                    <option className="text-gray-700">11:00 AM</option>
                    <option className="text-gray-700">02:00 PM</option>
                    <option className="text-gray-700">03:00 PM</option>
                    <option className="text-gray-700">04:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Additional Notes</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 bg-white/10 border border-gray-400 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Any specific requirements..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
                >
                  Schedule Now
                </button>
              </form>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Need Help?
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium">
                  Contact Support
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium">
                  Documentation
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium">
                  FAQ & Guides
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSubscriptions;