import React from 'react';
import {
  GraduationCap, TrendingUp, Briefcase, Users, Globe, Award,
  DollarSign, CreditCard, CheckCircle, Star
} from 'lucide-react';
import IconLibrary from './IconLibrary';

// Hardcoded SVG icons (import them)
import {
  ExpertMentorIcon,
  CertificationIcon,
  BusinessGrowthIcon,
  PracticalTrainingIcon,
  CustomTrainingIcon,
  FreeConsultationIcon,
  LiveSessionPracticeIcon,
  ResultCertificateIcon,
} from '../servicesPage/businessTraining/Icons';

const BusinessTrainingIconSelector = ({ value, onChange, label, className = '' }) => {
  const iconCategories = [
    {
      name: 'বিজনেস ট্রেনিং আইকন',
      icons: [
        { name: 'ExpertMentorIcon', component: ExpertMentorIcon },
        { name: 'CertificationIcon', component: CertificationIcon },
        { name: 'BusinessGrowthIcon', component: BusinessGrowthIcon },
        { name: 'PracticalTrainingIcon', component: PracticalTrainingIcon },
        { name: 'CustomTrainingIcon', component: CustomTrainingIcon },
        { name: 'FreeConsultationIcon', component: FreeConsultationIcon },
        { name: 'LiveSessionPracticeIcon', component: LiveSessionPracticeIcon },
        { name: 'ResultCertificateIcon', component: ResultCertificateIcon },
      ]
    },
    {
      name: 'লুসাইড আইকন',
      icons: [
        { name: 'GraduationCap', component: GraduationCap },
        { name: 'TrendingUp', component: TrendingUp },
        { name: 'Briefcase', component: Briefcase },
        { name: 'Users', component: Users },
        { name: 'Globe', component: Globe },
        { name: 'Award', component: Award },
        { name: 'DollarSign', component: DollarSign },
        { name: 'CreditCard', component: CreditCard },
        { name: 'CheckCircle', component: CheckCircle },
        { name: 'Star', component: Star },
      ]
    }
  ];

  // Get IconLibrary icon list (you might need to adjust this based on your IconLibrary)
  const iconLibraryIcons = [
    'AcademicCap', 'Adjustments', 'Annotation', 'Archive', 'ArrowCircleRight',
    'BadgeCheck', 'Beaker', 'Bell', 'BookOpen', 'Calendar', 'ChartBar',
    'ChatAlt2', 'ClipboardCheck', 'CloudUpload', 'Code', 'Collection',
    'CreditCard', 'Cube', 'CursorClick', 'Database', 'DesktopComputer',
    'DeviceMobile', 'DocumentText', 'Download', 'EmojiHappy', 'Exclamation',
    'ExternalLink', 'Eye', 'Filter', 'Fire', 'Folder', 'Gift', 'GlobeAlt',
    'Hand', 'Hashtag', 'Heart', 'Home', 'Identification', 'Inbox',
    'Key', 'LightBulb', 'Link', 'LockClosed', 'Mail', 'Map',
    'Megaphone', 'Microphone', 'Moon', 'MusicNote', 'Newspaper',
    'OfficeBuilding', 'PaperAirplane', 'Pencil', 'Phone', 'Photograph',
    'Play', 'PresentationChartBar', 'Puzzle', 'Qrcode', 'ReceiptRefund',
    'RocketLaunch', 'Scale', 'Search', 'Server', 'ShieldCheck',
    'ShoppingBag', 'Sparkles', 'Star', 'Support', 'Tag', 'Template',
    'ThumbUp', 'Ticket', 'Tool', 'Truck', 'UserGroup', 'VideoCamera',
    'ViewGrid', 'Wallet', 'Wifi', 'ZoomIn'
  ];

  return (
    <div className={`${className}`}>
      {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
      
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
      >
        <option value="">আইকন নির্বাচন করুন</option>
        
        {/* Hardcoded SVG Icons */}
        <optgroup label="বিজনেস ট্রেনিং আইকন">
          {iconCategories[0].icons.map((icon) => (
            <option key={icon.name} value={icon.name}>
              {icon.name}
            </option>
          ))}
        </optgroup>
        
        {/* Lucide Icons */}
        <optgroup label="লুসাইড আইকন">
          {iconCategories[1].icons.map((icon) => (
            <option key={icon.name} value={icon.name}>
              {icon.name}
            </option>
          ))}
        </optgroup>
        
        {/* IconLibrary Icons */}
        <optgroup label="আইকন লাইব্রেরি">
          {iconLibraryIcons.map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </optgroup>
      </select>
      
      {/* Preview */}
      {value && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">প্রিভিউ:</span>
          <div className="w-6 h-6 flex items-center justify-center">
            {(() => {
              // Check if it's a hardcoded or Lucide icon
              const allIcons = [...iconCategories[0].icons, ...iconCategories[1].icons];
              const foundIcon = allIcons.find(icon => icon.name === value);
              
              if (foundIcon) {
                const IconComponent = foundIcon.component;
                return <IconComponent className="w-5 h-5 text-green-600" />;
              }
              
              // Otherwise it's from IconLibrary
              return <IconLibrary name={value} size={20} className="text-green-600" />;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTrainingIconSelector;