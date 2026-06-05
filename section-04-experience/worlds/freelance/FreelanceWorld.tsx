"use client";

import React from "react";
import { BaseProjectWorld } from "../../../section-03-projects/components/BaseProjectWorld";
import { FreelanceWorkshop } from "./FreelanceWorkshop";
import { FounderFinderZone } from "./FounderFinderZone";
import { AutomationPipelineZone } from "./AutomationPipelineZone";
import { ExperimentLab } from "./ExperimentLab";
import { WorkshopImpact } from "./WorkshopImpact";

interface FreelanceWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function FreelanceWorld({ isActive, onClose }: FreelanceWorldProps) {
  const narrativeSlides = [
    {
      title: "Freelance",
      text: "Deployed custom AI agents, lead scoring tools, and automated pipelines for clients."
    },
    {
      title: "Problem",
      text: "Manual prospecting and lead sorting required substantial operational hours for sales teams."
    },
    {
      title: "Solution",
      text: "Integrated n8n automations, custom scrapers, and AI classifiers to score and filter leads automatically."
    },
    {
      title: "Technology",
      text: "n8n workflow engine, Python scrapers, OpenAI API, and custom TypeScript lead pipelines."
    },
    {
      title: "Impact",
      text: "Decreased target client manual research overhead by 40% with high scoring confidence."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Freelance AI Automation"
      narrativeSlides={narrativeSlides}
      rightPanelContent={<WorkshopImpact />}
    >
      {/* Central workbench grid / table chassis */}
      <FreelanceWorkshop />

      {/* Zone 1: Founder Finder Scraper network graph */}
      <FounderFinderZone />

      {/* Zone 2: n8n Automation flow pipelines and moving packets */}
      <AutomationPipelineZone />

      {/* Zone 3: AI experiments, prompt testbeds, and orbit sensors */}
      <ExperimentLab />
    </BaseProjectWorld>
  );
}

export default FreelanceWorld;
