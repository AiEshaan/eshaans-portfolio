"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CharacterProps {
  scrollProgress: number;
}

export function Character({ scrollProgress }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Idle breathing & micro-movements
    groupRef.current.position.y = -1.0 + Math.sin(time * 1.5) * 0.03;
    
    // Smooth scroll-based rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * Math.PI * 0.25,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head / Bust Placeholder */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.3, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.8}
        />
      </mesh>

      {/* Torso (representing hoodie) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
        <meshStandardMaterial
          color="#1e1e1e" // Dark charcoal hoodie color
          roughness={0.9} // Extremely matte fabric feel
          metalness={0.0}
        />
      </mesh>

      {/* Detailed Zipper Detail */}
      <mesh position={[0, 0.2, 0.52]} castShadow>
        <boxGeometry args={[0.02, 0.7, 0.02]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
