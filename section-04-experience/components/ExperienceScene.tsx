"use client";

import React from "react";
import { ExperienceVault } from "./ExperienceVault";

import { Experience } from "../../types/Experience";

interface ExperienceSceneProps {
  scrollProgress: number;
  onSelectExperience: (company: string) => void;
  selectedExperience: string | null;
  experiences: Experience[];
}

export function ExperienceScene({ scrollProgress, onSelectExperience, selectedExperience, experiences }: ExperienceSceneProps) {
  return (
    <group>
      <ExperienceVault
        scrollProgress={scrollProgress}
        onSelectExperience={onSelectExperience}
        selectedExperience={selectedExperience}
        experiences={experiences}
      />
    </group>
  );
}
export default ExperienceScene;
