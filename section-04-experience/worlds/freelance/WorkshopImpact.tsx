"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function WorkshopImpact() {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!panelRef.current) return;
    const time = state.clock.getElapsedTime();
    // Soft floating bob
    panelRef.current.position.y = 0.5 + Math.sin(time * 0.9) * 0.015;
  });

  return (
    <group ref={panelRef} position={[0.7, 0.5, 0.4]}>
      {/* HUD Telemetry Title */}
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.045}
        color="#ffe5cc"
        anchorX="left"
        anchorY="bottom"
      >
        {"// WORKSHOP TELEMETRY"}
      </Text>

      {/* Metric: Manual Hours Saved */}
      <group position={[0, -0.06, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.07}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          40% Overhead Reduction
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.032}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Operational hours saved via automated scrapers
        </Text>
      </group>

      {/* Metric: Pipeline Triggers */}
      <group position={[0, -0.16, 0]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.07}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          Founder Finder Node
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="/fonts/inter.ttf"
          fontSize={0.032}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Target lead score mapping: 92.5% accuracy
        </Text>
      </group>
    </group>
  );
}

export default WorkshopImpact;

