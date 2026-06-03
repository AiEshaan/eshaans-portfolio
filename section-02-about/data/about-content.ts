export interface ConceptWord {
  text: string;
  position: [number, number, number];
  description: string;
}

export const aboutContent = {
  philosophies: [
    { text: "Every product starts with a person.", duration: 1 },
    { text: "Every system starts with an idea.", duration: 1 }
  ],
  thinkSequence: [
    { text: "Problem", description: "Deconstructing complexity to find the core friction." },
    { text: "System", description: "Designing scalable, reliable structural architecture." },
    { text: "Prototype", description: "Iterating rapidly to manifest high-fidelity loops." },
    { text: "Product", description: "Refining details for premium human experience." },
    { text: "Impact", description: "Deploying value that transforms workflows." }
  ] as ConceptWord[],
  outro: {
    line1: "Every builder carries stories.",
    line2: "Here are mine."
  }
};
