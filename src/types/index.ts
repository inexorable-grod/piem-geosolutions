export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer' | 'client'
  avatar?: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  lastLogin?: string
  company?: string
  country?: string
}

export interface Project {
  id: string
  name: string
  client: string
  country: string
  type: ProjectType
  status: ProjectStatus
  startDate: string
  endDate?: string
  description: string
  team: string[]
  progress: number
  value?: number
  currency?: string
}

export type ProjectType =
  | 'reservoir_characterization'
  | 'seismic_interpretation'
  | 'static_modeling'
  | 'dynamic_simulation'
  | 'production_optimization'
  | 'surface_facilities'
  | 'data_management'
  | 'economic_evaluation'

export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'proposal'

export interface Service {
  id: string
  title: string
  titleEs: string
  category: ServiceCategory
  description: string
  icon: string
  features: string[]
  isVisible: boolean
}

export type ServiceCategory =
  | 'exploration'
  | 'modeling'
  | 'production_subsurface'
  | 'production_surface'
  | 'data_technology'
  | 'economic_sustainability'

export interface Client {
  id: string
  name: string
  logo?: string
  country: string
  sector: string
  projectCount: number
  since: string
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  totalClients: number
  countriesCount: number
  teamSize: number
  completedProjects: number
  projectsThisYear: number
  revenueGrowth: number
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Session {
  user: {
    id: string
    name: string
    email: string
    role: string
    image?: string
  }
  expires: string
}
