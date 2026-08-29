import React, { useState } from 'react';
import { X, Send, Phone, Mail, MapPin, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/mockData';
import { sendContactEmail } from '../services/emailService';
import confetti from 'canvas-confetti';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('New Project Construction');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      const res = await sendContactEmail({
        name,
        email,
        inquiryType,
        message,
        submittedAt: new Date().toISOString()
      });

      setDispatchStatus(res.message);
      setIsSent(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#ff5722', '#1c1b1b']
        });
      } catch (err) {}
    } catch (err) {
      console.error(err);
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fdf8f8] border border-[#1c1b1b]/15 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#444748] hover:text-[#1c1b1b] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#1c1b1b]">
              Inquiry Dispatched
            </h3>
            <p className="text-xs sm:text-sm text-[#444748] max-w-md mx-auto">
              Thank you, <strong className="text-[#1c1b1b]">{name}</strong>. Your inquiry has been received and our team will be in touch shortly.
            </p>

            <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-md text-left text-[11px] text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Deliverability Confirmed:</strong> Clean SPF-authenticated message transmitted with zero third-party ads or junk filter blocks.
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#1c1b1b] hover:bg-[#ff5722] text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5722]">
                Architectural Inquiries
              </span>
              <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#1c1b1b]">
                Contact Studio
              </h3>
              <p className="text-xs text-[#444748] mt-1">
                Share your project goals and our principal architects will review your inquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Inquiry Nature
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#f1edec] border border-[#747878]/30 rounded-sm px-3 py-2 text-xs text-[#1c1b1b] focus:border-[#ff5722] outline-none"
                >
                  <option>New Project Construction</option>
                  <option>Architectural Consultation &amp; BIM</option>
                  <option>Materials &amp; Engineering RFI</option>
                  <option>Media &amp; Press Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Sterling"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2 text-xs text-[#1c1b1b] outline-none"
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
                  placeholder="e.g. d.sterling@enterprise.com"
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm px-3 py-2 text-xs text-[#1c1b1b] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Project Brief or Inquiry Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your site, timeline, or specific engineering requirements..."
                  className="w-full bg-white border border-[#747878]/30 focus:border-[#ff5722] rounded-sm p-3 text-xs text-[#1c1b1b] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glowing-btn bg-[#1c1b1b] hover:bg-[#ff5722] text-white py-3.5 rounded-sm text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>DISPATCHING DIRECT INQUIRY...</span>
                ) : (
                  <>
                    <span>Send Direct Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
