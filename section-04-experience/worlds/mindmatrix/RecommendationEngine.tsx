"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function RecommendationEngine() {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!panelRef.current) return;
    const time = state.clock.getElapsedTime();
    panelRef.current.position.y = 0.5 + Math.sin(time * 1.1) * 0.02;
  });

  return (
    <group ref={panelRef} position={[0.7, 0.5, 0.4]}>
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.045}
        color="#ffe5cc"
        anchorX="left"
        anchorY="bottom"
      >
        {"// REC ENGINE TELEMETRY"}
      </Text>

      {/* Metric 1 */}
      <group position={[0, -0.06, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.075}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          Dasara Festival
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Event Match Confidence: 98.4%
        </Text>
      </group>

      {/* Metric 2 */}
      <group position={[0, -0.16, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.075}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          Sandalwood Craft
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Artisan Match Confidence: 94.1%
        </Text>
      </group>
    </group>
  );
}
export default RecommendationEngine;

