"use client";
/* eslint-disable react-hooks/purity, react-hooks/immutability */

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkParticlesProps {
  count?: number;
  connectionDistance?: number;
  mouseInfluence?: { x: number; y: number };
}

// Custom shader for particles with gradient coloring
const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  varying float vDistance;
  
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDistance = -mvPosition.z;
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vDistance;
  
  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
    alpha *= smoothstep(50.0, 5.0, vDistance);
    
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

// Custom shader for connections
const lineVertexShader = `
  attribute vec3 customColor;
  attribute float alpha;
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = customColor;
    vAlpha = alpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    gl_FragColor = vec4(vColor, vAlpha * 0.15);
  }
`;

export function NeuralNetworkParticles({
  count = 2000,
  connectionDistance = 2.5,
  mouseInfluence = { x: 0, y: 0 },
}: NeuralNetworkParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();

  // Store original positions and velocities
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    const purpleColor = new THREE.Color("#8b5cf6");
    const cyanColor = new THREE.Color("#06b6d4");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere with denser center
      const radius = Math.pow(Math.random(), 0.5) * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 5;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      // Random velocities for subtle movement
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;

      // Gradient color based on position
      const t = (positions[i3 + 1] + 10) / 20;
      const color = purpleColor.clone().lerp(cyanColor, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Varied sizes
      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes, velocities, originalPositions };
  }, [count]);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const maxConnections = count * 3;
    const positions = new Float32Array(maxConnections * 6);
    const colors = new Float32Array(maxConnections * 6);
    const alphas = new Float32Array(maxConnections * 2);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setDrawRange(0, 0);

    return geometry;
  }, [count]);

  // Create particle geometry
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particleData.positions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    geometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(particleData.colors, 3)
    );
    geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleData.sizes, 1)
    );
    return geometry;
  }, [particleData]);

  // Particle material
  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Line material
  const lineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Mouse influence reference for smooth updates
  const mouseRef = useRef(mouseInfluence);
  useEffect(() => {
    mouseRef.current = mouseInfluence;
  }, [mouseInfluence]);

  // Cache color objects to avoid recreation every frame
  const purpleColorRef = useRef(new THREE.Color("#8b5cf6"));
  const cyanColorRef = useRef(new THREE.Color("#06b6d4"));

  // Frame counter for throttling expensive operations
  const frameCountRef = useRef(0);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = particleGeometry.attributes.position
      .array as Float32Array;
    const linePositions = lineGeometry.attributes.position
      .array as Float32Array;
    const lineColors = lineGeometry.attributes.customColor
      .array as Float32Array;
    const lineAlphas = lineGeometry.attributes.alpha.array as Float32Array;

    const mouse = mouseRef.current;
    const purpleColor = purpleColorRef.current;
    const cyanColor = cyanColorRef.current;

    // Update particle positions with subtle movement
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Oscillate around original position
      const noise = Math.sin(time * 0.5 + i * 0.1) * 0.1;

      positions[i3] =
        particleData.originalPositions[i3] +
        Math.sin(time * 0.3 + i * 0.05) * 0.3 +
        mouse.x * 0.5;
      positions[i3 + 1] =
        particleData.originalPositions[i3 + 1] +
        Math.cos(time * 0.2 + i * 0.03) * 0.3 +
        mouse.y * 0.5;
      positions[i3 + 2] = particleData.originalPositions[i3 + 2] + noise * 0.5;
    }

    particleGeometry.attributes.position.needsUpdate = true;

    // Throttle connection updates to every 2 frames for better performance
    frameCountRef.current++;
    const shouldUpdateConnections = frameCountRef.current % 2 === 0;

    if (shouldUpdateConnections) {
      // Update connections (sample subset for performance)
      let lineIndex = 0;
      const maxLines = count * 3;
      const sampleRate = Math.max(1, Math.floor(count / 500));

      // Pre-calculate distance squared threshold to avoid sqrt in inner loop
      const distSq = connectionDistance * connectionDistance;

      for (let i = 0; i < count && lineIndex < maxLines; i += sampleRate) {
        const i3 = i * 3;
        const x1 = positions[i3];
        const y1 = positions[i3 + 1];
        const z1 = positions[i3 + 2];

        for (
          let j = i + sampleRate;
          j < count && lineIndex < maxLines;
          j += sampleRate
        ) {
          const j3 = j * 3;
          const x2 = positions[j3];
          const y2 = positions[j3 + 1];
          const z2 = positions[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSquared = dx * dx + dy * dy + dz * dz;

          if (distSquared < distSq) {
            const dist = Math.sqrt(distSquared);
            const alpha = 1 - dist / connectionDistance;
            const li6 = lineIndex * 6;
            const li2 = lineIndex * 2;

            linePositions[li6] = x1;
            linePositions[li6 + 1] = y1;
            linePositions[li6 + 2] = z1;
            linePositions[li6 + 3] = x2;
            linePositions[li6 + 4] = y2;
            linePositions[li6 + 5] = z2;

            // Gradient color for lines
            const t1 = (y1 + 10) / 20;
            const t2 = (y2 + 10) / 20;
            const color1 = purpleColor.clone().lerp(cyanColor, t1);
            const color2 = purpleColor.clone().lerp(cyanColor, t2);

            lineColors[li6] = color1.r;
            lineColors[li6 + 1] = color1.g;
            lineColors[li6 + 2] = color1.b;
            lineColors[li6 + 3] = color2.r;
            lineColors[li6 + 4] = color2.g;
            lineColors[li6 + 5] = color2.b;

            lineAlphas[li2] = alpha;
            lineAlphas[li2 + 1] = alpha;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.customColor.needsUpdate = true;
      lineGeometry.attributes.alpha.needsUpdate = true;
    }

    // Subtle rotation
    pointsRef.current.rotation.y = time * 0.02 + mouse.x * 0.1;
    pointsRef.current.rotation.x = mouse.y * 0.05;
    linesRef.current.rotation.y = time * 0.02 + mouse.x * 0.1;
    linesRef.current.rotation.x = mouse.y * 0.05;
  });

  return (
    <group>
      <points
        ref={pointsRef}
        geometry={particleGeometry}
        material={particleMaterial}
      />
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        material={lineMaterial}
      />
    </group>
  );
}
