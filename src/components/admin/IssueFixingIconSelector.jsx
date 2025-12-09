import React from 'react';
import {
  Wrench, CheckCircle, Star, Award, Code, Bug, Server, Database,
  Smartphone, Globe, Palette, TrendingUp, ShoppingCart, Zap,
  HelpCircle, Calendar, Headphones, Shield, Gift, ChevronRight
} from 'lucide-react';
import IconLibrary from './IconLibrary';

// Import your custom SVG icons
import {
  DiagnosisAnalysisIcon,
  FastFixTestingIcon,
  LiveWarrantyIcon,
  ProblemReportIcon,
  QuickFixIcon,
  GuaranteedIcon,
  SecureIcon,
  SupportIcon,
} from '../servicesPage/issueFixing/Icons';

const IssueFixingIconSelector = ({ value, onChange, label, className = '' }) => {
  const iconCategories = [
    {
      name: 'ইস্যু ফিক্সিং আইকন',
      icons: [
        { name: 'ProblemReportIcon', component: ProblemReportIcon },
        { name: 'DiagnosisAnalysisIcon', component: DiagnosisAnalysisIcon },
        { name: 'FastFixTestingIcon', component: FastFixTestingIcon },
        { name: 'LiveWarrantyIcon', component: LiveWarrantyIcon },
        { name: 'QuickFixIcon', component: QuickFixIcon },
        { name: 'GuaranteedIcon', component: GuaranteedIcon },
        { name: 'SecureIcon', component: SecureIcon },
        { name: 'SupportIcon', component: SupportIcon },
      ]
    },
    {
      name: 'লুসাইড আইকন',
      icons: [
        { name: 'Wrench', component: Wrench },
        { name: 'CheckCircle', component: CheckCircle },
        { name: 'Code', component: Code },
        { name: 'Bug', component: Bug },
        { name: 'Server', component: Server },
        { name: 'Database', component: Database },
        { name: 'Globe', component: Globe },
        { name: 'Palette', component: Palette },
        { name: 'TrendingUp', component: TrendingUp },
        { name: 'Zap', component: Zap },
        { name: 'Shield', component: Shield },
        { name: 'Gift', component: Gift },
        { name: 'Calendar', component: Calendar },
      ]
    }
  ];

  // Get IconLibrary icon list
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
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
      >
        <option value="">আইকন নির্বাচন করুন</option>
        
        {/* Custom SVG Icons */}
        <optgroup label="ইস্যু ফিক্সিং আইকন">
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
              // Check all categories for the icon
              const allIcons = [...iconCategories[0].icons, ...iconCategories[1].icons];
              const foundIcon = allIcons.find(icon => icon.name === value);
              
              if (foundIcon) {
                const IconComponent = foundIcon.component;
                return <IconComponent className="w-5 h-5 text-orange-600" />;
              }
              
              // Otherwise it's from IconLibrary
              return <IconLibrary name={value.toLowerCase()} size={20} className="text-orange-600" />;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueFixingIconSelector;