export interface ResumeData {
  id?: string;
  name: string;          // e.g., "AI Engineer", "Full Stack"
  url: string;           // Firebase Storage URL
  isActive: boolean;     // Whether this is the resume shown on the public site
  updatedAt: unknown;    // Firestore Timestamp
  version: number;       // e.g., 1
  status: "published" | "archived";
}
