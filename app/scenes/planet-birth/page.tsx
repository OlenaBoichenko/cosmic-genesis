"use client";

import { motion } from "framer-motion";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import Nebula from "@/components/cosmic/Nebula";
import Planet from "@/components/cosmic/Planet";
import TextPanel from "@/components/ui/TextPanel";

export default function PlanetBirth() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*Young planet with accretion disk */}
      <Scene cameraPosition={[15, 10, 25]} bloomIntensity={2.5}>
        <Starfield count={8000} radius={120} speed={0.02} />

        {/* Hot gas accretion disk (rotated 90 degrees) */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <Nebula count={6000} color1="#ff8800" color2="#ff4400" spread={15} />
        </group>

        {/* Central molten planet - Hot orange/red surface */}
        <Planet
          position={[0, 0, 0]}
          radius={4}
          color="#ff4500"
          emissive="#ff2200"
          atmosphereColor="#ff6600"
          rotationSpeed={0.15}
          hasAtmosphere={true}
        />

        {/* Asteroid belt - 20 orbiting debris */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 12 + Math.random() * 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 2;

          return (
            <mesh
              key={i}
              position={[x, y, z]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            >
              <dodecahedronGeometry args={[0.2 + Math.random() * 0.3, 0]} />
              <meshStandardMaterial
                color="#8b4513"
                emissive="#ff4500"
                emissiveIntensity={0.1}
                roughness={0.9}
              />
            </mesh>
          );
        })}

        {/* Ambient dust particles */}
        <Nebula count={3000} color1="#ffd700" color2="#ff6347" spread={20} />
      </Scene>

      {/* Text Content*/}
      <div className="content-overlay">
        <div className="flex items-end md:items-center justify-start min-h-screen px-3 md:px-8 pb-8 md:pb-0 pt-24 md:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="max-w-xl w-full"
          >
            <TextPanel>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-supernova mb-2 md:mb-6"
              >
                PLANET BIRTH
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-sm sm:text-xl md:text-2xl text-orange-200 font-light tracking-widest mb-3 md:mb-8"
              >
                ACCRETION & FORMATION
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-xs sm:text-sm md:text-base text-orange-100/90 tracking-wide mb-4 md:mb-10 leading-relaxed hidden sm:block"
              >
                <p>
                  A molten world forms from colliding asteroids and cosmic debris.
                  <br className="hidden md:block" />
                  The heat of formation glows like a newborn star.
                </p>
              </motion.div>

              {/* Stats panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-orange-400/20"
              >
                <p className="text-orange-200 text-[10px] sm:text-xs md:text-sm tracking-wider">
                  <span className="font-semibold">Temp:</span> 2,500°K
                  <span className="hidden sm:inline"> • </span>
                  <br className="sm:hidden" />
                  <span className="font-semibold">Mass:</span> 0.8 Earth
                  <span className="hidden sm:inline"> • </span>
                  <br className="sm:hidden" />
                  <span className="font-semibold">Age:</span> 10M Years
                </p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
