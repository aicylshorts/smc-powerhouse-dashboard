"use client";

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, X, TrendingUp, Target, Shield, Clock, Users } from 'lucide-react';

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
    id: 1,
    pair: "XAU_USD",
    direction: "BUY",
    entry: 2652.80,
    sl: 2649.10,
    tp1: 2656.50,
    tp2: 2662.00,
    tp3: 2670.50,
    probability: 89,
    grade: "A+",
    timeframe: "15m",
    confluence: "Liquidity sweep of equal highs + 50% FVG fill + strong OB demand",
    fullAnalysis: "Inducement sweep above previous highs took out retail stops. Price returned into the 0.5 FVG and found acceptance at a clear Order Block. High confluence for continuation. Tight SL below swept liquidity. Dynamic TPs targeting internal + external liquidity.",
    timestamp: "2026-05-31 14:22 WAT",
    rrPotential: "Up to 5R+"
  },
  {
    id: 2,
    pair: "EURUSD",
    direction: "SELL",
    entry: 1.0852,
    sl: 1.0878,
    tp1: 1.0825,
    tp2: 1.0790,
    probability: 76,
    grade: "A",
    timeframe: "1h",
    confluence: "Liquidity grab below equal lows + FVG + bearish OB at supply",
    fullAnalysis: "Classic liquidity sweep below session lows. Price reversed from the FVG and is respecting the bearish Order Block. Good structure break on lower timeframe. Watch for CHOCH on 15m for early exit confirmation.",
    timestamp: "2026-05-31 13:45 WAT",
    rrPotential: "Up to 3.5R"
  },
  {
    id: 3,
    pair: "GBPJPY",
    direction: "BUY",
    entry: 199.85,
    sl: 199.35,
    tp1: 200.45,
    tp2: 201.20,
    tp3: 202.50,
    probability: 84,
    grade: "A+",
    timeframe: "15m",
    confluence: "Sweep of London lows + internal liquidity + 0.618 FVG + OB confluence",
    fullAnalysis: "Strong inducement sweep during Asian session. Price filled the FVG and bounced from the Order Block with clear displacement. Multiple timeframe confluence. Excellent sniper entry.",
    timestamp: "2026-05-31 12:10 WAT",
    rrPotential: "Up to 4R"
  },
  {
    id: 4,
    pair: "NAS100_USD",
    direction: "SELL",
    entry: 19850,
    sl: 19920,
    tp1: 19780,
    tp2: 19650,
    probability: 71,
    grade: "A",
    timeframe: "1h",
    confluence: "Equal highs sweep + premium array FVG + supply OB",
    fullAnalysis: "Inducement above recent highs. Rejection at supply zone with FVG confirmation. Indices often respect these levels well. Manage around news.",
    timestamp: "2026-05-31 11:30 WAT",
    rrPotential: "Up to 3R"
  },
  {
    id: 5,
    pair: "BTCUSD",
    direction: "BUY",
    entry: 68240,
    sl: 67850,
    tp1: 68750,
    tp2: 69500,
    probability: 82,
    grade: "A+",
    timeframe: "4h",
    confluence: "Sweep of weekly low + strong demand OB + FVG alignment",
    fullAnalysis: "Bitcoin swept the weekly liquidity low perfectly. Strong displacement back into value with Order Block support. Higher timeframe bias bullish. Good for swing with tight risk.",
    timestamp: "2026-05-31 09:15 WAT",
    rrPotential: "Up to 4.5R"
  },
  {
    id: 6,
    pair: "USDJPY",
    direction: "SELL",
    entry: 157.25,
    sl: 157.85,
    tp1: 156.60,
    tp2: 155.80,
    probability: 68,
    grade: "A",
    timeframe: "15m",
    confluence: "Liquidity sweep above Tokyo highs + bearish FVG + supply zone",
    fullAnalysis: "Typical JPY inducement. Sweep took stops above the range. Clean return into FVG and rejection at supply. Watch BoJ related news but structure is clear.",
    timestamp: "2026-05-31 08:50 WAT",
    rrPotential: "Up to 3R"
  }
];

