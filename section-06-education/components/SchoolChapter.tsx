"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function SchoolChapter() {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    const time = state.clock.getElapsedTime();
    modelRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={modelRef} position={[-0.2, 0.1, 0.1]}>
      {/* 3D Wireframe outline of a school building silhouette */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.35, 0.25, 0.35)]} />
        <lineBasicMaterial color="#777777" transparent opacity={0.6} />
      </lineSegments>
      
      {/* Roof peak line outlines */}
      <lineSegments position={[0, 0.125, 0]}>
        <edgesGeometry args={[new THREE.ConeGeometry(0.24, 0.12, 4)]} />
        <lineBasicMaterial color="#555555" transparent opacity={0.5} />
      </lineSegments>

      {/* Floating notebooks / sheets drawings icons representation */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#333333" roughness={0.9} wireframe />
      </mesh>

      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#a1a1aa"
        position={[0, -0.22, 0]}
        anchorX="center"
      >
        Balmandir School / Pencil Outlines
      </Text>
    </group>
  );
}

export default SchoolChapter;

