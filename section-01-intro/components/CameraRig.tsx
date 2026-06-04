"use client";

import React, { useRef } from "react";
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

    if (scrollProgress < 0.3) {
      // Phase 1: Intro sequence - slow push-in
      const t = scrollProgress / 0.3;
      targetX = 0.0;
      targetY = THREE.MathUtils.lerp(0.5, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.5, 3.5, t);
      
      lookY = THREE.MathUtils.lerp(0.0, 0.2, t);
    } else if (scrollProgress >= 0.3 && scrollProgress < 0.58) {
      // Phase 2: About / Face Reveal - zoom to face, subtle orbit pan
      const t = (scrollProgress - 0.3) / 0.28;
      targetX = THREE.MathUtils.lerp(0.0, -0.15, t);
      targetY = THREE.MathUtils.lerp(0.4, 0.9, t);
      targetZ = THREE.MathUtils.lerp(3.5, 2.3, t);
      
      lookX = 0;
      lookY = THREE.MathUtils.lerp(0.2, 0.9, t);
    } else if (scrollProgress >= 0.58 && scrollProgress < 0.68) {
      // Phase 3: Projects Pocket Focus - move down-left to focus on pocket
      const t = (scrollProgress - 0.58) / 0.1;
      targetX = THREE.MathUtils.lerp(-0.15, -0.28, t);
      targetY = THREE.MathUtils.lerp(0.9, -0.4, t);
      targetZ = THREE.MathUtils.lerp(2.3, 1.25, t);
      
      lookX = THREE.MathUtils.lerp(0.0, -0.28, t);
      lookY = THREE.MathUtils.lerp(0.9, -0.6, t);
      lookZ = THREE.MathUtils.lerp(0.0, 0.1, t);
    } else {
      // Phase 4: Experience Vault - zoom to center chest zipper
      const t = Math.min(1.0, (scrollProgress - 0.68) / 0.23);
      targetX = THREE.MathUtils.lerp(-0.28, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.4, 0.2, t);
      targetZ = THREE.MathUtils.lerp(1.25, 1.45, t);
      
      lookX = THREE.MathUtils.lerp(-0.28, 0.0, t);
      lookY = THREE.MathUtils.lerp(-0.6, 0.1, t);
      lookZ = THREE.MathUtils.lerp(0.1, 0.0, t);
    }

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
