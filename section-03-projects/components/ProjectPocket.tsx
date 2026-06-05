"use client";

import React, { useEffect, useState } from "react";
import { PocketDoor } from "./PocketDoor";
import { ProjectCapsule } from "./ProjectCapsule";
import { projectManifest } from "../data/project-manifest";
import { ProjectsService } from "../../firebase/firestore";
import { Project } from "../../types/Project";

interface ProjectPocketProps {
  scrollProgress: number;
  onSelectProject: (title: string) => void;
  selectedProject: string | null;
}

export function ProjectPocket({ scrollProgress, onSelectProject, selectedProject }: ProjectPocketProps) {
  const [projects, setProjects] = useState<Project[]>(projectManifest as Project[]);

  useEffect(() => {
    let active = true;
    async function loadProjects() {
      try {
        const data = await ProjectsService.getAll();
        if (active) {
          setProjects(data);
        }
      } catch (e) {
        console.warn("Failed to load projects from Firestore, using local fallback: ", e);
      }
    }
    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  if (selectedProject !== null) return null;

  return (
    <group>
      {/* Pocket Flap / Door */}
      <PocketDoor scrollProgress={scrollProgress} />

      {/* Floating Project Capsules */}
      {projects.map((project, index) => (
        <ProjectCapsule
          key={project.title}
          project={project}
          index={index}
          scrollProgress={scrollProgress}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  );
}
