// src/pages/shared/Header.jsx
import { Menu, X, LogOut } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { navbarAPI } from "../../services/api";

// Default fallback menu items
const DEFAULT_MENU_ITEMS = {
  public: [
    { id: 1, label: 'Home', label_bn: 'হোম', path: '/' },
    { id: 2, label: 'Services', label_bn: 'সার্ভিস', path: '/services' },
    { id: 3, label: 'Blogs', label_bn: 'ব্লগ', path: '/blogs' },
    { id: 4, label: 'Tools', label_bn: 'টুলস', path: '/tools' },
    { id: 5, label: 'About', label_bn: 'আমাদের সম্পর্কে', path: '/about' },
    { id: 6, label: 'Pricing', label_bn: 'প্রাইসিং', path: '/pricing' },
    { id: 7, label: 'Contact', label_bn: 'যোগাযোগ', path: '/contact' },
  ],
  client: [
    { id: 1, label: 'Client Space', label_bn: 'ক্লায়েন্ট স্পেস', path: '/client/dashboard' },
  ],
  admin: [
    { id: 1, label: 'Dashboard', label_bn: 'ড্যাশবোর্ড', path: '/admin/dashboard' },
  ],
};

const DEFAULT_CONFIG = {
  logo_url: null,
  logo_text: 'SME CUBE',
  logo_bg_color: 'from-red-500 to-pink-600',
  show_logo_text: true,
  show_logo_icon: true,
};

const Header = ({ setMobileMenuOpen, scrolled, mobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const [navbarConfig, setNavbarConfig] = useState(DEFAULT_CONFIG);
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  useEffect(() => {
    fetchNavbarConfig();
  }, []);

  const fetchNavbarConfig = async () => {
    try {
      const response = await navbarAPI.getConfig();
      if (response.data.success) {
        // Update config if exists, otherwise keep default
        if (response.data.config) {
          setNavbarConfig(response.data.config);
        }
        
        // Update menu items if they exist, otherwise keep defaults
        if (response.data.menuItems) {
          const newMenuItems = {
            public: response.data.menuItems.public?.length > 0 
              ? response.data.menuItems.public 
              : DEFAULT_MENU_ITEMS.public,
            client: response.data.menuItems.client?.length > 0 
              ? response.data.menuItems.client 
              : DEFAULT_MENU_ITEMS.client,
            admin: response.data.menuItems.admin?.length > 0 
              ? response.data.menuItems.admin 
              : DEFAULT_MENU_ITEMS.admin,
          };
          setMenuItems(newMenuItems);
        }
      }
    } catch (error) {
      console.error('Failed to fetch navbar config, using defaults:', error);
      // Keep using default menu items and config on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Get role-specific menu items
  const getRoleMenuItems = () => {
    if (isAdmin) return menuItems.admin || DEFAULT_MENU_ITEMS.admin;
    if (isClient) return menuItems.client || DEFAULT_MENU_ITEMS.client;
    return [];
  };

  const roleMenuItems = getRoleMenuItems();
  const publicMenuItems = menuItems.public || DEFAULT_MENU_ITEMS.public;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white md:bg-white/95 md:backdrop-blur-sm"
      }`}
      style={{ width: "100%" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 z-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navbarConfig.show_logo_icon && (
            <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${navbarConfig.logo_bg_color} rounded-xl flex items-center justify-center overflow-hidden`}>
              {navbarConfig.logo_url ? (
                <img 
                  src={navbarConfig.logo_url}  
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-white font-bold text-xl md:text-2xl">S</span>';
                  }}
                />
              ) : (
                <span className="text-white font-bold text-xl md:text-2xl">S</span>
              )}
            </div>
          )}
              {navbarConfig.show_logo_text && (
                <span className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${navbarConfig.logo_bg_color} bg-clip-text text-transparent`}>
                  {navbarConfig.logo_text}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public menu items */}
            {publicMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`font-semibold transition-all duration-300 hover:text-red-500 ${
                  location.pathname === item.path ? "text-red-500" : "text-gray-700"
                }`}
              >
                {item.label_bn || item.label}
              </Link>
            ))}

            {/* Auth-based navigation */}
            {user ? (
              <>
                {/* Role-specific menu items */}
                {roleMenuItems.map((item) => (
                  isAdmin ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`font-semibold transition-all duration-300 hover:text-red-500 ${
                        location.pathname.startsWith(item.path) ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      {item.label_bn || item.label}
                    </Link>
                  ) : (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      {item.label_bn || item.label}
                    </Link>
                  )
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-500 font-semibold transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  লগআউট
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                লগইন
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div className="md:hidden fixed inset-0 top-[80px] bg-white z-40 transition-all duration-300 overflow-y-auto">
              <div className="relative flex flex-col items-center pt-6 pb-12 space-y-4 px-4">
                {/* Public menu items */}
                {publicMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xl font-semibold transition-all duration-300 hover:text-red-500 ${
                      location.pathname === item.path ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    {item.label_bn || item.label}
                  </Link>
                ))}

                {/* Auth-based mobile navigation */}
                {user ? (
                  <>
                    {roleMenuItems.map((item) => (
                      isAdmin ? (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-xl font-semibold transition-all duration-300 hover:text-red-500 ${
                            location.pathname.startsWith(item.path) ? "text-red-500" : "text-gray-700"
                          }`}
                        >
                          {item.label_bn || item.label}
                        </Link>
                      ) : (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          {item.label_bn || item.label}
                        </Link>
                      )
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-xl font-semibold text-gray-700 hover:text-red-500 transition-all duration-300"
                    >
                      <LogOut className="w-6 h-6" />
                      লগআউট
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    লগইন
                  </Link>
                )}
              </div>
            </div>

            {/* Optional overlay */}
            <div
              className="fixed inset-0 bg-black/30 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;