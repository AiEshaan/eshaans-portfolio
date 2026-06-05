export interface Education {
  id?: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  performance: string;
  details: string[];
  displayOrder: number;
  status: string;
  version: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
