"use client";

import React from "react";
import { TabletDevice } from "./TabletDevice";
import { ContactApps } from "./ContactApps";
import { ContactTab } from "../hooks/useContactNavigation";
import { ContactChannel } from "../../types/Contact";

interface ContactSceneProps {
  scrollProgress: number;
  onSelectApp: (tab: ContactTab) => void;
  activeTab: ContactTab;
  contactChannels: ContactChannel[];
}

export function ContactScene({ scrollProgress, onSelectApp, activeTab, contactChannels }: ContactSceneProps) {
  // Show contact meshes in Phase 8: scrollProgress >= 0.88
  const isVisible = scrollProgress >= 0.88;
  if (!isVisible) return null;

  return (
    <group>
      {/* 3D tablet device container sways and tilts */}
      <TabletDevice scrollProgress={scrollProgress} />

      {/* Floating interactive app buttons mapped on screen face */}
      <ContactApps
        scrollProgress={scrollProgress}
        onSelectApp={onSelectApp}
        activeTab={activeTab}
        contactChannels={contactChannels}
      />
    </group>
  );
}

export default ContactScene;
