"use client";
/* eslint-disable react-hooks/purity */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

interface AvatarSceneProps {
  mousePosition: { x: number; y: number };
}

// Stylized low-poly head geometry
function createHeadGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  // Simplified low-poly face vertices
  const vertices = new Float32Array([
    // Front face - forehead
    0, 0.8, 0.4, -0.35, 0.7, 0.35, 0.35, 0.7, 0.35,
    // Front face - upper
    -0.35, 0.7, 0.35, -0.4, 0.3, 0.4, 0, 0.4, 0.5, 0, 0.4, 0.5, 0.4, 0.3, 0.4,
    0.35, 0.7, 0.35,
    // Front face - middle (cheeks)
    -0.4, 0.3, 0.4, -0.35, -0.1, 0.35, 0, 0.1, 0.45, 0, 0.1, 0.45, 0.35, -0.1,
    0.35, 0.4, 0.3, 0.4,
    // Front face - lower (jaw)
    -0.35, -0.1, 0.35, -0.2, -0.4, 0.25, 0, -0.2, 0.35, 0, -0.2, 0.35, 0.2,
    -0.4, 0.25, 0.35, -0.1, 0.35,
    // Chin
    -0.2, -0.4, 0.25, 0, -0.5, 0.2, 0.2, -0.4, 0.25,
    // Sides - left
    -0.35, 0.7, 0.35, -0.5, 0.5, 0, -0.4, 0.3, 0.4, -0.4, 0.3, 0.4, -0.5, 0.5,
    0, -0.5, 0, 0, -0.4, 0.3, 0.4, -0.5, 0, 0, -0.35, -0.1, 0.35, -0.35, -0.1,
    0.35, -0.5, 0, 0, -0.4, -0.3, 0, -0.35, -0.1, 0.35, -0.4, -0.3, 0, -0.2,
    -0.4, 0.25,
    // Sides - right
    0.35, 0.7, 0.35, 0.4, 0.3, 0.4, 0.5, 0.5, 0, 0.4, 0.3, 0.4, 0.5, 0, 0, 0.5,
    0.5, 0, 0.4, 0.3, 0.4, 0.35, -0.1, 0.35, 0.5, 0, 0, 0.35, -0.1, 0.35, 0.4,
    -0.3, 0, 0.5, 0, 0, 0.35, -0.1, 0.35, 0.2, -0.4, 0.25, 0.4, -0.3, 0,
    // Back
    -0.5, 0.5, 0, -0.4, 0.7, -0.2, -0.5, 0, 0, -0.5, 0, 0, -0.4, 0.7, -0.2,
    -0.3, 0, -0.3, 0.5, 0.5, 0, 0.5, 0, 0, 0.4, 0.7, -0.2, 0.5, 0, 0, 0.3, 0,
    -0.3, 0.4, 0.7, -0.2,
    // Top
    0, 0.8, 0.4, 0.35, 0.7, 0.35, 0, 0.9, 0, 0, 0.9, 0, 0.35, 0.7, 0.35, 0.4,
    0.7, -0.2, -0.35, 0.7, 0.35, 0, 0.9, 0, 0, 0.8, 0.4, -0.35, 0.7, 0.35, -0.4,
    0.7, -0.2, 0, 0.9, 0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  return geometry;
}

// Stylized hair spikes (Chung's iconic red hair)
function HairSpikes({ color }: { color: string }) {
  const spikesRef = useRef<THREE.Group>(null);

  const spikes = useMemo(() => {
    const spikeData: {
      position: [number, number, number];
      rotation: [number, number, number];
      scale: number;
    }[] = [];

    // Back spikes (larger, more dramatic)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI + Math.PI * 0.1;
      const radius = 0.3 + Math.random() * 0.1;
      spikeData.push({
        position: [
          Math.sin(angle) * radius,
          0.6 + Math.random() * 0.3,
          Math.cos(angle) * radius - 0.2,
        ],
        rotation: [
          -0.3 + Math.random() * 0.2,
          angle + Math.PI,
          Math.random() * 0.3 - 0.15,
        ],
        scale: 0.8 + Math.random() * 0.4,
      });
    }

    // Top spikes
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 0.15 + Math.random() * 0.1;
      spikeData.push({
        position: [
          Math.sin(angle) * radius,
          0.85 + Math.random() * 0.1,
          Math.cos(angle) * radius,
        ],
        rotation: [-0.5 + Math.random() * 0.3, angle, Math.random() * 0.2],
        scale: 0.5 + Math.random() * 0.3,
      });
    }

    // Side spikes
    for (let i = 0; i < 6; i++) {
      const side = i < 3 ? -1 : 1;
      const idx = i % 3;
      spikeData.push({
        position: [
          side * (0.4 + Math.random() * 0.1),
          0.3 + idx * 0.2,
          0.1 + Math.random() * 0.1,
        ],
        rotation: [0, side * (Math.PI / 3), side * (0.3 + Math.random() * 0.2)],
        scale: 0.4 + Math.random() * 0.2,
      });
    }

    return spikeData;
  }, []);

  useFrame((state) => {
    if (spikesRef.current) {
      // Subtle hair movement
      spikesRef.current.children.forEach((spike, i) => {
        const offset = i * 0.5;
        spike.rotation.z +=
          Math.sin(state.clock.elapsedTime * 2 + offset) * 0.001;
      });
    }
  });

  return (
    <group ref={spikesRef}>
      {spikes.map((spike, i) => (
        <mesh
          key={i}
          position={spike.position}
          rotation={spike.rotation}
          scale={spike.scale}
        >
          <coneGeometry args={[0.08, 0.4, 4]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

// Eyes with glow effect
function Eyes({ lookTarget }: { lookTarget: THREE.Vector3 }) {
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    [leftEyeRef, rightEyeRef].forEach((ref, i) => {
      if (ref.current) {
        // Look toward target with constraints
        const eyePos = ref.current.position.clone();
        const direction = lookTarget.clone().sub(eyePos).normalize();
        const maxRotation = 0.3;

        ref.current.rotation.x = THREE.MathUtils.clamp(
          -direction.y * 0.5,
          -maxRotation,
          maxRotation
        );
        ref.current.rotation.y = THREE.MathUtils.clamp(
          direction.x * 0.5,
          -maxRotation,
          maxRotation
        );
      }
    });
  });

  return (
    <group>
      {/* Left eye */}
      <group position={[-0.12, 0.35, 0.35]}>
        {/* Eye white */}
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Iris */}
        <mesh ref={leftEyeRef} position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#8B4513"
            emissive="#ff6600"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Pupil */}
        <mesh position={[0, 0, 0.055]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Right eye */}
      <group position={[0.12, 0.35, 0.35]}>
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#8B4513"
            emissive="#ff6600"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
}

// Tattoo markings (Chung's iconic facial tattoos)
function TattooMarkings() {
  return (
    <group>
      {/* Eyebrow markings - left */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`left-${i}`}
          position={[-0.15 - i * 0.08, 0.5 + i * 0.05, 0.32]}
        >
          <boxGeometry args={[0.06, 0.015, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      {/* Eyebrow markings - right */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`right-${i}`}
          position={[0.15 + i * 0.08, 0.5 + i * 0.05, 0.32]}
        >
          <boxGeometry args={[0.06, 0.015, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  );
}

// Main avatar component
function Avatar({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headGeometry = useMemo(() => createHeadGeometry(), []);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 5));

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation toward mouse
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );

      // Subtle idle animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Update look target for eyes
      lookTarget.current.set(mousePosition.x * 3, mousePosition.y * 2, 5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.8}>
        {/* Head base */}
        <mesh geometry={headGeometry}>
          <meshStandardMaterial
            color="#f5d0c5"
            roughness={0.8}
            metalness={0}
            flatShading
          />
        </mesh>

        {/* Hair */}
        <HairSpikes color="#cc2200" />

        {/* Eyes */}
        <Eyes lookTarget={lookTarget.current} />

        {/* Tattoos */}
        <TattooMarkings />

        {/* Neck */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.3, 6]} />
          <meshStandardMaterial color="#f5d0c5" roughness={0.8} flatShading />
        </mesh>

        {/* Collar/Shirt hint */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 0.2, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} flatShading />
        </mesh>
      </group>
    </Float>
  );
}

// Orbiting skill icons
function OrbitingSkills() {
  const groupRef = useRef<THREE.Group>(null);

  const skillIcons = useMemo(
    () => [
      { emoji: "🐍", color: "#3776ab", angle: 0 },
      { emoji: "🔥", color: "#ee4c2c", angle: Math.PI * 0.33 },
      { emoji: "🐳", color: "#2496ed", angle: Math.PI * 0.66 },
      { emoji: "☁️", color: "#ff9900", angle: Math.PI },
      { emoji: "⚛️", color: "#61dafb", angle: Math.PI * 1.33 },
      { emoji: "🤖", color: "#10b981", angle: Math.PI * 1.66 },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {skillIcons.map((skill, i) => {
        const radius = 2.5;
        const y = Math.sin(i * 0.8) * 0.5;

        return (
          <group
            key={i}
            position={[
              Math.cos(skill.angle) * radius,
              y,
              Math.sin(skill.angle) * radius,
            ]}
          >
            <mesh>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* Glow */}
            <mesh>
              <sphereGeometry args={[0.25, 8, 8]} />
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SceneContent({ mousePosition }: AvatarSceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#06b6d4" />

      <Avatar mousePosition={mousePosition} />
      <OrbitingSkills />

      <Environment preset="city" />
    </>
  );
}

export function AvatarScene({ mousePosition }: AvatarSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
