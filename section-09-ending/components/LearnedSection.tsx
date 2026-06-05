"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function LearnedSection() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Orbit coordinates around Y axis
    groupRef.current.children.forEach((child, i) => {
      const angle = time * 0.4 + (i * Math.PI * 0.5);
      child.position.x = Math.cos(angle) * 0.45;
      child.position.z = Math.sin(angle) * 0.45;
      child.position.y = Math.sin(time * 1.5 + i) * 0.02;
    });
  });

  const values = [
    "Problem Solving",
    "Curiosity",
    "Execution",
    "Adaptability"
  ];

  return (
    <group ref={groupRef} position={[0, 0.4, 0.4]}>
      {values.map((val, idx) => (
        <group key={idx}>
          {/* Small dot indicators */}
          <mesh position={[0, -0.025, 0]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#ffe5cc" />
          </mesh>

          <Text
            font="/fonts/outfit.ttf"
            fontSize={0.03}
            color="#ffffff"
            anchorX="center"
          >
            {val}
          </Text>
        </group>
      ))}
    </group>
  );
}

export default LearnedSection;

