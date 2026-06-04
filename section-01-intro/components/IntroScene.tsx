"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "./Environment";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { ScrollController } from "./ScrollController";
import { AboutScene } from "../../section-02-about/components/AboutScene";
import { PocketScene } from "../../section-03-projects/components/PocketScene";
import { ProjectLoader } from "../../section-03-projects/components/ProjectLoader";
import { useProjectNavigation } from "../../section-03-projects/hooks/useProjectNavigation";
import { projectWorlds } from "../../section-03-projects/data/world-registry";
import { experienceWorlds } from "../../section-04-experience/data/experience-registry";
import { ExperienceScene } from "../../section-04-experience/components/ExperienceScene";
import { ExperienceLoader } from "../../section-04-experience/components/ExperienceLoader";
import { useExperienceNavigation } from "../../section-04-experience/hooks/useExperienceNavigation";

export function IntroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { selectedProject, selectProject } = useProjectNavigation();
  const { selectedExperience, selectExperience } = useExperienceNavigation();

  // Character body opacity fades out as we transition into the face reveal
  // Character fades out between scroll progress 0.3 and 0.45
  const bodyOpacity = scrollProgress < 0.3 
    ? 1.0 
    : Math.max(0, 1.0 - (scrollProgress - 0.3) / 0.15);

  return (
    <div className="relative w-full min-h-screen bg-[#080808] overflow-x-hidden text-zinc-100 font-sans">
      
      {/* 3D R3F Viewport Canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#080808"]} />
          <fog attach="fog" args={["#080808", 4, 10]} />
          
          <Environment />
          
          {/* Main 3D character bust visible in Phase 2 */}
          {bodyOpacity > 0 && (
            <group>
              <Character scrollProgress={scrollProgress} opacity={bodyOpacity} />
            </group>
          )}

          {/* About Section Scene (Face Reveal, Mindset Flow, and Story Transition) */}
          <AboutScene scrollProgress={scrollProgress} />

          {/* Projects Pocket Scene (Pocket Door, Floating Capsules) */}
          <PocketScene
            scrollProgress={scrollProgress}
            onSelectProject={selectProject}
            selectedProject={selectedProject}
          />

          {/* Dynamic 3D Project World Exhibition from Registry */}
          {selectedProject && projectWorlds[selectedProject] && React.createElement(projectWorlds[selectedProject], {
            isActive: true,
            onClose: () => selectProject(null)
          })}

          {/* Experience Vault Scene (Zipper opening, Floating Capsules) */}
          <ExperienceScene
            scrollProgress={scrollProgress}
            onSelectExperience={selectExperience}
            selectedExperience={selectedExperience}
          />

          {/* Dynamic 3D Experience World from Registry */}
          {selectedExperience && experienceWorlds[selectedExperience] && React.createElement(experienceWorlds[selectedExperience], {
            isActive: true,
            onClose: () => selectExperience(null)
          })}
          
          {/* Handles smooth camera updates */}
          <CameraRig scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* HTML Content Overlay & Smooth Scroll Engine */}
      <ScrollController onScrollProgress={setScrollProgress} />

      {/* Fullscreen Overlay when a project is selected */}
      <ProjectLoader
        selectedProject={selectedProject}
        onClose={() => selectProject(null)}
      />

      {/* Fullscreen Overlay when an experience is selected */}
      <ExperienceLoader
        selectedExperience={selectedExperience}
        onClose={() => selectExperience(null)}
      />

    </div>
  );
}
