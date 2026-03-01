'use client'

import React, { useState, useEffect } from 'react';

// Manual Trade Popup Component
interface ManualTradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  strike: string;
  ceLTP: string;
  peLTP: string;
  spotPrice: string;
}

const ManualTradePopup: React.FC<ManualTradePopupProps> = ({
  isOpen,
  onClose,
  strike,
  ceLTP,
  peLTP,
  spotPrice
}) => {
  const [selectedTypes, setSelectedTypes] = useState({ call: true, put: false });
  const [quantity, setQuantity] = useState('1');

  const handleTypeToggle = (type: 'call' | 'put') => {
    setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const executeAction = (action: 'LE' | 'LX' | 'SE' | 'SX') => {
    const actionNames: Record<string, string> = {
      'LE': 'Long Entry',
      'LX': 'Long Exit',
      'SE': 'Short Entry',
      'SX': 'Short Exit'
    };
    const types = [];
    if (selectedTypes.call) types.push('CE');
    if (selectedTypes.put) types.push('PE');
    
    alert(`✅ ${actionNames[action]} executed!\nStrike: ${strike}\nType(s): ${types.join(', ')}\nQuantity: ${quantity} lots`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a365d] border border-gray-600 rounded-lg shadow-xl w-72 text-white">
        {/* Header with CALL/PUT checkboxes */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-600">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.call}
                onChange={() => handleTypeToggle('call')}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm font-semibold text-blue-300">CALL</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.put}
                onChange={() => handleTypeToggle('put')}
                className="w-4 h-4 accent-red-500"
              />
              <span className="text-sm font-semibold text-red-300">PUT</span>
            </label>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => executeAction('LE')}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded transition-colors"
            >
              LE
            </button>
            <button
              onClick={() => executeAction('LX')}
              className="px-3 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-bold rounded transition-colors"
            >
              LX
            </button>
            <button
              onClick={() => executeAction('SX')}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-colors"
            >
              SX
            </button>
            <button
              onClick={() => executeAction('SE')}
              className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-bold rounded transition-colors"
            >
              SE
            </button>
          </div>

          {/* Quantity Input */}
          <div className="flex items-center gap-2 mt-2">
            <label className="text-xs text-gray-300">Qty:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white w-16 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Price Info */}
          <div className="bg-gray-800 rounded p-2 mt-2 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Price</span>
              <span className="text-yellow-400 font-semibold">{spotPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Strike(CE)</span>
              <span className="text-blue-400 font-semibold">{strike}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Strike(PE)</span>
              <span className="text-red-400 font-semibold">{strike}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CE LTP</span>
              <span className="text-blue-300 font-semibold">₹{ceLTP}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">PE LTP</span>
              <span className="text-red-300 font-semibold">₹{peLTP}</span>
            </div>
          </div>

          {/* Show Trade List Button */}
          <button
            onClick={() => alert('Trade list opened')}
            className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded transition-colors mt-2"
          >
            Show Trade List
          </button>
        </div>
      </div>
    </div>
  );
};

const StrikePricesTable = ({ className = "" }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [showManualPopup, setShowManualPopup] = useState(false);
  const [manualPopupData, setManualPopupData] = useState<{strike: string; ce: string; pe: string; ltp: string} | null>(null);
  const [manualCheckboxState, setManualCheckboxState] = useState<{[key: string]: {ce: boolean; pe: boolean}}>({});
  const [trailingSLValues, setTrailingSLValues] = useState<{[key: string]: string}>({});
  const [mtmValues, setMtmValues] = useState<{[key: string]: string}>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-700 rounded flex-1"></div>
                <div className="h-4 bg-gray-700 rounded flex-1"></div>
                <div className="h-4 bg-gray-700 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const strikeData = [
    {
      strike: "25700",
      open: "263",
      ltp: "192.8",
      change: "-70.2",
      lead: "PE ▼",
      regime: "BEARISH",
      indReg: "Bullish", 
      tMode: "BUY CE",
      tType: "Buy PE",
      cVolume: "1.2M",
      cDelta: "-0.45",
      cIV: "18.5",
      ce: "195.50",
      pe: "192.80",
      adx: "32"
    },
    {
      strike: "25800",
      open: "218.85",
      ltp: "194.8", 
      change: "-24.05",
      lead: "PE ▼",
      regime: "BEARISH",
      indReg: "NoTrend",
      tMode: "SHORT", 
      tType: "Sell CE",
      cVolume: "2.1M",
      cDelta: "-0.35",
      cIV: "17.8",
      ce: "156.25",
      pe: "194.80",
      adx: "28"
    },
    {
      strike: "25850",
      open: "-404",
      ltp: "210.6",
      change: "+7.0",
      lead: "PE ▲",
      regime: "SHORT COV",
      indReg: "Neutral",
      tMode: "LONG STR",
      tType: "Buy PE", 
      cVolume: "3.5M",
      cDelta: "0.15",
      cIV: "16.2", 
      ce: "128.75",
      pe: "210.60",
      adx: "24"
    },
    {
      strike: "25900",
      open: "195.95",
      ltp: "234.65",
      change: "+38.7",
      lead: "PE ▲",
      regime: "SHORT COV",
      indReg: "Bearish",
      tMode: "LONG STR",
      tType: "Buy PE",
      cVolume: "4.2M", 
      cDelta: "0.35",
      cIV: "19.1",
      ce: "105.25",
      pe: "234.65",
      adx: "31"
    },
    {
      strike: "26000",
      open: "203.8",
      ltp: "302.7",
      change: "+98.9",
      lead: "PE ▲",
      regime: "SHORT COV", 
      indReg: "Bearish",
      tMode: "LONG STR",
      tType: "Buy PE",
      cVolume: "2.8M",
      cDelta: "0.55", 
      cIV: "20.3",
      ce: "78.50",
      pe: "302.70",
      adx: "35"
    }
  ];

  const handleManualCheckbox = (strike: string, type: 'ce' | 'pe', row: typeof strikeData[0]) => {
    const currentState = manualCheckboxState[strike] || { ce: false, pe: false };
    const newState = { ...currentState, [type]: !currentState[type] };
    setManualCheckboxState({ ...manualCheckboxState, [strike]: newState });
    
    // If any checkbox is checked, show popup
    if (newState.ce || newState.pe) {
      setManualPopupData({
        strike: row.strike,
        ce: row.ce,
        pe: row.pe,
        ltp: row.ltp
      });
      setShowManualPopup(true);
    }
  };

  return (
    <div className={`border border-gray-700 bg-[#020617] rounded-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[1200px]">
          <thead className="bg-[#1d4ed8]">
            <tr>
              {["STRIKE", "OPEN", "LTP", "CHANGE", "LEAD", "REGIME", "IND.REG", "T.MODE", "T.TYPE", "C.VOLUME", "C.DELTA", "C.IV", "CE", "PE", "SL/TGT", "MTM", "MANUAL"].map(h => (
                <th key={h} className="px-2 py-1 text-left font-bold text-white border-r border-blue-900 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {strikeData.map((row, i) => (
              <tr key={i} className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="px-2 py-1 text-gray-400 font-mono">{row.strike}</td>
                <td className="px-2 py-1 text-gray-400">{row.open}</td>
                <td className="px-2 py-1 font-bold text-white">{row.ltp}</td>
                <td className={`px-2 py-1 font-bold ${row.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {row.change}
                </td>
                <td className="px-2 py-1 text-orange-400">
                  {row.lead} 
                  <span className="ml-1">
                    {row.lead.includes('▲') ? '▲' : row.lead.includes('▼') ? '▼' : '➡️'}
                  </span>
                </td>
                <td className="px-2 py-1 bg-red-700 text-white font-bold text-[10px] text-center rounded">
                  {row.regime}
                </td>
                <td className="px-2 py-1 text-green-400 font-semibold">{row.indReg}</td>
                <td className="px-2 py-1 text-blue-400 font-semibold">{row.tMode}</td>
                <td className="px-2 py-1 text-green-400 font-semibold">{row.tType}</td>
                <td className="px-2 py-1 text-yellow-400 font-semibold">{row.cVolume}</td>
                <td className={`px-2 py-1 font-semibold ${parseFloat(row.cDelta) >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {row.cDelta}
                </td>
                <td className="px-2 py-1 text-purple-400 font-semibold">{row.cIV}</td>
                <td className="px-2 py-1 text-blue-300 font-semibold">{row.ce}</td>
                <td className="px-2 py-1 text-red-300 font-semibold">{row.pe}</td>
                
                {/* SL/TGT Column */}
                <td className="px-2 py-1">
                  <input 
                    type="text" 
                    placeholder="SL/TGT"
                    defaultValue={trailingSLValues[row.strike] || ''}
                    onChange={(e) => setTrailingSLValues({...trailingSLValues, [row.strike]: e.target.value})}
                    className="w-14 px-1 py-0.5 bg-gray-700 text-white text-[10px] rounded border border-gray-600 focus:border-blue-400 focus:outline-none"
                  />
                </td>

                {/* MTM Trailing Column (Two text boxes) */}
                <td className="px-2 py-1">
                  <div className="flex gap-0.5">
                    <input 
                      type="text" 
                      placeholder="Act"
                      defaultValue={mtmValues[`${row.strike}_act`] || ''}
                      onChange={(e) => setMtmValues({...mtmValues, [`${row.strike}_act`]: e.target.value})}
                      className="w-8 px-0.5 py-0.5 bg-gray-700 text-white text-[10px] rounded border border-gray-600 focus:border-blue-400 focus:outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="Dist"
                      defaultValue={mtmValues[`${row.strike}_dist`] || ''}
                      onChange={(e) => setMtmValues({...mtmValues, [`${row.strike}_dist`]: e.target.value})}
                      className="w-8 px-0.5 py-0.5 bg-gray-700 text-white text-[10px] rounded border border-gray-600 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </td>

                {/* MANUAL Column */}
                <td className="px-2 py-1">
                  <button
                    onClick={() => {
                      setManualPopupData({
                        strike: row.strike,
                        ce: row.ce,
                        pe: row.pe,
                        ltp: row.ltp
                      });
                      setShowManualPopup(true);
                    }}
                    className="px-2 py-0.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold rounded transition-colors"
                  >
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Manual Trade Popup */}
        <ManualTradePopup
          isOpen={showManualPopup}
          onClose={() => {
            setShowManualPopup(false);
            setManualCheckboxState({});
          }}
          strike={manualPopupData?.strike || '25850'}
          ceLTP={manualPopupData?.ce || '128.75'}
          peLTP={manualPopupData?.pe || '210.60'}
          spotPrice={manualPopupData?.ltp || '25850.00'}
        />

        {/* Indicators Footer */}
        <div className="border-t border-gray-700 bg-[#020617] text-[11px] px-3 py-2">
          <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
            <span className="text-red-400 font-bold">ROC -4.1</span>
            <span className="text-white font-bold">RSI 46</span>
            <span className="text-green-400 font-bold">DI 33</span>
            <span className="text-gray-400">+DI 25</span>
            <span className="text-cyan-400">ADX 29</span>
            <span className="text-gray-400">CHOP 51</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrikePricesTable;