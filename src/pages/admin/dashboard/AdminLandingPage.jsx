// src/pages/admin/dashboard/AdminLandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2, Check, X, Loader2 } from 'lucide-react';
import { landingPageService } from '../../../services/landingPageServices';

// Icon Picker Component (Remix Icons)
const IconPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const icons = [
    'target', 'zap', 'smartphone', 'search', 'palette', 'bar-chart-3',
    'film', 'circle', 'sparkles', 'message-circle', 'edit-3', 'link',
    'rocket', 'lightbulb', 'wrench', 'star', 'briefcase', 'trending-up',
    'trophy', 'thumbs-up', 'award', 'shield', 'globe', 'users'
  ];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full px-4 py-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition"
      >
        <span className="text-2xl">
          {value ? <i className={`ri-${value}`}></i> : 'question'}
        </span>
        <span className="text-gray-600">Click to pick icon</span>
      </button>

      {showPicker && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowPicker(false)} />
          <div className="absolute z-20 mt-2 p-4 bg-white border rounded-lg shadow-xl grid grid-cols-6 gap-3 max-h-80 overflow-y-auto">
            {icons.map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => {
                  onChange(icon);
                  setShowPicker(false);
                }}
                className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                  value === icon ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <i className={`ri-${icon} text-xl`}></i>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Dynamic Features Input
const DynamicFeatures = ({ features = [], onChange }) => {
  const addFeature = () => onChange([...features, '']);
  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    onChange(updated);
  };
  const removeFeature = (index) => {
    const updated = features.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Features</label>
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeFeature(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <X size={18} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addFeature}
        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        <Plus size={16} /> Add Feature
      </button>
    </div>
  );
};

