import React from 'react';
import { ConstructionTimelapseBackground } from './ConstructionTimelapseBackground';
import { BRAND_CONFIG } from '../data/mockData';
import { ArrowDown, Sparkles, Building2, ShieldCheck, Ruler } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onGetEstimate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onGetEstimate
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* High Quality 4K Construction Timelapse Video Background */}
      <ConstructionTimelapseBackground />

      {/* Hero Content Container */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
        {/* Brand Logo with Glow Halo - Fits box entirely without vertical cutoff */}
        <div className="relative mb-6 group cursor-pointer">
          <div className="absolute -inset-3 bg-gradient-to-r from-[#ff5722]/40 to-orange-500/30 rounded-xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-lg shadow-2xl border border-white/20 overflow-hidden bg-[#EBEBEB] transition-transform duration-500 group-hover:scale-105">
            <img
              alt="CONSTRUKTIQ Logo"
              className="w-full h-full object-contain"
              src={BRAND_CONFIG.logoUrl}
            />
          </div>
        </div>

        {/* Sub-label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 mb-5 text-[#ff5722] text-xs font-semibold uppercase tracking-widest shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
          <span>General Contractor and Land Development Consultant</span>
        </div>

        {/* Headline */}
        <h1 className="font-['Montserrat',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-5 leading-[1.12] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Coordinated Delivery &amp;
          <span className="text-[#ff5722]"> Development Expertise</span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Inter',sans-serif] text-base sm:text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {BRAND_CONFIG.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center mb-10">
          <button
            type="button"
            onClick={onExploreProjects}
            className="glowing-btn bg-[#ff5722] hover:bg-[#e64a19] text-white font-['Inter',sans-serif] text-xs uppercase tracking-widest font-semibold px-9 py-4 rounded-sm w-full sm:w-auto text-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            EXPLORE PROJECTS
          </button>
          <button
            type="button"
            onClick={onGetEstimate}
            className="bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white font-['Inter',sans-serif] text-xs uppercase tracking-widest font-semibold px-9 py-4 rounded-sm hover:border-[#ff5722] hover:text-[#ff5722] transition-all w-full sm:w-auto text-center cursor-pointer shadow-md"
          >
            REQUEST ESTIMATE
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={onExploreProjects}
          className="mt-10 text-neutral-400 hover:text-[#ff5722] transition-colors p-2 animate-bounce cursor-pointer"
          aria-label="Scroll down to projects"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
