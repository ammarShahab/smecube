// src/pages/admin/dashboard/AdminGraphicDesign.jsx
import React, { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  Palette,
  CheckCircle,
  XCircle,
  Package,
  Paintbrush,
  Smartphone,
  Image,
  Sparkles,
  Target,
  Brush,
  Pencil,
  Layout,
  Building2,
  FileText,
  Star,
  Link,
  ChevronRight,
  Lightbulb,
  Layers,
  RefreshCw,
  Download,
  Wrench,
  Code,
  Cpu,
  Database,
  Server,
  Globe,
  TrendingUp,
  Users,
  Clock,
  Award
} from "lucide-react";

import graphicDesignService from "../../../services/graphicDesignService.js";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";

// Import custom icons for process steps
import {
  IdeaIcon,
  DesignCreationIcon,
  RevisionFeedbackIcon,
  FinalDeliveryIcon,
  HtmlIcon,
  CssIcon
} from "../../../components/servicesPage/graphicDesign/Icons.jsx";

// Main Component
const AdminGraphicDesign = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");

  // Update tabs to include all sections
  const tabs = [
    { id: "hero", name: "হিরো", icon: "✨" },
    { id: "stats", name: "পরিসংখ্যান", icon: "📊" },
    { id: "processSteps", name: "প্রসেস স্টেপস", icon: "📝" },
    { id: "features", name: "ফিচারস", icon: "🎨" },
    { id: "portfolio", name: "পোর্টফোলিও", icon: "🖼️" },
    { id: "tools", name: "ডিজাইন টুলস", icon: "🖌️" },
    { id: "packages", name: "প্যাকেজসমূহ", icon: "📦" },
    { id: "cta", name: "CTA", icon: "✅" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    graphicDesignService.getAdminData()
      .then(res => { 
        console.log("Admin data loaded:", res.data);
        setData(res.data); 
        setLoading(false); 
      })
      .catch(() => { 
        setLoading(false); 
        showToast("লোড করতে সমস্যা!", "error"); 
      });
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateSection = (section, value) => setData(prev => ({ ...prev, [section]: value }));
  
  const updateItem = (section, idx, field, val) => setData(prev => {
    const arr = [...(prev[section] || [])];
    arr[idx] = { ...arr[idx], [field]: val };
    return { ...prev, [section]: arr };
  });
  
  const addItem = (section, def) => setData(prev => ({
    ...prev, 
    [section]: [...(prev[section] || []), def]
  }));
  
  const removeItem = (section, idx) => setData(prev => ({
    ...prev, 
    [section]: (prev[section] || []).filter((_, i) => i !== idx)
  }));

  const saveSection = async section => {
    try {
      console.log("Saving section:", section, data[section]);
      await graphicDesignService.saveAdminData({ [section]: data[section] });
      showToast(`${section} সেভ হয়েছে!`, "success");
    } catch (err) { 
      console.error("Save error:", err);
      showToast(`${section} সেভ করতে সমস্যা!`, "error"); 
    }
  };

  const saveAllData = async () => {
    try {
      await graphicDesignService.saveAdminData(data);
      showToast("সব ডেটা সেভ হয়েছে!", "success");
    } catch (err) { 
      console.error("Save all error:", err);
      showToast("সব ডেটা সেভ করতে সমস্যা!", "error"); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div>
      </div>
    );
  }

  // Icon mapping for admin
  const getIconComponent = (iconName) => {
    if (!iconName) return Paintbrush;
    
    const iconMap = {
      // Process step icons
      'IdeaIcon': IdeaIcon,
      'DesignCreationIcon': DesignCreationIcon,
      'RevisionFeedbackIcon': RevisionFeedbackIcon,
      'FinalDeliveryIcon': FinalDeliveryIcon,
      'HtmlIcon': HtmlIcon,
      'CssIcon': CssIcon,
      
      // Lucide icons
      'Paintbrush': Paintbrush,
      'Smartphone': Smartphone,
      'Image': Image,
      'Sparkles': Sparkles,
      'Brush': Brush,
      'Pencil': Pencil,
      'Palette': Palette,
      'Layout': Layout,
      'Building2': Building2,
      'FileText': FileText,
      'Code': Code,
      'Globe': Globe,
      'TrendingUp': TrendingUp,
      'Users': Users,
      'Clock': Clock,
      'Award': Award,
      'Wrench': Wrench,
      'Server': Server,
      'Cpu': Cpu,
      'Database': Database,
    };
    
    return iconMap[iconName] || Paintbrush;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input 
                label="শিরোনাম" 
                value={data.hero?.title || ''} 
                onChange={v => updateSection("hero", { ...data.hero, title: v })} 
                placeholder="গ্রাফিক ডিজাইন সার্ভিস"
              />
              <Input 
                label="CTA বাটন টেক্সট" 
                value={data.hero?.cta || ''} 
                onChange={v => updateSection("hero", { ...data.hero, cta: v })} 
                placeholder="ফ্রি কনসালটেশন"
              />
            </div>
            <Textarea 
              label="বিবরণ" 
              value={data.hero?.description || ''} 
              onChange={v => updateSection("hero", { ...data.hero, description: v })} 
              placeholder="আপনার ব্যবসার জন্য আকর্ষণীয় এবং প্রফেশনাল গ্রাফিক ডিজাইন..."
              rows={4}
            />
            <SaveBtn onClick={() => saveSection("hero")} />
          </div>
        );

      case "stats":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">পরিসংখ্যান যোগ করুন/সম্পাদনা করুন</h3>
              <p className="text-sm text-gray-500">ক্লায়েন্ট পেজে পরিসংখ্যান দেখানো হবে</p>
            </div>
            
            <div className="space-y-4">
              {(data.stats || []).map((stat, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">পরিসংখ্যান #{i + 1}</h4>
                    <button 
                      onClick={() => removeItem("stats", i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input 
                      label="লেবেল" 
                      value={stat.label || ''} 
                      onChange={v => updateItem("stats", i, "label", v)} 
                      placeholder="সম্পূর্ণ প্রজেক্ট"
                    />
                    <Input 
                      label="মান" 
                      value={stat.value || ''} 
                      onChange={v => updateItem("stats", i, "value", v)} 
                      placeholder="৫০০+"
                    />
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => addItem("stats", { label: "", value: "" })} 
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition"
              >
                <Plus className="h-5 w-5" /> নতুন পরিসংখ্যান যোগ করুন
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {data.stats && data.stats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stat.value || 'মান'}</div>
                  <div className="text-sm text-gray-600">{stat.label || 'লেবেল'}</div>
                </div>
              ))}
            </div>
            
            <SaveBtn onClick={() => saveSection("stats")} />
          </div>
        );

      case "processSteps":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">কাজের প্রক্রিয়া ধাপসমূহ</h3>
              <p className="text-sm text-gray-500">প্রতি ধাপে আইকন, শিরোনাম এবং বিবরণ যোগ করুন</p>
            </div>
            
            <div className="space-y-6">
              {(data.processSteps || []).map((step, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">ধাপ #{i + 1}</h4>
                    <button 
                      onClick={() => removeItem("processSteps", i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">ধাপ নম্বর</label>
                      <Input 
                        value={step.step || ''} 
                        onChange={v => updateItem("processSteps", i, "step", v)} 
                        placeholder="স্টেপ ১"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">শিরোনাম</label>
                      <Input 
                        value={step.title || ''} 
                        onChange={v => updateItem("processSteps", i, "title", v)} 
                        placeholder="আইডিয়া ও ব্রিফ"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">আইকন</label>
                      <select
                        value={step.icon_name || ''}
                        onChange={(e) => updateItem("processSteps", i, "icon_name", e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">আইকন নির্বাচন করুন</option>
                        <option value="IdeaIcon">IdeaIcon (আইডিয়া)</option>
                        <option value="DesignCreationIcon">DesignCreationIcon (ডিজাইন তৈরি)</option>
                        <option value="RevisionFeedbackIcon">RevisionFeedbackIcon (রিভিশন)</option>
                        <option value="FinalDeliveryIcon">FinalDeliveryIcon (ডেলিভারি)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">বিবরণ</label>
                    <Textarea 
                      value={step.description || ''} 
                      onChange={v => updateItem("processSteps", i, "description", v)} 
                      placeholder="আপনার প্রয়োজন, ব্র্যান্ড গাইডলাইন ও ভিশন আমাদের জানান..."
                      rows={3}
                    />
                  </div>
                  
                  {/* Preview */}
                  {step.icon_name && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100">
                          {(() => {
                            const IconComponent = getIconComponent(step.icon_name);
                            return <IconComponent className="w-6 h-6 text-purple-600" />;
                          })()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-purple-600">{step.step}</div>
                          <div className="font-medium text-gray-800">{step.title}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button 
                onClick={() => addItem("processSteps", { 
                  step: "", 
                  icon_name: "IdeaIcon", 
                  title: "", 
                  description: "" 
                })} 
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition"
              >
                <Plus className="h-5 w-5" /> নতুন প্রক্রিয়া ধাপ যোগ করুন
              </button>
            </div>
            
            <SaveBtn onClick={() => saveSection("processSteps")} />
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.features || []).map((f, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">ফিচার #{i + 1}</h4>
                    <button 
                      onClick={() => removeItem("features", i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-3">
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <select
                        value={f.icon || ''}
                        onChange={(e) => updateItem("features", i, "icon", e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">আইকন নির্বাচন করুন</option>
                        <option value="Paintbrush">Paintbrush (ব্রাশ)</option>
                        <option value="Smartphone">Smartphone (মোবাইল)</option>
                        <option value="Image">Image (ছবি)</option>
                        <option value="Sparkles">Sparkles (স্পার্কল)</option>
                        <option value="Brush">Brush (ব্রাশ)</option>
                        <option value="Pencil">Pencil (পেন্সিল)</option>
                        <option value="Palette">Palette (প্যালেট)</option>
                        <option value="Layout">Layout (লেআউট)</option>
                        <option value="HtmlIcon">HtmlIcon (HTML)</option>
                        <option value="CssIcon">CssIcon (CSS)</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-4">
                      <Input 
                        label="শিরোনাম" 
                        value={f.title || ''} 
                        onChange={v => updateItem("features", i, "title", v)} 
                        placeholder="ব্র্যান্ড আইডেন্টিটি"
                      />
                    </div>
                    
                    <div className="md:col-span-5">
                      <Textarea 
                        label="বিবরণ" 
                        value={f.description || ''} 
                        onChange={v => updateItem("features", i, "description", v)} 
                        placeholder="লোগো, কালার স্কিম এবং ব্র্যান্ড গাইডলাইন"
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  {/* Preview */}
                  {f.icon && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100">
                          {(() => {
                            const IconComponent = getIconComponent(f.icon);
                            return <IconComponent className="w-6 h-6 text-purple-600" />;
                          })()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{f.title || 'শিরোনাম'}</div>
                          <div className="text-sm text-gray-600">{f.description || 'বিবরণ'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button 
                onClick={() => addItem("features", { 
                  icon: "Paintbrush", 
                  title: "", 
                  description: "" 
                })} 
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition"
              >
                <Plus className="h-5 w-5" /> নতুন ফিচার যোগ করুন
              </button>
            </div>
            
            <SaveBtn onClick={() => saveSection("features")} />
          </div>
        );

      case "portfolio":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">পোর্টফোলিও আইটেম</h3>
              <p className="text-sm text-gray-500">প্রতিটি পোর্টফোলিও আইটেমে গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড যোগ করুন</p>
            </div>
            
            <div className="space-y-4">
              {(data.portfolio || []).map((p, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">পোর্টফোলিও #{i + 1}</h4>
                    <button 
                      onClick={() => removeItem("portfolio", i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Input 
                        label="নাম" 
                        value={p.name || ''} 
                        onChange={v => updateItem("portfolio", i, "name", v)} 
                        placeholder="ব্র্যান্ড লোগো"
                      />
                    </div>
                    
                    <div>
                      <Input 
                        label="ক্যাটাগরি" 
                        value={p.category || ''} 
                        onChange={v => updateItem("portfolio", i, "category", v)} 
                        placeholder="ব্র্যান্ডিং"
                      />
                    </div>
                    
                    <div>
                      <SelectGradient 
                        label="গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড" 
                        value={p.gradient || 'from-pink-400 via-red-400 to-rose-500'} 
                        onChange={v => updateItem("portfolio", i, "gradient", v)} 
                      />
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">প্রিভিউ:</div>
                    <div className="relative h-32 rounded-lg overflow-hidden border">
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient || 'from-pink-400 via-red-400 to-rose-500'}`}></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="text-lg font-bold">{p.name || 'নাম'}</div>
                        <div className="text-sm opacity-90">{p.category || 'ক্যাটাগরি'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => addItem("portfolio", { 
                  name: "", 
                  category: "", 
                  gradient: "from-pink-400 via-red-400 to-rose-500" 
                })} 
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition"
              >
                <Plus className="h-5 w-5" /> নতুন পোর্টফোলিও আইটেম যোগ করুন
              </button>
            </div>
            
            <SaveBtn onClick={() => saveSection("portfolio")} />
          </div>
        );

      case "tools":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">ডিজাইন টুলস</h3>
              <p className="text-sm text-gray-500">টুলের নাম, আইকন এবং গ্রেডিয়েন্ট কালার সিলেক্ট করুন</p>
            </div>
            
            <div className="space-y-4">
              {(data.tools || []).map((t, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800">টুল #{i + 1}</h4>
                    <button 
                      onClick={() => removeItem("tools", i)} 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                      <Input 
                        label="টুলের নাম" 
                        value={t.name || ''} 
                        onChange={v => updateItem("tools", i, "name", v)} 
                        placeholder="Adobe Photoshop"
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <select
                        value={t.icon || ''}
                        onChange={(e) => updateItem("tools", i, "icon", e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">আইকন নির্বাচন করুন</option>
                        <option value="Brush">Brush (ব্রাশ)</option>
                        <option value="Pencil">Pencil (পেন্সিল)</option>
                        <option value="Palette">Palette (প্যালেট)</option>
                        <option value="Layout">Layout (লেআউট)</option>
                        <option value="HtmlIcon">HtmlIcon (HTML)</option>
                        <option value="CssIcon">CssIcon (CSS)</option>
                        <option value="Code">Code (কোড)</option>
                        <option value="Wrench">Wrench (রেঞ্চ)</option>
                        <option value="Cpu">Cpu (সিপিইউ)</option>
                        <option value="Database">Database (ডাটাবেজ)</option>
                        <option value="Server">Server (সার্ভার)</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-4">
                      <SelectGradient 
                        label="গ্রেডিয়েন্ট কালার" 
                        value={t.color || 'from-blue-500 to-indigo-600'} 
                        onChange={v => updateItem("tools", i, "color", v)} 
                      />
                    </div>
                  </div>
                  
                  {/* Preview */}
                  {(t.icon || t.color) && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">প্রিভিউ:</div>
                      <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${t.color || 'from-blue-500 to-indigo-600'}`}>
                          {(() => {
                            const IconComponent = getIconComponent(t.icon || 'Brush');
                            return <IconComponent className="w-10 h-10" />;
                          })()}
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800">{t.name || 'টুলের নাম'}</div>
                          <div className="text-sm text-gray-600">গ্রেডিয়েন্ট: {t.color?.replace(/from-|via-|to-/g, '') || 'নির্বাচিত'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button 
                onClick={() => addItem("tools", { 
                  name: "", 
                  icon: "Brush", 
                  color: "from-blue-500 to-indigo-600" 
                })} 
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition"
              >
                <Plus className="h-5 w-5" /> নতুন টুল যোগ করুন
              </button>
            </div>
            
            <SaveBtn onClick={() => saveSection("tools")} />
          </div>
        );

      case "packages":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">প্যাকেজসমূহ</h3>
              <p className="text-sm text-gray-500">প্রতিটি প্যাকেজের বিস্তারিত তথ্য এবং ফিচারস যোগ করুন</p>
            </div>
            
            <div className="space-y-6">
              {(data.packages || []).map((pkg, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {pkg.name || "নামহীন প্যাকেজ"}
                    </h4>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!pkg.popular}
                          onChange={e => updateItem("packages", i, "popular", e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-purple-600">জনপ্রিয় প্যাকেজ</span>
                      </label>
                      <button
                        onClick={() => removeItem("packages", i)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                    <div className="md:col-span-4">
                      <Input
                        label="প্যাকেজ নাম"
                        value={pkg.name || ""}
                        onChange={v => updateItem("packages", i, "name", v)}
                        placeholder="বেসিক/স্ট্যান্ডার্ড/প্রিমিয়াম"
                      />
                    </div>
                    
                    <div className="md:col-span-4">
                      <Input
                        label="মূল্য"
                        value={pkg.price || ""}
                        onChange={v => updateItem("packages", i, "price", v)}
                        placeholder="৩,০০০"
                      />
                    </div>
                    
                    <div className="md:col-span-4">
                      <Input
                        label="সময়কাল"
                        value={pkg.duration || ""}
                        onChange={v => updateItem("packages", i, "duration", v)}
                        placeholder="৫টি ডিজাইন"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Input
                      label="বাটন লিঙ্ক"
                      value={pkg.button_link || ""}
                      onChange={v => updateItem("packages", i, "button_link", v)}
                      placeholder="/contact বা https://example.com"
                      icon={<Link className="h-4 w-4 text-gray-400" />}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">ফিচারস তালিকা</label>
                    <div className="space-y-2">
                      {(pkg.features || []).map((f, fi) => (
                        <div key={fi} className="flex gap-2">
                          <input
                            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                            value={f}
                            onChange={e => {
                              const features = [...(pkg.features || [])];
                              features[fi] = e.target.value;
                              updateItem("packages", i, "features", features);
                            }}
                            placeholder="ফিচার লিখুন..."
                          />
                          <button
                            onClick={() => {
                              const features = (pkg.features || []).filter((_, j) => j !== fi);
                              updateItem("packages", i, "features", features);
                            }}
                            className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={() => updateItem("packages", i, "features", [...(pkg.features || []), ""])}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" /> নতুন ফিচার যোগ করুন
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-3">প্যাকেজ প্রিভিউ:</div>
                    <div className={`rounded-lg p-6 ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white border border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold">{pkg.name || 'প্যাকেজ নাম'}</h4>
                        {pkg.popular && (
                          <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                            <Star className="w-3 h-3 inline mr-1" />
                            জনপ্রিয়
                          </span>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="text-3xl font-bold">৳{pkg.price || 'মূল্য'}</div>
                        <div className="text-sm opacity-80">/{pkg.duration || 'সময়কাল'}</div>
                      </div>
                      <div className="space-y-2 mb-6">
                        {(pkg.features || []).slice(0, 3).map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{f || 'ফিচার'}</span>
                          </div>
                        ))}
                        {(pkg.features || []).length > 3 && (
                          <div className="text-sm opacity-80">+ আরও {(pkg.features || []).length - 3} ফিচার</div>
                        )}
                      </div>
                      <div className={`py-2 px-4 rounded text-center font-medium ${pkg.popular ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'}`}>
                        অর্ডার করুন
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addItem("packages", {
                  name: "", 
                  price: "", 
                  duration: "", 
                  popular: false, 
                  features: [], 
                  button_link: "/contact"
                })}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50 transition font-medium"
              >
                <Plus className="h-5 w-5" /> নতুন প্যাকেজ যোগ করুন
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("packages")} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input 
                label="শিরোনাম" 
                value={data.cta?.title || ''} 
                onChange={v => updateSection("cta", { ...data.cta, title: v })} 
                placeholder="আপনার ব্র্যান্ডকে আলাদা করুন"
              />
              <Input 
                label="CTA বাটন টেক্সট" 
                value={data.cta?.cta || ''} 
                onChange={v => updateSection("cta", { ...data.cta, cta: v })} 
                placeholder="এখনই যোগাযোগ করুন"
              />
            </div>
            <Textarea 
              label="বিবরণ" 
              value={data.cta?.description || ''} 
              onChange={v => updateSection("cta", { ...data.cta, description: v })} 
              placeholder="ফ্রি কনসালটেশন এবং ডিজাইন মকআপ পান..."
              rows={3}
            />
            
            {/* Preview */}
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">{data.cta?.title || 'শিরোনাম'}</h3>
                <p className="mb-6 opacity-90">{data.cta?.description || 'বিবরণ'}</p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  {data.cta?.cta || 'বাটন টেক্সট'}
                </button>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-5 py-3 text-white shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3">
                <Palette className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">গ্রাফিক ডিজাইন ম্যানেজমেন্ট</h1>
                <p className="text-sm text-gray-600">সেকশন‑ভিত্তিক সেভ করুন</p>
              </div>
            </div>
            <button
              onClick={saveAllData}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 font-medium text-white hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              সব সেভ করুন
            </button>
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
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2">সর্বমোট আইটেম</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>পরিসংখ্যান</span>
                  <span className="font-medium">{data.stats?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>প্রক্রিয়া ধাপ</span>
                  <span className="font-medium">{data.processSteps?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ফিচারস</span>
                  <span className="font-medium">{data.features?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>পোর্টফোলিও</span>
                  <span className="font-medium">{data.portfolio?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>টুলস</span>
                  <span className="font-medium">{data.tools?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>প্যাকেজ</span>
                  <span className="font-medium">{data.packages?.length || 0}</span>
                </div>
              </div>
            </div>
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
                <span className="text-sm text-gray-500 ml-auto">
                  {(() => {
                    const items = data[tabs.find(tab => tab.id === activeTab)?.id];
                    return Array.isArray(items) ? `${items.length} আইটেম` : 'একক';
                  })()}
                </span>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable UI Components ---------- */
const Input = ({ label, value, onChange, placeholder, icon }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
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
    {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
    />
  </div>
);

const SelectGradient = ({ label, value, onChange }) => {
  const gradients = [
    { value: 'from-pink-400 via-red-400 to-rose-500', label: 'গোলাপি-লাল-গোলাপ (Pink-Red-Rose)' },
    { value: 'from-blue-400 via-purple-400 to-pink-500', label: 'নীল-বেগুনি-গোলাপি (Blue-Purple-Pink)' },
    { value: 'from-yellow-300 via-amber-400 to-orange-500', label: 'হলুদ-এম্বার-কমলা (Yellow-Amber-Orange)' },
    { value: 'from-green-400 via-teal-400 to-blue-500', label: 'সবুজ-টিল-নীল (Green-Teal-Blue)' },
    { value: 'from-blue-500 to-indigo-600', label: 'নীল-ইন্ডিগো (Blue-Indigo)' },
    { value: 'from-pink-500 to-rose-600', label: 'গোলাপি-গোলাপ (Pink-Rose)' },
    { value: 'from-purple-500 to-indigo-600', label: 'বেগুনি-ইন্ডিগো (Purple-Indigo)' },
    { value: 'from-blue-600 to-cyan-500', label: 'নীল-সায়ান (Blue-Cyan)' },
    { value: 'from-orange-500 to-red-600', label: 'কমলা-লাল (Orange-Red)' },
    { value: 'from-blue-500 to-purple-600', label: 'নীল-বেগুনি (Blue-Purple)' },
    { value: 'from-purple-500 to-pink-500', label: 'বেগুনি-গোলাপি (Purple-Pink)' },
    { value: 'from-green-500 to-teal-500', label: 'সবুজ-টিল (Green-Teal)' },
    { value: 'from-red-500 to-orange-500', label: 'লাল-কমলা (Red-Orange)' },
    { value: 'from-indigo-500 to-purple-500', label: 'ইন্ডিগো-বেগুনি (Indigo-Purple)' },
    { value: 'from-teal-500 to-cyan-500', label: 'টিল-সায়ান (Teal-Cyan)' },
  ];
  
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
      >
        {gradients.map(g => (
          <option key={g.value} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>
      {value && (
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">গ্রেডিয়েন্ট প্রিভিউ:</div>
          <div className="h-3 rounded-full w-full" style={{
            background: `linear-gradient(to right, ${value})`
          }}></div>
        </div>
      )}
    </div>
  );
};

const SaveBtn = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 py-2.5 font-medium text-white hover:opacity-90 transition"
  >
    <Save className="h-4 w-4" />
    সেকশন সেভ করুন
  </button>
);

export default AdminGraphicDesign;