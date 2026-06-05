"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FreelanceWorkshop() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gridRef.current) {
      // Subtle pulse or color oscillation
      const mat = gridRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(time * 0.8) * 0.05;
    }
    if (groupRef.current) {
      // Tiny drift
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Workbench Base Table Board (Architectural aesthetic) */}
      <gridHelper
        ref={gridRef}
        args={[1.8, 18, "#555555", "#222222"]}
        position={[0, -0.05, 0]}
        rotation={[0, 0, 0]}
      />
      
      {/* Base border frame lines */}
      <lineSegments position={[0, -0.05, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.8, 0.02, 1.8)]} />
        <lineBasicMaterial color="#333333" transparent opacity={0.4} />
      </lineSegments>

      {/* Structural accent pillar anchors on the sides */}
      <mesh position={[-0.85, -0.04, -0.85]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.85, -0.04, -0.85]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.85, -0.04, 0.85]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.85, -0.04, 0.85]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default FreelanceWorkshop;
