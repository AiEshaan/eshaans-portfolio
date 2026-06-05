"use client";

import { useState } from "react";

export function useCertificationNavigation() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const selectCert = (title: string | null) => {
    setSelectedCert(title);
  };

  return {
    selectedCert,
    selectCert
  };
}

export default useCertificationNavigation;
