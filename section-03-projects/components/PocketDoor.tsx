"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PocketDoorProps {
  scrollProgress: number;
}

export function PocketDoor({ scrollProgress }: PocketDoorProps) {
  const doorRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!doorRef.current) return;

    // Pocket door opening sequence is between scroll progress 0.58 and 0.65
    let openProgress = 0;
    if (scrollProgress >= 0.58) {
      openProgress = (scrollProgress - 0.58) / 0.07;
      openProgress = Math.min(1.0, openProgress);
    }

    // Slide down and rotate outward simulating a fabric flap folding back
    const targetY = THREE.MathUtils.lerp(-0.4, -0.6, openProgress);
    const targetRotationX = THREE.MathUtils.lerp(0, Math.PI * 0.45, openProgress);

    doorRef.current.position.y = targetY;
    doorRef.current.rotation.x = targetRotationX;
  });

  return (
    <group position={[-0.28, 0, 0.51]}>
      {/* Pocket Flap / Door Mesh */}
      <mesh ref={doorRef} position={[0, -0.4, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.15, 0.015]} />
        <meshStandardMaterial
          color="#151515"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}
