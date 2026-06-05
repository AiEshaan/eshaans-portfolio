"use client";

import React from "react";
import { SchoolChapter } from "./SchoolChapter";
import { PUChapter } from "./PUChapter";
import { EngineeringChapter } from "./EngineeringChapter";

interface AcademicJourneyProps {
  scrollProgress: number;
  onSelectChapter: (institution: string) => void;
  selectedEducation: string | null;
}

export function AcademicJourney({ onSelectChapter, selectedEducation }: AcademicJourneyProps) {
  // Show sketchbook pages only when inside the portal
  const isAnySelected = selectedEducation !== null;

  return (
    <group>
      {/* Chapter 1: Balmandir School (Left side of sketchbook) */}
      <group
        position={[-0.6, 0, 0]}
        scale={isAnySelected && selectedEducation !== "Balmandir High School" ? 0.001 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onSelectChapter("Balmandir High School");
        }}
      >
        {/* Draw base notebook page layout */}
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[0.42, 0.015, 0.42]} />
          <meshStandardMaterial color="#2c2a29" roughness={0.9} /> {/* Leather border */}
        </mesh>
        <mesh position={[0, -0.14, 0]} receiveShadow>
          <boxGeometry args={[0.4, 0.015, 0.4]} />
          <meshStandardMaterial color="#dfdcd6" roughness={0.8} /> {/* Premium paper */}
        </mesh>
        
        <SchoolChapter />
      </group>

      {/* Chapter 2: Govt PU College (Center of sketchbook) */}
      <group
        position={[0, 0, 0]}
        scale={isAnySelected && selectedEducation !== "Government PU College" ? 0.001 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onSelectChapter("Government PU College");
        }}
      >
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[0.42, 0.015, 0.42]} />
          <meshStandardMaterial color="#2c2a29" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.14, 0]} receiveShadow>
          <boxGeometry args={[0.4, 0.015, 0.4]} />
          <meshStandardMaterial color="#dfdcd6" roughness={0.8} />
        </mesh>
        
        <PUChapter />
      </group>

      {/* Chapter 3: Canara Engineering College (Right side of sketchbook) */}
      <group
        position={[0.6, 0, 0]}
        scale={isAnySelected && selectedEducation !== "Canara Engineering College" ? 0.001 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onSelectChapter("Canara Engineering College");
        }}
      >
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[0.42, 0.015, 0.42]} />
          <meshStandardMaterial color="#2c2a29" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.14, 0]} receiveShadow>
          <boxGeometry args={[0.4, 0.015, 0.4]} />
          <meshStandardMaterial color="#dfdcd6" roughness={0.8} />
        </mesh>
        
        <EngineeringChapter />
      </group>
    </group>
  );
}

export default AcademicJourney;
