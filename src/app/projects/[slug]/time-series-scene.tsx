"use client";
/* eslint-disable react-hooks/immutability */

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";
import { SafeCanvas } from "@/components/three/safe-canvas";

interface TimeSeriesGraphProps {
  color: string;
}

// Animated time series line using drei's Line component
function TimeSeriesLine({
  color,
  offset = 0,
  amplitude = 1,
  yOffset = 0,
}: {
  color: string;
  offset?: number;
  amplitude?: number;
  yOffset?: number;
}) {
  const pointCount = 100;
  const pointsRef = useRef<THREE.Vector3[]>([]);

  // Initialize points
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < pointCount; i++) {
      const x = (i / pointCount) * 20 - 10;
      pts.push(new THREE.Vector3(x, 0, 0));
    }
    return pts;
  }, []);

  // Store points in ref after render
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    for (let i = 0; i < pointCount; i++) {
      const progress = i / pointCount;

      // Base trend (upward accuracy curve)
      const trend = Math.pow(progress, 0.7) * 3;

      // Seasonal pattern
      const seasonal =
        Math.sin(progress * Math.PI * 4 + time * 0.5 + offset) *
        0.5 *
        amplitude;

      // Noise that decreases as accuracy improves
      const noise =
        (Math.sin(i * 0.5 + time) * 0.3 +
          Math.cos(i * 0.3 + time * 1.3) * 0.2) *
        (1 - progress * 0.7);

      // Animated wave
      const wave = Math.sin(progress * Math.PI * 2 - time * 0.8 + offset) * 0.3;

      pointsRef.current[i].y = trend + seasonal + noise + wave + yOffset;
    }
  });

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.8}
    />
  );
}

// Prediction confidence band
function ConfidenceBand({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointCount = 50;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 2 * 3);
    const indices: number[] = [];

    for (let i = 0; i < pointCount - 1; i++) {
      const idx = i * 2;
      indices.push(idx, idx + 1, idx + 2);
      indices.push(idx + 1, idx + 3, idx + 2);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const positions = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pointCount; i++) {
      const progress = i / (pointCount - 1);
      const x = progress * 20 - 10;

      // Only show band in prediction zone (right side)
      const inPredictionZone = progress > 0.7;
      const bandWidth = inPredictionZone ? (progress - 0.7) * 3 * 2 : 0;

      const baseTrend = Math.pow(progress, 0.7) * 3;
      const wave = Math.sin(progress * Math.PI * 2 - time * 0.8) * 0.3;
      const baseY = baseTrend + wave;

      // Upper bound
      positions[i * 6] = x;
      positions[i * 6 + 1] = baseY + bandWidth * 0.5;
      positions[i * 6 + 2] = 0;

      // Lower bound
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = baseY - bandWidth * 0.5;
      positions[i * 6 + 5] = 0;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Data points
function DataPoints({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 30;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const progress = i / count;
      positions[i * 3] = progress * 20 - 10;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const progress = i / count;

      // Match the main line's movement
      const trend = Math.pow(progress, 0.7) * 3;
      const seasonal = Math.sin(progress * Math.PI * 4 + time * 0.5) * 0.5;
      const noise = (Math.random() - 0.5) * 0.3 * (1 - progress * 0.5);

      posArray[i * 3 + 1] =
        trend + seasonal + noise + (Math.random() - 0.5) * 0.2;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Grid
function Grid() {
  const lines: React.ReactNode[] = [];

  // Horizontal lines
  for (let y = -2; y <= 6; y += 2) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[
          [-12, y, 0],
          [12, y, 0],
        ]}
        color="#ffffff"
        opacity={0.05}
        transparent
        lineWidth={1}
      />
    );
  }

  // Vertical lines
  for (let x = -10; x <= 10; x += 5) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[
          [x, -3, 0],
          [x, 7, 0],
        ]}
        color="#ffffff"
        opacity={0.05}
        transparent
        lineWidth={1}
      />
    );
  }

  return <group>{lines}</group>;
}

function SceneContent({ color }: TimeSeriesGraphProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation based on time
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.15) * 0.02;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={50} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={color} />

      <group ref={groupRef}>
        <Grid />

        {/* Multiple time series lines */}
        <TimeSeriesLine color={color} offset={0} amplitude={1} yOffset={0} />
        <TimeSeriesLine
          color="#06b6d4"
          offset={1}
          amplitude={0.7}
          yOffset={-0.5}
        />
        <TimeSeriesLine
          color="#10b981"
          offset={2}
          amplitude={0.5}
          yOffset={-1}
        />

        {/* Confidence band */}
        <ConfidenceBand color={color} />

        {/* Data points */}
        <DataPoints color={color} />

        {/* Prediction zone indicator */}
        <mesh position={[8, 2, -0.5]}>
          <planeGeometry args={[6, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.02} />
        </mesh>
      </group>
    </>
  );
}

export function TimeSeriesScene({ color }: TimeSeriesGraphProps) {
  const fallback = (
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)`,
        }}
      />
    </div>
  );

  return (
    <div className="absolute inset-0">
      <SafeCanvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        fallback={fallback}
      >
        <SceneContent color={color} />
      </SafeCanvas>
    </div>
  );
}
