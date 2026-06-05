"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function GeminiRecommendations() {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!panelRef.current) return;
    const time = state.clock.getElapsedTime();
    panelRef.current.position.y = 0.5 + Math.sin(time * 1.0) * 0.025;
  });

  return (
    <group ref={panelRef} position={[0.7, 0.5, 0.4]}>
      {/* Heading */}
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.05}
        color="#ffe5cc"
        anchorX="left"
        anchorY="bottom"
      >
        {"// GEMINI ENGINE ACTIVE"}
      </Text>

      {/* Rec 1 */}
      <group position={[0, -0.06, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          Mysore Dasara
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Trending Event Recommendation
        </Text>
      </group>

      {/* Rec 2 */}
      <group position={[0, -0.16, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          Toy Crafting
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Channapatna Artisan Spotlight
        </Text>
      </group>
    </group>
  );
}

