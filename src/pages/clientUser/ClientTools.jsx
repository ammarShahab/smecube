import { useState } from "react";

function ClientTools() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const categoryColors = {
    "Social Media": { bg: "from-indigo-600 to-indigo-700", badge: "bg-indigo-100 text-indigo-800", hover: "text-indigo-600" },
    "Development": { bg: "from-teal-600 to-teal-700", badge: "bg-teal-100 text-teal-800", hover: "text-teal-600" },
    "Business": { bg: "from-purple-600 to-purple-700", badge: "bg-purple-100 text-purple-800", hover: "text-purple-600" },
    "Analytics": { bg: "from-slate-600 to-slate-700", badge: "bg-slate-100 text-slate-800", hover: "text-slate-600" },
    "Communication": { bg: "from-blue-800 to-blue-900", badge: "bg-blue-100 text-blue-800", hover: "text-blue-800" },
    "Infrastructure": { bg: "from-gray-600 to-gray-700", badge: "bg-gray-100 text-gray-800", hover: "text-gray-600" },
    "Marketing": { bg: "from-cyan-600 to-cyan-700", badge: "bg-cyan-100 text-cyan-800", hover: "text-cyan-600" },
    "E-commerce": { bg: "from-blue-600 to-blue-700", badge: "bg-blue-100 text-blue-800", hover: "text-blue-600" },
    "Research": { bg: "from-gray-700 to-gray-800", badge: "bg-gray-100 text-gray-800", hover: "text-gray-700" },
  };

  const premiumTools = [
    { name: "FB + Insta Automation", category: "Social Media", status: "active", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
    { name: "Drag & Drop Web Builder", category: "Development", status: "active", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { name: "Online CRM", category: "Business", status: "active", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { name: "Site Analysis", category: "Analytics", status: "inactive", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9" },
    { name: "Social Media Posting", category: "Social Media", status: "active", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
    { name: "Whatsapp Automation", category: "Communication", status: "inactive", icon: "M12 12m-3-3a3 3 0 106 0c0 1.657-1.343 3-3 3m0 0c-1.657 0-3 1.343-3 3a3 3 0 106 0m-9-9v12a9 9 0 0018 0V9a9 9 0 00-18 0z" },
    { name: "Server Monitoring", category: "Infrastructure", status: "active", icon: "M7 7h10m0 0v10M7 7v10m0 0H5a2 2 0 01-2-2V9a2 2 0 012-2h2z" },
    { name: "Social Proof", category: "Marketing", status: "active", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" },
    { name: "Payment Gateway", category: "E-commerce", status: "inactive", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { name: "Email Marketing", category: "Marketing", status: "active", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: "e-Commerce Store Builder", category: "E-commerce", status: "active", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "Company Site Builder", category: "Development", status: "active", icon: "M9 17V7m0 10h2m-2 0h-2m2-10h6m-6 0H7m8 0v10m0-10h2m-2 10h2" },
  ];

  const freeTools = [
    { name: "SEO Report", category: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9" },
    { name: "Intro/Bio Card", category: "Marketing", icon: "M12 4v16m8-8H4" },
    { name: "Single Webpage", category: "Development", icon: "M9 17V7m0 10h2m-2 0h-2m2-10h6m-6 0H7m8 0v10m0-10h2m-2 10h2" },
    { name: "Domain Name Generator", category: "Development", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
    { name: "Short Linker", category: "Marketing", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { name: "Username Search", category: "Research", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  ];

  const categories = ["All", ...new Set([...premiumTools, ...freeTools].map((tool) => tool.category))];

  const filteredPremiumTools = filterCategory === "All"
    ? premiumTools.filter((tool) => filterStatus === "All" || tool.status === filterStatus.toLowerCase())
    : premiumTools.filter((tool) => tool.category === filterCategory && (filterStatus === "All" || tool.status === filterStatus.toLowerCase()));

  const filteredFreeTools = filterCategory === "All"
    ? freeTools
    : freeTools.filter((tool) => tool.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">Business Tools</h1>
              <p className="text-gray-200 text-sm mt-2">Explore premium and free tools to accelerate your business growth</p>
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
                Request Tool
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools */}
          <div className="lg:col-span-3 space-y-8">
            {/* Premium Tools */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Premium Tools
                </h2>
                <div className="flex items-center space-x-3 text-sm">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                    Active
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    Inactive
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPremiumTools.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center py-4">No premium tools found</p>
                ) : (
                  filteredPremiumTools.map((tool, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[tool.category].bg} rounded-xl flex items-center justify-center`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                          </svg>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tool.status === "active" ? categoryColors[tool.category].badge : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tool.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-gray-900 mb-2 group-hover:${categoryColors[tool.category].hover} transition-colors`}>
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{tool.category}</p>
                      <div className="flex space-x-2">
                        <button
                          className={`flex-1 bg-gradient-to-r ${categoryColors[tool.category].bg} text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:${categoryColors[tool.category].bg.replace("600 to-700", "700 to-800")} transition-all text-sm font-medium`}
                        >
                          {tool.status === "active" ? "Launch" : "Activate"}
                        </button>
                        <button
                          className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                          title="Tool Info"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Free Tools */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Free Tools
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreeTools.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center py-4">No free tools found</p>
                ) : (
                  filteredFreeTools.map((tool, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[tool.category].bg} rounded-xl flex items-center justify-center mb-4`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                        </svg>
                      </div>
                      <h3 className={`font-semibold text-gray-900 mb-2 group-hover:${categoryColors[tool.category].hover} transition-colors`}>
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{tool.category}</p>
                      <button
                        className={`w-full bg-gradient-to-r ${categoryColors[tool.category].bg} text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:${categoryColors[tool.category].bg.replace("600 to-700", "700 to-800")} transition-all text-sm font-medium`}
                      >
                        Launch Tool
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tool Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10m0 0v10M7 7v10m0 0H5a2 2 0 01-2-2V9a2 2 0 012-2h2z" />
                </svg>
                Tool Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setFilterCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all ${
                        filterCategory === category ? "bg-gray-100 text-gray-900" : ""
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Request Tool */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Request New Tool
              </h3>
              <p className="text-gray-200 mb-4">Suggest a tool to enhance your business workflow</p>
              <button className="w-full bg-white text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientTools;