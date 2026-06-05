"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PipelineNode {
  pos: [number, number, number];
  name: string;
  type: string;
}

export function AutomationPipelineZone() {
  const packetRef = useRef<THREE.Mesh>(null);

  const pipeline: PipelineNode[] = [
    { pos: [0.1, 0.15, 0.4], name: "n8n Webhook Trigger", type: "Trigger" },
    { pos: [0.35, 0.25, 0.2], name: "Gemini Classifier", type: "AI Filter" },
    { pos: [0.6, 0.15, 0.4], name: "CRM API Send", type: "Action" }
  ];

  useFrame((state) => {
    if (!packetRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Cycle the packet through the pipeline path
    const speed = 0.5;
    const cycle = (time * speed) % 2; // 2 segments
    const segment = Math.floor(cycle);
    const progress = cycle - segment;

    const startNode = pipeline[segment];
    const endNode = pipeline[segment + 1];

    if (startNode && endNode) {
      packetRef.current.position.x = THREE.MathUtils.lerp(startNode.pos[0], endNode.pos[0], progress);
      packetRef.current.position.y = THREE.MathUtils.lerp(startNode.pos[1], endNode.pos[1], progress) + Math.sin(progress * Math.PI) * 0.05; // slight arc
      packetRef.current.position.z = THREE.MathUtils.lerp(startNode.pos[2], endNode.pos[2], progress);
    }
  });

  return (
    <group>
      {/* Label for Zone 2 */}
      <Text
        position={[0.35, 0.45, 0.3]}
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#a1a1aa"
        anchorX="center"
      >
        Zone 02 // Automation Pipeline (n8n)
      </Text>

      {/* Renders Pipeline Blocks */}
      {pipeline.map((node, idx) => (
        <group key={idx} position={node.pos}>
          {/* Base board/chassis for node */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 6]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Inner status light indicator */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.005, 6]} />
            <meshBasicMaterial color={idx === 1 ? "#ccaa88" : "#888888"} />
          </mesh>

          {/* Node detail tags */}
          <Text
            position={[0, 0.04, 0]}
            font="/fonts/inter.ttf"
            fontSize={0.015}
            color="#cccccc"
            anchorX="center"
          >
            {node.name}
          </Text>
        </group>
      ))}

      {/* Draw connecting lines segments */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                0.1, 0.15, 0.4,
                0.35, 0.25, 0.2,
                0.35, 0.25, 0.2,
                0.6, 0.15, 0.4
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#333333" linewidth={2} />
      </lineSegments>

      {/* Animated Floating Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ffe5cc" />
      </mesh>
    </group>
  );
}

export default AutomationPipelineZone;

