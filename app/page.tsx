"use client";

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, X, Target, Shield, TrendingUp } from 'lucide-react';

interface Signal {
  id: number;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  probability: number;
  grade: 'A+' | 'A';
  timeframe: string;
  confluence: string;
  fullAnalysis: string;
  timestamp: string;
  rrPotential: string;
}

const mockSignals: Signal[] = [
  { id: 1, pair: "XAU_USD", direction: "BUY", entry: 2652.80, sl: 2649.10, tp1: 2656.50, tp2: 2662.00, probability: 89, grade: "A+", timeframe: "15m", confluence: "Liquidity sweep of equal highs + 50% FVG + strong OB demand", fullAnalysis: "Inducement sweep above previous highs. Price returned into the 0.5 FVG and found acceptance at a clear Order Block.", timestamp: "2026-05-31 14:22 WAT", rrPotential: "Up to 5R+" },
  { id: 2, pair: "EURUSD", direction: "SELL", entry: 1.0852, sl: 1.0878, tp1: 1.0825, tp2: 1.0790, probability: 76, grade: "A", timeframe: "1h", confluence: "Liquidity grab below equal lows + FVG + bearish OB at supply", fullAnalysis: "Classic liquidity sweep below session lows. Price reversed from the FVG and is respecting the bearish Order Block.", timestamp: "2026-05-31 13:45 WAT", rrPotential: "Up to 3.5R" },
  { id: 3, pair: "GBPJPY", direction: "BUY", entry: 199.85, sl: 199.35, tp1: 200.45, tp2: 201.20, probability: 84, grade: "A+", timeframe: "15m", confluence: "Sweep of London lows + internal liquidity + 0.618 FVG + OB confluence", fullAnalysis: "Strong inducement sweep. Price filled the FVG and bounced from the Order Block with clear displacement.", timestamp: "2026-05-31 12:10 WAT", rrPotential: "Up to 4R" },
  { id: 4, pair: "NAS100_USD", direction: "SELL", entry: 19850, sl: 19920, tp1: 19780, tp2: 19650, probability: 71, grade: "A", timeframe: "1h", confluence: "Equal highs sweep + premium array FVG + supply OB", fullAnalysis: "Inducement above recent highs. Rejection at supply zone with FVG confirmation.", timestamp: "2026-05-31 11:30 WAT", rrPotential: "Up to 3R" },
  { id: 5, pair: "BTCUSD", direction: "BUY", entry: 68240, sl: 67850, tp1: 68750, tp2: 69500, probability: 82, grade: "A+", timeframe: "4h", confluence: "Sweep of weekly low + strong demand OB + FVG alignment", fullAnalysis: "Bitcoin swept the weekly liquidity low. Strong displacement back into value with Order Block support.", timestamp: "2026-05-31 09:15 WAT", rrPotential: "Up to 4.5R" }
];

