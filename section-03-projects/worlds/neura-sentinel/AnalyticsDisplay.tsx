"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function AnalyticsDisplay() {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!panelRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow drift matching racket dynamics
    panelRef.current.position.y = 0.5 + Math.sin(time * 1.2) * 0.03;
  });

  return (
    <group ref={panelRef} position={[0.7, 0.5, 0.4]}>
      {/* Panel Heading */}
      <Text
        font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
        fontSize={0.05}
        color="#ffe5cc"
        anchorX="left"
        anchorY="bottom"
      >
        // TELEMETRY ACTIVE
      </Text>

      {/* Speed Stat */}
      <group position={[0, -0.06, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          14.2 m/s
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Stroke Velocity
        </Text>
      </group>

      {/* Spin Stat */}
      <group position={[0, -0.16, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
          fontSize={0.08}
          color="#ffffff"
          anchorX="left"
          anchorY="bottom"
        >
          850 RPM
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          Racket Spin Rotation
        </Text>
      </group>

      {/* Accuracy Classification */}
      <group position={[0, -0.26, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
          fontSize={0.07}
          color="#81c784"
          anchorX="left"
          anchorY="bottom"
        >
          94.2% [Topspin]
        </Text>
        <Text
          position={[0, -0.015, 0]}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
          fontSize={0.035}
          color="#888888"
          anchorX="left"
          anchorY="top"
        >
          TinyML Action Match
        </Text>
      </group>
    </group>
  );
}
