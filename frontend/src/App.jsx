import React, { useState } from 'react';
import Hero from './components/Hero';
import SymptomForm from './components/SymptomForm';
import TriageCard from './components/TriageCard';
import ProviderList from './components/ProviderList';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import DevDrawer from './components/DevDrawer';

import { triageSymptoms, fetchProviders, createBooking } from './services/api';
import { HeartPulse, WifiOff, AlertTriangle } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1); // 1: Input, 2: TriageCard, 3: ProviderList, 4: BookingConfirmation
  const [symptomText, setSymptomText] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [providers, setProviders] = useState([]);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  
  // Developer Mode / Easter Egg States
  const [logoClicks, setLogoClicks] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);
  const [appTheme, setAppTheme] = useState('default'); // 'default', 'matrix', 'sunset'
  const [sessionBookings, setSessionBookings] = useState([]);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [apiError, setApiError] = useState('');
  const [backendStatus, setBackendStatus] = useState('unknown'); // 'online', 'offline', 'unknown'

  // Step 1: Submit Symptoms -> Trigger simulated & real analysis
  const handleSymptomSubmit = async (symptoms) => {
    setIsLoading(true);
    setApiError('');
    setSymptomText(symptoms);

    try {
      // Simulate clinical reasoning delay for realistic processing feedback
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const triageData = await triageSymptoms(symptoms);
      setTriageResult(triageData);
      setBackendStatus('online');
      setStep(2);
    } catch (error) {
      console.error('App triage error:', error);
      setBackendStatus('offline');
      setApiError(
        'Unable to connect to the Vaidya clinical engine. Please ensure the backend is running at http://localhost:5005.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: User approves triage and proceeds to doctor recommendations
  const handleProceedToBooking = async () => {
    if (!triageResult) return;
    setIsLoading(true);
    setApiError('');

    try {
      const providerData = await fetchProviders(triageResult.specialty);
      setProviders(providerData);
      setStep(3);
    } catch (error) {
      console.error('App fetch providers error:', error);
      setApiError('Unable to load matching healthcare providers. Please check backend status.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Complete One-Click Booking
  const handleBookAppointment = async (bookingDetails) => {
    setIsBooking(true);
    setApiError('');

    try {
      // Attach the original symptoms summary for doctor intake context
      const fullBookingPayload = {
        ...bookingDetails,
        symptomSummary: symptomText
      };

      const bookingResult = await createBooking(fullBookingPayload);
      setConfirmedBooking(bookingResult);
      setSessionBookings(prev => [...prev, bookingResult]);
      setStep(4);
    } catch (error) {
      console.error('App booking error:', error);
      setApiError('Failed to confirm your booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Developer Logo Clicks Tracker
  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      if (prev + 1 >= 5) {
        setIsDevMode(true);
        return 0;
      }
      return prev + 1;
    });
  };

  // Reset state to step 1
  const handleReset = () => {
    setStep(1);
    setSymptomText('');
    setTriageResult(null);
    setProviders([]);
    setConfirmedBooking(null);
    setApiError('');
  };

  const themeClass = {
    default: 'theme-default',
    matrix: 'theme-matrix bg-black',
    sunset: 'theme-sunset'
  }[appTheme] || 'theme-default';

  return (
    <div className={`flex flex-col min-h-screen relative transition-all duration-500 ${themeClass}`}>
      <BackgroundEffects />

      {/* Main Core Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col justify-start">
        {/* Error Alert Display */}
        {apiError && (
          <div className="max-w-2xl mx-auto w-full mb-6 p-4 bg-red-950/30 border border-red-500/20 rounded-2xl flex items-start gap-3 text-left animate-pulse-slow">
            <WifiOff className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 text-xs font-bold font-display uppercase tracking-wider">Connection Failure</h4>
              <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{apiError}</p>
            </div>
          </div>
        )}

        {/* Dynamic Loading State Indicator */}
        {isLoading && step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 fade-in-up">
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-teal-500/20 bg-teal-500/5 animate-ping absolute" />
              <div className="w-16 h-16 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center animate-heartbeat">
                <HeartPulse className="w-8 h-8 text-teal-400" />
              </div>
            </div>
            <h3 className="font-display font-bold text-lg text-slate-200 mt-8">Analyzing Symptoms</h3>
            <p className="text-slate-500 text-xs mt-1.5 max-w-xs text-center leading-relaxed">
              Extracting clinical indicators, estimating risk levels, and identifying medical specialties...
            </p>
          </div>
        )}

        {/* Steps Assembly */}
        {!isLoading && step === 1 && (
          <>
            <Hero onLogoClick={handleLogoClick} />
            <SymptomForm onSubmit={handleSymptomSubmit} isLoading={isLoading} />
          </>
        )}

        {step === 2 && triageResult && (
          <TriageCard
            result={triageResult}
            originalSymptoms={symptomText}
            onNextStep={handleProceedToBooking}
            onReset={handleReset}
          />
        )}

        {step === 3 && (
          <ProviderList
            providers={providers}
            specialty={triageResult?.specialty || 'General Physician'}
            onBack={() => setStep(2)}
            onBookAppointment={handleBookAppointment}
            isBooking={isBooking}
          />
        )}

        {step === 4 && confirmedBooking && (
          <BookingConfirmation booking={confirmedBooking} onReset={handleReset} />
        )}
      </main>

      {/* Persistent Sticky Footer */}
      <Footer backendStatus={backendStatus} />

      {/* Secret Developer Mode Drawer Overlay */}
      <DevDrawer
        isOpen={isDevMode}
        onClose={() => setIsDevMode(false)}
        currentTheme={appTheme}
        onThemeChange={setAppTheme}
        mockBookings={sessionBookings}
        onClearBookings={() => setSessionBookings([])}
      />
    </div>
  );
}
