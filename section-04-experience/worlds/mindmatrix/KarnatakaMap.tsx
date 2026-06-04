"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function KarnatakaMap() {
  const mapRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!mapRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth idle drift and slow tilt orbit
    mapRef.current.position.y = -0.15 + Math.sin(time * 0.8) * 0.025;
    mapRef.current.rotation.x = -Math.PI / 2.3;
    mapRef.current.rotation.z = Math.sin(time * 0.12) * 0.04;
  });

  return (
    <group ref={mapRef} scale={0.7} position={[0, -0.2, 0]}>
      {/* Outline block representing the state boundaries */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.7, 0.05]} />
        <meshStandardMaterial
          color="#151515"
          roughness={0.85}
          metalness={0.15}
        />
      </mesh>

      {/* Grid overlay */}
      <gridHelper args={[1.4, 8, "#333333", "#222222"]} position={[0, 0.026, 0]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Stylized elevation nodes representing geographical regions */}
      <mesh position={[0.2, 0.15, 0.03]} castShadow>
        <boxGeometry args={[0.9, 1.0, 0.035]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}
export default KarnatakaMap;
