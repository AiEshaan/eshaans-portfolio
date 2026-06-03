"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SensorTrails() {
  const lineRef = useRef<THREE.LineLoop>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate a smooth orbital spline trajectory for tracking data
  const curvePoints = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      // Elliptical path winding around handle/paddle
      const x = Math.sin(angle) * 0.6;
      const y = Math.cos(angle) * 0.5 - 0.1;
      const z = Math.sin(angle * 2) * 0.3;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points).getPoints(100);
  }, []);

  const pathGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(curvePoints);
  }, [curvePoints]);

  // Generate loose sensor particle coordinates
  const particlesData = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      speeds[i] = 0.2 + Math.random() * 0.5;
    }
    
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (lineRef.current) {
      lineRef.current.rotation.y = time * 0.15;
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = positions.array as Float32Array;
      
      for (let i = 0; i < array.length; i += 3) {
        // Subtle drift movement representing sensor packet transmissions
        array[i + 1] -= particlesData.speeds[i / 3] * 0.005; // Fall down slightly
        
        // Reset particles if they drift out
        if (array[i + 1] < -0.8) {
          array[i] = (Math.random() - 0.5) * 1.2;
          array[i + 1] = 0.8;
          array[i + 2] = (Math.random() - 0.5) * 0.6;
        }
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Spline motion track line */}
      <line ref={lineRef} geometry={pathGeometry}>
        <lineBasicMaterial color="#d4af37" transparent opacity={0.35} linewidth={1} />
      </line>

      {/* 2. Floating sensor node particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.012}
          color="#d4af37"
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}
