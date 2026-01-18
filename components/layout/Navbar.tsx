'use client'

import React from "react";
import { Menu, Settings, X } from "lucide-react";

interface NavbarProps {
  onSettingsClick: () => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSettingsClick, onMobileMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left side - Logo and Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-lg font-semibold text-gray-800">Trading Platform</span>
        </div>

        {/* Right side - Settings Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSettingsClick}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Settings size={16} className="mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
