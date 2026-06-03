"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
}

export function CameraRig({ scrollProgress }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // Scroll progress maps to camera push-in and slight position changes
    // Start at z=5.5 (further back), push-in to z=2.8 (closer look at character)
    const targetZ = THREE.MathUtils.lerp(5.5, 2.8, scrollProgress);
    const targetY = THREE.MathUtils.lerp(0.5, 0.2, scrollProgress);
    const targetX = THREE.MathUtils.lerp(0.0, -0.4, scrollProgress);

    targetPos.current.set(targetX, targetY, targetZ);
    lookAtTarget.current.set(0, 0.2, 0);

    // Damped camera transition (cinematic lag/weight)
    state.camera.position.lerp(targetPos.current, 0.04);
    
    // Look at target with smooth interpolation
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    state.camera.getWorldDirection(currentLookAt);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}