const AdminLandingPage = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Data states
  const [hero, setHero] = useState({ title: '', description: '', cta_text: '' });
  const [features, setFeatures] = useState([]);
  const [elements, setElements] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [packages, setPackages] = useState([]);
  const [cta, setCta] = useState({ title: '', description: '', button_text: '' });

  // Edit mode
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        heroRes, featRes, elemRes, procRes, useRes, packRes, ctaRes
      ] = await Promise.all([
        landingPageService.getHero(),
        landingPageService.getFeatures(),
        landingPageService.getElements(),
        landingPageService.getProcessSteps(),
        landingPageService.getUseCases(),
        landingPageService.getPackages(),
        landingPageService.getCta()
      ]);

      setHero(heroRes || { title: '', description: '', cta_text: '' });
      setFeatures(featRes || []);
      setElements(elemRes || []);
      setProcessSteps(procRes || []);
      setUseCases(useRes || []);
      setPackages(packRes || []);
      setCta(ctaRes || { title: '', description: '', button_text: '' });
    } catch (err) {
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const startEdit = (type, item = null) => {
    setEditing({ type, item });
    setEditForm(item ? { ...item } : {});
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);

    try {
      let res;
      const { type, item } = editing;

      switch (type) {
        case 'hero':
          res = await landingPageService.updateHero(editForm);
          setHero(res);
          break;
        case 'feature':
          if (item?.id) {
            res = await landingPageService.updateFeature(item.id, editForm);
          } else {
            res = await landingPageService.createFeature(editForm);
          }
          setFeatures(prev => item?.id
            ? prev.map(f => f.id === item.id ? res : f)
            : [...prev, res]
          );
          break;
        case 'element':
          if (item?.id) {
            res = await landingPageService.updateElement(item.id, editForm);
          } else {
            res = await landingPageService.createElement(editForm);
          }
          setElements(prev => item?.id
            ? prev.map(e => e.id === item.id ? res : e)
            : [...prev, res]
          );
          break;
        case 'process':
          if (item?.id) {
            res = await landingPageService.updateProcessStep(item.id, editForm);
          } else {
            res = await landingPageService.createProcessStep(editForm);
          }
          setProcessSteps(prev => item?.id
            ? prev.map(p => p.id === item.id ? res : p)
            : [...prev, res]
          );
          break;
        case 'useCase':
          if (item?.id) {
            res = await landingPageService.updateUseCase(item.id, editForm);
          } else {
            res = await landingPageService.createUseCase(editForm);
          }
          setUseCases(prev => item?.id
            ? prev.map(u => u.id === item.id ? res : u)
            : [...prev, res]
          );
          break;
        case 'package':
          if (item?.id) {
            res = await landingPageService.updatePackage(item.id, editForm);
          } else {
            res = await landingPageService.createPackage(editForm);
          }
          setPackages(prev => item?.id
            ? prev.map(p => p.id === item.id ? res : p)
            : [...prev, res]
          );
          break;
        case 'cta':
          res = await landingPageService.updateCta(editForm);
          setCta(res);
          break;
      }

      showMessage('success', 'Saved successfully!');
      cancelEdit();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (type, id) => {
    if (!confirm('Delete this item?')) return;

    try {
      let service;
      switch (type) {
        case 'feature': service = landingPageService.deleteFeature; break;
        case 'element': service = landingPageService.deleteElement; break;
        case 'process': service = landingPageService.deleteProcessStep; break;
        case 'useCase': service = landingPageService.deleteUseCase; break;
        case 'package': service = landingPageService.deletePackage; break;
        default: return;
      }

      await service(id);
      fetchAllData();
      showMessage('success', 'Deleted!');
    } catch (err) {
      showMessage('error', 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Landing Page Admin</h1>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {['hero', 'features', 'elements', 'process', 'useCases', 'packages', 'cta'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {/* HERO */}
      {activeTab === 'hero' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Hero Section</h2>
            {!editing?.type && (
              <button onClick={() => startEdit('hero', hero)} className="text-blue-600 hover:underline">
                <Edit2 size={20} />
              </button>
            )}
          </div>

          {editing?.type === 'hero' ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={editForm.cta_text || ''}
                onChange={e => setEditForm({ ...editForm, cta_text: e.target.value })}
                placeholder="CTA Text"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-gray-700">
              <p><strong>Title:</strong> {hero.title}</p>
              <p><strong>Description:</strong> {hero.description}</p>
              <p><strong>CTA:</strong> {hero.cta_text}</p>
            </div>
          )}
        </div>
      )}

      {/* FEATURES */}
      {activeTab === 'features' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Features</h2>
            <button onClick={() => startEdit('feature')} className="text-blue-600 flex items-center gap-1">
              <Plus size={18} /> Add Feature
            </button>
          </div>

          {editing?.type === 'feature' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <IconPicker value={editForm.icon} onChange={icon => setEditForm({ ...editForm, icon })} />
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={editForm.order || ''}
                onChange={e => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                placeholder="Order"
                className="w-32 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {features.map(feature => (
              <div key={feature.id} className="bg-white p-4 rounded-lg border flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`ri-${feature.icon} text-2xl text-blue-600`}></i>
                    <h3 className="font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit('feature', feature)} className="p-1 text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteItem('feature', feature.id)} className="p-1 text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ELEMENTS */}
      {activeTab === 'elements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Elements</h2>
            <button onClick={() => startEdit('element')} className="text-blue-600 flex items-center gap-1">
              <Plus size={18} /> Add Element
            </button>
          </div>

          {editing?.type === 'element' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <IconPicker value={editForm.icon} onChange={icon => setEditForm({ ...editForm, icon })} />
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={editForm.order || ''}
                onChange={e => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                placeholder="Order"
                className="w-32 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {elements.map(el => (
              <div key={el.id} className="bg-white p-4 rounded-lg border text-center">
                <i className={`ri-${el.icon} text-4xl text-blue-600 mb-3`}></i>
                <h3 className="font-medium">{el.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{el.description}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <button onClick={() => startEdit('element', el)} className="text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteItem('element', el.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROCESS STEPS */}
      {activeTab === 'process' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Process Steps</h2>
            <button onClick={() => startEdit('process')} className="text-blue-600 flex items-center gap-1">
              <Plus size={18} /> Add Step
            </button>
          </div>

          {editing?.type === 'process' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <input
                type="text"
                value={editForm.step || ''}
                onChange={e => setEditForm({ ...editForm, step: e.target.value })}
                placeholder="Step (e.g., Step 1)"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={editForm.order || ''}
                onChange={e => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                placeholder="Order"
                className="w-32 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {processSteps.map(step => (
              <div key={step.id} className="bg-white p-4 rounded-lg border flex justify-between items-center">
                <div>
                  <span className="font-medium text-blue-600">{step.step}</span>
                  <span className="ml-3 font-semibold">{step.title}</span>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit('process', step)} className="text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteItem('process', step.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USE CASES */}
      {activeTab === 'useCases' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Use Cases</h2>
            <button onClick={() => startEdit('useCase')} className="text-blue-600 flex items-center gap-1">
              <Plus size={18} /> Add Use Case
            </button>
          </div>

          {editing?.type === 'useCase' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <IconPicker value={editForm.icon} onChange={icon => setEditForm({ ...editForm, icon })} />
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={editForm.order || ''}
                onChange={e => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                placeholder="Order"
                className="w-32 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map(uc => (
              <div key={uc.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                  <i className={`ri-${uc.icon} text-2xl text-green-600`}></i>
                  <h3 className="font-medium">{uc.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{uc.description}</p>
                <div className="flex justify-end gap-1 mt-3">
                  <button onClick={() => startEdit('useCase', uc)} className="text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteItem('useCase', uc.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Pricing Packages</h2>
            <button onClick={() => startEdit('package')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={18} /> Add Package
            </button>
          </div>

          {editing?.type === 'package' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <input
                type="text"
                value={editForm.name || ''}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Package Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editForm.price || ''}
                  onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                  placeholder="Price (e.g., ৳999)"
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={editForm.duration || ''}
                  onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                  placeholder="Duration (e.g., per month)"
                  className="px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Button Link Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Button Link (Optional)
                </label>
                <input
                  type="url"
                  value={editForm.button_link || ''}
                  onChange={e => setEditForm({ ...editForm, button_link: e.target.value })}
                  placeholder="https://example.com/order (leave empty for default)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If set, clicking "Order Now" will redirect to this URL
                </p>
              </div>

              <DynamicFeatures
                features={editForm.features || []}
                onChange={features => setEditForm({ ...editForm, features })}
              />

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editForm.popular || false}
                    onChange={e => setEditForm({ ...editForm, popular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Popular</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editForm.enabled || false}
                    onChange={e => setEditForm({ ...editForm, enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Enabled</span>
                </label>
                <input
                  type="number"
                  value={editForm.order || ''}
                  onChange={e => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                  placeholder="Order"
                  className="w-24 px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Package
                </button>
                <button onClick={cancelEdit} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative bg-white p-6 rounded-xl border-2 transition-all ${
                  pkg.popular ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-center mb-2">{pkg.name}</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  {pkg.duration && <span className="text-gray-600"> / {pkg.duration}</span>}
                </div>

                {/* Show button link if exists */}
                {pkg.button_link && (
                  <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                    <span className="font-medium text-blue-800">Link:</span>
                    <a 
                      href={pkg.button_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1 break-all"
                    >
                      {pkg.button_link}
                    </a>
                  </div>
                )}

                <ul className="space-y-2 mb-6">
                  {pkg.features?.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-green-600" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center gap-2">
                  <button onClick={() => startEdit('package', pkg)} className="text-blue-600">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteItem('package', pkg.id)} className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {activeTab === 'cta' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">CTA Section</h2>
            {!editing?.type && (
              <button onClick={() => startEdit('cta', cta)} className="text-blue-600 hover:underline">
                <Edit2 size={20} />
              </button>
            )}
          </div>

          {editing?.type === 'cta' ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editForm.title || ''}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                value={editForm.description || ''}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={editForm.button_text || ''}
                onChange={e => setEditForm({ ...editForm, button_text: e.target.value })}
                placeholder="Button Text"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Save
                </button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-gray-700">
              <p><strong>Title:</strong> {cta.title}</p>
              <p><strong>Description:</strong> {cta.description}</p>
              <p><strong>Button:</strong> {cta.button_text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminLandingPage;