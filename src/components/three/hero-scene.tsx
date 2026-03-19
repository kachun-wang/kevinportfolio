"use client";

import { Suspense, useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { NeuralNetworkParticles } from "./neural-network-particles";
import { SafeCanvas } from "./safe-canvas";

interface HeroSceneProps {
  particleCount: number;
  mousePosition: { x: number; y: number };
  scrollProgress: number;
  isLowEnd: boolean;
}

// Camera that responds to scroll and mouse
function AnimatedCamera({
  mousePosition,
  scrollProgress,
}: {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!cameraRef.current) return;

    // Parallax effect based on scroll
    const scrollOffset = scrollProgress * 5;

    // Mouse influence on camera
    const mouseX = mousePosition.x * 1.5;
    const mouseY = mousePosition.y * 1;

    // Smooth camera movement
    targetPosition.current.set(
      mouseX,
      mouseY + scrollOffset * 0.5,
      12 - scrollOffset
    );
    targetLookAt.current.set(
      mouseX * 0.3,
      mouseY * 0.3 - scrollOffset * 0.2,
      0
    );

    cameraRef.current.position.lerp(targetPosition.current, 0.02);

    const currentLookAt = new THREE.Vector3();
    cameraRef.current.getWorldDirection(currentLookAt);
    currentLookAt.lerp(targetLookAt.current, 0.02);
    cameraRef.current.lookAt(targetLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 12]}
      fov={60}
      near={0.1}
      far={100}
    />
  );
}

// Post-processing effects - simplified for better performance
function Effects({ isLowEnd }: { isLowEnd: boolean }) {
  const { gl, scene, camera } = useThree();

  if (isLowEnd || !gl || !scene || !camera) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.8}
        mipmapBlur
        levels={5} // Reduced from default 8
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

// Ambient lighting setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#ffffff" />
    </>
  );
}

// Scene content
function SceneContent({
  particleCount,
  mousePosition,
  scrollProgress,
  isLowEnd,
}: HeroSceneProps) {
  return (
    <>
      <AnimatedCamera
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
      />
      <Lighting />
      <NeuralNetworkParticles
        count={particleCount}
        connectionDistance={isLowEnd ? 2 : 2.5}
        mouseInfluence={mousePosition}
      />
      <Effects isLowEnd={isLowEnd} />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export function HeroScene({
  particleCount,
  mousePosition,
  scrollProgress,
  isLowEnd,
}: HeroSceneProps) {
  // Safe device pixel ratio check
  const dpr =
    typeof window !== "undefined"
      ? isLowEnd
        ? 1
        : Math.min(window.devicePixelRatio, 1.5)
      : 1;

  const fallback = (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
    </div>
  );

  return (
    <div className="absolute inset-0">
      <SafeCanvas
        dpr={dpr}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: isLowEnd ? "low-power" : "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop="demand"
        style={{ background: "transparent" }}
        fallback={fallback}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent
            particleCount={particleCount}
            mousePosition={mousePosition}
            scrollProgress={scrollProgress}
            isLowEnd={isLowEnd}
          />
        </Suspense>
      </SafeCanvas>
    </div>
  );
}
