"use client";

import React, { useState } from "react";
import { CharacterAssetManager } from "../../shared/character/CharacterAssetManager";
import { IDCardPortal } from "./IDCardPortal";
import { AcademicJourney } from "./AcademicJourney";

interface EducationSceneProps {
  scrollProgress: number;
  onSelectChapter: (institution: string) => void;
  selectedEducation: string | null;
}

export function EducationScene({ scrollProgress, onSelectChapter, selectedEducation }: EducationSceneProps) {
  const [portalActive, setPortalActive] = useState(false);

  // Position of ID Card lanyard hang point on character bust
  const neckPos = CharacterAssetManager.getHotspotOffset("idCard");

  // Show education meshes only in Phase 6: scrollProgress >= 0.82
  const isVisible = scrollProgress >= 0.82;
  if (!isVisible) return null;

  // Zoom portal transitions (from 0.82 to 0.88 it is the card, after 0.88 we enter the sketchbook)
  const isInsidePortal = scrollProgress >= 0.88 || portalActive;

  return (
    <group>
      {/* 3D ID Card hanging on neck */}
      {!isInsidePortal && (
        <group position={neckPos}>
          <IDCardPortal
            scrollProgress={scrollProgress}
            onSelectPortal={() => setPortalActive(true)}
            isActive={isVisible}
          />
        </group>
      )}

      {/* 3D Sketchbook Academic Journey Exhibition */}
      {isInsidePortal && (
        <group position={[0.0, 0.55, 0.8]}>
          <AcademicJourney
            scrollProgress={scrollProgress}
            onSelectChapter={onSelectChapter}
            selectedEducation={selectedEducation}
          />
        </group>
      )}
    </group>
  );
}

export default EducationScene;
