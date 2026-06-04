import React from "react";
import { MindMatrixWorld } from "../worlds/mindmatrix/MindMatrixWorld";
import { FreelanceWorld } from "../worlds/freelance/FreelanceWorld";

export const experienceWorlds: Record<string, React.ComponentType<{ isActive: boolean; onClose: () => void }>> = {
  "MindMatrix": MindMatrixWorld,
  "Freelance AI Automation": FreelanceWorld
};
