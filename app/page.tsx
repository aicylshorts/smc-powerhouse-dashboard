"use client";

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, X, Target, Shield, TrendingUp, Clock } from 'lucide-react';

interface Signal {
  id: number;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3?: number;
  probability: number;
  grade: 'A+' | 'A';
  timeframe: string;
  confluence: string;
  fullAnalysis: string;
  timestamp: string;
  rrPotential: string;
}

const mockSignals: Signal[] = [
  {
    id: 1, pair: "XAU_USD", direction: "BUY", entry: 2652.80, sl: 2649.10, tp1: 2656.50, tp2: 2662.00, tp3: 2670.50,
    probability: 89, grade: "A+", timeframe: "15m",
    confluence: "Liquidity sweep of equal highs + 50% FVG + strong OB demand",
    fullAnalysis: "Inducement sweep above previous highs. Price returned into the 0.5 FVG and found acceptance at a clear Order Block. High confluence for continuation.",
    timestamp: "2026-05-31 14:22 WAT", rrPotential: "Up to 5R+"
  },
  {
    id: 2, pair: "EURUSD", direction: "SELL", entry: 1.0852, sl: 1.0878, tp1: 1.0825, tp2: 1.0790,
    probability: 76, grade: "A", timeframe: "1h",
    confluence: "Liquidity grab below equal lows + FVG + bearish OB at supply",
    fullAnalysis: "Classic liquidity sweep below session lows. Price reversed from the FVG and is respecting the bearish Order Block.",
    timestamp: "2026-05-31 13:45 WAT", rrPotential: "Up to 3.5R"
  },
  {
    id: 3, pair: "GBPJPY", direction: "BUY", entry: 199.85, sl: 199.35, tp1: 200.45, tp2: 201.20, tp3: 202.50,
    probability: 84, grade: "A+", timeframe: "15m",
    confluence: "Sweep of London lows + internal liquidity + 0.618 FVG + OB confluence",
    fullAnalysis: "Strong inducement sweep. Price filled the FVG and bounced from the Order Block with clear displacement.",
    timestamp: "2026-05-31 12:10 WAT", rrPotential: "Up to 4R"
  },
  {
    id: 4, pair: "NAS100_USD", direction: "SELL", entry: 19850, sl: 19920, tp1: 19780, tp2: 19650,
    probability: 71, grade: "A", timeframe: "1h",
    confluence: "Equal highs sweep + premium array FVG + supply OB",
    fullAnalysis: "Inducement above recent highs. Rejection at supply zone with FVG confirmation.",
    timestamp: "2026-05-31 11:30 WAT", rrPotential: "Up to 3R"
  },
  {
    id: 5, pair: "BTCUSD", direction: "BUY", entry: 68240, sl: 67850, tp1: 68750, tp2: 69500,
    probability: 82, grade: "A+", timeframe: "4h",
    confluence: "Sweep of weekly low + strong demand OB + FVG alignment",
    fullAnalysis: "Bitcoin swept the weekly liquidity low. Strong displacement back into value with Order Block support.",
    timestamp: "2026-05-31 09:15 WAT", rrPotential: "Up to 4.5R"
  }
];

