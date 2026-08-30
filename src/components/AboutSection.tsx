import React from 'react';
import { ArrowRight, Building2, HardHat, Map, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const focusAreas = [
    {
      title: 'Low-Rise & High-Rise',
      description: 'Execution across mixed-use, institutional, and multi-story environments with disciplined site coordination and quality oversight.',
      icon: Building2
    },
    {
      title: 'Commercial & Land Development',
      description: 'From greenfield acquisition and site strategy to infrastructure, approvals, and final delivery.',
      icon: Map
    },
    {
      title: 'Project Lifecycle Leadership',
      description: 'Hands-on involvement from concept and preconstruction through construction management and turnover.',
      icon: HardHat
    }
  ];

  return (
    <section id="about" className="py-24 px-5 sm:px-8 md:px-16 bg-[#fdf8f8] border-y border-[#1c1b1b]/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#ff5722] text-xs uppercase font-semibold tracking-widest font-['Inter',sans-serif]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About</span>
          </div>
          <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] mb-3">
            Builder. Developer. Delivery Partner.
          </h2>
          <div className="w-12 h-1 bg-[#ff5722] rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="space-y-6">
            <p className="font-['Inter',sans-serif] text-base sm:text-lg leading-relaxed text-[#444748]">
              8+ years of experience in low-rise and high-rise, commercial, and land development—spanning the full lifecycle from acquisition and greenfield strategy to design coordination, construction, and project delivery.
            </p>

            <p className="font-['Inter',sans-serif] text-base leading-relaxed text-[#444748]">
              The work combines practical execution with strategic oversight: aligning stakeholders, de-risking development decisions, and ensuring each project moves efficiently from concept to completion. This approach helps owners secure better outcomes across residential, commercial, and land development programs.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center gap-2 font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] hover:text-[#ff5722] transition-colors cursor-pointer"
              >
                <span>Discuss your project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-[#1c1b1b] text-white rounded-xl p-6 sm:p-8 shadow-xl border border-[#1c1b1b]/10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#ff5722] font-semibold mb-4">
              Experience Snapshot
            </div>

            <div className="space-y-5">
              {focusAreas.map(({ title, description, icon: Icon }) => (
                <div key={title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-md bg-white/5 border border-white/10">
                      <Icon className="w-4 h-4 text-[#ff5722]" />
                    </div>
                    <div>
                      <h3 className="font-['Montserrat',sans-serif] text-base font-bold text-white mb-1">{title}</h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
