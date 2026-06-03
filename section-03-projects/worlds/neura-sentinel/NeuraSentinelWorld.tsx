"use client";

import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { TrainingArena } from "./TrainingArena";
import { RacketModel } from "./RacketModel";
import { SensorTrails } from "./SensorTrails";
import { AnalyticsDisplay } from "./AnalyticsDisplay";

interface NeuraSentinelWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function NeuraSentinelWorld({ isActive, onClose }: NeuraSentinelWorldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [localStep, setLocalStep] = useState(0);

  // Simple local clock animation for visibility transitions
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth scale-up and fade-in when selected
    const targetScale = isActive ? 1.0 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    // Rotate slowly over time
    if (isActive) {
      const time = state.clock.getElapsedTime();
      setLocalStep(Math.floor((time * 0.15) % 4)); // Cycle through slides: Problem -> Solution -> Tech -> Impact
    }
  });

  const narrativeSlides = [
    {
      title: "Problem",
      text: "Athletes lack affordable real-time coaching and performance feedback during training."
    },
    {
      title: "Solution",
      text: "An AI-powered coaching system that uses edge sensor telemetry to classify strokes."
    },
    {
      title: "Technology",
      text: "Arduino Nano 33 BLE Sense, TinyML (TensorFlow Lite Micro), React & TypeScript Dashboard."
    },
    {
      title: "Impact",
      text: "Democratizes access to high-fidelity motion coaching insights on the court."
    }
  ];

  if (!isActive) return null;

  return (
    <group ref={groupRef} position={[-0.28, -0.4, 0.5]}>
      {/* Grid Arena Platform */}
      <TrainingArena />

      {/* Racket Mesh */}
      <RacketModel />

      {/* IMU Sensor Tracking Particles */}
      <SensorTrails />

      {/* Telemetry Stats Panel (Right Side) */}
      <AnalyticsDisplay />

      {/* Narrative Documentation Board (Left Side) */}
      <group position={[-0.8, 0.5, 0.4]}>
        <Text
          font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
          fontSize={0.05}
          color="#d4af37"
          anchorX="right"
          anchorY="bottom"
        >
          // NARRATIVE SUMMARY
        </Text>

        {narrativeSlides.map((slide, index) => {
          const isCurrent = index === localStep;
          return (
            <group key={slide.title} position={[0, -0.06 - index * 0.09, 0]}>
              <Text
                font="https://fonts.gstatic.com/s/outfit/v11/QId5dDEDcdS2Ma1357i8rnWpQDw.woff"
                fontSize={0.06}
                color={isCurrent ? "#ffffff" : "#444444"}
                anchorX="right"
                anchorY="bottom"
              >
                {slide.title}
              </Text>
              {isCurrent && (
                <Text
                  position={[0, -0.015, 0]}
                  font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff"
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
    </group>
  );
}

// Support useRef properly
import { useRef } from "react";
export default NeuraSentinelWorld;
