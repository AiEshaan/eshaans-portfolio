"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introContent } from "../data/intro-content";
import { aboutContent } from "../../section-02-about/data/about-content";

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
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Track scroll progress
    const handleScroll = () => {
      onScrollProgress(lenis.progress);
    };
    lenis.on("scroll", handleScroll);

    // 3. GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Fade out Intro Header
      gsap.to(".intro-header", {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: ".trigger-intro",
          start: "bottom 80%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      // Philosophy 1 Fade In / Out
      gsap.fromTo(
        ".phil-1",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-phil-1",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".phil-1", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-phil-1",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Philosophy 2 Fade In / Out
      gsap.fromTo(
        ".phil-2",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-phil-2",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".phil-2", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-phil-2",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Outro Stories Fade In
      gsap.fromTo(
        ".outro-stories",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-outro",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".outro-stories", {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: ".trigger-outro",
          start: "bottom 90%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Experience Vault Intro Text Fade In / Out
      gsap.fromTo(
        ".exp-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-experience-intro",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".exp-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-experience-intro",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Skills Galaxy Text Fade In / Out
      gsap.fromTo(
        ".skills-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-skills-galaxy",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".skills-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-skills-galaxy",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Education Portal Text Fade In / Out
      gsap.fromTo(
        ".edu-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-education",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".edu-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-education",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Certifications Archive Text Fade In / Out
      gsap.fromTo(
        ".cert-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-certifications",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".cert-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-certifications",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Contact Portal Text Fade In / Out
      gsap.fromTo(
        ".contact-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-contact",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".contact-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-contact",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Ending Sequence Text Fade In / Out
      gsap.fromTo(
        ".ending-intro",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".trigger-ending",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
      gsap.to(".ending-intro", {
        opacity: 0,
        y: -40,
        scrollTrigger: {
          trigger: ".trigger-ending",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, [onScrollProgress]);

  return (
    <div ref={containerRef} className="relative z-10 pointer-events-none w-full">
      {/* Scroll triggers defining vertical height of the scroll sequence */}
      <div className="trigger-intro h-screen w-full" />
      <div className="trigger-phil-1 h-screen w-full" />
      <div className="trigger-phil-2 h-screen w-full" />
      <div className="trigger-about-reveal h-screen w-full" />
      <div className="trigger-think h-[150vh] w-full" />
      <div className="trigger-outro h-screen w-full" />
      <div className="trigger-projects-pocket h-screen w-full" />
      <div className="trigger-experience-intro h-screen w-full" />
      <div className="trigger-experience-open h-[150vh] w-full" />
      <div className="trigger-skills-galaxy h-[150vh] w-full" />
      <div className="trigger-education h-[150vh] w-full" />
      <div className="trigger-certifications h-[150vh] w-full" />
      <div className="trigger-contact h-[150vh] w-full" />
      <div className="trigger-ending h-[150vh] w-full" />
      <div className="h-screen w-full" /> {/* Buffer zone */}

      {/* HTML Overlays */}
      <div className="fixed inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none select-none">
        
        {/* Intro Header */}
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

        {/* Dynamic Philosophy Texts (Centered Screen Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="phil-1 opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              {aboutContent.philosophies[0].text}
            </p>
          </div>
          <div className="phil-2 opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              {aboutContent.philosophies[1].text}
            </p>
          </div>
        </div>

        {/* Stories/Outro overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="outro-stories opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              {aboutContent.outro.line1}
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              {aboutContent.outro.line2}
            </p>
          </div>
        </div>

        {/* Experience Vault Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="exp-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              Building products taught me skills.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Working with people taught me impact.
            </p>
          </div>
        </div>

        {/* Skills Galaxy Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="skills-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              The galaxy of systems and languages.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Powering AI solutions, full-stack architectures, and automations.
            </p>
          </div>
        </div>

        {/* Education Portal Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="edu-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              Every skill has a source.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Here is mine.
            </p>
          </div>
        </div>

        {/* Certifications Archive Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="cert-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              Validation of continuous growth.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Professional credentials in AI, Data, and DevOps.
            </p>
          </div>
        </div>

        {/* Contact Portal Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="contact-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              Let&apos;s build something meaningful.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Reach out via Email, LinkedIn, GitHub, or download my Resume.
            </p>
          </div>
        </div>

        {/* Ending Sequence Intro Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="ending-intro opacity-0 text-center max-w-xl">
            <p className="text-xl md:text-2xl font-light text-zinc-100 tracking-wide leading-relaxed">
              A cinematic journey complete.
            </p>
            <p className="text-base md:text-lg font-light text-zinc-400 mt-2">
              Building intelligent systems that solve real problems.
            </p>
          </div>
        </div>

        {/* Footer info & indicator */}
        <div className="flex justify-between items-end w-full mt-auto">
          <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Documentary Portfolio
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Scroll sequence
            </span>
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
}
