"use client";

import React from "react";
import { Text } from "@react-three/drei";

interface StoryTransitionProps {
  scrollProgress: number;
}

export function StoryTransition({ scrollProgress }: StoryTransitionProps) {
  // Story transition occurs late in scroll sequence (0.83 to 0.95)
  const startProgress = 0.83;
  const peakProgress = 0.90;
  const endProgress = 0.98;

  let opacity = 0;
  if (scrollProgress >= startProgress && scrollProgress <= peakProgress) {
    opacity = (scrollProgress - startProgress) / (peakProgress - startProgress);
  } else if (scrollProgress > peakProgress && scrollProgress <= endProgress) {
    opacity = 1.0 - (scrollProgress - peakProgress) / (endProgress - peakProgress);
  }
  opacity = Math.max(0, Math.min(1.0, opacity));

  return (
    <group position={[0, -0.3, 1.2]}>
      {/* Prime Line */}
      <Text
        font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
        fontSize={0.08}
        maxWidth={1.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
        fillOpacity={opacity}
      >
        Every builder carries stories.
      </Text>

      {/* Sub Line */}
      <Text
        position={[0, -0.07, 0]}
        font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
        fontSize={0.05}
        textAlign="center"
        anchorX="center"
        anchorY="top"
        color="#888888"
        fillOpacity={opacity * 0.9}
      >
        Here are mine.
      </Text>
    </group>
  );
}
