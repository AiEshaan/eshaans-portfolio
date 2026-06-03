"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introContent } from "../data/intro-content";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollControllerProps {
  onScrollProgress: (progress: number) => void;
}

export function ScrollController({ onScrollProgress }: ScrollControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Track scroll progress and notify parent component
    const handleScroll = () => {
      const scrollProgress = lenis.progress;
      onScrollProgress(scrollProgress);
    };
    lenis.on("scroll", handleScroll);

    // 3. GSAP ScrollTrigger animation for text overlays
    const ctx = gsap.context(() => {
      // Intro Text Animations
      gsap.fromTo(
        ".intro-header",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: ".intro-trigger-1",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Documentary Line Fades
      gsap.utils.toArray<HTMLElement>(".doc-line").forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: `.intro-trigger-${index + 2}`,
              start: "top 80%",
              end: "center 50%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, [onScrollProgress]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none w-full">
      {/* Scroll Triggers (Invisible divs to capture page scroll depth) */}
      <div className="intro-trigger-1 h-screen w-full" />
      <div className="intro-trigger-2 h-screen w-full" />
      <div className="intro-trigger-3 h-screen w-full" />
      <div className="h-96 w-full" /> {/* Bottom buffer */}

      {/* HTML Overlays (Content fixed in front) */}
      <div className="fixed inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none select-none">
        
        {/* Top Header */}
        <div className="intro-header flex justify-between items-start w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-light tracking-widest text-zinc-100 uppercase">
              {introContent.title}
            </h1>
            <p className="text-xs md:text-sm font-light text-zinc-400 tracking-wider mt-1">
              {introContent.subtitle}
            </p>
          </div>
          <div className="text-right text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Chapter 01 // Introduction
          </div>
        </div>

        {/* Center / Lower Documentary Text Logs */}
        <div className="flex flex-col gap-8 max-w-xl self-start mt-auto mb-16">
          {introContent.documentaryLogs.map((log, index) => (
            <div key={log.id} className="doc-line opacity-0">
              <p className="text-base md:text-lg font-light text-zinc-300 leading-relaxed">
                {log.line1}
              </p>
              <p className="text-sm font-light text-zinc-500 leading-relaxed mt-1">
                {log.line2}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest animate-pulse">
            Scroll to explore
          </span>
          <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
