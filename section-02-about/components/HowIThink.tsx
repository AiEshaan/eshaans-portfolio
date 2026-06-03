"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { aboutContent } from "../data/about-content";

interface HowIThinkProps {
  scrollProgress: number;
}

export function HowIThink({ scrollProgress }: HowIThinkProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Map individual words to circular orbit coordinates around the head
  const radius = 1.3;
  const words = aboutContent.thinkSequence.map((item, index) => {
    const angle = (index / aboutContent.thinkSequence.length) * Math.PI * 1.2 - Math.PI * 0.6;
    const posX = Math.sin(angle) * radius;
    const posY = 1.0 + Math.cos(angle) * 0.2;
    const posZ = Math.cos(angle) * radius - 0.5;

    // Define scroll activation range for each word
    // How I Think range is 0.55 to 0.8
    const startProgress = 0.55 + (index / aboutContent.thinkSequence.length) * 0.18;
    const endProgress = startProgress + 0.08;

    return {
      ...item,
      posX,
      posY,
      posZ,
      startProgress,
      endProgress
    };
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Subtle overall orbit rotation/tilt
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.08;
    groupRef.current.position.y = Math.cos(time * 0.5) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {words.map((word, index) => {
        // Calculate dynamic opacity based on scroll progress
        let opacity = 0;
        if (scrollProgress >= word.startProgress) {
          opacity = (scrollProgress - word.startProgress) / (word.endProgress - word.startProgress);
          opacity = Math.min(1.0, opacity);
          // Start fading out towards transition to projects
          if (scrollProgress > 0.82) {
            opacity = Math.max(0, 1 - (scrollProgress - 0.82) * 8);
          }
        }

        return (
          <group key={word.text} position={[word.posX, word.posY, word.posZ]}>
            {/* 3D Label */}
            <Text
              font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
              fontSize={0.16}
              anchorX="center"
              anchorY="middle"
              color="#ffffff"
              fillOpacity={opacity}
              strokeWidth={0.002}
              strokeColor="#888888"
              strokeOpacity={opacity * 0.3}
            >
              {word.text}
            </Text>

            {/* Description Subtext */}
            <Text
              position={[0, -0.12, 0]}
              font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
              fontSize={0.06}
              maxWidth={0.6}
              lineHeight={1.4}
              textAlign="center"
              anchorX="center"
              anchorY="top"
              color="#a1a1aa"
              fillOpacity={opacity * 0.8}
            >
              {word.description}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
