"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { CharacterAssetManager } from "../../shared/character/CharacterAssetManager";

interface FaceRevealProps {
  scrollProgress: number;
}

export function FaceReveal({ scrollProgress }: FaceRevealProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [particles, setParticles] = useState<{
    positions: Float32Array;
    colors: Float32Array;
    originalPositions: Float32Array;
  } | null>(null);

  useEffect(() => {
    // Load image and parse pixels
    const img = new Image();
    img.src = CharacterAssetManager.getReferences().faceReference;
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Target resolution for the point cloud (100x180 is ~18k particles)
      const width = 100;
      const height = 180;
      canvas.width = width;
      canvas.height = height;
      
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      
      const positions: number[] = [];
      const colors: number[] = [];
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          
          // Only use pixels with high opacity
          if (alpha > 120) {
            // Map 2D grid to 3D space
            // Centered x-coord, inverted y-coord
            const posX = (x - width / 2) * 0.02;
            const posY = -(y - height / 2) * 0.02 + 0.3;
            // Add subtle depth offset based on pixel brightness (simulating 3D structure)
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const brightness = (r + g + b) / 3;
            const posZ = (brightness / 255.0) * 0.15;
            
            positions.push(posX, posY, posZ);
            
            // Normalize colors
            colors.push(r / 255, g / 255, b / 255);
          }
        }
      }
      
      const posArray = new Float32Array(positions);
      const colArray = new Float32Array(colors);
      
      setParticles({
        positions: posArray,
        colors: colArray,
        originalPositions: new Float32Array(posArray)
      });
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !particles) return;
    
    const geometry = pointsRef.current.geometry;
    const posAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();
    
    // Determine animation states based on scrollProgress
    // Face reveal happens between scroll 0.35 and 0.75
    let animationProgress = 0;
    if (scrollProgress >= 0.35 && scrollProgress <= 0.75) {
      animationProgress = (scrollProgress - 0.35) / 0.4; // 0 to 1
    } else if (scrollProgress > 0.75) {
      animationProgress = 1 - (scrollProgress - 0.75) / 0.25; // Dissolve out towards the end
    }
    
    // Clamp between 0 and 1
    animationProgress = Math.max(0, Math.min(1, animationProgress));

    const positions = posAttribute.array as Float32Array;
    const orig = particles.originalPositions;
    
    for (let i = 0; i < positions.length; i += 3) {
      const px = orig[i];
      const py = orig[i + 1];
      const pz = orig[i + 2];
      
      // Turbulence effect (noise dispersion when hidden)
      const dispersion = (1 - animationProgress) * 2.0;
      const noiseX = Math.sin(time + px * 5) * 0.1 * dispersion;
      const noiseY = Math.cos(time + py * 5) * 0.1 * dispersion;
      const noiseZ = Math.sin(time + pz * 10) * 0.2 * dispersion;

      positions[i] = px + noiseX;
      positions[i + 1] = py + noiseY;
      // When dispersion is high, push particles back in space
      positions[i + 2] = pz + noiseZ - (1 - animationProgress) * 1.5;
    }
    
    posAttribute.needsUpdate = true;
    
    // Scale or position adjustment matching character breathing
    pointsRef.current.position.y = Math.sin(time * 1.5) * 0.02 + 0.9;
  });

  if (!particles) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={Math.min(1.0, scrollProgress > 0.35 ? (scrollProgress - 0.35) * 4 : 0)}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
