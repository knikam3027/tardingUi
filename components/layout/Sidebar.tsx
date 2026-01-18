'use client'

import React from "react";
import { BarChart3, TrendingUp, Settings } from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onSettingsClick: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onSettingsClick, onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: BarChart3, href: "/" },
    { name: "Trades", icon: TrendingUp, href: "/trades" },
  ];

  const handleMenuClick = (callback?: () => void) => {
    onClose(); // Close mobile menu
    callback?.(); // Execute additional callback if provided
  };

  return (
    <aside className={`
      fixed top-14 left-0 bottom-0 w-56 bg-white/95 border-r border-gray-200 z-40 transition-transform duration-300
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <nav className="h-full overflow-auto px-4 py-6">
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
    </aside>
  );
};

export default Sidebar;
