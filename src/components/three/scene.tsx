"use client";

import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GradientSphere } from "./gradient-sphere";
import { FloatingParticles } from "./floating-particles";
import { SafeCanvas } from "./safe-canvas";

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <SafeCanvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <Suspense fallback={null}>
          <GradientSphere />
          <FloatingParticles />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </SafeCanvas>
    </div>
  );
}
