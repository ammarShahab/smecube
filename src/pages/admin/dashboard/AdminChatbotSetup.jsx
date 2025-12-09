// src/pages/admin/dashboard/AdminChatbotSetup.jsx
import React, { useEffect, useState } from "react";
import {
  Save, Plus, Trash2,
  Bot, MessageCircle, Target, BarChart3, Globe, Zap, CheckCircle, XCircle,
  BookOpen, Camera, Send, Circle, Puzzle, HelpCircle, Calendar,
  ShoppingCart, Headphones, Palette, ArrowRight, Settings, Layers, Link
} from "lucide-react";
import chatbotService from "../../../services/chatbotService.js";
import IconLibrary from "../../../components/admin/IconLibrary.jsx";
import IconSelector from "../../../components/admin/IconSelector.jsx";
import ChatbotSetupIconSelector from "../../../components/admin/ChatbotSetupIconSelector.jsx";

// === ICON MAPPING ===
const ICONS = {
  Bot, MessageCircle, Target, BarChart3, Globe, Zap, CheckCircle,
  messenger: BookOpen,
  whatsapp: MessageCircle,
  website: Globe,
  instagram: Camera,
  telegram: Send,
  line: Circle,
  custom: Puzzle,
  faq: HelpCircle,
  lead: Target,
  booking: Calendar,
  ecommerce: ShoppingCart,
  support: Headphones,
  design: Palette,
  step: ArrowRight,
  feature: Layers,
  config: Settings,
};

// === DEFAULTS ===
const defaultHero = { title: "", description: "", ctaPrimary: "", ctaSecondary: "" };
const defaultCta = { title: "", description: "", ctaPrimary: "", ctaSecondary: "" };

