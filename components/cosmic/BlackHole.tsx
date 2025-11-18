"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BlackHole() {
  const accretionDiskRef = useRef<THREE.Points>(null);
  const lensRingsRef = useRef<THREE.Group>(null);

  // Accretion disk - 8,000 particles in orbital motion
  const accretionParticles = useMemo(() => {
    const positions = new Float32Array(8000 * 3);
    const colors = new Float32Array(8000 * 3);
    const sizes = new Float32Array(8000);

    for (let i = 0; i < 8000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 0.3 * (6 - radius); // Thinner at edges

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color gradient: white hot (inner) -> orange -> red (outer)
      const radiusNorm = (radius - 2) / 4;
      if (radiusNorm < 0.3) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (radiusNorm < 0.7) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.6;
        colors[i * 3 + 2] = 0.2;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.1;
      }

      sizes[i] = 0.05 + Math.random() * 0.1;
    }

    return { positions, colors, sizes };
  }, []);

  // Animate accretion disk rotation
  useFrame((state) => {
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.y += 0.005;

      // Pulsate brightness
      const positions = accretionDiskRef.current.geometry.attributes.position
        .array as Float32Array;
      const colors = accretionDiskRef.current.geometry.attributes.color
        .array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        const radius = Math.sqrt(x * x + z * z);
        const pulseSpeed = 0.5 + radius * 0.1;
        const pulse =
          0.7 + 0.3 * Math.sin(state.clock.elapsedTime * pulseSpeed + i * 0.01);

        // Apply pulse to color brightness
        const baseR = colors[i * 3];
        const baseG = colors[i * 3 + 1];
        const baseB = colors[i * 3 + 2];

        colors[i * 3] = baseR * pulse;
        colors[i * 3 + 1] = baseG * pulse;
        colors[i * 3 + 2] = baseB * pulse;
      }

      accretionDiskRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Animate gravitational lensing rings
    if (lensRingsRef.current) {
      lensRingsRef.current.rotation.y += 0.001;
      lensRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.2;
        ring.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 + i) * 0.2;
      });
    }
  });

  return (
    <group>
      {/* Event Horizon - black sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon sphere - Bright ring at event horizon edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.05, 16, 100]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Accretion disk particles */}
      <points ref={accretionDiskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[accretionParticles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[accretionParticles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[accretionParticles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Gravitational lensing rings - Light bending around black hole */}
      <group ref={lensRingsRef}>
        {[3, 4, 5, 6].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.1, 0, i * 0.3]}>
            <torusGeometry args={[radius, 0.02, 8, 100]} />
            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.15 / (i + 1)}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Radiation glow */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
