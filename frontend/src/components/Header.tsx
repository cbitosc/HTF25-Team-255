'use client';

interface HeaderProps {
  user: any;
  backendStatus: string;
  onLogout: () => void;
}

export default function Header({ user, backendStatus, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Nexus
              </h1>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {backendStatus}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-800 relative">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.firstName?.[0] || 'U'}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">{user?.firstName || 'User'} {user?.lastName || ''}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="ml-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
