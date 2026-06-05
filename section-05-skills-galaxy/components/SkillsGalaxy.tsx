"use client";

import React from "react";
import { GalaxyCore } from "./GalaxyCore";
import { PlanetOrbit } from "./PlanetOrbit";
import { SkillPlanet } from "./SkillPlanet";
import { Skill } from "../../types/Skill";

interface SkillsGalaxyProps {
  scrollProgress: number;
  onSelectPlanet: (category: string) => void;
  selectedPlanet: string | null;
  skills: Skill[];
}

export function SkillsGalaxy({ scrollProgress, onSelectPlanet, selectedPlanet, skills }: SkillsGalaxyProps) {
  // Galaxy emerges from palm during scrollProgress 0.80 to 0.92
  let scaleProgress = 0;
  if (scrollProgress >= 0.80) {
    scaleProgress = (scrollProgress - 0.80) / 0.08;
    scaleProgress = Math.min(1.0, scaleProgress);
  }

  // Calculate parameters for orbits
  const getOrbitParams = (order: number) => {
    // Distinct orbits to prevent overlaps
    const radius = 0.15 + (order - 1) * 0.06;
    const speed = 0.35 - (order - 1) * 0.035;
    return { radius, speed };
  };

  const isAnySelected = selectedPlanet !== null;

  return (
    <group scale={scaleProgress > 0 ? 1 : 0.001}>
      {/* 1. Core energy emitter (glow source) */}
      {!isAnySelected && <GalaxyCore />}

      {/* 2. Orbit paths and matching planets */}
      {skills.map((skill, i) => {
        const { radius, speed } = getOrbitParams(skill.order);
        return (
          <group key={skill.category}>
            {/* Draw orbit line loop */}
            {!isAnySelected && <PlanetOrbit radius={radius} />}

            {/* Orbiting Planet */}
            <SkillPlanet
              category={skill.category}
              index={i}
              orbitRadius={radius}
              orbitSpeed={speed}
              onSelect={onSelectPlanet}
              scaleProgress={scaleProgress}
              isAnySelected={isAnySelected}
            />
          </group>
        );
      })}
    </group>
  );
}

export default SkillsGalaxy;
