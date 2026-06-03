# Build Roadmap

This document outlines the step-by-step phased approach for building and assembling the cinematic portfolio. Each phase must be fully validated and locked before moving to the next.

---

## Phases Outline

### Phase 1 — Character Design

- Define avatar 3D modeling/import pipeline.
- Set up base geometry, hoodie, zipper, and pocket system.
- Map interaction regions (vault, galaxy, ID card, tablet).

### Phase 2 — Section 01: Intro

- Set up the main Three.js / React Three Fiber scene canvas.
- Implement the camera rig and the scroll engine (GSAP/ScrollTrigger).
- Set up soft environment lighting and intro reveal animation.

### Phase 3 — Section 02: About

- Transition camera focus to character face/expression.
- Implement text overlay and interactive "How I Think" conceptual visualizers.

### Phase 4 — Section 03: Projects Pocket

- Zoom camera to the hoodie's physical pocket.
- Implement interactive project selector emerging from the pocket.
- Slide and zoom projects (Neura Sentinel, Founder Finder, Spam Detector, Skin Cancer Classifier).

### Phase 5 — Section 04: Experience Vault

- Focus on the hoodie's inner zipper/vault area.
- Reveal interactive certificates and logs representing MindMatrix, Karunada Kala, Freelance AI Automation.

### Phase 6 — Section 05: Skills Galaxy

- Focus camera on the character's open palm.
- Generate a dynamic, interactive "Skills Galaxy" with 8 core skill planets revolving in 3D.

### Phase 7 — Section 06: Education

- Focus camera on the physical ID card hanging on or near the character.
- Render details of School, PU College, and Engineering on the card.

### Phase 8 — Section 07: Certifications

- Focus on the character's physical document/archive folder.
- Show certificates emerging as interactable documents with badges.

### Phase 9 — Section 08: Contact

- Transition camera to focus on an interactive handheld tablet interface.
- Allow form entry and links via the tablet.

### Phase 10 — Section 09: Final Reveal

- Zoom out camera to showcase the full character model in the environment.
- Present the final documentary style message.

### Phase 11 — Firebase Integration

- Bind dynamic data to Firestore database collections (projects, experience, etc.).
- Ensure fallback local assets are served when offline.

### Phase 12 — Admin Dashboard

- Implement CRUD operations for all dynamic data.
- Integrate Firebase Authentication and simple analytics dashboard.

### Phase 13 — Optimization & Deployment

- Texture compression, mesh optimization (DRACO).
- Implement loading screens and lazy assets.
- Deploy to Vercel.
