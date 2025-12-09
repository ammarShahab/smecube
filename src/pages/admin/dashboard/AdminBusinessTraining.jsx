// src/pages/admin/dashboard/AdminBusinessTraining.jsx
import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, GraduationCap, 
  CheckCircle, XCircle, TrendingUp, Briefcase, Users, Link
} from "lucide-react";
import businessTrainingService from "../../../services/businessTrainingService";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";
import IconSelector from "../../../components/admin/IconSelector.jsx";
import BusinessTrainingIconSelector from "../../../components/admin/BusinessTrainingIconSelector";
import {
  ExpertMentorIcon,
  CertificationIcon,
  BusinessGrowthIcon,
  PracticalTrainingIcon,
  CustomTrainingIcon,
  FreeConsultationIcon,
  LiveSessionPracticeIcon,
  ResultCertificateIcon,
} from "../../../components/servicesPage/businessTraining/Icons";

const AdminBusinessTraining = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");

  // Icon mapping for existing Lucide icons
  const ICONS = {
    GraduationCap, TrendingUp, Briefcase, Users, 
    Globe: GraduationCap, Award: GraduationCap,
    DollarSign: TrendingUp, CreditCard: TrendingUp, 
    CheckCircle, Star: CheckCircle, Package: Briefcase
  };

  const tabs = [
    { id: "hero", name: "হিরো", icon: "📱" },
    { id: "stats", name: "পরিসংখ্যান", icon: "📊" },
    { id: "features", name: "ফিচার সমূহ", icon: "⭐" },
    { id: "process", name: "প্রক্রিয়া ধাপ", icon: "📝" },
    { id: "packages", name: "প্যাকেজ সমূহ", icon: "🎁" },
    { id: "courseModules", name: "কোর্স মডিউল", icon: "📚" },
    { id: "cta", name: "CTA", icon: "📞" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await businessTrainingService.getPageData();
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Load error:', err);
      setData(getDefaultDataStructure());
      setLoading(false);
      showToast("লোড করতে সমস্যা! ডিফল্ট ডেটা লোড করা হয়েছে।", "error");
    }
  };

  const getDefaultDataStructure = () => ({
    hero: { title: '', description: '', ctaPrimary: '' },
    stats: [],
    features: [],
    process: [],
    packages: [],
    courseModules: [],
    cta: { title: '', description: '', ctaPrimary: '' }
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
  const renderIcon = (iconName, size = 24, className = "text-green-600") => {
    // Check if it's a Lucide icon
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    // Otherwise use SVG icon (convert to lowercase)
    const iconNameLower = (iconName || '').toLowerCase();
    return <IconLibrary name={iconNameLower} size={size} className={className} />;
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
      await businessTrainingService.saveAdminData(payload);
      showToast(`${sec} সফলভাবে সেভ হয়েছে!`, "success");
    } catch (err) {
      console.error('Save error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      showToast(`সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
              <Input label="CTA বাটন টেক্সট" value={data.hero?.ctaPrimary} onChange={v => updateSection("hero", { ...data.hero, ctaPrimary: v })} />
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
                    <Input label="সংখ্যা" value={stat.number} onChange={v => updateItem("stats", i, "number", v)} />
                    <Input label="লেবেল" value={stat.label} onChange={v => updateItem("stats", i, "label", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("stats", { number: "", label: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 py-2 text-green-600 hover:bg-green-50">
                <Plus className="h-4 w-4" /> নতুন স্ট্যাট
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("stats")} />
          </div>
        );



// Then in the features case:
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
                    {feature.icon_name || feature.icon ? (
                      // Check if it's a hardcoded or Lucide icon
                      (() => {
                        const hardcodedIcons = ['ExpertMentorIcon', 'CertificationIcon', 'BusinessGrowthIcon', 'PracticalTrainingIcon'];
                        if (hardcodedIcons.includes(feature.icon_name || feature.icon)) {
                          // It's a hardcoded SVG icon
                          const IconMap = {
                            'ExpertMentorIcon': ExpertMentorIcon,
                            'CertificationIcon': CertificationIcon,
                            'BusinessGrowthIcon': BusinessGrowthIcon,
                            'PracticalTrainingIcon': PracticalTrainingIcon,
                          };
                          const IconComponent = IconMap[feature.icon_name || feature.icon] || ExpertMentorIcon;
                          return <IconComponent className="h-6 w-6 text-green-600" />;
                        } else if (ICONS[feature.icon_name || feature.icon]) {
                          // It's a Lucide icon
                          const LucideIcon = ICONS[feature.icon_name || feature.icon];
                          return <LucideIcon className="h-6 w-6 text-green-600" />;
                        }
                        // Otherwise use IconLibrary (convert to lowercase)
                        const iconNameLower = (feature.icon_name || feature.icon || '').toLowerCase();
                        return <IconLibrary name={iconNameLower} size={24} className="text-green-600" />;
                      })()
                    ) : (
                      <span className="text-xs text-gray-400">নাই</span>
                    )}
                  </div>
                  <BusinessTrainingIconSelector
                    value={feature.icon_name || feature.icon || ""}
                    onChange={v => updateItem("features", i, "icon_name", v)}
                    className="flex-1"
                  />
                </div>
              </div>
              <Input label="শিরোনাম" value={feature.title} onChange={v => updateItem("features", i, "title", v)} />
              <Input label="বিবরণ" value={feature.description} onChange={v => updateItem("features", i, "description", v)} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem("features", { icon_name: "", title: "", description: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 py-2 text-green-600 hover:bg-green-50">
          <Plus className="h-4 w-4" /> নতুন ফিচার
        </button>
      </div>
      <SaveBtn onClick={() => saveSection("features")} />
    </div>
  );
      case "process":
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              {(data.process || []).map((step, i) => (
                <div key={i} className="border rounded-lg p-5">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-lg font-semibold">প্রক্রিয়া #{i + 1}</h4>
                    <button onClick={() => removeItem("process", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {step.icon_name || step.icon ? (
                            (() => {
                              const customIcons = ['FreeConsultationIcon', 'CustomTrainingIcon', 'LiveSessionPracticeIcon', 'ResultCertificateIcon'];
                              if (customIcons.includes(step.icon_name || step.icon)) {
                                const IconMap = {
                                  'FreeConsultationIcon': FreeConsultationIcon,
                                  'CustomTrainingIcon': CustomTrainingIcon,
                                  'LiveSessionPracticeIcon': LiveSessionPracticeIcon,
                                  'ResultCertificateIcon': ResultCertificateIcon,
                                };
                                const IconComponent = IconMap[step.icon_name || step.icon] || FreeConsultationIcon;
                                return <IconComponent className="h-6 w-6 text-green-600" />;
                              } else if (ICONS[step.icon_name || step.icon]) {
                                const LucideIcon = ICONS[step.icon_name || step.icon];
                                return <LucideIcon className="h-6 w-6 text-green-600" />;
                              }
                              const iconNameLower = (step.icon_name || step.icon || '').toLowerCase();
                              return <IconLibrary name={iconNameLower} size={24} className="text-green-600" />;
                            })()
                          ) : (
                            <span className="text-xs text-gray-400">নাই</span>
                          )}
                        </div>
                        <BusinessTrainingIconSelector
                          value={step.icon_name || step.icon || ""}
                          onChange={v => updateItem("process", i, "icon_name", v)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input label="ধাপ নম্বর" value={step.step} onChange={v => updateItem("process", i, "step", v)} />
                    <Input label="শিরোনাম" value={step.title} onChange={v => updateItem("process", i, "title", v)} />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <Textarea label="বিবরণ" value={step.description} onChange={v => updateItem("process", i, "description", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("process", { step: "", icon_name: "FreeConsultationIcon", title: "", description: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 py-2 text-green-600 hover:bg-green-50">
                <Plus className="h-4 w-4" /> নতুন প্রক্রিয়া ধাপ
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("process")} />
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <Input label="প্যাকেজ নাম" value={pkg.name} onChange={v => updateItem("packages", i, "name", v)} />
                    <Input label="মূল্য" value={pkg.price} onChange={v => updateItem("packages", i, "price", v)} />
                    <Input label="সময়কাল" value={pkg.duration} onChange={v => updateItem("packages", i, "duration", v)} />
                    <Input label="সেশন সংখ্যা" value={pkg.sessions} onChange={v => updateItem("packages", i, "sessions", v)} />
                  </div>
                  <Input 
                    label="অর্ডার লিংক (ঐচ্ছিক)" 
                    value={pkg.button_link || ""} 
                    onChange={v => updateItem("packages", i, "button_link", v)}
                    placeholder="https://example.com/order"
                    icon={<Link className="h-4 w-4 text-gray-400" />}
                  />
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
                    <button onClick={() => updateItem("packages", i, "features", [...(pkg.features || []), ""])} className="text-xs text-green-600">
                      + ফিচার যোগ
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("packages", { name: "", price: "", duration: "", sessions: "", popular: false, features: [], button_link: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 py-2 text-green-600 hover:bg-green-50">
                <Plus className="h-4 w-4" /> নতুন প্যাকেজ
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("packages")} />
          </div>
        );

      case "courseModules":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.courseModules || []).map((module, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4>মডিউল #{i + 1}</h4>
                    <button onClick={() => removeItem("courseModules", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <Input label="ID" value={module.id} onChange={v => updateItem("courseModules", i, "id", v)} />
                    <Input label="নাম" value={module.name} onChange={v => updateItem("courseModules", i, "name", v)} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(module.icon, 6)}
                        </div>
                        <IconSelector
                          value={module.icon}
                          onChange={v => updateItem("courseModules", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">সক্রিয়</label>
                      <input type="checkbox" checked={!!module.enabled} onChange={e => updateItem("courseModules", i, "enabled", e.target.checked)} className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("courseModules", { id: "", name: "", icon: "GraduationCap", enabled: true })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-400 py-2 text-green-600 hover:bg-green-50">
                <Plus className="h-4 w-4" /> নতুন মডিউল
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("courseModules")} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="শিরোনাম" value={data.cta?.title} onChange={v => updateSection("cta", { ...data.cta, title: v })} />
              <Input label="বিবরণ" value={data.cta?.description} onChange={v => updateSection("cta", { ...data.cta, description: v })} />
              <Input label="CTA বাটন টেক্সট" value={data.cta?.ctaPrimary} onChange={v => updateSection("cta", { ...data.cta, ctaPrimary: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("cta")} />
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-6">
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
            <div className="rounded-lg bg-gradient-to-br from-green-500 to-blue-600 p-3">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">বিজনেস ট্রেনিং ম্যানেজমেন্ট</h1>
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
                      ? "bg-green-100 text-green-700 border border-green-200"
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
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  </div>
);

const Textarea = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
    />
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 py-2.5 font-medium text-white hover:shadow-md"
  >
    <Save className="h-5 w-5" /> এই সেকশন সেভ করুন
  </button>
);

export default AdminBusinessTraining;