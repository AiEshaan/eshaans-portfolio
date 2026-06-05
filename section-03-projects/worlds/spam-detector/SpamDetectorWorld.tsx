"use client";

import React from "react";
import { BaseProjectWorld } from "../../components/BaseProjectWorld";
import { Text } from "@react-three/drei";

interface SpamDetectorWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function SpamDetectorWorld({ isActive, onClose }: SpamDetectorWorldProps) {
  const narrativeSlides = [
    {
      title: "Problem",
      text: "Manual review of spam comments in videos wastes time and is highly inconsistent."
    },
    {
      title: "Solution",
      text: "Machine learning classifier categorizing text datasets into spam or legitimate ham."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="YouTube Spam Detector"
      narrativeSlides={narrativeSlides}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.9} />
      </mesh>
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.06}
        color="#a1a1aa"
        position={[0, 0.4, 0]}
      >
        [ YouTube Spam Detector Sandbox ]
      </Text>
    </BaseProjectWorld>
  );
}

export default SpamDetectorWorld;

