"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { Certification } from "../../types/Certification";

interface CertificateDrawerProps {
  scrollProgress: number;
  onSelectCert: (title: string) => void;
  selectedCert: string | null;
  certifications: Certification[];
}

export function CertificateDrawer({ scrollProgress, onSelectCert, selectedCert, certifications }: CertificateDrawerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Slides pop up when folder opens (from scrollProgress 0.85 to 1.0)
  let slideProgress = 0;
  if (scrollProgress >= 0.85) {
    slideProgress = (scrollProgress - 0.85) / 0.12;
    slideProgress = Math.min(1.0, slideProgress);
  }

  const isAnySelected = selectedCert !== null;

  return (
    <group scale={slideProgress > 0 ? 1 : 0.001}>
      {certifications.map((cert, index) => {
        // Arrange drawers vertically stacked inside the folder
        const initialY = 0.1 - index * 0.07;
        const isHovered = hoveredIdx === index;
        
        // Slide drawer sheets out forward and up when hovered
        const hoverOffsetZ = isHovered ? 0.03 : 0.0;
        const hoverOffsetY = isHovered ? 0.015 : 0.0;

        return (
          <group
            key={cert.title}
            position={[0, initialY + hoverOffsetY, 0.015 + hoverOffsetZ]}
            scale={isAnySelected ? 0.001 : 1}
            onClick={(e) => {
              e.stopPropagation();
              onSelectCert(cert.title);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setHoveredIdx(index);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "default";
              setHoveredIdx(null);
            }}
          >
            {/* Certificate sheet plate */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.18, 0.045, 0.002]} />
              <meshStandardMaterial color={isHovered ? "#ffffff" : "#f5efe6"} roughness={0.7} />
            </mesh>

            {/* Accent border strip on left */}
            <mesh position={[-0.088, 0, 0.001]}>
              <boxGeometry args={[0.004, 0.045, 0.002]} />
              <meshBasicMaterial color={isHovered ? "#ccaa88" : "#888888"} />
            </mesh>

            {/* Certificate Title */}
            <Text
              position={[-0.08, 0.008, 0.002]}
              font="/fonts/outfit.ttf"
              fontSize={0.012}
              color="#111111"
              anchorX="left"
            >
              {cert.title.length > 28 ? cert.title.slice(0, 26) + "..." : cert.title}
            </Text>

            {/* Issuer Badge Tag */}
            <Text
              position={[-0.08, -0.008, 0.002]}
              font="/fonts/inter.ttf"
              fontSize={0.008}
              color="#555555"
              anchorX="left"
            >
              {cert.issuer} ({cert.date})
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default CertificateDrawer;

