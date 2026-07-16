import React from 'react';
import { HeartPulse, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero({ onLogoClick }) {
  return (
    <div className="text-center py-8 md:py-12 fade-in-up">
      {/* Brand Header */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel text-xs md:text-sm font-medium text-teal-300 border border-teal-500/10 mb-6 shadow-glow-teal animate-pulse-slow">
        <Sparkles className="w-4 h-4 text-teal-400" />
        <span>AI-Powered Medical Triage</span>
      </div>

      <div className="flex justify-center items-center gap-3 mb-4 cursor-pointer select-none" onClick={onLogoClick} title="Developer Easter Egg: Click 5 times">
        <div className="p-2.5 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl shadow-lg shadow-teal-500/20 animate-logo-beat">
          <HeartPulse className="w-8 h-8 text-slate-950 stroke-[2.5]" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
          Vaidya
        </h1>
      </div>

      <p className="max-w-2xl mx-auto font-display text-2xl md:text-3xl font-semibold text-slate-200 mt-2 px-4 leading-snug">
        From confusion to the <span className="text-gradient-teal-emerald">right doctor</span> — in under <span className="text-teal-400 underline decoration-teal-400/30 underline-offset-4">2 minutes</span>.
      </p>

      <p className="max-w-md mx-auto text-sm md:text-base text-slate-400 mt-4 px-4 leading-relaxed font-sans">
        Briefly describe your symptoms below. Our clinical intelligence classifies urgency and immediately connects you to matching providers.
      </p>

      {/* Mini Badges */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400/80" /> Secure & Private
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400/80" /> Zero Wait Time
        </span>
      </div>
    </div>
  );
}
