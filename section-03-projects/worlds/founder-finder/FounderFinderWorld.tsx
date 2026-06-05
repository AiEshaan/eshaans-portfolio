"use client";

import React from "react";
import { BaseProjectWorld } from "../../components/BaseProjectWorld";
import { Text } from "@react-three/drei";

interface FounderFinderWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function FounderFinderWorld({ isActive, onClose }: FounderFinderWorldProps) {
  const narrativeSlides = [
    {
      title: "Problem",
      text: "Manual researcher prospecting of qualified startup founders is slow and hard to scale."
    },
    {
      title: "Solution",
      text: "AI agents automate data extraction, qualification screening, and summary writeups."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Founder Finder"
      narrativeSlides={narrativeSlides}
    >
      {/* Dynamic placeholder mesh */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.8} />
      </mesh>
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.06}
        color="#a1a1aa"
        position={[0, 0.4, 0]}
      >
        [ Founder Finder Sandbox ]
      </Text>
    </BaseProjectWorld>
  );
}

export default FounderFinderWorld;

