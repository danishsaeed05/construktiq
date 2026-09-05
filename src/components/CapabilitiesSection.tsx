import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/mockData';
import { ServiceCapability } from '../types';
import { Building2, Home, HardHat, DraftingCompass, Map, Warehouse, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';

interface CapabilitiesSectionProps {
  onSelectService?: (service: ServiceCapability) => void;
  onRequestQuoteForCategory?: (category: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onSelectService,
  onRequestQuoteForCategory
}) => {
  const [selectedModalService, setSelectedModalService] = useState<ServiceCapability | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const servicesScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = servicesScrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const firstCard = scroller.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const cardStep = firstCard.offsetWidth + 24;
      const nextIndex = Math.round(scroller.scrollLeft / cardStep);
      setActiveServiceIndex(Math.min(Math.max(nextIndex, 0), SERVICES.length - 1));
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToService = (index: number) => {
    const scroller = servicesScrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;

    scroller.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
    setActiveServiceIndex(index);
  };

  const moveService = (direction: -1 | 1) => {
    const nextIndex = Math.min(Math.max(activeServiceIndex + direction, 0), SERVICES.length - 1);
    scrollToService(nextIndex);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'general_contracting':
        return <HardHat className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'design_build':
        return <DraftingCompass className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'land_development':
        return <Map className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'residential_development':
        return <Home className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'commercial_development':
        return <Warehouse className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'domain':
        return <Building2 className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      case 'house':
        return <Home className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
      default:
        return <Building2 className="w-8 h-8 text-[#1c1b1b] group-hover:text-[#ff5722] transition-colors" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 px-5 sm:px-8 md:px-16 bg-[#f7f3f2] overflow-hidden border-y border-[#1c1b1b]/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#ff5722] text-xs uppercase font-semibold tracking-widest font-['Inter',sans-serif]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] mb-3">
            Services
          </h2>
          <div className="w-12 h-1 bg-[#ff5722] rounded-full" />
        </div>

        {/* Carousel Controls and Scrollable Service Cards */}
        <div className="relative">
          <button
            type="button"
            onClick={() => moveService(-1)}
            disabled={activeServiceIndex === 0}
            aria-label="Previous service"
            className="absolute left-0 sm:-left-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#747878]/30 bg-[#fdf8f8]/95 p-2 text-[#1c1b1b] shadow-md transition-colors hover:border-[#ff5722] hover:text-[#ff5722] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div ref={servicesScrollerRef} className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x scroll-smooth px-7 sm:px-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="glass-panel w-full max-w-full overflow-hidden border border-[#747878]/25 hover:border-[#ff5722]/60 rounded-lg p-5 sm:p-6 lg:p-8 min-w-[calc(100%-40px)] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start shrink-0 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#ff5722] transition-colors duration-300" />

              {/* Icon */}
              <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 rounded-md bg-white/80 w-fit border border-[#1c1b1b]/5 shadow-xs group-hover:scale-110 transition-transform">
                {getServiceIcon(service.icon)}
              </div>

              {/* Title */}
              <h3 className="font-['Montserrat',sans-serif] text-lg sm:text-xl lg:text-2xl font-bold text-[#1c1b1b] mb-3 min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] group-hover:text-[#ff5722] transition-colors">
                {service.title}
              </h3>

              {/* Summary */}
              <p className="font-['Inter',sans-serif] text-xs sm:text-sm lg:text-base text-[#444748] mb-5 sm:mb-6 min-w-0 max-w-full flex-grow whitespace-normal leading-relaxed break-words [overflow-wrap:anywhere]">
                {service.summary}
              </p>

              {/* Key Scope Preview Bullets */}
              <ul className="mb-5 sm:mb-6 min-w-0 max-w-full space-y-2 border-t border-[#1c1b1b]/5 pt-4">
                {service.detailedScope.slice(0, 2).map((scope, idx) => (
                  <li key={idx} className="flex min-w-0 items-start gap-2 text-[11px] sm:text-xs text-[#444748] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5722] shrink-0 mt-0.5" />
                    <span className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]">{scope}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setSelectedModalService(service)}
                className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-widest text-[#1c1b1b] group-hover:text-[#ff5722] flex min-w-0 items-center gap-2 mt-auto pt-2 whitespace-normal break-words transition-colors cursor-pointer text-left"
              >
                <span>VIEW DETAIL</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => moveService(1)}
            disabled={activeServiceIndex === SERVICES.length - 1}
            aria-label="Next service"
            className="absolute right-0 sm:-right-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#747878]/30 bg-[#fdf8f8]/95 p-2 text-[#1c1b1b] shadow-md transition-colors hover:border-[#ff5722] hover:text-[#ff5722] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center gap-2" aria-label="Service carousel pages">
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToService(index)}
                aria-label={`View ${service.title}`}
                aria-current={activeServiceIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeServiceIndex === index
                    ? 'w-7 bg-[#ff5722]'
                    : 'w-2 bg-[#747878]/40 hover:bg-[#ff5722]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fdf8f8] border border-[#1c1b1b]/15 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedModalService(null)}
              className="absolute top-5 right-5 p-2 text-[#444748] hover:text-[#1c1b1b] rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#1c1b1b] text-white rounded-md">
                {getServiceIcon(selectedModalService.icon)}
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#ff5722]">Capability Scope</span>
                <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#1c1b1b]">
                  {selectedModalService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#444748] mb-6 leading-relaxed">
              {selectedModalService.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[#f1edec] mb-6 border border-[#1c1b1b]/5">
              {selectedModalService.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="font-['Montserrat',sans-serif] text-xl font-bold text-[#1c1b1b]">{m.value}</div>
                  <div className="text-xs text-[#444748] font-medium">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Full Scope */}
            <h4 className="font-['Montserrat',sans-serif] text-sm uppercase tracking-wider font-bold text-[#1c1b1b] mb-3">
              Engineering &amp; Execution Scope
            </h4>
            <div className="space-y-2.5 mb-6">
              {selectedModalService.detailedScope.map((scope, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-[#1c1b1b]">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1c1b1b]/10">
              <button
                type="button"
                onClick={() => {
                  const cat = selectedModalService.title;
                  setSelectedModalService(null);
                  if (onRequestQuoteForCategory) onRequestQuoteForCategory(cat);
                }}
                className="glowing-btn bg-[#1c1b1b] text-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider text-center"
              >
                Estimate {selectedModalService.title} Project
              </button>
              <button
                type="button"
                onClick={() => setSelectedModalService(null)}
                className="border border-[#747878] text-[#1c1b1b] px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
