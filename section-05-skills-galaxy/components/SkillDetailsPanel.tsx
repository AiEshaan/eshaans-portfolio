"use client";

import { Skill } from "../../types/Skill";

interface SkillDetailsPanelProps {
  selectedPlanet: string | null;
  onClose: () => void;
  skills: Skill[];
}

export function SkillDetailsPanel({ selectedPlanet, onClose, skills }: SkillDetailsPanelProps) {
  if (!selectedPlanet) return null;

  const data = skills.find((skill) => skill.category === selectedPlanet);
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-black/95 backdrop-blur-md transition-opacity duration-500 animate-fade-in pointer-events-auto">
      
      {/* Top Bar HUD */}
      <div className="flex justify-between items-start w-full">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Skills Database Array
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            {data.category}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Return to Skills Galaxy"
          className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          [ Return to Galaxy ]
        </button>
      </div>

      {/* Main core tool registry list */}
      <div className="flex flex-col max-w-2xl my-auto text-left">
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-6">
          Registered Tooling & Frameworks
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.tools.map((tool, i) => (
            <div key={i} className="flex gap-4 items-center p-4 border border-zinc-900 bg-zinc-950/40 rounded-lg">
              <span className="text-xs text-zinc-600 font-mono">0{i + 1}.</span>
              <p className="text-base font-light text-zinc-200">
                {tool}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end w-full mt-auto">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Chapter 05 // Skills Galaxy
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Classification: Dynamic Core
        </div>
      </div>

    </div>
  );
}

export default SkillDetailsPanel;
