// src/components/IconPicker.jsx
import React, { useState } from 'react';
import {
  Target, Zap, Smartphone, Search, Palette, BarChart3,
  Film, CircleDot, Sparkles, MessageSquare, FileText, Link2,
  Rocket, CheckCircle2
} from 'lucide-react';

const svgIcons = [
  { name: 'target', Component: Target },
  { name: 'zap', Component: Zap },
  { name: 'smartphone', Component: Smartphone },
  { name: 'search', Component: Search },
  { name: 'palette', Component: Palette },
  { name: 'bar-chart-3', Component: BarChart3 },
  { name: 'film', Component: Film },
  { name: 'circle-dot', Component: CircleDot },
  { name: 'sparkles', Component: Sparkles },
  { name: 'message-square', Component: MessageSquare },
  { name: 'file-text', Component: FileText },
  { name: 'link2', Component: Link2 },
  { name: 'rocket', Component: Rocket },
  { name: 'check-circle-2', Component: CheckCircle2 },
];

const emojiIcons = [
  'target', 'zap', 'smartphone', 'search', 'palette', 'chart', 
  'film', 'dot', 'sparkles', 'chat', 'document', 'link',
  'rocket', 'lightning', 'settings', 'star', 'trophy', 'thumbs-up'
];

const IconPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('svg');

  // Detect if current value is emoji or SVG name
  const isEmoji = value && !svgIcons.find(i => i.name === value) && /[\u{1F300}-\u{1F9FF}]/u.test(value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">Icon</label>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full px-4 py-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
      >
        <span className="text-3xl">
          {isEmoji ? value : 
           svgIcons.find(i => i.name === value)?.Component ? 
           React.createElement(svgIcons.find(i => i.name === value).Component, { size: 28 }) : 
           '?'}
        </span>
        <span className="text-gray-700 truncate">{value || 'Choose icon'}</span>
      </button>

      {showPicker && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowPicker(false)} />
          <div className="absolute z-20 mt-2 w-80 bg-white border rounded-lg shadow-xl p-3">
            {/* Tabs */}
            <div className="flex border-b mb-3">
              <button
                onClick={() => setActiveTab('svg')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'svg' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                SVG Icons
              </button>
              <button
                onClick={() => setActiveTab('emoji')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'emoji' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                Emoji
              </button>
            </div>

            {/* SVG Grid */}
            {activeTab === 'svg' && (
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {svgIcons.map(({ name, Component }) => (
                  <button
                    key={name}
                    onClick={() => {
                      onChange(name);
                      setShowPicker(false);
                    }}
                    className={`p-2 rounded border transition ${value === name ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    <Component size={24} />
                  </button>
                ))}
              </div>
            )}

            {/* Emoji Grid */}
            {activeTab === 'emoji' && (
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto text-2xl">
                {emojiIcons.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onChange(emoji);
                      setShowPicker(false);
                    }}
                    className={`p-2 rounded border transition hover:bg-gray-50 ${value === emoji ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default IconPicker;