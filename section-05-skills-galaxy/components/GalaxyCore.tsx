"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GalaxyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Core pulsing scale and rotation
    const scale = 1.0 + Math.sin(time * 2.0) * 0.08;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.03, 1]} />
      <meshBasicMaterial color="#ffe5cc" transparent opacity={0.9} wireframe />
      <pointLight distance={0.8} intensity={1.5} color="#ffe5cc" />
    </mesh>
  );
}

export default GalaxyCore;
