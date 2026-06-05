"use client";

import React from "react";
import { JourneySummary } from "./JourneySummary";

interface EndingSceneProps {
  scrollProgress: number;
}

export function EndingScene({ scrollProgress }: EndingSceneProps) {
  // Show ending sequence elements only when inside Phase 9 scroll range
  const isVisible = scrollProgress >= 0.90;
  if (!isVisible) return null;

  return (
    <group>
      <JourneySummary scrollProgress={scrollProgress} />
    </group>
  );
}

export default EndingScene;
