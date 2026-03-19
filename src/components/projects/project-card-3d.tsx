"use client";
/* eslint-disable react-hooks/purity */

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "./project-data";

// Custom shader for card glow effect
const cardVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cardFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Edge glow effect
    float edgeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
    float edgeY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
    float edge = 1.0 - edgeX * edgeY;
    
    // Animated glow
    float glow = edge * uHover * (0.5 + 0.5 * sin(uTime * 2.0));
    
    // Mouse proximity glow
    vec2 mouseOffset = vUv - uMouse;
    float mouseDist = length(mouseOffset);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * uHover * 0.5;
    
    // Combine
    vec3 glowColor = uColor * (glow + mouseGlow);
    vec3 finalColor = texColor.rgb + glowColor;
    
    // Add subtle fresnel
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    finalColor += uColor * fresnel * uHover * 0.3;
    
    gl_FragColor = vec4(finalColor, texColor.a + glow * 0.5);
  }
`;

// Floating particles around hovered card
function CardParticles({ active, color }: { active: boolean; color: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions: pos, velocities: vel };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!particlesRef.current || !active) return;

    const posAttr = particlesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral toward center when active
      const angle = time * 0.5 + (i / count) * Math.PI * 2;
      const targetRadius = 0.5 + Math.sin(time + i) * 0.3;

      posArray[i3] = THREE.MathUtils.lerp(
        posArray[i3],
        Math.cos(angle) * targetRadius,
        0.02
      );
      posArray[i3 + 1] = THREE.MathUtils.lerp(
        posArray[i3 + 1],
        Math.sin(angle) * targetRadius,
        0.02
      );
      posArray[i3 + 2] = Math.sin(time * 2 + i * 0.1) * 0.1;
    }

    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  index: number;
  onSelect: (project: Project) => void;
  isSelected: boolean;
}

export function ProjectCard3D({
  project,
  position,
  index,
  onSelect,
  isSelected,
}: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  // Create a placeholder texture
  const placeholderTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext("2d")!;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 512, 384);
    gradient.addColorStop(0, project.color);
    gradient.addColorStop(1, "#1a1a2e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 384);

    // Grid pattern
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 384);
      ctx.stroke();
    }
    for (let i = 0; i < 384; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    // Title
    ctx.fillStyle = "white";
    ctx.font = "bold 24px system-ui";
    ctx.fillText(project.title, 24, 340);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [project.color, project.title]);

  // Shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: placeholderTexture },
          uColor: { value: new THREE.Color(project.color) },
          uHover: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        },
        vertexShader: cardVertexShader,
        fragmentShader: cardFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [placeholderTexture, project.color]
  );

  // Animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Update shader uniforms
    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uHover.value = THREE.MathUtils.lerp(
      shaderMaterial.uniforms.uHover.value,
      hovered || isSelected ? 1 : 0,
      0.1
    );
    shaderMaterial.uniforms.uMouse.value.set(localMouse.x, localMouse.y);

    // Floating animation
    const floatY = Math.sin(time * 0.5 + index * 0.5) * 0.1;
    const floatX = Math.cos(time * 0.3 + index * 0.3) * 0.05;

    // Target position with hover lift
    const targetY = position[1] + floatY + (hovered ? 0.3 : 0);
    const targetZ = position[2] + (hovered ? 0.5 : 0);

    meshRef.current.position.x = position[0] + floatX;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.1
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      0.1
    );

    // Tilt toward mouse on hover
    if (hovered) {
      const targetRotX = (localMouse.y - 0.5) * 0.3;
      const targetRotY = (localMouse.x - 0.5) * -0.3;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotY,
        0.1
      );
    } else {
      // Subtle idle rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        Math.sin(time * 0.2 + index) * 0.05,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.cos(time * 0.15 + index) * 0.05,
        0.05
      );
    }
  });

  const handlePointerMove = (e: {
    stopPropagation: () => void;
    uv?: THREE.Vector2;
  }) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    // Calculate local UV coordinates
    if (e.uv) {
      setLocalMouse({ x: e.uv.x, y: e.uv.y });
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onPointerMove={handlePointerMove}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project);
        }}
        material={shaderMaterial}
      >
        <planeGeometry args={[2, 1.5]} />

        {/* HTML overlay for text content */}
        <Html
          position={[0, -0.9, 0.01]}
          center
          distanceFactor={8}
          style={{
            width: "200px",
            pointerEvents: "none",
            opacity: hovered ? 1 : 0.8,
            transition: "opacity 0.3s",
          }}
        >
          <div className="text-center">
            <div
              className="mb-1 text-2xl font-black"
              style={{ color: project.color }}
            >
              {project.metric}
            </div>
            <div className="text-xs text-white/60">{project.metricLabel}</div>
          </div>
        </Html>

        {/* Tech badges on hover */}
        {hovered && (
          <Html
            position={[0, 0.9, 0.01]}
            center
            distanceFactor={8}
            style={{
              width: "250px",
              pointerEvents: "none",
            }}
          >
            <div className="flex flex-wrap justify-center gap-1">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm"
                  style={{
                    animation: `fadeInUp 0.3s ease ${i * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </Html>
        )}
      </mesh>

      {/* Particles */}
      <group position={position}>
        <CardParticles active={hovered} color={project.color} />
      </group>

      {/* Spotlight effect */}
      {hovered && (
        <spotLight
          position={[position[0], position[1] + 2, position[2] + 2]}
          target-position={position}
          angle={0.3}
          penumbra={0.5}
          intensity={1}
          color={project.color}
          distance={5}
        />
      )}
    </group>
  );
}
