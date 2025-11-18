"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface NebulaProps {
  count?: number;
  color1?: string;
  color2?: string;
  spread?: number;
}

export default function Nebula({
  count = 5000,
  color1 = "#ff006e",
  color2 = "#8338ec",
  spread = 20,
}: NebulaProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Create clustered nebula effect
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.5) * spread;
      const height = (Math.random() - 0.5) * spread * 0.3;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Gradient colors
      const mixRatio = Math.random();
      const color = color1Obj.clone().lerp(color2Obj, mixRatio);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, color1, color2, spread]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta;

    // Rotate nebula slowly
    pointsRef.current.rotation.y += delta * 0.05;

    // Pulsate opacity
    const pulsate = Math.sin(timeRef.current * 0.5) * 0.2 + 0.8;
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.opacity = pulsate * 0.6;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      colors={colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}
