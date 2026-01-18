'use client'

import React from 'react';

const StrikePricesTable = ({ className = "" }: { className?: string }) => {
  const strikeData = [
    ["25700", "263", "192.8", "-70.2", "PE ▼", "BEARISH", "Bullish", "BUY CE", "Buy PE"],
    ["25800", "218.85", "194.8", "-24.05", "PE ▼", "BEARISH", "NoTrend", "SHORT", "Sell CE"],
    ["25850", "-404", "210.6", "+7.0", "PE ▲", "SHORT COV", "Neutral", "LONG STR", "Buy PE"],
    ["25900", "195.95", "234.65", "+38.7", "PE ▲", "SHORT COV", "Bearish", "LONG STR", "Buy PE"],
    ["26000", "203.8", "302.7", "+98.9", "PE ▲", "SHORT COV", "Bearish", "LONG STR", "Buy PE"],
  ];

  return (
    <div className={`border border-gray-700 bg-[#020617] rounded-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse min-w-[700px]">
          <thead className="bg-[#1d4ed8]">
            <tr>
              {["STRIKE", "OPEN", "LTP", "CHANGE", "LEAD", "REGIME", "IND.REG", "T.MODE", "T.TYPE"].map(h => (
                <th key={h} className="px-2 py-1 text-left font-bold text-white border-r border-blue-900 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {strikeData.map((row, i) => (
              <tr key={i} className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="px-2 py-1 text-gray-400 font-mono">{row[0]}</td>
                <td className="px-2 py-1 text-gray-400">{row[1]}</td>
                <td className="px-2 py-1 font-bold text-white">{row[2]}</td>
                <td className={`px-2 py-1 font-bold ${row[3].startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {row[3]}
                </td>
                <td className="px-2 py-1 text-orange-400">{row[4]}</td>
                <td className="px-2 py-1 bg-red-700 text-white font-bold text-[10px] text-center rounded">
                  {row[5]}
                </td>
                <td className="px-2 py-1 text-green-400 font-semibold">{row[6]}</td>
                <td className="px-2 py-1 text-blue-400 font-semibold">{row[7]}</td>
                <td className="px-2 py-1 text-green-400 font-semibold">{row[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Indicators Footer */}
        <div className="border-t border-gray-700 bg-[#020617] text-[11px] px-3 py-2">
          <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
            <span className="text-red-400 font-bold">ROC -4.1</span>
            <span className="text-white font-bold">RSI 46</span>
            <span className="text-green-400 font-bold">DI 33</span>
            <span className="text-gray-400">+DI 25</span>
            <span className="text-gray-400">CHOP 51</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrikePricesTable;