"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function FutureSection() {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!panelRef.current) return;
    const time = state.clock.getElapsedTime();
    // Soft floating bob
    panelRef.current.position.y = 0.4 + Math.sin(time * 0.8) * 0.015;
  });

  return (
    <group ref={panelRef} position={[0, 0.4, 0.4]}>
      {/* Structural panel plate behind text */}
      <mesh receiveShadow castShadow position={[0, 0, -0.01]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshStandardMaterial color="#111112" roughness={0.8} />
      </mesh>

      {/* Outer framing line contours */}
      <lineSegments position={[0, 0, -0.008]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.2, 0.3)]} />
        <lineBasicMaterial color="#333333" />
      </lineSegments>

      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.032}
        maxWidth={1.1}
        textAlign="center"
        color="#ffe5cc"
        anchorX="center"
        anchorY="middle"
      >
        {"\"Building intelligent systems that solve real problems for real people.\""}
      </Text>
    </group>
  );
}

export default FutureSection;

