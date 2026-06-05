"use client";

import React, { useEffect, useState } from "react";
import { ExperienceService } from "../../firebase/firestore";
import { Experience } from "../../types/Experience";

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await ExperienceService.getAll();
        setExperiences(data);
      } catch (e) {
        console.error("Error loading experience: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadExperiences();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Database Collection
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            Experience Manager
          </h1>
        </div>
        <button className="px-4 py-2 text-[10px] text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all cursor-pointer">
          [ Add Experience ]
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center min-h-[200px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Synchronizing experience collection...
        </div>
      ) : (
        <div className="border border-zinc-800 bg-[#0c0c0d] rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Order</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Company</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Role</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Duration</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id || exp.company} className="border-b border-zinc-900 hover:bg-zinc-900/30 transition-all">
                  <td className="p-4 text-xs font-mono text-zinc-500">{exp.order}</td>
                  <td className="p-4 text-xs text-zinc-200 font-medium">{exp.company}</td>
                  <td className="p-4 text-xs text-zinc-400">{exp.role}</td>
                  <td className="p-4 text-xs font-mono text-zinc-400">{exp.duration}</td>
                  <td className="p-4 text-xs font-mono text-zinc-400 flex gap-4">
                    <button className="hover:text-zinc-100 transition-all cursor-pointer">[ Edit ]</button>
                    <button className="hover:text-red-400 transition-all cursor-pointer">[ Delete ]</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ExperienceManager;
