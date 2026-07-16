import React from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Undo2, 
  CheckCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export default function TriageCard({ result, originalSymptoms, onNextStep, onReset }) {
  if (!result) return null;

  const { urgency, urgencyTitle, specialty, analysis, keySymptoms, advice } = result;

  // Configuration for triage states
  const config = {
    Red: {
      colorClass: 'text-red-400',
      bgClass: 'bg-red-950/40 border-red-500/40',
      shadowClass: 'shadow-glow-red shadow-red-500/10',
      badgeClass: 'bg-red-500/20 text-red-300 border-red-500/30',
      Icon: AlertOctagon,
      actionText: 'Find Nearest Emergency Rooms',
      isEmergency: true
    },
    Orange: {
      colorClass: 'text-amber-500',
      bgClass: 'bg-amber-950/30 border-amber-500/40',
      shadowClass: 'shadow-glow-red shadow-amber-500/10',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      Icon: AlertTriangle,
      actionText: 'Book Urgent Consultation',
      isEmergency: false
    },
    Yellow: {
      colorClass: 'text-yellow-400',
      bgClass: 'bg-yellow-950/20 border-yellow-500/30',
      shadowClass: 'shadow-slate-900/50',
      badgeClass: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
      Icon: Calendar,
      actionText: 'Book Appointment',
      isEmergency: false
    },
    Green: {
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-950/20 border-emerald-500/30',
      shadowClass: 'shadow-slate-900/50',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/25',
      Icon: Heart,
      actionText: 'Schedule Preventative Consultation',
      isEmergency: false
    }
  }[urgency] || {
    colorClass: 'text-slate-300',
    bgClass: 'bg-slate-900 border-slate-700',
    shadowClass: 'shadow-slate-900/50',
    badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    Icon: Heart,
    actionText: 'Book Appointment',
    isEmergency: false
  };

  const IconComponent = config.Icon;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 fade-in-up">
      <div className={`border rounded-3xl p-6 md:p-8 transition-all ${config.bgClass} ${config.shadowClass}`}>
        
        {/* Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-slate-900/80 border border-slate-800 ${config.colorClass}`}>
              <IconComponent className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Triage Classification</span>
              <h2 className={`font-display text-2xl font-bold ${config.colorClass}`}>
                {urgencyTitle}
              </h2>
            </div>
          </div>
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${config.badgeClass}`}>
              Urgency: {urgency}
            </span>
          </div>
        </div>

        {/* Clinical Assessment Detail */}
        <div className="text-left mt-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-display">
            <FileText className="w-4 h-4 text-teal-400/80" /> Clinical Assessment
          </h3>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed bg-slate-950/30 rounded-2xl p-4 border border-white/5">
            {analysis}
          </p>
        </div>

        {/* Suggested Specialty */}
        <div className="text-left mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-teal-400/80 font-bold uppercase tracking-wider">Recommended Specialty</p>
              <h4 className="font-display text-base font-bold text-slate-100">{specialty}</h4>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Booking Time</p>
            <p className="text-xs font-bold text-slate-300">Under 2 Minutes</p>
          </div>
        </div>

        {/* Key Symptoms Identified */}
        {keySymptoms && keySymptoms.length > 0 && (
          <div className="text-left mt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Symptoms Recognized</p>
            <div className="flex flex-wrap gap-2">
              {keySymptoms.map((sym, idx) => (
                <span key={idx} className="bg-slate-900/80 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-800">
                  {sym}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Immediate Advice Actions */}
        <div className="text-left mt-6 pb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recommended Actions</p>
          <ul className="space-y-2.5">
            {advice.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${config.colorClass}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning Callout for Emergency */}
        {config.isEmergency && (
          <div className="mt-6 p-4 bg-red-950/50 border border-red-500/30 rounded-2xl text-left">
            <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 font-display">
              <AlertOctagon className="w-4.5 h-4.5 text-red-500 animate-bounce-slow" /> Critical Alert
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              If your symptoms escalate or you cannot travel safely, please call 911 / 112 or local emergency dispatch immediately. Do not delay medical care.
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-8 border-t border-white/5 pt-6">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 hover:bg-slate-900 active:scale-[0.98] text-slate-300 py-3.5 px-5 rounded-2xl transition-all text-sm font-semibold font-display"
          >
            <Undo2 className="w-4 h-4" />
            <span>Describe Again</span>
          </button>
          
          <button
            type="button"
            onClick={onNextStep}
            className={`flex-1 flex items-center justify-center gap-2 text-slate-950 font-bold py-3.5 px-6 rounded-2xl active:scale-[0.98] transition-all text-sm font-display ${
              config.isEmergency
                ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/10'
                : 'bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 shadow-lg shadow-teal-500/20'
            }`}
          >
            <span>{config.actionText}</span>
            <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
