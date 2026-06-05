"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FinalReveal() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Rotating framing rings
    ringsRef.current.children.forEach((child, i) => {
      child.rotation.y = time * 0.1 * (i === 0 ? 1 : -1);
      child.rotation.x = time * 0.05 * (i === 0 ? 1 : -0.5);
    });
  });

  return (
    <group ref={ringsRef} position={[0, 0.4, 0.4]}>
      {/* Decorative accent framing ring 1 */}
      <lineLoop>
        <ringGeometry args={[0.7, 0.702, 64]} />
        <meshBasicMaterial color="#333333" side={THREE.DoubleSide} />
      </lineLoop>

      {/* Decorative accent framing ring 2 */}
      <lineLoop rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.9, 0.902, 64]} />
        <meshBasicMaterial color="#222222" side={THREE.DoubleSide} />
      </lineLoop>
    </group>
  );
}

export default FinalReveal;
