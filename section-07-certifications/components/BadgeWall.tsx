"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BadgeWallProps {
  scrollProgress: number;
}

export function BadgeWall({ scrollProgress }: BadgeWallProps) {
  const wallRef = useRef<THREE.Group>(null);

  // Badges fade in when folder opens (from scrollProgress 0.85 to 1.0)
  let scaleProgress = 0;
  if (scrollProgress >= 0.85) {
    scaleProgress = (scrollProgress - 0.85) / 0.12;
    scaleProgress = Math.min(1.0, scaleProgress);
  }

  useFrame((state) => {
    if (!wallRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle drift/hover animation for the badges
    wallRef.current.children.forEach((child, idx) => {
      if (child instanceof THREE.Group) {
        child.position.y = child.userData.initialY + Math.sin(time * 1.5 + idx) * 0.008;
        child.rotation.y = time * 0.2 + idx;
      }
    });
  });

  const badges = [
    { label: "G", color: "#4285F4" }, // Google Analytics
    { label: "BI", color: "#34A853" }, // Google BI
    { label: "IBM", color: "#052FAD" }, // IBM
    { label: "GH", color: "#24292E" }  // GitHub
  ];

  return (
    <group ref={wallRef} scale={scaleProgress > 0 ? 1 : 0.001}>
      {badges.map((badge, idx) => {
        // Position badges in a row above the folder
        const initialX = -0.15 + idx * 0.1;
        const initialY = 0.22;

        return (
          <group
            key={idx}
            position={[initialX, initialY, 0.02]}
            userData={{ initialY }}
          >
            {/* Hexagonal frame */}
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.005, 6]} />
              <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Emblem center */}
            <mesh position={[0, 0.003, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.004, 6]} />
              <meshBasicMaterial color={badge.color} />
            </mesh>

            {/* Inner ring highlight */}
            <mesh position={[0, 0.005, 0]}>
              <ringGeometry args={[0.024, 0.026, 16]} />
              <meshBasicMaterial color="#ffe5cc" side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default BadgeWall;
