"use client";

import React from "react";
import { ExperienceVault } from "./ExperienceVault";

interface ExperienceSceneProps {
  scrollProgress: number;
  onSelectExperience: (company: string) => void;
  selectedExperience: string | null;
}

export function ExperienceScene({ scrollProgress, onSelectExperience, selectedExperience }: ExperienceSceneProps) {
  return (
    <group>
      <ExperienceVault
        scrollProgress={scrollProgress}
        onSelectExperience={onSelectExperience}
        selectedExperience={selectedExperience}
      />
    </group>
  );
}
export default ExperienceScene;
