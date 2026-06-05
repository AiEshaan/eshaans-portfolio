"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function BuiltSection() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow orbiting rotation around center
    groupRef.current.rotation.y = time * 0.15;
    
    // Pulse meshes
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Group) {
        child.position.y = child.userData.initialY + Math.sin(time * 1.2 + i) * 0.02;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0.4]}>
      {/* 1. Neura Sentinel (Tennis racket wireframe floating on left) */}
      <group position={[-0.5, 0, 0]} userData={{ initialY: 0 }}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.08, 0.005, 8, 24]} />
          <meshBasicMaterial color="#ffe5cc" wireframe />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
        <Text
          font="/fonts/inter.ttf"
          fontSize={0.018}
          color="#a1a1aa"
          position={[0, 0.12, 0]}
        >
          Neura Sentinel
        </Text>
      </group>

      {/* 2. MindMatrix (Contour grids floating in middle) */}
      <group position={[0, 0.05, -0.2]} userData={{ initialY: 0.05 }}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 0.18, 4, 4]} />
          <meshBasicMaterial color="#888888" wireframe />
        </mesh>
        <Text
          font="/fonts/inter.ttf"
          fontSize={0.018}
          color="#a1a1aa"
          position={[0, 0.12, 0]}
        >
          MindMatrix Map
        </Text>
      </group>

      {/* 3. Freelance (3 linked automation pipeline nodes floating on right) */}
      <group position={[0.5, 0, 0]} userData={{ initialY: 0 }}>
        <mesh position={[-0.05, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ccaa88" />
        </mesh>
        <mesh position={[0.05, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ccaa88" />
        </mesh>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-0.05, 0, 0, 0.05, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#555555" />
        </lineSegments>
        <Text
          font="/fonts/inter.ttf"
          fontSize={0.018}
          color="#a1a1aa"
          position={[0, 0.12, 0]}
        >
          Freelance n8n
        </Text>
      </group>
    </group>
  );
}

export default BuiltSection;

