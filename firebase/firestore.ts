import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  onSnapshot
} from "firebase/firestore";


// Type imports
import { Project } from "../types/Project";
import { Experience } from "../types/Experience";
import { Skill } from "../types/Skill";
import { Education } from "../types/Education";
import { ResumeData } from "../types/Resume";
import { Certification } from "../types/Certification";
import { ContactProfile, ContactMessage, ContactChannel } from "../types/Contact";
import { AnalyticsEvent, AnalyticsSummary } from "../types/Analytics";
import { PortfolioConfig } from "../types/Config";

// Local manifest fallbacks for offline stability
import { projectManifest } from "../section-03-projects/data/project-manifest";
import { experienceManifest } from "../section-04-experience/data/experience-manifest";
import { educationManifest } from "../section-06-education/data/education-manifest";
import { certificationsManifest } from "../section-07-certifications/data/certifications-manifest";
import { contactManifest } from "../section-08-contact/data/contact-manifest";
import skillsFallback from "../public/assets/skills/skills.json";

// Helper generic converter for Firestore typings
const converter = <T extends object>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T): DocumentData => {
    // Strip id property before writing to firestore document body
    const copy = { ...data } as Record<string, unknown>;
    delete copy.id;
    return copy;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data
    } as unknown as T;
  }
});

// Type-safe collections helper
const getTypedCollection = <T extends object>(collectionName: string) => {
  return collection(db, collectionName).withConverter(converter<T>());
};

