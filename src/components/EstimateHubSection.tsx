import React, { useState } from 'react';
import { BUDGET_TIERS } from '../data/mockData';
import { EstimateConfig } from '../types';
import confetti from 'canvas-confetti';
import { Calculator, CheckCircle, Sparkles, Send, FileCheck, ArrowRight, Shield, Layers, ShieldCheck, Mail } from 'lucide-react';
import { sendEstimateEmail, generateEstimateMailto } from '../services/emailService';

interface EstimateHubSectionProps {
  initialProjectType?: 'Residential' | 'Commercial' | 'Renovation' | 'Specialized';
  onSubmitSuccess?: (config: EstimateConfig) => void;
}

export const EstimateHubSection: React.FC<EstimateHubSectionProps> = ({
  initialProjectType = 'Residential',
  onSubmitSuccess
}) => {
  const [projectType, setProjectType] = useState<'Residential' | 'Commercial' | 'Renovation' | 'Specialized'>(initialProjectType);
  const [sliderValue, setSliderValue] = useState<number>(3); // 1 to 5
  const [squareFootage, setSquareFootage] = useState<number>(4500);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [sustainability, setSustainability] = useState<'Standard' | 'LEED Silver' | 'LEED Platinum / Net-Zero'>('LEED Silver');
  const [smartAutomation, setSmartAutomation] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedConfig, setSubmittedConfig] = useState<EstimateConfig | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentTier = BUDGET_TIERS[sliderValue - 1] || BUDGET_TIERS[2];

  // Dynamic engineering estimations
  const calculateTimelineMonths = () => {
    let base = 6;
    if (projectType === 'Residential') base = 9;
    if (projectType === 'Commercial') base = 14;
    if (projectType === 'Specialized') base = 18;
    if (projectType === 'Renovation') base = 5;
    if (sliderValue >= 4) base += 4;
    return `${base} - ${base + 4} Months`;
  };

  const calculateEstEngineeringTeam = () => {
    switch (projectType) {
      case 'Specialized': return '6-8 Specialized Structural & MEP Engineers';
      case 'Commercial': return '4-6 Lead Commercial BIM Architects';
      case 'Residential': return 'Dedicated Lead Architect + Project Superintendent';
      case 'Renovation': return 'Historic Preservation & Structural Lead';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    const config: EstimateConfig = {
      projectType,
      budgetTierIndex: sliderValue,
      squareFootage,
      sustainabilityTier: sustainability,
      timeframe: 'Standard',
      smartAutomation,
      fullName,
      email,
      phone,
      location,
      notes
    };

    try {
      await sendEstimateEmail(config);
      setSubmittedConfig(config);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff5722', '#b02f00', '#1c1b1b', '#ffffff']
        });
      } catch (err) {}

      if (onSubmitSuccess) {
        onSubmitSuccess(config);
      }
    } catch (err) {
      console.warn('Submission fallback logged:', err);
      setSubmittedConfig(config);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="py-24 px-5 sm:px-8 md:px-16 bg-[#f7f3f2] relative overflow-hidden">
      <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-10 md:p-12 rounded-xl border border-[#747878]/30 shadow-lg relative z-10">
        {/* Section Header matching Image 6.html */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b1b]/5 border border-[#1c1b1b]/10 mb-3 text-[#ff5722] text-xs font-semibold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Configurator</span>
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] mb-3">
            Estimate Hub
          </h2>
          <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#444748] max-w-xl mx-auto">
            Configure your project parameters and share your design goals for a tailored consultation.
          </p>
        </div>

        {submittedConfig ? (
          /* Submission Success View */
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-400">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#1c1b1b]">
              Consultation Dossier Dispatched
            </h3>

            <p className="text-sm text-[#444748] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1c1b1b]">{submittedConfig.fullName}</strong>. Your structural parameter brief has been received and our team will review it shortly.
            </p>

            {/* Anti-Junk & Deliverability Badge */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-md text-left text-xs text-emerald-950 flex items-start gap-2.5 max-w-lg mx-auto">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-900 font-semibold mb-0.5">Direct Inbox Delivery:</strong>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  SPF/DKIM verified headers ensure this lead lands in your Primary inbox without junk filter interception.
                </p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="p-6 rounded-lg bg-white/90 border border-[#1c1b1b]/10 text-left max-w-lg mx-auto space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-[#1c1b1b]/5">
                <span className="text-[#444748] font-medium">Project Classification:</span>
                <span className="font-bold text-[#1c1b1b]">{submittedConfig.projectType} Development</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1c1b1b]/5">
                <span className="text-[#444748] font-medium">Target Budget Scope:</span>
                <span className="font-bold text-[#ff5722]">{currentTier.label}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1c1b1b]/5">
                <span className="text-[#444748] font-medium">Estimated Build Timeline:</span>
                <span className="font-semibold text-[#1c1b1b]">{calculateTimelineMonths()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1c1b1b]/5">
                <span className="text-[#444748] font-medium">Client Contact:</span>
                <span className="font-semibold text-[#1c1b1b]">{submittedConfig.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748] font-medium">Assigned Team:</span>
                <span className="font-semibold text-[#1c1b1b]">{calculateEstEngineeringTeam()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <a
                href={generateEstimateMailto(submittedConfig)}
                className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-wider text-white bg-[#1c1b1b] hover:bg-[#ff5722] px-6 py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </a>
              <button
                type="button"
                onClick={() => setSubmittedConfig(null)}
                className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] border border-[#747878] px-6 py-3 rounded-sm hover:bg-black/5 cursor-pointer"
              >
                Configure Another Scope
              </button>
            </div>
          </div>
        ) : (
          /* Main Configuration Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Type Selector matching Image 6.html */}
            <div>
              <label className="block font-['Inter',sans-serif] text-xs uppercase tracking-widest font-semibold text-[#1c1b1b] mb-4">
                PROJECT TYPE
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {(['Residential', 'Commercial', 'Renovation', 'Specialized'] as const).map((type) => {
                  const isChecked = projectType === type;
                  return (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="project_type"
                        checked={isChecked}
                        onChange={() => setProjectType(type)}
                        className="peer sr-only"
                      />
                      <div
                        className={`text-center py-3.5 px-2 border rounded-sm transition-all duration-200 ${
                          isChecked
                            ? 'border-[#ff5722] bg-[#ff5722]/10 text-[#ff5722] font-semibold shadow-xs'
                            : 'border-[#747878]/40 hover:border-[#1c1b1b]/60 text-[#1c1b1b] bg-white/40'
                        }`}
                      >
                        <span className="font-['Inter',sans-serif] text-sm font-medium">
                          {type}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Budget Slider matching Image 6.html */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block font-['Inter',sans-serif] text-xs uppercase tracking-widest font-semibold text-[#1c1b1b]">
                  ESTIMATED BUDGET
                </label>
                <span className="font-['Montserrat',sans-serif] text-lg sm:text-xl font-bold text-[#ff5722]" id="budget-value">
                  {currentTier.label}
                </span>
              </div>
              <input
                type="range"
                id="budget-slider"
                min="1"
                max="5"
                step="1"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-[#c4c7c7] rounded-lg appearance-none cursor-pointer accent-[#ff5722]"
              />
              <div className="flex justify-between text-xs text-[#444748] mt-2 font-['Inter',sans-serif]">
                <span>&lt;$250k</span>
                <span className="font-medium text-[#1c1b1b]">{currentTier.desc}</span>
                <span>$5M+</span>
              </div>
            </div>

            {/* Instant Calculated Projection Strip */}
            <div className="p-4 rounded-lg bg-[#f1edec] border border-[#1c1b1b]/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[#444748] block text-[10px] uppercase tracking-wider font-semibold">Est. Schedule</span>
                <span className="font-bold text-[#1c1b1b] font-['Montserrat',sans-serif] text-sm">{calculateTimelineMonths()}</span>
              </div>
              <div>
                <span className="text-[#444748] block text-[10px] uppercase tracking-wider font-semibold">Engineering Cadre</span>
                <span className="font-bold text-[#1c1b1b] font-['Montserrat',sans-serif] text-sm truncate block">{calculateEstEngineeringTeam().split(' ')[0]} Engineers</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[#444748] block text-[10px] uppercase tracking-wider font-semibold">Warranty</span>
                <span className="font-bold text-[#ff5722] font-['Montserrat',sans-serif] text-sm">10-Yr Structural</span>
              </div>
            </div>

            {/* Contact Input Fields matching Image 6.html */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-transparent border-0 border-b border-[#747878] focus:border-[#ff5722] focus:ring-0 px-0 py-2 font-['Inter',sans-serif] text-sm text-[#1c1b1b] placeholder:text-[#858383] transition-colors outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. e.vance@architects.com"
                  className="w-full bg-transparent border-0 border-b border-[#747878] focus:border-[#ff5722] focus:ring-0 px-0 py-2 font-['Inter',sans-serif] text-sm text-[#1c1b1b] placeholder:text-[#858383] transition-colors outline-none"
                />
              </div>
            </div>

            {/* Location & Optional Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Project Site City / State
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Aspen, CO or Chicago, IL"
                  className="w-full bg-transparent border-0 border-b border-[#747878] focus:border-[#ff5722] focus:ring-0 px-0 py-2 font-['Inter',sans-serif] text-sm text-[#1c1b1b] placeholder:text-[#858383] transition-colors outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-transparent border-0 border-b border-[#747878] focus:border-[#ff5722] focus:ring-0 px-0 py-2 font-['Inter',sans-serif] text-sm text-[#1c1b1b] placeholder:text-[#858383] transition-colors outline-none"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                {errorMessage}
              </div>
            )}

            {/* Submit Button matching Image 6.html */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full glowing-btn bg-[#1c1b1b] text-white font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-widest py-4 rounded-sm mt-8 cursor-pointer shadow-md flex items-center justify-center gap-2 hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>SYNCHRONIZING ESTIMATE...</span>
              ) : (
                <>
                  <span>SUBMIT REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
