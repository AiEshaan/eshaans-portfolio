"use client";

import React from "react";
import { BaseProjectWorld } from "../../../section-03-projects/components/BaseProjectWorld";
import { Text } from "@react-three/drei";

interface FreelanceWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function FreelanceWorld({ isActive, onClose }: FreelanceWorldProps) {
  const narrativeSlides = [
    {
      title: "Freelance",
      text: "Deployed custom AI agents, lead scoring tools, and automated pipelines for clients."
    },
    {
      title: "Problem",
      text: "Manual prospecting and lead sorting required substantial operational hours for sales teams."
    },
    {
      title: "Solution",
      text: "Integrated n8n automations and AI classifiers to scoring and filter leads automatically."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Freelance AI Automation"
      narrativeSlides={narrativeSlides}
    >
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.85} />
      </mesh>
      <Text
        font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
        fontSize={0.055}
        color="#a1a1aa"
        position={[0, 0.4, 0]}
      >
        [ Freelance AI Sandbox ]
      </Text>
    </BaseProjectWorld>
  );
}
export default FreelanceWorld;
