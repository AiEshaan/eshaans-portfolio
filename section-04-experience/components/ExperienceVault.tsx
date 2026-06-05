"use client";

import React from "react";
import { VaultDoor } from "./VaultDoor";
import { ExperienceCapsule } from "./ExperienceCapsule";
import { Experience } from "../../types/Experience";

interface ExperienceVaultProps {
  scrollProgress: number;
  onSelectExperience: (company: string) => void;
  selectedExperience: string | null;
  experiences: Experience[];
}

export function ExperienceVault({ scrollProgress, onSelectExperience, selectedExperience, experiences }: ExperienceVaultProps) {
  // Hide vault mesh system when inside a specific experience subworld overlay
  if (selectedExperience !== null) return null;

  return (
    <group>
      {/* Zipper mechanism */}
      <VaultDoor scrollProgress={scrollProgress} />

      {/* Floating experience records */}
      {experiences.map((exp, index) => (
        <ExperienceCapsule
          key={exp.company}
          experience={exp}
          index={index}
          scrollProgress={scrollProgress}
          onSelect={onSelectExperience}
        />
      ))}
    </group>
  );
}
export default ExperienceVault;
