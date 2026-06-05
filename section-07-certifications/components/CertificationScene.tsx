"use client";

import React from "react";
import { ArchiveFolder } from "./ArchiveFolder";
import { CertificateDrawer } from "./CertificateDrawer";
import { BadgeWall } from "./BadgeWall";

import { Certification } from "../../types/Certification";

interface CertificationSceneProps {
  scrollProgress: number;
  onSelectCert: (title: string) => void;
  selectedCert: string | null;
  certifications: Certification[];
}

export function CertificationScene({ scrollProgress, onSelectCert, selectedCert, certifications }: CertificationSceneProps) {
  // Show certifications archive in Phase 7: scrollProgress >= 0.85
  const isVisible = scrollProgress >= 0.85;
  if (!isVisible) return null;

  // Snaps near character's right hand position (opposite of left palm)
  const folderPos: [number, number, number] = [-0.35, -0.15, 0.4];

  return (
    <group position={folderPos}>
      {/* 3D Binder Folder */}
      <ArchiveFolder scrollProgress={scrollProgress} />

      {/* Floating Drawers/Sheets */}
      <CertificateDrawer
        scrollProgress={scrollProgress}
        onSelectCert={onSelectCert}
        selectedCert={selectedCert}
        certifications={certifications}
      />

      {/* Hexagonal wall achievements row above folder */}
      <BadgeWall scrollProgress={scrollProgress} />
    </group>
  );
}

export default CertificationScene;
