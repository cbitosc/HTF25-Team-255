'use client';

export default function DashboardStats() {
  const stats = [
    {
      label: 'Total Projects',
      value: '3',
      change: '+2 this month',
      icon: '📁',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Active Tasks',
      value: '35',
      change: '12 completed',
      icon: '✅',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Upcoming Meetings',
      value: '5',
      change: 'Today: 2',
      icon: '📅',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Team Members',
      value: '8',
      change: '+1 this week',
      icon: '👥',
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
            <div className={`${stat.bgColor} ${stat.textColor} p-3 rounded-lg`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
