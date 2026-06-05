export interface Project {
  id?: string;
  title: string;
  tagline: string;
  status: string;
  category: string;
  description: string;
  problemSolved: string;
  techStack: string[];
  toolsUsed: string[];
  keyFeatures: string[];
  thumbnail: string;
  gallery: string[];
  architectureDiagram: string;
  videoDemo: string;
  github: string;
  liveDemo: string;
  featured: boolean;
  displayOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
