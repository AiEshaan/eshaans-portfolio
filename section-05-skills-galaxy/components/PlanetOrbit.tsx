"use client";

import React from "react";
import * as THREE from "three";

interface PlanetOrbitProps {
  radius: number;
}

export function PlanetOrbit({ radius }: PlanetOrbitProps) {
  // Create a circle line loop in the horizontal plane
  const points: THREE.Vector3[] = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <lineLoop geometry={lineGeo}>
      <lineBasicMaterial color="#333333" transparent opacity={0.3} />
    </lineLoop>
  );
}

export default PlanetOrbit;
