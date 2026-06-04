"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EventNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Coordinate nodes representing localized cultural highlights
  const nodes = [
    { name: "Sandalwood Artisan Hub", pos: [0.25, -0.2, 0.12], color: "#e5a93b" },
    { name: "Dasara Arena", pos: [-0.05, -0.5, 0.12], color: "#e5a93b" },
    { name: "Hampi Monument Cluster", pos: [0.15, 0.3, 0.12], color: "#e5a93b" }
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    groupRef.current.children.forEach((child, i) => {
      const pulse = 1.0 + Math.sin(time * 3.5 + i) * 0.12;
      child.scale.set(pulse, pulse, pulse);
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
      {nodes.map((node) => (
        <group key={node.name} position={node.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.035, 0.045, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export default EventNodes;
