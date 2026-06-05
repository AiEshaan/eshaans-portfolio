"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "./Environment";
import { Character } from "./Character";
import { CameraRig } from "./CameraRig";
import { ScrollController } from "./ScrollController";
import { AboutScene } from "../../section-02-about/components/AboutScene";
import { PocketScene } from "../../section-03-projects/components/PocketScene";
import { ProjectLoader } from "../../section-03-projects/components/ProjectLoader";
import { useProjectNavigation } from "../../section-03-projects/hooks/useProjectNavigation";
import { projectWorlds } from "../../section-03-projects/data/world-registry";
import { experienceWorlds } from "../../section-04-experience/data/experience-registry";
import { ExperienceScene } from "../../section-04-experience/components/ExperienceScene";
import { ExperienceLoader } from "../../section-04-experience/components/ExperienceLoader";
import { useExperienceNavigation } from "../../section-04-experience/hooks/useExperienceNavigation";
import { GalaxyScene } from "../../section-05-skills-galaxy/components/GalaxyScene";
import { SkillDetailsPanel } from "../../section-05-skills-galaxy/components/SkillDetailsPanel";
import { EducationScene } from "../../section-06-education/components/EducationScene";
import { EducationPortal } from "../../section-06-education/components/EducationPortal";
import { useEducationNavigation } from "../../section-06-education/hooks/useEducationNavigation";
import { CertificationScene } from "../../section-07-certifications/components/CertificationScene";
import { CertificationDetails } from "../../section-07-certifications/components/CertificationDetails";
import { useCertificationNavigation } from "../../section-07-certifications/hooks/useCertificationNavigation";
import { ContactScene } from "../../section-08-contact/components/ContactScene";
import { ContactPortal } from "../../section-08-contact/components/ContactPortal";
import { useContactNavigation } from "../../section-08-contact/hooks/useContactNavigation";
import { EndingScene } from "../../section-09-ending/components/EndingScene";
import { SkillsService, ExperienceService, EducationService, CertificationsService, ContactService } from "../../firebase/firestore";
import { AnalyticsTracker } from "../../firebase/analytics";
import { Skill } from "../../types/Skill";
import { Experience } from "../../types/Experience";
import { Education } from "../../types/Education";
import { Certification } from "../../types/Certification";
import { ContactChannel } from "../../types/Contact";
import skillsFallback from "../../public/assets/skills/skills.json";
import { experienceManifest } from "../../section-04-experience/data/experience-manifest";
import { educationManifest } from "../../section-06-education/data/education-manifest";
import { certificationsManifest } from "../../section-07-certifications/data/certifications-manifest";

