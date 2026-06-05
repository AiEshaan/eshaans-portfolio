"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Experience } from "../../types/Experience";
import { CharacterAssetManager } from "../../shared/character/CharacterAssetManager";

interface ExperienceCapsuleProps {
  experience: Experience;
  index: number;
  scrollProgress: number;
  onSelect: (company: string) => void;
}

export function ExperienceCapsule({ experience, index, scrollProgress, onSelect }: ExperienceCapsuleProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Capsules float out when zipper opens (scroll progress 0.72 to 1.0)
    let emergeProgress = 0;
    if (scrollProgress >= 0.72) {
      emergeProgress = (scrollProgress - 0.72) / 0.18;
      emergeProgress = Math.min(1.0, emergeProgress);
    }

    const [ox, oy, oz] = CharacterAssetManager.getHotspotOffset("vault");

    // Distribute left and right (index 0 on left, index 1 on right)
    const targetX = ox + (index === 0 ? -0.5 : 0.5) * emergeProgress;
    const targetY = oy + (0.1 + index * 0.15) * emergeProgress;
    const targetZ = oz + (0.3 + index * 0.1) * emergeProgress;

    // Smooth positioning
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    // Natural bobbing and rotation
    const bobOffset = Math.sin(time * 1.5 + index) * 0.02;
    meshRef.current.position.y += bobOffset;
    meshRef.current.rotation.y = time * 0.15 + (hovered ? time * 0.4 : 0);
  });

  const isActive = scrollProgress >= 0.72;
  const scale = hovered ? 1.08 : 1.0;

  return (
    <group
      ref={meshRef}
      position={CharacterAssetManager.getHotspotOffset("vault")}
      scale={isActive ? scale : 0.001}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(experience.company);
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
      {/* Frosted Glass Capsule */}
      <mesh>
        <cylinderGeometry args={[0.09, 0.09, 0.28, 16]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.12}
          roughness={0.18}
          ior={1.48}
          color={hovered ? "#ffe5cc" : "#ffffff"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Capsule metal borders */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.091, 0.091, 0.015, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.091, 0.091, 0.015, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Central rotating emblem */}
      <mesh>
        <dodecahedronGeometry args={[0.055]} />
        <meshStandardMaterial
          color={hovered ? "#e5a93b" : "#444444"}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Text overlays */}
      <group position={[0, 0.2, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.045}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
        >
          {experience.company}
        </Text>

        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.022}
          color="#a1a1aa"
          anchorX="center"
          anchorY="top"
        >
          {experience.role}
        </Text>

        <Text
          position={[0, -0.05, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.018}
          color="#71717a"
          anchorX="center"
          anchorY="top"
        >
          {experience.duration}
        </Text>
      </group>
    </group>
  );
}