export default function SMCPowerhouseDashboard() {
  const [activeAssetFilter, setActiveAssetFilter] = useState<string>('all');
  const [activeProbFilter, setActiveProbFilter] = useState<string>('all');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const assets = ['all', 'XAU_USD', 'EURUSD', 'GBPJPY', 'NAS100_USD', 'BTCUSD'];

  const filteredSignals = mockSignals
    .filter(s => (activeAssetFilter === 'all' || s.pair === activeAssetFilter) && (activeProbFilter === 'all' || s.grade === activeProbFilter))
    .sort((a, b) => b.probability - a.probability);

  const openModal = (signal: Signal) => { setSelectedSignal(signal); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setSelectedSignal(null); document.body.style.overflow = 'visible'; };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center">
              <Target className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-semibold text-3xl tracking-[-2px]">SMC Powerhouse</div>
              <div className="text-[10px] text-white/40 -mt-1">PERSONAL • HIGH PROBABILITY</div>
            </div>
          </div>
          <div className="px-5 py-2 bg-white/5 rounded-2xl text-xs border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Mock • Ready for your bot
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 pt-14 pb-10">
        <div className="max-w-2xl">
          <div className="text-emerald-400 text-sm tracking-[4px] mb-4">LIQUIDITY • STRUCTURE • CONFLUENCE</div>
          <h1 className="text-[72px] leading-[1.05] font-semibold tracking-[-4.5px] mb-6">
            Your edge.<br />Beautifully simple.
          </h1>
          <p className="text-2xl text-white/60">High-confluence SMC setups. A/A+ only. Made for you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-emerald-400 mb-2">SIGNALS</div>
            <div className="text-4xl font-semibold tracking-tight">Active Setups</div>
          </div>
          <div className="text-white/50 text-sm">{filteredSignals.length} signals • Just now</div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {assets.map(a => (
            <button key={a} onClick={() => setActiveAssetFilter(a)} className={`px-5 py-2 text-sm rounded-2xl border transition-all ${activeAssetFilter === a ? 'bg-white text-black border-white' : 'border-white/10 hover:bg-white/5'}`}>{a === 'all' ? 'All Assets' : a}</button>
          ))}
          <div className="w-px h-8 bg-white/10 mx-2 self-center" />
          {['all','A+','A'].map(p => (
            <button key={p} onClick={() => setActiveProbFilter(p)} className={`px-5 py-2 text-sm rounded-2xl border transition-all ${activeProbFilter === p ? 'bg-white text-black border-white' : 'border-white/10 hover:bg-white/5'}`}>{p === 'all' ? 'All Prob' : p}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignals.map(signal => (
            <div key={signal.id} onClick={() => openModal(signal)} className="bg-[#111] border border-white/10 hover:border-white/20 rounded-3xl p-7 cursor-pointer transition-all group">
              <div className="flex justify-between mb-8">
                <div className="font-mono text-4xl font-semibold tracking-[-1.5px]">{signal.pair}</div>
                <div className={`self-start px-5 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 ${signal.direction === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {signal.direction === 'BUY' ? <ArrowUp size={16} /> : <ArrowDown size={16} />} {signal.direction}
                </div>
              </div>

              <div className="flex justify-between text-sm mb-7">
                <div><div className="text-white/40 text-xs">ENTRY</div><div className="font-mono text-2xl mt-px">{signal.entry}</div></div>
                <div><div className="text-white/40 text-xs">SL</div><div className="font-mono text-2xl mt-px text-red-400">{signal.sl}</div></div>
                <div><div className="text-white/40 text-xs">TPs</div><div className="font-mono text-2xl mt-px text-emerald-400">{signal.tp1} / {signal.tp2}</div></div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`px-5 py-1.5 rounded-2xl text-sm font-semibold ${signal.grade === 'A+' ? 'bg-emerald-400 text-black' : 'bg-white/90 text-black'}`}>{signal.grade} • {signal.probability}%</div>
                <div className="text-xs text-white/50">{signal.rrPotential}</div>
              </div>

              <div className="mt-6 text-[15px] text-white/60 group-hover:text-white/80 transition-colors line-clamp-2">{signal.confluence}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border-y border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-3 mb-9">
            <TrendingUp className="text-emerald-400" />
            <div className="text-3xl font-semibold tracking-tight">Performance</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{l:'Win Rate', v:'68%', s:'Last 30 days'}, {l:'Profit Factor', v:'2.4', s:'Strong edge'}, {l:'Avg R:R', v:'3.1R', s:'Dynamic TPs'}, {l:'Setups', v:'47', s:'High quality'}].map((s,i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8">
                <div className="text-white/50 text-sm">{s.l}</div>
                <div className="text-6xl font-semibold tracking-[-2px] mt-4 mb-1">{s.v}</div>
                <div className="text-emerald-400 text-xs">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="max-w-lg mb-10">
          <div className="uppercase tracking-[3px] text-emerald-400 text-xs mb-3">THE METHOD</div>
          <div className="text-4xl font-semibold tracking-tight">How these trades are taken</div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {icon:<Shield/>, t:"Liquidity First", d:"Only after clear sweeps. Stops taken = smart money entering."},
            {icon:<Target/>, t:"Confluence Zones", d:"FVG + Order Block after inducement. Sniper precision entries."},
            {icon:<TrendingUp/>, t:"Structure Exit", d:"Watch lower timeframes for CHOCH. Dynamic partials. Protect profits."}
          ].map((item,i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-3xl p-8">
              <div className="text-emerald-400 mb-6">{item.icon}</div>
              <div className="font-semibold text-2xl mb-3 tracking-tight">{item.t}</div>
              <p className="text-white/60 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-xs text-white/40">
        <div className="max-w-6xl mx-auto px-8">Personal Dashboard • Connect your Render bot for live signals</div>
      </footer>

      {selectedSignal && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6" onClick={closeModal}>
          <div className="bg-[#111] border border-white/10 rounded-3xl max-w-2xl w-full" onClick={e=>e.stopPropagation()}>
            <div className="p-9">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-6xl font-semibold tracking-[-2px]">{selectedSignal.pair}</div>
                  <div className={`inline-flex mt-3 px-6 py-2 rounded-2xl text-base font-semibold ${selectedSignal.direction === 'BUY' ? 'bg-emerald-400 text-black' : 'bg-red-500 text-white'}`}>{selectedSignal.direction}</div>
                </div>
                <button onClick={closeModal} className="text-white/60"><X size={24}/></button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-9">
                <div className="bg-[#0a0a0a] p-5 rounded-2xl"><div className="text-xs text-white/50">ENTRY</div><div className="font-mono text-3xl mt-2">{selectedSignal.entry}</div></div>
                <div className="bg-[#0a0a0a] p-5 rounded-2xl"><div className="text-xs text-white/50">SL</div><div className="font-mono text-3xl mt-2 text-red-400">{selectedSignal.sl}</div></div>
                <div className="bg-[#0a0a0a] p-5 rounded-2xl"><div className="text-xs text-white/50">TPs</div><div className="font-mono text-3xl mt-2 text-emerald-400">{selectedSignal.tp1} / {selectedSignal.tp2}</div></div>
                <div className="bg-[#0a0a0a] p-5 rounded-2xl"><div className="text-xs text-white/50">PROB</div><div className={`font-mono text-3xl mt-2 ${selectedSignal.grade === 'A+' ? 'text-emerald-400' : 'text-white'}`}>{selectedSignal.grade} {selectedSignal.probability}%</div></div>
              </div>

              <div className="text-xl mb-6">{selectedSignal.confluence}</div>
              <div className="text-white/70 leading-relaxed mb-8">{selectedSignal.fullAnalysis}</div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-sm">
                <div className="font-medium text-emerald-400 mb-3">Risk & Exit Rules</div>
                <ul className="space-y-2 text-white/70">
                  <li>• Tight SL beyond swept liquidity</li>
                  <li>• Scale out at TP1 & TP2. Let runner go to TP3 or CHOCH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}