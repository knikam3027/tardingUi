'use client'

import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StrikePricesTable from "@/components/StrikePricesTable";
import OngoingTradesTable from "@/components/OngoingTradesTable";
import AccountSummary from "@/components/AccountSummary";
import MobileTradingDashboard from "@/components/MobileTradingDashboard";
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
  const [qtpDaysOfWeek, setQtpDaysOfWeek] = useState({
    M: true, T: true, W: true, Th: true, F: true
  });
  
  // Strike prices per index (10 strikes each, in S1-S5 groups)
  const strikesByIndex: Record<string, { group: string; strikes: string[] }[]> = {
    NIFTY: [
      { group: 'S1', strikes: ['25600', '25650'] },
      { group: 'S2', strikes: ['25700', '25750'] },
      { group: 'S3', strikes: ['25800', '25850'] },
      { group: 'S4', strikes: ['25900', '25950'] },
      { group: 'S5', strikes: ['26000', '26050'] },
    ],
    BANKNIFTY: [
      { group: 'S1', strikes: ['53000', '53100'] },
      { group: 'S2', strikes: ['53200', '53300'] },
      { group: 'S3', strikes: ['53400', '53500'] },
      { group: 'S4', strikes: ['53600', '53700'] },
      { group: 'S5', strikes: ['53800', '53900'] },
    ],
    FINNIFTY: [
      { group: 'S1', strikes: ['24800', '24850'] },
      { group: 'S2', strikes: ['24900', '24950'] },
      { group: 'S3', strikes: ['25000', '25050'] },
      { group: 'S4', strikes: ['25100', '25150'] },
      { group: 'S5', strikes: ['25200', '25250'] },
    ],
  };
  
  const [qtpSelectedStrikes, setQtpSelectedStrikes] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('NIFTY');
  
  // MTM Trailing for all indices
  const [mtmTarget, setMtmTarget] = useState('');
  const [mtmSL, setMtmSL] = useState('');

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
    const actionNames: {[key: string]: string} = {
      'LE': 'Long Entry',
      'LX': 'Long Exit',
      'SE': 'Short Entry',
      'SX': 'Short Exit'
    };
    
    const selectedStrikes = Object.entries(qtpSelectedStrikes)
      .filter(([_, selected]) => selected)
      .map(([strike, _]) => strike);
    
    const selectedDays = Object.entries(qtpDaysOfWeek)
      .filter(([_, selected]) => selected)
      .map(([day, _]) => day);
    
    const message = `${actionNames[action]} initiated for ${qtpIndex}\nStrike(s): ${selectedStrikes.join(', ') || 'None'}\nDays: ${selectedDays.join(', ')}`;
    console.log(message);
    alert(`✅ ${message}`);
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
        <div className="mb-2 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Status Bar - moved from bottom */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>📅 {mounted ? new Date().toLocaleDateString() : '--'}</span>
              <span>🕐 Last Updated: {mounted ? new Date().toLocaleTimeString() : '--:--:--'}</span>
              <span className="text-green-400">🟢 Connected</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-xs">
              <span className="text-white">NIFTY: <span className="text-green-400">25,850 (+0.8%)</span></span>
              <span className="text-white">BANK NIFTY: <span className="text-red-400">53,420 (-0.3%)</span></span>
              <span className="text-white">VIX: <span className="text-yellow-400">14.2</span></span>
            </div>
            
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
        </div>

        {/* Auto Action Buttons - Desktop (below header) */}
        <div className="hidden lg:flex flex-wrap gap-2 mb-2 items-center">
          {/* Index Selector */}
          <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
            {['NIFTY', 'SENSEX', 'BANKNIFTY'].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {index}
              </button>
            ))}
          </div>

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

          {/* MTM Trailing for all indices */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded text-sm">
            <span className="text-gray-300 font-medium">MTM:</span>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-xs">Trgt</span>
              <input
                type="text"
                value={mtmTarget}
                onChange={(e) => setMtmTarget(e.target.value)}
                placeholder="0"
                className="w-14 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:border-green-400"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-400 text-xs">SL</span>
              <input
                type="text"
                value={mtmSL}
                onChange={(e) => setMtmSL(e.target.value)}
                placeholder="0"
                className="w-14 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:outline-none focus:border-red-400"
              />
            </div>
          </div>

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
        </div>

        {/* Mobile Dashboard Component */}
        <MobileTradingDashboard />

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {activeView === 'tables' ? (
            <>
              {/* Trading Tables Section */}
              <div>
                {/* Strike Prices Table */}
                <div ref={containerRef}>
                  <StrikePricesTable />
                </div>

                {/* Account Summary */}
                <div>
                  <AccountSummary />
                </div>

                {/* Ongoing Trades Table */}
                <OngoingTradesTable />
              </div>
            </>
          ) : (
            /* Chart View */
            <div className="space-y-4">
              <div style={{ height: `${tableHeight + 100}px` }}>
                <TradingChart className="h-full" />
              </div>
              
              {/* Chart-specific controls */}
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
          )}
        </div>

        {/* QTP Popup - Only closes on X button */}
        {showQTPPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-lg">🎯 Quick Trade Panel (QTP)</h3>
                <button 
                  onClick={() => setShowQTPPopup(false)}
                  className="text-gray-400 hover:text-white text-2xl font-bold px-2 py-1 hover:bg-gray-700 rounded"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Strategy Configuration */}
                <div className="space-y-4">
                  {/* Action Buttons - LE/LX/SE/SX */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-bold">Select Entry/Exit Action</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleQTPAction('LE')}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold text-sm transition-colors"
                      >
                        🟢 LE (Long Entry)
                      </button>
                      <button
                        onClick={() => handleQTPAction('LX')}
                        className="bg-green-700 hover:bg-green-800 text-white py-3 rounded font-bold text-sm transition-colors"
                      >
                        🟢 LX (Long Exit)
                      </button>
                      <button
                        onClick={() => handleQTPAction('SE')}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold text-sm transition-colors"
                      >
                        🔴 SE (Short Entry)
                      </button>
                      <button
                        onClick={() => handleQTPAction('SX')}
                        className="bg-red-700 hover:bg-red-800 text-white py-3 rounded font-bold text-sm transition-colors"
                      >
                        🔴 SX (Short Exit)
                      </button>
                    </div>
                  </div>

                  {/* Index Selection */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-bold">Select Index</label>
                    <select 
                      value={qtpIndex} 
                      onChange={(e) => {
                        setQTPIndex(e.target.value);
                        setQtpSelectedStrikes({});
                      }}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="NIFTY">NIFTY</option>
                      <option value="BANKNIFTY">BANKNIFTY</option>
                      <option value="FINNIFTY">FINNIFTY</option>
                    </select>
                  </div>

                  {/* Days of Week Selection */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-bold">Days to Run Strategy</label>
                    <div className="flex gap-2">
                      {Object.entries(qtpDaysOfWeek).map(([day, checked]) => (
                        <label 
                          key={day}
                          className={`flex items-center justify-center w-10 h-10 rounded cursor-pointer transition-colors ${
                            checked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setQtpDaysOfWeek(prev => ({ ...prev, [day]: e.target.checked }))}
                            className="hidden"
                          />
                          <span className="font-bold text-sm">{day}</span>
                        </label>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      M=Monday, T=Tuesday, W=Wednesday, Th=Thursday, F=Friday
                    </div>
                  </div>
                </div>

                {/* Right Column: Strike Selection (10 strikes in S1-S5 groups) */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-bold">Select Strike Prices ({qtpIndex}) - S1 to S5</label>
                  <div className="bg-gray-700 p-3 rounded max-h-64 overflow-y-auto space-y-3">
                    {strikesByIndex[qtpIndex]?.map((group) => (
                      <div key={group.group} className="border-b border-gray-600 pb-2 last:border-b-0">
                        <div className="text-xs text-blue-400 font-bold mb-1">{group.group}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {group.strikes.map((strike) => (
                            <label 
                              key={strike} 
                              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                                qtpSelectedStrikes[strike] ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'
                              }`}
                            >
                              <input 
                                type="checkbox" 
                                checked={qtpSelectedStrikes[strike] || false}
                                onChange={(e) => setQtpSelectedStrikes(prev => ({ ...prev, [strike]: e.target.checked }))}
                                className="w-4 h-4 accent-blue-500" 
                              />
                              <span className="text-sm text-white font-mono">{strike}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Selected: {Object.values(qtpSelectedStrikes).filter(v => v).length} / 10 strikes
                  </div>
                </div>
              </div>

              {/* Back Test Results */}
              <div className="border-t border-gray-600 mt-6 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm text-gray-300 font-bold">📊 Back Test Results</h4>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                    Run Backtest
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xs text-gray-400">Total Trades</div>
                    <div className="text-lg font-bold text-white">24</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xs text-gray-400">Win Rate</div>
                    <div className="text-lg font-bold text-green-400">68%</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xs text-gray-400">Total P&L</div>
                    <div className="text-lg font-bold text-green-400">₹45,230</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xs text-gray-400">Max Drawdown</div>
                    <div className="text-lg font-bold text-red-400">₹8,450</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
