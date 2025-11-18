"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const [positions, colors, sizes] = useMemo(() => {
    const count = 20000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorCore = new THREE.Color("#ffffff");
    const colorArms = new THREE.Color("#4a9eff");
    const colorOuter = new THREE.Color("#ff006e");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spiral galaxy shape
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.7) * 15;

      // Create spiral arms
      const spiralAngle = angle + radius * 0.5;
      const armOffset = Math.sin(angle * 4) * 0.5;

      const x = Math.cos(spiralAngle) * radius;
      const z = Math.sin(spiralAngle) * radius;
      const y = (Math.random() - 0.5) * 0.5 * (1 - radius / 15);

      positions[i3] = x + armOffset;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z + armOffset;

      // Color gradient from core to arms
      const radiusRatio = radius / 15;
      let color;

      if (radiusRatio < 0.2) {
        color = colorCore.clone();
      } else if (radiusRatio < 0.6) {
        color = colorCore.clone().lerp(colorArms, (radiusRatio - 0.2) / 0.4);
      } else {
        color = colorArms.clone().lerp(colorOuter, (radiusRatio - 0.6) / 0.4);
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Size based on distance from center
      sizes[i] = Math.random() * 2 + (1 - radiusRatio) * 2;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta;

    // Rotate galaxy
    pointsRef.current.rotation.y += delta * 0.05;

    // Add some vertical oscillation
    pointsRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.5;
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
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
    </group>
  );
}
