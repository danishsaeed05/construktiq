export type ProjectCategory = 'ALL' | 'RESIDENTIAL' | 'ARCHITECTURE' | 'COMMERCIAL' | 'SPECIALIZED' | (string & {});

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel?: string;
  imageUrl: string;
  additionalImages?: string[];
  location: string;
  year: string;
  area: string;
  leadArchitect?: string;
  tagline: string;
  description: string;
  materials?: string[];
  keyFeatures?: string[];
  budgetTier?: string;
  status?: 'Completed' | 'Under Construction' | 'Design Phase' | string;
}

export interface ServiceCapability {
  id: string;
  title: string;
  icon: string;
  summary: string;
  detailedScope: string[];
  sampleProjects: string[];
  metrics: { label: string; value: string }[];
}

export interface TimelineStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  durationAvg: string;
  keyAssurance: string;
}

export interface ArchitecturalMaterial {
  id: string;
  name: string;
  category: 'Structural' | 'Surfaces' | 'Fenestration' | 'Finishes';
  origin: string;
  sustainabilityRating: string;
  finish: string;
  description: string;
  imageUrl: string;
  applications: string[];
}

export interface EstimateConfig {
  projectType: 'Residential' | 'Commercial' | 'Renovation' | 'Specialized';
  budgetTierIndex: number;
  squareFootage: number;
  sustainabilityTier: 'Standard' | 'LEED Silver' | 'LEED Platinum / Net-Zero';
  timeframe: 'Accelerated' | 'Standard' | 'Flexible';
  smartAutomation: boolean;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  notes?: string;
}
