"use client";

import { motion } from "framer-motion";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import LivingOcean from "@/components/cosmic/LivingOcean";
import Nebula from "@/components/cosmic/Nebula";
import TextPanel from "@/components/ui/TextPanel";

export default function Solaris() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*Living ocean planet */}
      <Scene cameraPosition={[0, 3, 15]} bloomIntensity={1.8}>
        <Starfield count={6000} radius={100} speed={0.02} />

        {/* Purple/blue nebula atmosphere */}
        <Nebula count={2000} color1="#7c3aed" color2="#1e3a8a" spread={30} />

        {/* Central living ocean - Animated with 4 wave frequencies */}
        <LivingOcean />

        {/* Glowing particles orbiting the planet */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2;
          const radius = 5 + Math.sin(i * 0.5) * 1;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(i * 0.3) * 2;

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial
                color="#a855f7"
                transparent
                opacity={0.6}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </Scene>

      {/* Text Content */}
      <div className="content-overlay">
        <div className="flex items-center justify-start min-h-screen px-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="max-w-xl"
          >
            <TextPanel>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-6xl md:text-7xl font-bold text-nebula mb-6"
              >
                SOLARIS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-2xl text-purple-200 font-light tracking-widest mb-8"
              >
                THE THINKING OCEAN
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-base text-purple-100/90 tracking-wide mb-10 leading-relaxed"
              >
                <p>
                  A sentient ocean covers an entire world.
                  <br />
                  Its liquid surface pulses with alien thought.
                  <br />
                  We do not understand it. Perhaps it does not understand us.
                </p>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-purple-400/20 space-y-2"
              >
                <p className="text-purple-200 text-sm">
                  <span className="font-semibold">Classification:</span> Xenobiological Entity
                </p>
                <p className="text-purple-200 text-sm">
                  <span className="font-semibold">Intelligence Level:</span> Unknown
                </p>
                <p className="text-purple-200 text-sm">
                  <span className="font-semibold">Communication Attempts:</span> 147 Failed
                </p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
