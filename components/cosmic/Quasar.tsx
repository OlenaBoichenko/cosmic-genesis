"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Quasar() {
  const topJetRef = useRef<THREE.Points>(null);
  const bottomJetRef = useRef<THREE.Points>(null);
  const diskRef = useRef<THREE.Points>(null);
  const radiationRef = useRef<THREE.Points>(null);

  // Energy jets - Twin beams shooting from poles
  const jetParticles = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    const sizes = new Float32Array(3000);
    const velocities = new Float32Array(3000);

    for (let i = 0; i < 3000; i++) {
      const distance = Math.random() * 20;
      const spread = (distance / 20) * 0.5; // Expanding cone shape
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * spread;
      positions[i * 3 + 1] = distance;
      positions[i * 3 + 2] = Math.sin(angle) * spread;

      // Color: bright blue-white core -> purple edges
      const distNorm = distance / 20;
      if (distNorm < 0.3) {
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0.6;
        colors[i * 3 + 1] = 0.3;
        colors[i * 3 + 2] = 1;
      }

      sizes[i] = 0.1 + Math.random() * 0.2;
      velocities[i] = 0.1 + Math.random() * 0.2;
    }

    return { positions, colors, sizes, velocities };
  }, []);

  // Accretion disk particles
  const diskParticles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    const sizes = new Float32Array(5000);

    for (let i = 0; i < 5000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      const height = (Math.random() - 0.5) * 0.2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Ultra-hot disk: white -> yellow -> orange
      const radiusNorm = (radius - 1.5) / 2.5;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1 - radiusNorm * 0.4;
      colors[i * 3 + 2] = 1 - radiusNorm * 0.8;

      sizes[i] = 0.08 + Math.random() * 0.12;
    }

    return { positions, colors, sizes };
  }, []);

  // Radiation cloud around the quasar
  const radiationParticles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    const sizes = new Float32Array(2000);

    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 5 + Math.random() * 3;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Violet/UV radiation
      colors[i * 3] = 0.7;
      colors[i * 3 + 1] = 0.4;
      colors[i * 3 + 2] = 1;

      sizes[i] = 0.15 + Math.random() * 0.25;
    }

    return { positions, colors, sizes };
  }, []);

  // Animate jets shooting outward
  useFrame((state) => {
    [topJetRef, bottomJetRef].forEach((ref) => {
      if (ref.current) {
        const positions = ref.current.geometry.attributes.position
          .array as Float32Array;
        const velocities = jetParticles.velocities;

        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] += velocities[i];

          // Reset particles that go too far
          if (Math.abs(positions[i * 3 + 1]) > 20) {
            positions[i * 3 + 1] = 0;
            const angle = Math.random() * Math.PI * 2;
            positions[i * 3] = Math.cos(angle) * 0.2;
            positions[i * 3 + 2] = Math.sin(angle) * 0.2;
          }
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
      }
    });

    // Rotate accretion disk
    if (diskRef.current) {
      diskRef.current.rotation.y += 0.01;
    }

    // Pulsate radiation cloud
    if (radiationRef.current) {
      const pulse = 0.8 + 0.2 * Math.sin(state.clock.elapsedTime * 2);
      const material = radiationRef.current.material as THREE.PointsMaterial;
      material.opacity = pulse * 0.3;
      radiationRef.current.rotation.y += 0.002;
      radiationRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group>
      {/* Ultra-bright core - Active galactic nucleus */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#a0d0ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Accretion disk */}
      <points ref={diskRef} rotation={[Math.PI / 2, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[diskParticles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[diskParticles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[diskParticles.sizes, 1]}
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

      {/* Top energy jet (upward) */}
      <points ref={topJetRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[jetParticles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[jetParticles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[jetParticles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Bottom energy jet (downward) */}
      <points ref={bottomJetRef} rotation={[Math.PI, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(jetParticles.positions), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[new Float32Array(jetParticles.colors), 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(jetParticles.sizes), 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Radiation cloud */}
      <points ref={radiationRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[radiationParticles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[radiationParticles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[radiationParticles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          vertexColors
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
