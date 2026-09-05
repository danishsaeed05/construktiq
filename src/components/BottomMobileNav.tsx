import React from 'react';
import { Calculator, LayoutGrid, Layers } from 'lucide-react';

interface BottomMobileNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEstimate?: () => void;
  onOpenContact?: () => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  activeSection,
  onNavigate
}) => {
  const items = [
    { id: 'about', label: 'About Us', icon: Layers },
    { id: 'capabilities', label: 'Services', icon: Layers },
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
    { id: 'estimate', label: 'Request Estimate', icon: Calculator }
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full w-auto min-w-[310px] max-w-[92vw] bg-[#f7f3f2]/85 backdrop-blur-xl border border-[#1c1b1b]/10 shadow-2xl z-40 flex justify-around items-center p-1.5 transition-all duration-300">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-[#ff5722] bg-[#ffdbd1]/60 font-semibold shadow-xs'
                : 'text-[#444748] hover:text-[#1c1b1b] hover:bg-black/5'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="font-['Inter',sans-serif] text-[9px] uppercase tracking-wider font-semibold">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