export default function SMCPowerhouseDashboard() {
  const [activeAssetFilter, setActiveAssetFilter] = useState<string>('all');
  const [activeProbFilter, setActiveProbFilter] = useState<'all' | 'A+' | 'A'>('all');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  const assets = ['all', 'XAU_USD', 'EURUSD', 'GBPJPY', 'NAS100_USD', 'BTCUSD', 'USDJPY'];

  const filteredSignals = mockSignals
    .filter(signal => {
      const assetMatch = activeAssetFilter === 'all' || signal.pair === activeAssetFilter;
      const probMatch = activeProbFilter === 'all' || signal.grade === activeProbFilter;
      return assetMatch && probMatch;
    })
    .sort((a, b) => b.probability - a.probability);

  const openModal = (signal: Signal) => {
    setSelectedSignal(signal);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedSignal(null);
    document.body.style.overflow = 'visible';
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'BUY' ? 'direction-buy' : 'direction-sell';
  };

  const getProbColor = (grade: string) => {
    return grade === 'A+' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
              <Target className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-xl">SMC Powerhouse</div>
              <div className="text-[10px] text-zinc-500 -mt-1">HIGH PROBABILITY SIGNALS</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#signals" className="hover:text-emerald-400 transition-colors">Signals</a>
            <a href="#performance" className="hover:text-emerald-400 transition-colors">Performance</a>
            <a href="#edge" className="hover:text-emerald-400 transition-colors">The Edge</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Get Premium
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs tracking-[2px] mb-6">
          POWERED BY YOUR RENDER BOT • WAT TIMEZONE
        </div>
        
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          Institutional-grade<br />SMC signals.<br />
          <span className="text-emerald-400">On the web.</span>
        </h1>
        
        <p className="max-w-md mx-auto text-xl text-zinc-400 mb-10">
          High-confluence setups from liquidity sweeps, FVGs & Order Blocks. A/A+ probability only.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('signals')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl flex items-center justify-center gap-3 text-lg transition-all active:scale-[0.985]"
          >
            View Live Signals
          </button>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-zinc-700 hover:bg-zinc-900 rounded-2xl text-lg transition-all"
          >
            See Pricing
          </button>
        </div>

        <div className="mt-8 text-xs text-zinc-500 flex items-center justify-center gap-2">
          <Clock className="w-3.5 h-3.5" /> All times in WAT (UTC+1) • No high-impact news periods
        </div>
      </div>

      {/* Signals Section */}
      <div id="signals" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-emerald-400 text-sm tracking-[3px] font-mono mb-1">LIVE FEED</div>
            <h2 className="text-4xl font-semibold tracking-tight">High-Probability Signals</h2>
          </div>
          <div className="text-sm text-zinc-500">{filteredSignals.length} setups • Updated moments ago</div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
            {assets.map(asset => (
              <button
                key={asset}
                onClick={() => setActiveAssetFilter(asset)}
                className={`filter-btn px-5 py-2 text-sm rounded-[14px] border border-transparent ${activeAssetFilter === asset ? 'active bg-zinc-950 border-zinc-700' : 'hover:bg-zinc-950'}`}
              >
                {asset === 'all' ? 'All Assets' : asset}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-2xl border border-zinc-800 ml-auto">
            {(['all', 'A+', 'A'] as const).map(prob => (
              <button
                key={prob}
                onClick={() => setActiveProbFilter(prob)}
                className={`filter-btn px-6 py-2 text-sm rounded-[14px] border border-transparent ${activeProbFilter === prob ? 'active bg-zinc-950 border-zinc-700' : 'hover:bg-zinc-950'}`}
              >
                {prob === 'all' ? 'All Probabilities' : prob}
              </button>
            ))}
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSignals.map((signal) => (
            <div 
              key={signal.id} 
              className="signal-card bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-mono text-2xl font-semibold tracking-tighter">{signal.pair}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{signal.timeframe} • {signal.timestamp}</div>
                </div>
                <div className={`px-4 py-1.5 rounded-2xl text-sm font-semibold flex items-center gap-1.5 ${getDirectionColor(signal.direction)}`}>
                  {signal.direction === 'BUY' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {signal.direction}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-5">
                <div>
                  <div className="text-zinc-500 text-xs">ENTRY</div>
                  <div className="font-mono text-lg font-medium">{signal.entry}</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">SL</div>
                  <div className="font-mono text-lg font-medium text-red-400">{signal.sl}</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-xs">TP1 / TP2</div>
                  <div className="font-mono text-lg font-medium text-emerald-400">{signal.tp1} / {signal.tp2}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className={`prob-badge px-4 py-1 rounded-2xl text-sm border ${getProbColor(signal.grade)}`}>
                  {signal.grade} • {signal.probability}%
                </div>
                <div className="text-xs px-3 py-1 bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-400">
                  {signal.rrPotential}
                </div>
              </div>

              <div className="text-sm text-zinc-400 mb-5 line-clamp-2">
                {signal.confluence}
              </div>

              <button 
                onClick={() => openModal(signal)}
                className="mt-auto w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                View Full SMC Analysis
              </button>
            </div>
          ))}
        </div>

        {filteredSignals.length === 0 && (
          <div className="text-center py-12 text-zinc-500">No signals match current filters.</div>
        )}
      </div>

      {/* Performance Section */}
      <div id="performance" className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-emerald-400" />
            <h2 className="text-3xl font-semibold tracking-tight">Performance Overview</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[ 
              { label: "Win Rate (30d)", value: "68%", sub: "A/A+ only" },
              { label: "Profit Factor", value: "2.4", sub: "Strong edge" },
              { label: "Avg RR Achieved", value: "3.1R", sub: "Dynamic TPs" },
              { label: "Signals (30d)", value: "47", sub: "High quality" }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <div className="text-sm text-zinc-500">{stat.label}</div>
                <div className="text-5xl font-semibold tracking-tighter mt-2 mb-1">{stat.value}</div>
                <div className="text-xs text-emerald-400">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="text-xs uppercase tracking-widest text-zinc-500 mb-3 px-1">RECENT CLOSED SETUPS (SAMPLE)</div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800 text-zinc-400">
                <tr>
                  <th className="text-left p-5 font-normal">Pair</th>
                  <th className="text-left p-5 font-normal">Direction</th>
                  <th className="text-left p-5 font-normal">Result</th>
                  <th className="text-right p-5 font-normal">RR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {[
                  ["XAU_USD", "BUY", "+3.8R", "Win"],
                  ["EURUSD", "SELL", "+2.1R", "Win"],
                  ["GBPJPY", "BUY", "-1R", "Loss"],
                  ["BTCUSD", "BUY", "+4.2R", "Win"],
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-5 font-mono">{row[0]}</td>
                    <td className="p-5">{row[1]}</td>
                    <td className={`p-5 font-medium ${row[3] === 'Win' ? 'text-emerald-400' : 'text-red-400'}`}>{row[2]}</td>
                    <td className="p-5 text-right font-mono text-emerald-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 mt-4 px-1">Connect your bot API to show real tracked performance and closed trades.</p>
        </div>
      </div>

      {/* The Edge Section */}
      <div id="edge" className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mb-12">
          <div className="text-emerald-400 text-sm tracking-[3px] mb-2">THE METHOD</div>
          <h2 className="text-4xl font-semibold tracking-tight">The SMC Edge We Trade</h2>
          <p className="mt-4 text-zinc-400">We only take A and A+ setups with multiple confluences. No noise. No low-probability trades.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: <Shield className="w-6 h-6" />, title: "Liquidity Sweeps First", desc: "We wait for clear inducement. Stops swept = smart money entry. Retail trapped." },
            { icon: <Target className="w-6 h-6" />, title: "FVG + Order Block", desc: "Entry only at high-probability zones: 50% FVG fill or OB after sweep. Sniper precision." },
            { icon: <Users className="w-6 h-6" />, title: "Structure & Exit", desc: "Monitor for CHOCH on lower timeframes. Dynamic partials. Protect profits on reversal signals." }
          ].map((item, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="text-emerald-400 mb-4">{item.icon}</div>
              <div className="font-semibold text-xl mb-3">{item.title}</div>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-zinc-900 border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-emerald-400 text-sm tracking-[3px] mb-3">MONETIZE YOUR EDGE</div>
            <h2 className="text-4xl font-semibold tracking-tight">Turn signals into revenue</h2>
            <p className="text-zinc-400 mt-3 max-w-md mx-auto">Start free. Upgrade when ready. Full Stripe & Paystack integration ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col">
              <div className="mb-auto">
                <div className="text-sm text-zinc-500">STARTER</div>
                <div className="text-5xl font-semibold tracking-tighter mt-3 mb-1">Free</div>
                <div className="text-zinc-500 mb-8">Forever</div>

                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Latest 4 signals</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Basic filters</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Public performance view</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Telegram alerts link</li>
                </ul>
              </div>
              <button className="mt-8 w-full py-4 border border-zinc-700 rounded-2xl hover:bg-zinc-900 transition-colors">Current Plan</button>
            </div>

            {/* Pro */}
            <div className="bg-zinc-950 border-2 border-emerald-500 rounded-3xl p-8 flex flex-col relative">
              <div className="absolute -top-3 right-6 bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider">MOST POPULAR</div>
              <div className="mb-auto">
                <div className="text-sm text-emerald-400">PRO</div>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-5xl font-semibold tracking-tighter">₦12,000</span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <div className="text-xs text-zinc-500 mb-8">or $19 USD • Cancel anytime</div>

                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> <strong>All live signals</strong></li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Full history + analytics</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Priority A+ setups first</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Advanced filters & export</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Dedicated Telegram channel</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Early access to new features</li>
                </ul>
              </div>
              <button 
                onClick={() => alert('Stripe checkout ready. We can activate subscriptions in minutes. Contact to go live.')}
                className="mt-8 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl transition-all"
              >
                Subscribe to Pro
              </button>
            </div>

            {/* Lifetime */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col">
              <div className="mb-auto">
                <div className="text-sm text-zinc-500">LIFETIME ACCESS</div>
                <div className="text-5xl font-semibold tracking-tighter mt-3 mb-1">₦85,000</div>
                <div className="text-xs text-zinc-500 mb-8">One-time • ~$99 USD</div>

                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Everything in Pro</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Lifetime updates</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Priority support</li>
                  <li className="flex gap-3"><span className="text-emerald-400">•</span> Future API access</li>
                </ul>
              </div>
              <button 
                onClick={() => alert('One-time payment via Stripe/Paystack ready to enable.')}
                className="mt-8 w-full py-4 border border-emerald-500/60 hover:bg-emerald-500/10 text-emerald-400 rounded-2xl transition-colors font-medium"
              >
                Get Lifetime Access
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-10">Payments via Stripe or Paystack (Naira friendly). You keep ~97%.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-6 text-xs text-zinc-500 flex flex-col md:flex-row justify-between gap-y-3">
          <div>© SMC Powerhouse • Built for serious SMC traders</div>
          <div className="flex gap-x-6">
            <span>Not financial advice. Trade responsibly.</span>
            <span>Connect your Render bot for live data →</span>
          </div>
        </div>
      </footer>

      {/* Signal Detail Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6" onClick={closeModal}>
          <div 
            className="modal bg-zinc-900 border border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-4xl font-semibold tracking-tighter">{selectedSignal.pair}</div>
                    <div className={`px-5 py-2 rounded-2xl text-base font-semibold flex items-center gap-2 ${getDirectionColor(selectedSignal.direction)}`}>
                      {selectedSignal.direction === 'BUY' ? <ArrowUp /> : <ArrowDown />}
                      {selectedSignal.direction}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">{selectedSignal.timeframe} • {selectedSignal.timestamp}</div>
                </div>
                <button onClick={closeModal} className="text-zinc-400 hover:text-white p-2 -mr-2"><X size={20} /></button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-950 p-4 rounded-2xl">
                  <div className="text-xs text-zinc-500">ENTRY</div>
                  <div className="font-mono text-2xl mt-1">{selectedSignal.entry}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl">
                  <div className="text-xs text-zinc-500">STOP LOSS</div>
                  <div className="font-mono text-2xl mt-1 text-red-400">{selectedSignal.sl}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl">
                  <div className="text-xs text-zinc-500">TP1 • TP2</div>
                  <div className="font-mono text-2xl mt-1 text-emerald-400">{selectedSignal.tp1} • {selectedSignal.tp2}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl">
                  <div className="text-xs text-zinc-500">PROBABILITY</div>
                  <div className={`font-mono text-2xl mt-1 ${selectedSignal.grade === 'A+' ? 'text-emerald-400' : 'text-blue-400'}`}>{selectedSignal.grade} {selectedSignal.probability}%</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-3">SMC CONFLUENCE</div>
                <div className="text-lg leading-tight">{selectedSignal.confluence}</div>
              </div>

              <div className="mb-8">
                <div className="uppercase text-xs tracking-[2px] text-emerald-400 mb-3">FULL ANALYSIS</div>
                <p className="text-zinc-300 leading-relaxed">{selectedSignal.fullAnalysis}</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm">
                <div className="font-medium mb-2 flex items-center gap-2 text-emerald-400">
                  <Shield className="w-4 h-4" /> RISK & EXIT RULES
                </div>
                <ul className="space-y-2 text-zinc-400">
                  <li>• Tight SL beyond swept liquidity (never move against you)</li>
                  <li>• Partial profits at TP1 & TP2. Let runner run to TP3 or opposite CHOCH</li>
                  <li>• Exit or tighten on lower timeframe CHOCH / structure break</li>
                  <li>• Skip if major news in next 2 hours for this pair</li>
                </ul>
              </div>

              <div className="mt-6 text-xs text-center text-zinc-500">
                This is an A/A+ setup only. Trade responsibly. Not financial advice.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}