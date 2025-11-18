"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ReactNode, Suspense, useState, useEffect } from "react";
import { BlendFunction } from "postprocessing";

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  bloomIntensity?: number;
}

export default function Scene({
  children,
  cameraPosition = [0, 0, 30],
  enableControls = true,
  bloomIntensity = 1.5,
}: SceneProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-cyan-400 text-sm animate-pulse">Loading 3D Scene...</div>
      </div>
    );
  }

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />

        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={10}
            maxDistance={100}
            autoRotate
            autoRotateSpeed={0.3}
          />
        )}

        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

        {children}

        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0005]}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
