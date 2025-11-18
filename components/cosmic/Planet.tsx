"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  emissive?: string;
  atmosphereColor?: string;
  rotationSpeed?: number;
  hasAtmosphere?: boolean;
}

export default function Planet({
  position = [0, 0, 0],
  radius = 2,
  color = "#3b82f6",
  emissive = "#1e40af",
  atmosphereColor = "#60a5fa",
  rotationSpeed = 0.1,
  hasAtmosphere = true,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Create procedural planet texture
  const planetTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Base color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 512, 512);

    // Add noise/continents
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 50 + 10;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(0, 0, 0, ${Math.random() * 0.3})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color]);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotationSpeed;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * rotationSpeed * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Planet */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          color={color}
          emissive={emissive}
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere */}
      {hasAtmosphere && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[radius * 1.1, 64, 64]} />
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Atmospheric glow */}
      {hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[radius * 1.15, 64, 64]} />
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.05}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}
