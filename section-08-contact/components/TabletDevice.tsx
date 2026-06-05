"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TabletDeviceProps {
  scrollProgress: number;
}

export function TabletDevice({ scrollProgress }: TabletDeviceProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slides up from below y=-1.5 to y=-0.3 as scrollProgress progresses in Phase 8 (0.88 to 1.0)
  let slideProgress = 0;
  if (scrollProgress >= 0.88) {
    slideProgress = (scrollProgress - 0.88) / 0.08;
    slideProgress = Math.min(1.0, slideProgress);
  }

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Position interpolation (slide up)
    const targetY = -0.3 + (1.0 - slideProgress) * -1.0;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

    // Dynamic hand-held sway tilt
    groupRef.current.rotation.x = Math.PI * 0.15 + Math.sin(time * 1.1) * 0.02;
    groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -1.3, 0.7]}>
      {/* 1. Metal Chassis body (Matte aluminum frame) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.28, 0.012]} />
        <meshStandardMaterial color="#2d2e30" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Screen area (Glossy dark glass bezel) */}
      <mesh position={[0, 0, 0.007]} castShadow>
        <boxGeometry args={[0.4, 0.26, 0.002]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 2. Dynamic magnetic stylus pen snapped on the side */}
      <mesh position={[0.215, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.18, 12]} />
        <meshStandardMaterial color="#555557" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stylus tip */}
      <mesh position={[0.215, -0.035, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.006, 0.01, 12]} />
        <meshStandardMaterial color="#111112" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default TabletDevice;
