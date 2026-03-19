"use client";
/* eslint-disable react-hooks/purity */

import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { ProjectCard3D } from "./project-card-3d";
import { projects, type Project } from "./project-data";

// Grid lines connecting cards
function GridLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    // Create isometric grid
    const gridSize = 8;
    const spacing = 3;

    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        // Horizontal lines
        if (x < gridSize) {
          positions.push(x * spacing, -2, z * spacing);
          positions.push((x + 1) * spacing, -2, z * spacing);

          const intensity = Math.max(0, 1 - Math.abs(x) / gridSize);
          colors.push(0.5, 0.3, 0.8, intensity * 0.3);
          colors.push(0.5, 0.3, 0.8, intensity * 0.3);
        }

        // Vertical lines
        if (z < gridSize) {
          positions.push(x * spacing, -2, z * spacing);
          positions.push(x * spacing, -2, (z + 1) * spacing);

          const intensity = Math.max(0, 1 - Math.abs(z) / gridSize);
          colors.push(0.3, 0.5, 0.8, intensity * 0.3);
          colors.push(0.3, 0.5, 0.8, intensity * 0.3);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));

    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Background particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      siz[i] = Math.random() * 0.05 + 0.01;
    }

    return { positions: pos, sizes: siz };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Import useMemo
import { useMemo } from "react";

interface SceneContentProps {
  onSelectProject: (project: Project) => void;
  selectedProject: Project | null;
}

function SceneContent({ onSelectProject, selectedProject }: SceneContentProps) {
  const { viewport } = useThree();

  // Calculate isometric grid positions for cards
  const cardPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const cols = 3;
    const rows = 2;
    const spacingX = 3;
    const spacingZ = 2.5;

    for (let i = 0; i < projects.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * spacingX;
      const z = (row - (rows - 1) / 2) * spacingZ;
      const y = Math.sin(col * 0.5) * 0.3 + Math.cos(row * 0.5) * 0.2;
      positions.push([x, y, z]);
    }

    return positions;
  }, []);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        rotateSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#06b6d4" />

      {/* Grid and particles */}
      <GridLines />
      <BackgroundParticles />

      {/* Project cards */}
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          position={cardPositions[index]}
          index={index}
          onSelect={onSelectProject}
          isSelected={selectedProject?.id === project.id}
        />
      ))}

      {/* Post-processing */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

interface NeuralGridSceneProps {
  onSelectProject: (project: Project) => void;
  selectedProject: Project | null;
}

export function NeuralGridScene({
  onSelectProject,
  selectedProject,
}: NeuralGridSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Don't render until mounted (avoid SSR issues)
  if (!mounted) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
      </div>
    );
  }

  // Fallback if WebGL is not available
  if (!hasWebGL) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <p className="text-white/50">3D view requires WebGL support</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            onSelectProject={onSelectProject}
            selectedProject={selectedProject}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
