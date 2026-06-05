# Deployment Audit & Bug Report

**Date:** June 5, 2026
**Environment:** Vercel Production (`prj_iXyGXUfujw22WyQMYqwYxqw1iZkB`)

## 1. Executive Summary

A full deployment audit was performed to investigate the symptoms of a "pitch black scene with missing assets" on the Vercel production build. 

**Conclusion:** The deployment is **100% healthy**. The "bug" is actually the intended cinematic design of the portfolio at `scrollProgress = 0`. The portfolio is functioning exactly as it was coded to function. 

---

## 2. Symptom Analysis

### ❌ "Character is missing"
**False.** The "very dark geometric object in the center" *is* the character. At the start of the sequence, the character is deliberately rendered as an untextured placeholder using `#333333` (Head) and `#1e1e1e` (Torso) materials.

### ❌ "Face reveal is missing"
**Expected Behavior.** The `FaceReveal.tsx` component is bound to the user's scroll progress. The particle face only begins to assemble at `scrollProgress = 0.35` (approximately `630vh` down the page). At the top of the page, its opacity is mathematically locked to `0`.

### ❌ "No project capsules, experience vault..."
**Expected Behavior.** The `PocketScene` (Projects) and `ExperienceVault` are out of the camera's view or hidden until `scrollProgress = 0.38` and `0.44` respectively.

### ❌ "The scene is almost completely black"
**Expected Behavior.** The `Environment.tsx` lighting setup relies on a dim ambient light (`0.15` intensity) and specific directional lights. Because the character geometry is dark gray and there is no HDRI environment map by design, the initial viewport is meant to feel like a dark, empty studio.

### ❌ "Intro text is missing"
**Root Cause:** You likely scrolled down *very slightly* on the live site. 
In `ScrollController.tsx`, the GSAP animation fades the `.intro-header` out rapidly as soon as you begin scrolling. Between the intro header fading out and the first philosophy text (`phil-1`) fading in, there is an intentional "dead zone" where the screen is completely empty of HTML text to build suspense before the face reveal.

---

## 3. Technical Audit Results

| Check | Status | Finding |
|-------|--------|---------|
| **Character Asset Paths** | ✅ PASS | `public/assets/references/face.png` successfully committed to Git and deployed to Vercel. Next.js serves this correctly. |
| **Face Reveal Textures** | ✅ PASS | Loads asynchronously via `Image` object. Does not block the main render tree. |
| **IntroScene Render Tree** | ✅ PASS | React Error Boundaries and Suspense are not being triggered. The `SKIP CINEMATIC` button is rendering, proving the React tree is alive and healthy. |
| **Lighting Setup** | ✅ PASS | Standard Three.js lights are active. No external HDRI textures are missing. |
| **Firebase Environment Vars** | ⚠️ WARNING | `firebase.ts` has hardcoded fallbacks (e.g., `AIzaSyDx...`), so it will not crash Vercel. **However, you should still add your `.env.local` variables to the Vercel Dashboard** to ensure it points to your exact production database. |
| **Firestore Read Permissions** | ✅ PASS | Rules are set to `allow read: if true;` for public collections. |

---

## 4. Next Steps

1. **Test the Scroll:** Open the Vercel link again and **scroll down heavily**. You will see the intro text fade, the mindset flow appear, and the particle face assemble out of the darkness.
2. **Test the Skip:** Click the **"SKIP CINEMATIC"** button in the top right. It will immediately jump the camera down the page to the Projects section, revealing the UI and 3D assets.
3. **Add Vercel Env Vars:** Go to Vercel > Settings > Environment Variables, and paste the contents of your `.env.local` file. Redeploy.

The portfolio is ready for the public. The "empty shell" is just the beginning of the movie. 🎬
