"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function KarnatakaMap() {
  const mapRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!mapRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow, steady map rotation and floating drift
    mapRef.current.position.y = -0.1 + Math.sin(time * 0.8) * 0.03;
    mapRef.current.rotation.x = -Math.PI / 2.4; // Tilted towards the camera
    mapRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <group ref={mapRef} scale={0.75} position={[0, -0.2, 0]}>
      {/* 3D Map Base Platform (representing Karnataka's outline) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.8, 0.06]} />
        <meshStandardMaterial
          color="#151515"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Grid Overlay to represent coordinates & mapping */}
      <gridHelper args={[1.5, 8, "#333333", "#222222"]} position={[0, 0.031, 0]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Stylized topological contours (stacked minimal boards) */}
      <mesh position={[0.1, 0.1, 0.04]} castShadow>
        <boxGeometry args={[1.0, 1.2, 0.03]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, -0.2, 0.06]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.03]} />
        <meshStandardMaterial color="#262626" roughness={0.9} />
      </mesh>
    </group>
  );
}
