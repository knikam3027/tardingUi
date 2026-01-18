
'use client';
import { useState } from 'react';



interface StrategySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategySettingsModal({ isOpen, onClose }: StrategySettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#1e222d] w-[500px] h-[80vh] rounded-lg shadow-xl flex flex-col text-[#d1d4dc] font-sans text-sm border border-[#2a2e39]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2e39]">
          <h2 className="text-lg font-medium text-white">Yuvi-N-Short/long (MasterV6)-Final</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 px-4 py-2 border-b border-[#2a2e39] text-sm font-medium">
          <button className="text-white border-b-2 border-white pb-2">Inputs</button>
          <button className="text-[#787b86] hover:text-white pb-2 disabled">Style</button>
          <button className="text-[#787b86] hover:text-white pb-2 disabled">Visibility</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          
          {/* Section 1: SETUP */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 1. SETUP: INDEX & TIME ==========</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Index Selection</span>
                <select className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 min-w-[100px] text-white focus:outline-none focus:border-[#2962ff]">
                  <option>NIFTY</option>
                  <option>BANKNIFTY</option>
                </select>
              </div>

              {/* Ex.Date */}
              <div className="flex items-center">
                <span className="w-24">Ex.Date (DD</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={13} />
                <span className="mx-2">- MM</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={1} />
                <span className="mx-2">- YY)</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={26} />
              </div>

               {/* Start Date */}
               <div className="flex items-center">
                <span className="w-24">Start Date (DD</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={30} />
                <span className="mx-2">- MM</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={12} />
                <span className="mx-2">- YY)</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={2025} />
              </div>

               {/* End Date */}
               <div className="flex items-center">
                <span className="w-24">End Date (DD</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={31} />
                <span className="mx-2">- MM</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-12 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={12} />
                <span className="mx-2">- YY)</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={2099} />
              </div>
            </div>
          </div>

          {/* Section 2: STRIKE SELECTION */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 2. STRIKE SELECTION (MASTER) ==========</div>
            <div className="space-y-3">
              {[
                { label: 'Strike 1', val: '25700' },
                { label: 'Strike 2', val: '25800' },
                { label: 'Strike 3 (ATM)', val: '25850' },
                { label: 'Strike 4', val: '25900' },
                { label: 'Strike 5', val: '26100', showChart: false },
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-500" defaultChecked={idx !== 0 && idx !== 4} />
                            <span>En</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-500" defaultChecked={idx === 3} />
                            <span>Chart</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-500" defaultChecked={true} />
                            <span>Ind</span>
                        </label>
                        <span className="ml-1 w-24 text-nowrap">{s.label}</span>
                    </div>
                  
                  <input type="text" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={s.val} />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: LOGIC SETTINGS */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 3. LOGIC SETTINGS ==========</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Calc Mode</span>
                <div className="flex items-center gap-2">
                    <select className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 text-white focus:outline-none focus:border-[#2962ff]">
                        <option>Auto</option>
                        <option>Manual</option>
                    </select>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" defaultChecked />
                        <span>Filter Chop &gt;</span>
                    </label>
                    <input type="text" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue="61.8" />
                </div>
              </div>

               <div className="flex items-center justify-between">
                <span>Breakdown Window</span>
                <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
              </div>

              <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>Use Momentum</span>
                  </label>
                   <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>Use Trend</span>
                  </label>
                   <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>Use VWAP Rev</span>
                  </label>
              </div>
              
              <div className="flex items-center justify-start gap-4">
                  <span>Min Rev Size</span>
                  <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={5} />
              </div>

               <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>Restrict VWAP Scope?</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S1</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S2</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S3</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S4</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S5</span>
                  </label>
              </div>

            </div>
          </div>

          {/* Section 4: SHORT STRATEGY */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 4. SHORT STRATEGY ==========</div>
             <div className="space-y-3">
                 <div className="flex items-center gap-4">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Enable Short</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <span>Lots</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={2} />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                     <span>Max Short Trades (0=Unl.)</span>
                     <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
                 </div>

                 <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>Restrict Scope?</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S1</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>S2</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>S3</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>S4</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S5</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Time Exit?</span>
                    </label>
                    <span>H</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={14} />
                    <span>M</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={30} />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span>Fixed SL</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Fixed TGT</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
                    </div>
                </div>

                 <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Smart SL Disable &gt; Pts</span>
                    </label>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={10} />
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" />
                        <span>Trailing SL | Act:</span>
                    </label>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={20} />
                    <span>| Dist:</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={10} />
                </div>
             </div>
          </div>

          {/* Section 5: LONG STRATEGY */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 5. LONG STRATEGY ==========</div>
             <div className="space-y-3">
                 <div className="flex items-center gap-4">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Enable Long</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <span>Lots</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={6} />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                     <span>Max Long Trades (0=Unl.)</span>
                     <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={1} />
                 </div>
                 
                 <div className="flex items-center justify-between">
                     <span>Long Start Time</span>
                     <input type="text" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue="09:30" />
                 </div>

                 <div className="flex items-center gap-2">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Strict Entry</span>
                    </label>
                 </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Time Exit?</span>
                    </label>
                    <span>H</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={15} />
                    <span>M</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={10} />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>Restrict Scope?</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S1</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>S2</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S3</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                      <span>S4</span>
                  </label>
                   <label className="flex items-center space-x-1">
                      <input type="checkbox" className="rounded bg-slate-700" />
                      <span>S5</span>
                  </label>
                </div>


                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span>Fixed SL</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Fixed TGT</span>
                        <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={0} />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" />
                        <span>Trailing SL | Act:</span>
                    </label>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={15} />
                    <span>| Dist:</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-20 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={10} />
                </div>
             </div>
          </div>

          {/* Section 6: VISUALS */}
          <div>
             <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 6. VISUALS ==========</div>
             <div className="space-y-3">
                 <div className="flex items-center justify-between">
                     <span>Main Table</span>
                     <select className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 text-white focus:outline-none focus:border-[#2962ff]">
                        <option>Hide</option>
                        <option>Show</option>
                     </select>
                     <span>P&L Table</span>
                      <select className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 text-white focus:outline-none focus:border-[#2962ff]">
                        <option>Bottom ...</option>
                        <option>Top</option>
                     </select>
                 </div>

                 <div className="flex items-center gap-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" />
                        <span>SuperTrend Fac</span>
                    </label>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={3} />
                    <span>Per</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={10} />
                 </div>

                 <div className="flex items-center gap-4">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>EMA(20)</span>
                     </label>
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>VWAP</span>
                     </label>
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>VWMA</span>
                     </label>
                     <span>Len</span>
                     <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-16 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={35} />
                 </div>
                 
                 <div className="flex items-center gap-4">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" />
                        <span>Show Mom. Labels</span>
                     </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" />
                        <span>Show Dir. Labels</span>
                     </label>
                 </div>

                 <div className="flex items-center gap-4">
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Regime</span>
                     </label>
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>Ind.Reg</span>
                     </label>
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>T.Mode</span>
                     </label>
                     <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-slate-700" defaultChecked />
                        <span>T.Type</span>
                     </label>
                 </div>
             </div>
          </div>

          {/* Section 7: ACCOUNT */}
          <div>
            <div className="text-[#787b86] text-xs mb-3 font-semibold uppercase tracking-wider">========== 7. ACCOUNT ==========</div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span>Initial Capital</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-24 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={2300000} />
                </div>
                 <div className="flex items-center justify-between">
                    <span>Index Lot Size</span>
                    <input type="number" className="bg-[#131722] border border-[#2a2e39] rounded px-2 py-1 w-24 text-right focus:outline-none focus:border-[#2962ff]" defaultValue={65} />
                </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
