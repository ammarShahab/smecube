import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, Package, Settings, CheckCircle, XCircle,
  Globe, HardDrive, Shield, Clock, Headphones, Server
} from "lucide-react";
import { motion } from "framer-motion";
import domainHostingService from "../../../services/domainHostingService";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";
import IconSelector from "../../../components/admin/IconSelector.jsx";

// Lucide icon mapping
const ICONS = {
  Globe, HardDrive, Shield, Clock, Headphones, Server,
  Package, Settings, CheckCircle
};

const AdminDomainHosting = () => {
  const [data, setData] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await domainHostingService.getAdminData();
      setData(response.data.content || response.data);
      setSeoData(response.data.seo || getDefaultSeoData());
      setLoading(false);
    } catch (err) {
      console.error('Load error:', err);
      setData(getDefaultDataStructure());
      setSeoData(getDefaultSeoData());
      setLoading(false);
      showToast("লোড করতে সমস্যা! ডিফল্ট ডেটা লোড করা হয়েছে।", "error");
    }
  };

  const getDefaultDataStructure = () => ({
    hero: { title: '', description: '', ctaPrimary: '', image: '' },
    features: [],
    steps: [],
    packages: [],
    cta: { title: '', description: '', ctaPrimary: '' }
  });

  const getDefaultSeoData = () => ({
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_image: '',
    canonical_url: '',
    focus_keyword: '',
    schema_type: 'WebPage',
    meta_robots_index: true,
    meta_robots_follow: true,
    twitter_card: 'summary_large_image',
    og_type: 'website',
    og_locale: 'bn_BD',
    sitemap_priority: 0.8,
    change_frequency: 'monthly',
    faq_items: [],
    breadcrumb_override: null
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
      await domainHostingService.saveAdminData(payload);
      showToast(`${sec} সফলভাবে সেভ হয়েছে!`, "success");
    } catch (err) {
      console.error('Save error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      showToast(`সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  const saveSeo = async () => {
    if (!seoData) {
      showToast("SEO ডেটা পাওয়া যায়নি", "error");
      return;
    }

    try {
      await domainHostingService.updateSeo(seoData);
      showToast("SEO সেটিংস সফলভাবে সেভ হয়েছে!", "success");
    } catch (err) {
      console.error('SEO save error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      showToast(`SEO সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  const updateSeoField = (field, value) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const addFaqItem = () => {
    setSeoData(prev => ({
      ...prev,
      faq_items: [...(prev.faq_items || []), { question: '', answer: '' }]
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

  // Render icon with fallback to IconLibrary
  const renderIcon = (iconName, size = 24, className = "text-orange-600") => {
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    return <IconLibrary name={iconName} size={size} className={className} />;
  };

  const tabs = [
    { id: "hero", name: "হিরো সেকশন", icon: "Hero" },
    { id: "features", name: "ফিচার সমূহ", icon: "Features" },
    { id: "steps", name: "প্রক্রিয়া ধাপ", icon: "Steps" },
    { id: "packages", name: "প্যাকেজ সমূহ", icon: "Packages" },
    { id: "cta", name: "CTA সেকশন", icon: "CTA" },
    { id: "seo", name: "SEO সেটিংস", icon: "🔍" }
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="শিরোনাম" value={data.hero?.title} onChange={v => updateSection("hero", { ...data.hero, title: v })} />
              <Input label="বিবরণ" value={data.hero?.description} onChange={v => updateSection("hero", { ...data.hero, description: v })} />
              <Input label="CTA বাটন টেক্সট" value={data.hero?.ctaPrimary} onChange={v => updateSection("hero", { ...data.hero, ctaPrimary: v })} />
              <Input label="ইমেজ ফাইল নাম" value={data.hero?.image} onChange={v => updateSection("hero", { ...data.hero, image: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("hero")} />
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            {(data.features || []).map((feature, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">ফিচার #{i + 1}</h4>
                  <button onClick={() => removeItem("features", i)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">আইকন</label>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                        {renderIcon(feature.icon, 6)}
                      </div>
                      <IconSelector
                        value={feature.icon}
                        onChange={v => updateItem("features", i, "icon", v)}
                        label=""
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Input label="শিরোনাম" value={feature.title} onChange={v => updateItem("features", i, "title", v)} />
                  <Input label="বিবরণ" value={feature.description} onChange={v => updateItem("features", i, "description", v)} />
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded border">
                  <span className="text-sm text-gray-600">প্রিভিউ:</span>
                  {renderIcon(feature.icon, 5)} <span className="font-semibold">{feature.title}</span>
                </div>
              </div>
            ))}
            <button onClick={() => addItem("features", { icon: "Globe", title: "", description: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-3 text-orange-600 hover:bg-orange-50">
              <Plus className="h-4 w-4" /> নতুন ফিচার
            </button>
            <SaveBtn onClick={() => saveSection("features")} />
          </div>
        );

      case "steps":
        return (
          <div className="space-y-6">
            {(data.steps || []).map((step, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">ধাপ #{i + 1}</h4>
                  <button onClick={() => removeItem("steps", i)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input label="ধাপ নম্বর" value={step.step} onChange={v => updateItem("steps", i, "step", v)} />
                  <Input label="শিরোনাম" value={step.title} onChange={v => updateItem("steps", i, "title", v)} />
                  <Input label="বিবরণ" value={step.description} onChange={v => updateItem("steps", i, "description", v)} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">আইকন</label>
                    <IconSelector 
                      value={step.icon_name} 
                      onChange={v => updateItem("steps", i, "icon_name", v)}
                      searchable
                    />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addItem("steps", { step: "", title: "", description: "", icon_name: "DomainSearchIcon" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-3 text-orange-600 hover:bg-orange-50">
              <Plus className="h-4 w-4" /> নতুন ধাপ
            </button>
            <SaveBtn onClick={() => saveSection("steps")} />
          </div>
        );

      case "packages":
        return (
          <div className="space-y-6">
            {(data.packages || []).map((pkg, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">{pkg.name || "নামহীন প্যাকেজ"}</h4>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={!!pkg.popular} 
                        onChange={e => updateItem("packages", i, "popular", e.target.checked)} 
                        className="h-4 w-4 rounded border-gray-300 text-orange-600"
                      />
                      <span className="text-sm font-medium text-orange-600">জনপ্রিয়</span>
                    </label>
                    <button 
                      onClick={() => removeItem("packages", i)} 
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <Input label="প্যাকেজ নাম" value={pkg.name || ""} onChange={v => updateItem("packages", i, "name", v)} />
                  <Input label="মূল্য" value={pkg.price || ""} onChange={v => updateItem("packages", i, "price", v)} />
                  <Input label="সময়কাল" value={pkg.duration || ""} onChange={v => updateItem("packages", i, "duration", v)} />
                  <Input label="স্প্যান (1-2)" value={pkg.span || 1} onChange={v => updateItem("packages", i, "span", v)} />
                </div>

                <div className="mb-4">
                  <Input 
                    label="বাটন লিঙ্ক (খালি হলে /contact)" 
                    value={pkg.button_link || ""} 
                    onChange={v => updateItem("packages", i, "button_link", v)} 
                    placeholder="যেমন: /contact অথবা https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ফিচারস</label>
                  {(pkg.features || []).map((f, fi) => (
                    <div key={fi} className="flex gap-2 mb-2">
                      <input
                        className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                        value={f}
                        onChange={e => {
                          const features = [...pkg.features];
                          features[fi] = e.target.value;
                          updateItem("packages", i, "features", features);
                        }}
                      />
                      <button 
                        onClick={() => {
                          const features = pkg.features.filter((_, j) => j !== fi);
                          updateItem("packages", i, "features", features);
                        }} 
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => updateItem("packages", i, "features", [...(pkg.features || []), ""])} 
                    className="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" /> নতুন ফিচার
                  </button>
                </div>

                {/* Preview */}
                <div className="mt-4 p-3 bg-white rounded border text-sm">
                  <p className="font-semibold">{pkg.name || 'প্যাকেজ নাম'}</p>
                  <p className="text-orange-600 font-bold">{pkg.price || '৳0'} / {pkg.duration || 'সময়'}</p>
                  <ul className="mt-2 space-y-1">
                    {(pkg.features || []).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">Check</span> {f || 'ফিচার'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <button 
              onClick={() => addItem("packages", { 
                name: "", price: "", duration: "", popular: false, span: 1, features: [], button_link: "" 
              })} 
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-orange-400 py-3 text-orange-600 hover:bg-orange-50"
            >
              <Plus className="h-4 w-4" /> নতুন প্যাকেজ
            </button>
            <SaveBtn onClick={() => saveSection("packages")} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="শিরোনাম" value={data.cta?.title} onChange={v => updateSection("cta", { ...data.cta, title: v })} />
              <Input label="বিবরণ" value={data.cta?.description} onChange={v => updateSection("cta", { ...data.cta, description: v })} />
              <Input label="CTA বাটন টেক্সট" value={data.cta?.ctaPrimary} onChange={v => updateSection("cta", { ...data.cta, ctaPrimary: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("cta")} />
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            {/* Basic SEO */}
            <div className="border rounded-lg p-5 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📝</span> মৌলিক SEO সেটিংস
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <Input 
                  label="Meta Title (৬০ অক্ষরের মধ্যে)" 
                  value={seoData?.meta_title || ''} 
                  onChange={v => updateSeoField('meta_title', v)}
                  placeholder="ডোমেইন ও হোস্টিং সার্ভিস - SME CUBE"
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Meta Description (১৬০ অক্ষরের মধ্যে) 
                    <span className="text-gray-500 ml-2">({(seoData?.meta_description || '').length}/160)</span>
                  </label>
                  <textarea
                    value={seoData?.meta_description || ''}
                    onChange={e => updateSeoField('meta_description', e.target.value)}
                    placeholder="নির্ভরযোগ্য ও সাশ্রয়ী মূল্যে ডোমেইন ও হোস্টিং সার্ভিস..."
                    rows="3"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <Input 
                  label="Meta Keywords (কমা দিয়ে আলাদা করুন)" 
                  value={seoData?.meta_keywords || ''} 
                  onChange={v => updateSeoField('meta_keywords', v)}
                  placeholder="ডোমেইন, হোস্টিং, ওয়েব হোস্টিং"
                />
                <Input 
                  label="Focus Keyword" 
                  value={seoData?.focus_keyword || ''} 
                  onChange={v => updateSeoField('focus_keyword', v)}
                  placeholder="ডোমেইন হোস্টিং"
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
                    value={seoData?.og_image || ''} 
                    onChange={v => updateSeoField('og_image', v)}
                    placeholder="https://example.com/images/domain-hosting-og.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 সেরা মাপ: 1200x630px | যদি OG Image না দেন, তাহলে Hero Image অটোমেটিক্যালি ব্যবহার হবে
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">OG Type</label>
                  <select
                    value={seoData?.og_type || 'website'}
                    onChange={e => updateSeoField('og_type', e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                  </select>
                </div>
                <Input 
                  label="OG Locale" 
                  value={seoData?.og_locale || 'bn_BD'} 
                  onChange={v => updateSeoField('og_locale', v)}
                />
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Twitter Card Type</label>
                  <select
                    value={seoData?.twitter_card || 'summary_large_image'}
                    onChange={e => updateSeoField('twitter_card', e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
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
                  value={seoData?.canonical_url || ''} 
                  onChange={v => updateSeoField('canonical_url', v)}
                  placeholder="https://smecube.com/services/domain-hosting"
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Schema Type</label>
                  <select
                    value={seoData?.schema_type || 'WebPage'}
                    onChange={e => updateSeoField('schema_type', e.target.value)}
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
                      onChange={e => updateSeoField('meta_robots_index', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600"
                    />
                    <span className="text-sm font-medium">Index (সার্চে দেখাবে)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={seoData?.meta_robots_follow !== false} 
                      onChange={e => updateSeoField('meta_robots_follow', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600"
                    />
                    <span className="text-sm font-medium">Follow (লিঙ্ক ফলো করবে)</span>
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
                  <label className="mb-1 block text-sm font-medium text-gray-700">Priority (0.0 - 1.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={seoData?.sitemap_priority || 0.8}
                    onChange={e => updateSeoField('sitemap_priority', parseFloat(e.target.value))}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Change Frequency</label>
                  <select
                    value={seoData?.change_frequency || 'monthly'}
                    onChange={e => updateSeoField('change_frequency', e.target.value)}
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
                    value={faq.question || ''} 
                    onChange={v => updateFaqItem(i, 'question', v)}
                    placeholder="ডোমেইন হোস্টিং কি?"
                  />
                  <div className="mt-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">উত্তর</label>
                    <textarea
                      value={faq.answer || ''}
                      onChange={e => updateFaqItem(i, 'answer', e.target.value)}
                      placeholder="ডোমেইন হোস্টিং হলো..."
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
        );

      default:
        return <div className="text-center py-8 text-gray-500">কোনো কন্টেন্ট পাওয়া যায়নি</div>;
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
              <Package className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ডোমেইন ও হোস্টিং ম্যানেজমেন্ট</h1>
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
                  {tabs.find(t => t.id === activeTab)?.icon}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  {tabs.find(t => t.id === activeTab)?.name}
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
const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
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

export default AdminDomainHosting;