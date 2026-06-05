"use client";

import React from "react";
import { BuiltSection } from "./BuiltSection";
import { LearnedSection } from "./LearnedSection";
import { FutureSection } from "./FutureSection";
import { FinalReveal } from "./FinalReveal";

interface JourneySummaryProps {
  scrollProgress: number;
}

export function JourneySummary({ scrollProgress }: JourneySummaryProps) {
  // Map segments based on scroll progress
  const isBuilt = scrollProgress >= 0.90 && scrollProgress < 0.93;
  const isLearned = scrollProgress >= 0.93 && scrollProgress < 0.96;
  const isFuture = scrollProgress >= 0.96 && scrollProgress < 0.99;
  const isFinal = scrollProgress >= 0.99;

  return (
    <group>
      {isBuilt && <BuiltSection />}
      {isLearned && <LearnedSection />}
      {isFuture && <FutureSection />}
      {isFinal && <FinalReveal />}
    </group>
  );
}

export default JourneySummary;
