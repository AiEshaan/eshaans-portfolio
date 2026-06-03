"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "./Environment";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { ScrollController } from "./ScrollController";

export function IntroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-[#080808] overflow-x-hidden text-zinc-100 font-sans">
      
      {/* 3D R3F Viewport Canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#080808"]} />
          <fog attach="fog" args={["#080808", 4, 9]} />
          
          <Environment />
          
          <Character scrollProgress={scrollProgress} />
          
          <CameraRig scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* HTML Content Overlay & Smooth Scroll Engine */}
      <ScrollController onScrollProgress={setScrollProgress} />

    </div>
  );
}
