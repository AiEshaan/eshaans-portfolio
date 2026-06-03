import neuraSentinel from "../../assets/projects/neura-sentinel/project.json";
import founderFinder from "../../assets/projects/founder-finder/project.json";
import spamDetector from "../../assets/projects/spam-detector/project.json";
import skinCancer from "../../assets/projects/skin-cancer/project.json";
import karunadaKala from "../../assets/projects/karunada-kala/project.json";

export interface ProjectData {
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
}

export const projectManifest: ProjectData[] = [
  neuraSentinel,
  founderFinder,
  spamDetector,
  skinCancer,
  karunadaKala
].sort((a, b) => a.displayOrder - b.displayOrder);
