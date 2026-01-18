import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center">
        <span className="text-lg font-semibold text-gray-800">Trading Platform</span>
      </div>
    </header>
  );
};

export default Navbar;
