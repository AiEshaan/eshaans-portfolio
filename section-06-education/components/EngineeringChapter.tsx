"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface NeuralNode {
  pos: [number, number, number];
  color: string;
}

export function EngineeringChapter() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: NeuralNode[] = [
    { pos: [-0.25, 0.25, 0], color: "#ffe5cc" },
    { pos: [-0.25, 0.05, 0], color: "#ffe5cc" },
    { pos: [-0.25, -0.15, 0], color: "#ffe5cc" },
    { pos: [0.05, 0.15, 0.15], color: "#ccaa88" },
    { pos: [0.05, -0.05, -0.15], color: "#ccaa88" },
    { pos: [0.35, 0.05, 0], color: "#ffffff" }
  ];

  // Map synaptic connections between layer nodes (indices)
  const connections = [
    [0, 3], [0, 4],
    [1, 3], [1, 4],
    [2, 3], [2, 4],
    [3, 5], [4, 5]
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Rotate and pulse the nodes to show AI inference activity
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.children.forEach((child, idx) => {
      if (child instanceof THREE.Mesh && child.userData.isNode) {
        const pulse = 1.0 + Math.sin(time * 3 + idx) * 0.08;
        child.scale.set(pulse, pulse, pulse);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Renders Neural Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos} userData={{ isNode: true }} castShadow>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial color={node.color} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}

      {/* Renders Connecting Synapses Lines */}
      {connections.map(([startIdx, endIdx], idx) => {
        const start = nodes[startIdx].pos;
        const end = nodes[endIdx].pos;

        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2])
        ];

        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <lineSegments key={idx} geometry={lineGeo}>
            <lineBasicMaterial color="#555555" transparent opacity={0.6} />
          </lineSegments>
        );
      })}

      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#ffe5cc"
        position={[0, -0.22, 0]}
        anchorX="center"
      >
        Canara Engineering College / B.E. AI & ML
      </Text>
    </group>
  );
}

export default EngineeringChapter;

