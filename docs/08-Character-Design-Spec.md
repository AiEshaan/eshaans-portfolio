# Character Design Specification

This document details the visual and interactive specifications of the 3D representation of Eshaan, focusing on realistic, tactile materials and precise interaction points.

---

## 1. Avatar Model Overview
- **Aesthetic**: Realistic rendering using Physically Based Rendering (PBR) materials. Clear, warm lighting and studio-quality documentary portraits.
- **Pose**: Calm, natural standing or sitting pose. Not stiff. Subtle idle animations (breathing, eye blinking, small head tilts).
- **Clothing**:
  - A premium matte-textured dark hoodie (fabric weave visible on close inspection).
  - A detailed physical zipper and zipper slider.
  - A deep front pocket (representing the Projects Pocket).
  - A lanyard carrying an ID Card (representing the Education node).

---

## 2. Interaction Hotspots (Anatomical Mapping)

### Pocket (Projects Pocket)
- **Visuals**: A styled hoodie pocket with stitching detail.
- **Scroll/Hover Interaction**: The camera dollies and focuses closely on the pocket. A stylized stack of project cards slides out from the pocket, containing interactive tech stack indicators.

### Hoodie Vault (Experience Vault)
- **Visuals**: Inside the zipper region or a hidden compartment of the hoodie.
- **Scroll/Hover Interaction**: The zipper slider shifts down slightly, revealing an inner glowing warm texture or structural grid where cards float containing experience logs.

### Palm (Skills Galaxy)
- **Visuals**: The character's open palm.
- **Scroll/Hover Interaction**: The palm lifts up slightly towards the camera. 8 core skill planets spin out, casting soft light onto the palm.

### ID Card (Education)
- **Visuals**: A realistic corporate/student lanyard ID badge with printed text, a photograph, and a matte plastic cover.
- **Scroll/Hover Interaction**: The ID card swings forward slightly under camera focus, presenting readable academic details on the front and back.

### Document Case (Certifications)
- **Visuals**: A leather or cardboard archive folder sitting beside the character or held in hand.
- **Scroll/Hover Interaction**: The folder folder opens slowly to reveal document mockups and interactive badges.

### Tablet (Contact Portal)
- **Visuals**: A sleek, physical tablet device (metal back, glass front) held by the character.
- **Scroll/Hover Interaction**: The tablet is brought directly in front of the camera, turning the viewport screen into a functional UI portal for contact forms.

---

## 3. Camera Behavior Spec
- **Rig Type**: Cinematic path follower coupled with look-at interpolation.
- **Damping (Smoothness)**: Heavy damping to simulate physical camera cranes or dolly tracks.
- **Depth of Field (DoF)**: Active focal shifts to blur out elements not in the current section's focus, directing user attention.
