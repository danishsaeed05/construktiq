import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { loadProjects, getInitialProjects } from '../services/projectsService';
import { ArrowRight, Sparkles, Maximize2, MapPin } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenEstimate: () => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onSelectProject,
  onOpenEstimate
}) => {
  const [projectsList, setProjectsList] = useState<Project[]>(getInitialProjects);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const projectCategories = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'RESIDENTIAL', label: 'Residential' },
    { id: 'COMMERCIAL', label: 'Commercial' },
    { id: 'INTERIOR_FITOUT', label: 'Interior Fitout' },
    { id: 'LAND_DEVELOPMENT', label: 'Land Development' }
  ];

  const matchesCategory = (project: Project, category: string) => {
    const projectCategory = (project.category || '').toUpperCase();
    if (category === 'INTERIOR_FITOUT') {
      return ['INTERIOR', 'INTERIOR_FITOUT', 'ARCHITECTURE', 'SPECIALIZED'].includes(projectCategory);
    }
    if (category === 'LAND_DEVELOPMENT') {
      return ['LAND', 'LAND_DEVELOPMENT', 'LAND DEVELOPMENT'].includes(projectCategory);
    }
    return projectCategory === category;
  };

  // Dynamic fetch from /data/projects.json
  useEffect(() => {
    let isMounted = true;
    loadProjects().then((data) => {
      if (isMounted && data) {
        setProjectsList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = activeCategory === 'ALL'
    ? projectsList
    : projectsList.filter((project) => matchesCategory(project, activeCategory));

  return (
    <section id="projects" className="py-24 px-5 sm:px-8 md:px-16 bg-[#fdf8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title & Filter Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#ff5722] text-xs uppercase font-semibold tracking-widest font-['Inter',sans-serif]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Projects</span>
            </div>
            <h2 className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1b1b] mb-3">
              Featured Work
            </h2>
            <div className="w-12 h-1 bg-[#ff5722] rounded-full" />
          </div>

          {/* Dynamic Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`font-['Inter',sans-serif] text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1c1b1b] text-white shadow-sm'
                    : 'bg-[#f1edec] text-[#444748] hover:bg-[#e5e2e1] hover:text-[#1c1b1b]'
                }`}
              >
                {cat.label}
              </button>
            ))}

          </div>
        </div>

        {/* Masonry-Style Responsive Grid matching Image 6.html */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative overflow-hidden rounded-md border border-[#1c1b1b]/10 bg-black cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 ${
                index === 1 ? 'md:row-span-2' : ''
              }`}
            >
              {/* Image Container with smooth zoom on hover */}
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-full min-h-[340px] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  onError={(e) => {
                    // Fallback to high-res architectural render if local image path is not yet present
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
                  }}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.95] group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Subtle Top Spec Badge */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1 bg-[#1c1b1b]/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-sm">
                    <Maximize2 className="w-3 h-3 text-[#ff5722]" />
                    <span>Inspect</span>
                  </span>
                </div>

                {/* Hover Gradient Overlay from Image 6.html */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/95 via-[#1c1b1b]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block font-['Inter',sans-serif] text-[11px] uppercase tracking-widest font-semibold text-[#ff5722] bg-[#fdf8f8]/95 px-3 py-1 rounded-xs mb-2.5 shadow-xs">
                      {project.categoryLabel || project.category}
                    </span>
                    <h3 className="font-['Montserrat',sans-serif] text-xl sm:text-2xl font-bold text-white mb-1.5 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-3 font-normal opacity-90 group-hover:opacity-100">
                      {project.tagline}
                    </p>

                    {/* Metadata pill strip */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ff5722]" /> {project.location}
                      </span>
                      <span>•</span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button
          type="button"
          onClick={onOpenEstimate}
          className="w-full mt-8 md:hidden font-['Inter',sans-serif] text-xs font-semibold uppercase tracking-widest text-[#1c1b1b] border border-[#747878] py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-[#f7f3f2] transition-colors"
        >
          <span>REQUEST ESTIMATE FOR YOUR SITE</span>
          <ArrowRight className="w-4 h-4 text-[#ff5722]" />
        </button>
      </div>
    </section>
  );
};
