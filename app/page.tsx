'use client'

import { useState, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StrikePricesTable from "@/components/StrikePricesTable";
import AccountSummary from "@/components/AccountSummary";
import MobileTradingDashboard from "@/components/MobileTradingDashboard";
import TradingHistory from "@/components/TradingHistory";
import TradingChart from "@/components/TradingChart";

export default function Home() {
  const [leftWidth, setLeftWidth] = useState(50);
  const [tableHeight, setTableHeight] = useState(500);
  const [isResizable, setIsResizable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeView, setActiveView] = useState<'tables' | 'chart'>('tables');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isResizable) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isResizable || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
    
    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
      setLeftWidth(Math.round(newLeftWidth));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <MainLayout>
      <div 
        className="bg-[#0b1220] min-h-screen text-white p-2 md:p-4 select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        
        {/* Header Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-200 flex items-center gap-2">
              📈 Trading Dashboard
              <span className="text-xs bg-green-600 px-2 py-1 rounded-full">LIVE</span>
            </h1>
            
            {/* View Switcher */}
            <div className="hidden lg:flex gap-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveView('tables')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'tables'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📋 Tables
              </button>
              <button
                onClick={() => setActiveView('chart')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeView === 'chart'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📈 Charts
              </button>
            </div>
          </div>
          
          {/* Desktop Controls */}
          <div className="hidden lg:flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setIsResizable(!isResizable)}
              className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                isResizable ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'
              }`}
            >
              🔧 {isResizable ? 'Lock Layout' : 'Unlock Layout'}
            </button>
            
            {isResizable && (
              <>
                <div className="flex items-center gap-2 text-xs">
                  <label className="text-gray-400">Width:</label>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={leftWidth}
                    onChange={(e) => setLeftWidth(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-gray-300 w-8">{leftWidth}%</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <label className="text-gray-400">Height:</label>
                  <input
                    type="range"
                    min="300"
                    max="800"
                    value={tableHeight}
                    onChange={(e) => setTableHeight(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-gray-300 w-12">{tableHeight}px</span>
                </div>
              </>
            )}

            <div className="flex gap-1">
              <button
                onClick={() => { setLeftWidth(50); setTableHeight(500); }}
                className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dashboard Component */}
        <MobileTradingDashboard />

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {activeView === 'tables' ? (
            <>
              <div 
                ref={containerRef}
                className="flex gap-1 transition-all duration-300 relative"
              >
                <div 
                  className="transition-all duration-300 overflow-hidden"
                  style={{ 
                    width: `${leftWidth}%`,
                    height: `${tableHeight}px`
                  }}
                >
                  <StrikePricesTable className="h-full" />
                </div>
                
                {/* Resizer Handle */}
                {isResizable && (
                  <div
                    onMouseDown={handleMouseDown}
                    className={`w-1 bg-gray-600 hover:bg-blue-500 cursor-col-resize transition-colors z-10 ${
                      isDragging ? 'bg-blue-500' : ''
                    }`}
                    title="Drag to resize"
                  />
                )}
                
                <div 
                  className="transition-all duration-300 overflow-hidden"
                  style={{ 
                    width: `${100 - leftWidth}%`,
                    height: `${tableHeight}px`
                  }}
                >
                  <AccountSummary className="h-full" />
                </div>
              </div>

              {/* Trading History Section */}
              <div className="mt-4">
                <TradingHistory />
              </div>
            </>
          ) : (
            /* Chart View */
            <div className="space-y-4">
              <div style={{ height: `${tableHeight + 100}px` }}>
                <TradingChart className="h-full" />
              </div>
              
              {/* Chart-specific controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TradingHistory />
                <div className="bg-[#111827] border border-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    📊 Market Analysis
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trend:</span>
                      <span className="text-green-400 font-semibold">BULLISH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Support:</span>
                      <span className="text-blue-400 font-semibold">25,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resistance:</span>
                      <span className="text-red-400 font-semibold">26,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volatility:</span>
                      <span className="text-orange-400 font-semibold">MEDIUM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Auto Action Buttons - Desktop */}
        <div className="hidden lg:flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            🤖 Auto Buy
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            🤖 Auto Sell
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            ⚡ Square Off All
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            🔄 Refresh Data
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            📊 Analytics
          </button>
        </div>

        {/* Status Bar - Desktop */}
        <div className="hidden lg:flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800 mt-2">
          <div className="flex gap-4">
            <span>📅 {new Date().toLocaleDateString()}</span>
            <span>🕐 Last Updated: {new Date().toLocaleTimeString()}</span>
            <span className="text-green-400">🟢 Connected</span>
          </div>
          <div className="flex gap-4">
            <span>NIFTY: 25,850 (+0.8%)</span>
            <span>BANK NIFTY: 53,420 (-0.3%)</span>
            <span>VIX: 14.2</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
