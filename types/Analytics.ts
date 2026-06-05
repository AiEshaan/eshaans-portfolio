export type PortfolioEventType =
  | "project_view"
  | "project_world_enter"
  | "project_world_exit"
  | "experience_view"
  | "experience_world_enter"
  | "skill_open"
  | "certificate_open"
  | "contact_open"
  | "github_click"
  | "linkedin_click"
  | "resume_download"
  | "email_click";

export interface AnalyticsEvent {
  id?: string;
  eventType: PortfolioEventType;
  entityId: string;
  timestamp: unknown;
  sessionId: string;
  deviceType: string;
  referrer: string;
}

export interface AnalyticsSummary {
  id?: string;
  totalViews: number;
  projectViews: Record<string, number>;
  experienceViews: Record<string, number>;
  resumeDownloads: number;
  socialClicks: Record<string, number>;
  contactOpens: number;
  lastUpdated: unknown;
}
