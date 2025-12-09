import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Package,
  Loader2,
  CheckCircle,
  Users,
  Share2,
  BarChart3,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
  XCircle,
  Eye,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";
import IconSelector from "../../../components/admin/IconSelector.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL: API_URL });

// Icon mapping for existing Lucide icons
const ICONS = {
  Package,
  CheckCircle,
  Users,
  Share2,
  BarChart3,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
  XCircle,
  Eye,
};

// টোকেন চেক: token (from AuthContext)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AdminBrandPageSetup = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // State
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    cta1: "",
    cta2: "",
  });
  const [features, setFeatures] = useState([]);
  const [packages, setPackages] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [seoData, setSeoData] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const tabs = [
    { id: "hero", name: "হিরো সেকশন", icon: "✨" },
    { id: "features", name: "ফিচার সমূহ", icon: "⚡" },
    { id: "packages", name: "প্যাকেজ সমূহ", icon: "📦" },
    { id: "successStories", name: "সাফল্যের গল্প", icon: "📈" },
    { id: "testimonials", name: "ক্লায়েন্ট রিভিউ", icon: "⭐" },
    { id: "seo", name: "SEO সেটিংস", icon: "🔍" },
  ];

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    console.log("🔑 Auth Token:", authToken ? "Found" : "Not Found");

    fetchAllData();
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
  });

  // লোড সব ডাটা
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setAuthError(false);
      const res = await api.get("/admin/brand-page");
      if (res.data.success) {
        const { hero, features, packages, successStories, testimonials } =
          res.data.data;
        setHeroData(
          hero || {
            title: "",
            subtitle: "",
            description: "",
            cta1: "",
            cta2: "",
          }
        );
        setFeatures(features || []);
        setPackages(packages || []);
        setSuccessStories(successStories || []);
        setTestimonials(testimonials || []);
      }

      // Fetch SEO data
      try {
        const seoRes = await api.get("/admin/brand-page/seo");
        setSeoData(seoRes.data.data || getDefaultSeoData());
      } catch (seoError) {
        console.error("Error fetching SEO data:", seoError);
        setSeoData(getDefaultSeoData());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        setAuthError(true);
      } else {
        showNotification("ডেটা লোড করতে সমস্যা হয়েছে!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // সেকশন-ভিত্তিক সেভ
  const saveSection = async (section) => {
    try {
      setSaving(true);
      let payload = {};

      switch (section) {
        case "hero":
          payload = { hero: heroData };
          break;
        case "features":
          payload = { features };
          break;
        case "packages":
          payload = { packages };
          break;
        case "successStories":
          payload = { successStories };
          break;
        case "testimonials":
          payload = { testimonials };
          break;
      }

      await api.post("/admin/brand-page", payload);
      showNotification(`${section} সফলভাবে সেভ হয়েছে!`, "success");
    } catch (error) {
      console.error("Error saving data:", error);
      if (error.response?.status === 401) {
        setAuthError(true);
      } else {
        showNotification("সেভ করতে সমস্যা হয়েছে!", "error");
      }
    } finally {
      setSaving(false);
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
    try {
      setSaving(true);
      if (!seoData) {
        showNotification("SEO ডেটা পাওয়া যায়নি", "error");
        return;
      }

      await api.put("/admin/brand-page/seo", seoData);
      showNotification("SEO সেটিংস সফলভাবে সেভ হয়েছে!", "success");
    } catch (error) {
      console.error("Error saving SEO data:", error);
      if (error.response?.status === 401) {
        setAuthError(true);
      } else {
        showNotification("SEO সেভ করতে সমস্যা হয়েছে!", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // হ্যান্ডলার
  const handleHeroChange = (field, value) =>
    setHeroData((prev) => ({ ...prev, [field]: value }));
  const handleFeatureChange = (id, field, value) =>
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  const handlePackageChange = (id, field, value) =>
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  const handlePackageFeatureChange = (pkgId, idx, value) =>
    setPackages((prev) =>
      prev.map((p) =>
        p.id === pkgId
          ? {
              ...p,
              features: p.features.map((f, i) => (i === idx ? value : f)),
            }
          : p
      )
    );
  const addPackageFeature = (pkgId) =>
    setPackages((prev) =>
      prev.map((p) =>
        p.id === pkgId
          ? { ...p, features: [...(p.features || []), "নতুন ফিচার"] }
          : p
      )
    );
  const removePackageFeature = (pkgId, idx) =>
    setPackages((prev) =>
      prev.map((p) =>
        p.id === pkgId
          ? { ...p, features: p.features.filter((_, i) => i !== idx) }
          : p
      )
    );

  const addItem = (setter, defaultItem) =>
    setter((prev) => [...prev, { ...defaultItem, id: Date.now() }]);

  // Render icon based on type (SVG or Lucide)
  const renderIcon = (iconName, size = 24, className = "text-purple-600") => {
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    return <IconLibrary name={iconName} size={size} className={className} />;
  };

  // UI
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-2xl mb-4">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              লগইন প্রয়োজন
            </h2>
            <p className="text-red-600">
              অনুগ্রহ করে অ্যাডমিন হিসেবে লগইন করুন
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            লগইন পেজে যান
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="টাইটেল"
                value={heroData.title || ""}
                onChange={(v) => handleHeroChange("title", v)}
              />
              <Input
                label="সাবটাইটেল"
                value={heroData.subtitle || ""}
                onChange={(v) => handleHeroChange("subtitle", v)}
              />
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  বিবরণ
                </label>
                <textarea
                  value={heroData.description || ""}
                  onChange={(e) =>
                    handleHeroChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
              <Input
                label="CTA বাটন ১"
                value={heroData.cta1 || ""}
                onChange={(v) => handleHeroChange("cta1", v)}
              />
              <Input
                label="CTA বাটন ২"
                value={heroData.cta2 || ""}
                onChange={(v) => handleHeroChange("cta2", v)}
              />
            </div>
            <SaveBtn onClick={() => saveSection("hero")} saving={saving} />
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {features.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-medium">ফিচার</h4>
                    <button
                      onClick={() =>
                        setFeatures((prev) => prev.filter((x) => x.id !== f.id))
                      }
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        আইকন
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(f.icon, 6)}
                        </div>
                        <IconSelector
                          value={f.icon}
                          onChange={(v) => handleFeatureChange(f.id, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input
                      label="টাইটেল"
                      value={f.title || ""}
                      onChange={(v) => handleFeatureChange(f.id, "title", v)}
                    />
                    <Input
                      label="বিবরণ"
                      value={f.description || ""}
                      onChange={(v) =>
                        handleFeatureChange(f.id, "description", v)
                      }
                    />
                  </div>
                </motion.div>
              ))}
              <button
                onClick={() =>
                  addItem(setFeatures, {
                    icon: "Eye",
                    title: "নতুন ফিচার",
                    description: "বিবরণ",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-2 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" /> নতুন ফিচার যোগ করুন
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("features")} saving={saving} />
          </div>
        );

      case "packages":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  className="border rounded-lg p-5 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">
                      {pkg.name || "নামহীন প্যাকেজ"}
                    </h4>
                    <button
                      onClick={() =>
                        setPackages((prev) =>
                          prev.filter((p) => p.id !== pkg.id)
                        )
                      }
                      className="text-red-500 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3 mb-3">
                    <Input
                      label="প্যাকেজ নাম"
                      value={pkg.name || ""}
                      onChange={(v) => handlePackageChange(pkg.id, "name", v)}
                    />
                    <Input
                      label="মূল্য"
                      value={pkg.price || ""}
                      onChange={(v) => handlePackageChange(pkg.id, "price", v)}
                    />
                    <Input
                      label="সময়কাল"
                      value={pkg.duration || ""}
                      onChange={(v) =>
                        handlePackageChange(pkg.id, "duration", v)
                      }
                    />
                    <Input
                      label="Gradient Class"
                      value={pkg.gradient || ""}
                      onChange={(v) =>
                        handlePackageChange(pkg.id, "gradient", v)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <Input
                      label="অর্ডার লিঙ্ক (ঐচ্ছিক)"
                      value={pkg.button_link || ""}
                      onChange={(v) =>
                        handlePackageChange(pkg.id, "button_link", v)
                      }
                      placeholder="https://example.com/order"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      যদি লিঙ্ক দেন, তাহলে "অর্ডার করুন" বাটন এই লিঙ্কে যাবে
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id={`recommended-${pkg.id}`}
                      checked={pkg.recommended || false}
                      onChange={(e) =>
                        handlePackageChange(
                          pkg.id,
                          "recommended",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <label
                      htmlFor={`recommended-${pkg.id}`}
                      className="text-sm font-medium"
                    >
                      রেকমেন্ডেড প্যাকেজ
                    </label>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      প্যাকেজ ফিচার সমূহ
                    </label>
                    {pkg.features?.map((f, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          value={f}
                          onChange={(e) =>
                            handlePackageFeatureChange(
                              pkg.id,
                              i,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border rounded text-sm focus:border-purple-500 outline-none"
                          placeholder="ফিচার বিবরণ"
                        />
                        <button
                          onClick={() => removePackageFeature(pkg.id, i)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addPackageFeature(pkg.id)}
                      className="text-sm text-purple-600 flex items-center gap-1 hover:text-purple-700"
                    >
                      <Plus className="w-4 h-4" /> নতুন ফিচার যোগ করুন
                    </button>
                  </div>
                </motion.div>
              ))}
              <button
                onClick={() =>
                  addItem(setPackages, {
                    name: "নতুন প্যাকেজ",
                    price: "০",
                    duration: "মাসিক",
                    features: [],
                    recommended: false,
                    gradient: "from-gray-600 to-gray-700",
                    button_link: "",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-2 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" /> নতুন প্যাকেজ যোগ করুন
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("packages")} saving={saving} />
          </div>
        );

      case "successStories":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {successStories.map((story) => (
                <motion.div
                  key={story.id}
                  layout
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-medium">সাফল্যের গল্প</h4>
                    <button
                      onClick={() =>
                        setSuccessStories((prev) =>
                          prev.filter((s) => s.id !== story.id)
                        )
                      }
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        আইকন
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(story.icon, 6)}
                        </div>
                        <IconSelector
                          value={story.icon}
                          onChange={(v) =>
                            setSuccessStories((prev) =>
                              prev.map((s) =>
                                s.id === story.id ? { ...s, icon: v } : s
                              )
                            )
                          }
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input
                      label="ব্র্যান্ড নাম"
                      value={story.brand || ""}
                      onChange={(v) =>
                        setSuccessStories((prev) =>
                          prev.map((s) =>
                            s.id === story.id ? { ...s, brand: v } : s
                          )
                        )
                      }
                    />
                    <Input
                      label="বৃদ্ধি (৩০০%)"
                      value={story.growth || ""}
                      onChange={(v) =>
                        setSuccessStories((prev) =>
                          prev.map((s) =>
                            s.id === story.id ? { ...s, growth: v } : s
                          )
                        )
                      }
                    />
                    <Input
                      label="সংক্ষিপ্ত বিবরণ"
                      value={story.description || ""}
                      onChange={(v) =>
                        setSuccessStories((prev) =>
                          prev.map((s) =>
                            s.id === story.id ? { ...s, description: v } : s
                          )
                        )
                      }
                    />
                  </div>
                </motion.div>
              ))}
              <button
                onClick={() =>
                  addItem(setSuccessStories, {
                    brand: "নতুন ব্র্যান্ড",
                    growth: "০%",
                    description: "বিবরণ",
                    icon: "TrendingUp",
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-2 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" /> নতুন গল্প যোগ করুন
              </button>
            </div>
            <SaveBtn
              onClick={() => saveSection("successStories")}
              saving={saving}
            />
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {testimonials.map((test) => (
                <motion.div
                  key={test.id}
                  layout
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-medium">ক্লায়েন্ট রিভিউ</h4>
                    <button
                      onClick={() =>
                        setTestimonials((prev) =>
                          prev.filter((t) => t.id !== test.id)
                        )
                      }
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    <Input
                      label="ক্লায়েন্ট নাম"
                      value={test.name || ""}
                      onChange={(v) =>
                        setTestimonials((prev) =>
                          prev.map((t) =>
                            t.id === test.id ? { ...t, name: v } : t
                          )
                        )
                      }
                    />
                    <Input
                      label="কোম্পানি নাম"
                      value={test.company || ""}
                      onChange={(v) =>
                        setTestimonials((prev) =>
                          prev.map((t) =>
                            t.id === test.id ? { ...t, company: v } : t
                          )
                        )
                      }
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        রেটিং
                      </label>
                      <select
                        value={test.rating || 5}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((t) =>
                              t.id === test.id
                                ? { ...t, rating: parseInt(e.target.value) }
                                : t
                            )
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                      >
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} ⭐ (
                            {r === 5
                              ? "চমৎকার"
                              : r === 4
                              ? "ভালো"
                              : r === 3
                              ? "মাঝারি"
                              : "খারাপ"}
                            )
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      রিভিউ টেক্সট
                    </label>
                    <textarea
                      value={test.text || ""}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((t) =>
                            t.id === test.id
                              ? { ...t, text: e.target.value }
                              : t
                          )
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                    />
                  </div>
                </motion.div>
              ))}
              <button
                onClick={() =>
                  addItem(setTestimonials, {
                    name: "নতুন ক্লায়েন্ট",
                    company: "কোম্পানি নাম",
                    text: "রিভিউ টেক্সট",
                    rating: 5,
                  })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-2 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" /> নতুন রিভিউ যোগ করুন
              </button>
            </div>
            <SaveBtn
              onClick={() => saveSection("testimonials")}
              saving={saving}
            />
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            {/* Basic SEO */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                মৌলিক SEO
              </h3>
              <div className="space-y-4">
                <Input
                  label="মেটা শিরোনাম"
                  value={seoData?.meta_title || ""}
                  onChange={(v) => updateSeoField("meta_title", v)}
                  placeholder="সাইট এর শিরোনাম"
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    মেটা ডেসক্রিপশন
                  </label>
                  <textarea
                    value={seoData?.meta_description || ""}
                    onChange={(e) =>
                      updateSeoField("meta_description", e.target.value)
                    }
                    rows={3}
                    placeholder="সাইটের সংক্ষিপ্ত বর্ণনা"
                    className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                  />
                </div>
                <Input
                  label="মেটা কীওয়ার্ড"
                  value={seoData?.meta_keywords || ""}
                  onChange={(v) => updateSeoField("meta_keywords", v)}
                  placeholder="কীওয়ার্ড কমা দ্বারা আলাদা করুন"
                />
                <Input
                  label="ফোকাস কীওয়ার্ড"
                  value={seoData?.focus_keyword || ""}
                  onChange={(v) => updateSeoField("focus_keyword", v)}
                  placeholder="প্রধান লক্ষ্য কীওয়ার্ড"
                />
              </div>
            </div>

            {/* Open Graph */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                ওপেন গ্রাফ
              </h3>
              <div className="space-y-4">
                <Input
                  label="OG শিরোনাম"
                  value={seoData?.og_title || ""}
                  onChange={(v) => updateSeoField("og_title", v)}
                  placeholder="সোশ্যাল শেয়ারের জন্য শিরোনাম"
                />
                <Input
                  label="OG ডেসক্রিপশন"
                  value={seoData?.og_description || ""}
                  onChange={(v) => updateSeoField("og_description", v)}
                  placeholder="সোশ্যাল শেয়ারের জন্য বর্ণনা"
                />
                <Input
                  label="OG ইমেজ URL"
                  value={seoData?.og_image || ""}
                  onChange={(v) => updateSeoField("og_image", v)}
                  placeholder="https://example.com/image.jpg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      OG টাইপ
                    </label>
                    <select
                      value={seoData?.og_type || "website"}
                      onChange={(e) =>
                        updateSeoField("og_type", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="business.business">Business</option>
                    </select>
                  </div>
                  <Input
                    label="OG লোকেল"
                    value={seoData?.og_locale || "bn_BD"}
                    onChange={(v) => updateSeoField("og_locale", v)}
                    placeholder="bn_BD"
                  />
                </div>
              </div>
            </div>

            {/* Advanced SEO */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                উন্নত SEO
              </h3>
              <div className="space-y-4">
                <Input
                  label="ক্যানোনিক্যাল URL"
                  value={seoData?.canonical_url || ""}
                  onChange={(v) => updateSeoField("canonical_url", v)}
                  placeholder="https://example.com"
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    স্কিমা টাইপ
                  </label>
                  <select
                    value={seoData?.schema_type || "Organization"}
                    onChange={(e) =>
                      updateSeoField("schema_type", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                  >
                    <option value="Organization">Organization</option>
                    <option value="LocalBusiness">Local Business</option>
                    <option value="WebPage">Web Page</option>
                    <option value="Article">Article</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={seoData?.meta_robots_index === 1}
                        onChange={(e) =>
                          updateSeoField(
                            "meta_robots_index",
                            e.target.checked ? 1 : 0
                          )
                        }
                        className="rounded"
                      />
                      ইন্ডেক্সিং অনুমতি দিন
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={seoData?.meta_robots_follow === 1}
                        onChange={(e) =>
                          updateSeoField(
                            "meta_robots_follow",
                            e.target.checked ? 1 : 0
                          )
                        }
                        className="rounded"
                      />
                      লিঙ্ক অনুসরণ করতে দিন
                    </label>
                  </div>
                </div>
                <Input
                  label="Twitter কার্ড"
                  value={seoData?.twitter_card || "summary_large_image"}
                  onChange={(v) => updateSeoField("twitter_card", v)}
                  placeholder="summary_large_image"
                />
              </div>
            </div>

            {/* Sitemap */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                সাইটম্যাপ সেটিংস
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    অগ্রাধিকার
                  </label>
                  <select
                    value={seoData?.sitemap_priority || "0.8"}
                    onChange={(e) =>
                      updateSeoField("sitemap_priority", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                  >
                    <option value="1.0">১.০ (সর্বোচ্চ)</option>
                    <option value="0.9">০.৯</option>
                    <option value="0.8">০.৮</option>
                    <option value="0.7">০.७</option>
                    <option value="0.5">০.५ (মধ্যম)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    পরিবর্তন ফ্রিকোয়েন্সি
                  </label>
                  <select
                    value={seoData?.change_frequency || "weekly"}
                    onChange={(e) =>
                      updateSeoField("change_frequency", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                  >
                    <option value="always">সবসময়</option>
                    <option value="daily">দৈনিক</option>
                    <option value="weekly">সাপ্তাহিক</option>
                    <option value="monthly">মাসিক</option>
                    <option value="yearly">বার্ষিক</option>
                    <option value="never">কখনো না</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FAQ Schema */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                FAQ স্কিমা
              </h3>
              <div className="space-y-4">
                {(seoData?.faq_items || []).map((faq, index) => (
                  <motion.div
                    key={index}
                    layout
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-medium text-gray-700">
                        প্রশ্ন #{index + 1}
                      </span>
                      <button
                        onClick={() => removeFaqItem(index)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="প্রশ্ন"
                      value={faq.question || ""}
                      onChange={(e) =>
                        updateFaqItem(index, "question", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg mb-3 focus:border-purple-500 outline-none"
                    />
                    <textarea
                      placeholder="উত্তর"
                      value={faq.answer || ""}
                      onChange={(e) =>
                        updateFaqItem(index, "answer", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:border-purple-500 outline-none"
                    />
                  </motion.div>
                ))}
                <button
                  onClick={addFaqItem}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-2 text-purple-600 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4" /> নতুন প্রশ্ন যোগ করুন
                </button>
              </div>
            </div>

            <SaveBtn onClick={saveSeo} saving={saving} />
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            নির্বাচিত ট্যাবের জন্য কোনো কন্টেন্ট পাওয়া যায়নি
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ব্র্যান্ড পেজ ম্যানেজমেন্ট
              </h1>
              <p className="text-sm text-gray-600">সেকশন‑ভিত্তিক সেভ করুন</p>
            </div>
          </div>
        </div>

        {/* Tab Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 bg-white rounded-xl shadow-sm p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">
                  {tabs.find((tab) => tab.id === activeTab)?.icon}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  {tabs.find((tab) => tab.id === activeTab)?.name}
                </h2>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl text-white shadow-2xl flex items-center gap-3 z-50 ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ---------- Reusable UI Components ---------- */
const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
    />
  </div>
);

const SaveBtn = ({ onClick, saving }) => (
  <button
    onClick={onClick}
    disabled={saving}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 py-2.5 font-medium text-white hover:shadow-md disabled:opacity-50"
  >
    {saving ? (
      <Loader2 className="h-5 w-5 animate-spin" />
    ) : (
      <Save className="h-5 w-5" />
    )}
    এই সেকশন সেভ করুন
  </button>
);

export default AdminBrandPageSetup;
