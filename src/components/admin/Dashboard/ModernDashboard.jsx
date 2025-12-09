import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data with realistic numbers
const monthlyData = [
  { month: 'Jan', revenue: 12500, users: 340, orders: 198 },
  { month: 'Feb', revenue: 15800, users: 420, orders: 242 },
  { month: 'Mar', revenue: 18200, users: 490, orders: 328 },
  { month: 'Apr', revenue: 22400, users: 610, orders: 389 },
  { month: 'May', revenue: 28100, users: 720, orders: 434 },
  { month: 'Jun', revenue: 34500, users: 830, orders: 498 },
  { month: 'Jul', revenue: 38900, users: 890, orders: 567 }
];

const trafficSources = [
  { name: 'Direct', value: 4200, color: '#8b5cf6' },
  { name: 'Social', value: 3800, color: '#ec4899' },
  { name: 'Referral', value: 2900, color: '#f59e0b' },
  { name: 'Organic', value: 5100, color: '#10b981' }
];

const recentActivity = [
  { id: 1, action: 'New order placed', user: 'John Doe', time: '2 min ago', type: 'order', amount: '$250' },
  { id: 2, action: 'User registered', user: 'Jane Smith', time: '15 min ago', type: 'user' },
  { id: 3, action: 'Payment received', user: 'Mike Johnson', time: '1 hour ago', type: 'payment', amount: '$1,200' },
  { id: 4, action: 'Product review added', user: 'Sarah Williams', time: '2 hours ago', type: 'review' },
  { id: 5, action: 'Support ticket created', user: 'Tom Brown', time: '3 hours ago', type: 'support' },
  { id: 6, action: 'New order placed', user: 'Emily Davis', time: '4 hours ago', type: 'order', amount: '$450' },
  { id: 7, action: 'Payment received', user: 'Chris Wilson', time: '5 hours ago', type: 'payment', amount: '$890' },
  { id: 8, action: 'User registered', user: 'Alex Martinez', time: '6 hours ago', type: 'user' }
];

const topProducts = [
  { name: 'Premium Plan', sales: 234, revenue: 23400, growth: 12.5 },
  { name: 'Standard Plan', sales: 189, revenue: 18900, growth: 8.3 },
  { name: 'Basic Plan', sales: 156, revenue: 7800, growth: -3.2 },
  { name: 'Enterprise Plan', sales: 45, revenue: 22500, growth: 25.6 }
];

// SVG Icons
const DollarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ActivityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const TrendingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ArrowUpIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const ArrowDownIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// Stat Card Component - Smaller and center aligned
const StatCard = ({ title, value, change, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group h-full relative">
    {/* Icon in corner */}
    <div className="absolute top-2 right-2">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon />
      </div>
    </div>
    
    {/* Center aligned content */}
    <div className="text-center pt-2 pr-10">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mb-2">{value}</h3>
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50' : 'bg-red-50'}`}>
        {trend === 'up' ? <ArrowUpIcon /> : <ArrowDownIcon />}
        <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          {change}%
        </span>
      </div>
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, action, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${className}`}>
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {action && (
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreIcon />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const getIconBg = (type) => {
    switch (type) {
      case 'order': return 'from-blue-500 to-blue-600';
      case 'user': return 'from-purple-500 to-purple-600';
      case 'payment': return 'from-emerald-500 to-emerald-600';
      case 'review': return 'from-amber-500 to-amber-600';
      case 'support': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order': return '🛒';
      case 'user': return '👤';
      case 'payment': return '💰';
      case 'review': return '⭐';
      case 'support': return '💬';
      default: return '📌';
    }
  };

  return (
    <div className="flex items-start gap-2.5 p-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${getIconBg(activity.type)} flex items-center justify-center text-white text-base flex-shrink-0 group-hover:scale-110 transition-transform`}>
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 mb-0.5 truncate">{activity.action}</p>
        <p className="text-xs text-gray-500 truncate">{activity.user}</p>
        {activity.amount && (
          <p className="text-xs font-bold text-emerald-600 mt-0.5">{activity.amount}</p>
        )}
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
    </div>
  );
};

// Product Item Component
const ProductItem = ({ product }) => (
  <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-bold text-gray-900 mb-0.5 truncate">{product.name}</h4>
      <p className="text-xs text-gray-500">{product.sales} sales</p>
    </div>
    <div className="text-right flex-shrink-0 ml-3">
      <p className="text-sm font-black text-gray-900">${(product.revenue/1000).toFixed(1)}K</p>
      <div className="flex items-center justify-end gap-0.5 mt-0.5">
        {product.growth > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
        <span className={`text-xs font-bold ${product.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          {Math.abs(product.growth)}%
        </span>
      </div>
    </div>
  </div>
);

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Main Dashboard Component
const ModernDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Analytics Dashboard</h1>
            <p className="text-xs text-gray-600">Real-time insights and performance metrics</p>
          </div>

          {/* Stats Grid - Smaller boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <StatCard
              title="Total Revenue"
              value="$45.2K"
              change={12.5}
              trend="up"
              icon={DollarIcon}
              color="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            />
            <StatCard
              title="Total Users"
              value="2,345"
              change={8.2}
              trend="up"
              icon={UsersIcon}
              color="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            />
            <StatCard
              title="Active Orders"
              value="1,234"
              change={3.1}
              trend="down"
              icon={ActivityIcon}
              color="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
            />
            <StatCard
              title="Growth Rate"
              value="23.5%"
              change={5.7}
              trend="up"
              icon={TrendingIcon}
              color="bg-gradient-to-br from-pink-500 to-pink-600 text-white"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Revenue Chart with numbers */}
            <ChartCard title="Revenue Overview" action>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    name="Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Users & Orders Chart with numbers */}
            <ChartCard title="Users & Orders Trend" action>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Users"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#ec4899" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Traffic Sources */}
            <ChartCard title="Traffic Sources" action>
              <div className="flex flex-col h-full">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {trafficSources.map((source) => (
                    <div key={source.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }}></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-gray-900 block truncate">{source.name}</span>
                        <span className="text-xs text-gray-500">{source.value.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            {/* Top Products */}
            <ChartCard title="Top Products" action>
              <div className="space-y-1.5">
                {topProducts.map((product, index) => (
                  <ProductItem key={index} product={product} />
                ))}
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <div className="hidden xl:block w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto h-screen sticky top-0">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-0.5">Recent Activity</h2>
            <p className="text-xs text-gray-500">Latest updates</p>
          </div>
          <div className="space-y-1.5">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Activity Section */}
      <div className="xl:hidden p-4 sm:p-5 lg:p-6">
        <ChartCard title="Recent Activity" action>
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default ModernDashboard;