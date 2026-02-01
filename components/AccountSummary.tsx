'use client'

import React, { useState, useEffect } from 'react';

const AccountSummary = ({ className = "" }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [mtmTrailing1, setMtmTrailing1] = useState('50');
  const [mtmTrailing2, setMtmTrailing2] = useState('100');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  const tradeData = [
    {
      strike: "ATM",
      entry: "09:15",
      exit: "12:30",
      lots: "6",
      price: "206.55",
      pts: "+9.4",
      pnl: "+3666",
      trigger: "OLD",
      s: "1",
      b: "0",
      slTrgt: "300/600",
      isPositive: true
    },
    {
      strike: "OTM1",
      entry: "11:40",
      exit: "15:10",
      lots: "10",
      price: "198.35",
      pts: "-43.1",
      pnl: "+28015",
      trigger: "UDV",
      s: "0",
      b: "1",
      slTrgt: "250/500",
      isPositive: true
    }
  ];

  const handleBookTrade = (index: number) => {
    console.log(`Booking trade at index ${index}`);
    // Implementation for booking trade
  };

  return (
    <div className={`border border-gray-700 bg-[#111827] rounded-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] lg:text-xs border-collapse min-w-[750px]">
          <thead className="bg-[#1f2937]">
            <tr>
              {["STRIKE", "ENTRY", "EXIT", "LOTS", "PRICE", "PTS", "P&L", "SL/TRGT", "TRIG", "S", "B"].map(h => (
                <th key={h} className="px-2 py-2 text-left font-bold text-gray-300 border-r border-gray-700 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tradeData.map((trade, i) => (
              <tr key={i} className={`${i === 0 ? 'bg-[#020617]' : 'border-t border-gray-800'} hover:bg-gray-800/30 transition-colors`}>
                <td className="px-2 py-1 font-bold text-yellow-400">{trade.strike}</td>
                <td className="px-2 py-1 text-gray-300">{trade.entry}</td>
                <td className="px-2 py-1 text-gray-300">{trade.exit}</td>
                <td className="px-2 py-1 text-gray-300">{trade.lots}</td>
                <td className="px-2 py-1 font-semibold text-white">{trade.price}</td>
                <td className={`px-2 py-1 font-semibold ${trade.pts.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pts}
                </td>
                <td className={`px-2 py-1 font-bold ${trade.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pnl}
                </td>
                <td className="px-2 py-1 text-gray-300 font-mono text-[10px]">
                  <input
                    type="text"
                    value={trade.slTrgt}
                    className="w-16 bg-gray-600 border border-gray-500 rounded px-1 py-0.5 text-gray-100 text-[10px]"
                    readOnly
                  />
                </td>
                <td className="px-2 py-1 relative">
                  <div className={`font-bold text-black text-center rounded-sm cursor-pointer ${
                    trade.trigger === 'OLD' ? 'bg-yellow-500' : 'bg-blue-500 text-white'
                  }`}>
                    <button
                      onClick={() => handleBookTrade(i)}
                      className="w-full px-1 py-0.5 hover:opacity-80"
                      title="Click to book trade"
                    >
                      {trade.trigger}
                    </button>
                  </div>
                </td>
                <td className="px-2 py-1 text-center text-gray-300">{trade.s}</td>
                <td className="px-2 py-1 text-center text-gray-300">{trade.b}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MTM Trailing Controls */}
        <div className="border-t border-gray-700 bg-[#020617] px-3 py-2">
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-gray-400">MTM Trailing:</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Level 1:</span>
              <input
                type="text"
                value={mtmTrailing1}
                onChange={(e) => setMtmTrailing1(e.target.value)}
                className="w-12 bg-gray-700 border border-gray-600 rounded px-1 py-0.5 text-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Level 2:</span>
              <input
                type="text"
                value={mtmTrailing2}
                onChange={(e) => setMtmTrailing2(e.target.value)}
                className="w-12 bg-gray-700 border border-gray-600 rounded px-1 py-0.5 text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Account Summary Footer */}
        <div className="border-t border-gray-700 bg-[#020617] text-[11px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-3 py-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px]">CAPITAL</span>
              <span className="text-green-400 font-bold">₹234,831</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px]">DAY P&L</span>
              <span className="text-green-400 font-bold">₹31,681</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px]">TOTAL P&L</span>
              <span className="text-green-400 font-bold">₹35,347</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px]">AVAILABLE MARGIN</span>
              <span className="text-blue-400 font-bold">₹199,484</span>
            </div>
          </div>

          <div className="px-3 py-2 text-gray-500 border-t border-gray-800">
            <span className="text-[10px]">HIST:</span>
            <span className="ml-1">₹106,925 | ₹-61,893 | ₹-7,046 | ₹-9,445 | ₹28,119</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;