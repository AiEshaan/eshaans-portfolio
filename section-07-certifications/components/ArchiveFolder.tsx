"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ArchiveFolderProps {
  scrollProgress: number;
}

export function ArchiveFolder({ scrollProgress }: ArchiveFolderProps) {
  const leftCoverRef = useRef<THREE.Mesh>(null);
  const rightCoverRef = useRef<THREE.Mesh>(null);

  // Folder slowly sways and opens as scrollProgress progresses in Phase 7
  let openProgress = 0;
  if (scrollProgress >= 0.85) {
    openProgress = (scrollProgress - 0.85) / 0.08;
    openProgress = Math.min(1.0, openProgress);
  }

  useFrame(() => {
    if (leftCoverRef.current && rightCoverRef.current) {
      // Rotation targets to open binder covers flat
      const targetLeftRot = -Math.PI * 0.7 * openProgress;
      const targetRightRot = Math.PI * 0.7 * openProgress;

      leftCoverRef.current.rotation.y = THREE.MathUtils.lerp(leftCoverRef.current.rotation.y, targetLeftRot, 0.08);
      rightCoverRef.current.rotation.y = THREE.MathUtils.lerp(rightCoverRef.current.rotation.y, targetRightRot, 0.08);
    }
  });

  return (
    <group>
      {/* Folder Spine */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 0.36, 0.02]} />
        <meshStandardMaterial color="#2d1f18" roughness={0.85} metalness={0.1} /> {/* Dark brown leather */}
      </mesh>

      {/* Left Cover (flaps open leftward) */}
      <group position={[-0.01, 0, 0]}>
        <mesh ref={leftCoverRef} position={[-0.11, 0, 0.005]} castShadow>
          <boxGeometry args={[0.22, 0.35, 0.008]} />
          <meshStandardMaterial color="#3e2d21" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* Right Cover (flaps open rightward) */}
      <group position={[0.01, 0, 0]}>
        <mesh ref={rightCoverRef} position={[0.11, 0, 0.005]} castShadow>
          <boxGeometry args={[0.22, 0.35, 0.008]} />
          <meshStandardMaterial color="#3e2d21" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* Inside Paper stack base */}
      {openProgress > 0.1 && (
        <mesh position={[0, 0, 0.002]} scale={[openProgress, 1, 1]}>
          <boxGeometry args={[0.2, 0.33, 0.005]} />
          <meshStandardMaterial color="#eae6df" roughness={0.8} /> {/* Cream archival paper */}
        </mesh>
      )}
    </group>
  );
}

export default ArchiveFolder;