const AdminChatbotSetup = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", name: "হিরো", icon: "🤖" },
    { id: "features", name: "ফিচারস", icon: "⚡" },
    { id: "platforms", name: "প্ল্যাটফর্ম", icon: "🌐" },
    { id: "chatbotTypes", name: "চ্যাটবট টাইপ", icon: "🎯" },
    { id: "setupSteps", name: "সেটআপ স্টেপস", icon: "📊" },
    { id: "chatbotFeatures", name: "ফিচার ব্রেকডাউন", icon: "💬" },
    { id: "designShowcase", name: "ডিজাইন শোকেস", icon: "🎨" },
    { id: "packages", name: "প্যাকেজসমূহ", icon: "📦" },
    { id: "cta", name: "CTA", icon: "✅" }
  ];

  useEffect(() => {
    chatbotService.getAdminData()
      .then(res => {
        // Handle wrapped response structure: {success: true, data: {...}}
        const apiData = res.data?.data || res.data || {};

        setData({
          hero: { ...defaultHero, ...(apiData.hero || {}) },
          features: Array.isArray(apiData.features) ? apiData.features : [],
          platforms: Array.isArray(apiData.platforms) ? apiData.platforms : [],
          chatbotTypes: Array.isArray(apiData.chatbotTypes) ? apiData.chatbotTypes : [],
          setupSteps: Array.isArray(apiData.setupSteps) ? apiData.setupSteps : [],
          chatbotFeatures: Array.isArray(apiData.chatbotFeatures) ? apiData.chatbotFeatures : [],
          designShowcase: Array.isArray(apiData.designShowcase) ? apiData.designShowcase : [],
          packages: Array.isArray(apiData.packages) ? apiData.packages : [],
          cta: { ...defaultCta, ...(apiData.cta || {}) },
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Load error:', err);
        setLoading(false);
        showToast("লোড করতে সমস্যা!", "error");
      });
  }, []);

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
    let payload = { [sec]: data[sec] || [] };

    if (Array.isArray(payload[sec])) {
      payload[sec] = payload[sec]
        .map(item => {
          const cleaned = {};
          for (const key in item) {
            const val = item[key];
            if (val === false || val === 0) {
              cleaned[key] = val;
            } else if (val && val !== "" && val !== null && val !== undefined) {
              if (Array.isArray(val)) {
                const filteredArray = val.filter(v => v && v !== "");
                if (filteredArray.length > 0) cleaned[key] = filteredArray;
              } else {
                cleaned[key] = val;
              }
            }
          }
          return cleaned;
        })
        .filter(item => {
          const keys = Object.keys(item);
          return keys.length > 0 && keys.some(k =>
            (k !== 'icon' && k !== 'id') ||
            (k === 'icon' && item[k]) ||
            (k === 'id' && item[k])
          );
        });
    }

    if (sec === "packages") {
      payload[sec] = payload[sec]
        .map(pkg => {
          const cleanedPkg = {};
          if (pkg.name?.trim()) cleanedPkg.name = pkg.name.trim();
          if (pkg.price?.trim()) cleanedPkg.price = pkg.price.trim();
          if (pkg.duration?.trim()) cleanedPkg.duration = pkg.duration.trim();
          if (pkg.orderLink?.trim()) cleanedPkg.orderLink = pkg.orderLink.trim();
          cleanedPkg.popular = !!pkg.popular;
          if (Array.isArray(pkg.features)) {
            const validFeatures = pkg.features.filter(f => f?.trim());
            if (validFeatures.length > 0) cleanedPkg.features = validFeatures;
          }
          return cleanedPkg;
        })
        .filter(pkg => pkg.name || pkg.price || pkg.duration || pkg.orderLink || (pkg.features?.length > 0));
    }

    if (Array.isArray(payload[sec]) && payload[sec].length === 0) {
      showToast("কোনো ডেটা নেই সেভ করার জন্য", "error");
      return;
    }

    try {
      await chatbotService.saveAdminData(payload);
      showToast(`${sec} সেভ হয়েছে!`, "success");
    } catch (err) {
      console.error(err);
      showToast(`সেভ করতে সমস্যা: ${err.response?.data?.message || 'Unknown'}`, "error");
    }
  };

  const addPkg = () => addItem("packages", {
    name: "নতুন প্যাকেজ", 
    price: "০", 
    duration: "মাস", 
    orderLink: "",
    popular: false, 
    features: []
  });

  const addPkgFeat = (pkgIdx) => setData(prev => {
    const pkgs = [...(prev.packages || [])];
    pkgs[pkgIdx].features = [...(pkgs[pkgIdx].features || []), "নতুন ফিচার"];
    return { ...prev, packages: pkgs };
  });

  const updatePkgFeat = (pkgIdx, fi, val) => setData(prev => {
    const pkgs = [...(prev.packages || [])];
    pkgs[pkgIdx].features = [...(pkgs[pkgIdx].features || [])];
    pkgs[pkgIdx].features[fi] = val;
    return { ...prev, packages: pkgs };
  });

  const removePkgFeat = (pkgIdx, fi) => setData(prev => {
    const pkgs = [...(prev.packages || [])];
    pkgs[pkgIdx].features = (pkgs[pkgIdx].features || []).filter((_, i) => i !== fi);
    return { ...prev, packages: pkgs };
  });

  // Render icon based on type (SVG or Lucide)
  const renderIcon = (iconName, size = 24, className = "text-blue-600") => {
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    return <IconLibrary name={iconName} size={size} className={className} />;
  };

  // === RENDER GUARDS ===
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

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="শিরোনাম" value={data.hero?.title || ""} onChange={v => updateSection("hero", { ...data.hero, title: v })} />
              <Input label="বিবরণ" value={data.hero?.description || ""} onChange={v => updateSection("hero", { ...data.hero, description: v })} />
              <Input label="প্রাথমিক CTA" value={data.hero?.ctaPrimary || ""} onChange={v => updateSection("hero", { ...data.hero, ctaPrimary: v })} />
              <Input label="সেকেন্ডারি CTA" value={data.hero?.ctaSecondary || ""} onChange={v => updateSection("hero", { ...data.hero, ctaSecondary: v })} />
            </div>
            <SaveBtn onClick={() => saveSection("hero")} />
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.features || []).map((f, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium">ফিচার #{i + 1}</h4>
                    <button onClick={() => removeItem("features", i)} className="rounded p-1 text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(f.icon, 6)}
                        </div>
                        <IconSelector
                          value={f.icon}
                          onChange={v => updateItem("features", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input label="শিরোনাম" value={f.title || ""} onChange={v => updateItem("features", i, "title", v)} />
                    <Input label="বিবরণ" value={f.description || ""} onChange={v => updateItem("features", i, "description", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("features", { icon: "Bot", title: "নতুন ফিচার", description: "বিবরণ" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন ফিচার যোগ করুন
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("features")} />
          </div>
        );

      case "platforms":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.platforms || []).map((p, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="mb-3 flex justify-between">
                    <h4>প্ল্যাটফর্ম #{i + 1}</h4>
                    <button onClick={() => removeItem("platforms", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">প্ল্যাটফর্ম আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(p.icon, 6)}
                        </div>
                        <IconSelector
                          value={p.icon}
                          onChange={v => updateItem("platforms", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <Input label="নাম" value={p.name || ""} onChange={v => updateItem("platforms", i, "name", v)} />
                    <Input label="ID" value={p.id || ""} onChange={v => updateItem("platforms", i, "id", v)} />
                  </div>

                  <div className="mt-3">
                    <label className="text-sm font-medium">ফিচারস</label>
                    {(p.features || []).map((f, fi) => (
                      <div key={fi} className="flex gap-2 mt-1">
                        <input
                          className="flex-1 rounded border px-3 py-1.5 text-sm"
                          value={f || ""}
                          onChange={e => {
                            const feats = (p.features || []).map((x, j) => j === fi ? e.target.value : x);
                            updateItem("platforms", i, "features", feats);
                          }}
                        />
                        <button onClick={() => {
                          const feats = (p.features || []).filter((_, j) => j !== fi);
                          updateItem("platforms", i, "features", feats);
                        }} className="p-1 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => updateItem("platforms", i, "features", [...(p.features || []), "নতুন ফিচার"])} className="mt-2 text-xs text-blue-600">
                      + ফিচার যোগ
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={() => addItem("platforms", { id: "new", icon: "messenger", name: "New Platform", features: [] })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন প্ল্যাটফর্ম
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("platforms")} />
          </div>
        );

      case "chatbotTypes":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.chatbotTypes || []).map((t, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4>টাইপ #{i + 1}</h4>
                    <button onClick={() => removeItem("chatbotTypes", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">টাইপ আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(t.icon, 6)}
                        </div>
                        <IconSelector
                          value={t.icon}
                          onChange={v => updateItem("chatbotTypes", i, "icon", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <Input label="টাইপ নাম" value={t.type || ""} onChange={v => updateItem("chatbotTypes", i, "type", v)} />
                    <Input label="বিবরণ" value={t.description || ""} onChange={v => updateItem("chatbotTypes", i, "description", v)} />
                    <Input label="ইউজ কেস" value={t.useCase || ""} onChange={v => updateItem("chatbotTypes", i, "useCase", v)} />
                  </div>
                </div>
              ))}

              <button onClick={() => addItem("chatbotTypes", { icon: "faq", type: "New Bot Type", description: "", useCase: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন টাইপ
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("chatbotTypes")} />
          </div>
        );

      case "setupSteps":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.setupSteps || []).map((s, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-3">
                    <h4>স্টেপ #{i + 1}</h4>
                    <button onClick={() => removeItem("setupSteps", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">স্টেপ আইকন</label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          {renderIcon(s.icon_name, 6)}
                        </div>
                        <ChatbotSetupIconSelector
                          value={s.icon_name}
                          onChange={v => updateItem("setupSteps", i, "icon_name", v)}
                          label=""
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Input label="স্টেপ নম্বর" value={s.step || ""} onChange={v => updateItem("setupSteps", i, "step", v)} />
                  </div>
                  <div className="grid md:grid-cols-1 gap-3 mt-3">
                    <Input label="শিরোনাম" value={s.title || ""} onChange={v => updateItem("setupSteps", i, "title", v)} />
                    <Input label="বিবরণ" value={s.description || ""} onChange={v => updateItem("setupSteps", i, "description", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("setupSteps", { step: "নতুন", icon_name: "Requirement2Icon", title: "নতুন স্টেপ", description: "বিবরণ" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন স্টেপ
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("setupSteps")} />
          </div>
        );

      case "chatbotFeatures":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.chatbotFeatures || []).map((c, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4>ক্যাটাগরি #{i + 1}</h4>
                    <button onClick={() => removeItem("chatbotFeatures", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Input label="ক্যাটাগরি" value={c.category || ""} onChange={v => updateItem("chatbotFeatures", i, "category", v)} />
                  <div className="mt-3">
                    {(c.items || []).map((item, fi) => (
                      <div key={fi} className="flex gap-2 mt-1">
                        <input
                          className="flex-1 rounded border px-3 py-1.5 text-sm"
                          value={item || ""}
                          onChange={e => {
                            const items = (c.items || []).map((x, j) => j === fi ? e.target.value : x);
                            updateItem("chatbotFeatures", i, "items", items);
                          }}
                        />
                        <button onClick={() => {
                          const items = (c.items || []).filter((_, j) => j !== fi);
                          updateItem("chatbotFeatures", i, "items", items);
                        }} className="p-1 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => updateItem("chatbotFeatures", i, "items", [...(c.items || []), "নতুন আইটেম"])} className="mt-2 text-xs text-blue-600">
                      + আইটেম যোগ
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("chatbotFeatures", { category: "নতুন ক্যাটাগরি", items: [] })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন ক্যাটাগরি
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("chatbotFeatures")} />
          </div>
        );

      case "designShowcase":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {(data.designShowcase || []).map((d, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4>আইটেম #{i + 1}</h4>
                    <button onClick={() => removeItem("designShowcase", i)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input label="শিরোনাম" value={d.title || ""} onChange={v => updateItem("designShowcase", i, "title", v)} />
                    <Input label="বিবরণ" value={d.description || ""} onChange={v => updateItem("designShowcase", i, "description", v)} />
                  </div>
                </div>
              ))}
              <button onClick={() => addItem("designShowcase", { title: "নতুন ফিচার", description: "বিবরণ" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন আইটেম
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("designShowcase")} />
          </div>
        );

      case "packages":
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              {(data.packages || []).map((pkg, i) => (
                <div key={i} className="border rounded-lg p-5">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-lg font-semibold">{pkg.name || "Unnamed"}</h4>
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
                    <Input label="নাম" value={pkg.name || ""} onChange={v => updateItem("packages", i, "name", v)} />
                    <Input label="মূল্য" value={pkg.price || ""} onChange={v => updateItem("packages", i, "price", v)} />
                    <Input label="সময়কাল" value={pkg.duration || ""} onChange={v => updateItem("packages", i, "duration", v)} />
                    <Input 
                      label="অর্ডার লিংক (ঐচ্ছিক)" 
                      value={pkg.orderLink || ""} 
                      onChange={v => updateItem("packages", i, "orderLink", v)}
                      placeholder="https://example.com/order"
                      icon={<Link className="h-4 w-4 text-gray-400" />}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">ফিচারস</label>
                      <button onClick={() => addPkgFeat(i)} className="text-xs text-blue-600">+ যোগ করুন</button>
                    </div>
                    {(pkg.features || []).map((f, fi) => (
                      <div key={fi} className="flex gap-2 mb-2">
                        <input
                          className="flex-1 rounded border px-3 py-1.5 text-sm"
                          value={f || ""}
                          onChange={e => updatePkgFeat(i, fi, e.target.value)}
                        />
                        <button onClick={() => removePkgFeat(i, fi)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={addPkg} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-400 py-2 text-blue-600 hover:bg-blue-50">
                <Plus className="h-4 w-4" /> নতুন প্যাকেজ যোগ করুন
              </button>
            </div>
            <SaveBtn onClick={() => saveSection("packages")} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="শিরোনাম" value={data.cta?.title || ""} onChange={v => updateSection("cta", { ...data.cta, title: v })} />
              <Input label="বিবরণ" value={data.cta?.description || ""} onChange={v => updateSection("cta", { ...data.cta, description: v })} />
              <Input label="প্রাথমিক CTA" value={data.cta?.ctaPrimary || ""} onChange={v => updateSection("cta", { ...data.cta, ctaPrimary: v })} />
              <Input label="সেকেন্ডারি CTA" value={data.cta?.ctaSecondary || ""} onChange={v => updateSection("cta", { ...data.cta, ctaSecondary: v })} />
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

  // === MAIN RENDER ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
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
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-3">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">চ্যাটবট সেটআপ ম্যানেজমেন্ট</h1>
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
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
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
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2.5 font-medium text-white hover:shadow-md"
  >
    <Save className="h-5 w-5" /> এই সেকশন সেভ করুন
  </button>
);

export default AdminChatbotSetup;