// ==========================================
// 1. Projects Service
// ==========================================
export const ProjectsService = {
  async getAll(): Promise<Project[]> {
    try {
      const q = query(getTypedCollection<Project>("projects"), orderBy("displayOrder", "asc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      if (items.length === 0) return this.getFallback();
      return items;
    } catch (e) {
      console.warn("Firestore projects load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const docRef = doc(db, "projects", id).withConverter(converter<Project>());
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (e) {
      console.error("Error fetching project: ", e);
      return null;
    }
  },

  async create(data: Omit<Project, "id">): Promise<string> {
    const docRef = await addDoc(getTypedCollection<Project>("projects"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as unknown as Project);
    return docRef.id;
  },

  async update(id: string, data: Partial<Project>): Promise<void> {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as DocumentData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
  },

  getFallback(): Project[] {
    return projectManifest.map((p, idx) => ({
      ...p,
      id: `local-project-${idx}`
    }));
  }
};

// ==========================================
// 2. Experience Service
// ==========================================
export const ExperienceService = {
  async getAll(): Promise<Experience[]> {
    try {
      const q = query(getTypedCollection<Experience>("experiences"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      if (items.length === 0) return this.getFallback();
      return items;
    } catch (e) {
      console.warn("Firestore experience load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async create(data: Omit<Experience, "id">): Promise<string> {
    const docRef = await addDoc(getTypedCollection<Experience>("experiences"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as unknown as Experience);
    return docRef.id;
  },

  async update(id: string, data: Partial<Experience>): Promise<void> {
    const docRef = doc(db, "experiences", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as DocumentData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, "experiences", id);
    await deleteDoc(docRef);
  },

  getFallback(): Experience[] {
    return experienceManifest.map((exp, idx) => ({
      ...exp,
      id: `local-exp-${idx}`,
      status: "published",
      version: 1
    }));
  }
};

// ==========================================
// 3. Skills Service
// ==========================================
export const SkillsService = {
  async getAll(): Promise<Skill[]> {
    try {
      const q = query(getTypedCollection<Skill>("skills"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      if (items.length === 0) return this.getFallback();
      return items;
    } catch (e) {
      console.warn("Firestore skills load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async create(data: Omit<Skill, "id">): Promise<string> {
    const docRef = await addDoc(getTypedCollection<Skill>("skills"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as unknown as Skill);
    return docRef.id;
  },

  async update(id: string, data: Partial<Skill>): Promise<void> {
    const docRef = doc(db, "skills", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as DocumentData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, "skills", id);
    await deleteDoc(docRef);
  },

  getFallback(): Skill[] {
    return skillsFallback.map((s, idx) => ({
      ...s,
      id: `local-skill-${idx}`
    }));
  }
};

// ==========================================
// 4. Education Service
// ==========================================
export const EducationService = {
  async getAll(): Promise<Education[]> {
    try {
      const q = getTypedCollection<Education>("education");
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      if (items.length === 0) return this.getFallback();
      return items;
    } catch (e) {
      console.warn("Firestore education load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async create(data: Omit<Education, "id">): Promise<string> {
    const docRef = await addDoc(getTypedCollection<Education>("education"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as unknown as Education);
    return docRef.id;
  },

  async update(id: string, data: Partial<Education>): Promise<void> {
    const docRef = doc(db, "education", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as DocumentData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, "education", id);
    await deleteDoc(docRef);
  },

  getFallback(): Education[] {
    return educationManifest.map((edu, idx) => ({
      ...edu,
      id: `local-edu-${idx}`,
      displayOrder: idx + 1,
      status: "published",
      version: 1
    }));
  }
};

// ==========================================
// 5. Certifications Service
// ==========================================
export const CertificationsService = {
  async getAll(): Promise<Certification[]> {
    try {
      const q = getTypedCollection<Certification>("certifications");
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      if (items.length === 0) return this.getFallback();
      return items;
    } catch (e) {
      console.warn("Firestore certifications load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async create(data: Omit<Certification, "id">): Promise<string> {
    const docRef = await addDoc(getTypedCollection<Certification>("certifications"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as unknown as Certification);
    return docRef.id;
  },

  async update(id: string, data: Partial<Certification>): Promise<void> {
    const docRef = doc(db, "certifications", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as DocumentData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, "certifications", id);
    await deleteDoc(docRef);
  },

  getFallback(): Certification[] {
    return certificationsManifest.map((cert, idx) => ({
      ...cert,
      id: `local-cert-${idx}`,
      issueDate: cert.date,
      skills: cert.skillsVerified,
      pdf: cert.pdfUrl,
      badge: "",
      badgeUrl: "",
      verificationUrl: "",
      displayOrder: idx + 1,
      status: "published",
      version: 1
    }));
  }
};

// ==========================================
// 6. Contact Settings & Messages Service
// ==========================================
export const ContactService = {
  async getProfile(): Promise<ContactProfile> {
    try {
      const docRef = doc(db, "contact", "profile").withConverter(converter<ContactProfile>());
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : { ...contactManifest, id: "local-contact-profile" };
    } catch (e) {
      console.warn("Firestore contact profile load failed, loading offline fallback: ", e);
      return { ...contactManifest, id: "local-contact-profile" };
    }
  },

  async getAllChannels(): Promise<ContactChannel[]> {
    try {
      const q = query(getTypedCollection<ContactChannel>("contact"), orderBy("displayOrder", "asc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => doc.data());
      // Filter out any potential non-channel documents (like profile config if stored in same collection)
      const channels = items.filter(item => item.type !== undefined);
      if (channels.length === 0) return this.getChannelsFallback();
      return channels;
    } catch (e) {
      console.warn("Firestore contact channels load failed, loading offline fallback: ", e);
      return this.getChannelsFallback();
    }
  },

  async updateProfile(data: Partial<ContactProfile>): Promise<void> {
    const docRef = doc(db, "contact", "profile");
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
  },

  async submitMessage(name: string, email: string, subject: string, message: string): Promise<string> {
    const messageData: Omit<ContactMessage, "id"> = {
      name,
      email,
      subject,
      message,
      timestamp: serverTimestamp(),
      status: "unread"
    };
    const docRef = await addDoc(getTypedCollection<ContactMessage>("messages"), messageData as unknown as ContactMessage);
    return docRef.id;
  },

  async getMessages(): Promise<ContactMessage[]> {
    const q = query(getTypedCollection<ContactMessage>("messages"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  },

  async updateMessageStatus(id: string, status: "unread" | "read" | "replied"): Promise<void> {
    const docRef = doc(db, "messages", id);
    await updateDoc(docRef, { status });
  },

  getFallback(): ContactProfile {
    return {
      ...contactManifest,
      id: "local-contact-profile"
    };
  },

  getChannelsFallback(): ContactChannel[] {
    return [
      {
        id: "local-contact-email",
        type: "email",
        title: "Mail app",
        value: contactManifest.email,
        url: `mailto:${contactManifest.email}`,
        icon: "Mail",
        displayOrder: 1,
        status: "published",
        version: 1
      },
      {
        id: "local-contact-github",
        type: "github",
        title: "GitHub Hub",
        value: "AiEshaan",
        url: contactManifest.github,
        icon: "Github",
        displayOrder: 2,
        status: "published",
        version: 1,
        githubRepos: contactManifest.githubRepos
      },
      {
        id: "local-contact-linkedin",
        type: "linkedin",
        title: "LinkedIn net",
        value: "eshaanpm",
        url: contactManifest.linkedin,
        icon: "Linkedin",
        displayOrder: 3,
        status: "published",
        version: 1,
        linkedinSummary: contactManifest.linkedinSummary
      },
      {
        id: "local-contact-resume",
        type: "resume",
        title: "Resume Reader",
        value: "Eshaan's Resume",
        url: contactManifest.resumeUrl,
        icon: "FileText",
        displayOrder: 4,
        status: "published",
        version: 1
      }
    ];
  }
};

// ==========================================
// 7. Analytics Service
// ==========================================
export const AnalyticsService = {
  async logEvent(
    eventType: AnalyticsEvent["eventType"],
    entityId: string,
    sessionId: string,
    deviceType: string,
    referrer: string
  ): Promise<void> {
    try {
      const event: Omit<AnalyticsEvent, "id"> = {
        eventType,
        entityId,
        timestamp: serverTimestamp(),
        sessionId,
        deviceType,
        referrer
      };
      await addDoc(getTypedCollection<AnalyticsEvent>("analytics_events"), event as unknown as AnalyticsEvent);
    } catch (e) {
      console.error("Analytics log event failed: ", e);
    }
  },

  async getSummary(): Promise<AnalyticsSummary | null> {
    try {
      const docRef = doc(db, "analytics", "summary").withConverter(converter<AnalyticsSummary>());
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (e) {
      console.error("Analytics get summary failed: ", e);
      return null;
    }
  },

  async updateSummary(summary: Partial<AnalyticsSummary>): Promise<void> {
    const docRef = doc(db, "analytics", "summary");
    await setDoc(docRef, {
      ...summary,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  },

  subscribeToEvents(callback: (events: AnalyticsEvent[]) => void): () => void {
    const q = query(
      getTypedCollection<AnalyticsEvent>("analytics_events"),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => doc.data());
      callback(events);
    }, (error) => {
      console.error("Firestore analytics_events subscription failed:", error);
    });
  }
};

// ==========================================
// 8. Portfolio Config Service
// ==========================================
export const ConfigService = {
  async getConfig(): Promise<PortfolioConfig> {
    try {
      const docRef = doc(db, "settings", "portfolioConfig").withConverter(converter<PortfolioConfig>());
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : this.getFallback();
    } catch (e) {
      console.warn("Firestore config load failed, loading offline fallback: ", e);
      return this.getFallback();
    }
  },

  async updateConfig(config: Partial<PortfolioConfig>): Promise<void> {
    const docRef = doc(db, "settings", "portfolioConfig");
    await setDoc(docRef, {
      ...config,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  },

  getFallback(): PortfolioConfig {
    return {
      id: "local-portfolio-config",
      projectsEnabled: true,
      experienceEnabled: true,
      skillsEnabled: true,
      educationEnabled: true,
      certificationsEnabled: true,
      contactEnabled: true,
      maintenanceMode: false
    };
  }
};

// ==========================================
// 9. Resume Service
// ==========================================
export const ResumeService = {
  async getResumes(): Promise<ResumeData[]> {
    const colRef = collection(db, "resumes").withConverter(converter<ResumeData>());
    const q = query(colRef, orderBy("version", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  },

  async addResume(data: Omit<ResumeData, "id">): Promise<string> {
    const colRef = collection(db, "resumes").withConverter(converter<ResumeData>());
    const docRef = await addDoc(colRef, {
      ...data,
      updatedAt: serverTimestamp()
    } as any);

    if (data.isActive && data.url) {
      const contactRef = doc(db, "contact", "contact-resume");
      try {
        await updateDoc(contactRef, {
          url: data.url,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.warn("Could not update contact-resume channel on add.", e);
      }
    }

    return docRef.id;
  },

  async setActiveResume(id: string): Promise<void> {
    const resumes = await this.getResumes();
    
    // Batch updates would be better, but loop is fine for a few resumes
    let activeUrl = "";
    for (const resume of resumes) {
      if (resume.id) {
        const isActive = resume.id === id;
        if (isActive) activeUrl = resume.url;
        
        const docRef = doc(db, "resumes", resume.id);
        await updateDoc(docRef, {
          isActive: isActive,
          updatedAt: serverTimestamp()
        });
      }
    }

    // Also update the Contact channel to reflect the active resume
    if (activeUrl) {
      const contactRef = doc(db, "contact", "contact-resume");
      try {
        await updateDoc(contactRef, {
          url: activeUrl,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.warn("Could not update contact-resume channel. It might not exist.", e);
      }
    }
  },

  async deleteResume(id: string): Promise<void> {
    const docRef = doc(db, "resumes", id);
    await deleteDoc(docRef);
  }
};

