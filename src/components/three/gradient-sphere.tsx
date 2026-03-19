"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, GradientTexture } from "@react-three/drei";
import type { Mesh } from "three";

export function GradientSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const stops = useMemo(() => [0, 0.4, 0.7, 1], []);
  const colors = useMemo(
    () => ["#ff00ff", "#8b5cf6", "#3b82f6", "#06b6d4"],
    []
  );

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      >
        <GradientTexture stops={stops} colors={colors} />
      </MeshDistortMaterial>
    </mesh>
  );
}
