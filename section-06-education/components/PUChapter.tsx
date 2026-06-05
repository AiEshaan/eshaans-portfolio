"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function PUChapter() {
  const electron1Ref = useRef<THREE.Group>(null);
  const electron2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (electron1Ref.current) {
      electron1Ref.current.rotation.x = time * 1.5;
    }
    if (electron2Ref.current) {
      electron2Ref.current.rotation.y = time * 1.2;
      electron2Ref.current.rotation.z = time * 0.8;
    }
  });

  return (
    <group position={[0, 0.1, 0.1]}>
      {/* Central Nucleus ball */}
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#888888" roughness={0.8} />
      </mesh>

      {/* Orbit Shell Ring 1 */}
      <group ref={electron1Ref}>
        <lineLoop>
          <ringGeometry args={[0.15, 0.152, 32]} />
          <meshBasicMaterial color="#555555" side={THREE.DoubleSide} />
        </lineLoop>
        
        {/* Floating electron */}
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#ffe5cc" />
        </mesh>
      </group>

      {/* Orbit Shell Ring 2 */}
      <group ref={electron2Ref}>
        <lineLoop>
          <ringGeometry args={[0.22, 0.222, 32]} />
          <meshBasicMaterial color="#444444" side={THREE.DoubleSide} />
        </lineLoop>

        {/* Floating electron */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#ffe5cc" />
        </mesh>
      </group>

      <Text
        font="/fonts/outfit.ttf"
        fontSize={0.03}
        color="#a1a1aa"
        position={[0, -0.22, 0]}
        anchorX="center"
      >
        Government PU College / Science Core
      </Text>
    </group>
  );
}

export default PUChapter;

