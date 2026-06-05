"use client";

import React from "react";
import { BaseProjectWorld } from "../../components/BaseProjectWorld";
import { Text } from "@react-three/drei";

interface SkinCancerWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function SkinCancerWorld({ isActive, onClose }: SkinCancerWorldProps) {
  const narrativeSlides = [
    {
      title: "Problem",
      text: "Early diagnostic identification of skin lesions requires specialized clinical tools."
    },
    {
      title: "Solution",
      text: "Deep learning convolutional neural network models classifying lesion image textures."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Skin Cancer Classifier"
      narrativeSlides={narrativeSlides}
    >
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.95} />
      </mesh>
      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.06}
        color="#a1a1aa"
        position={[0, 0.4, 0]}
      >
        [ Skin Cancer Classifier Sandbox ]
      </Text>
    </BaseProjectWorld>
  );
}

export default SkinCancerWorld;

