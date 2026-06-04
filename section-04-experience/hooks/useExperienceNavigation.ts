import { useState } from "react";

export function useExperienceNavigation() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const selectExperience = (company: string | null) => {
    setSelectedExperience(company);
  };

  return {
    selectedExperience,
    selectExperience,
    isWorldActive: selectedExperience !== null
  };
}
