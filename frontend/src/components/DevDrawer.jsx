import React from 'react';
import { X, Terminal, Database, Palette, Trash2, Activity } from 'lucide-react';

export default function DevDrawer({ isOpen, onClose, currentTheme, onThemeChange, mockBookings, onClearBookings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col font-mono text-xs text-slate-300 fade-in-up">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-2 text-teal-400">
          <Terminal className="w-4 h-4" />
          <span className="font-bold tracking-tight">Sarthak's DevConsole</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Section 1: Themes */}
        <div className="space-y-3">
          <h3 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" /> Appearance Theme
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'default', label: '🏥 Standard Teal (Default)', desc: 'Clean, professional slate.' },
              { id: 'matrix', label: '📟 Retro Matrix (Term)', desc: 'Classic green phosphor monospaced.' },
              { id: 'sunset', label: '🌆 Sunset Pulse', desc: 'Vibrant rose-orange gradients.' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  currentTheme === t.id
                    ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-bold'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <p className="text-xs">{t.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Bookings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Active Mock DB
            </h3>
            {mockBookings.length > 0 && (
              <button
                onClick={onClearBookings}
                className="text-[10px] text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
          
          {mockBookings.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl text-center text-slate-500 text-[10px]">
              No active bookings found in memory. Confirm an appointment to inspect record layouts.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {mockBookings.map((b, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[10px] space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>{b.id}</span>
                    <span className="text-teal-400">Confirmed</span>
                  </div>
                  <p className="text-slate-400">Pat: {b.user_name}</p>
                  <p className="text-slate-400">Doc: {b.provider_name}</p>
                  <p className="text-slate-400">Time: {b.date_slot}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Tech Engine Variables */}
        <div className="space-y-3">
          <h3 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> System Environment
          </h3>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-850 space-y-1.5 text-[10px]">
            <p className="flex justify-between">
              <span className="text-slate-500">Framework:</span>
              <span className="text-slate-300">Vite React 19</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Styling:</span>
              <span className="text-slate-300">Tailwind v3.4</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Claude Integration:</span>
              <span className="text-slate-300">Mock Fallback</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Supabase:</span>
              <span className="text-slate-300">In-Memory MockDB</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer credits */}
      <div className="p-3 bg-slate-950 text-center text-[9px] text-slate-600 border-t border-slate-850">
        Vaidya Debug Panel v1.0.0
      </div>
    </div>
  );
}
