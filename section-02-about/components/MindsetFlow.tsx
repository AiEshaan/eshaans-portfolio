"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { mindsetFlow } from "../data/mindset-content";

interface MindsetFlowProps {
  scrollProgress: number;
}

export function MindsetFlow({ scrollProgress }: MindsetFlowProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Map individual words to circular orbit coordinates around the head position
  const radius = 1.4;
  const nodes = mindsetFlow.map((item, index) => {
    // Distribute nodes in an arc around the face profile
    const angle = (index / mindsetFlow.length) * Math.PI * 1.0 - Math.PI * 0.5;
    const posX = Math.sin(angle) * radius;
    const posY = 1.0 + Math.cos(angle) * 0.15;
    const posZ = Math.cos(angle) * radius - 0.4;

    // Mindset scroll window is between 0.55 and 0.82
    const startProgress = 0.55 + (index / mindsetFlow.length) * 0.18;
    const endProgress = startProgress + 0.08;

    return {
      ...item,
      posX,
      posY,
      posZ,
      startProgress,
      endProgress
    };
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth idle sway
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    groupRef.current.position.y = Math.cos(time * 0.4) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => {
        // Calculate opacity based on scroll trigger zones
        let opacity = 0;
        if (scrollProgress >= node.startProgress) {
          opacity = (scrollProgress - node.startProgress) / (node.endProgress - node.startProgress);
          opacity = Math.min(1.0, opacity);
          
          // Fade out towards the story transition sequence
          if (scrollProgress > 0.82) {
            opacity = Math.max(0, 1 - (scrollProgress - 0.82) * 8);
          }
        }

        return (
          <group key={node.title} position={[node.posX, node.posY, node.posZ]}>
            {/* Title text */}
            <Text
              font="/fonts/outfit.ttf"
              fontSize={0.15}
              anchorX="center"
              anchorY="middle"
              color="#ffffff"
              fillOpacity={opacity}
              strokeWidth={0.001}
              strokeColor="#666666"
              strokeOpacity={opacity * 0.4}
            >
              {node.title}
            </Text>

            {/* Description Subtext */}
            <Text
              position={[0, -0.12, 0]}
              font="/fonts/inter.ttf"
              fontSize={0.065}
              maxWidth={0.65}
              lineHeight={1.4}
              textAlign="center"
              anchorX="center"
              anchorY="top"
              color="#a1a1aa"
              fillOpacity={opacity * 0.85}
            >
              {node.description}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

