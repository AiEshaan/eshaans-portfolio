"use client";

import React from "react";
import { Education } from "../../types/Education";

interface EducationPortalProps {
  selectedEducation: string | null;
  onClose: () => void;
  education: Education[];
}

export function EducationPortal({ selectedEducation, onClose, education }: EducationPortalProps) {
  if (!selectedEducation) return null;

  const data = education.find((edu) => edu.institution === selectedEducation);
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-black/95 backdrop-blur-md transition-opacity duration-500 animate-fade-in pointer-events-auto">
      
      {/* Top Bar HUD */}
      <div className="flex justify-between items-start w-full">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Academic Journal Record
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            {data.institution}
          </h2>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            {data.degree} {"//"} {data.duration}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Education Chapter"
          className="px-4 py-2 text-[10px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 rounded-full hover:bg-zinc-800 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-400"
        >
          [ Close Chapter ]
        </button>
      </div>

      {/* Main core scholastic archive content */}
      <div className="flex flex-col max-w-2xl my-auto text-left">
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-4">
          Academic Details & Achievements
        </span>
        
        <div className="mb-6">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Performance Evaluation</span>
          <p className="text-xl font-light text-zinc-100 mt-1">{data.performance}</p>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">Core Focus & Work</span>
          {data.details.map((detail, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <span className="text-xs text-zinc-500 font-mono mt-1">0{idx + 1}.</span>
              <p className="text-base font-light text-zinc-400 leading-relaxed">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end w-full mt-auto">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Chapter 06 // Education Portal
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          Location: {data.location}
        </div>
      </div>

    </div>
  );
}

export default EducationPortal;
