import { Service, Project, User } from '@/types'

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Team', href: '#team' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
]

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Exploration & Reservoir Characterization',
    titleEs: 'Exploración y Caracterización de Yacimientos',
    category: 'exploration',
    description: 'Advanced seismic acquisition, structural interpretation using Neural Networks, and comprehensive petrophysical modeling.',
    icon: 'Search',
    features: [
      'Seismic acquisition & processing',
      'Structural interpretation (Neural Networks)',
      'Pre & Post Stack attribute analysis & inversion',
      'Basin analysis & sequential stratigraphy',
      'Core analysis, facies & sedimentological models',
      'Advanced petrophysical modeling',
    ],
    isVisible: true,
  },
  {
    id: 's2',
    title: 'Modeling & Simulation',
    titleEs: 'Modelado y Simulación',
    category: 'modeling',
    description: 'Static and dynamic reservoir model construction with numerical production simulation and PVT analysis.',
    icon: 'Layers',
    features: [
      'Static & dynamic reservoir model construction',
      'Numerical production simulation',
      'Flow unit definition',
      'PVT analysis',
      'Production history analysis',
    ],
    isVisible: true,
  },
  {
    id: 's3',
    title: 'Production: Subsurface',
    titleEs: 'Producción: Subsuelo',
    category: 'production_subsurface',
    description: 'Productivity evaluation, artificial lift optimization, and formation damage removal.',
    icon: 'TrendingUp',
    features: [
      'Productivity evaluation',
      'Well design & artificial lift optimization',
      'Subsurface-surface integration',
      'Formation damage removal',
    ],
    isVisible: true,
  },
  {
    id: 's4',
    title: 'Production: Surface & EPC',
    titleEs: 'Producción: Superficie e IPC',
    category: 'production_surface',
    description: 'Engineering, Procurement & Construction (EPC) with predictive maintenance and fluid transport optimization.',
    icon: 'Settings',
    features: [
      'Engineering, Procurement & Construction (EPC)',
      'Predictive/preventive facility maintenance',
      'Fluid treatment & transport cost optimization',
    ],
    isVisible: true,
  },
  {
    id: 's5',
    title: 'Data Management & Technology',
    titleEs: 'Gestión de Datos y Tecnología',
    category: 'data_technology',
    description: 'Intelligent database generation, IoT & AI automation, and data governance.',
    icon: 'Database',
    features: [
      'Intelligent database generation',
      'IoT & applied AI automation',
      'Data management & governance',
    ],
    isVisible: true,
  },
  {
    id: 's6',
    title: 'Economic Evaluation & Sustainability',
    titleEs: 'Evaluación Económica y Sostenibilidad',
    category: 'economic_sustainability',
    description: 'Reserve estimation, risk-based economic evaluation, energy optimization, and environmental studies.',
    icon: 'BarChart2',
    features: [
      'Reserve estimation & quantification',
      'Economic evaluation with risk analysis',
      'Energy optimization & decarbonization',
      'Equipment & technology supply',
      'Quality control at all stages',
      'Environmental & sustainability studies',
    ],
    isVisible: true,
  },
]

// ─── TECHNOLOGY PARTNERS ──────────────────────────────────────────────────────
export const TECH_PARTNERS = [
  { name: 'qStrat', type: 'in-house', description: 'Proprietary stratigraphic analysis tool' },
  { name: 'Oracle', type: 'partner', description: 'Enterprise database solutions' },
  { name: 'OpendTect', type: 'partner', description: 'Open-source seismic interpretation' },
  { name: 'PetroNinja', type: 'partner', description: 'Well data analytics platform' },
  { name: 'GS Software', type: 'partner', description: 'Geoscience software suite' },
  { name: 'GeoSoftware', type: 'partner', description: 'Reservoir characterization tools' },
  { name: 'CMG', type: 'partner', description: 'Reservoir simulation software' },
  { name: 'Kappa', type: 'partner', description: 'Well testing & production analysis' },
]

