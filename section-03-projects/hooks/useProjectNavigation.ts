import { useState } from "react";

export function useProjectNavigation() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const selectProject = (title: string | null) => {
    setSelectedProject(title);
  };

  return {
    selectedProject,
    selectProject,
    isWorldActive: selectedProject !== null
  };
}
