"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

export function CultureRoutes() {
  // Generate curve geometries connecting cities on the map
  const routeGeometries = useMemo(() => {
    const coords = [
      { from: [0.1, -0.3, 0.15], to: [-0.1, -0.6, 0.15] }, // Bengaluru -> Mysuru
      { from: [0.1, -0.3, 0.15], to: [0.2, 0.2, 0.15] }   // Bengaluru -> Hampi
    ];

    return coords.map((pair) => {
      const start = new THREE.Vector3(pair.from[0], pair.from[1], pair.from[2]);
      const end = new THREE.Vector3(pair.to[0], pair.to[1], pair.to[2]);
      
      // Arc mid-point (elevated in height Y)
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.z += 0.25; // Pull height up in depth axis

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(30);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  return (
    <group position={[0, -0.2, 0]} rotation={[-Math.PI / 2.4, 0, 0]}>
      {routeGeometries.map((geometry, index) => (
        <line key={index} geometry={geometry}>
          <lineBasicMaterial color="#ffe5cc" transparent opacity={0.25} />
        </line>
      ))}
    </group>
  );
}
