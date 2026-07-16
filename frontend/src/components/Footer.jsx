import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Footer({ backendStatus }) {
  return (
    <footer className="w-full mt-auto py-6 border-t border-slate-900 bg-slate-950/60 backdrop-blur text-center text-xs text-slate-500 font-sans">
      <div className="max-w-2xl mx-auto px-4 space-y-3">
        {/* Disclaimer Banner */}
        <div className="flex items-start sm:items-center justify-center gap-2 p-3 bg-red-950/20 border border-red-500/10 rounded-xl text-slate-400 text-[11px] leading-relaxed text-left sm:text-center">
          <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Note:</strong> Vaidya provides informational triage only and does not substitute professional medical advice. If you are experiencing a severe or life-threatening emergency, please visit the nearest emergency room or dial emergency services immediately.
          </span>
        </div>

        {/* Bottom Row: Copy and Engine Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[10px] text-slate-500 font-medium">
          <p>
            © {new Date().getFullYear()} Vaidya • Handcrafted with ♥ by <a href="https://github.com" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">Sarthak Kondawar</a>
          </p>

          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/60 rounded-full px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                backendStatus === 'offline' ? 'bg-red-400' : 'bg-teal-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                backendStatus === 'offline' ? 'bg-red-500' : 'bg-teal-500'
              }`}></span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              {backendStatus === 'offline' ? 'Engine Offline' : 'Engine Ready'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
