'use client'

import { useState, useRef, useEffect } from "react";
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
  const [engineRunning, setEngineRunning] = useState(false);
  const [holdMode, setHoldMode] = useState(false);
  const [showQTPPopup, setShowQTPPopup] = useState(false);
  const [qtpIndex, setQTPIndex] = useState('NIFTY');
  const [qtpDays, setQTPDays] = useState('5');
  const [qtpStrikes, setQTPStrikes] = useState({
    S1: false, S2: true, S3: true, S4: true, S5: false
  });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleEngineToggle = () => {
    setEngineRunning(!engineRunning);
    if (engineRunning) {
      console.log('Engine stopped - booking all trades');
    } else {
      console.log('Engine started');
    }
  };

  const handleSquareOffAll = () => {
    console.log('Square off all positions');
  };

  const handleQTPAction = (action: 'LE' | 'LX' | 'SE' | 'SX') => {
    console.log(`QTP ${action} for ${qtpIndex} with selected strikes`);
    setShowQTPPopup(false);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

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
          {/* Engine Control */}
          <button 
            onClick={handleEngineToggle}
            className={`px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
              engineRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {engineRunning ? '⏹️ Stop Engine' : '▶️ Start Engine'}
          </button>

          {/* Square Off All */}
          <button 
            onClick={handleSquareOffAll}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm transition-colors flex items-center gap-2"
          >
            ⚡ Square Off All
          </button>

          {/* Hold Checkbox */}
          <label className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded text-sm">
            <input 
              type="checkbox" 
              checked={holdMode}
              onChange={(e) => setHoldMode(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
            />
            <span className="text-white">Hold (3 candles)</span>
          </label>

          {/* QTP Button */}
          <button 
            onClick={() => setShowQTPPopup(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors flex items-center gap-2"
          >
            🎯 QTP
          </button>

          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            🔄 Refresh Data
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors flex items-center gap-2">
            📊 Analytics
          </button>
        </div>

        {/* QTP Popup */}
        {showQTPPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-lg">Quick Trade Panel</h3>
                <button 
                  onClick={() => setShowQTPPopup(false)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Index Selection */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Select Index</label>
                  <select 
                    value={qtpIndex} 
                    onChange={(e) => setQTPIndex(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  >
                    <option value="NIFTY">NIFTY</option>
                    <option value="BANKNIFTY">BANKNIFTY</option>
                    <option value="FINNIFTY">FINNIFTY</option>
                  </select>
                </div>

                {/* Strike Prices Selection */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Select Strike Prices</label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(qtpStrikes).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-1">
                        <input 
                          type="checkbox" 
                          checked={value}
                          onChange={(e) => setQTPStrikes(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="w-4 h-4 text-blue-600 rounded" 
                        />
                        <span className="text-sm text-gray-300">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Days Selection */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Days to Run Strategy</label>
                  <input
                    type="text"
                    value={qtpDays}
                    onChange={(e) => setQTPDays(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    placeholder="Enter number of days"
                  />
                </div>

                {/* Action Buttons */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Select Action</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQTPAction('LE')}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold"
                    >
                      LE (Long Entry)
                    </button>
                    <button
                      onClick={() => handleQTPAction('LX')}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold"
                    >
                      LX (Long Exit)
                    </button>
                    <button
                      onClick={() => handleQTPAction('SE')}
                      className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-bold"
                    >
                      SE (Short Entry)
                    </button>
                    <button
                      onClick={() => handleQTPAction('SX')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold"
                    >
                      SX (Short Exit)
                    </button>
                  </div>
                </div>

                {/* Back Test Results Placeholder */}
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="text-sm text-gray-300 mb-2">Back Test Results</h4>
                  <div className="bg-gray-700 rounded p-3 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Total Trades:</span>
                      <span className="text-white">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Rate:</span>
                      <span className="text-green-400">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total P&L:</span>
                      <span className="text-green-400">₹45,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Drawdown:</span>
                      <span className="text-red-400">₹8,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Bar - Desktop */}
        <div className="hidden lg:flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800 mt-2">
          <div className="flex gap-4">
            <span>📅 {mounted ? new Date().toLocaleDateString() : '--'}</span>
            <span>🕐 Last Updated: {mounted ? new Date().toLocaleTimeString() : '--:--:--'}</span>
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
