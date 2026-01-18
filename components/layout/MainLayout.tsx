'use client'

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StrategySettingsModal from "../StrategySettingsModal";

type Props = { children: React.ReactNode };

const MainLayout: React.FC<Props> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar 
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 pt-14 lg:pl-56 min-h-screen bg-zinc-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Settings Modal */}
      <StrategySettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
