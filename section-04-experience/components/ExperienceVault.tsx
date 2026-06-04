"use client";

import React from "react";
import { VaultDoor } from "./VaultDoor";
import { ExperienceCapsule } from "./ExperienceCapsule";
import { experienceManifest } from "../data/experience-manifest";

interface ExperienceVaultProps {
  scrollProgress: number;
  onSelectExperience: (company: string) => void;
  selectedExperience: string | null;
}

export function ExperienceVault({ scrollProgress, onSelectExperience, selectedExperience }: ExperienceVaultProps) {
  // Hide vault mesh system when inside a specific experience subworld overlay
  if (selectedExperience !== null) return null;

  return (
    <group>
      {/* Zipper mechanism */}
      <VaultDoor scrollProgress={scrollProgress} />

      {/* Floating experience records */}
      {experienceManifest.map((exp, index) => (
        <ExperienceCapsule
          key={exp.company}
          experience={exp}
          index={index}
          scrollProgress={scrollProgress}
          onSelect={onSelectExperience}
          isSelected={selectedExperience === exp.company}
        />
      ))}
    </group>
  );
}
export default ExperienceVault;
