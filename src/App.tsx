import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { EstimateHubSection } from './components/EstimateHubSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactDrawer } from './components/ContactDrawer';
import { BottomMobileNav } from './components/BottomMobileNav';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [estimateProjectType, setEstimateProjectType] = useState<'Residential' | 'Commercial' | 'Renovation' | 'Specialized'>('Residential');

  // IntersectionObserver to sync active nav link with scroll position
  useEffect(() => {
    const sections = ['hero', 'capabilities', 'projects', 'estimate'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleRequestEstimateForProject = (project: Project) => {
    let mappedType: 'Residential' | 'Commercial' | 'Renovation' | 'Specialized' = 'Residential';
    if (project.category === 'COMMERCIAL') mappedType = 'Commercial';
    else if (project.category === 'SPECIALIZED') mappedType = 'Specialized';
    else if (project.category === 'ARCHITECTURE') mappedType = 'Residential';
    setEstimateProjectType(mappedType);
    scrollToSection('estimate');
  };

  const handleRequestQuoteForCategory = (categoryName: string) => {
    if (categoryName.toLowerCase().includes('commercial')) setEstimateProjectType('Commercial');
    else if (categoryName.toLowerCase().includes('specialized')) setEstimateProjectType('Specialized');
    else setEstimateProjectType('Residential');
    scrollToSection('estimate');
  };

  return (
    <div className="min-h-screen bg-[#fdf8f8] text-[#1c1b1b] font-['Inter',sans-serif] selection:bg-[#ff5722] selection:text-white relative">
      {/* Top Fixed App Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenEstimate={() => scrollToSection('estimate')}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section with 3D Dynamic Mesh & Brand Imagery */}
        <HeroSection
          onExploreProjects={() => scrollToSection('projects')}
          onGetEstimate={() => scrollToSection('estimate')}
        />

        {/* 2. Capabilities Horizontal Glass Strip */}
        <CapabilitiesSection
          onRequestQuoteForCategory={handleRequestQuoteForCategory}
        />

        {/* 3. Featured Work Masonry Gallery */}
        <FeaturedProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenEstimate={() => scrollToSection('estimate')}
        />

        {/* 4. Estimate Hub Configurator & Calculator */}
        <EstimateHubSection
          key={estimateProjectType}
          initialProjectType={estimateProjectType}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenEstimate={() => scrollToSection('estimate')}
      />

      {/* Floating Bottom Nav for Mobile Screens */}
      <BottomMobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenEstimate={() => scrollToSection('estimate')}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Modals & Inspection Drawers */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={handleRequestEstimateForProject}
      />

      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
