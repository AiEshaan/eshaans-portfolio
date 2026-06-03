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

    if (scrollProgress < 0.35) {
      // Phase 1: Intro sequence - slow push-in
      const t = scrollProgress / 0.35;
      targetX = THREE.MathUtils.lerp(0.0, 0.0, t);
      targetY = THREE.MathUtils.lerp(0.5, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.5, 3.5, t);
      
      lookY = THREE.MathUtils.lerp(0.0, 0.2, t);
    } else if (scrollProgress >= 0.35 && scrollProgress < 0.8) {
      // Phase 2: About / Face Reveal - zoom to face, subtle orbit pan
      const t = (scrollProgress - 0.35) / 0.45;
      targetX = THREE.MathUtils.lerp(0.0, -0.15, t);
      targetY = THREE.MathUtils.lerp(0.4, 0.9, t);
      targetZ = THREE.MathUtils.lerp(3.5, 2.3, t);
      
      lookX = THREE.MathUtils.lerp(0.0, 0.0, t);
      lookY = THREE.MathUtils.lerp(0.2, 0.9, t);
    } else {
      // Phase 3: Transition to projects - plunge down towards the hoodie pocket (x is negative, y is lower)
      const t = (scrollProgress - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(-0.15, -0.28, t);
      targetY = THREE.MathUtils.lerp(0.9, -0.4, t);
      targetZ = THREE.MathUtils.lerp(2.3, 1.25, t);
      
      lookX = THREE.MathUtils.lerp(0.0, -0.28, t);
      lookY = THREE.MathUtils.lerp(0.9, -0.6, t);
      lookZ = THREE.MathUtils.lerp(0.0, 0.1, t);
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
