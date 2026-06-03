"use client";

import React from "react";

export function Environment() {
  return (
    <>
      {/* Cinematic ambient lighting */}
      <ambientLight intensity={0.15} />

      {/* Main soft key light simulating a large softbox */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Warm rim light to separate the character from the background */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.6}
        color="#ffe5cc"
      />

      {/* Soft fill light */}
      <pointLight position={[-10, 0, 10]} intensity={0.3} />

      {/* Dark studio floor shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </>
  );
}