// ─── TEAM STRUCTURE ───────────────────────────────────────────────────────────
export const TEAM_DEPARTMENTS = [
  {
    id: 'static',
    name: 'Static Model',
    color: '#d4a520',
    members: [
      '3 Geological Engineers',
      'MSc. Geologist',
      'Dr. Geologist',
      '5 Geophysical Engineers',
    ],
  },
  {
    id: 'dynamic',
    name: 'Dynamic Model',
    color: '#b88a10',
    members: ['4 Petroleum Engineers', 'MSc. Petroleum', '4 Geological Engineers'],
  },
  {
    id: 'reserves',
    name: 'Reserve Evaluation',
    color: '#8f6a0c',
    members: ['2 Petroleum Engineers'],
  },
  {
    id: 'production',
    name: 'Production',
    color: '#d4a520',
    members: ['4 Petroleum Engineers', 'Geological Engineer'],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    color: '#1a4a6b',
    members: ['PhD Mathematician', 'PhD Geostatistician', '2 PhD Computer Scientists'],
  },
  {
    id: 'surface',
    name: 'Surface Facilities',
    color: '#2d7a4a',
    members: ['Mechanical Engineer', 'Chemical Engineer', 'Process Engineer', 'Electrical Engineer'],
  },
]

// ─── STATS ────────────────────────────────────────────────────────────────────
export const COMPANY_STATS = [
  { value: 20, suffix: '+', label: 'Years of Experience', labelEs: 'Años de Experiencia' },
  { value: 150, suffix: '+', label: 'Projects Completed', labelEs: 'Proyectos Completados' },
  { value: 20, suffix: '', label: 'Countries', labelEs: 'Países' },
  { value: 30, suffix: '+', label: 'Expert Professionals', labelEs: 'Expertos Profesionales' },
]

// ─── MOCK PROJECTS (Admin Panel) ─────────────────────────────────────────────
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Llanos Basin Reservoir Study',
    client: 'Canacol Energy',
    country: 'Colombia',
    type: 'reservoir_characterization',
    status: 'active',
    startDate: '2024-06-01',
    description: 'Full reservoir characterization with 3D seismic interpretation',
    team: ['María González', 'Carlos Mendez'],
    progress: 65,
    value: 450000,
    currency: 'USD',
  },
  {
    id: 'p2',
    name: 'Maracaibo Dynamic Model Update',
    client: 'PDVSA',
    country: 'Venezuela',
    type: 'dynamic_simulation',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2024-03-30',
    description: 'Full field dynamic model update with production history matching',
    team: ['Roberto Silva'],
    progress: 100,
    value: 320000,
    currency: 'USD',
  },
  {
    id: 'p3',
    name: 'Block 19 Production Optimization',
    client: 'Parex Resources',
    country: 'Colombia',
    type: 'production_optimization',
    status: 'active',
    startDate: '2024-09-01',
    description: 'Artificial lift optimization and formation damage assessment',
    team: ['Ana Rodríguez'],
    progress: 30,
    value: 185000,
    currency: 'USD',
  },
]

// ─── MOCK USERS (Admin Panel - no DB) ────────────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: 'u0',
    name: 'System Administrator',
    email: 'admin@piemgeosolutions.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString(),
    company: 'PIEM GeoSolutions LLC',
    country: 'Venezuela',
  },
  {
    id: 'u1',
    name: 'María González',
    email: 'maria@piemgeosolutions.com',
    role: 'analyst',
    status: 'active',
    createdAt: '2024-02-15',
    lastLogin: '2025-02-20T10:30:00Z',
    company: 'PIEM GeoSolutions LLC',
    country: 'Colombia',
  },
  {
    id: 'u2',
    name: 'Carlos Mendez',
    email: 'carlos@petroexplorers.com',
    role: 'analyst',
    status: 'active',
    createdAt: '2024-03-01',
    lastLogin: '2025-02-22T14:15:00Z',
    company: 'Petro-Explorers Inc.',
    country: 'Canada',
  },
  {
    id: 'u3',
    name: 'John Mitchell',
    email: 'jmitchell@canacol.com',
    role: 'client',
    status: 'active',
    createdAt: '2024-06-10',
    company: 'Canacol Energy',
    country: 'Canada',
  },
]

// ─── CONTACT INFO ─────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  piem: {
    name: 'PIEM Geosolutions LLC',
    address: 'Edificio IASA, Piso 6, Oficina 606, La Castellana, Caracas, Venezuela',
    phone: '+58 212 265 5321',
    website: 'www.piemgeosolutions.com',
    countries: ['Venezuela', 'Colombia', 'USA'],
  },
  petro: {
    name: 'Petro-Explorers Inc.',
    address: '520, 727 7th Avenue SW, Calgary, Alberta, T2P 0Z5, Canada',
    phone: '+1 403 978 1753',
    website: 'www.petroexplorers.com',
  },
}
