"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EventNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Coordinate positions mapping to cities/cultural centers on our stylized map
  const nodes = [
    { name: "Bengaluru", pos: [0.1, -0.3, 0.15], color: "#e5a93b" },
    { name: "Mysuru", pos: [-0.1, -0.6, 0.15], color: "#e5a93b" },
    { name: "Hampi", pos: [0.2, 0.2, 0.15], color: "#e5a93b" }
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Animate pulsing scale of node markers
    groupRef.current.children.forEach((child, i) => {
      const pulse = 1.0 + Math.sin(time * 3 + i) * 0.15;
      child.scale.set(pulse, pulse, pulse);
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2.4, 0, 0]}>
      {nodes.map((node) => (
        <group key={node.name} position={node.pos as [number, number, number]}>
          {/* Light glow pin */}
          <mesh>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>

          {/* Pulse outer halo ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.04, 0.05, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.4} />
          </mesh>

          {/* Warm point light for local glow */}
          <pointLight color={node.color} intensity={0.4} distance={0.5} />
        </group>
      ))}
    </group>
  );
}
