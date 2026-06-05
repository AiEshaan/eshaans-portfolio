"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnalyticsService } from "../../firebase/firestore";
import { AnalyticsEvent } from "../../types/Analytics";

// Helper to safely parse Firebase Timestamp to milliseconds
const getEventTime = (event: AnalyticsEvent, fallbackTime: number): number => {
  if (!event || !event.timestamp) return fallbackTime;
  const ts = event.timestamp;
  if (ts && typeof ts === "object") {
    const hasToDate = ts as { toDate?: () => unknown };
    if (typeof hasToDate.toDate === "function") {
      const d = hasToDate.toDate();
      if (d instanceof Date) return d.getTime();
    }
    const hasSeconds = ts as { seconds?: number };
    if (typeof hasSeconds.seconds === "number") {
      return hasSeconds.seconds * 1000;
    }
  }
  if (typeof ts === "string" || typeof ts === "number") {
    const parsed = new Date(ts).getTime();
    return isNaN(parsed) ? fallbackTime : parsed;
  }
  return fallbackTime;
};

export function AnalyticsManager() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredData, setHoveredData] = useState<{ label: string; value: number | string } | null>(null);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "all">("all");
  const [now, setNow] = useState<number>(() => Date.now());

  // Real-time subscription to events
  useEffect(() => {
    const unsubscribe = AnalyticsService.subscribeToEvents((data) => {
      setNow(Date.now());
      setEvents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filter events based on selected time range
  const filteredEvents = useMemo(() => {
    if (now === 0) return events;
    return events.filter((event) => {
      const time = getEventTime(event, now);
      if (timeRange === "24h") {
        return now - time <= 24 * 60 * 60 * 1000;
      } else if (timeRange === "7d") {
        return now - time <= 7 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
  }, [events, timeRange, now]);

  // Calculations Engine
  const stats = useMemo(() => {
    const defaultTime = now;
    if (filteredEvents.length === 0) {
      return {
        totalViews: 0,
        visitors: 0,
        uniqueVisitors: 0,
        avgSession: "0s",
        bounceRate: "0%",
        resumeDownloads: 0,
        githubClicks: 0,
        linkedinClicks: 0,
        contactOpens: 0,
        projectPerformance: [] as { name: string; count: number }[],
        experiencePerformance: [] as { name: string; count: number }[],
        sectionDwell: [] as { section: string; score: number }[],
        funnel: [] as { name: string; count: number; percentage: number }[],
        trendData: [] as { label: string; count: number }[]
      };
    }

    const totalViews = filteredEvents.length;

    // Group by Session ID
    const sessionsMap = new Map<string, AnalyticsEvent[]>();
    filteredEvents.forEach((event) => {
      if (event.sessionId) {
        const list = sessionsMap.get(event.sessionId) || [];
        list.push(event);
        sessionsMap.set(event.sessionId, list);
      }
    });

    const totalSessions = sessionsMap.size;
    const visitors = totalSessions;
    
    // Calculate unique visitors (e.g. by unique deviceType + referrer + sessionId combination to represent distinct devices)
    const uniqueFingerprints = new Set<string>();
    filteredEvents.forEach((e, index) => {
      const fp = `${e.deviceType || "unknown"}-${e.referrer || "direct"}-${e.sessionId ? e.sessionId.substring(0, 15) : `anon-${index}`}`;
      uniqueFingerprints.add(fp);
    });
    // Ensure unique visitors does not exceed total visitors
    const uniqueVisitors = Math.min(uniqueFingerprints.size, visitors || 1);

    // Goal counters
    let resumeDownloads = 0;
    let githubClicks = 0;
    let linkedinClicks = 0;
    let contactOpens = 0;

    filteredEvents.forEach((e) => {
      if (e.eventType === "resume_download") resumeDownloads++;
      if (e.eventType === "github_click") githubClicks++;
      if (e.eventType === "linkedin_click") linkedinClicks++;
      if (e.eventType === "contact_open") contactOpens++;
    });

    // Bounce Rate: sessions with only 1 event or spanning less than 5 seconds
    let bounces = 0;
    let totalSessionTimeMs = 0;
    let sessionsWithDuration = 0;

    sessionsMap.forEach((sessionEvents) => {
      if (sessionEvents.length <= 1) {
        bounces++;
      } else {
        const times = sessionEvents.map((evt) => getEventTime(evt, defaultTime));
        const duration = Math.abs(Math.max(...times) - Math.min(...times));
        if (duration < 5000) {
          bounces++;
        } else {
          totalSessionTimeMs += duration;
          sessionsWithDuration++;
        }
      }
    });

    const bounceRateVal = totalSessions > 0 ? (bounces / totalSessions) * 100 : 0;
    const bounceRate = `${Math.round(bounceRateVal)}%`;

    const avgSessionMs = sessionsWithDuration > 0 ? totalSessionTimeMs / sessionsWithDuration : 0;
    const avgSessionSec = Math.round(avgSessionMs / 1000);
    const avgSession = avgSessionSec > 60 
      ? `${Math.floor(avgSessionSec / 60)}m ${avgSessionSec % 60}s` 
      : `${avgSessionSec}s`;

    // Funnel Steps: Visit -> Projects -> Experience -> Skills -> Resume -> GitHub -> LinkedIn -> Contact
    const funnelSteps = [
      { name: "Portfolio Visit", check: () => true },
      { name: "Projects Viewed", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "project_view" || e.eventType === "project_world_enter") },
      { name: "Experience Viewed", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "experience_view" || e.eventType === "experience_world_enter") },
      { name: "Skills Galaxy", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "skill_open") },
      { name: "Resume Opened", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "resume_download") },
      { name: "GitHub Clicked", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "github_click") },
      { name: "LinkedIn Clicked", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "linkedin_click") },
      { name: "Contact Opened", check: (evts: AnalyticsEvent[]) => evts.some(e => e.eventType === "contact_open" || e.eventType === "email_click") },
    ];

    const funnel = funnelSteps.map(step => {
      let count = 0;
      sessionsMap.forEach(sessionEvents => {
        if (step.check(sessionEvents)) {
          count++;
        }
      });
      const percentage = totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0;
      return { name: step.name, count, percentage };
    });

    // Project Performance: View counts
    const projectViews: Record<string, number> = {};
    filteredEvents.forEach(e => {
      if ((e.eventType === "project_view" || e.eventType === "project_world_enter") && e.entityId) {
        projectViews[e.entityId] = (projectViews[e.entityId] || 0) + 1;
      }
    });
    const projectPerformance = Object.entries(projectViews)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Experience Performance
    const expViews: Record<string, number> = {};
    filteredEvents.forEach(e => {
      if ((e.eventType === "experience_view" || e.eventType === "experience_world_enter") && e.entityId) {
        expViews[e.entityId] = (expViews[e.entityId] || 0) + 1;
      }
    });
    const experiencePerformance = Object.entries(expViews)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Section Dwell Scores (calculated based on event interactions)
    const sectionCounts: Record<string, number> = {
      About: 0,
      Projects: 0,
      Experience: 0,
      Skills: 0,
      Certifications: 0,
      Contact: 0
    };
    filteredEvents.forEach(e => {
      if (e.eventType === "skill_open") sectionCounts["Skills"] += 2;
      if (e.eventType === "project_view" || e.eventType === "project_world_enter") sectionCounts["Projects"] += 3;
      if (e.eventType === "experience_view" || e.eventType === "experience_world_enter") sectionCounts["Experience"] += 3;
      if (e.eventType === "certificate_open") sectionCounts["Certifications"] += 2;
      if (e.eventType === "contact_open" || e.eventType === "email_click") sectionCounts["Contact"] += 4;
      // Baseline view weight for About/Cinematic
      if (e.eventType === "project_world_exit") sectionCounts["About"] += 1;
    });
    // Add default baseline weight of 1 per visitor session for About
    sectionCounts["About"] += totalSessions;

    const maxScore = Math.max(...Object.values(sectionCounts), 1);
    const sectionDwell = Object.entries(sectionCounts).map(([section, score]) => ({
      section,
      score: Math.round((score / maxScore) * 100)
    })).sort((a, b) => b.score - a.score);

    // Trend lines: Group events by day/hour based on selected range
    const trendMap: Record<string, number> = {};
    const daysToShow = timeRange === "24h" ? 24 : 7;

    if (timeRange === "24h") {
      // Hours
      for (let i = 23; i >= 0; i--) {
        const d = new Date(defaultTime - i * 60 * 60 * 1000);
        const key = `${d.getHours()}:00`;
        trendMap[key] = 0;
      }
      filteredEvents.forEach(e => {
        const time = getEventTime(e, defaultTime);
        const hrsAgo = Math.floor((defaultTime - time) / (60 * 60 * 1000));
        if (hrsAgo >= 0 && hrsAgo < 24) {
          const d = new Date(time);
          const key = `${d.getHours()}:00`;
          trendMap[key] = (trendMap[key] || 0) + 1;
        }
      });
    } else {
      // Days
      for (let i = daysToShow - 1; i >= 0; i--) {
        const d = new Date(defaultTime - i * 24 * 60 * 60 * 1000);
        const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        trendMap[key] = 0;
      }
      filteredEvents.forEach(e => {
        const time = getEventTime(e, defaultTime);
        const daysAgo = Math.floor((defaultTime - time) / (24 * 60 * 60 * 1000));
        if (daysAgo >= 0 && daysAgo < daysToShow) {
          const d = new Date(time);
          const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          trendMap[key] = (trendMap[key] || 0) + 1;
        }
      });
    }

    const trendData = Object.entries(trendMap).map(([label, count]) => ({ label, count }));

    return {
      totalViews,
      visitors,
      uniqueVisitors,
      avgSession,
      bounceRate,
      resumeDownloads,
      githubClicks,
      linkedinClicks,
      contactOpens,
      projectPerformance,
      experiencePerformance,
      sectionDwell,
      funnel,
      trendData
    };
  }, [filteredEvents, timeRange, now]);

  // SVG Line Chart properties
  const svgLinePoints = useMemo(() => {
    if (stats.trendData.length === 0) return [];
    const width = 600;
    const height = 150;
    const maxVal = Math.max(...stats.trendData.map(d => d.count), 5);
    const xStep = width / (stats.trendData.length - 1 || 1);

    return stats.trendData.map((d, index) => {
      const x = index * xStep;
      const y = height - (d.count / maxVal) * (height - 20) - 10;
      return { x, y, label: d.label, count: d.count };
    });
  }, [stats.trendData]);

  return (
    <div className="flex flex-col gap-8 text-zinc-300">
      {/* Header section with Filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Recruiter Insights
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide mt-1">
            Telemetry Analytics
          </h1>
        </div>
        <div className="flex bg-[#0c0c0d] border border-zinc-800 rounded p-1 self-start font-mono text-[10px]">
          <button
            onClick={() => setTimeRange("24h")}
            className={`px-3 py-1.5 rounded transition-all ${
              timeRange === "24h"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            24 HOURS
          </button>
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-3 py-1.5 rounded transition-all ${
              timeRange === "7d"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            7 DAYS
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={`px-3 py-1.5 rounded transition-all ${
              timeRange === "all"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            ALL TIME
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center min-h-[400px] items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 border border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
            <span>Resolving analytics dataset...</span>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Overview KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Visitors", value: stats.visitors, desc: "Total recruiter sessions" },
              { label: "Unique Visitors", value: stats.uniqueVisitors, desc: "Estimated unique devices" },
              { label: "Avg Session", value: stats.avgSession, desc: "Time active in 3D worlds" },
              { label: "Bounce Rate", value: stats.bounceRate, desc: "Single interaction exit rate" }
            ].map((card) => (
              <div key={card.label} className="border border-zinc-800 bg-[#0c0c0d] p-5 rounded flex flex-col justify-between h-28 hover:border-zinc-700 transition-all">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                    {card.label}
                  </span>
                  <p className="text-[9px] text-zinc-600 font-mono mt-0.5">{card.desc}</p>
                </div>
                <span className="text-3xl font-light tracking-wide text-zinc-100">
                  {card.value}
                </span>
              </div>
            ))}
          </div>

          {/* Social / Goal Counts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Resume Downloads", value: stats.resumeDownloads, color: "text-emerald-400" },
              { label: "GitHub Clicks", value: stats.githubClicks, color: "text-blue-400" },
              { label: "LinkedIn Clicks", value: stats.linkedinClicks, color: "text-indigo-400" },
              { label: "Contact Form Opens", value: stats.contactOpens, color: "text-amber-400" }
            ].map((goal) => (
              <div key={goal.label} className="border border-zinc-900 bg-[#080809] p-4 rounded flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {goal.label}
                </span>
                <span className={`text-xl font-mono ${goal.color}`}>
                  {goal.value}
                </span>
              </div>
            ))}
          </div>

          {/* Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* View Trends Line Chart */}
            <div className="lg:col-span-2 border border-zinc-800 bg-[#0c0c0d] p-6 rounded flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase">
                  Engagement Trends
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Activity frequency across time increments
                </p>
              </div>

              <div className="relative w-full h-[180px] mt-2">
                {stats.trendData.length > 0 ? (
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150" preserveAspectRatio="none">
                    {/* SVG Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <line
                        key={idx}
                        x1="0"
                        y1={10 + ratio * 130}
                        x2="600"
                        y2={10 + ratio * 130}
                        stroke="#1f1f23"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Gradient Fill under Path */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area */}
                    {svgLinePoints.length > 0 && (
                      <path
                        d={`M 0 150 
                            ${svgLinePoints.map(p => `L ${p.x} ${p.y}`).join(" ")} 
                            L 600 150 Z`}
                        fill="url(#chartGradient)"
                      />
                    )}

                    {/* Smooth Line Path */}
                    {svgLinePoints.length > 0 && (
                      <path
                        d={svgLinePoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Interactive dots */}
                    {svgLinePoints.map((p, idx) => (
                      <g key={idx} className="cursor-pointer group">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="3"
                          fill="#c084fc"
                          className="transition-all duration-200 group-hover:r-5"
                          onMouseEnter={() => setHoveredData({ label: p.label, value: `${p.count} Views` })}
                          onMouseLeave={() => setHoveredData(null)}
                        />
                      </g>
                    ))}
                  </svg>
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-600 font-mono text-[10px]">
                    No trend metrics recorded
                  </div>
                )}

                {/* Tooltip Overlay */}
                {hoveredData && (
                  <div className="absolute top-2 right-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-[10px] font-mono shadow-xl z-10">
                    <span className="text-zinc-400">{hoveredData.label}: </span>
                    <span className="text-zinc-100 font-bold">{hoveredData.value}</span>
                  </div>
                )}
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between border-t border-zinc-900 pt-3 text-[8px] text-zinc-500 font-mono">
                {stats.trendData.map((d, idx) => {
                  // Show subset of labels if too dense
                  if (stats.trendData.length > 10 && idx % Math.round(stats.trendData.length / 5) !== 0 && idx !== stats.trendData.length - 1) {
                    return null;
                  }
                  return <span key={idx}>{d.label}</span>;
                })}
              </div>
            </div>

            {/* Recruiter Conversion Funnel */}
            <div className="border border-zinc-800 bg-[#0c0c0d] p-6 rounded flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase mb-1">
                  Portfolio Funnel
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono mb-4">
                  Recruiter conversion progress
                </p>
              </div>

              <div className="space-y-2.5">
                {stats.funnel.map((step, idx) => {
                  // Nice sequential colors
                  const hue = 260 - idx * 10;
                  return (
                    <div key={step.name} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-zinc-400">{step.name}</span>
                        <div className="flex gap-2">
                          <span className="text-zinc-500">{step.count} sessions</span>
                          <span className="text-zinc-200 font-semibold">{step.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden">
                        <div
                          className="h-full rounded transition-all duration-500"
                          style={{
                            width: `${step.percentage}%`,
                            backgroundColor: `hsl(${hue}, 75%, 60%)`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Section Dwell and Project Performance row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Project Performance Bar Chart */}
            <div className="md:col-span-2 border border-zinc-800 bg-[#0c0c0d] p-6 rounded flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase mb-1">
                  Project Performance
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono mb-4">
                  Engagement frequency logged per project
                </p>
              </div>

              {stats.projectPerformance.length > 0 ? (
                <div className="space-y-3">
                  {stats.projectPerformance.slice(0, 4).map((project) => {
                    const maxCount = stats.projectPerformance[0]?.count || 1;
                    const percent = Math.round((project.count / maxCount) * 100);
                    return (
                      <div key={project.name} className="flex items-center gap-3">
                        <span className="w-24 text-[10px] font-mono text-zinc-400 truncate text-left">
                          {project.name}
                        </span>
                        <div className="flex-1 bg-zinc-900 h-6 rounded flex items-center px-2 relative overflow-hidden group">
                          <div
                            className="absolute left-0 top-0 h-full bg-linear-to-r from-violet-600/40 to-indigo-600/40 group-hover:from-violet-500/50 group-hover:to-indigo-500/50 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                          <span className="text-[9px] font-mono text-zinc-300 z-10">
                            {project.count} views
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center text-zinc-600 font-mono text-[10px]">
                  No project telemetry events logged
                </div>
              )}
            </div>

            {/* Heatmap/Section Dwell */}
            <div className="border border-zinc-800 bg-[#0c0c0d] p-6 rounded flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase mb-1">
                  Heatmap Index
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono mb-4">
                  Dwell score of active sections
                </p>
              </div>

              <div className="space-y-3">
                {stats.sectionDwell.map((item) => (
                  <div key={item.section} className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-400">{item.section}</span>
                    <div className="flex items-center gap-3 w-36">
                      <div className="flex-1 bg-zinc-900 h-3 rounded overflow-hidden relative">
                        <div
                          className="h-full rounded bg-linear-to-r from-amber-600 to-amber-400"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-zinc-200 w-8 text-right font-semibold">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Experience analytics log */}
          <div className="border border-zinc-800 bg-[#0c0c0d] p-6 rounded">
            <h3 className="text-xs font-semibold tracking-widest text-zinc-100 uppercase mb-1">
              Experience Vault analytics
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono mb-4">
              Telemetry frequency logged per experience record
            </p>

            {stats.experiencePerformance.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                {stats.experiencePerformance.map((exp, idx) => (
                  <div key={exp.name} className="border border-zinc-900 bg-[#080809] p-4 rounded flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-zinc-400 text-[10px] uppercase font-bold">{exp.name}</span>
                      <span className="text-[9px] text-zinc-600 mt-0.5">
                        {idx === 0 ? "★ Highly engagement capsule" : "Active capsule"}
                      </span>
                    </div>
                    <span className="text-zinc-200 text-sm font-semibold">{exp.count} views</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-mono">
                No experience log interactions recorded.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsManager;
