"use client";

import React from "react";
import { BaseProjectWorld } from "../../components/BaseProjectWorld";
import { TrainingArena } from "./TrainingArena";
import { RacketModel } from "./RacketModel";
import { SensorTrails } from "./SensorTrails";
import { AnalyticsDisplay } from "./AnalyticsDisplay";

interface NeuraSentinelWorldProps {
  isActive: boolean;
  onClose: () => void;
}

export function NeuraSentinelWorld({ isActive, onClose }: NeuraSentinelWorldProps) {
  const narrativeSlides = [
    {
      title: "Problem",
      text: "Athletes lack affordable real-time coaching and performance feedback during training."
    },
    {
      title: "Solution",
      text: "An AI-powered coaching system that uses edge sensor telemetry to classify strokes."
    },
    {
      title: "Technology",
      text: "Arduino Nano 33 BLE Sense, TinyML (TensorFlow Lite Micro), React & TypeScript Dashboard."
    },
    {
      title: "Impact",
      text: "Democratizes access to high-fidelity motion coaching insights on the court."
    }
  ];

  return (
    <BaseProjectWorld
      isActive={isActive}
      onClose={onClose}
      title="Neura Sentinel"
      narrativeSlides={narrativeSlides}
      rightPanelContent={<AnalyticsDisplay />}
    >
      {/* Grid Arena Platform */}
      <TrainingArena />

      {/* Racket Mesh */}
      <RacketModel />

      {/* IMU Sensor Tracking Particles */}
      <SensorTrails />
    </BaseProjectWorld>
  );
}

export default NeuraSentinelWorld;
