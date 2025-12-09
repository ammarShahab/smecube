import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Package,
  MessageCircle,
  CheckCircle2,
  X,
  ClipboardList,
  Settings,
  BarChart3,
  Loader,
  XCircle,
} from "lucide-react";
import { businessConsultingService } from "../../../services/businessConsultingService"; // Add this import
import IconSelector from "../../../components/admin/IconSelector.jsx";

const AdminBusinessConsulting = () => {
  // States for all sections
  const [services, setServices] = useState([]);
  const [consultingAreas, setConsultingAreas] = useState([]);
  const [packages, setPackages] = useState([]);
  const [process, setProcess] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroData, setHeroData] = useState({
    hero_title: "",
    hero_description: "",
  });
  const [stats, setStats] = useState({
    totalConsultations: 0,
    activeClients: 0,
    successRate: 0,
    monthlyRevenue: 0,
  });
  const [seoData, setSeoData] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all page data on component mount
  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDefaultSeoData = () => ({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_image: "",
    canonical_url: "",
    focus_keyword: "",
    schema_type: "WebPage",
    meta_robots_index: true,
    meta_robots_follow: true,
    twitter_card: "summary_large_image",
    og_type: "website",
    og_locale: "bn_BD",
    sitemap_priority: 0.8,
    change_frequency: "monthly",
    faq_items: [],
    breadcrumb_override: null,
  });

  const fetchPageData = async () => {
    setLoading(true);
    try {
      const result = await businessConsultingService.getPageData(); // Use service

      if (result.success) {
        const data = result.data;

        // Helper function to safely parse data
        const safeParse = (value) => {
          if (Array.isArray(value)) return value;
          if (typeof value === "string") {
            try {
              return JSON.parse(value);
            } catch {
              console.error("Failed to parse:", value);
              return [];
            }
          }
          return [];
        };

        setHeroData({
          hero_title: data.hero_title || "",
          hero_description: data.hero_description || "",
        });

        // Parse all string data to arrays
        setServices(safeParse(data.services));
        setConsultingAreas(safeParse(data.consulting_areas));
        setPackages(safeParse(data.packages));
        setProcess(safeParse(data.process));
        setTestimonials(safeParse(data.testimonials));
        setStats(
          typeof data.stats === "string"
            ? JSON.parse(data.stats)
            : data.stats || {}
        );
      }

      // Fetch SEO data
      try {
        const seoResult = await businessConsultingService.getSeo();
        setSeoData(seoResult.data || getDefaultSeoData());
      } catch (seoError) {
        console.error("Error fetching SEO data:", seoError);
        setSeoData(getDefaultSeoData());
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      showNotification("ডেটা লোড করতে সমস্যা হয়েছে", "error");
      setSeoData(getDefaultSeoData());
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Hero Section Handlers
  const handleHeroChange = (field, value) => {
    setHeroData((prev) => ({ ...prev, [field]: value }));
  };

  const updateHero = async () => {
    try {
      const result = await businessConsultingService.updateHero(heroData); // Use service

      if (result.success) {
        showNotification("হিরো সেকশন আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating hero:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // Services Handlers
  const handleServiceChange = (id, field, value) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const toggleService = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, enabled: !service.enabled } : service
      )
    );
  };

  const addService = async () => {
    const newService = {
      icon: "⭐",
      title: "নতুন সার্ভিস",
      description: "সার্ভিসের বর্ণনা",
      enabled: true,
    };

    try {
      const result = await businessConsultingService.createService(newService); // Use service

      if (result.success) {
        setServices((prev) => [...prev, result.data]);
        showNotification("সার্ভিস যোগ করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      showNotification("যোগ করতে সমস্যা হয়েছে", "error");
    }
  };

  const updateService = async (id) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    try {
      const result = await businessConsultingService.updateService(id, service); // Use service

      if (result.success) {
        showNotification("সার্ভিস আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  const removeService = async (id) => {
    try {
      const result = await businessConsultingService.deleteService(id); // Use service

      if (result.success) {
        setServices(services.filter((service) => service.id !== id));
        showNotification("সার্ভিস ডিলিট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      showNotification("ডিলিট করতে সমস্যা হয়েছে", "error");
    }
  };

  // Packages Handlers
  const handlePackageChange = (id, field, value) => {
    setPackages(
      packages.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  const handleFeatureChange = (packageId, featureIndex, value) => {
    setPackages(
      packages.map((pkg) => {
        if (pkg.id === packageId) {
          const updatedFeatures = [...pkg.features];
          updatedFeatures[featureIndex] = value;
          return { ...pkg, features: updatedFeatures };
        }
        return pkg;
      })
    );
  };

  const addFeature = (packageId) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === packageId
          ? { ...pkg, features: [...pkg.features, "নতুন ফিচার"] }
          : pkg
      )
    );
  };

  const removeFeature = (packageId, featureIndex) => {
    setPackages(
      packages.map((pkg) => {
        if (pkg.id === packageId) {
          const updatedFeatures = pkg.features.filter(
            (_, idx) => idx !== featureIndex
          );
          return { ...pkg, features: updatedFeatures };
        }
        return pkg;
      })
    );
  };

  const togglePackagePopular = (id) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, popular: !pkg.popular } : pkg
      )
    );
  };

  // Find the addPackage function and update it:
  const addPackage = () => {
    const newPackage = {
      id: Date.now(),
      name: "নতুন প্যাকেজ",
      price: "০",
      duration: "মাস",
      button_link: "", // Add this line
      popular: false,
      enabled: true,
      features: ["নতুন ফিচার"],
    };
    setPackages([...packages, newPackage]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const updatePackages = async () => {
    try {
      const result = await businessConsultingService.updatePackages(packages); // Use service

      if (result.success) {
        showNotification("প্যাকেজসমূহ আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating packages:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // Consulting Areas Handlers
  // eslint-disable-next-line no-unused-vars
  const handleConsultingAreaChange = (id, field, value) => {
    setConsultingAreas(
      consultingAreas.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  const updateConsultingAreas = async () => {
    try {
      const result = await businessConsultingService.updateConsultingAreas(
        consultingAreas
      ); // Use service

      if (result.success) {
        showNotification("কনসালটিং এরিয়া আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating consulting areas:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // Process Handlers
  const handleProcessChange = (id, field, value) => {
    setProcess(
      process.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const updateProcess = async () => {
    try {
      const result = await businessConsultingService.updateProcess(process); // Use service

      if (result.success) {
        showNotification("প্রক্রিয়া আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating process:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // Testimonials Handlers
  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    );
  };

  const updateTestimonials = async () => {
    try {
      const result = await businessConsultingService.updateTestimonials(
        testimonials
      ); // Use service

      if (result.success) {
        showNotification("টেস্টিমোনিয়াল আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating testimonials:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // Stats Handlers
  const updateStats = async () => {
    try {
      const result = await businessConsultingService.updateStats(stats); // Use service

      if (result.success) {
        showNotification("স্ট্যাটস আপডেট করা হয়েছে", "success");
      }
    } catch (error) {
      console.error("Error updating stats:", error);
      showNotification("আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // SEO Handlers
  const updateSeoField = (field, value) => {
    setSeoData((prev) => ({ ...prev, [field]: value }));
  };

  const addFaqItem = () => {
    setSeoData((prev) => ({
      ...prev,
      faq_items: [...(prev.faq_items || []), { question: "", answer: "" }],
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setSeoData((prev) => {
      const items = [...(prev.faq_items || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, faq_items: items };
    });
  };

  const removeFaqItem = (index) => {
    setSeoData((prev) => ({
      ...prev,
      faq_items: (prev.faq_items || []).filter((_, i) => i !== index),
    }));
  };

  const saveSeo = async () => {
    if (!seoData) {
      showNotification("SEO ডেটা পাওয়া যায়নি", "error");
      return;
    }

    try {
      await businessConsultingService.updateSeo(seoData);
      showNotification("SEO সেটিংস সফলভাবে সেভ হয়েছে!", "success");
    } catch (error) {
      console.error("SEO save error:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Unknown error";
      showNotification(`SEO সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  // Save All Data
  const handleSubmit = async () => {
    setSaving(true);
    try {
      // Update all sections using services
      await updateHero();
      await updateConsultingAreas();
      await updatePackages();
      await updateProcess();
      await updateTestimonials();
      await updateStats();

      showNotification("সব ডেটা সফলভাবে সেভ করা হয়েছে!", "success");
    } catch (error) {
      console.error("Error saving data:", error);
      showNotification("সেভ করতে সমস্যা হয়েছে", "error");
    } finally {
      setSaving(false);
    }
  };

  // Tab navigation component
  const TabNavigation = () => (
    <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 border border-gray-100">
      <div className="flex flex-wrap gap-2">
        {[
          { id: "overview", label: "ওভারভিউ", icon: BarChart3 },
          { id: "services", label: "সার্ভিসেস", icon: Settings },
          { id: "packages", label: "প্যাকেজসমূহ", icon: Package },
          { id: "process", label: "প্রক্রিয়া", icon: ClipboardList },
          { id: "testimonials", label: "রিভিউ", icon: MessageCircle },
          { id: "hero", label: "হিরো সেকশন", icon: Eye },
          { id: "seo", label: "SEO সেটিংস", icon: "🔍" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            {typeof tab.icon === "string" ? (
              tab.icon
            ) : (
              <tab.icon className="w-4 h-4" />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-8">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white animate-slide-in`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  বিজনেস কনসালটিং
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  ব্যবসায়িক পরামর্শ সেবার সবকিছু পরিচালনা করুন
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <TabNavigation />

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "মোট কনসালটেশন",
                  value: stats.totalConsultations,
                  icon: Users,
                  color: "blue",
                  bgColor: "bg-blue-100",
                  textColor: "text-blue-600",
                },
                {
                  label: "সক্রিয় ক্লায়েন্ট",
                  value: stats.activeClients,
                  icon: TrendingUp,
                  color: "green",
                  bgColor: "bg-green-100",
                  textColor: "text-green-600",
                },
                {
                  label: "মাসিক আয়",
                  value: `৳${(stats.monthlyRevenue / 100000).toFixed(1)}L`,
                  icon: DollarSign,
                  color: "purple",
                  bgColor: "bg-purple-100",
                  textColor: "text-purple-600",
                },
                {
                  label: "সাফল্যের হার",
                  value: `${stats.successRate}%`,
                  icon: Star,
                  color: "orange",
                  bgColor: "bg-orange-100",
                  textColor: "text-orange-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${stat.bgColor} rounded-xl shadow-sm`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                দ্রুত অ্যাকশন
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("services")}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
                >
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
                  <span className="text-gray-600 group-hover:text-orange-600 font-medium">
                    নতুন সার্ভিস যোগ করুন
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("packages")}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
                >
                  <Package className="w-8 h-8 text-gray-400 group-hover:text-green-500" />
                  <span className="text-gray-600 group-hover:text-green-600 font-medium">
                    নতুন প্যাকেজ তৈরি করুন
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("hero")}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
                >
                  <Edit className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-gray-600 group-hover:text-blue-600 font-medium">
                    হিরো সেকশন এডিট করুন
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === "hero" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              হিরো সেকশন
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  হিরো টাইটেল
                </label>
                <input
                  type="text"
                  value={heroData.hero_title}
                  onChange={(e) =>
                    handleHeroChange("hero_title", e.target.value)
                  }
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-lg"
                  placeholder="হিরো সেকশনের টাইটেল"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  হিরো বর্ণনা
                </label>
                <textarea
                  value={heroData.hero_description}
                  onChange={(e) =>
                    handleHeroChange("hero_description", e.target.value)
                  }
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                  rows="4"
                  placeholder="হিরো সেকশনের বর্ণনা"
                />
              </div>
              <button
                onClick={updateHero}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300"
              >
                হিরো সেকশন আপডেট করুন
              </button>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                সার্ভিসেস ম্যানেজমেন্ট
              </h2>
              <button
                onClick={addService}
                className="bg-green-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                নতুন সার্ভিস
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-2 border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-orange-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) =>
                          handleServiceChange(
                            service.id,
                            "icon",
                            e.target.value
                          )
                        }
                        className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                      />
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={service.enabled}
                            onChange={() => toggleService(service.id)}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 rounded-full peer ${
                              service.enabled ? "bg-green-500" : "bg-gray-300"
                            } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                          ></div>
                        </label>
                        <span
                          className={`text-sm font-medium ${
                            service.enabled ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {service.enabled ? "একটিভ" : "ইনএকটিভ"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateService(service.id)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeService(service.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      handleServiceChange(service.id, "title", e.target.value)
                    }
                    className="w-full font-bold text-xl mb-3 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    placeholder="সার্ভিসের নাম"
                  />

                  <textarea
                    value={service.description}
                    onChange={(e) =>
                      handleServiceChange(
                        service.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full text-gray-600 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                    rows="3"
                    placeholder="সার্ভিসের বর্ণনা"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Packages Tab */}
        {activeTab === "packages" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                প্যাকেজ ম্যানেজমেন্ট
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={addPackage}
                  className="bg-green-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  নতুন প্যাকেজ
                </button>
                <button
                  onClick={updatePackages}
                  className="bg-blue-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  সেভ করুন
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                    pkg.popular
                      ? "border-orange-500 bg-gradient-to-b from-orange-50 to-white shadow-lg"
                      : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                        জনপ্রিয়
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) =>
                          handlePackageChange(pkg.id, "name", e.target.value)
                        }
                        className="w-full text-2xl font-bold text-gray-800 mb-3 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                      />
                      <div className="flex items-baseline gap-2">
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) =>
                            handlePackageChange(pkg.id, "price", e.target.value)
                          }
                          className="text-3xl font-bold p-2 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition w-32"
                        />
                        <span className="text-gray-600 text-lg">
                          /{pkg.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => togglePackagePopular(pkg.id)}
                        className={`p-3 rounded-xl transition ${
                          pkg.popular
                            ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            pkg.popular ? "fill-yellow-500" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => removePackage(pkg.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Button Link Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      বাটন লিংক (ঐচ্ছিক)
                    </label>
                    <input
                      type="url"
                      value={pkg.button_link || ""}
                      onChange={(e) =>
                        handlePackageChange(
                          pkg.id,
                          "button_link",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-sm"
                      placeholder="https://example.com/book-consultation"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {pkg.button_link
                        ? 'বাটন "এখনই বুক করুন" দেখাবে'
                        : 'খালি রাখলে "যোগাযোগ করুন" দেখাবে'}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">
                        ফিচারসমূহ
                      </span>
                      <button
                        onClick={() => addFeature(pkg.id)}
                        className="text-green-500 hover:text-green-700 text-sm flex items-center gap-2 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg transition"
                      >
                        <Plus className="w-4 h-4" />
                        যোগ
                      </button>
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(pkg.id, idx, e.target.value)
                          }
                          className="flex-1 text-sm p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                        />
                        <button
                          onClick={() => removeFeature(pkg.id, idx)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "process" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                প্রক্রিয়া ম্যানেজমেন্ট
              </h2>
              <button
                onClick={updateProcess}
                className="bg-blue-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                সেভ করুন
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step) => (
                <div
                  key={step.id}
                  className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-200 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) =>
                        handleProcessChange(step.id, "step", e.target.value)
                      }
                      className="w-full bg-transparent text-white text-center border-none focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      handleProcessChange(step.id, "title", e.target.value)
                    }
                    className="font-bold text-lg text-gray-800 mb-3 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition w-full text-center"
                  />
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleProcessChange(
                        step.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="text-gray-600 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none w-full text-center"
                    rows="3"
                  />
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      আইকন নির্বাচন করুন
                    </label>
                    <IconSelector
                      value={step.icon_name}
                      onChange={(value) =>
                        handleProcessChange(step.id, "icon_name", value)
                      }
                      searchable
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                ক্লায়েন্ট রিভিউ
              </h2>
              <div className="flex gap-3">
                <button className="bg-green-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all duration-300">
                  <Plus className="w-5 h-5" />
                  নতুন রিভিউ
                </button>
                <button
                  onClick={updateTestimonials}
                  className="bg-blue-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  সেভ করুন
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="text"
                      value={testimonial.image}
                      onChange={(e) =>
                        handleTestimonialChange(
                          testimonial.id,
                          "image",
                          e.target.value
                        )
                      }
                      className="text-4xl w-16 h-16 text-center border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="font-bold text-lg text-gray-800 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition w-full mb-2"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "role",
                            e.target.value
                          )
                        }
                        className="text-gray-600 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition w-full"
                      />
                    </div>
                  </div>
                  <textarea
                    value={testimonial.text}
                    onChange={(e) =>
                      handleTestimonialChange(
                        testimonial.id,
                        "text",
                        e.target.value
                      )
                    }
                    className="w-full text-gray-700 p-4 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                    rows="4"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex text-yellow-400 text-lg">
                      {"⭐".repeat(5)}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && seoData && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              SEO সেটিংস
            </h2>
            <div className="space-y-6">
              {/* Basic SEO */}
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>📝</span> মৌলিক SEO সেটিংস
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Meta Title (৬০ অক্ষরের মধ্যে)"
                    value={seoData?.meta_title || ""}
                    onChange={(v) => updateSeoField("meta_title", v)}
                    placeholder="ব্যবসায়িক পরামর্শ সেবা - SME CUBE"
                  />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Meta Description (১৬০ অক্ষরের মধ্যে)
                      <span className="text-gray-500 ml-2">
                        ({(seoData?.meta_description || "").length}/160)
                      </span>
                    </label>
                    <textarea
                      value={seoData?.meta_description || ""}
                      onChange={(e) =>
                        updateSeoField("meta_description", e.target.value)
                      }
                      placeholder="পেশাদার ব্যবসায়িক পরামর্শ সেবা যা আপনার ব্যবসাকে নতুন উচ্চতায় নিয়ে যাবে..."
                      rows="3"
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <Input
                    label="Meta Keywords (কমা দিয়ে আলাদা করুন)"
                    value={seoData?.meta_keywords || ""}
                    onChange={(v) => updateSeoField("meta_keywords", v)}
                    placeholder="ব্যবসায়িক পরামর্শ, ব্যবসা উন্নয়ন, পরামর্শদাতা"
                  />
                  <Input
                    label="Focus Keyword"
                    value={seoData?.focus_keyword || ""}
                    onChange={(v) => updateSeoField("focus_keyword", v)}
                    placeholder="ব্যবসায়িক পরামর্শ"
                  />
                </div>
              </div>

              {/* Open Graph */}
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>🌐</span> Open Graph / Social Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="OG Image URL (খালি থাকলে Hero Image ব্যবহার হবে)"
                      value={seoData?.og_image || ""}
                      onChange={(v) => updateSeoField("og_image", v)}
                      placeholder="https://example.com/images/business-consulting-og.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 সেরা মাপ: 1200x630px | যদি OG Image না দেন, তাহলে Hero
                      Image অটোমেটিক্যালি ব্যবহার হবে
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      OG Type
                    </label>
                    <select
                      value={seoData?.og_type || "website"}
                      onChange={(e) =>
                        updateSeoField("og_type", e.target.value)
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                    </select>
                  </div>
                  <Input
                    label="OG Locale"
                    value={seoData?.og_locale || "bn_BD"}
                    onChange={(v) => updateSeoField("og_locale", v)}
                  />
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Twitter Card Type
                    </label>
                    <select
                      value={seoData?.twitter_card || "summary_large_image"}
                      onChange={(e) =>
                        updateSeoField("twitter_card", e.target.value)
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">
                        Summary Large Image
                      </option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Advanced SEO */}
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>⚙️</span> উন্নত SEO সেটিংস
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Canonical URL"
                    value={seoData?.canonical_url || ""}
                    onChange={(v) => updateSeoField("canonical_url", v)}
                    placeholder="https://smecube.com/services/business-consulting"
                  />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Schema Type
                    </label>
                    <select
                      value={seoData?.schema_type || "WebPage"}
                      onChange={(e) =>
                        updateSeoField("schema_type", e.target.value)
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="WebPage">WebPage</option>
                      <option value="Service">Service</option>
                      <option value="Product">Product</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seoData?.meta_robots_index !== false}
                        onChange={(e) =>
                          updateSeoField("meta_robots_index", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-orange-600"
                      />
                      <span className="text-sm font-medium">
                        Index (সার্চে দেখাবে)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seoData?.meta_robots_follow !== false}
                        onChange={(e) =>
                          updateSeoField("meta_robots_follow", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-orange-600"
                      />
                      <span className="text-sm font-medium">
                        Follow (লিঙ্ক ফলো করবে)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sitemap */}
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>🗺️</span> Sitemap সেটিংস
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Priority (0.0 - 1.0)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={seoData?.sitemap_priority || 0.8}
                      onChange={(e) =>
                        updateSeoField(
                          "sitemap_priority",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Change Frequency
                    </label>
                    <select
                      value={seoData?.change_frequency || "monthly"}
                      onChange={(e) =>
                        updateSeoField("change_frequency", e.target.value)
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* FAQ Schema */}
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>❓</span> FAQ Schema (সার্চে Rich Result দেখাবে)
                </h3>
                {(seoData?.faq_items || []).map((faq, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-white mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">FAQ #{i + 1}</span>
                      <button
                        onClick={() => removeFaqItem(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Input
                      label="প্রশ্ন"
                      value={faq.question || ""}
                      onChange={(v) => updateFaqItem(i, "question", v)}
                      placeholder="ব্যবসায়িক পরামর্শ কি?"
                    />
                    <div className="mt-2">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        উত্তর
                      </label>
                      <textarea
                        value={faq.answer || ""}
                        onChange={(e) =>
                          updateFaqItem(i, "answer", e.target.value)
                        }
                        placeholder="ব্যবসায়িক পরামর্শ হলো..."
                        rows="2"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addFaqItem}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-3 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4" /> নতুন FAQ
                </button>
              </div>

              <SaveBtn onClick={saveSeo} />
            </div>
          </div>
        )}

        {/* Save Button - Fixed at bottom */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            <span className="hidden sm:inline">
              {saving ? "সেভ হচ্ছে..." : "সব পরিবর্তন সেভ করুন"}
            </span>
            <span className="sm:hidden">
              {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
    />
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-2.5 font-medium text-white hover:shadow-md transition"
  >
    <Save className="h-5 w-5" /> এই সেকশন সেভ করুন
  </button>
);

export default AdminBusinessConsulting;
