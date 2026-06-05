"use client";

import React, { useEffect, useState } from "react";
import { ProjectsService, ExperienceService, SkillsService, CertificationsService, ContactService, AnalyticsService } from "../../firebase/firestore";

export function DashboardHome() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    experienceCount: 0,
    skillsCount: 0,
    certsCount: 0,
    messagesCount: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [proj, exp, skill, cert, msgList, summary] = await Promise.all([
          ProjectsService.getAll(),
          ExperienceService.getAll(),
          SkillsService.getAll(),
          CertificationsService.getAll(),
          ContactService.getMessages().catch(() => []),
          AnalyticsService.getSummary()
        ]);

        setStats({
          projectsCount: proj.length,
          experienceCount: exp.length,
          skillsCount: skill.reduce((acc, curr) => acc + curr.tools.length, 0),
          certsCount: cert.length,
          messagesCount: msgList.length,
          totalViews: summary?.totalViews || 0
        });
      } catch (e) {
        console.error("Dashboard stats load error: ", e);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
        Loading Telemetry Summary...
      </div>
    );
  }

  const cards = [
    { label: "Total Projects", value: stats.projectsCount, color: "text-zinc-100" },
    { label: "Experience Logs", value: stats.experienceCount, color: "text-zinc-100" },
    { label: "Configured Skills", value: stats.skillsCount, color: "text-zinc-100" },
    { label: "Certifications", value: stats.certsCount, color: "text-zinc-100" },
    { label: "Messages Recieved", value: stats.messagesCount, color: "text-zinc-100" },
    { label: "Telemetry Views", value: stats.totalViews, color: "text-amber-200" }
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          System Overview
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
          Dashboard Hub
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Overview of database collections, telemetry logs, and dynamic portfolio settings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="border border-zinc-800 bg-[#0c0c0d] p-6 rounded flex flex-col justify-between h-32">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              {card.label}
            </span>
            <span className={`text-4xl font-light tracking-wide ${card.color}`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>

      <div className="border border-zinc-800 bg-[#0c0c0d] p-6 rounded">
        <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase mb-4">
          Recent Activity Logs
        </h3>
        <p className="text-xs text-zinc-500 font-mono">
          No recent administrative writes logged. Authenticated edits will appear here.
        </p>
      </div>
    </div>
  );
}
export default DashboardHome;
