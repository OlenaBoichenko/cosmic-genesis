"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface StarfieldProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export default function Starfield({
  count = 10000,
  radius = 100,
  speed = 0.1,
}: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute stars in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Star colors (white to blue-ish)
      const colorVariation = Math.random();
      colors[i3] = 0.8 + colorVariation * 0.2; // R
      colors[i3 + 1] = 0.9 + colorVariation * 0.1; // G
      colors[i3 + 2] = 1; // B

      // Varying sizes for depth
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow rotation for parallax effect
    pointsRef.current.rotation.y += delta * speed * 0.05;
    pointsRef.current.rotation.x += delta * speed * 0.02;
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
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}
