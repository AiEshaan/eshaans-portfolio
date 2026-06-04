"use client";

import React from "react";
import { BaseProjectWorld } from "../../../section-03-projects/components/BaseProjectWorld";
import { KarnatakaMap } from "./KarnatakaMap";
import { EventNodes } from "./EventNodes";
import { RecommendationEngine } from "./RecommendationEngine";
import { ImpactSequence } from "./ImpactSequence";

interface MindMatrixWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function MindMatrixWorld({ isActive, onClose }: MindMatrixWorldProps) {
  const narrativeSlides = [
    {
      title: "Internship",
      text: "AI Developer Intern role at MindMatrix.io, building cultural mapping platforms."
    },
    {
      title: "Problem",
      text: "Cultural events and native artisan details were fragmented and hard for tourists to discover."
    },
    {
      title: "Solution",
      text: "Built a centralized discovery map platform connected to localized recommendation databases."
    },
    {
      title: "Technology",
      text: "Next.js frontend, Firestore dynamic state, and Google Gemini AI recommendation engines."
    },
    {
      title: "Impact",
      text: "Successfully mapped cultural clusters, boosting local artisan visibility and travel plans."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="MindMatrix"
      narrativeSlides={narrativeSlides}
      rightPanelContent={<RecommendationEngine />}
    >
      {/* 3D Karnataka map contours */}
      <KarnatakaMap />

      {/* Pulsing event pins */}
      <EventNodes />

      {/* Connecting bezier routes */}
      <ImpactSequence />
    </BaseProjectWorld>
  );
}
export default MindMatrixWorld;
