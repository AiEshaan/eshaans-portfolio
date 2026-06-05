"use client";

import { useState } from "react";

export type ContactTab = "Home" | "Email" | "GitHub" | "LinkedIn" | "Resume";

export function useContactNavigation() {
  const [activeTab, setActiveTab] = useState<ContactTab>("Home");

  const selectTab = (tab: ContactTab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    selectTab
  };
}

export default useContactNavigation;
