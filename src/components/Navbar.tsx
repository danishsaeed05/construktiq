import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/mockData';

const baseUrl = import.meta.env.BASE_URL || '/';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEstimate: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenEstimate,
  onOpenContact
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'estimate', label: 'Estimate' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-[#fdf8f8]/90 backdrop-blur-xl border-b border-[#1c1b1b]/10 shadow-sm py-3'
          : 'bg-[#fdf8f8]/75 backdrop-blur-md border-b border-[#1c1b1b]/5 py-4'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-12 lg:px-16 w-full max-w-7xl mx-auto">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left group transition-transform active:scale-95"
        >
          <img
            src={BRAND_CONFIG.markLogoUrl || `${baseUrl}images/logo_only_without_text.svg`}
            alt="CONSTRUKTIQ Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm object-contain shadow-xs"
            onError={(e) => {
              // Fallback to geometric icon if image network fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-['Montserrat',sans-serif] text-xl sm:text-2xl font-bold tracking-tight text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors flex items-center gap-1.5">
              CONSTRUKTIQ
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className={`font-['Inter',sans-serif] text-xs uppercase tracking-widest font-semibold transition-colors duration-250 relative py-1 ${
                activeSection === link.id
                  ? 'text-[#ff5722]'
                  : 'text-[#444748] hover:text-[#ff5722]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5722] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenEstimate}
            className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-wider bg-[#1c1b1b] text-white px-5 py-2.5 rounded-sm glowing-btn cursor-pointer"
          >
            ESTIMATE
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1c1b1b] hover:text-[#ff5722] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdf8f8]/98 backdrop-blur-2xl border-b border-[#1c1b1b]/10 px-6 py-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center justify-between text-left font-['Montserrat',sans-serif] text-base font-semibold py-2 border-b border-[#1c1b1b]/5 ${
                  activeSection === link.id ? 'text-[#ff5722]' : 'text-[#1c1b1b]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#ff5722]" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimate();
                }}
                className="w-full bg-[#1c1b1b] text-white py-3 rounded-sm font-semibold text-xs uppercase tracking-widest glowing-btn text-center"
              >
                Launch Estimate Hub
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full border border-[#1c1b1b]/30 text-[#1c1b1b] py-2.5 rounded-sm font-semibold text-xs uppercase tracking-widest text-center hover:border-[#ff5722] hover:text-[#ff5722]"
              >
                Direct Inquiries
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
