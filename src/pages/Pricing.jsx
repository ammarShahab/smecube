import React, { useState, useEffect } from 'react';
import { 
  Check, Zap, Crown, Star, ArrowRight, Phone, MessageCircle, Loader, 
  Grid, List, ExternalLink, Globe, Code, Paintbrush, MessageSquare, 
  Users, TrendingUp, Mail, Wrench, ShoppingCart, Rocket 
} from 'lucide-react';
import { pricingPlansAPI, extraServicesAPI, planComparisonsAPI } from '../services/api';

// Import all service APIs
import webDevelopmentService from '../services/webDevelopmentService';
import { landingPageService } from '../services/landingPageServices';
import issueFixingService from '../services/issueFixingService';
import graphicDesignService from '../services/graphicDesignService';
import facebookBoostingService from '../services/facebookBoostingService';
import ecommerceService from '../services/ecommerceService';
import domainHostingService from '../services/domainHostingService';
import chatbotService from '../services/chatbotService';
import businessTrainingService from '../services/businessTrainingService';
import businessConsultingService from '../services/businessConsultingService';
import bulkSmsService from '../services/bulkSmsService';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Original pricing data
  const [pricingPlans, setPricingPlans] = useState([]);
  const [addOnServices, setAddOnServices] = useState([]);
  const [planComparisons, setPlanComparisons] = useState([]);
  
  // All service packages
  const [allServicePackages, setAllServicePackages] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugMode, setDebugMode] = useState(false); // For debugging API responses

  // Service configurations with their APIs
  const serviceConfigs = [
    {
      id: 'general',
      name: 'সাধারণ প্যাকেজ',
      type: 'general',
      color: 'from-red-500 to-pink-600',
      icon: Crown,
      api: null, // Will use pricingPlansAPI
      hasPackages: true
    },
    {
      id: 'web-development',
      name: 'ওয়েব ডেভেলপমেন্ট',
      api: webDevelopmentService,
      color: 'from-blue-500 to-cyan-600',
      icon: Code,
      hasPackages: true,
      slug: '/services/web-development'
    },
    {
      id: 'landing-page',
      name: 'ল্যান্ডিং পেজ',
      api: landingPageService,
      color: 'from-purple-500 to-pink-600',
      icon: Rocket,
      hasPackages: true,
      slug: '/services/landing-page'
    },
    {
      id: 'graphic-design',
      name: 'গ্রাফিক ডিজাইন',
      api: graphicDesignService,
      color: 'from-orange-500 to-red-600',
      icon: Paintbrush,
      hasPackages: true,
      slug: '/services/graphic-design'
    },
    {
      id: 'domain-hosting',
      name: 'ডোমেইন ও হোস্টিং',
      api: domainHostingService,
      color: 'from-gray-500 to-blue-600',
      icon: Globe,
      hasPackages: true,
      slug: '/services/hosting'
    },
    {
      id: 'chatbot',
      name: 'চ্যাটবট',
      api: chatbotService,
      color: 'from-green-600 to-blue-500',
      icon: MessageSquare,
      hasPackages: true,
      slug: '/services/chatbot-setup'
    },
    {
      id: 'business-training',
      name: 'বিজনেস ট্রেনিং',
      api: businessTrainingService,
      color: 'from-yellow-500 to-orange-600',
      icon: Users,
      hasPackages: true,
      slug: '/services/business-training'
    },
    {
      id: 'business-consulting',
      name: 'বিজনেস কনসাল্টিং',
      api: businessConsultingService,
      color: 'from-purple-600 to-pink-700',
      icon: TrendingUp,
      hasPackages: true,
      slug: '/services/business-consulting'
    },
    {
      id: 'bulk-sms',
      name: 'বাল্ক এসএমএস',
      api: bulkSmsService,
      color: 'from-red-500 to-pink-600',
      icon: Mail,
      hasPackages: true,
      slug: '/services/bulk-sms'
    },
    {
      id: 'issue-fixing',
      name: 'ইস্যু ফিক্সিং',
      api: issueFixingService,
      color: 'from-indigo-500 to-purple-600',
      icon: Wrench,
      hasPackages: true,
      slug: '/services/issue-fixing'
    },
    {
      id: 'ecommerce',
      name: 'ইকমার্স সলিউশন',
      api: ecommerceService,
      color: 'from-green-500 to-teal-600',
      icon: ShoppingCart,
      hasPackages: false,
      redirectTo: '/contact',
      description: 'কাস্টম ইকমার্স সলিউশনের জন্য আমাদের সাথে যোগাযোগ করুন'
    },
    {
      id: 'facebook-boosting',
      name: 'ফেসবুক বুস্টিং',
      api: facebookBoostingService,
      color: 'from-blue-600 to-indigo-600',
      icon: Zap,
      hasPackages: false,
      redirectTo: '/services/facebook-boosting',
      description: 'ফেসবুক মার্কেটিং ও বুস্টিং সার্ভিসের জন্য ভিজিট করুন'
    }
  ];

  // Transform package data from different API structures
  const transformPackageData = (rawPackage, service) => {
    // Extract features from different possible structures
    const features = Array.isArray(rawPackage.features) ? rawPackage.features : 
                   Array.isArray(rawPackage.benefits) ? rawPackage.benefits : 
                   [];

    return {
      id: rawPackage.id || Math.random().toString(36).substr(2, 9),
      name: rawPackage.name || rawPackage.title || 'Unnamed Package',
      price: rawPackage.price || rawPackage.starting_price || 0,
      price_period: rawPackage.price_period || rawPackage.duration || '/মাস',
      features: features,
      description: rawPackage.description || rawPackage.subtitle || '',
      is_popular: rawPackage.is_popular || rawPackage.popular || rawPackage.recommended || false,
      is_active: rawPackage.is_active !== false,
      button_link: rawPackage.button_link || rawPackage.demo_order_link || null,
      
      // Service metadata
      serviceId: service.id,
      serviceName: service.name,
      serviceColor: service.color,
      serviceIcon: service.icon,
      serviceSlug: service.slug,
      serviceRedirectTo: service.redirectTo,
    };
  };

  // Fetch all pricing data
  useEffect(() => {
    const fetchAllPricingData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Fetching all pricing data...');

        // Fetch original pricing data
        const [plansRes, servicesRes, comparisonsRes] = await Promise.all([
          pricingPlansAPI.getAll().catch(err => ({ data: { data: [] } })),
          extraServicesAPI.getAll().catch(err => ({ data: { data: [] } })),
          planComparisonsAPI.getAll().catch(err => ({ data: { data: [] } }))
        ]);

        setPricingPlans(plansRes.data.data || []);
        setAddOnServices(servicesRes.data.data || []);
        setPlanComparisons(comparisonsRes.data.data || []);

        // Fetch packages from all services
        const packagePromises = serviceConfigs.map(async (service) => {
          try {
            // Skip if no API (general packages handled separately)
            if (!service.api) {
              console.log(`📦 Processing general packages...`);
              const generalPackages = (plansRes.data.data || []).map(plan => 
                transformPackageData(plan, service)
              );
              return { serviceId: service.id, packages: generalPackages };
            }

            // Skip services without packages
            if (!service.hasPackages) {
              console.log(`⏭️ Skipping ${service.name} (no packages)`);
              return { serviceId: service.id, packages: [] };
            }

            console.log(`📦 Fetching ${service.name}...`);
            let response;
            try {
              response = await service.api.getPageData();
            } catch (fetchError) {
              console.error(`❌ API Error for ${service.name}:`, fetchError.message);
              console.error(`Full error:`, fetchError);
              throw fetchError;
            }
            
            console.log(`🔍 ${service.name} raw response type:`, response?.status ? 'Full Axios Response' : 'Direct Data');
            console.log(`🔍 ${service.name} raw response:`, response);
            
            // Handle different response structures
            let packagesData = [];
            let data = response;
            
            // If it's a full Axios response with .data property
            if (response?.status && response?.data) {
              // This is a full Axios response object
              data = response.data;
              console.log(`📊 Extracted from Axios response, data is:`, data);
            }
            
            // Unwrap nested response structures
            if (data?.data && !Array.isArray(data?.data) && typeof data.data === 'object') {
              // Check if this looks like wrapped data (has data property that isn't an array)
              const innerData = data.data;
              if (innerData?.packages || innerData?.hero || innerData?.features) {
                data = innerData;
                console.log(`📊 Unwrapped nested .data, now data is:`, data);
              }
            }
            
            console.log(`📊 Final unwrapped data keys:`, Object.keys(data || {}).slice(0, 10));
            
            // Now search for packages
            if (Array.isArray(data?.packages)) {
              packagesData = data.packages;
              console.log(`Found at data.packages`);
            } else if (Array.isArray(data?.hero?.packages)) {
              packagesData = data.hero.packages;
              console.log(`Found at data.hero.packages`);
            } else if (Array.isArray(data?.pricing?.packages)) {
              packagesData = data.pricing.packages;
              console.log(`Found at data.pricing.packages`);
            } else if (Array.isArray(data)) {
              packagesData = data;
              console.log(`Data is an array`);
            } else {
              // Search all top-level properties for packages array
              console.log(`Searching through all keys for packages array...`);
              for (const key in data) {
                if (Array.isArray(data[key]) && data[key].length > 0) {
                  // Check if it looks like a packages array
                  const firstItem = data[key][0];
                  if (firstItem && (firstItem.name || firstItem.title || firstItem.price || typeof firstItem === 'object')) {
                    packagesData = data[key];
                    console.log(`Found packages-like array at data.${key}`);
                    break;
                  }
                }
              }
            }

            console.log(`✅ ${service.name}: Found ${packagesData.length} packages`, packagesData);
            
            const transformedPackages = packagesData.map(pkg => 
              transformPackageData(pkg, service)
            );

            return { serviceId: service.id, packages: transformedPackages };
          } catch (err) {
            console.warn(`❌ Failed to fetch ${service.name}:`, err.message);
            console.warn(`Error stack:`, err.stack);
            return { serviceId: service.id, packages: [] };
          }
        });

        const results = await Promise.allSettled(packagePromises);
        
        // Combine all packages
        const rawPackages = results
          .filter(result => result.status === 'fulfilled')
          .flatMap(result => result.value.packages);
        
        console.log(`📊 Raw packages before filter: ${rawPackages.length}`);
        rawPackages.forEach((pkg, idx) => {
          console.log(`  [${idx}] ${pkg.serviceName} - ${pkg.name} (price: ${pkg.price}, is_active: ${pkg.is_active})`);
        });
        
        // Filter packages - don't filter out by price or is_active for display
        const allPackages = rawPackages
          .filter(pkg => {
            // Keep all packages that have a name and don't explicitly mark as inactive
            return pkg.name && pkg.is_active !== false;
          });

        console.log(`📊 Total packages after filtering: ${allPackages.length}`);
        setAllServicePackages(allPackages);

        // Create categories with package counts
        const categoryList = serviceConfigs.map(service => ({
          id: service.id,
          name: service.name,
          color: service.color,
          icon: service.icon,
          count: allPackages.filter(pkg => pkg.serviceId === service.id).length,
          hasPackages: service.hasPackages,
          redirectTo: service.redirectTo,
          description: service.description
        })).filter(cat => cat.count > 0 || !cat.hasPackages);

        setCategories(categoryList);
        console.log(`📁 Categories created: ${categoryList.length}`);

      } catch (err) {
        console.error('❌ Error fetching pricing data:', err);
        setError('প্যাকেজ ডেটা লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPricingData();
  }, []);

  // Filter packages by selected category
  const filteredPackages = selectedCategory === 'all' 
    ? allServicePackages 
    : allServicePackages.filter(pkg => pkg.serviceId === selectedCategory);

  // Group packages by service
  const groupedPackages = filteredPackages.reduce((groups, pkg) => {
    if (!groups[pkg.serviceId]) {
      const service = serviceConfigs.find(s => s.id === pkg.serviceId);
      groups[pkg.serviceId] = {
        service: service,
        packages: []
      };
    }
    groups[pkg.serviceId].packages.push(pkg);
    return groups;
  }, {});

  const getServiceIcon = (service) => {
    const IconComponent = service?.icon || Crown;
    return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />;
  };

  const handlePackageAction = (pkg) => {
    if (pkg.serviceRedirectTo) {
      window.location.href = pkg.serviceRedirectTo;
    } else if (pkg.button_link) {
      window.open(pkg.button_link, '_blank', 'noopener,noreferrer');
    } else if (pkg.serviceSlug) {
      window.location.href = pkg.serviceSlug;
    } else {
      window.location.href = '/contact';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-2xl font-bold text-red-600 mb-2 font-hind">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-hind"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        .font-hind {
          font-family: 'Hind Siliguri', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 text-white pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 flex items-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
            <div className="flex-1 text-center md:text-left w-full">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 flex justify-center md:justify-start">💰</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 font-hind">
                সম্পূর্ণ প্রাইসিং ড্যাশবোর্ড
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-100 px-4 font-hind">
                সকল সার্ভিসের প্যাকেজ এক স্থানে। {allServicePackages.length}+ প্যাকেজ থেকে আপনার জন্য সঠিকটি বেছে নিন।
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start px-4">
                <button className="bg-white text-red-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-100 transition text-center text-sm sm:text-base font-hind">
                  ফ্রি ট্রায়াল শুরু করুন →
                </button>
                <button className="border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white hover:text-red-600 transition text-sm sm:text-base font-hind">
                  এক্সপার্ট পরামর্শ
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center md:text-left font-hind">সার্ভিস সমূহ</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.slice(0, 6).map(category => (
                    <div key={category.id} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
                      <span className="text-xs sm:text-sm text-white font-hind">{category.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/80 mt-4 text-center font-hind">
                  এবং আরও {Math.max(0, categories.length - 6)}+ সার্ভিস
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        
        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm font-hind ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:text-gray-900 shadow-md'
              }`}
            >
              সকল সার্ভিস ({allServicePackages.length})
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm font-hind ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-gray-900 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-4">
            {/* Debug Mode Toggle (only in development) */}
            {import.meta.env.DEV && (
              <button
                onClick={() => setDebugMode(!debugMode)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs ${
                  debugMode ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                🐛 Debug
              </button>
            )}
            
            <div className="flex bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        {debugMode && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">🐛 Debug Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Total Packages:</strong> {allServicePackages.length}</p>
              <p><strong>Categories:</strong> {categories.length}</p>
              <div className="mt-4">
                <strong>Package Distribution:</strong>
                <ul className="ml-4 mt-2 space-y-1">
                  {categories.map(cat => (
                    <li key={cat.id} className="text-gray-700">
                      {cat.name}: {cat.count} packages
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => console.log('All Packages:', allServicePackages)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Log All Packages to Console
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Service Packages - Grouped by Service */}
        <div className="space-y-16">
          {Object.entries(groupedPackages).map(([serviceId, { service, packages }]) => (
            <div key={serviceId} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Service Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {getServiceIcon(service)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-hind">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 font-hind">
                    {packages.length}টি প্যাকেজ উপলব্ধ
                  </p>
                </div>
              </div>

              {/* Packages Grid */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                        pkg.is_popular ? 'ring-2 ring-red-500 md:scale-105' : ''
                      }`}
                    >
                      {pkg.is_popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-md font-hind">
                            জনপ্রিয়
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${pkg.serviceColor} rounded-lg flex items-center justify-center text-white mb-4 shadow-md`}>
                          {getServiceIcon(service)}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 font-hind">{pkg.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 font-hind">{pkg.description}</p>

                        <div className="mb-4">
                          <div className="flex items-end gap-2">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                              ৳{parseFloat(pkg.price).toLocaleString('bn-BD')}
                            </span>
                            <span className="text-sm text-gray-500 font-semibold mb-1 font-hind">
                              {pkg.price_period}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {pkg.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-600 font-hind">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePackageAction(pkg)}
                          className={`w-full py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 text-sm font-hind ${
                            pkg.is_popular
                              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {pkg.serviceRedirectTo ? 'বিস্তারিত দেখুন' : 'শুরু করুন'}
                          {pkg.button_link ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <div className={`w-10 h-10 bg-gradient-to-br ${pkg.serviceColor} rounded-lg flex items-center justify-center text-white`}>
                              {getServiceIcon(service)}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 font-hind">{pkg.name}</h3>
                              <p className="text-sm text-gray-500 font-hind">{pkg.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {pkg.features.slice(0, 3).map((feature, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-hind">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 font-hind">
                              ৳{parseFloat(pkg.price).toLocaleString('bn-BD')}
                            </div>
                            <div className="text-sm text-gray-500 font-hind">{pkg.price_period}</div>
                          </div>
                          <button 
                            onClick={() => handlePackageAction(pkg)}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300 font-hind flex items-center gap-2"
                          >
                            {pkg.serviceRedirectTo ? 'বিস্তারিত' : 'নির্বাচন করুন'}
                            {pkg.button_link && <ExternalLink className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add-on Services */}
        {addOnServices.length > 0 && (
          <div className="mt-16 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2 font-hind">
                অতিরিক্ত সার্ভিস
              </h2>
              <p className="text-gray-600 font-hind">আপনার প্যাকেজের সাথে যুক্ত করুন এই সার্ভিসগুলো</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {addOnServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM8 17L12 19L16 17V13L12 15L8 13V17Z" fill="white"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 font-hind leading-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-black text-red-600">
                      ৳{parseFloat(service.price).toLocaleString('bn-BD')}
                    </span>
                    <span className="text-xs text-gray-600 font-semibold mb-0.5 font-hind">
                      {service.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {planComparisons.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-hind">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                প্ল্যান তুলনা
              </span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900 font-hind">ফিচার</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900 font-hind">স্টার্টার</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900 font-hind">প্রফেশনাল</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900 font-hind">এন্টারপ্রাইজ</th>
                  </tr>
                </thead>
                <tbody>
                  {planComparisons.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-gray-700 font-hind">{row.feature_name}</td>
                      <td className="py-4 px-4 text-center text-gray-600 font-hind">{row.starter_value}</td>
                      <td className="py-4 px-4 text-center text-gray-600 font-hind">{row.professional_value}</td>
                      <td className="py-4 px-4 text-center text-gray-600 font-hind">{row.enterprise_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-hind">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              সাধারণ প্রশ্ন
            </span>
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: 'কি কি পেমেন্ট মেথড গ্রহণ করেন?',
                a: 'আমরা বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফার গ্রহণ করি।'
              },
              {
                q: 'রিফান্ড পলিসি কি?',
                a: 'প্রথম ৭ দিনের মধ্যে সম্পূর্ণ রিফান্ড পাবেন যদি সন্তুষ্ট না হন।'
              },
              {
                q: 'প্ল্যান আপগ্রেড করা যাবে?',
                a: 'হ্যাঁ, যেকোনো সময় আপনার প্ল্যান আপগ্রেড বা ডাউনগ্রেড করতে পারবেন।'
              },
              {
                q: 'সেটআপ ফি আছে কি?',
                a: 'না, কোন সেটআপ ফি নেই। শুধুমাত্র মাসিক বা বার্ষিক চার্জ প্রযোজ্য।'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-hind">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed font-hind">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA for Services Without Packages */}
        {categories.some(cat => !cat.hasPackages) && (
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-hind">
              আরও সার্ভিস প্রয়োজন?
            </h2>
            <p className="text-lg md:text-xl mb-6 text-white/90 font-hind">
              ইকমার্স সলিউশন এবং ফেসবুক বুস্টিং এর জন্য আমাদের সাথে যোগাযোগ করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {categories.filter(cat => !cat.hasPackages).map(category => (
                <button
                  key={category.id}
                  onClick={() => window.location.href = category.redirectTo}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-hind"
                >
                  {category.name}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main CTA Section */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-hind">
            এখনও নিশ্চিত নন?
          </h2>
          <p className="text-lg md:text-xl mb-6 text-white/90 font-hind">
            আমাদের সাথে কথা বলুন এবং পান ফ্রি কনসালটেশন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-hind">
              <Phone className="w-5 h-5" />
              কল করুন
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2 font-hind">
              <MessageCircle className="w-5 h-5" />
              মেসেজ পাঠান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;