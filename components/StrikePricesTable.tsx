'use client'

import React, { useState, useEffect } from 'react';
import TradingPanel from './TradingPanel';

const StrikePricesTable = ({ className = "" }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [showManualPopup, setShowManualPopup] = useState(false);
  const [manualTradeType, setManualTradeType] = useState<'CE' | 'PE'>('CE');
  const [selectedStrike, setSelectedStrike] = useState('25850');
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

  const handleManualTrade = (strike: string) => {
    setSelectedStrike(strike);
    setShowManualPopup(true);
  };

  const handleTradeTypeChange = (type: 'CE' | 'PE') => {
    setManualTradeType(type);
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
                  <div className="flex items-center space-x-1">
                    <label className="flex items-center space-x-1">
                      <input 
                        type="checkbox" 
                        checked={manualTradeType === 'CE'}
                        onChange={() => handleTradeTypeChange('CE')}
                        className="w-3 h-3 text-blue-600 rounded" 
                      />
                      <span className="text-[10px] text-blue-400">CE</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input 
                        type="checkbox" 
                        checked={manualTradeType === 'PE'}
                        onChange={() => handleTradeTypeChange('PE')}
                        className="w-3 h-3 text-red-600 rounded" 
                      />
                      <span className="text-[10px] text-red-400">PE</span>
                    </label>
                    <button
                      onClick={() => handleManualTrade(row.strike)}
                      className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded transition-colors"
                    >
                      Trade
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Enhanced Trading Panel */}
        <TradingPanel
          isOpen={showManualPopup}
          onClose={() => setShowManualPopup(false)}
          selectedStrike={selectedStrike}
          optionType={manualTradeType}
          currentLTP={manualTradeType === 'CE' 
            ? strikeData.find(s => s.strike === selectedStrike)?.ce || '0'
            : strikeData.find(s => s.strike === selectedStrike)?.pe || '0'
          }
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