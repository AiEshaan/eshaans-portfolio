"use client";

import React from "react";

interface ProjectLoaderProps {
  selectedProject: string | null;
  onClose: () => void;
}

export function ProjectLoader({ selectedProject, onClose }: ProjectLoaderProps) {
  if (!selectedProject) return null;

  const isNeuraSentinel = selectedProject === "Neura Sentinel";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 transition-opacity duration-500 animate-fade-in pointer-events-none ${
        isNeuraSentinel ? "bg-black/35" : "bg-black/90 backdrop-blur-md"
      }`}
    >
      
      {/* Top Bar HUD */}
      <div className="flex justify-between items-start w-full pointer-events-auto">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            {isNeuraSentinel ? "3D Project Exhibition" : "Project Environment"}
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            {selectedProject}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Return to Projects Pocket"
          className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          [ Return to Pocket ]
        </button>
      </div>

      {/* Middle Loading State (Only if not Neura Sentinel) */}
      {!isNeuraSentinel && (
        <div className="flex flex-col items-center justify-center text-center my-auto">
          <div className="w-12 h-12 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mb-4" />
          <p className="text-sm font-light text-zinc-400 tracking-wider">
            Initializing 3D Workspace Environment...
          </p>
          <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest mt-1">
            Sandbox coming in Phase 4
          </p>
        </div>
      )}

      {/* Floating hints for 3D navigation (Neura Sentinel only) */}
      {isNeuraSentinel && (
        <div className="flex flex-col items-center justify-center text-center my-auto">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest animate-pulse">
            Racket telemetry streaming live from Arduino edge sensor
          </span>
        </div>
      )}

      {/* Bottom Footer HUD */}
      <div className="flex justify-between items-end w-full mt-auto">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Eshaan Mayekar // Architectural Core
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          {isNeuraSentinel ? "Status: Live 3D Simulation" : "Status: Offline Sandbox"}
        </div>
      </div>

    </div>
  );
}
