"use client";

import React from "react";
import { FaceReveal } from "./FaceReveal";
import { MindsetFlow } from "./MindsetFlow";
import { StoryTransition } from "./StoryTransition";

interface AboutSceneProps {
  scrollProgress: number;
}

export function AboutScene({ scrollProgress }: AboutSceneProps) {
  return (
    <group>
      {/* 3D point cloud face reveal */}
      <FaceReveal scrollProgress={scrollProgress} />

      {/* Floating 3D concept mindset flow */}
      <MindsetFlow scrollProgress={scrollProgress} />

      {/* Transition dialogue */}
      <StoryTransition scrollProgress={scrollProgress} />
    </group>
  );
}
