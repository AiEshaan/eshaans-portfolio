"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

export function ImpactSequence() {
  const routes = useMemo(() => {
    const coords = [
      { from: [0.25, -0.2, 0.12], to: [-0.05, -0.5, 0.12] }, // Sandalwood -> Dasara
      { from: [0.25, -0.2, 0.12], to: [0.15, 0.3, 0.12] }    // Sandalwood -> Hampi
    ];

    return coords.map((pair) => {
      const start = new THREE.Vector3(pair.from[0], pair.from[1], pair.from[2]);
      const end = new THREE.Vector3(pair.to[0], pair.to[1], pair.to[2]);
      
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.z += 0.2; // Elevate curve height

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(24);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  return (
    <group position={[0, -0.2, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
      {routes.map((geom, index) => (
        <lineSegments key={index} geometry={geom}>
          <lineBasicMaterial color="#ffe5cc" transparent opacity={0.2} />
        </lineSegments>
      ))}
    </group>
  );
}
export default ImpactSequence;
