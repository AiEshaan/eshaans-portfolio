"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RacketModel() {
  const racketRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!racketRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow drift and self-rotation representing sensors tracking motion
    racketRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    racketRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    racketRef.current.rotation.y = time * 0.4;
    racketRef.current.rotation.z = Math.cos(time * 0.5) * 0.1;
  });

  return (
    <group ref={racketRef} scale={1.2}>
      {/* 1. Blade / Head of the Racket */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.7} /> {/* Wood center */}
      </mesh>

      {/* Red Rubber Face (Front) */}
      <mesh position={[0, 0, 0.011]} castShadow>
        <cylinderGeometry args={[0.295, 0.295, 0.002, 32]} />
        <meshStandardMaterial color="#b22222" roughness={0.4} /> {/* Matte red rubber */}
      </mesh>

      {/* Black Rubber Face (Back) */}
      <mesh position={[0, 0, -0.011]} castShadow>
        <cylinderGeometry args={[0.295, 0.295, 0.002, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} /> {/* Matte black rubber */}
      </mesh>

      {/* 2. Handle */}
      <group position={[0, -0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.07, 0.25, 0.03]} />
          <meshStandardMaterial color="#d2b48c" roughness={0.8} /> {/* Light wood handle */}
        </mesh>
        
        {/* Sensor Chip Mockup (TinyML Arduino device inside the handle base) */}
        <mesh position={[0, -0.125, 0]} castShadow>
          <boxGeometry args={[0.04, 0.03, 0.032]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
