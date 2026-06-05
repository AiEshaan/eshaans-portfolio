"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ContactTab } from "../hooks/useContactNavigation";
import { ContactChannel } from "../../types/Contact";

interface ContactAppsProps {
  scrollProgress: number;
  onSelectApp: (tab: ContactTab) => void;
  activeTab: ContactTab;
  contactChannels: ContactChannel[];
}

const appColorMap: Record<string, string> = {
  email: "#ccaa88",
  github: "#ffffff",
  linkedin: "#4875a8",
  resume: "#888888"
};

const appTabMap: Record<string, ContactTab> = {
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  resume: "Resume"
};

export function ContactApps({ scrollProgress, onSelectApp, activeTab, contactChannels }: ContactAppsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // App grid becomes visible once the tablet screen is fully active
  const isVisible = scrollProgress >= 0.88;
  if (!isVisible || activeTab !== "Home") return null;

  return (
    <group position={[0, -0.3, 0.708]} rotation={[Math.PI * 0.15, 0, 0]}>
      {contactChannels.map((channel, idx) => {
        const tab = appTabMap[channel.type];
        if (!tab) return null;
        const color = appColorMap[channel.type] || "#ffffff";
        const label = channel.title;

        // Lay out in a 2x2 grid on screen face
        const x = idx % 2 === 0 ? -0.1 : 0.1;
        const y = idx < 2 ? 0.05 : -0.05;
        const isHovered = hoveredIdx === idx;
        
        return (
          <group
            key={channel.id || channel.type}
            position={[x, y, 0.002]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectApp(tab);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              setHoveredIdx(idx);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "default";
              setHoveredIdx(null);
            }}
          >
            {/* Glossy App Icon base shape */}
            <mesh castShadow>
              <boxGeometry args={[0.08, 0.035, 0.002]} />
              <meshStandardMaterial
                color={isHovered ? color : "#1a1a1b"}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing icon edge indicator */}
            {isHovered && (
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.082, 0.037, 0.002)]} />
                <lineBasicMaterial color="#ffe5cc" />
              </lineSegments>
            )}

            {/* Label inside app */}
            <Text
              position={[0, 0, 0.002]}
              font="/fonts/outfit.ttf"
              fontSize={0.008}
              color={isHovered ? "#000000" : "#cccccc"}
              anchorX="center"
              anchorY="middle"
            >
              {label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default ContactApps;

