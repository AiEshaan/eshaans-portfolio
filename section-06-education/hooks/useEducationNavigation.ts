"use client";

import { useState } from "react";

export function useEducationNavigation() {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);

  const selectEducation = (institution: string | null) => {
    setSelectedEducation(institution);
  };

  return {
    selectedEducation,
    selectEducation
  };
}

export default useEducationNavigation;
