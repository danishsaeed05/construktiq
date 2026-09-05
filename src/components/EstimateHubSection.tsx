import React, { useState } from 'react';
import { ArrowRight, Calculator, CheckCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstimateConfig } from '../types';
import { sendEstimateEmail } from '../services/emailService';

interface EstimateHubSectionProps {
  initialProjectType?: EstimateConfig['projectType'];
  onSubmitSuccess?: (config: EstimateConfig) => void;
}

export const EstimateHubSection: React.FC<EstimateHubSectionProps> = ({
  initialProjectType = 'Residential',
  onSubmitSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedConfig, setSubmittedConfig] = useState<EstimateConfig | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const config: EstimateConfig = {
      projectType: initialProjectType,
      budgetTierIndex: 3,
      squareFootage: 0,
      sustainabilityTier: 'Standard',
      timeframe: 'Flexible',
      smartAutomation: false,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      notes: notes.trim()
    };

    setIsSubmitting(true);
    try {
      await sendEstimateEmail(config);
      setSubmittedConfig(config);
      onSubmitSuccess?.(config);
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#ff5722', '#1c1b1b', '#ffffff']
      });
    } catch (error) {
      console.warn('Estimate request fallback logged:', error);
      setSubmittedConfig(config);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate" className="py-24 px-5 sm:px-8 md:px-16 bg-[#f7f3f2] relative overflow-hidden">
      <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-10 md:p-12 rounded-xl border border-[#747878]/30 shadow-lg relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b1b]/5 border border-[#1c1b1b]/10 mb-3 text-[#ff5722] text-xs font-semibold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>Project Inquiry</span>
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] mb-3">
            Request an Estimate
          </h2>
          <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#444748] max-w-xl mx-auto">
            Tell us a little about your project and our team will follow up with the right next steps.
          </p>
        </div>

        {submittedConfig ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#1c1b1b]">
              Request Received
            </h3>
            <p className="text-sm text-[#444748] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1c1b1b]">{submittedConfig.fullName}</strong>. We will review your project details and be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedConfig(null)}
              className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] border border-[#747878] px-6 py-3 rounded-sm hover:bg-black/5 cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="e.g. David Sterling"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2.5 text-sm text-[#1c1b1b] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="e.g. david@example.com"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2.5 text-sm text-[#1c1b1b] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="e.g. (905) 555-0142"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2.5 text-sm text-[#1c1b1b] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">Project City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Oakville, Burlington, Mississauga, or Toronto"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2.5 text-sm text-[#1c1b1b] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">Project Details</label>
              <textarea
                rows={5}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Tell us anything you would like us to know about your project, goals, scope, or specific requirements..."
                className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm p-3 text-sm text-[#1c1b1b] outline-none resize-y"
              />
            </div>

            {errorMessage && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">{errorMessage}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full glowing-btn bg-[#1c1b1b] text-white font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-widest py-4 rounded-sm cursor-pointer shadow-md flex items-center justify-center gap-2 hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? <span>SENDING REQUEST...</span> : <><span>REQUEST ESTIMATE</span><Send className="w-4 h-4" /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
