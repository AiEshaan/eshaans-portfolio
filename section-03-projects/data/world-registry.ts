import React from "react";
import { NeuraSentinelWorld } from "../worlds/neura-sentinel/NeuraSentinelWorld";
import { KarunadaKalaWorld } from "../worlds/karunada-kala/KarunadaKalaWorld";
import { FounderFinderWorld } from "../worlds/founder-finder/FounderFinderWorld";
import { SpamDetectorWorld } from "../worlds/spam-detector/SpamDetectorWorld";
import { SkinCancerWorld } from "../worlds/skin-cancer/SkinCancerWorld";

export const projectWorlds: Record<string, React.ComponentType<{ isActive: boolean; onClose: () => void }>> = {
  "Neura Sentinel": NeuraSentinelWorld,
  "Karunada Kala": KarunadaKalaWorld,
  "Founder Finder": FounderFinderWorld,
  "YouTube Spam Detector": SpamDetectorWorld,
  "Skin Cancer Classifier": SkinCancerWorld
};
