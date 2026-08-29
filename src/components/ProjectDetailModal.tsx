import React from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Layers, ShieldCheck, ArrowRight, CheckCircle2, Ruler, Building } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuote: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuote
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-250">
      <div className="bg-[#fdf8f8] border border-[#1c1b1b]/15 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-[#ff5722] text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-72 sm:h-96 w-full shrink-0 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/90 via-[#1c1b1b]/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-widest text-[#ff5722] bg-white/95 px-3 py-1 rounded-xs mb-2 inline-block">
              {project.categoryLabel}
            </span>
            <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 font-light flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#ff5722]" /> {project.location} • Year {project.year} • {project.area}
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tagline */}
          <div className="p-4 rounded-md bg-[#f1edec] border-l-4 border-[#ff5722] text-[#1c1b1b] font-medium text-sm sm:text-base italic">
            "{project.tagline}"
          </div>

          {/* Description */}
          <div>
            <h4 className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider text-[#1c1b1b] mb-2">
              Architectural Narrative
            </h4>
            <p className="text-sm sm:text-base text-[#444748] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-white border border-[#1c1b1b]/10 text-xs">
            <div>
              <span className="text-[#858383] block uppercase text-[10px] font-semibold">Lead Architect</span>
              <span className="font-bold text-[#1c1b1b]">{project.leadArchitect || 'CONSTRUKTIQ Studio'}</span>
            </div>
            <div>
              <span className="text-[#858383] block uppercase text-[10px] font-semibold">Total Area</span>
              <span className="font-bold text-[#1c1b1b]">{project.area}</span>
            </div>
            <div>
              <span className="text-[#858383] block uppercase text-[10px] font-semibold">Budget Scope</span>
              <span className="font-bold text-[#ff5722]">{project.budgetTier || 'Custom Scope'}</span>
            </div>
            <div>
              <span className="text-[#858383] block uppercase text-[10px] font-semibold">Status</span>
              <span className="font-bold text-emerald-700">{project.status || 'Completed'}</span>
            </div>
          </div>

          {/* Key Engineering Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h4 className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider text-[#1c1b1b] mb-3">
                Key Engineering Features
              </h4>
              <div className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1c1b1b]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials Integrated */}
          {project.materials && project.materials.length > 0 && (
            <div>
              <h4 className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider text-[#1c1b1b] mb-3">
                Materials Specified
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-[#f1edec] border border-[#747878]/20 text-xs font-medium text-[#1c1b1b]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Gallery Images */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <div>
              <h4 className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider text-[#1c1b1b] mb-3">
                Architectural Study &amp; Gallery
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {project.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative h-40 rounded-sm overflow-hidden border border-[#1c1b1b]/10 bg-black">
                    <img
                      src={img}
                      alt={`${project.title} study ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action Footer */}
          <div className="pt-4 border-t border-[#1c1b1b]/10 flex flex-col sm:flex-row gap-3 justify-end items-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-[#747878] rounded-sm text-xs font-semibold uppercase tracking-wider text-[#1c1b1b] hover:bg-black/5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onRequestQuote(project);
                onClose();
              }}
              className="w-full sm:w-auto glowing-btn bg-[#1c1b1b] text-white px-8 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Estimate Similar Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
