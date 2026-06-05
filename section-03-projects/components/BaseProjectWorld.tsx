"use client";

import React, { useState, useRef, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface NarrativeSlide {
  title: string;
  text: string;
}

interface BaseProjectWorldProps {
  isActive: boolean;
  onClose: () => void;
  title: string;
  narrativeSlides: NarrativeSlide[];
  children?: ReactNode;
  rightPanelContent?: ReactNode;
}

export function BaseProjectWorld({
  isActive,
  narrativeSlides,
  children,
  rightPanelContent
}: BaseProjectWorldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [localStep, setLocalStep] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Scale up/down when active
    const targetScale = isActive ? 1.0 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    if (isActive) {
      const time = state.clock.getElapsedTime();
      // Slow rotation of text boards
      setLocalStep(Math.floor((time * 0.15) % narrativeSlides.length));
    }
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef} position={[-0.28, -0.4, 0.5]}>
      
      {/* Dynamic 3D Scene children (rackets, maps, comments, etc.) */}
      {children}

      {/* Narrative Documentation Board (Left Side) */}
      <group position={[-0.8, 0.5, 0.4]}>
        <Text
          font="/fonts/outfit.ttf"
          fontSize={0.045}
          color="#d4af37"
          anchorX="right"
          anchorY="bottom"
        >
          {"// NARRATIVE WORKFLOW"}
        </Text>

        {narrativeSlides.map((slide, index) => {
          const isCurrent = index === localStep;
          return (
            <group key={slide.title} position={[0, -0.06 - index * 0.09, 0]}>
              <Text
                font="/fonts/outfit.ttf"
                fontSize={0.055}
                color={isCurrent ? "#ffffff" : "#444444"}
                anchorX="right"
                anchorY="bottom"
              >
                {slide.title}
              </Text>
              {isCurrent && (
                <Text
                  position={[0, -0.015, 0]}
                  font="/fonts/inter.ttf"
                  fontSize={0.035}
                  maxWidth={0.45}
                  textAlign="right"
                  color="#a1a1aa"
                  anchorX="right"
                  anchorY="top"
                >
                  {slide.text}
                </Text>
              )}
            </group>
          );
        })}
      </group>

      {/* Right panel slot (for custom telemetry stats, diagrams, recommendations, etc.) */}
      {rightPanelContent && <group>{rightPanelContent}</group>}

    </group>
  );
}
export default BaseProjectWorld;