export function IntroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { selectedProject, selectProject } = useProjectNavigation();
  const { selectedExperience, selectExperience } = useExperienceNavigation();

  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const { selectedEducation, selectEducation } = useEducationNavigation();
  const { selectedCert, selectCert } = useCertificationNavigation();
  const { activeTab, selectTab } = useContactNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Firestore-driven skills list with offline failover
  const [skills, setSkills] = useState<Skill[]>(skillsFallback as Skill[]);

  // Smooth scroll handler to jump straight to a section
  const scrollToSection = (className: string) => {
    setMenuOpen(false);
    const element = document.querySelector(className);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Resolve current section based on scroll progress
  const activeSec = useMemo(() => {
    if (scrollProgress >= 0.84) return "contact";
    if (scrollProgress >= 0.74) return "certifications";
    if (scrollProgress >= 0.64) return "education";
    if (scrollProgress >= 0.54) return "skills";
    if (scrollProgress >= 0.44) return "experience";
    if (scrollProgress >= 0.38) return "projects";
    if (scrollProgress >= 0.15) return "about";
    return "intro";
  }, [scrollProgress]);

  useEffect(() => {
    let active = true;
    async function loadSkills() {
      try {
        const data = await SkillsService.getAll();
        if (active) {
          setSkills(data);
        }
      } catch (e) {
        console.warn("Failed to load skills from Firestore, using local fallback:", e);
      }
    }
    loadSkills();
    return () => {
      active = false;
    };
  }, []);

  // Firestore-driven experiences list with offline failover
  const [experiences, setExperiences] = useState<Experience[]>(experienceManifest as Experience[]);

  useEffect(() => {
    let active = true;
    async function loadExperiences() {
      try {
        const data = await ExperienceService.getAll();
        if (active) {
          setExperiences(data as Experience[]);
        }
      } catch (e) {
        console.warn("Failed to load experiences from Firestore, using local fallback:", e);
      }
    }
    loadExperiences();
    return () => {
      active = false;
    };
  }, []);

  // Firestore-driven education list with offline failover
  const [education, setEducation] = useState<Education[]>(educationManifest as Education[]);

  useEffect(() => {
    let active = true;
    async function loadEducation() {
      try {
        const data = await EducationService.getAll();
        if (active) {
          const sorted = data.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
          setEducation(sorted);
        }
      } catch (e) {
        console.warn("Failed to load education from Firestore, using local fallback:", e);
      }
    }
    loadEducation();
    return () => {
      active = false;
    };
  }, []);

  // Firestore-driven certifications list with offline failover
  const [certifications, setCertifications] = useState<Certification[]>(certificationsManifest as Certification[]);

  useEffect(() => {
    let active = true;
    async function loadCertifications() {
      try {
        const data = await CertificationsService.getAll();
        if (active) {
          const sorted = data.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
          setCertifications(sorted);
        }
      } catch (e) {
        console.warn("Failed to load certifications from Firestore, using local fallback:", e);
      }
    }
    loadCertifications();
    return () => {
      active = false;
    };
  }, []);

  // Firestore-driven contact channels list with offline failover
  const [contactChannels, setContactChannels] = useState<ContactChannel[]>(() => {
    return ContactService.getChannelsFallback();
  });

  useEffect(() => {
    let active = true;
    async function loadContactChannels() {
      try {
        const data = await ContactService.getAllChannels();
        if (active) {
          setContactChannels(data);
        }
      } catch (e) {
        console.warn("Failed to load contact channels from Firestore, using local fallback:", e);
      }
    }
    loadContactChannels();
    return () => {
      active = false;
    };
  }, []);

  // Analytics event instrumentation hooks
  const prevProjectRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedProject) {
      AnalyticsTracker.logPortfolioEvent("project_view", selectedProject);
      if (projectWorlds[selectedProject]) {
        AnalyticsTracker.logPortfolioEvent("project_world_enter", selectedProject);
      }
    } else if (prevProjectRef.current) {
      AnalyticsTracker.logPortfolioEvent("project_world_exit", prevProjectRef.current);
    }
    prevProjectRef.current = selectedProject;
  }, [selectedProject]);

  useEffect(() => {
    if (selectedExperience) {
      AnalyticsTracker.logPortfolioEvent("experience_view", selectedExperience);
      if (experienceWorlds[selectedExperience]) {
        AnalyticsTracker.logPortfolioEvent("experience_world_enter", selectedExperience);
      }
    }
  }, [selectedExperience]);

  useEffect(() => {
    if (selectedPlanet) {
      AnalyticsTracker.logPortfolioEvent("skill_open", selectedPlanet);
    }
  }, [selectedPlanet]);

  useEffect(() => {
    if (selectedCert) {
      AnalyticsTracker.logPortfolioEvent("certificate_open", selectedCert);
    }
  }, [selectedCert]);

  useEffect(() => {
    if (activeTab && activeTab !== "Home") {
      AnalyticsTracker.logPortfolioEvent("contact_open", activeTab);
    }
  }, [activeTab]);

  // Character body opacity fades out during face reveal, then fades back in
  // for the pocket, vault, skills galaxy, education card, cert archive, and contact tablet.
  let bodyOpacity = 1.0;
  if (scrollProgress >= 0.20 && scrollProgress < 0.30) {
    bodyOpacity = Math.max(0, 1.0 - (scrollProgress - 0.20) / 0.10);
  } else if (scrollProgress >= 0.30 && scrollProgress < 0.38) {
    bodyOpacity = Math.min(1.0, (scrollProgress - 0.30) / 0.08);
  } else if (scrollProgress >= 0.97) {
    bodyOpacity = Math.max(0, 1.0 - (scrollProgress - 0.97) / 0.03);
  }

  return (
    <div className="relative w-full min-h-screen bg-[#080808] overflow-x-hidden text-zinc-100 font-sans">
      
      {/* 3D R3F Viewport Canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#080808"]} />
          <fog attach="fog" args={["#080808", 4, 10]} />
          
          <Environment />
          
          {/* Main 3D character bust visible in Phase 2 */}
          {bodyOpacity > 0 && (
            <group>
              <Character scrollProgress={scrollProgress} opacity={bodyOpacity} />
            </group>
          )}

          {/* About Section Scene (Face Reveal, Mindset Flow, and Story Transition) */}
          <AboutScene scrollProgress={scrollProgress} />

          {/* Projects Pocket Scene (Pocket Door, Floating Capsules) */}
          <PocketScene
            scrollProgress={scrollProgress}
            onSelectProject={selectProject}
            selectedProject={selectedProject}
          />

          {/* Dynamic 3D Project World Exhibition from Registry */}
          {selectedProject && projectWorlds[selectedProject] && React.createElement(projectWorlds[selectedProject], {
            isActive: true,
            onClose: () => selectProject(null)
          })}

          {/* Experience Vault Scene (Zipper opening, Floating Capsules) */}
          <ExperienceScene
            scrollProgress={scrollProgress}
            onSelectExperience={selectExperience}
            selectedExperience={selectedExperience}
            experiences={experiences}
          />

          {/* Dynamic 3D Experience World from Registry */}
          {selectedExperience && experienceWorlds[selectedExperience] && React.createElement(experienceWorlds[selectedExperience], {
            isActive: true,
            onClose: () => selectExperience(null)
          })}

          {/* Skills Galaxy Scene (Emerging from character left open palm hotspot) */}
          <GalaxyScene
            scrollProgress={scrollProgress}
            onSelectPlanet={setSelectedPlanet}
            selectedPlanet={selectedPlanet}
            skills={skills}
          />

          {/* Education Portal Scene (Neck ID card sways and zooms into sketchbook journal) */}
          <EducationScene
            scrollProgress={scrollProgress}
            onSelectChapter={selectEducation}
            selectedEducation={selectedEducation}
          />

          {/* Certification Archive Scene (Right hand folder opens revealing drawers/badges) */}
          <CertificationScene
            scrollProgress={scrollProgress}
            onSelectCert={selectCert}
            selectedCert={selectedCert}
            certifications={certifications}
          />

          {/* Contact Portal Scene (Handheld tablet device pops up showing applications) */}
          <ContactScene
            scrollProgress={scrollProgress}
            onSelectApp={selectTab}
            activeTab={activeTab}
            contactChannels={contactChannels}
          />

          {/* Ending Sequence Scene (Pulls back, reveals full character bust, slides summary items) */}
          <EndingScene scrollProgress={scrollProgress} />
          
          {/* Handles smooth camera updates */}
          <CameraRig scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* HTML Content Overlay & Smooth Scroll Engine */}
      <ScrollController onScrollProgress={setScrollProgress} />

      {/* Fullscreen Overlay when a project is selected */}
      <ProjectLoader
        selectedProject={selectedProject}
        onClose={() => selectProject(null)}
      />

      {/* Fullscreen Overlay when an experience is selected */}
      <ExperienceLoader
        selectedExperience={selectedExperience}
        onClose={() => selectExperience(null)}
        experiences={experiences}
      />

      {/* Fullscreen Overlay when a skill planet is selected */}
      <SkillDetailsPanel
        selectedPlanet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
        skills={skills}
      />

      {/* Fullscreen Overlay when an academic chapter is selected */}
      <EducationPortal
        selectedEducation={selectedEducation}
        onClose={() => selectEducation(null)}
        education={education}
      />

      {/* Fullscreen Overlay when a certification is selected */}
      <CertificationDetails
        selectedCert={selectedCert}
        onClose={() => selectCert(null)}
        certifications={certifications}
      />

      {/* Fullscreen Overlay when a tablet app is selected */}
      <ContactPortal
        activeTab={activeTab}
        onCloseApp={() => selectTab("Home")}
        scrollProgress={scrollProgress}
        contactChannels={contactChannels}
      />

      {/* Floating Recruiter Navigation and Cinematic Skip Panel */}
      <div className="fixed top-6 right-6 z-50 pointer-events-auto flex flex-col items-end gap-2 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          {/* Skip Intro Button - only visible during introduction phases */}
          {scrollProgress < 0.25 && (
            <button
              onClick={() => scrollToSection(".trigger-projects-pocket")}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-full border border-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <span>▶ Skip Cinematic</span>
            </button>
          )}

          {/* Quick Nav Dropdown Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 uppercase tracking-widest shadow-lg ${
              menuOpen
                ? "bg-zinc-100 border-zinc-100 text-zinc-950 font-bold"
                : "bg-zinc-900/80 backdrop-blur-md border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700"
            }`}
          >
            <span>☰ {menuOpen ? "Close Menu" : "Recruiter Mode"}</span>
          </button>
        </div>

        {/* Dropdown Menu Items */}
        {menuOpen && (
          <div className="bg-zinc-950/90 backdrop-blur-lg border border-zinc-800/80 rounded-lg p-2.5 w-44 flex flex-col gap-1 shadow-2xl animate-fade-in text-[9px] tracking-widest uppercase">
            {[
              { label: "Intro", target: ".trigger-intro", key: "intro" },
              { label: "About Me", target: ".trigger-about-reveal", key: "about" },
              { label: "Projects", target: ".trigger-projects-pocket", key: "projects" },
              { label: "Experience", target: ".trigger-experience-intro", key: "experience" },
              { label: "Skills Galaxy", target: ".trigger-skills-galaxy", key: "skills" },
              { label: "Education", target: ".trigger-education", key: "education" },
              { label: "Credentials", target: ".trigger-certifications", key: "certifications" },
              { label: "Get in Touch", target: ".trigger-contact", key: "contact" }
            ].map((item) => {
              const isActive = activeSec === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.target)}
                  className={`w-full text-left px-3 py-2 rounded transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-zinc-800 text-violet-400 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  {isActive ? `> ${item.label}` : `  ${item.label}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
