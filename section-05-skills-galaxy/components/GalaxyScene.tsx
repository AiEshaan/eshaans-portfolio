"use client";

import React from "react";
import { CharacterAssetManager } from "../../shared/character/CharacterAssetManager";
import { SkillsGalaxy } from "./SkillsGalaxy";
import { Skill } from "../../types/Skill";

interface GalaxySceneProps {
  scrollProgress: number;
  onSelectPlanet: (category: string) => void;
  selectedPlanet: string | null;
  skills: Skill[];
}

export function GalaxyScene({ scrollProgress, onSelectPlanet, selectedPlanet, skills }: GalaxySceneProps) {
  // Snaps directly to character left open palm hotspot position [0.35, -0.1, 0.4]
  const palmPos = CharacterAssetManager.getHotspotOffset("palm");

  // Show galaxy only during phase 5: scrollProgress >= 0.80
  const isVisible = scrollProgress >= 0.80;

  if (!isVisible) return null;

  return (
    <group position={palmPos}>
      <SkillsGalaxy
        scrollProgress={scrollProgress}
        onSelectPlanet={onSelectPlanet}
        selectedPlanet={selectedPlanet}
        skills={skills}
      />
    </group>
  );
}

export default GalaxyScene;
