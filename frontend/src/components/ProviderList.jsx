import React, { useState } from 'react';
import { Star, MapPin, CalendarDays, ArrowLeft, Check, Phone, User, Stethoscope } from 'lucide-react';

export default function ProviderList({ providers, specialty, onBack, onBookAppointment, isBooking }) {
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [formError, setFormError] = useState('');

  const handleSelectSlot = (providerId, slot) => {
    setSelectedProviderId(providerId);
    setSelectedSlot(slot);
    setFormError('');
  };

  const handleBookingSubmit = (e, provider) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setFormError('Please enter the patient\'s name.');
      return;
    }
    if (!patientPhone.trim()) {
      setFormError('Please enter a contact phone number.');
      return;
    }
    setFormError('');
    onBookAppointment({
      providerId: provider.id,
      providerName: provider.name,
      specialty: provider.specialty,
      dateSlot: selectedSlot,
      userName: patientName.trim(),
      userPhone: patientPhone.trim(),
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0 text-left fade-in-up">
      {/* Navigation Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <span>Available {specialty}s</span>
          </h2>
          <p className="text-xs text-slate-500">Based on your symptom triage results</p>
        </div>
      </div>

      {providers.length === 0 ? (
        <div className="glass-panel rounded-3xl p-8 text-center text-slate-400">
          <p className="font-semibold text-slate-300 mb-2">No matching specialists found online.</p>
          <p className="text-sm">Please schedule a consult with a General Physician instead.</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-all text-xs"
          >
            Back to Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {providers.map((doc) => {
            const isCurrentlySelected = selectedProviderId === doc.id;
            
            return (
              <div
                key={doc.id}
                className={`glass-panel rounded-3xl p-5 md:p-6 border transition-all duration-300 ${
                  isCurrentlySelected ? 'border-teal-500/40 bg-slate-800/40 ring-1 ring-teal-500/10' : 'border-slate-800/60 hover:border-slate-700/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  {/* Doctor Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-700/50 shadow-md">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>

                  {/* Doctor Details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-lg text-slate-100">{doc.name}</h3>
                      <span className="bg-slate-900 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-800">
                        {doc.experience}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-500" />
                      <span>{doc.location}</span>
                    </p>

                    <p className="text-slate-400 text-xs leading-relaxed italic pr-2">
                      "{doc.bio}"
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-slate-900/50 border border-slate-800/60 rounded-lg px-2 py-1 w-fit">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating} / 5.0</span>
                    </div>
                  </div>
                </div>

                {/* Slots selection */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-display">
                    <CalendarDays className="w-4 h-4 text-teal-400/80" /> Select Availability
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {doc.slots.map((slot, index) => {
                      const isSlotSelected = isCurrentlySelected && selectedSlot === slot;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectSlot(doc.id, slot)}
                          className={`py-2 px-3 rounded-xl border text-center transition-all text-xs font-medium cursor-pointer ${
                            isSlotSelected
                              ? 'bg-teal-500 text-slate-950 font-bold border-teal-500'
                              : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Information Form (Shows Inline when Slot is Selected) */}
                {isCurrentlySelected && selectedSlot && (
                  <form
                    onSubmit={(e) => handleBookingSubmit(e, doc)}
                    className="mt-5 p-4 rounded-2xl bg-slate-950/40 border border-teal-500/10 space-y-4 fade-in-up"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-teal-400 font-display">
                        Confirming: {selectedSlot}
                      </p>
                      <span className="text-[10px] text-slate-500">Secure One-Click Booking</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <label className="sr-only">Patient Name</label>
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 text-white placeholder-slate-500 rounded-xl py-2 pl-9 pr-4 border border-slate-700/60 focus:outline-none focus:border-teal-500 text-xs"
                          placeholder="Patient Full Name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          disabled={isBooking}
                        />
                      </div>

                      <div className="relative">
                        <label className="sr-only">Phone Number</label>
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          className="w-full bg-slate-900/80 text-white placeholder-slate-500 rounded-xl py-2 pl-9 pr-4 border border-slate-700/60 focus:outline-none focus:border-teal-500 text-xs"
                          placeholder="Contact Phone Number"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          disabled={isBooking}
                        />
                      </div>
                    </div>

                    {formError && (
                      <p className="text-red-400 text-xs mt-1 text-left">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-display active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      {isBooking ? (
                        <>
                          <div className="w-3.5 h-3.5 border border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Securing Appointment...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Confirm One-Click Booking</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
