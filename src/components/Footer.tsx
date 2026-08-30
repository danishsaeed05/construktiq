import React from 'react';
import { BRAND_CONFIG } from '../data/mockData';
import { Sparkles, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL || '/';

interface FooterProps {
  onOpenContact: () => void;
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenEstimate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 sm:py-20 bg-[#fdf8f8] border-t border-[#1c1b1b]/10 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto">
        {/* Column 1: Brand & Copyright */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={BRAND_CONFIG.markLogoUrl || `${baseUrl}images/logo_only_without_text.svg`}
              alt="CONSTRUKTIQ Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-['Montserrat',sans-serif] text-xl sm:text-2xl font-bold tracking-tight text-[#1c1b1b]">
              CONSTRUKTIQ
            </span>
          </div>
          <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#444748] leading-relaxed mb-4">
            © {new Date().getFullYear()} CONSTRUKTIQ.<br />
            ARCHITECTURAL PRECISION &amp; INTELLIGENT FABRICATION.
          </p>
          <div className="text-[11px] text-[#858383]">
            Licensed General Contractor &amp; Structural Engineering Practice #CQ-94107
          </div>
        </div>

        {/* Column 2: CONNECT */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-xs font-bold uppercase tracking-widest text-[#1c1b1b] mb-4">
            CONNECT
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="text-[#444748] hover:text-[#ff5722] underline decoration-1 underline-offset-4 transition-colors"
              >
                Instagram / @construktiq
              </a>
            </li>
            <li>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="text-[#444748] hover:text-[#ff5722] underline decoration-1 underline-offset-4 transition-colors"
              >
                LinkedIn / Studio
              </a>
            </li>
            <li>
              <a
                href="#behance"
                onClick={(e) => e.preventDefault()}
                className="text-[#444748] hover:text-[#ff5722] underline decoration-1 underline-offset-4 transition-colors"
              >
                Behance / Architecture
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: OFFICE */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-xs font-bold uppercase tracking-widest text-[#1c1b1b] mb-4">
            STUDIO &amp; LAB
          </h4>
          <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#444748] space-y-1 leading-relaxed">
            {BRAND_CONFIG.address.line1}<br />
            {BRAND_CONFIG.address.line2}<br />
            {BRAND_CONFIG.address.district}<br />
            {BRAND_CONFIG.address.city}
          </p>
        </div>

        {/* Column 4: INQUIRIES & BACK TO TOP */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-xs font-bold uppercase tracking-widest text-[#1c1b1b] mb-4">
            INQUIRIES
          </h4>
          <div className="space-y-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="text-xs sm:text-sm text-[#444748] hover:text-[#ff5722] underline decoration-1 underline-offset-4 transition-colors cursor-pointer block text-left"
            >
              Consultation &amp; RFI Desk
            </button>
            <button
              type="button"
              onClick={onOpenEstimate}
              className="text-xs font-semibold uppercase tracking-wider text-[#ff5722] hover:underline block text-left cursor-pointer"
            >
              Launch Estimate Calculator →
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-[#1c1b1b] bg-black/5 hover:bg-[#1c1b1b] hover:text-white px-3 py-2 rounded-sm transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
