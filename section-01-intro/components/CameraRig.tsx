"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
}

export function CameraRig({ scrollProgress }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    let targetX = 0;
    let targetY = 0.5;
    let targetZ = 5.5;
    
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (scrollProgress < 0.20) {
      // Phase 1: Intro sequence - slow push-in
      const t = scrollProgress / 0.20;
      targetX = 0.0;
      targetY = THREE.MathUtils.lerp(0.5, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.5, 3.5, t);
      
      lookY = THREE.MathUtils.lerp(0.0, 0.2, t);
    } else if (scrollProgress >= 0.20 && scrollProgress < 0.38) {
      // Phase 2: About / Face Reveal - zoom to face, subtle orbit pan
      const t = (scrollProgress - 0.20) / 0.18;
      targetX = THREE.MathUtils.lerp(0.0, -0.15, t);
      targetY = THREE.MathUtils.lerp(0.4, 0.9, t);
      targetZ = THREE.MathUtils.lerp(3.5, 2.3, t);
      
      lookX = 0;
      lookY = THREE.MathUtils.lerp(0.2, 0.9, t);
    } else if (scrollProgress >= 0.38 && scrollProgress < 0.44) {
      // Phase 3: Projects Pocket Focus - move down-left to focus on pocket
      const t = (scrollProgress - 0.38) / 0.06;
      targetX = THREE.MathUtils.lerp(-0.15, -0.28, t);
      targetY = THREE.MathUtils.lerp(0.9, -0.4, t);
      targetZ = THREE.MathUtils.lerp(2.3, 1.25, t);
      
      lookX = THREE.MathUtils.lerp(0.0, -0.28, t);
      lookY = THREE.MathUtils.lerp(0.9, -0.6, t);
      lookZ = THREE.MathUtils.lerp(0.0, 0.1, t);
    } else if (scrollProgress >= 0.44 && scrollProgress < 0.54) {
      // Phase 4: Experience Vault - zoom to center chest zipper
      const t = (scrollProgress - 0.44) / 0.10;
      targetX = THREE.MathUtils.lerp(-0.28, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.4, 0.2, t);
      targetZ = THREE.MathUtils.lerp(1.25, 1.45, t);
      
      lookX = THREE.MathUtils.lerp(-0.28, 0.0, t);
      lookY = THREE.MathUtils.lerp(-0.6, 0.1, t);
      lookZ = THREE.MathUtils.lerp(0.1, 0.0, t);
    } else if (scrollProgress >= 0.54 && scrollProgress < 0.62) {
      // Phase 5: Skills Galaxy - zoom to open left palm [0.35, -0.1, 0.4]
      const t = (scrollProgress - 0.54) / 0.08;
      targetX = THREE.MathUtils.lerp(0.0, 0.45, t);
      targetY = THREE.MathUtils.lerp(0.2, -0.05, t);
      targetZ = THREE.MathUtils.lerp(1.45, 1.15, t);
      
      lookX = THREE.MathUtils.lerp(0.0, 0.35, t);
      lookY = THREE.MathUtils.lerp(0.1, -0.1, t);
      lookZ = THREE.MathUtils.lerp(0.0, 0.4, t);
    } else if (scrollProgress >= 0.62 && scrollProgress < 0.70) {
      // Phase 6: Education Portal - zoom into ID Card [0.0, 0.65, 0.15] and transition to sketchbook [0.0, 0.55, 0.8]
      const t = (scrollProgress - 0.62) / 0.08;
      if (t < 0.5) {
        const t1 = t / 0.5;
        targetX = THREE.MathUtils.lerp(0.45, 0.0, t1);
        targetY = THREE.MathUtils.lerp(-0.05, 0.65, t1);
        targetZ = THREE.MathUtils.lerp(1.15, 0.5, t1);
        
        lookX = THREE.MathUtils.lerp(0.35, 0.0, t1);
        lookY = THREE.MathUtils.lerp(-0.1, 0.65, t1);
        lookZ = THREE.MathUtils.lerp(0.4, 0.15, t1);
      } else {
        const t2 = (t - 0.5) / 0.5;
        targetX = 0.0;
        targetY = THREE.MathUtils.lerp(0.65, 0.55, t2);
        targetZ = THREE.MathUtils.lerp(0.5, 1.3, t2);
        
        lookX = 0.0;
        lookY = THREE.MathUtils.lerp(0.65, 0.55, t2);
        lookZ = THREE.MathUtils.lerp(0.15, 0.8, t2);
      }
    } else if (scrollProgress >= 0.70 && scrollProgress < 0.80) {
      // Phase 7: Certification Archive - zoom close to right hand folder [-0.35, -0.15, 0.4]
      const t = (scrollProgress - 0.70) / 0.10;
      if (t < 0.5) {
        const t1 = t / 0.5;
        targetX = THREE.MathUtils.lerp(0.0, -0.45, t1);
        targetY = THREE.MathUtils.lerp(0.55, -0.1, t1);
        targetZ = THREE.MathUtils.lerp(1.3, 1.15, t1);
        
        lookX = THREE.MathUtils.lerp(0.0, -0.35, t1);
        lookY = THREE.MathUtils.lerp(0.55, -0.15, t1);
        lookZ = THREE.MathUtils.lerp(0.8, 0.4, t1);
      } else {
        const t2 = (t - 0.5) / 0.5;
        targetX = -0.35;
        targetY = -0.15;
        targetZ = THREE.MathUtils.lerp(1.15, 0.85, t2);
        
        lookX = -0.35;
        lookY = -0.15;
        lookZ = 0.4;
      }
    } else if (scrollProgress >= 0.80 && scrollProgress < 0.90) {
      // Phase 8: Contact Portal - zoom close to handheld tablet [0.0, -0.3, 0.7]
      const t = (scrollProgress - 0.80) / 0.10;
      if (t < 0.6) {
        const t1 = t / 0.6;
        targetX = THREE.MathUtils.lerp(-0.35, 0.0, t1);
        targetY = THREE.MathUtils.lerp(-0.15, 0.2, t1);
        targetZ = THREE.MathUtils.lerp(0.85, 1.0, t1);
        
        lookX = THREE.MathUtils.lerp(-0.35, 0.0, t1);
        lookY = THREE.MathUtils.lerp(-0.15, -0.3, t1);
        lookZ = THREE.MathUtils.lerp(0.4, 0.7, t1);
      } else {
        const t2 = (t - 0.6) / 0.4;
        targetX = 0;
        targetY = THREE.MathUtils.lerp(0.2, -0.05, t2);
        targetZ = THREE.MathUtils.lerp(1.0, 0.88, t2);
        
        lookX = 0;
        lookY = -0.3;
        lookZ = 0.7;
      }
    } else {
      // Phase 9: Ending Sequence - pull back to wide center and do slow hero sweep
      const t = Math.min(1.0, (scrollProgress - 0.90) / 0.10);
      if (t < 0.7) {
        const t1 = t / 0.7;
        targetX = 0.0;
        targetY = THREE.MathUtils.lerp(-0.05, 0.4, t1);
        targetZ = THREE.MathUtils.lerp(0.88, 3.8, t1);
        
        lookX = 0.0;
        lookY = THREE.MathUtils.lerp(-0.3, 0.4, t1);
        lookZ = THREE.MathUtils.lerp(0.7, 0.4, t1);
      } else {
        const t2 = (t - 0.7) / 0.3;
        targetX = Math.sin(t2 * Math.PI * 0.15) * 0.5;
        targetY = 0.4 + t2 * 0.15;
        targetZ = 3.8 - t2 * 0.5;
        
        lookX = 0.0;
        lookY = 0.4;
        lookZ = 0.4;
      }
    }

    // Responsive viewport camera adjustments (pull back on narrower screens)
    const isMobile = state.viewport.width < 6;
    const isTablet = state.viewport.width >= 6 && state.viewport.width < 10;
    const mobileScale = isMobile ? 1.4 : isTablet ? 1.2 : 1.0;
    
    targetZ = targetZ * mobileScale;

    targetPos.current.set(targetX, targetY, targetZ);
    lookAtTarget.current.set(lookX, lookY, lookZ);

    // Smooth cinematic damping interpolation (lerp)
    state.camera.position.lerp(targetPos.current, 0.035);
    
    // Look-at interpolation
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    state.camera.getWorldDirection(currentLookAt);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}
