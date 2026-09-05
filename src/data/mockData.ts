import { Project, ServiceCapability, TimelineStep, ArchitecturalMaterial } from '../types';
import projectsData from './projects.json';

const baseUrl = import.meta.env.BASE_URL || '/';

export const BRAND_CONFIG = {
  name: 'CONSTRUKTIQ',
  tagline: 'Coordinated Delivery & Development Expertise',
  subtitle: 'General contracting, project management, and land development delivered with clarity from first plan to final handover.',
  logoUrl: `${baseUrl}images/gemini-svg.svg`,
  markLogoUrl: `${baseUrl}images/logo_only_without_text.svg`,
  phone: '+1 (800) 492-8821',
  email: 'inquiries@construktiq.build',
  address: {
    line1: '4089 Hillsborough Cres',
    line2: 'Oakville, ON L6H 3P9',
    district: 'Canada',
    city: ''
  }
};

export const PROJECTS: Project[] = projectsData as Project[];

export const SERVICES: ServiceCapability[] = [
  {
    id: 'general-contracting',
    title: 'General Contracting',
    icon: 'general_contracting',
    summary: 'Full-scope construction delivery for residential, mixed-use, and commercial projects with strong site coordination and quality control.',
    detailedScope: [
      'Residential Construction',
      'Commercial Construction',
      'Custom Homes',
      'Renovations & Additions'
    ],
    sampleProjects: ['Custom Residence Delivery', 'Commercial Fitout Program', 'Multi-Phase Renovation'],
    metrics: [
      { label: 'Typical Duration', value: '6–18 Months' },
      { label: 'Delivery Model', value: 'Design + Build' }
    ]
  },
  {
    id: 'design-build',
    title: 'Design-Build',
    icon: 'design_build',
    summary: 'Integrated design and construction services that simplify communication, accelerate milestones, and reduce risk from planning through turnover.',
    detailedScope: [
      'Concept & Planning',
      'Architectural & Engineering Coordination',
      'Construction',
      'Project Management'
    ],
    sampleProjects: ['Owner-Driven Developments', 'Adaptive Reuse Projects', 'Fast-Track Commercial Builds'],
    metrics: [
      { label: 'Typical Duration', value: '8–20 Months' },
      { label: 'Delivery Model', value: 'Single-Source' }
    ]
  },
  {
    id: 'land-development',
    title: 'Land Development',
    icon: 'land_development',
    summary: 'Strategic site transformation from raw land to serviced, compliant, and build-ready developments with environmental and regulatory oversight.',
    detailedScope: [
      'Greenfield Development',
      'Planning & Approvals',
      'Engineering & Design',
      'Site Servicing & Infrastructure',
      'Construction Management',
      'Environmental & Regulatory Compliance'
    ],
    sampleProjects: ['Residential Community Sites', 'Commercial Parcels', 'Mixed-Use Development Land Banks'],
    metrics: [
      { label: 'Typical Duration', value: '12–30 Months' },
      { label: 'Delivery Model', value: 'Entitlement + Build' }
    ]
  },
  {
    id: 'residential-development',
    title: 'Residential Development',
    icon: 'residential_development',
    summary: 'Multi-residential and subdivision projects tailored for long-term value creation, neighborhood fit, and efficient execution.',
    detailedScope: [
      'New Home Developments',
      'Subdivisions',
      'Multi-Unit Residential',
      'Custom Home Communities'
    ],
    sampleProjects: ['Subdivision Masterplans', 'Townhome Communities', 'Luxury Residential Clusters'],
    metrics: [
      { label: 'Typical Duration', value: '9–24 Months' },
      { label: 'Delivery Model', value: 'Phased Development' }
    ]
  },
  {
    id: 'commercial-development',
    title: 'Commercial Development',
    icon: 'commercial_development',
    summary: 'Commercial and industrial development leadership focused on site readiness, program efficiency, investor confidence, and operational continuity.',
    detailedScope: [
      'Commercial Buildings',
      'Industrial Projects',
      'Retail & Mixed-Use',
      'Site Development'
    ],
    sampleProjects: ['Retail Centers', 'Industrial Facilities', 'Mixed-Use Commercial Parcels'],
    metrics: [
      { label: 'Typical Duration', value: '10–36 Months' },
      { label: 'Delivery Model', value: 'Asset-Driven Delivery' }
    ]
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    stepNumber: '01',
    title: 'DESIGN',
    tagline: 'Architectural planning, 3D simulation, and structural engineering.',
    description: 'We translate your vision into millimeter-accurate BIM models, structural load analyses, and complete architectural blueprints before physical ground is ever broken.',
    deliverables: [
      'Full 3D Architectural BIM Model',
      'Structural & Mechanical Engineering Blueprints',
      'Permitting and Municipal Entitlement Approvals'
    ],
    durationAvg: '4 - 8 Weeks',
    keyAssurance: '100% Zero Conflict Clash Detection'
  },
  {
    stepNumber: '02',
    title: 'PROCUREMENT',
    tagline: 'Sourcing premium, sustainable materials directly from global quarries & mills.',
    description: 'Our global supply network locks in high-grade architectural concrete, certified FSC hardwoods, Italian marbles, and custom blackened steel ahead of schedule to prevent supply delays.',
    deliverables: [
      'Material Testing & Sample Certification Booklets',
      'Transparent Fixed-Price Supply Ledger',
      'Supply Chain & Delivery Gantt Synchronization'
    ],
    durationAvg: '3 - 6 Weeks',
    keyAssurance: 'Chain-of-Custody & Sustainability Certified'
  },
  {
    stepNumber: '03',
    title: 'BUILD',
    tagline: 'Precision execution by master craftsmen and certified site supervisors.',
    description: 'Our dedicated master builders execute with surgical rigor. Real-time digital milestone tracking and weekly drone LiDAR scans guarantee uncompromising structural alignment.',
    deliverables: [
      'Foundation, Superstructure & Envelope Assembly',
      'Rough-in MEP Systems with Laser Calibration',
      'Weekly Multi-Angle 4K Drone & 3D Scan Reports'
    ],
    durationAvg: '16 - 36 Weeks',
    keyAssurance: 'ISO 9001 Quality Control Protocol'
  },
  {
    stepNumber: '04',
    title: 'HANDOVER',
    tagline: 'Final white-glove inspection, digital twin transfer, and key commissioning.',
    description: 'A 400-point quality audit precedes key delivery. You receive full digital twin operational manuals, smart building commissioning, and our 10-year structural warranty package.',
    deliverables: [
      'White-Glove Punchlist Signoff',
      'Digital Twin Building Operating System',
      '10-Year Comprehensive Structural Warranty'
    ],
    durationAvg: '1 - 2 Weeks',
    keyAssurance: 'Zero-Defect Guaranteed Handover'
  }
];

