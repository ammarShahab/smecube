import React, { useState, useEffect } from "react";
import {
  Save, Trash2, Plus,
  Eye, Search, Download, Package, FolderOpen,
  Code, Palette, Zap, Smartphone, Shield, RefreshCw,
  Box, Database, Terminal, Layout, Layers, Grid,
  FileCode, Globe, Lock, Rocket, Star, Heart, XCircle,
  CheckCircle, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import webDevelopmentService from "../../../services/webDevelopmentService";

// Icon mapping for Lucide icons
const ICONS = {
  Palette, Zap, Smartphone, Shield, RefreshCw,
  Code, Box, Database, Terminal, Package, Layout, Layers, Grid,
  FileCode, Globe, Lock, Rocket, Star, Heart,
  Search, // Added Search icon
  ExternalLink, // Added ExternalLink icon
  CheckCircle // Added CheckCircle icon
};

const AdminWebDevelopment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customRequests, setCustomRequests] = useState([]);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomRequest, setSelectedCustomRequest] = useState(null);
  const [showCustomRequests, setShowCustomRequests] = useState(false);

  const colorOptions = ['orange','blue','yellow','cyan','green','purple','indigo','teal','red','pink','gray'];

  const tabs = [
    { id: "hero", name: "হিরো সেকশন", icon: "✨" },
    { id: "services", name: "সার্ভিস সমূহ", icon: "🔧" },
    { id: "technologies", name: "টেকনোলজি", icon: "💻" },
    { id: "packages", name: "প্যাকেজ সমূহ", icon: "📦" },
    { id: "portfolio", name: "পোর্টফোলিও", icon: "🖼️" },
    { id: "cta", name: "CTA সেকশন", icon: "📞" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (showCustomRequests) loadCustomRequests();
  }, [showCustomRequests]);

  const loadData = async () => {
    try {
      const res = await webDevelopmentService.getAdminData();
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(getDefaultDataStructure());
      showToast("লোড করতে সমস্যা! ডিফল্ট ডেটা লোড করা হয়েছে।", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadCustomRequests = async () => {
    try {
      const response = await webDevelopmentService.getCustomProjectRequests();
      let requests = [];
      if (response.data && Array.isArray(response.data)) {
        requests = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        requests = response.data.data;
      }
      setCustomRequests(requests);
    } catch (err) {
      console.error('Custom requests load error:', err);
      setCustomRequests([]);
      showToast("কাস্টম রিকোয়েস্ট লোড করতে সমস্যা!", "error");
    }
  };

  const getDefaultDataStructure = () => ({
    hero: { title:'',description:'',cta1:'',cta2:'',image:'' },
    services: [], technologies: [], packages: [], portfolio: [], cta: { title:'',description:'',button:'' }
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

  const addFeatureToPackage = pkgIdx => {
    const updated = [...(data.packages || [])];
    if (!updated[pkgIdx].features) updated[pkgIdx].features = [];
    updated[pkgIdx].features.push('');
    updateSection('packages', updated);
  };
  
  const removeFeatureFromPackage = (pkgIdx, featIdx) => {
    const updated = [...(data.packages || [])];
    if (updated[pkgIdx].features) {
      updated[pkgIdx].features.splice(featIdx, 1);
      updateSection('packages', updated);
    }
  };
  
  const updateFeatureInPackage = (pkgIdx, featIdx, val) => {
    const updated = [...(data.packages || [])];
    if (!updated[pkgIdx].features) updated[pkgIdx].features = [];
    updated[pkgIdx].features[featIdx] = val;
    updateSection('packages', updated);
  };

  const saveSection = async sec => {
    if (!data || data[sec] === undefined) {
      showToast("সেভ করার জন্য ডেটা পাওয়া যায়নি", "error");
      return;
    }
    const payload = { [sec]: data[sec] };
    try {
      await webDevelopmentService.saveAdminData(payload);
      showToast(`${sec} সফলভাবে সেভ হয়েছে!`, "success");
      await loadData();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Unknown error';
      showToast(`সেভ করতে সমস্যা: ${msg}`, "error");
    }
  };

  const updateCustomRequestStatus = async (id, status, notes = '') => {
    try {
      await webDevelopmentService.updateCustomRequestStatus(id, { status, admin_notes: notes });
      showToast('স্ট্যাটাস আপডেট হয়েছে!', 'success');
      loadCustomRequests();
      setSelectedCustomRequest(null);
    } catch (err) {
      showToast('স্ট্যাটাস আপডেট করতে সমস্যা!', 'error');
    }
  };

  const renderIcon = (iconName, size = 24, className = "text-purple-600") => {
    if (ICONS[iconName]) {
      const LucideIcon = ICONS[iconName];
      return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
    }
    // Fallback to Box icon if not found
    const LucideIcon = ICONS['Box'] || Box;
    return <LucideIcon className={`h-${size} w-${size} ${className}`} />;
  };

  const filteredCustomRequests = (customRequests || []).filter(r =>
    [r.name, r.email, r.mobile].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportCustomRequests = () => {
    const csv = [
      ['Name','Email','Mobile','Budget','Timeline','Status','Date'],
      ...filteredCustomRequests.map(r => [
        r.name||'', r.email||'', r.mobile||'', r.budget||'', r.timeline||'', r.status||'',
        new Date(r.created_at).toLocaleDateString()
      ])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = `custom-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); 
    URL.revokeObjectURL(url);
  };

  const getStatusColor = s => {
    const map = { 
      pending:'bg-yellow-100 text-yellow-800', 
      contacted:'bg-blue-100 text-blue-800',
      in_progress:'bg-purple-100 text-purple-800', 
      completed:'bg-green-100 text-green-800',
      rejected:'bg-red-100 text-red-800' 
    };
    return map[s] || 'bg-gray-100 text-gray-800';
  };
  
  const getStatusBangla = s => {
    const map = { 
      pending:'পেন্ডিং', 
      contacted:'যোগাযোগ করা হয়েছে', 
      in_progress:'প্রসেসিং',
      completed:'সম্পন্ন', 
      rejected:'বাতিল' 
    };
    return map[s] || s;
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="শিরোনাম" value={data.hero?.title || ''} onChange={v => updateSection('hero', {...data.hero, title: v})} />
              <Input label="বিবরণ" value={data.hero?.description || ''} onChange={v => updateSection('hero', {...data.hero, description: v})} />
              <Input label="প্রথম CTA" value={data.hero?.cta1 || ''} onChange={v => updateSection('hero', {...data.hero, cta1: v})} />
              <Input label="দ্বিতীয় CTA" value={data.hero?.cta2 || ''} onChange={v => updateSection('hero', {...data.hero, cta2: v})} />
              <div className="md:col-span-2">
                <Input label="ইমেজ URL" value={data.hero?.image || ''} onChange={v => updateSection('hero', {...data.hero, image: v})} />
              </div>
            </div>
            <SaveBtn onClick={() => saveSection('hero')} />
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            {(data.services || []).map((s, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">সার্ভিস #{i+1}</h4>
                  <button onClick={() => removeItem('services', i)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <Input label="শিরোনাম" value={s.title || ''} onChange={v => updateItem('services', i, 'title', v)} />
                  <Input label="বিবরণ" value={s.description || ''} onChange={v => updateItem('services', i, 'description', v)} />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                        {renderIcon(s.icon || 'Box', 6)}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={s.icon || ''}
                          onChange={e => updateItem('services', i, 'icon', e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          placeholder="Lucide icon name (e.g., Palette, Zap)"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lucide icon নাম দিন</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded border">
                  <span className="text-sm text-gray-600">প্রিভিউ:</span>
                  {renderIcon(s.icon || 'Box', 5)} 
                  <span className="font-semibold">{s.title || 'শিরোনাম'}</span>
                </div>
              </div>
            ))}
            <button onClick={() => addItem('services', {title: '', description: '', icon: 'Box'})} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50">
              <Plus className="h-4 w-4" /> নতুন সার্ভিস
            </button>
            <SaveBtn onClick={() => saveSection('services')} />
          </div>
        );

      case "technologies":
        return (
          <div className="space-y-6">
            {(data.technologies || []).map((t, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">টেক #{i+1}</h4>
                  <button onClick={() => removeItem('technologies', i)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <Input label="নাম" value={t.name || ''} onChange={v => updateItem('technologies', i, 'name', v)} />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">আইকন</label>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                        {renderIcon(t.icon || 'Code', 6)}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={t.icon || ''}
                          onChange={e => updateItem('technologies', i, 'icon', e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          placeholder="Lucide icon name"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">রঙ</label>
                    <select 
                      value={t.color || 'blue'} 
                      onChange={e => updateItem('technologies', i, 'color', e.target.value)} 
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                    >
                      {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-3 rounded border ${getColorClass(t.color)}`}>
                  {renderIcon(t.icon || 'Code', 5)} 
                  <span className="font-semibold">{t.name || 'টেকনোলজি'}</span>
                </div>
              </div>
            ))}
            <button onClick={() => addItem('technologies', {name: '', icon: 'Code', color: 'blue'})} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50">
              <Plus className="h-4 w-4" /> নতুন টেক
            </button>
            <SaveBtn onClick={() => saveSection('technologies')} />
          </div>
        );

      case "packages":
        return (
          <div className="space-y-6">
            {(data.packages || []).map((p, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">প্যাকেজ #{i+1}</h4>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.popular || false}
                        onChange={e => updateItem('packages', i, 'popular', e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm font-medium">প্রস্তাবিত</span>
                    </label>
                    <button onClick={() => removeItem('packages', i)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <Input label="নাম" value={p.name || ''} onChange={v => updateItem('packages', i, 'name', v)} />
                  <Input label="মূল্য" value={p.price || ''} onChange={v => updateItem('packages', i, 'price', v)} />
                  <Input label="সময়কাল" value={p.duration || ''} onChange={v => updateItem('packages', i, 'duration', v)} />
                </div>
                <div className="mb-4">
                  <Input label="ডেমো অর্ডার লিংক (ঐচ্ছিক)" value={p.demo_order_link || ''} onChange={v => updateItem('packages', i, 'demo_order_link', v)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ফিচার সমূহ</label>
                  <div className="space-y-2">
                    {(p.features || []).map((f, fi) => (
                      <div key={fi} className="flex gap-2">
                        <input
                          type="text"
                          value={f || ''}
                          onChange={e => updateFeatureInPackage(i, fi, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                          placeholder="যেমন: ৫ পেজ ওয়েবসাইট"
                        />
                        <button onClick={() => removeFeatureFromPackage(i, fi)} className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addFeatureToPackage(i)}
                      className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> নতুন ফিচার
                    </button>
                  </div>
                </div>
                {/* Preview */}
                <div className="mt-4 p-3 bg-white rounded border text-sm">
                  <p className="font-semibold">{p.name || 'প্যাকেজ নাম'}</p>
                  <p className="text-purple-600 font-bold">৳{p.price || '0'} / {p.duration || 'সময়'}</p>
                  <ul className="mt-2 space-y-1">
                    {(p.features || []).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> 
                        <span>{f || 'ফিচার'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('packages', {
                name: '', price: '', duration: '', popular: false,
                features: [], demo_order_link: ''
              })}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4" /> নতুন প্যাকেজ
            </button>
            <SaveBtn onClick={() => saveSection('packages')} />
          </div>
        );

      case "portfolio":
        return (
          <div className="space-y-6">
            {(data.portfolio || []).map((p, i) => (
              <div key={i} className="border rounded-lg p-5 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold">প্রজেক্ট #{i+1}</h4>
                  <button onClick={() => removeItem('portfolio', i)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <Input label="প্রজেক্ট নাম" value={p.name || ''} onChange={v => updateItem('portfolio', i, 'name', v)} />
                  <Input label="ক্যাটাগরি" value={p.category || ''} onChange={v => updateItem('portfolio', i, 'category', v)} />
                </div>
                <div className="mb-3">
                  <Input label="ইমেজ URL" value={p.image || ''} onChange={v => updateItem('portfolio', i, 'image', v)} />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
                  <textarea
                    value={p.description || ''}
                    onChange={e => updateItem('portfolio', i, 'description', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                    placeholder="প্রজেক্ট সম্পর্কে বিস্তারিত..."
                  />
                </div>
                <Input label="লাইভ লিংক (ঐচ্ছিক)" value={p.link || ''} onChange={v => updateItem('portfolio', i, 'link', v)} />
                {p.image && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-1">প্রিভিউ:</p>
                    <div className="h-32 rounded overflow-hidden border">
                      <img src={p.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem('portfolio', { name: '', category: '', image: '', description: '', link: '' })}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-purple-400 py-3 text-purple-600 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4" /> নতুন প্রজেক্ট
            </button>
            <SaveBtn onClick={() => saveSection('portfolio')} />
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Input label="শিরোনাম" value={data.cta?.title || ''} onChange={v => updateSection('cta', {...data.cta, title: v})} />
              <Input label="বিবরণ" value={data.cta?.description || ''} onChange={v => updateSection('cta', {...data.cta, description: v})} />
              <Input label="বাটন টেক্সট" value={data.cta?.button || ''} onChange={v => updateSection('cta', {...data.cta, button: v})} />
            </div>
            <SaveBtn onClick={() => saveSection('cta')} />
          </div>
        );

      default:
        return <div className="text-center py-8 text-gray-500">নির্বাচিত ট্যাবের জন্য কোনো কন্টেন্ট পাওয়া যায়নি</div>;
    }
  };

  // Custom Requests View
  if (showCustomRequests) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-5 py-3 text-white shadow-lg ${toast.type==="success"?"bg-green-600":"bg-red-600"}`}>
            {toast.type==="success"?<Save className="h-5 w-5"/>:<XCircle className="h-5 w-5"/>}
            {toast.msg}
          </div>
        )}
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3">
                  <FolderOpen className="h-7 w-7 text-white"/>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">কাস্টম প্রজেক্ট রিকোয়েস্ট</h1>
                  <p className="text-sm text-gray-600">মোট রিকোয়েস্ট: {customRequests.length}</p>
                </div>
              </div>
              <button onClick={() => setShowCustomRequests(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                কন্টেন্ট ম্যানেজমেন্টে ফিরুন
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard title="মোট কাস্টম রিকোয়েস্ট" value={customRequests.length} icon={<FolderOpen className="h-6 w-6"/>} color="blue"/>
              <StatCard title="পেন্ডিং" value={customRequests.filter(r=>r.status==='pending').length} icon={<Save className="h-6 w-6"/>} color="yellow"/>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <input 
                  type="text" 
                  placeholder="সার্চ (নাম, ইমেইল, মোবাইল)..." 
                  value={searchTerm} 
                  onChange={e=>setSearchTerm(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <button onClick={exportCustomRequests} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <Download className="h-4 w-4"/> CSV এক্সপোর্ট
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">মোবাইল</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">বাজেট</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">সময়সীমা</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCustomRequests.map(r=>(
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{new Date(r.created_at).toLocaleDateString('bn-BD')}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.name||'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{r.mobile}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{r.budget||'-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{r.timeline||'-'}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(r.status)}`}>
                            {getStatusBangla(r.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button 
                            onClick={()=>setSelectedCustomRequest(r)} 
                            className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4"/> দেখুন
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCustomRequests.length===0 && <div className="text-center py-8 text-gray-500">কোনো রিকোয়েস্ট পাওয়া যায়নি</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Request Detail Modal */}
        {selectedCustomRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="bg-white rounded-2xl p-6 md:p-8 max-w-3xl w-full my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">কাস্টম প্রজেক্ট রিকোয়েস্ট</h3>
                <button onClick={()=>setSelectedCustomRequest(null)} className="text-gray-500 hover:text-gray-700">
                  <XCircle className="w-6 h-6"/>
                </button>
              </div>
              <div className="space-y-4">
                <div><strong>নাম:</strong> {selectedCustomRequest.name || 'N/A'}</div>
                <div><strong>ইমেইল:</strong> {selectedCustomRequest.email || 'N/A'}</div>
                <div><strong>মোবাইল:</strong> {selectedCustomRequest.mobile}</div>
                <div><strong>বাজেট:</strong> {selectedCustomRequest.budget || 'N/A'}</div>
                <div><strong>সময়সীমা:</strong> {selectedCustomRequest.timeline || 'N/A'}</div>
                <div>
                  <strong>বিবরণ:</strong> 
                  <p className="mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedCustomRequest.description}</p>
                </div>
                <div>
                  <strong>স্ট্যাটাস:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedCustomRequest.status)}`}>
                    {getStatusBangla(selectedCustomRequest.status)}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <select
                  value={selectedCustomRequest.status}
                  onChange={e => updateCustomRequestStatus(selectedCustomRequest.id, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="pending">পেন্ডিং</option>
                  <option value="contacted">যোগাযোগ করা হয়েছে</option>
                  <option value="in_progress">প্রসেসিং</option>
                  <option value="completed">সম্পন্ন</option>
                  <option value="rejected">বাতিল</option>
                </select>
                <button onClick={()=>setSelectedCustomRequest(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200">
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  // Main Tab View
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-5 py-3 text-white shadow-lg ${toast.type==="success"?"bg-green-600":"bg-red-600"}`}>
          {toast.type==="success"?<Save className="h-5 w-5"/>:<XCircle className="h-5 w-5"/>}
          {toast.msg}
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3">
                <Package className="h-7 w-7 text-white"/>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ওয়েব ডেভেলপমেন্ট ম্যানেজমেন্ট</h1>
                <p className="text-sm text-gray-600">সেকশন‑ভিত্তিক সেভ করুন</p>
              </div>
            </div>
            <button
              onClick={() => setShowCustomRequests(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <FolderOpen className="h-4 w-4" />
              কাস্টম রিকোয়েস্ট ({customRequests.length})
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

/* ---------- Reusable UI Components ---------- */
const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
    />
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 py-2.5 font-medium text-white hover:shadow-md transition"
  >
    <Save className="h-5 w-5" /> এই সেকশন সেভ করুন
  </button>
);

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600'
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Helper function for color classes
const getColorClass = (color) => {
  const map = {
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200'
  };
  return map[color] || map.blue;
};

export default AdminWebDevelopment;