"use client";

import React from "react";
import { PocketDoor } from "./PocketDoor";
import { ProjectCapsule } from "./ProjectCapsule";
import { projectManifest } from "../data/project-manifest";

interface ProjectPocketProps {
  scrollProgress: number;
  onSelectProject: (title: string) => void;
  selectedProject: string | null;
}

export function ProjectPocket({ scrollProgress, onSelectProject, selectedProject }: ProjectPocketProps) {
  return (
    <group>
      {/* Pocket Flap / Door */}
      <PocketDoor scrollProgress={scrollProgress} />

      {/* Floating Project Capsules */}
      {projectManifest.map((project, index) => (
        <ProjectCapsule
          key={project.title}
          project={project}
          index={index}
          scrollProgress={scrollProgress}
          onSelect={onSelectProject}
          isSelected={selectedProject === project.title}
        />
      ))}
    </group>
  );
}
