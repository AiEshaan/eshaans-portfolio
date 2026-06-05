"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface IDCardPortalProps {
  scrollProgress: number;
  onSelectPortal: () => void;
  isActive: boolean;
}

export function IDCardPortal({ onSelectPortal }: IDCardPortalProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load generated student ID Card texture at top-level
  const texture = useTexture("/images/aiml_student_id_card.png");

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle swaying physics simulating hanging lanyard
    const swayZ = Math.sin(time * 1.2) * 0.04;
    const swayX = Math.cos(time * 0.8) * 0.02;
    
    // Snaps rotation back to look flat when hovered or selected
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, hovered ? 0 : swayZ, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, hovered ? 0 : swayX, 0.1);
    
    // Fast spin on click
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.15, 0.1);
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  const scale = hovered ? 1.05 : 1.0;

  return (
    <group
      ref={meshRef}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelectPortal();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
        setHovered(false);
      }}
    >
      {/* 3D Lanyard hook */}
      <mesh position={[0, 0.17, 0]}>
        <torusGeometry args={[0.015, 0.003, 8, 24]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ID Badge Card Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.33, 0.006]} />
        <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Textured ID Badge Screen (Front Face overlay) */}
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[0.21, 0.31]} />
        <meshStandardMaterial
          map={texture || undefined}
          roughness={0.45}
          color={hovered ? "#ffffff" : "#dddddd"}
        />
      </mesh>
    </group>
  );
}

export default IDCardPortal;
