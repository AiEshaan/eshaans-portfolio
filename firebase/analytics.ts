import { getAnalytics, isSupported, logEvent as firebaseLogEvent, Analytics } from "firebase/analytics";
import app from "./firebase";
import { AnalyticsService } from "./firestore";
import { PortfolioEventType } from "../types/Analytics";

// Analytics instance (only loaded in browser environments when supported)
let analyticsInstance: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  });
}

// Generate or retrieve a persistent session ID for the user's browser session
let cachedSessionId: string | null = null;
function getSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  if (cachedSessionId) return cachedSessionId;

  let sid = sessionStorage.getItem("portfolio_session_id");
  if (!sid) {
    sid = "session_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now().toString(36);
    sessionStorage.setItem("portfolio_session_id", sid);
  }
  cachedSessionId = sid;
  return sid;
}

function getDeviceType(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export const AnalyticsTracker = {
  /**
   * Logs a custom portfolio analytics event directly to the Firestore `analytics_events` collection,
   * with a fallback/dual-log to standard Google Analytics if available.
   */
  logPortfolioEvent(eventType: PortfolioEventType, entityId: string): void {
    const sessionId = getSessionId();
    const deviceType = getDeviceType();
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    // 1. Log to Firestore analytics_events collection
    AnalyticsService.logEvent(eventType, entityId, sessionId, deviceType, referrer).catch((e) => {
      console.error("Firestore analytics log failed:", e);
    });

    // 2. Dual-log to Firebase Analytics if available
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, eventType, {
        entityId,
        sessionId,
        deviceType,
        referrer
      });
    }

    // 3. Debug logging in development environments
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics] Event logged: "${eventType}" | entityId: "${entityId}" | sessionId: "${sessionId}" | deviceType: "${deviceType}"`);
    }
  },

  /**
   * Dispatches a page view tracker event.
   */
  logPageView(pagePath: string): void {
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  },

  /**
   * Logs custom engagement clicks (e.g. downloads, social interactions).
   */
  logCustomEvent(name: string, params?: Record<string, unknown>): void {
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, name, params);
    }
  }
};
