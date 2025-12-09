import React, { useState, useEffect } from "react";
import { 
  Save, Trash2, Plus, Edit, Users, BarChart3, 
  Download, Search, Filter, ChevronDown, ChevronUp,
  CheckCircle, XCircle
} from "lucide-react";
import { motion } from "framer-motion";
import facebookBoostingService from "../../../services/facebookBoostingService";
import IconSelector from "../../../components/admin/IconSelector";

const AdminFacebookBoosting = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState(['hero', 'features', 'formLabels', 'process', 'packages']);

  useEffect(() => {
    loadData();
    if (activeTab === 'submissions') {
      loadSubmissions();
      loadStats();
    }
  }, [activeTab]);

  const loadData = async () => {
    try {
      const response = await facebookBoostingService.getAdminData();
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Load error:', err);
      setData(getDefaultDataStructure());
      setLoading(false);
      showToast("লোড করতে সমস্যা! ডিফল্ট ডেটা লোড করা হয়েছে।", "error");
    }
  };

  const loadSubmissions = async () => {
    try {
      const response = await facebookBoostingService.getSubmissions();
      setSubmissions(response.data.data);
    } catch (err) {
      console.error('Error loading submissions:', err);
      showToast("সাবমিশন লোড করতে সমস্যা!", "error");
    }
  };

  const loadStats = async () => {
    try {
      const response = await facebookBoostingService.getSubmissionStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const getDefaultDataStructure = () => ({
    hero: { title: '', description: '', cta1: '', cta2: '', image: '' },
    features: [],
    formLabels: []
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
  
  const toggleSection = sec => setOpenSections(prev =>
    prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]
  );

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
              // Keep empty arrays as they are (for features, etc.)
              cleaned[key] = filtered;
            } else if (typeof val === 'string') {
              // Keep the value even if empty - don't filter empty strings
              cleaned[key] = val;
            } else if (val !== null && val !== undefined) {
              cleaned[key] = val;
            }
          }
          // Don't filter out items, keep them even if some fields are empty
          return cleaned;
        });
        // Remove only items that are completely empty objects
        // But keep items that have at least one field set to something
        payload[sec] = payload[sec].filter(item => {
          const hasValue = Object.values(item).some(v => {
            if (Array.isArray(v)) return v.length > 0;
            if (typeof v === 'string') return v && v.trim() !== "";
            return v !== null && v !== undefined;
          });
          return hasValue;
        });
    }

    if (Array.isArray(payload[sec]) && payload[sec].length === 0) {
      showToast("কোনো বৈধ ডেটা নেই সেভ করার জন্য", "error");
      return;
    }

    try {
      await facebookBoostingService.saveAdminData(payload);
      showToast(`${sec} সফলভাবে সেভ হয়েছে!`, "success");
    } catch (err) {
      console.error('Save error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      showToast(`সেভ করতে সমস্যা: ${errorMsg}`, "error");
    }
  };

  const filteredSubmissions = submissions.filter(sub => 
    sub.mobile?.includes(searchTerm) || 
    sub.location?.includes(searchTerm) ||
    sub.submitted_by?.includes(searchTerm)
  );

  const exportSubmissions = () => {
    const csv = [
      ['Budget', 'Mobile', 'Page Link', 'Post Link', 'Min Age', 'Max Age', 'Location', 'Days', 'Submitted By', 'Date'],
      ...filteredSubmissions.map(sub => [
        sub.budget || '',
        sub.mobile || '',
        sub.page_link || '',
        sub.post_link || '',
        sub.min_age || '',
        sub.max_age || '',
        sub.location || '',
        sub.days || '',
        sub.submitted_by || '',
        new Date(sub.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facebook-boosting-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-4 md:p-6">
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
            <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 p-3">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ফেসবুক বুস্টিং ম্যানেজমেন্ট</h1>
              <p className="text-sm text-gray-600">কন্টেন্ট এবং সাবমিশন ম্যানেজ করুন</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'content' 
                ? 'bg-yellow-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            কন্টেন্ট ম্যানেজমেন্ট
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'submissions' 
                ? 'bg-yellow-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            সাবমিশনস ({submissions.length})
          </button>
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-6">
            {/* HERO SECTION */}
            <SectionCard title="হিরো সেকশন" open={openSections.includes("hero")} onToggle={() => toggleSection("hero")}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="শিরোনাম" value={data.hero?.title} onChange={v => updateSection("hero", { ...data.hero, title: v })} />
                <Input label="বিবরণ" value={data.hero?.description} onChange={v => updateSection("hero", { ...data.hero, description: v })} />
                <Input label="প্রথম CTA" value={data.hero?.cta1} onChange={v => updateSection("hero", { ...data.hero, cta1: v })} />
                <Input label="দ্বিতীয় CTA" value={data.hero?.cta2} onChange={v => updateSection("hero", { ...data.hero, cta2: v })} />
                <Input label="ইমেজ URL" value={data.hero?.image} onChange={v => updateSection("hero", { ...data.hero, image: v })} />
              </div>
              <SaveBtn onClick={() => saveSection("hero")} />
            </SectionCard>

            {/* FEATURES SECTION */}
            <SectionCard title="ফিচার সমূহ" open={openSections.includes("features")} onToggle={() => toggleSection("features")}>
              <div className="space-y-6">
                {(data.features || []).map((feature, i) => (
                  <div key={i} className="border rounded-lg p-5">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-lg font-semibold">ফিচার #{i + 1}</h4>
                      <button onClick={() => removeItem("features", i)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <Input label="শিরোনাম" value={feature.title} onChange={v => updateItem("features", i, "title", v)} />
                      <Input label="বিবরণ" value={feature.description} onChange={v => updateItem("features", i, "description", v)} />
                    </div>
                    <div className="mb-4">
                      <IconSelector 
                        label="আইকন নির্বাচন করুন"
                        value={feature.icon} 
                        onChange={v => updateItem("features", i, "icon", v)}
                        placeholder="আইকন সিলেক্ট করুন..."
                      />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem("features", { title: "", description: "", icon: "" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-yellow-400 py-2 text-yellow-600 hover:bg-yellow-50">
                  <Plus className="h-4 w-4" /> নতুন ফিচার
                </button>
              </div>
              <SaveBtn onClick={() => saveSection("features")} />
            </SectionCard>

            {/* FORM LABELS SECTION */}
            <SectionCard title="ফর্ম লেবেল" open={openSections.includes("formLabels")} onToggle={() => toggleSection("formLabels")}>
              <div className="space-y-6">
                {(data.formLabels || []).map((label, i) => (
                  <div key={i} className="border rounded-lg p-5">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-lg font-semibold">ফিল্ড #{i + 1}</h4>
                      <button onClick={() => removeItem("formLabels", i)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                      <Input label="ফিল্ড নাম" value={label.name} onChange={v => updateItem("formLabels", i, "name", v)} />
                      <Input label="লেবেল" value={label.label} onChange={v => updateItem("formLabels", i, "label", v)} />
                      <Input label="প্লেসহোল্ডার" value={label.placeholder} onChange={v => updateItem("formLabels", i, "placeholder", v)} />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">টাইপ</label>
                        <select 
                          value={label.type} 
                          onChange={e => updateItem("formLabels", i, "type", e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="tel">Telephone</option>
                          <option value="url">URL</option>
                          <option value="select">Select</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem("formLabels", { name: "", label: "", placeholder: "", type: "text" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-yellow-400 py-2 text-yellow-600 hover:bg-yellow-50">
                  <Plus className="h-4 w-4" /> নতুন ফিল্ড
                </button>
              </div>
              <SaveBtn onClick={() => saveSection("formLabels")} />
            </SectionCard>

            {/* PROCESS SECTION */}
            <SectionCard title="প্রক্রিয়া সেকশন" open={openSections.includes("process")} onToggle={() => toggleSection("process")}>
              <div className="space-y-6">
                {(data.process || []).map((step, i) => (
                  <div key={i} className="border rounded-lg p-5">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-lg font-semibold">ধাপ #{i + 1}</h4>
                      <button onClick={() => removeItem("process", i)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <Input label="ধাপ" value={step.step} onChange={v => updateItem("process", i, "step", v)} />
                      <Input label="শিরোনাম" value={step.title} onChange={v => updateItem("process", i, "title", v)} />
                      <div className="md:col-span-2">
                        <Input label="বিবরণ" value={step.description} onChange={v => updateItem("process", i, "description", v)} />
                      </div>
                      <div className="md:col-span-2">
                        <IconSelector
                          label="আইকন নির্বাচন করুন"
                          value={step.icon_name}
                          onChange={v => updateItem("process", i, "icon_name", v)}
                          placeholder="আইকন সিলেক্ট করুন..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem("process", { step: "", title: "", description: "", icon_name: "target" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-yellow-400 py-2 text-yellow-600 hover:bg-yellow-50">
                  <Plus className="h-4 w-4" /> নতুন ধাপ
                </button>
              </div>
              <SaveBtn onClick={() => saveSection("process")} />
            </SectionCard>

            {/* PACKAGES SECTION */}
            <SectionCard title="প্যাকেজ সমূহ" open={openSections.includes("packages")} onToggle={() => toggleSection("packages")}>
              <div className="space-y-6">
                {(data.packages || []).map((pkg, i) => (
                  <div key={i} className="border rounded-lg p-5">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-lg font-semibold">প্যাকেজ #{i + 1}</h4>
                      <button onClick={() => removeItem("packages", i)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <Input label="নাম" value={pkg.name} onChange={v => updateItem("packages", i, "name", v)} />
                      <Input label="মূল্য" value={pkg.price} onChange={v => updateItem("packages", i, "price", v)} />
                      <Input label="সময়কাল" value={pkg.duration} onChange={v => updateItem("packages", i, "duration", v)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <Input label="বাটন লিংক" value={pkg.button_link} onChange={v => updateItem("packages", i, "button_link", v)} />
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={pkg.popular || false}
                            onChange={e => updateItem("packages", i, "popular", e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          জনপ্রিয় প্যাকেজ
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ফিচার সমূহ (প্রতি লাইনে একটি)</label>
                      <textarea
                        value={Array.isArray(pkg.features) ? pkg.features.join('\n') : ''}
                        onChange={e => updateItem("packages", i, "features", e.target.value.split('\n').filter(f => f.trim()))}
                        rows="4"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        placeholder="প্রতি লাইনে একটি ফিচার লিখুন"
                      />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem("packages", { name: "", price: "", duration: "", features: [], popular: false, button_link: "/contact" })} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-yellow-400 py-2 text-yellow-600 hover:bg-yellow-50">
                  <Plus className="h-4 w-4" /> নতুন প্যাকেজ
                </button>
              </div>
              <SaveBtn onClick={() => saveSection("packages")} />
            </SectionCard>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="মোট সাবমিশন" value={stats.total} icon={<Users className="h-6 w-6" />} />
                <StatCard title="আজ" value={stats.today} icon={<BarChart3 className="h-6 w-6" />} />
                <StatCard title="এই সপ্তাহ" value={stats.this_week} icon={<BarChart3 className="h-6 w-6" />} />
                <StatCard title="এই মাস" value={stats.this_month} icon={<BarChart3 className="h-6 w-6" />} />
              </div>
            )}

            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="সার্চ করুন (মোবাইল, লোকেশন, ইমেইল)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <button
                onClick={exportSubmissions}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" /> CSV এক্সপোর্ট
              </button>
            </div>

            {/* Submissions Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">বাজেট</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">মোবাইল</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">লোকেশন</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">দিন</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">যোগাযোগ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(submission.created_at).toLocaleDateString('bn-BD')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {submission.budget ? `$${submission.budget}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {submission.mobile || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {submission.location || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {submission.days || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {submission.submitted_by || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  কোনো সাবমিশন পাওয়া যায়নি
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable Components */
const SectionCard = ({ title, open, onToggle, children }) => (
  <div className="rounded-xl bg-white shadow-sm">
    <button onClick={onToggle} className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {open ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
    </button>
    {open && <div className="border-t border-gray-200 p-5">{children}</div>}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
    />
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 py-2.5 font-medium text-white hover:shadow-md"
  >
    <Save className="h-5 w-5" /> এই সেকশন সেভ করুন
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-yellow-600">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminFacebookBoosting;