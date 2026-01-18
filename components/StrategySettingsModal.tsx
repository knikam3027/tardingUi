'use client';

import { useEffect, useRef, useState } from 'react';

interface StrategySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategySettingsModal({
  isOpen,
  onClose,
}: StrategySettingsModalProps) {
  /* ================= TAB ================= */
  const [activeTab, setActiveTab] = useState<'inputs' | 'style' | 'visibility'>(
    'inputs'
  );

  /* ================= FORM STATE ================= */
  // Setup: Index & Time
  const [indexSelection, setIndexSelection] = useState('NIFTY');
  const [expiryDate, setExpiryDate] = useState({ dd: '13', mm: '01', yy: '26' });
  const [startDate, setStartDate] = useState({ dd: '30', mm: '12', yy: '2025' });
  const [endDate, setEndDate] = useState({ dd: '31', mm: '12', yy: '2099' });

  // Strike Selection
  const [strikes, setStrikes] = useState([
    { id: 1, enabled: false, chart: false, index: true, price: '25700' },
    { id: 2, enabled: true, chart: false, index: true, price: '25800' },
    { id: 3, enabled: true, chart: false, index: true, price: '25850', atm: true },
    { id: 4, enabled: true, chart: true, index: true, price: '25900' },
    { id: 5, enabled: false, chart: false, index: true, price: '26100' },
  ]);

  // Logic Settings
  const [calcMode, setCalcMode] = useState('Auto');
  const [filterChop, setFilterChop] = useState(true);
  const [chopValue, setChopValue] = useState('61.8');
  const [breakdownWindow, setBreakdownWindow] = useState('0');
  const [useMomentum, setUseMomentum] = useState(true);
  const [useTrend, setUseTrend] = useState(false);
  const [useVwapRev, setUseVwapRev] = useState(false);
  const [minRevSize, setMinRevSize] = useState('5');
  const [restrictVwapScope, setRestrictVwapScope] = useState(false);
  const [vwapScope, setVwapScope] = useState({
    s1: false, s2: false, s3: false, s4: false, s5: false
  });

  // Short Strategy
  const [enableShort, setEnableShort] = useState(true);
  const [shortLots, setShortLots] = useState('2');
  const [maxShortTrades, setMaxShortTrades] = useState('0');
  const [restrictShortScope, setRestrictShortScope] = useState(true);
  const [shortScope, setShortScope] = useState({
    s1: false, s2: true, s3: true, s4: true, s5: false
  });
  const [shortTimeExit, setShortTimeExit] = useState(true);
  const [shortExitTime, setShortExitTime] = useState({ h: '14', m: '30' });
  const [shortFixedSl, setShortFixedSl] = useState('0');
  const [shortFixedTgt, setShortFixedTgt] = useState('0');
  const [smartSlDisable, setSmartSlDisable] = useState(true);
  const [smartSlPoints, setSmartSlPoints] = useState('10');
  const [shortTrailingSl, setShortTrailingSl] = useState(false);
  const [shortTrailingAct, setShortTrailingAct] = useState('20');
  const [shortTrailingDist, setShortTrailingDist] = useState('10');

  // Long Strategy
  const [enableLong, setEnableLong] = useState(true);
  const [longLots, setLongLots] = useState('6');
  const [maxLongTrades, setMaxLongTrades] = useState('1');
  const [longStartTime, setLongStartTime] = useState('09:30');
  const [strictEntry, setStrictEntry] = useState(true);
  const [longTimeExit, setLongTimeExit] = useState(true);
  const [longExitTime, setLongExitTime] = useState({ h: '15', m: '10' });
  const [restrictLongScope, setRestrictLongScope] = useState(true);
  const [longScope, setLongScope] = useState({
    s1: false, s2: true, s3: false, s4: true, s5: false
  });
  const [longFixedSl, setLongFixedSl] = useState('0');
  const [longFixedTgt, setLongFixedTgt] = useState('0');
  const [longTrailingSl, setLongTrailingSl] = useState(false);
  const [longTrailingAct, setLongTrailingAct] = useState('15');
  const [longTrailingDist, setLongTrailingDist] = useState('10');

  // Visuals
  const [mainTable, setMainTable] = useState('Hide');
  const [pnlTable, setPnlTable] = useState('Bottom m');
  const [showSuperTrend, setShowSuperTrend] = useState(false);
  const [superTrendFactor, setSuperTrendFactor] = useState('3');
  const [superTrendPeriod, setSuperTrendPeriod] = useState('10');
  const [showEma20, setShowEma20] = useState(true);
  const [showVwap, setShowVwap] = useState(true);
  const [showVwma, setShowVwma] = useState(true);
  const [vwmaLength, setVwmaLength] = useState('35');
  const [showMomLabels, setShowMomLabels] = useState(false);
  const [showDirLabels, setShowDirLabels] = useState(false);

  /* ================= WINDOW STATE ================= */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 900, height: 700 });

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<
    'left' | 'right' | 'top' | 'bottom' | null
  >(null);

  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const MIN_W = 600;
  const MIN_H = 400;

  /* ================= CENTER ================= */
  useEffect(() => {
    if (!isOpen) return;
    setPos({
      x: (window.innerWidth - size.width) / 2,
      y: (window.innerHeight - size.height) / 2,
    });
  }, [isOpen]);

  /* ================= ESC ================= */
  useEffect(() => {
    if (!isOpen) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [isOpen, onClose]);

  /* ================= DRAG ================= */
  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    startMouse.current = { x: e.clientX, y: e.clientY };
    startPos.current = pos;
  };

  /* ================= RESIZE ================= */
  const startResize = (
    dir: 'left' | 'right' | 'top' | 'bottom',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setResizing(dir);
    startMouse.current = { x: e.clientX, y: e.clientY };
    startPos.current = pos;
    startSize.current = size;
  };

  /* ================= MOVE / RESIZE ================= */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      if (dragging) {
        setPos({
          x: startPos.current.x + dx,
          y: startPos.current.y + dy,
        });
      }

      if (resizing === 'right') {
        const w = startSize.current.width + dx;
        if (w >= MIN_W) setSize((s) => ({ ...s, width: w }));
      }

      if (resizing === 'left') {
        const w = startSize.current.width - dx;
        if (w >= MIN_W) {
          setSize((s) => ({ ...s, width: w }));
          setPos((p) => ({ ...p, x: startPos.current.x + dx }));
        }
      }

      if (resizing === 'bottom') {
        const h = startSize.current.height + dy;
        if (h >= MIN_H) setSize((s) => ({ ...s, height: h }));
      }

      if (resizing === 'top') {
        const h = startSize.current.height - dy;
        if (h >= MIN_H) {
          setSize((s) => ({ ...s, height: h }));
          setPos((p) => ({ ...p, y: startPos.current.y + dy }));
        }
      }
    };

    const stop = () => {
      setDragging(false);
      setResizing(null);
    };

    if (dragging || resizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', stop);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
    };
  }, [dragging, resizing]);

  if (!isOpen) return null;

  /* ================= RENDER ================= */
  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="fixed z-50 bg-[#1e222d] border border-[#2a2e39] rounded-lg shadow-xl flex flex-col text-[#d1d4dc] text-sm"
        style={{
          left: pos.x,
          top: pos.y,
          width: size.width,
          height: size.height,
        }}
      >
        {/* HEADER */}
        <div
          onMouseDown={startDrag}
          className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[#2a2e39] cursor-move select-none"
        >
          <h2 className="text-lg font-medium text-white">
            Yuvi-N-Short/Long (MasterV6)-Final
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="flex-shrink-0 flex gap-6 px-4 py-2 border-b border-[#2a2e39]">
          {['inputs', 'style', 'visibility'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`pb-2 ${
                activeTab === t
                  ? 'text-white border-b-2 border-white'
                  : 'text-[#787b86] hover:text-white'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* LEFT / RIGHT / TOP / BOTTOM RESIZE */}
        <div
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize"
          onMouseDown={(e) => startResize('left', e)}
        />
        <div
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize"
          onMouseDown={(e) => startResize('right', e)}
        />
        <div
          className="absolute top-0 left-0 w-full h-2 cursor-ns-resize"
          onMouseDown={(e) => startResize('top', e)}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
          onMouseDown={(e) => startResize('bottom', e)}
        />

        {/* ✅ SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {activeTab === 'inputs' && (
            <>
              {/* ========== 1. SETUP: INDEX & TIME ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 1. SETUP: INDEX & TIME ==========
                </div>
                
                <div className="space-y-4">
                  {/* Index Selection */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Index Selection</label>
                    <select 
                      value={indexSelection} 
                      onChange={(e) => setIndexSelection(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] min-w-[80px]"
                    >
                      <option>NIFTY</option>
                      <option>BANKNIFTY</option>
                    </select>
                  </div>

                  {/* Expiry Date */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Ex.Date (DD</label>
                    <input 
                      type="text" 
                      value={expiryDate.dd}
                      onChange={(e) => setExpiryDate({...expiryDate, dd: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- MM</span>
                    <input 
                      type="text" 
                      value={expiryDate.mm}
                      onChange={(e) => setExpiryDate({...expiryDate, mm: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- YY)</span>
                    <input 
                      type="text" 
                      value={expiryDate.yy}
                      onChange={(e) => setExpiryDate({...expiryDate, yy: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                  </div>

                  {/* Start Date */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Start Date (DD</label>
                    <input 
                      type="text" 
                      value={startDate.dd}
                      onChange={(e) => setStartDate({...startDate, dd: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- MM</span>
                    <input 
                      type="text" 
                      value={startDate.mm}
                      onChange={(e) => setStartDate({...startDate, mm: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- YY</span>
                    <input 
                      type="text" 
                      value={startDate.yy}
                      onChange={(e) => setStartDate({...startDate, yy: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">End Date (DD</label>
                    <input 
                      type="text" 
                      value={endDate.dd}
                      onChange={(e) => setEndDate({...endDate, dd: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- MM</span>
                    <input 
                      type="text" 
                      value={endDate.mm}
                      onChange={(e) => setEndDate({...endDate, mm: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <span className="text-[#d1d4dc]">- YY)</span>
                    <input 
                      type="text" 
                      value={endDate.yy}
                      onChange={(e) => setEndDate({...endDate, yy: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                  </div>
                </div>
              </div>

              {/* ========== 2. STRIKE SELECTION (MASTER) ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 2. STRIKE SELECTION (MASTER) ==========
                </div>
                
                <div className="space-y-2">
                  {strikes.map((strike, idx) => (
                    <div key={strike.id} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={strike.enabled}
                        onChange={(e) => {
                          const newStrikes = [...strikes];
                          newStrikes[idx].enabled = e.target.checked;
                          setStrikes(newStrikes);
                        }}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc] min-w-[20px]">En</label>
                      
                      <input 
                        type="checkbox" 
                        checked={strike.chart}
                        onChange={(e) => {
                          const newStrikes = [...strikes];
                          newStrikes[idx].chart = e.target.checked;
                          setStrikes(newStrikes);
                        }}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc] min-w-[35px]">Chart</label>
                      
                      <input 
                        type="checkbox" 
                        checked={strike.index}
                        onChange={(e) => {
                          const newStrikes = [...strikes];
                          newStrikes[idx].index = e.target.checked;
                          setStrikes(newStrikes);
                        }}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc] min-w-[30px]">Ind</label>
                      
                      <label className="text-[#d1d4dc] min-w-[50px]">
                        Strike {strike.id} {strike.atm ? '(ATM)' : ''}
                      </label>
                      
                      <input 
                        type="text" 
                        value={strike.price}
                        onChange={(e) => {
                          const newStrikes = [...strikes];
                          newStrikes[idx].price = e.target.value;
                          setStrikes(newStrikes);
                        }}
                        className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ========== 3. LOGIC SETTINGS ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 3. LOGIC SETTINGS ==========
                </div>
                
                <div className="space-y-4">
                  {/* Calc Mode */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Calc Mode</label>
                    <select 
                      value={calcMode} 
                      onChange={(e) => setCalcMode(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc]"
                    >
                      <option>Auto</option>
                      <option>Manual</option>
                    </select>
                    
                    <input 
                      type="checkbox" 
                      checked={filterChop}
                      onChange={(e) => setFilterChop(e.target.checked)}
                      className="w-4 h-4 ml-6"
                    />
                    <label className="text-[#d1d4dc]">Filter Chop &gt;</label>
                    <input 
                      type="text" 
                      value={chopValue}
                      onChange={(e) => setChopValue(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Breakdown Window */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Breakdown Window</label>
                    <input 
                      type="text" 
                      value={breakdownWindow}
                      onChange={(e) => setBreakdownWindow(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={useMomentum}
                        onChange={(e) => setUseMomentum(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">Use Momentum</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={useTrend}
                        onChange={(e) => setUseTrend(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">Use Trend</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={useVwapRev}
                        onChange={(e) => setUseVwapRev(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">Use VWAP Rev</label>
                    </div>
                  </div>

                  {/* Min Reversal Size */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[120px]">Min Rev Size</label>
                    <input 
                      type="text" 
                      value={minRevSize}
                      onChange={(e) => setMinRevSize(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* VWAP Scope */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={restrictVwapScope}
                      onChange={(e) => setRestrictVwapScope(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[120px]">Restrict VWAP Scope?</label>
                    
                    {['s1', 's2', 's3', 's4', 's5'].map((scope) => (
                      <div key={scope} className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={vwapScope[scope as keyof typeof vwapScope]}
                          onChange={(e) => setVwapScope({...vwapScope, [scope]: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label className="text-[#d1d4dc] text-xs">{scope.toUpperCase()}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ========== 4. SHORT STRATEGY ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 4. SHORT STRATEGY ==========
                </div>
                
                <div className="space-y-4">
                  {/* Enable Short */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={enableShort}
                      onChange={(e) => setEnableShort(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Enable Short</label>
                    <label className="text-[#d1d4dc] min-w-[40px]">Lots</label>
                    <input 
                      type="text" 
                      value={shortLots}
                      onChange={(e) => setShortLots(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Max Trades */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[140px]">Max Short Trades (0=Unl.)</label>
                    <input 
                      type="text" 
                      value={maxShortTrades}
                      onChange={(e) => setMaxShortTrades(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Restrict Scope */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={restrictShortScope}
                      onChange={(e) => setRestrictShortScope(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Restrict Scope?</label>
                    
                    {['s1', 's2', 's3', 's4', 's5'].map((scope) => (
                      <div key={scope} className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={shortScope[scope as keyof typeof shortScope]}
                          onChange={(e) => setShortScope({...shortScope, [scope]: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label className="text-[#d1d4dc] text-xs">{scope.toUpperCase()}</label>
                      </div>
                    ))}
                  </div>

                  {/* Time Exit */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={shortTimeExit}
                      onChange={(e) => setShortTimeExit(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[80px]">Time Exit? H</label>
                    <input 
                      type="text" 
                      value={shortExitTime.h}
                      onChange={(e) => setShortExitTime({...shortExitTime, h: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <label className="text-[#d1d4dc]">M</label>
                    <input 
                      type="text" 
                      value={shortExitTime.m}
                      onChange={(e) => setShortExitTime({...shortExitTime, m: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                  </div>

                  {/* Fixed SL/TGT */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[60px]">Fixed SL</label>
                    <input 
                      type="text" 
                      value={shortFixedSl}
                      onChange={(e) => setShortFixedSl(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                    <label className="text-[#d1d4dc] min-w-[70px] ml-4">Fixed TGT</label>
                    <input 
                      type="text" 
                      value={shortFixedTgt}
                      onChange={(e) => setShortFixedTgt(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Smart SL */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={smartSlDisable}
                      onChange={(e) => setSmartSlDisable(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[120px]">Smart SL Disable &gt;</label>
                    <label className="text-[#d1d4dc] min-w-[30px]">Pts</label>
                    <input 
                      type="text" 
                      value={smartSlPoints}
                      onChange={(e) => setSmartSlPoints(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Trailing SL */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={shortTrailingSl}
                      onChange={(e) => setShortTrailingSl(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Trailing SL | Act:</label>
                    <input 
                      type="text" 
                      value={shortTrailingAct}
                      onChange={(e) => setShortTrailingAct(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                    <label className="text-[#d1d4dc] min-w-[50px]">| Dist:</label>
                    <input 
                      type="text" 
                      value={shortTrailingDist}
                      onChange={(e) => setShortTrailingDist(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>
                </div>
              </div>

              {/* ========== 5. LONG STRATEGY ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 5. LONG STRATEGY ==========
                </div>
                
                <div className="space-y-4">
                  {/* Enable Long */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={enableLong}
                      onChange={(e) => setEnableLong(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Enable Long</label>
                    <label className="text-[#d1d4dc] min-w-[40px]">Lots</label>
                    <input 
                      type="text" 
                      value={longLots}
                      onChange={(e) => setLongLots(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Max Trades */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[140px]">Max Long Trades (0=Unl.)</label>
                    <input 
                      type="text" 
                      value={maxLongTrades}
                      onChange={(e) => setMaxLongTrades(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Long Start Time */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[100px]">Long Start Time</label>
                    <input 
                      type="text" 
                      value={longStartTime}
                      onChange={(e) => setLongStartTime(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-20"
                    />
                  </div>

                  {/* Strict Entry */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={strictEntry}
                      onChange={(e) => setStrictEntry(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc]">Strict Entry</label>
                  </div>

                  {/* Time Exit */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={longTimeExit}
                      onChange={(e) => setLongTimeExit(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[80px]">Time Exit? H</label>
                    <input 
                      type="text" 
                      value={longExitTime.h}
                      onChange={(e) => setLongExitTime({...longExitTime, h: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                    <label className="text-[#d1d4dc]">M</label>
                    <input 
                      type="text" 
                      value={longExitTime.m}
                      onChange={(e) => setLongExitTime({...longExitTime, m: e.target.value})}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                    />
                  </div>

                  {/* Restrict Scope */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={restrictLongScope}
                      onChange={(e) => setRestrictLongScope(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Restrict Scope?</label>
                    
                    {['s1', 's2', 's3', 's4', 's5'].map((scope) => (
                      <div key={scope} className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          checked={longScope[scope as keyof typeof longScope]}
                          onChange={(e) => setLongScope({...longScope, [scope]: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label className="text-[#d1d4dc] text-xs">{scope.toUpperCase()}</label>
                      </div>
                    ))}
                  </div>

                  {/* Fixed SL/TGT */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[60px]">Fixed SL</label>
                    <input 
                      type="text" 
                      value={longFixedSl}
                      onChange={(e) => setLongFixedSl(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                    <label className="text-[#d1d4dc] min-w-[70px] ml-4">Fixed TGT</label>
                    <input 
                      type="text" 
                      value={longFixedTgt}
                      onChange={(e) => setLongFixedTgt(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Trailing SL */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={longTrailingSl}
                      onChange={(e) => setLongTrailingSl(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[100px]">Trailing SL | Act:</label>
                    <input 
                      type="text" 
                      value={longTrailingAct}
                      onChange={(e) => setLongTrailingAct(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                    <label className="text-[#d1d4dc] min-w-[50px]">| Dist:</label>
                    <input 
                      type="text" 
                      value={longTrailingDist}
                      onChange={(e) => setLongTrailingDist(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>
                </div>
              </div>

              {/* ========== 6. VISUALS ========== */}
              <div>
                <div className="text-xs text-[#787b86] font-semibold uppercase mb-4">
                  ========== 6. VISUALS ==========
                </div>
                
                <div className="space-y-4">
                  {/* Main Table */}
                  <div className="flex items-center gap-3">
                    <label className="text-[#d1d4dc] min-w-[80px]">Main Table</label>
                    <select 
                      value={mainTable} 
                      onChange={(e) => setMainTable(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc]"
                    >
                      <option>Hide</option>
                      <option>Show</option>
                    </select>
                    
                    <label className="text-[#d1d4dc] min-w-[80px] ml-6">P&L Table</label>
                    <select 
                      value={pnlTable} 
                      onChange={(e) => setPnlTable(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc]"
                    >
                      <option>Bottom m</option>
                      <option>Top</option>
                      <option>Hide</option>
                    </select>
                  </div>

                  {/* SuperTrend */}
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={showSuperTrend}
                      onChange={(e) => setShowSuperTrend(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-[#d1d4dc] min-w-[80px]">SuperTrend</label>
                    <label className="text-[#d1d4dc] min-w-[30px]">Fac</label>
                    <input 
                      type="text" 
                      value={superTrendFactor}
                      onChange={(e) => setSuperTrendFactor(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                    <label className="text-[#d1d4dc] min-w-[30px]">Per</label>
                    <input 
                      type="text" 
                      value={superTrendPeriod}
                      onChange={(e) => setSuperTrendPeriod(e.target.value)}
                      className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-16"
                    />
                  </div>

                  {/* Indicators */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={showEma20}
                        onChange={(e) => setShowEma20(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">EMA(20)</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={showVwap}
                        onChange={(e) => setShowVwap(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">VWAP</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={showVwma}
                        onChange={(e) => setShowVwma(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">VWMA</label>
                      <label className="text-[#d1d4dc]">Len</label>
                      <input 
                        type="text" 
                        value={vwmaLength}
                        onChange={(e) => setVwmaLength(e.target.value)}
                        className="bg-[#2a2e39] border border-[#3a3e49] rounded px-3 py-1 text-[#d1d4dc] w-12"
                      />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={showMomLabels}
                        onChange={(e) => setShowMomLabels(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">Show Mom. Labels</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={showDirLabels}
                        onChange={(e) => setShowDirLabels(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-[#d1d4dc]">Show Dir. Labels</label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'style' && (
            <div className="text-gray-400">Style settings coming soon…</div>
          )}

          {activeTab === 'visibility' && (
            <div className="text-gray-400">
              Visibility settings coming soon…
            </div>
          )}
        </div>
      </div>
    </>
  );
}
