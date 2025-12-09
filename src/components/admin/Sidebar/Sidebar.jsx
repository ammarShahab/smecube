// src/components/admin/Sidebar/Sidebar.js
import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import api from "../../../services/api";

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const InboxIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const TicketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const PagesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg className={`w-4 h-4 transition-transform duration-200 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Sidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Fetch pending requests count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.get('/admin/requests/count');
        if (response.data.success) {
          setPendingCount(response.data.pending_count);
        }
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };

    fetchPendingCount();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

 // Update only the navMenu array in your Sidebar component

const navMenu = [
  { path: "/admin/dashboard", name: "Dashboard", icon: <DashboardIcon /> },
  { 
    path: "/admin/requests", 
    name: "Service Requests", 
    icon: <InboxIcon />,
    badge: pendingCount > 0 ? pendingCount : null
  },
  { path: "/admin/users", name: "Users", icon: <UsersIcon /> },
  { path: "/admin/messages", name: "Messages", icon: <MessageIcon /> },
  { path: "/admin/tickets", name: "Support Tickets", icon: <TicketIcon /> },

  {
    name: "TopBar Pages",
    icon: <PagesIcon />,
    subcategories: [
      { path: "/admin/pricing", name: "Pricing" },
      { path: "/admin/blogs", name: "Blogs" },
      { path: "/admin/contact", name: "Contact" },
      { path: "/admin/about", name: "About" },
    ],
  },

  {
    name: "Update Services",
    icon: <RefreshIcon />,
    subcategories: [
      { path: "/admin/facebook-boosting", name: "Facebook Boosting" },
      { path: "/admin/ecommerce-solution", name: "Ecommerce Solution" },
      { path: "/admin/web-development", name: "Develop Website" },
      { path: "/admin/landing-page", name: "Landing Page" },
      { path: "/admin/domain-hosting", name: "Domain Hosting" },
      { path: "/admin/bulk-sms", name: "Bulk SMS" },
      { path: "/admin/business-consulting", name: "Business Consulting" },
      { path: "/admin/brand-page-setup", name: "Brand Page Setup" },
      { path: "/admin/graphic-design", name: "Graphic Design" },
      { path: "/admin/chatbot-setup", name: "Chatbot Setup" },
      { path: "/admin/issue-fixing", name: "Issue Fixing" },
      { path: "/admin/business-training", name: "Business Training" },
    ],
  },
  { path: "/admin/navbar-settings", name: "Navbar Settings", icon: <SettingsIcon /> }, // NEW
  { path: "/admin/settings", name: "Settings", icon: <SettingsIcon /> },
];
  const toggleCategory = (name) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) =>
    item.subcategories?.some((sub) => sub.path === location.pathname);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20 rounded-tr-2xl rounded-br-2xl overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-3 bg-gray-800 text-white sticky top-0 z-10">
          <Link to="/" className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/50">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-black">
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  SME
                </span>
                <span className="text-white">CUBE</span>
              </h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-3 pb-6">
          <ul className="space-y-2">
            {navMenu.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path || "#"}
                  onClick={(e) => {
                    if (item.subcategories) {
                      e.preventDefault();
                      toggleCategory(item.name);
                    }
                  }}
                  className={`flex items-center py-3 px-4 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ${
                    isActive(item.path) || isParentActive(item)
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.subcategories && (
                    <ChevronRightIcon
                      className={`ml-2 ${expandedCategory === item.name ? "rotate-90" : ""}`}
                    />
                  )}
                </Link>

                {item.subcategories && expandedCategory === item.name && (
                  <ul className="ml-8 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                    {item.subcategories.map((sub) => (
                      <li key={sub.path}>
                        <Link
                          to={sub.path}
                          className={`block py-2 px-3 text-sm text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                            isActive(sub.path) ? "text-blue-600 font-medium bg-blue-50" : ""
                          }`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Mobile Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className="hidden md:block"></div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                SMECUBE Page
              </Link>
              <span className="text-gray-700 font-medium">
                Welcome, {user?.name || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;