export default function SMCPowerhouseDashboard() {
  const [activeAssetFilter, setActiveAssetFilter] = useState<string>('all');
  const [activeProbFilter, setActiveProbFilter] = useState<'all' | 'A+' | 'A'>('all');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const assets = ['all', 'XAU_USD', 'EURUSD', 'GBPJPY', 'NAS100_USD', 'BTCUSD'];

  const filteredSignals = mockSignals
    .filter(s => (activeAssetFilter === 'all' || s.pair === activeAssetFilter) && (activeProbFilter === 'all' || s.grade === activeProbFilter))
    .sort((a, b) => b.probability - a.probability);

  const openModal = (signal: Signal) => { setSelectedSignal(signal); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setSelectedSignal(null); document.body.style.overflow = 'visible'; };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center">
              <Target className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-[-1.5px]">SMC Powerhouse</div>
              <div className="text-[10px] text-zinc-500 -mt-1.5">PERSONAL DASHBOARD</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="px-4 py-1.5 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Mock Data • Ready for your bot
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs tracking-[2px] mb-6 text-emerald-400">
            HIGH PROBABILITY • LIQUIDITY FOCUSED
          </div>
          <h1 className="text-7xl font-semibold tracking-[-3.5px] leading-none mb-6">
            Your edge.<br />Clean. Focused.<br />On the web.
          </h1>
          <p className="text-2xl text-zinc-400 max-w-md">
            High-confluence SMC setups. A/A+ only. Built for you.
          </p>
        </div>
      </div>

      {/* Signals Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-sm uppercase tracking-[3px] text-emerald-400 mb-1">LIVE SIGNALS</div>
            <h2 className="text-4xl font-semibold tracking-tight">Active Setups</h2>
          </div>
          <div className="text-sm text-zinc-500">{filteredSignals.length} signals • Updated just now</div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex bg-zinc-900 p-1 rounded-3xl border border-zinc-800">
            {assets.map(asset => (
              <button key={asset} onClick={() => setActiveAssetFilter(asset)}
                className={`px-6 py-2 text-sm rounded-[20px] transition-all ${activeAssetFilter === asset ? 'bg-white text-black font-medium' : 'hover:bg-zinc-800'}`}>
                {asset === 'all' ? 'All' : asset}
              </button>
            ))}
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-3xl border border-zinc-800">
            {(['all','A+','A'] as const).map(p => (
              <button key={p} onClick={() => setActiveProbFilter(p)}
                className={`px-6 py-2 text-sm rounded-[20px] transition-all ${activeProbFilter === p ? 'bg-white text-black font-medium' : 'hover:bg-zinc-800'}`}>
                {p === 'all' ? 'All Prob' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSignals.map(signal => (
            <div key={signal.id} onClick={() => openModal(signal)}
              className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-7 cursor-pointer transition-all active:scale-[0.985]">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-mono text-3xl font-semibold tracking-[-1px]">{signal.pair}</div>
                  <div className="text-xs text-zinc-500 mt-1">{signal.timeframe} • {signal.timestamp}</div>
                </div>
                <div className={`px-5 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 ${signal.direction === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {signal.direction === 'BUY' ? <ArrowUp className="w-4 h-4"/> : <ArrowDown className="w-4 h-4"/>}
                  {signal.direction}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm mb-6">
                <div><span className="text-zinc-500 block text-xs">ENTRY</span> <span className="font-mono text-xl">{signal.entry}</span></div>
                <div><span className="text-zinc-500 block text-xs">SL</span> <span className="font-mono text-xl text-red-400">{signal.sl}</span></div>
                <div><span className="text-zinc-500 block text-xs">TP1 / TP2</span> <span className="font-mono text-xl text-emerald-400">{signal.tp1} / {signal.tp2}</span></div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center px-4 py-1 rounded-2xl text-sm font-medium ${signal.grade === 'A+' ? 'bg-emerald-500 text-black' : 'bg-blue-500 text-white'}`}>
                  {signal.grade} • {signal.probability}%
                </div>
                <div className="text-xs text-zinc-400">{signal.rrPotential}</div>
              </div>

              <div className="mt-5 text-sm text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                {signal.confluence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-emerald-400" />
            <h3 className="text-3xl font-semibold tracking-tight">Performance</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {label: "Win Rate", value: "68%", note: "Last 30 days"},
              {label: "Profit Factor", value: "2.4", note: "Strong edge"},
              {label: "Avg R:R", value: "3.1R", note: "Dynamic TPs"},
              {label: "Setups", value: "47", note: "High quality only"}
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7">
                <div className="text-sm text-zinc-500">{stat.label}</div>
                <div className="text-6xl font-semibold tracking-[-2px] mt-3 mb-1">{stat.value}</div>
                <div className="text-xs text-emerald-400">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Edge */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="max-w-xl mb-10">
          <div className="text-emerald-400 text-sm tracking-[3px] mb-2">THE METHOD</div>
          <h3 className="text-4xl font-semibold tracking-tight">How I take these trades</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[ 
            {icon: <Shield />, title: "Liquidity First", desc: "Only enter after clear sweeps. Stops taken = smart money in."},
            {icon: <Target />, title: "Confluence Zones", desc: "FVG + Order Block alignment after inducement. Sniper entries only."},
            {icon: <Clock />, title: "Structure Exit", desc: "Watch lower timeframes for CHOCH. Dynamic partials. Protect the edge."}
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="text-emerald-400 mb-5">{item.icon}</div>
              <div className="font-semibold text-2xl mb-3 tracking-tight">{item.title}</div>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-8 flex justify-between">
          <div>Personal SMC Powerhouse Dashboard • For your eyes only</div>
          <div>Connect your Render bot for live data anytime</div>
        </div>
      </footer>

      {/* Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6" onClick={closeModal}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="p-9">
              <div className="flex justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="font-mono text-5xl font-semibold tracking-[-2px]">{selectedSignal.pair}</div>
                  <div className={`px-6 py-2.5 rounded-2xl text-base font-semibold flex items-center gap-2 ${selectedSignal.direction === 'BUY' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
                    {selectedSignal.direction}
                  </div>
                </div>
                <button onClick={closeModal}><X /></button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-9 text-sm">
                <div className="bg-zinc-950 p-5 rounded-2xl"><div className="text-xs text-zinc-500">ENTRY</div><div className="font-mono text-3xl mt-1">{selectedSignal.entry}</div></div>
                <div className="bg-zinc-950 p-5 rounded-2xl"><div className="text-xs text-zinc-500">SL</div><div className="font-mono text-3xl mt-1 text-red-400">{selectedSignal.sl}</div></div>
                <div className="bg-zinc-950 p-5 rounded-2xl"><div className="text-xs text-zinc-500">TPs</div><div className="font-mono text-3xl mt-1 text-emerald-400">{selectedSignal.tp1} / {selectedSignal.tp2}</div></div>
                <div className="bg-zinc-950 p-5 rounded-2xl"><div className="text-xs text-zinc-500">PROB</div><div className={`font-mono text-3xl mt-1 ${selectedSignal.grade === 'A+' ? 'text-emerald-400' : 'text-blue-400'}`}>{selectedSignal.grade} {selectedSignal.probability}%</div></div>
              </div>

              <div className="mb-8">
                <div className="text-xs tracking-[2px] text-emerald-400 mb-2">CONFLUENCE</div>
                <div className="text-xl leading-tight">{selectedSignal.confluence}</div>
              </div>

              <div className="mb-8 text-zinc-300 leading-relaxed">{selectedSignal.fullAnalysis}</div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm">
                <div className="font-medium text-emerald-400 mb-3 flex items-center gap-2"><Shield className="w-4 h-4" /> RISK & EXIT</div>
                <ul className="space-y-2 text-zinc-400 text-[15px]">
                  <li>• Tight SL beyond swept liquidity</li>
                  <li>• Scale out at TP1 & TP2. Runner to TP3 or opposite CHOCH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}