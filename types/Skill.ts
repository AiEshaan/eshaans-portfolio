export interface Skill {
  id?: string;
  category: string;
  icon: string;
  tools: string[];
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
