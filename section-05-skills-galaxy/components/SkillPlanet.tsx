"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface SkillPlanetProps {
  category: string;
  index: number;
  orbitRadius: number;
  orbitSpeed: number;
  onSelect: (category: string) => void;
  scaleProgress: number; // 0 (hidden) to 1 (emerged)
  isAnySelected: boolean;
}

export function SkillPlanet({
  category,
  index,
  orbitRadius,
  orbitSpeed,
  onSelect,
  scaleProgress,
  isAnySelected
}: SkillPlanetProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Set sizing based on hierarchy
  let planetRadius = 0.028;
  let planetColor = "#444444";

  if (category === "AI & LLMs" || category === "Full Stack Development" || category === "Machine Learning") {
    planetRadius = 0.045;
    planetColor = "#ffe5cc"; // Warm, primary color for core competencies
  } else if (category === "Android Development" || category === "Cloud & Backend" || category === "Automation") {
    planetRadius = 0.035;
    planetColor = "#ccaa88"; // Medium tone
  } else {
    planetRadius = 0.025;
    planetColor = "#888888"; // Small, helper skills
  }

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Natural orbit coordinates around Y-axis
    // If a planet is clicked, it stops orbiting or moves slowly, but for now natural orbit is fine.
    const angle = time * orbitSpeed + (index * Math.PI * 0.25);
    const targetX = Math.cos(angle) * orbitRadius;
    const targetY = Math.sin(time * 0.8 + index) * 0.015; // Bobbing
    const targetZ = Math.sin(angle) * orbitRadius;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);

    // Planet rotation
    meshRef.current.rotation.y = time * 0.3;
  });

  const displayScale = scaleProgress * (hovered ? 1.2 : 1.0);

  return (
    <group
      ref={meshRef}
      scale={isAnySelected ? 0.001 : displayScale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(category);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
        setHovered(false);
      }}
    >
      {/* 3D Sphere Planet */}
      <mesh>
        <sphereGeometry args={[planetRadius, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? "#e5a93b" : planetColor}
          metalness={0.7}
          roughness={0.2}
          wireframe={category === "Tools & Collaboration"}
        />
      </mesh>

      {/* Halo Accent Ring */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planetRadius + 0.01, planetRadius + 0.012, 16]} />
          <meshBasicMaterial color="#ffe5cc" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Floating text tag */}
      <Text
        position={[0, planetRadius + 0.035, 0]}
        font="/fonts/outfit.ttf"
        fontSize={0.024}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
      >
        {category}
      </Text>
    </group>
  );
}

export default SkillPlanet;

