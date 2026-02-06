'use client'

import React, { useState } from "react";
import { Menu, Settings, X, User } from "lucide-react";
import AITradingChat from '../AITradingChat';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  avatar?: string;
}

interface NavbarProps {
  onSettingsClick: () => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSettingsClick, 
  onMobileMenuToggle, 
  isMobileMenuOpen,
  user,
  onLogin,
  onLogout
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        
        {/* Left side - Logo and Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">Trading Platform</span>
          </div>
        </div>

        {/* Center - Market Status */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium">Market Open</span>
          </div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-600">
            NIFTY: <span className="font-semibold text-green-600">25,850 (+0.8%)</span>
          </div>
        </div>

        {/* Right side - User & Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Trading Settings"
          >
            <Settings size={18} />
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{user.plan} Plan</div>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSettingsClick();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Settings size={16} className="mr-3" />
                      Trading Settings
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowAIChat(true);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      🤖
                      <span className="ml-3">AI Trading Assistant</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <User size={16} className="mr-3" />
                      Your Profile
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                  
                  {/* Click outside to close dropdown */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserDropdown(false)}
                  />
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* AI Trading Chat Modal */}
      <AITradingChat 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        currentData={{
          nifty: 25850,
          vix: 12.5
        }}
      />
    </header>
  );
};

export default Navbar;