export const MATERIALS_LIBRARY: ArchitecturalMaterial[] = [
  {
    id: 'mat-concrete',
    name: 'Cast-in-Place Architectural Concrete',
    category: 'Structural',
    origin: 'Locally Sourced Aggregate, Low-Carbon Portland',
    sustainabilityRating: 'LEED v4.1 Compliant (40% GGBS)',
    finish: 'Smooth Silky Tie-Hole Finish / Board Formed',
    description: 'High compressive strength architectural concrete engineered with pozzolanic additives for flawless surface finish and carbon-reducing life-cycle durability.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyWG97tigDOcs0297b-Y06thibF199-QgtG3_k6Yw2bxMuoINjosqS_nhZNFY3VPLl5xn5slEspW3nN0GQo2kJDshn-kiTT0xOJg3AauT4zOhSJstekNTI8sLLnEsSCCOnDqhLYsWC_gYWGjXPRYsnw5y5K0na5W8fFE-BmUzU3zAhTKcHxobnSrZC5rTEVNL8oGLAQzhESXg6o4qsF4Zx_xjiIgI23RA78Jw6OHDcpSm4aWz5ve0',
    applications: ['Cantilevered overhangs', 'Shear walls', 'Minimalist facades', 'Reflecting pool surrounds']
  },
  {
    id: 'mat-calacatta',
    name: 'Bookmatched Calacatta Viola Marble',
    category: 'Surfaces',
    origin: 'Carrara Region, Tuscany, Italy',
    sustainabilityRating: 'EPD Certified Natural Stone',
    finish: 'Honed Matte Silk Finish',
    description: 'Selected from premium Tuscan quarries, Calacatta Viola displays dramatic deep burgundy veining against pristine creamy white calcites, bookmatched with laser alignment.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIRzjtk35dk3HwRLK8PamSRSvZbzTIjQDepGm_MbiA-M99G1WAyBZ0hcWeFWkN6uBDqQtWRK0WhXhsnVgLwytD8RunZDMwiquH2F7wcB_kYTntG3phtqEx78f1MblCl1HAkOjdofbsX8k1GjerbTFqGBIeo4BGTaRKvObOi-EBNpglzCUvr0z7PTiHS1v4LAx2G8hSf9sV0f9KK7_2ZpNmGjnXiTzKBODS-WfPZULLBd4f6Ev_uE',
    applications: ['Kitchen waterfall islands', 'Feature wall cladding', 'Master bath vanities', 'Custom fire surrounds']
  },
  {
    id: 'mat-blackened-steel',
    name: 'Structural Blackened Steel & Gantry',
    category: 'Structural',
    origin: 'Precision Hot-Rolled American Steel',
    sustainabilityRating: '95% Recycled Content',
    finish: 'Hand-Patinated Matte Black Wax Finish',
    description: 'Hot-rolled carbon steel structural framing finished with proprietary hand-applied patinas to yield an organic, velvety dark tone that never chips or degrades.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36ih_VFLujhe7hbRZyZGISFOmtvmWT3QH1CE-17ePlS7luyaLz9rzs0znJaZ-QU0gX1YCEZxU01smzQ6zt83jKTKHr8J9BR3gsAo7CKvsWp30SWOtyD6F19oCCqvJWVFYOeosXcVKENXlsuTJOKsQTz4p94Y1kBkaB-wMrwkj27pwRGzKGjCMYZhnNsM9yBcRUPms4S2OWpF-ldZt69eerUklht7XVvXEFaHyHIaFKtvhm6rHbSY',
    applications: ['Curtain wall mullions', 'Suspended liquor gantries', 'Floating stair stringers', 'Exposed structural framing']
  }
];

export const BUDGET_TIERS = [
  { label: 'Under $250k', min: 100000, max: 250000, desc: 'Boutique renovation or specialized room build' },
  { label: '$250k - $500k', min: 250000, max: 500000, desc: 'High-end interior fitout or major remodel' },
  { label: '$500k - $1M', min: 500000, max: 1000000, desc: 'Full custom residential wing or commercial venue' },
  { label: '$1M - $5M', min: 1000000, max: 5000000, desc: 'Ground-up luxury bespoke estate or hospitality venue' },
  { label: '$5M+', min: 5000000, max: 20000000, desc: 'Masterpiece architectural compound or enterprise facility' }
];
