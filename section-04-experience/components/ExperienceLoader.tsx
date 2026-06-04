"use client";

import React from "react";
import { experienceManifest } from "../data/experience-manifest";

interface ExperienceLoaderProps {
  selectedExperience: string | null;
  onClose: () => void;
}

export function ExperienceLoader({ selectedExperience, onClose }: ExperienceLoaderProps) {
  if (!selectedExperience) return null;

  const data = experienceManifest.find((exp) => exp.company === selectedExperience);
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-black/95 backdrop-blur-md transition-opacity duration-500 animate-fade-in pointer-events-auto">
      
      {/* Top Bar HUD */}
      <div className="flex justify-between items-start w-full">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Professional Records
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            {data.company}
          </h2>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            {data.role} // {data.duration}
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
        >
          [ Return to Vault ]
        </button>
      </div>

      {/* Narrative & Achievements list */}
      <div className="flex flex-col max-w-2xl my-auto text-left">
        <p className="text-base md:text-lg font-light text-zinc-300 leading-relaxed mb-8">
          {data.description}
        </p>
        
        <div className="space-y-4">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-2">
            Key Contributions & Learnings
          </span>
          {data.achievements.map((achievement, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-xs text-zinc-500 font-mono mt-1">0{i + 1}.</span>
              <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer HUD */}
      <div className="flex justify-between items-end w-full mt-auto">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Chapter 04 // Experience Vault
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Status: Verified Log
        </div>
      </div>

    </div>
  );
}
export default ExperienceLoader;
