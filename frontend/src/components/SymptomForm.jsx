import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

const SUGGESTIONS = [
  {
    label: "🚨 Hulk Alert (Emergency)",
    text: "I turned green, grew 3x my size, and ripped my shirt after my git push failed.",
    desc: "Red Triage"
  },
  {
    label: "⚠️ Caffeine Crisis (Urgent)",
    text: "My coffee machine broke, and now I have a high fever of 103°F, severe stomach pain, and vomiting.",
    desc: "Orange Triage"
  },
  {
    label: "📅 Standard Code Flu (Routine)",
    text: "I've had a mild cough, congestion, and itchy skin rash for 3 days.",
    desc: "Yellow Triage"
  },
  {
    label: "🏠 Minor Glitch (Self-Care)",
    text: "My throat feels slightly dry and I have a minor paper cut on my index finger.",
    desc: "Green Triage"
  }
];

export default function SymptomForm({ onSubmit, isLoading }) {
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your symptoms first.');
      return;
    }
    if (symptoms.trim().length < 10) {
      setError('Please provide a bit more detail about your symptoms (minimum 10 characters).');
      return;
    }
    setError('');
    onSubmit(symptoms.trim());
  };

  const handleSuggestionClick = (text) => {
    setError('');
    setSymptoms('');
    
    let currentText = '';
    let index = 0;
    
    if (window.typewriterInterval) {
      clearInterval(window.typewriterInterval);
    }
    
    window.typewriterInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setSymptoms(currentText);
        index++;
      } else {
        clearInterval(window.typewriterInterval);
      }
    }, 12); // Speed of 12ms per letter
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 fade-in-up">
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <label htmlFor="symptoms-input" className="block text-left text-sm font-semibold text-slate-300 mb-2 font-display">
          Describe what you are feeling:
        </label>
        
        <div className="relative">
          <textarea
            id="symptoms-input"
            rows="4"
            className="w-full bg-slate-900/80 text-white placeholder-slate-500 rounded-2xl p-4 border border-slate-700/60 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/50 transition-all font-sans text-sm md:text-base resize-none"
            placeholder="Type your symptoms here (e.g., 'I have a sore throat, mild cough, and fever for 2 days'). Please include how long you've had them..."
            value={symptoms}
            onChange={(e) => {
              setSymptoms(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-3 text-red-400 text-xs md:text-sm text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none text-sm md:text-base font-display"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Symptoms...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Analyze Symptoms</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-8">
        <p className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Quick test cases (Click to pre-fill):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSuggestionClick(sug.text)}
              disabled={isLoading}
              className="glass-panel text-left p-3.5 rounded-2xl hover:border-slate-700 active:scale-[0.99] transition-all flex flex-col justify-between group disabled:opacity-50 text-xs cursor-pointer"
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-semibold text-slate-300">{sug.label}</span>
                <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                  {sug.desc}
                </span>
              </div>
              <p className="text-slate-400 group-hover:text-slate-200 line-clamp-2 leading-relaxed">
                {sug.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
