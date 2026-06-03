"use client";

import React from "react";
import { BaseProjectWorld } from "../../components/BaseProjectWorld";
import { KarnatakaMap } from "./KarnatakaMap";
import { EventNodes } from "./EventNodes";
import { CultureRoutes } from "./CultureRoutes";
import { GeminiRecommendations } from "./GeminiRecommendations";

interface KarunadaKalaWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function KarunadaKalaWorld({ isActive, onClose }: KarunadaKalaWorldProps) {
  const narrativeSlides = [
    {
      title: "Problem",
      text: "Karnataka's cultural events, heritage sites, and artisan spotlights are fragmented."
    },
    {
      title: "Solution",
      text: "A unified digital discovery platform that centralizes events and coordinates maps."
    },
    {
      title: "Mapping",
      text: "Interactive geolocation maps rendering heritage networks and local artisan spots."
    },
    {
      title: "AI Layer",
      text: "Integration with Gemini AI to stream personalized travel/cultural recommendations."
    },
    {
      title: "Impact",
      text: "Bridges modern explorers with local artisans and native heritage preservation."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Karunada Kala"
      narrativeSlides={narrativeSlides}
      rightPanelContent={<GeminiRecommendations />}
    >
      {/* Dynamic 3D platform map */}
      <KarnatakaMap />

      {/* Pulsing light markers */}
      <EventNodes />

      {/* Connection curves */}
      <CultureRoutes />
    </BaseProjectWorld>
  );
}

export default KarunadaKalaWorld;
