'use client'

import React, { useState } from 'react';

const TradingChart = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => {
  const [activeIndex, setActiveIndex] = useState<'NIFTY' | 'SENSEX' | 'BANKNIFTY'>('NIFTY');
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '1d'>('5m');
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');

  // Mock chart data - in real app, this would come from API
  const chartData = {
    NIFTY: { price: 25850, change: +0.8, color: 'text-green-400' },
    SENSEX: { price: 84420, change: +1.2, color: 'text-green-400' },
    BANKNIFTY: { price: 53420, change: -0.3, color: 'text-red-400' }
  };

  // Mock candlestick data points for visualization
  const generateCandlesticks = () => {
    const basePrice = chartData[activeIndex].price;
    const candles = [];
    
    for (let i = 0; i < 50; i++) {
      const open = basePrice + (Math.random() - 0.5) * 200;
      const close = open + (Math.random() - 0.5) * 100;
      const high = Math.max(open, close) + Math.random() * 50;
      const low = Math.min(open, close) - Math.random() * 50;
      
      candles.push({ open, high, low, close, volume: Math.random() * 1000000 });
    }
    return candles;
  };

  const candlesticks = generateCandlesticks();

  return (
    <div className={`bg-[#0f172a] border border-gray-700 rounded-lg overflow-hidden ${className}`} style={style}>
      {/* Chart Header */}
      <div className="bg-[#1e293b] p-3 border-b border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Index Selector */}
          <div className="flex gap-1">
            {(['NIFTY', 'SENSEX', 'BANKNIFTY'] as const).map((index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  activeIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {index}
              </button>
            ))}
          </div>

          {/* Price Display */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm font-bold text-white">{chartData[activeIndex].price.toLocaleString()}</div>
              <div className={`text-xs font-semibold ${chartData[activeIndex].color}`}>
                {chartData[activeIndex].change > 0 ? '+' : ''}{chartData[activeIndex].change}%
              </div>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-1">
            {(['1m', '5m', '15m', '1h', '1d'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex gap-1">
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📊 Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                chartType === 'line'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📈 Line
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 bg-[#0f172a] p-4">
        {/* Chart Canvas Placeholder */}
        <div className="w-full h-full relative border border-gray-800 rounded bg-gradient-to-b from-gray-900 to-black">
          
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Horizontal grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={`h-${percent}`}
                className="absolute w-full border-t border-gray-800 opacity-30"
                style={{ top: `${percent}%` }}
              />
            ))}
            {/* Vertical grid lines */}
            {[0, 20, 40, 60, 80, 100].map((percent) => (
              <div
                key={`v-${percent}`}
                className="absolute h-full border-l border-gray-800 opacity-30"
                style={{ left: `${percent}%` }}
              />
            ))}
          </div>

          {/* Mock Chart Visualization */}
          <div className="absolute inset-4">
            {chartType === 'candlestick' ? (
              /* Candlestick Chart Simulation */
              <div className="flex items-end justify-between h-full">
                {candlesticks.slice(0, 30).map((candle, i) => {
                  const isGreen = candle.close > candle.open;
                  const bodyHeight = Math.abs(candle.close - candle.open) / 400 * 100;
                  const wickTop = (candle.high - Math.max(candle.open, candle.close)) / 400 * 100;
                  const wickBottom = (Math.min(candle.open, candle.close) - candle.low) / 400 * 100;
                  
                  return (
                    <div key={i} className="flex flex-col items-center justify-end h-full" style={{ width: '3%' }}>
                      {/* Upper wick */}
                      <div 
                        className={`w-0.5 ${isGreen ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ height: `${wickTop}%` }}
                      />
                      {/* Candle body */}
                      <div 
                        className={`w-full ${isGreen ? 'bg-green-500' : 'bg-red-500'} border ${isGreen ? 'border-green-400' : 'border-red-400'}`}
                        style={{ height: `${Math.max(bodyHeight, 1)}%` }}
                      />
                      {/* Lower wick */}
                      <div 
                        className={`w-0.5 ${isGreen ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ height: `${wickBottom}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Line Chart Simulation */
              <div className="relative h-full">
                <svg className="w-full h-full">
                  <path
                    d={`M 0,${Math.random() * 80 + 10} ${candlesticks.slice(0, 30).map((_, i) => 
                      `L ${(i + 1) * (100 / 30)},${Math.random() * 80 + 10}`
                    ).join(' ')}`}
                    fill="none"
                    stroke={chartData[activeIndex].change > 0 ? '#22c55e' : '#ef4444'}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Y-axis Price Labels */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
            {[0, 25, 50, 75, 100].map((percent) => {
              const price = chartData[activeIndex].price + (50 - percent) * 10;
              return (
                <span key={percent} className="bg-gray-900 px-1 rounded">
                  {price.toLocaleString()}
                </span>
              );
            })}
          </div>

          {/* X-axis Time Labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 pt-2">
            {['09:15', '10:30', '12:00', '13:30', '15:30'].map((time) => (
              <span key={time} className="bg-gray-900 px-1 rounded">{time}</span>
            ))}
          </div>
        </div>

        {/* Chart Indicators */}
        <div className="absolute top-2 left-2 bg-black/70 rounded p-2 text-xs">
          <div className="flex gap-4 text-white">
            <span>📈 RSI: <span className="text-yellow-400">46</span></span>
            <span>📊 MACD: <span className="text-green-400">+2.1</span></span>
            <span>📉 EMA: <span className="text-blue-400">25,820</span></span>
          </div>
        </div>

        {/* Volume Bar at Bottom */}
        <div className="absolute bottom-12 left-4 right-16 h-8 flex items-end justify-between">
          {candlesticks.slice(0, 30).map((candle, i) => (
            <div
              key={i}
              className="bg-gray-600 opacity-60 hover:opacity-100 transition-opacity"
              style={{ 
                width: '3%', 
                height: `${(candle.volume / 1000000) * 100}%`,
                minHeight: '2px'
              }}
              title={`Volume: ${candle.volume.toLocaleString()}`}
            />
          ))}
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-[#1e293b] p-2 border-t border-gray-700 flex items-center justify-between text-xs">
        <div className="flex gap-4 text-gray-400">
          <span>📊 Volume: 2.4M</span>
          <span>🕒 Last Update: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
            📸 Screenshot
          </button>
          <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
            🔄 Auto Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;