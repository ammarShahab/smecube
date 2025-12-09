// src/components/DynamicIcon.jsx
import React from 'react';
import {
  Target, Zap, Smartphone, Search, Palette, BarChart3,
  Film, CircleDot, Sparkles, MessageSquare, FileText, Link2,
  Rocket, Phone, Users, Settings, Globe, Mail
} from 'lucide-react';

const iconMap = {
  // Features
  'target': Target,
  'zap': Zap,
  'smartphone': Smartphone,
  'search': Search,
  'palette': Palette,
  'bar-chart-3': BarChart3,

  // Elements
  'film': Film,
  'circle-dot': CircleDot,
  'sparkles': Sparkles,
  'message-square': MessageSquare,
  'file-text': FileText,
  'link2': Link2,

  // Add more as needed
  'rocket': Rocket,
  'phone': Phone,
  'users': Users,
  'settings': Settings,
  'globe': Globe,
  'mail': Mail,
};

const DynamicIcon = ({ name, size = 32, className = "" }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return <div className={className}>?</div>;
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;