# Portfolio Production Roadmap

This roadmap documents the remaining developmental phases required to transition the portfolio from a local experience into a production-ready software product.

---

## 1. Remaining Features & Admin Tasks
* **Phase 11 — Admin Dashboard Foundation:**
  - Create route guards, layout shell, sidebar navigation, and session auth context.
  - Implement a Dashboard Home providing counters of Firestore records and activity summaries.
* **Phase 11.1 — Projects Manager:**
  - Build complete CRUD forms for the projects database.
  - Integrate image and video uploads directly into Firebase Storage.
* **Phase 11.2 — Vault/Experience/Skills/Education/Certifications Managers:**
  - Build manager panels to create, read, update, and delete experiences, skills, education history, and certification badges.
* **Phase 11.3 — Contact & Config Settings Manager:**
  - Read user form messages directly from the dashboard.
  - Build toggle controls (e.g. `heroEnabled`, `contactEnabled`) to toggle features from Firestore settings documents without editing codebase files.

---

## 2. Content Migration Tasks
* Move project JSON payloads out of `/assets/projects/...` and into the Firestore `projects` collection.
* Import skill catalogs, PU/School/College transcripts, and certification details into corresponding database collections.
* Upload certificate PDFs and portfolio images to Firebase Storage, updating database references with public HTTPS URLs.

---

## 3. Analytics Tracking Tasks
* Embed dispatch hooks within Three.js interactive nodes (capsules, planets, folders) to log key events:
  - `project_opened`
  - `project_closed`
  - `experience_opened`
  - `certificate_viewed`
  - `resume_downloaded`
  - `social_click`
  - `contact_open`
* Map logged event entries to a unified daily session tracking summary display on the Admin Dashboard.

---

## 4. Deployment Tasks
* **Frontend:** Deployed to Vercel (bind to custom domain).
* **Database & Storage:** Lock Firebase Security rules to enforce admin-only write operations.
* **Domain & Certificates:** Bind custom Domain and verify SSL certificates.

---

## 5. Launch Checklist
- [ ] Migrate local data manifests to Firestore.
- [ ] Upload certificates and images to Firebase Storage.
- [ ] Build production code and verify Turbopack bundling.
- [ ] Run Lighthouse audits and verify mobile layout rendering.
- [ ] Enforce read-only rules for visitors, write-only rules for authentication admin.
