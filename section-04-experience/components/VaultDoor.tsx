"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CharacterAssetManager } from "../../shared/character/CharacterAssetManager";

interface VaultDoorProps {
  scrollProgress: number;
}

export function VaultDoor({ scrollProgress }: VaultDoorProps) {
  const sliderRef = useRef<THREE.Mesh>(null);
  const leftPanelRef = useRef<THREE.Mesh>(null);
  const rightPanelRef = useRef<THREE.Mesh>(null);

  // Experience Vault opens between scroll progress 0.65 and 0.78
  useFrame(() => {
    let openProgress = 0;
    if (scrollProgress >= 0.65 && scrollProgress <= 0.78) {
      openProgress = (scrollProgress - 0.65) / 0.13;
    } else if (scrollProgress > 0.78) {
      openProgress = 1.0;
    }

    const [ox, oy, oz] = CharacterAssetManager.getHotspotOffset("vault");

    // 1. Move the zipper slider downwards
    if (sliderRef.current) {
      sliderRef.current.position.set(ox, oy - openProgress * 0.7, oz + 0.01);
    }

    // 2. Separate left and right hoodie panels
    if (leftPanelRef.current) {
      leftPanelRef.current.position.set(ox - 0.08 - openProgress * 0.1, oy - 0.1, oz - 0.01);
      leftPanelRef.current.rotation.y = openProgress * -Math.PI * 0.15;
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.position.set(ox + 0.08 + openProgress * 0.1, oy - 0.1, oz - 0.01);
      rightPanelRef.current.rotation.y = openProgress * Math.PI * 0.15;
    }
  });

  const [ox, oy, oz] = CharacterAssetManager.getHotspotOffset("vault");

  return (
    <group>
      {/* Left Zipper Fabric Flap */}
      <mesh ref={leftPanelRef} position={[ox - 0.08, oy - 0.1, oz - 0.01]} castShadow>
        <boxGeometry args={[0.16, 0.7, 0.02]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
      </mesh>

      {/* Right Zipper Fabric Flap */}
      <mesh ref={rightPanelRef} position={[ox + 0.08, oy - 0.1, oz - 0.01]} castShadow>
        <boxGeometry args={[0.16, 0.7, 0.02]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
      </mesh>

      {/* Zipper Metal Slider */}
      <mesh ref={sliderRef} position={[ox, oy, oz + 0.01]} castShadow>
        <boxGeometry args={[0.03, 0.05, 0.02]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}
export default VaultDoor;
