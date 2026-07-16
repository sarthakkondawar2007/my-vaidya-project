import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-950">
      {/* Ambient Floating Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animate-float-slower" />
      
      {/* Radial overlay to make edges darker for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.8)_100%)]" />

      {/* Repeating Dotted grid for medical diagnostics monitor look */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Interactive EKG Wave Sweep (SVG) */}
      <svg
        className="absolute bottom-[20%] left-0 w-full h-[300px] opacity-[0.06]"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,150 
             L 150,150 
             Q 160,150 165,142 
             T 175,100 
             T 185,220 
             T 195,160 
             T 205,150 
             L 400,150 
             Q 410,150 415,142 
             T 425,100 
             T 435,220 
             T 445,160 
             T 455,150 
             L 700,150 
             Q 710,150 715,142 
             T 725,100 
             T 735,220 
             T 745,160 
             T 755,150 
             L 950,150 
             Q 960,150 965,142 
             T 975,100 
             T 985,220 
             T 995,160 
             T 1005,150 
             L 1200,150"
          fill="none"
          stroke="url(#ekg-glow)"
          strokeWidth="3"
          strokeDasharray="1500"
          strokeDashoffset="1500"
          className="animate-ekg"
        />
        <defs>
          <linearGradient id="ekg-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
            <stop offset="15%" stopColor="#0d9488" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="1" />
            <stop offset="85%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
