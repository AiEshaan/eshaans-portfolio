"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  pos: [number, number, number];
  label: string;
  type: "founder" | "company" | "detail";
  color: string;
}

export function FounderFinderZone() {
  const nodesRef = useRef<THREE.Group>(null);

  // Defined nodes for the network graph of Founder Finder
  const nodes: NodeData[] = [
    { pos: [-0.4, 0.2, -0.3], label: "Founder: CEO", type: "founder", color: "#ffe5cc" },
    { pos: [-0.1, 0.4, -0.4], label: "Target Co A", type: "company", color: "#888888" },
    { pos: [-0.3, 0.05, -0.5], label: "LinkedIn Data", type: "detail", color: "#666666" },
    { pos: [-0.6, 0.3, -0.2], label: "Founder: CTO", type: "founder", color: "#ffe5cc" },
    { pos: [-0.5, 0.1, -0.4], label: "Scraper API", type: "detail", color: "#666666" }
  ];

  // Connections between nodes (index pairs)
  const connections = [
    [0, 1],
    [0, 2],
    [3, 1],
    [3, 4],
    [0, 4]
  ];

  useFrame((state) => {
    if (!nodesRef.current) return;
    const time = state.clock.getElapsedTime();

    // Rotate and bob the zone nodes subtly to show processing life
    nodesRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Group) {
        child.position.y = child.userData.initialY + Math.sin(time * 1.5 + index) * 0.015;
      }
    });
  });

  return (
    <group ref={nodesRef}>
      {/* Label for Zone 1 */}
      <Text
        position={[-0.4, 0.55, -0.3]}
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#a1a1aa"
        anchorX="center"
      >
        Zone 01 // Founder Finder Scraper
      </Text>

      {/* Renders Nodes */}
      {nodes.map((node, i) => (
        <group
          key={i}
          position={node.pos}
          userData={{ initialY: node.pos[1] }}
        >
          {/* Node Geometry */}
          <mesh>
            {node.type === "company" ? (
              <boxGeometry args={[0.045, 0.045, 0.045]} />
            ) : node.type === "founder" ? (
              <octahedronGeometry args={[0.03]} />
            ) : (
              <dodecahedronGeometry args={[0.02]} />
            )}
            <meshStandardMaterial
              color={node.color}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Mini node tag */}
          <Text
            position={[0, 0.05, 0]}
            font="/fonts/inter.ttf"
            fontSize={0.015}
            color="#cccccc"
            anchorX="center"
            anchorY="bottom"
          >
            {node.label}
          </Text>
        </group>
      ))}

      {/* Renders Connection Lines */}
      {connections.map(([startIdx, endIdx], index) => {
        const start = nodes[startIdx].pos;
        const end = nodes[endIdx].pos;
        
        // Define points path
        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2])
        ];
        
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <lineSegments key={index} geometry={lineGeo}>
            <lineBasicMaterial color="#444444" transparent opacity={0.6} />
          </lineSegments>
        );
      })}
    </group>
  );
}

export default FounderFinderZone;

