"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function ExperimentLab() {
  const ringRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 0.8;
      ringRef.current.rotation.x = time * 0.4;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = -time * 0.5;
    }
  });

  return (
    <group position={[0.2, 0.2, -0.4]}>
      {/* Label for Zone 3 */}
      <Text
        position={[0, 0.4, 0]}
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#a1a1aa"
        anchorX="center"
      >
        Zone 03 // AI Sandbox Experiments
      </Text>

      {/* Orbit Ring 1 */}
      <group ref={ringRef}>
        <lineLoop>
          <ringGeometry args={[0.09, 0.091, 32]} />
          <meshBasicMaterial color="#444444" side={THREE.DoubleSide} />
        </lineLoop>

        {/* Floating node on the ring */}
        <mesh position={[0.09, 0, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#ffe5cc" metalness={0.8} />
        </mesh>
      </group>

      {/* Rotating Core representing prompt engineering or model inference */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.035]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Auxiliary sensor/detail points */}
      <mesh position={[-0.08, -0.06, 0.08]}>
        <boxGeometry args={[0.015, 0.015, 0.015]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      <mesh position={[0.08, -0.06, -0.08]}>
        <boxGeometry args={[0.015, 0.015, 0.015]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Supporting text indicator */}
      <Text
        position={[0, -0.09, 0]}
        font="/fonts/inter.ttf"
        fontSize={0.016}
        color="#888888"
        anchorX="center"
      >
        Model: LLM Classification Array
      </Text>
    </group>
  );
}

export default ExperimentLab;

