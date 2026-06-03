"use client";

import React from "react";
import { ProjectPocket } from "./ProjectPocket";

interface PocketSceneProps {
  scrollProgress: number;
  onSelectProject: (title: string) => void;
  selectedProject: string | null;
}

export function PocketScene({ scrollProgress, onSelectProject, selectedProject }: PocketSceneProps) {
  return (
    <group>
      <ProjectPocket
        scrollProgress={scrollProgress}
        onSelectProject={onSelectProject}
        selectedProject={selectedProject}
      />
    </group>
  );
}
