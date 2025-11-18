"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SupernovaProps {
  count?: number;
  explosionRadius?: number;
}

export default function Supernova({
  count = 8000,
  explosionRadius = 20,
}: SupernovaProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const [positions, velocities, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Start from center
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      // Random explosion direction
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.5 + Math.random() * 1.5;

      velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i3 + 2] = Math.cos(phi) * speed;

      // Color gradient from white to orange to red
      const colorMix = Math.random();
      if (colorMix < 0.3) {
        // White hot core
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (colorMix < 0.7) {
        // Orange
        colors[i3] = 1;
        colors[i3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i3 + 2] = 0.1;
      } else {
        // Red outer shell
        colors[i3] = 1;
        colors[i3 + 1] = 0.1;
        colors[i3 + 2] = 0.1;
      }

      sizes[i] = Math.random() * 3 + 1;
    }

    return [positions, velocities, colors, sizes];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta;

    const positionAttribute = pointsRef.current.geometry.getAttribute("position");
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Expand explosion
      positions[i3] += velocities[i3] * delta * 5;
      positions[i3 + 1] += velocities[i3 + 1] * delta * 5;
      positions[i3 + 2] += velocities[i3 + 2] * delta * 5;

      // Add some turbulence
      positions[i3] += Math.sin(timeRef.current + i) * 0.01;
      positions[i3 + 1] += Math.cos(timeRef.current + i) * 0.01;

      // Reset if too far
      const distance = Math.sqrt(
        positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
      );

      if (distance > explosionRadius) {
        positions[i3] = 0;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = 0;
      }
    }

    positionAttribute.needsUpdate = true;

    // Pulse the material
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      const pulsate = Math.sin(timeRef.current * 2) * 0.3 + 0.7;
      pointsRef.current.material.opacity = pulsate;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      colors={colors}
      sizes={sizes}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}
