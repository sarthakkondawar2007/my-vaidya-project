import React from 'react';
import { Calendar, CheckCircle2, Copy, MapPin, Phone, RefreshCw, User } from 'lucide-react';

export default function BookingConfirmation({ booking, onReset }) {
  if (!booking) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(booking.id || '');
    alert('Booking Reference copied to clipboard!');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 md:px-0 text-center fade-in-up">
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-emerald-500/25 shadow-xl relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
        
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 shadow-glow-teal animate-pulse-slow">
            <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
          </div>
        </div>

        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold font-display">
          Appointment Confirmed
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-100 mt-1 mb-6">
          You are all set!
        </h2>

        {/* Booking Details Card */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4 text-left space-y-3.5 mb-6 text-xs md:text-sm">
          {/* Reference ID */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Booking Reference</p>
              <p className="font-mono font-bold text-slate-300 tracking-wide mt-0.5">{booking.id}</p>
            </div>
            <button
              onClick={handleCopyRef}
              className="p-1.5 border border-slate-800 rounded-lg hover:border-slate-700 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              title="Copy Reference"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Doctor */}
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Provider</p>
              <p className="font-semibold text-slate-200">{booking.provider_name}</p>
              <p className="text-[10px] text-slate-400">{booking.specialty}</p>
            </div>
          </div>

          {/* Slot */}
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Date & Time</p>
              <p className="font-semibold text-slate-200">{booking.date_slot}</p>
            </div>
          </div>

          {/* Patient */}
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Patient Profile</p>
              <p className="font-semibold text-slate-200">{booking.user_name}</p>
              <p className="text-[10px] text-slate-400">Phone: {booking.user_phone}</p>
            </div>
          </div>
        </div>

        {/* Reminder Advice */}
        <div className="text-left bg-teal-950/20 border border-teal-500/15 rounded-xl p-3.5 mb-6 text-xs text-slate-300 leading-relaxed">
          <p className="font-bold text-teal-400 mb-1">📅 Add to Calendar</p>
          An SMS reminder has been sent to your phone. Please arrive 10 minutes prior to your slot for check-in.
        </div>

        {/* Reset Action */}
        <button
          onClick={onReset}
          className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 active:scale-[0.98] text-slate-200 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-xs md:text-sm font-display cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>New Symptom Triage</span>
        </button>
      </div>
    </div>
  );
}
