"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LivingOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.5, 128);
    const positionAttribute = geo.getAttribute("position");

    // Store original positions
    const originalPositions = new Float32Array(positionAttribute.count * 3);
    for (let i = 0; i < positionAttribute.count; i++) {
      originalPositions[i * 3] = positionAttribute.getX(i);
      originalPositions[i * 3 + 1] = positionAttribute.getY(i);
      originalPositions[i * 3 + 2] = positionAttribute.getZ(i);
    }
    geo.setAttribute("originalPosition", new THREE.BufferAttribute(originalPositions, 3));

    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta;

    const positionAttribute = geometry.getAttribute("position");
    const originalPositionAttribute = geometry.getAttribute("originalPosition");

    // Create organic wave patterns
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = originalPositionAttribute.getX(i);
      const y = originalPositionAttribute.getY(i);
      const z = originalPositionAttribute.getZ(i);

      // Multiple wave frequencies for complex motion
      const wave1 = Math.sin(x * 0.5 + timeRef.current * 1.2) * 0.15;
      const wave2 = Math.sin(y * 0.7 + timeRef.current * 0.8) * 0.12;
      const wave3 = Math.sin(z * 0.6 + timeRef.current * 1.5) * 0.18;
      const wave4 = Math.sin((x + y + z) * 0.3 + timeRef.current * 0.5) * 0.1;

      const displacement = wave1 + wave2 + wave3 + wave4;

      positionAttribute.setXYZ(
        i,
        x * (1 + displacement),
        y * (1 + displacement),
        z * (1 + displacement)
      );
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    // Gentle rotation
    meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#1e3a8a"
        emissive="#7c3aed"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.9}
        wireframe={false}
      />
    </mesh>
  );
}
