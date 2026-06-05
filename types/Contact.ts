export interface GithubRepo {
  name: string;
  desc: string;
  stars: number;
}

export interface ContactProfile {
  id?: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  githubRepos: GithubRepo[];
  linkedinSummary: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: unknown;
  status: "unread" | "read" | "replied";
}

export interface ContactChannel {
  id?: string;
  type: "email" | "github" | "linkedin" | "resume";
  title: string;
  value: string;
  url: string;
  icon: string;
  displayOrder: number;
  status: string;
  version: number;
  createdAt?: unknown;
  updatedAt?: unknown;
  githubRepos?: { name: string; desc: string; stars: number }[];
  linkedinSummary?: string;
}
