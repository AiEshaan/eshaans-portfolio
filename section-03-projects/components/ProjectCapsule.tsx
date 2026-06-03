"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ProjectData } from "../data/project-manifest";

interface ProjectCapsuleProps {
  project: ProjectData;
  index: number;
  scrollProgress: number;
  onSelect: (title: string) => void;
  isSelected: boolean;
}

export function ProjectCapsule({ project, index, scrollProgress, onSelect, isSelected }: ProjectCapsuleProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Position capsules inside the chamber
  // Only slide out and disperse when pocket opens (scroll progress 0.88 to 1.0)
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    let disperseProgress = 0;
    if (scrollProgress >= 0.88) {
      disperseProgress = (scrollProgress - 0.88) / 0.12;
      disperseProgress = Math.min(1.0, disperseProgress);
    }

    // Coordinates mapping: disperse from the pocket center [-0.28, -0.5, 0.5] to floating space
    const spreadAngle = (index / 5) * Math.PI * 1.5 - Math.PI * 0.75;
    const targetX = -0.28 + Math.sin(spreadAngle) * 0.65 * disperseProgress;
    const targetY = -0.5 + (0.35 + index * 0.1) * disperseProgress;
    const targetZ = 0.5 + Math.cos(spreadAngle) * 0.5 * disperseProgress;

    // Smooth position interpolation
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    // Natural floating bobbing & rotations
    const bobOffset = Math.sin(time * 1.2 + index) * 0.02;
    meshRef.current.position.y += bobOffset;
    meshRef.current.rotation.y = time * 0.2 + (hovered ? time * 0.5 : 0);
  });

  // Calculate dynamic scale and opacity
  const isActive = scrollProgress >= 0.88;
  const scale = hovered ? 1.08 : 1.0;

  return (
    <group
      ref={meshRef}
      position={[-0.28, -0.5, 0.5]}
      scale={isActive ? scale : 0.001}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project.title);
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
      {/* 1. Frosted Glass/Museum Capsule Casing */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.24, 16]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.1}
          roughness={0.15}
          ior={1.5}
          color={hovered ? "#ffe5cc" : "#ffffff"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Capsule Caps (Metal tops & bottoms) */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.081, 0.081, 0.015, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.081, 0.081, 0.015, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 2. Central Interactive Artifact */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.045]} />
        <meshStandardMaterial
          color={hovered ? "#e5a93b" : "#555555"}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 3. Text Details */}
      <group position={[0, 0.18, 0]}>
        {/* Project Name */}
        <Text
          font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
          fontSize={0.045}
          anchorX="center"
          anchorY="bottom"
          color="#ffffff"
        >
          {project.title}
        </Text>

        {/* Tagline */}
        <Text
          position={[0, -0.015, 0]}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
          fontSize={0.02}
          maxWidth={0.22}
          textAlign="center"
          anchorX="center"
          anchorY="top"
          color="#a1a1aa"
        >
          {project.tagline}
        </Text>

        {/* Category Badge */}
        <Text
          position={[0, -0.055, 0]}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
          fontSize={0.015}
          color="#d4d4d8"
          anchorX="center"
          anchorY="top"
        >
          {project.category}
        </Text>
      </group>
    </group>
  );
}
