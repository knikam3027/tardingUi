'use client'

import React, { useState } from "react";
import { BarChart3, TrendingUp, Settings, User, ShieldX } from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onSettingsClick: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onSettingsClick, onClose }) => {
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [showKillSwitchConfirm, setShowKillSwitchConfirm] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, href: "/" },
    { name: "Trades", icon: TrendingUp, href: "/trades" },
  ];

  const handleMenuClick = (callback?: () => void) => {
    onClose(); // Close mobile menu
    callback?.(); // Execute additional callback if provided
  };

  const handleKillSwitch = () => {
    if (killSwitchActive) {
      // Already active, can't disable until next day
      return;
    }
    setShowKillSwitchConfirm(true);
  };

  const confirmKillSwitch = () => {
    setKillSwitchActive(true);
    setShowKillSwitchConfirm(false);
    console.log('Kill switch activated - Trading disabled until next day');
  };

  return (
    <aside className={`
      fixed top-14 left-0 bottom-0 w-56 bg-white/95 border-r border-gray-200 z-40 transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <nav className="h-full overflow-auto px-4 py-6">
        {/* User Account Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Yuvraj</div>
              <div className="text-sm text-gray-500">Premium User</div>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Account ID:</span>
              <span className="font-mono text-gray-900">#TD2024001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-semibold ${killSwitchActive ? 'text-red-600' : 'text-green-600'}`}>
                {killSwitchActive ? 'DISABLED' : 'ACTIVE'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Login:</span>
              <span className="text-gray-900">Today 9:15 AM</span>
            </div>
          </div>
        </div>

        {/* Kill Switch */}
        <div className="mb-6">
          {!killSwitchActive ? (
            // Show Kill Switch when trading is active
            <button
              onClick={handleKillSwitch}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <ShieldX className="w-5 h-5 text-white" />
              <span className="font-semibold">KILL SWITCH</span>
            </button>
          ) : (
            // Show both disabled status and enable button when trading is disabled
            <div className="space-y-2">
              <div className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-red-500 bg-red-50 text-red-700">
                <ShieldX className="w-5 h-5 text-red-500" />
                <span className="font-semibold">TRADING DISABLED</span>
              </div>
              <button
                onClick={() => {
                  setKillSwitchActive(false);
                  console.log('Trading enabled');
                }}
                className="w-full p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Enable Trading
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2 text-center">
            {killSwitchActive 
              ? 'Trading disabled until next day' 
              : 'Click to disable trading immediately'
            }
          </p>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => handleMenuClick()}
                  className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
          
          {/* Settings as sidebar item for mobile */}
          <li>
            <button
              onClick={() => handleMenuClick(onSettingsClick)}
              className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Kill Switch Confirmation Modal */}
      {showKillSwitchConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ShieldX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Activate Kill Switch</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> Activating the kill switch will immediately disable all trading functionality until tomorrow. This action cannot be reversed today.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowKillSwitchConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmKillSwitch}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-semibold"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
