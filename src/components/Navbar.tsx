import React, { useState } from 'react';
import { Menu, Search, Bell, Shield, ChevronRight, Check } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onOpenMobileSidebar: () => void;
  onNavigateToPredict: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onNavigateToPredict,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'predict':
        return 'Loan Risk Assessment Workspace';
      case 'history':
        return 'Prediction History';
      case 'analytics':
        return 'Model Performance & Analytics';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'Dashboard';
    }
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'predict':
        return 'Predict Loan';
      case 'history':
        return 'Prediction History';
      case 'analytics':
        return 'Model Analytics';
      case 'settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'High Risk Alert',
      desc: 'Loan #LG-1023 evaluated with 80.49% Charged Off probability.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Model Audit Completed',
      desc: 'ROC-AUC verified at 0.714 across 12,482 historical test samples.',
      time: '1h ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1E293B] px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile menu toggle & Title / Breadcrumbs */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>LoanGuard AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-medium">{getBreadcrumb()}</span>
          </div>
          <h2 className="text-sm lg:text-base font-bold text-white tracking-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right: Search, Actions, Notifications & Avatar */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search prediction #, borrower..."
            className="w-full bg-[#131B2E] text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 border border-[#1E293B] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-all"
          />
        </div>

        {/* Quick CTA */}
        {activeTab !== 'predict' && (
          <button
            onClick={onNavigateToPredict}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all glow-blue"
          >
            <Shield className="w-4 h-4" />
            <span>Analyze Loan</span>
          </button>
        )}

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white bg-[#131B2E] border border-[#1E293B] hover:border-slate-700 transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0B0F19]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#131B2E] border border-[#1E293B] rounded-2xl shadow-2xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200">System Notifications</span>
                <span className="text-[10px] text-blue-400 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border text-xs transition-colors ${
                      n.unread
                        ? 'bg-blue-600/10 border-blue-500/30 text-slate-200'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-start font-semibold text-white">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-semibold text-xs">
            <Check className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
