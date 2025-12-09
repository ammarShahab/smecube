// src/pages/admin/dashboard/AdminIssueFixing.jsx
import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, Wrench, 
  CheckCircle, XCircle, Gift, TrendingUp, Zap, Calendar, Link
} from "lucide-react";
import issueFixingService from "../../../services/issueFixingService";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";
import IconSelector from "../../../components/admin/IconSelector.jsx";
import IssueFixingIconSelector from '../../../components/admin/IssueFixingIconSelector';

const AdminIssueFixing = () => {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");

  // Icon mapping for existing Lucide icons
  const ICONS = {
    Wrench, CheckCircle, Gift, TrendingUp, Zap, Calendar,
    Code: Zap, Bug: XCircle, Server: Wrench, Database: Wrench,
    Smartphone: Wrench, Globe: Wrench, Palette: Wrench, 
    ShoppingCart: Gift, HelpCircle: CheckCircle, Headphones: Wrench,
    Shield: CheckCircle, Award: Gift
  };

const tabs = [
  { id: "hero", name: "হিরো", icon: "📱" },
  { id: "stats", name: "পরিসংখ্যান", icon: "📊" },
  { id: "features", name: "ফিচারস", icon: "⭐" }, // NEW
  { id: "processSteps", name: "প্রসেস স্টেপস", icon: "📝" },
  { id: "packages", name: "প্যাকেজসমূহ", icon: "🎁" },
  { id: "technologies", name: "টেকনোলজি", icon: "💻" },
  { id: "cta", name: "CTA", icon: "📞" },
  { id: "seo", name: "SEO সেটিংস", icon: "🔍" }
];


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [adminRes, seoRes] = await Promise.all([
        issueFixingService.getAdminData(),
        issueFixingService.getSeo()
      ]);
      setData(adminRes.data);
      const seoResponseData = seoRes.data?.data || seoRes.data || {};
      setSeoData(seoResponseData);
      setLoading(false);
    } catch (err) {
      console.error('Load error:', err);
      setData(getDefaultDataStructure());
      setLoading(false);
      showToast("লোড করতে সমস্যা! ডিফল্ট ডেটা লোড করা হয়েছে।", "error");
    }
  };

  const getDefaultDataStructure = () => ({
    hero: { title: '', description: '', ctaPrimary: '', ctaSecondary: '' },
    stats: [],
    serviceCategories: [],
    packages: [],
    specialOffers: [],
    processSteps: [],
    technologies: [],
    issueTypes: [],
    cta: { title: '', description: '', ctaPrimary: '', ctaSecondary: '' }
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateSection = (sec, val) => setData(prev => ({ ...prev, [sec]: val }));
  
  const updateItem = (sec, idx, field, val) => setData(prev => {
    const arr = [...(prev[sec] || [])];
    arr[idx] = { ...arr[idx], [field]: val };
    return { ...prev, [sec]: arr };
  });
  
  const addItem = (sec, def) => setData(prev => ({ 
    ...prev, 
    [sec]: [...(prev[sec] || []), def] 
  }));
  
  const removeItem = (sec, idx) => setData(prev => ({ 
    ...prev, 
    [sec]: (prev[sec] || []).filter((_, i) => i !== idx) 
  }));

  // Render icon based on type (SVG or Lucide)
  const renderIcon = (iconName, size = 24, className = "text-orange-600") => {
    // Check if it's a Lucide icon
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    // Otherwise use SVG icon
    return <IconLibrary name={iconName} size={size} className={className} />;
  };

  const saveSection = async (sec) => {
    if (!data || !data[sec]) {
      showToast("সেভ করার জন্য ডেটা পাওয়া যায়নি", "error");
      return;
    }

    let payload = { [sec]: data[sec] };

    if (Array.isArray(payload[sec])) {
      payload[sec] = payload[sec]
        .map(item => {
          const cleaned = {};
          for (const key in item) {
            const val = item[key];
            if (typeof val === 'boolean') {
              cleaned[key] = val;
            } else if (typeof val === 'number') {
              cleaned[key] = val;
            } else if (Array.isArray(val)) {
              const filtered = val.filter(v => v && String(v).trim() !== "");
              if (filtered.length > 0) cleaned[key] = filtered;
              else cleaned[key] = [];
            } else if (typeof val === 'string' && val.trim() !== "") {
              cleaned[key] = val.trim();
            } else if (val !== null && val !== undefined) {
              cleaned[key] = val;
            }
          }
          return cleaned;
        })
        .filter(item => Object.keys(item).length > 0);
    }

    if (Array.isArray(payload[sec]) && payload[sec].length === 0) {
      showToast("কোনো বৈধ ডেটা নেই সেভ করার জন্য", "error");
      return;
    }

    try {
      await issueFixingService.saveAdminData(payload);
      showToast(`${sec} সফলভাবে সেভ হয়েছে!`, "success");
    } catch (err) {
      console.error('Save error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      showToast(`সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  // ==================== SEO FUNCTIONS ====================
  const getDefaultSeoData = () => ({
    meta_title: 'ইস্যু ফিক্সিং সার্ভিস - SME CUBE',
    meta_description: 'সব ধরনের প্রযুক্তিগত সমস্যার দ্রুত এবং নির্ভরযোগ্য সমাধান।',
    meta_keywords: 'ইস্যু ফিক্সিং, টেকনিক্যাল সাপোর্ট, সফটওয়্যার সমাধান, বাগ ফিক্স',
    og_image: '',
    canonical_url: '',
    focus_keyword: 'ইস্যু ফিক্সিং সার্ভিস',
    schema_type: 'Service',
    meta_robots_index: true,
    meta_robots_follow: true,
    twitter_card: 'summary_large_image',
    og_type: 'website',
    og_locale: 'bn_BD',
    sitemap_priority: 0.85,
    change_frequency: 'weekly',
    faq_items: []
  });

  const updateSeoField = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFaqItem = () => {
    setSeoData(prev => ({
      ...prev,
      faq_items: [...(prev.faq_items || []), { question: 'নতুন প্রশ্ন', answer: 'উত্তর' }]
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setSeoData(prev => {
      const items = [...(prev.faq_items || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, faq_items: items };
    });
  };

  const removeFaqItem = (index) => {
    setSeoData(prev => ({
      ...prev,
      faq_items: (prev.faq_items || []).filter((_, i) => i !== index)
    }));
  };

  const saveSeo = async () => {
    if (!seoData) {
      showToast('SEO ডেটা খুঁজে পাওয়া যায়নি', 'error');
      return;
    }

    setSaving(true);
    try {
      await issueFixingService.updateSeo(seoData);
      showToast('SEO ডেটা সফলভাবে সেভ হয়েছে!', 'success');
    } catch (err) {
      console.error('SEO save error:', err);
      showToast(`SEO সেভ করতে সমস্যা: ${err.response?.data?.message || err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="শিরোনাম" value={data.hero?.title} onChange={v => updateSection("hero", { ...data.hero, title: v })} />
              <Input label="বিবরণ" value={data.hero?.description} onChange={v => updateSection("hero", { ...data.hero, description: v })} />
              <Input label="প্রাথমিক CTA" value={data.hero?.ctaPrimary} onChange={v => updateSection("hero", { ...data.hero, ctaPrimary: v })} />
              <Input label="সেকেন্ডারি CTA" value={data.hero?.ctaSecondary} onChange={v => updateSection("hero", { ...data.hero, ctaSecondary: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("hero")} />
          </div>
        );

      case "stats":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.stats || []).map((stat, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex justify-between mb-2">
                    <h4>স্ট্যাট #{i + 1}</h4>
                    <button onClick={() => removeItem("stats", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input label="লেবেল" value={stat.label} onChange={v => updateItem("stats", i, "label", v)} />
                    <Input label="মান" value={stat.value} onChange={v => updateItem("stats", i, "value", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("stats", { label: "", value: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4" /> নতুন স্ট্যাট
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("stats")} />
          </div>
        );
        // Add the features case after stats:
case "features":
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {(data.features || []).map((feature, i) => (
          <div key={i} className="border rounded-lg p-5">
            <div className="flex justify-between mb-4">
              <h4 className="text-lg font-semibold">ফিচার #{i + 1}</h4>
              <button onClick={() => removeItem("features", i)} className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    {feature.icon_name ? (() => {
                      const iconMap = {
                        'QuickFixIcon': QuickFixIcon,
                        'GuaranteedIcon': GuaranteedIcon,
                        'SecureIcon': SecureIcon,
                        'SupportIcon': SupportIcon,
                      };
                      
                      if (iconMap[feature.icon_name]) {
                        const IconComponent = iconMap[feature.icon_name];
                        return <IconComponent className="h-6 w-6 text-orange-600" />;
                      } else if (ICONS[feature.icon_name]) {
                        const LucideIcon = ICONS[feature.icon_name];
                        return <LucideIcon className="h-6 w-6 text-orange-600" />;
                      }
                      return <IconLibrary name={feature.icon_name.toLowerCase()} size={24} className="text-orange-600" />;
                    })() : (
                      <span className="text-xs text-gray-400">নাই</span>
                    )}
                  </div>
                  <IssueFixingIconSelector
                    value={feature.icon_name || ""}
                    onChange={v => updateItem("features", i, "icon_name", v)}
                    className="flex-1"
                  />
                </div>
              </div>
              <Input label="শিরোনাম" value={feature.title} onChange={v => updateItem("features", i, "title", v)} />
              <Textarea label="বিবরণ" value={feature.description} onChange={v => updateItem("features", i, "description", v)} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem("features", { icon_name: "QuickFixIcon", title: "", description: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
          <Plus className="h-4 w-4" /> নতুন ফিচার
        </button>
      </div>
      <SaveBtn onClick={() => saveSection("features")} />
    </div>
  );

      case "packages":
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {(data.packages || []).map((pkg, i) => (
          <div key={i} className="border rounded-lg p-5">
            <div className="flex justify-between mb-4">
              <h4 className="text-lg font-semibold">{pkg.name || "Unnamed Package"}</h4>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!pkg.popular} onChange={e => updateItem("packages", i, "popular", e.target.checked)} className="h-4 w-4" />
                  <span className="text-sm font-medium">জনপ্রিয়</span>
                </label>
                <button onClick={() => removeItem("packages", i)} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Input label="প্যাকেজ নাম" value={pkg.name} onChange={v => updateItem("packages", i, "name", v)} />
              <Input label="মূল্য" value={pkg.price} onChange={v => updateItem("packages", i, "price", v)} />
              <Input label="সময়কাল" value={pkg.duration} onChange={v => updateItem("packages", i, "duration", v)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Input label="সেশন/ইস্যু" value={pkg.sessions} onChange={v => updateItem("packages", i, "sessions", v)} placeholder="আনলিমিটেড / ১০টি ইস্যু" />
              <Input label="মূল মূল্য" value={pkg.originalPrice} onChange={v => updateItem("packages", i, "originalPrice", v)} placeholder="ছাড়ের আগের মূল্য" />
              <Input label="ছাড়" value={pkg.discount} onChange={v => updateItem("packages", i, "discount", v)} placeholder="২৫% ছাড়" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <Input label="ব্যাজ টেক্সট" value={pkg.badgeText} onChange={v => updateItem("packages", i, "badgeText", v)} placeholder="জনপ্রিয় / বিশেষ অফার" />
              <Input 
                label="অর্ডার লিংক" 
                value={pkg.button_link || ""} 
                onChange={v => updateItem("packages", i, "button_link", v)}
                placeholder="/contact বা https://example.com"
                icon={<Link className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">ফিচারস</label>
              {(pkg.features || []).map((f, fi) => (
                <div key={fi} className="flex gap-2 mb-2">
                  <input
                    className="flex-1 rounded border px-3 py-1.5 text-sm"
                    value={f}
                    onChange={e => {
                      const features = pkg.features.map((x, j) => j === fi ? e.target.value : x);
                      updateItem("packages", i, "features", features);
                    }}
                  />
                  <button onClick={() => {
                    const features = pkg.features.filter((_, j) => j !== fi);
                    updateItem("packages", i, "features", features);
                  }} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateItem("packages", i, "features", [...(pkg.features || []), ""])} className="text-xs text-orange-600">
                + ফিচার যোগ
              </button>
            </div>
          </div>
        ))}
        <button onClick={() => addItem("packages", { 
          name: "", 
          price: "", 
          duration: "", 
          sessions: "", 
          originalPrice: "", 
          discount: "", 
          badgeText: "", 
          popular: false, 
          features: [], 
          button_link: "/contact" 
        })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
          <Plus className="h-4 w-4" /> নতুন প্যাকেজ
        </button>
      </div>
      <SaveBtn onClick={() => saveSection("packages")} />
    </div>
  );

      case "specialOffers":
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              {(data.specialOffers || []).map((offer, i) => (
                <div key={i} className="border rounded-lg p-5">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-lg font-semibold">{offer.name || "Unnamed"}</h4>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={!!offer.popular} onChange={e => updateItem("specialOffers", i, "popular", e.target.checked)} className="h-4 w-4" />
                        <span className="text-sm font-medium">জনপ্রিয়</span>
                      </label>
                      <button onClick={() => removeItem("specialOffers", i)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <Input label="নাম" value={offer.name} onChange={v => updateItem("specialOffers", i, "name", v)} />
                    <Input label="মূল মূল্য" value={offer.originalPrice} onChange={v => updateItem("specialOffers", i, "originalPrice", v)} />
                    <Input label="ছাড়ের মূল্য" value={offer.discountPrice} onChange={v => updateItem("specialOffers", i, "discountPrice", v)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <Input label="ছাড়" value={offer.discount} onChange={v => updateItem("specialOffers", i, "discount", v)} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(offer.icon, 6)}
                        </div>
                        <IconSelector
                          value={offer.icon}
                          onChange={v => updateItem("specialOffers", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input label="বিবরণ" value={offer.description} onChange={v => updateItem("specialOffers", i, "description", v)} />
                  </div>
                  <Input 
                    label="অর্ডার লিংক (ঐচ্ছিক)" 
                    value={offer.button_link || ""} 
                    onChange={v => updateItem("specialOffers", i, "button_link", v)}
                    placeholder="https://example.com/order"
                    icon={<Link className="h-4 w-4 text-gray-400" />}
                  />
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">ফিচারস</label>
                    {(offer.features || []).map((f, fi) => (
                      <div key={fi} className="flex gap-2 mb-2">
                        <input
                          className="flex-1 rounded border px-3 py-1.5 text-sm"
                          value={f}
                          onChange={e => {
                            const features = offer.features.map((x, j) => j === fi ? e.target.value : x);
                            updateItem("specialOffers", i, "features", features);
                          }}
                        />
                        <button onClick={() => {
                          const features = offer.features.filter((_, j) => j !== fi);
                          updateItem("specialOffers", i, "features", features);
                        }} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => updateItem("specialOffers", i, "features", [...(offer.features || []), ""])} className="text-xs text-orange-600">
                      + ফিচার যোগ
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("specialOffers", { name: "", originalPrice: "", discountPrice: "", discount: "", icon: "Gift", description: "", popular: false, features: [], button_link: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4" /> নতুন অফার
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("specialOffers")} />
          </div>
        );

      case "serviceCategories":
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              {(data.serviceCategories || []).map((cat, catIdx) => (
                <div key={catIdx} className="border rounded-lg p-5 bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <Input label="ক্যাটাগরি নাম" value={cat.category} onChange={v => updateItem("serviceCategories", catIdx, "category", v)} />
                    <button onClick={() => removeItem("serviceCategories", catIdx)} className="text-red-500 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4 mt-4">
                    <label className="text-sm font-semibold text-gray-700">সার্ভিস সমূহ</label>
                    {(cat.services || []).map((service, sIdx) => (
                      <div key={sIdx} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between mb-3">
                          <h5 className="font-medium">সার্ভিস #{sIdx + 1}</h5>
                          <button onClick={() => {
                            const services = cat.services.filter((_, j) => j !== sIdx);
                            updateItem("serviceCategories", catIdx, "services", services);
                          }} className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3 mb-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                            <div className="flex items-center gap-2">
                              <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                                {renderIcon(service.icon, 6)}
                              </div>
                              <IconSelector
                                value={service.icon}
                                onChange={v => {
                                  const services = [...cat.services];
                                  services[sIdx] = { ...services[sIdx], icon: v };
                                  updateItem("serviceCategories", catIdx, "services", services);
                                }}
                                label=""
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <Input label="শিরোনাম" value={service.title} onChange={v => {
                            const services = [...cat.services];
                            services[sIdx] = { ...services[sIdx], title: v };
                            updateItem("serviceCategories", catIdx, "services", services);
                          }} />
                          <Input label="বিবরণ" value={service.description} onChange={v => {
                            const services = [...cat.services];
                            services[sIdx] = { ...services[sIdx], description: v };
                            updateItem("serviceCategories", catIdx, "services", services);
                          }} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-2 block">ফিচারস</label>
                          {(service.features || []).map((f, fIdx) => (
                            <div key={fIdx} className="flex gap-2 mb-1">
                              <input
                                className="flex-1 rounded border px-2 py-1 text-xs"
                                value={f}
                                onChange={e => {
                                  const services = [...cat.services];
                                  services[sIdx].features[fIdx] = e.target.value;
                                  updateItem("serviceCategories", catIdx, "services", services);
                                }}
                              />
                              <button onClick={() => {
                                const services = [...cat.services];
                                services[sIdx].features = services[sIdx].features.filter((_, j) => j !== fIdx);
                                updateItem("serviceCategories", catIdx, "services", services);
                              }} className="text-red-500">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const services = [...cat.services];
                            services[sIdx].features = [...(services[sIdx].features || []), ""];
                            updateItem("serviceCategories", catIdx, "services", services);
                          }} className="text-xs text-orange-600 mt-1">
                            + ফিচার
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => {
                      const services = [...(cat.services || []), { icon: "code", title: "", description: "", features: [] }];
                      updateItem("serviceCategories", catIdx, "services", services);
                    }} className="w-full py-2 border border-dashed border-orange-300 rounded text-orange-600 text-sm">
                      + নতুন সার্ভিস
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("serviceCategories", { category: "", services: [] })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4" /> নতুন ক্যাটাগরি
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("serviceCategories")} />
          </div>
        );

      
// Update the processSteps case:
case "processSteps":
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {(data.processSteps || []).map((step, i) => (
          <div key={i} className="border rounded-lg p-5">
            <div className="flex justify-between mb-4">
              <h4 className="text-lg font-semibold">প্রক্রিয়া #{i + 1}</h4>
              <button onClick={() => removeItem("processSteps", i)} className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    {step.icon_name ? (() => {
                      // Find and render the icon
                      const iconMap = {
                        'ProblemReportIcon': ProblemReportIcon,
                        'DiagnosisAnalysisIcon': DiagnosisAnalysisIcon,
                        'FastFixTestingIcon': FastFixTestingIcon,
                        'LiveWarrantyIcon': LiveWarrantyIcon,
                        'QuickFixIcon': QuickFixIcon,
                        'GuaranteedIcon': GuaranteedIcon,
                        'SecureIcon': SecureIcon,
                        'SupportIcon': SupportIcon,
                      };
                      
                      if (iconMap[step.icon_name]) {
                        const IconComponent = iconMap[step.icon_name];
                        return <IconComponent className="h-6 w-6 text-orange-600" />;
                      } else if (ICONS[step.icon_name]) {
                        const LucideIcon = ICONS[step.icon_name];
                        return <LucideIcon className="h-6 w-6 text-orange-600" />;
                      }
                      return <IconLibrary name={step.icon_name.toLowerCase()} size={24} className="text-orange-600" />;
                    })() : (
                      <span className="text-xs text-gray-400">নাই</span>
                    )}
                  </div>
                  <IssueFixingIconSelector
                    value={step.icon_name || ""}
                    onChange={v => updateItem("processSteps", i, "icon_name", v)}
                    className="flex-1"
                  />
                </div>
              </div>
              <Input label="ধাপ নম্বর" value={step.step} onChange={v => updateItem("processSteps", i, "step", v)} />
              <Input label="শিরোনাম" value={step.title} onChange={v => updateItem("processSteps", i, "title", v)} />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Textarea label="বিবরণ" value={step.description} onChange={v => updateItem("processSteps", i, "description", v)} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem("processSteps", { step: "", icon_name: "ProblemReportIcon", title: "", description: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
          <Plus className="h-4 w-4" /> নতুন প্রক্রিয়া ধাপ
        </button>
      </div>
      <SaveBtn onClick={() => saveSection("processSteps")} />
    </div>
  );

     // Update the technologies case in renderTabContent:
case "technologies":
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {(data.technologies || []).map((tech, i) => (
          <div key={i} className="border rounded-lg p-5">
            <div className="flex justify-between mb-4">
              <div className="flex-1 mr-4">
                <Input label="টেকনোলজি নাম" value={tech.name} onChange={v => updateItem("technologies", i, "name", v)} />
              </div>
              <button onClick={() => removeItem("technologies", i)} className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                    {renderIcon(tech.icon || "Code", 6)}
                  </div>
                  <IconSelector
                    value={tech.icon || "Code"}
                    onChange={v => updateItem("technologies", i, "icon", v)}
                    label=""
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 block">সমস্যা সমূহ (প্রতি লাইনে একটি)</label>
                <Textarea 
                  label=""
                  value={(tech.problems || []).join('\n')}
                  onChange={v => {
                    const problems = v.split('\n').filter(line => line.trim() !== '');
                    updateItem("technologies", i, "problems", problems);
                  }}
                  placeholder="প্রতিটি সমস্যা নতুন লাইনে লিখুন"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">সমস্যা তালিকা:</label>
              {(tech.problems || []).map((prob, pIdx) => (
                <div key={pIdx} className="flex gap-2 mb-2">
                  <input
                    className="flex-1 rounded border px-3 py-1.5 text-sm"
                    value={prob}
                    onChange={e => {
                      const problems = tech.problems.map((x, j) => j === pIdx ? e.target.value : x);
                      updateItem("technologies", i, "problems", problems);
                    }}
                  />
                  <button onClick={() => {
                    const problems = tech.problems.filter((_, j) => j !== pIdx);
                    updateItem("technologies", i, "problems", problems);
                  }} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateItem("technologies", i, "problems", [...(tech.problems || []), ""])} className="text-xs text-orange-600">
                + সমস্যা যোগ
              </button>
            </div>
          </div>
        ))}
        <button onClick={() => addItem("technologies", { name: "", icon: "Code", problems: [] })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
          <Plus className="h-4 w-4" /> নতুন টেকনোলজি
        </button>
      </div>
      <SaveBtn onClick={() => saveSection("technologies")} />
    </div>
  );

      case "issueTypes":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.issueTypes || []).map((type, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4>টাইপ #{i + 1}</h4>
                    <button onClick={() => removeItem("issueTypes", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <Input label="ID" value={type.id} onChange={v => updateItem("issueTypes", i, "id", v)} />
                    <Input label="নাম" value={type.name} onChange={v => updateItem("issueTypes", i, "name", v)} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(type.icon, 6)}
                        </div>
                        <IconSelector
                          value={type.icon}
                          onChange={v => updateItem("issueTypes", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">সক্রিয়</label>
                      <input type="checkbox" checked={!!type.enabled} onChange={e => updateItem("issueTypes", i, "enabled", e.target.checked)} className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("issueTypes", { id: "", name: "", icon: "wrench", enabled: true })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-2 text-orange-600 hover:bg-orange-50">
                <Plus className="h-4 w-4" /> নতুন টাইপ
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("issueTypes")} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="শিরোনাম" value={data.cta?.title} onChange={v => updateSection("cta", { ...data.cta, title: v })} />
              <Input label="বিবরণ" value={data.cta?.description} onChange={v => updateSection("cta", { ...data.cta, description: v })} />
              <Input label="প্রাথমিক CTA" value={data.cta?.ctaPrimary} onChange={v => updateSection("cta", { ...data.cta, ctaPrimary: v })} />
              <Input label="সেকেন্ডারি CTA" value={data.cta?.ctaSecondary} onChange={v => updateSection("cta", { ...data.cta, ctaSecondary: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("cta")} />
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            {!seoData && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-blue-700">
                <p>SEO ডেটা লোড হচ্ছে...</p>
              </div>
            )}

            {seoData && (
              <>
                {/* ====== BASIC SEO ====== */}
                <div className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-xl">📝</span> মৌলিক SEO
                  </h3>
                  <div className="space-y-4">
                    <Input 
                      label="Meta Title (60 অক্ষর)" 
                      value={seoData.meta_title || ""} 
                      onChange={v => updateSeoField('meta_title', v)}
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Meta Description (160 অক্ষর)</label>
                      <textarea 
                        value={seoData.meta_description || ""} 
                        onChange={e => updateSeoField('meta_description', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        rows="3"
                      />
                    </div>
                    <Input 
                      label="Focus Keyword" 
                      value={seoData.focus_keyword || ""} 
                      onChange={v => updateSeoField('focus_keyword', v)}
                    />
                    <Input 
                      label="Meta Keywords" 
                      value={seoData.meta_keywords || ""} 
                      onChange={v => updateSeoField('meta_keywords', v)}
                    />
                  </div>
                </div>

                {/* ====== OPEN GRAPH ====== */}
                <div className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-xl">🌐</span> Open Graph
                  </h3>
                  <div className="space-y-4">
                    <Input 
                      label="OG Title" 
                      value={seoData.og_title || ""} 
                      onChange={v => updateSeoField('og_title', v)}
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">OG Description</label>
                      <textarea 
                        value={seoData.og_description || ""} 
                        onChange={e => updateSeoField('og_description', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        rows="2"
                      />
                    </div>
                    <Input 
                      label="OG Image URL" 
                      value={seoData.og_image || ""} 
                      onChange={v => updateSeoField('og_image', v)}
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input 
                        label="OG Type" 
                        value={seoData.og_type || "website"} 
                        onChange={v => updateSeoField('og_type', v)}
                      />
                      <Input 
                        label="OG Locale" 
                        value={seoData.og_locale || "bn_BD"} 
                        onChange={v => updateSeoField('og_locale', v)}
                      />
                    </div>
                  </div>
                </div>

                {/* ====== ADVANCED SEO ====== */}
                <div className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-green-50 to-emerald-50">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-xl">⚙️</span> উন্নত SEO
                  </h3>
                  <div className="space-y-4">
                    <Input 
                      label="Canonical URL" 
                      value={seoData.canonical_url || ""} 
                      onChange={v => updateSeoField('canonical_url', v)}
                    />
                    <Input 
                      label="Schema Type" 
                      value={seoData.schema_type || "Service"} 
                      onChange={v => updateSeoField('schema_type', v)}
                    />
                    <Input 
                      label="Twitter Card" 
                      value={seoData.twitter_card || "summary_large_image"} 
                      onChange={v => updateSeoField('twitter_card', v)}
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={seoData.meta_robots_index !== false} 
                          onChange={e => updateSeoField('meta_robots_index', e.target.checked)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">Meta Robots Index</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={seoData.meta_robots_follow !== false} 
                          onChange={e => updateSeoField('meta_robots_follow', e.target.checked)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">Meta Robots Follow</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* ====== SITEMAP ====== */}
                <div className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-orange-50 to-yellow-50">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-xl">🗺️</span> Sitemap
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input 
                      label="Sitemap Priority (0-1)" 
                      type="number" 
                      value={seoData.sitemap_priority || 0.85} 
                      onChange={v => updateSeoField('sitemap_priority', parseFloat(v))}
                    />
                    <Input 
                      label="Change Frequency" 
                      value={seoData.change_frequency || "weekly"} 
                      onChange={v => updateSeoField('change_frequency', v)}
                    />
                  </div>
                </div>

                {/* ====== FAQ SCHEMA ====== */}
                <div className="rounded-lg border border-gray-200 p-5 bg-gradient-to-br from-cyan-50 to-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-xl">❓</span> FAQ Schema
                    </h3>
                    <button 
                      onClick={addFaqItem}
                      className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> নতুন FAQ যোগ করুন
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(seoData.faq_items || []).map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-4 bg-white">
                        <div className="flex justify-between mb-3">
                          <h4 className="font-medium text-gray-700">প্রশ্ন #{idx + 1}</h4>
                          <button 
                            onClick={() => removeFaqItem(idx)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <Input 
                          label="প্রশ্ন" 
                          value={faq.question || ""} 
                          onChange={v => updateFaqItem(idx, 'question', v)}
                        />
                        <div className="mt-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">উত্তর</label>
                          <textarea 
                            value={faq.answer || ""} 
                            onChange={e => updateFaqItem(idx, 'answer', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <SaveBtn 
                  onClick={saveSeo} 
                  disabled={saving}
                  label={saving ? "সেভ হচ্ছে..." : "SEO সেটিংস সেভ করুন"}
                />
              </>
            )}
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-5 py-3 text-white shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.type === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {toast.msg}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-3">
              <Wrench className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ইস্যু ফিক্সিং ম্যানেজমেন্ট</h1>
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
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
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
                  {tabs.find(tab => tab.id === activeTab)?.icon}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */
const Input = ({ label, value, onChange, placeholder, icon }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  </div>
);

const SaveBtn = ({ onClick, disabled, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 py-2.5 font-medium text-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Save className="h-5 w-5" /> {label || "এই সেকশন সেভ করুন"}
  </button>
);

export default AdminIssueFixing;