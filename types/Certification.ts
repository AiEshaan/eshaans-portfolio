export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skillsVerified: string[];
  skills: string[];
  badgeUrl: string;
  badge: string;
  pdfUrl: string;
  pdf: string;
  displayOrder: number;
  status: string;
  version: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
