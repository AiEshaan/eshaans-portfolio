"use client";

import React from "react";
import * as THREE from "three";

export function TrainingArena() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Minimal Exhibition Floor Base */}
      <mesh receiveShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.05, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.85} />
      </mesh>

      {/* Outer subtle metal rim */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[1.51, 1.51, 0.01, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Grid lines texture representation */}
      <gridHelper args={[3, 10, "#444444", "#222222"]} position={[0, 0.03, 0]} />

      {/* Vertical light rods representing bounds of data capture space */}
      <group position={[0, 0.8, 0]}>
        {/* Guard rails */}
        <mesh position={[1.4, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.6, 8]} />
          <meshStandardMaterial color="#333333" opacity={0.6} transparent />
        </mesh>
        <mesh position={[-1.4, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.6, 8]} />
          <meshStandardMaterial color="#333333" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0, 0, 1.4]}>
          <cylinderGeometry args={[0.01, 0.01, 1.6, 8]} />
          <meshStandardMaterial color="#333333" opacity={0.6} transparent />
        </mesh>
        <mesh position={[0, 0, -1.4]}>
          <cylinderGeometry args={[0.01, 0.01, 1.6, 8]} />
          <meshStandardMaterial color="#333333" opacity={0.6} transparent />
        </mesh>
      </group>
    </group>
  );
}
