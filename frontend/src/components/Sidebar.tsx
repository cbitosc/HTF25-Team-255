'use client';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null },
    { id: 'projects', label: 'Projects', icon: '📁', badge: '3' },
    { id: 'tasks', label: 'Tasks', icon: '✅', badge: '12' },
    { id: 'calendar', label: 'Calendar', icon: '📅', badge: null },
    { id: 'meetings', label: 'Meetings', icon: '🎥', badge: '2' },
    { id: 'reports', label: 'Reports', icon: '📈', badge: null },
    { id: 'integrations', label: 'Integrations', icon: '🔌', badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen sticky top-16">
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <div className="px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Workspaces</p>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏢</span>
                </div>
                <span>Main Workspace</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <span>Team Alpha</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
