'use client';

import { useState, useEffect } from 'react';
import { authApi, healthApi, type RegisterData, type LoginData } from '@/lib/api';

// Import components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardStats from '@/components/DashboardStats';
import Calendar from '@/components/Calendar';
import ProjectsList from '@/components/ProjectsList';
import TaskBoard from '@/components/TaskBoard';
import MeetingsPanel from '@/components/MeetingsPanel';
import WeeklyReport from '@/components/WeeklyReport';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeView, setActiveView] = useState<string>('dashboard');

  useEffect(() => {
    checkBackend();
    const token = localStorage.getItem('token');
    if (token) {
      setShowDashboard(true);
    }
  }, []);

  const checkBackend = async () => {
    try {
      const health = await healthApi.check();
      setBackendStatus(health.status === 'ok' ? '🟢 Connected' : '🟡 Degraded');
    } catch (error) {
      setBackendStatus('🔴 Offline');
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await authApi.register(data);
      setMessage({ type: 'success', text: `Welcome ${response.user.firstName}! Registration successful!` });
      setUser(response.user);
      localStorage.setItem('token', response.accessToken);
      setTimeout(() => setShowDashboard(true), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Registration failed. Email may already exist.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await authApi.login(data);
      setMessage({ type: 'success', text: `Welcome back ${response.user.firstName}!` });
      setUser(response.user);
      localStorage.setItem('token', response.accessToken);
      setTimeout(() => setShowDashboard(true), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Login failed. Check your credentials.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
    localStorage.removeItem('token');
    setMessage({ type: 'success', text: 'Logged out successfully!' });
  };

  // Show authentication form
  if (!showDashboard) {
    return (
      <AuthForm
        onRegister={handleRegister}
        onLogin={handleLogin}
        loading={loading}
        message={message}
        backendStatus={backendStatus}
      />
    );
  }

  // Show dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} backendStatus={backendStatus} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-8 max-w-[1600px]">
          {activeView === 'dashboard' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back, {user?.firstName || 'User'}! Here's what's happening.</p>
              </div>

              <DashboardStats />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-8">
                  <ProjectsList />
                  <TaskBoard />
                </div>

                {/* Right Sidebar - 1 column */}
                <div className="space-y-8">
                  <Calendar />
                  <MeetingsPanel />
                  <WeeklyReport />
                </div>
              </div>
            </>
          )}

          {activeView === 'projects' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
                <p className="text-gray-600">Manage all your projects in one place</p>
              </div>
              <ProjectsList />
            </>
          )}

          {activeView === 'tasks' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Tasks</h1>
                <p className="text-gray-600">Track and manage your tasks</p>
              </div>
              <TaskBoard />
            </>
          )}

          {activeView === 'calendar' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendar</h1>
                <p className="text-gray-600">View and schedule events</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Calendar />
                <MeetingsPanel />
              </div>
            </>
          )}

          {activeView === 'meetings' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Meetings</h1>
                <p className="text-gray-600">Your scheduled meetings and calls</p>
              </div>
              <MeetingsPanel />
            </>
          )}

          {activeView === 'reports' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
                <p className="text-gray-600">Track your progress and performance</p>
              </div>
              <WeeklyReport />
            </>
          )}

          {activeView === 'integrations' && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Integrations</h1>
                <p className="text-gray-600">Connect with your favorite tools</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'GitHub', icon: '📂', status: 'connected', color: 'green' },
                    { name: 'Google Docs', icon: '📄', status: 'connected', color: 'green' },
                    { name: 'Slack', icon: '💬', status: 'available', color: 'gray' },
                    { name: 'Figma', icon: '🎨', status: 'available', color: 'gray' },
                    { name: 'Jira', icon: '📊', status: 'available', color: 'gray' },
                    { name: 'Trello', icon: '📋', status: 'available', color: 'gray' },
                  ].map((integration, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">{integration.icon}</span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            integration.status === 'connected'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {integration.status === 'connected' ? '✓ Connected' : 'Connect'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                      <p className="text-sm text-gray-600">
                        {integration.status === 'connected'
                          ? 'Successfully integrated'
                          : 'Click to integrate'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
