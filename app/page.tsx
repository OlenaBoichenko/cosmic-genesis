"use client";

import { motion } from "framer-motion";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import Nebula from "@/components/cosmic/Nebula";
import Planet from "@/components/cosmic/Planet";
import TextPanel from "@/components/ui/TextPanel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background starfield with planets and nebulae */}
      <Scene cameraPosition={[0, 5, 40]} bloomIntensity={2}>
        {/* Background starfield - 15,000 stars */}
        <Starfield count={15000} radius={150} speed={0.05} />

        {/* Colorful nebula clouds for depth and atmosphere */}
        <Nebula
          count={4000}
          color1="#ff006e"
          color2="#8338ec"
          spread={30}
        />
        <Nebula
          count={3000}
          color1="#06ffa5"
          color2="#0077ff"
          spread={25}
        />

        {/* Central blue planet - Main focus */}
        <Planet
          position={[0, 0, 0]}
          radius={3}
          color="#4a90e2"
          emissive="#1e3a8a"
          atmosphereColor="#60a5fa"
          rotationSpeed={0.05}
          hasAtmosphere={true}
        />

        {/* Red planet - Upper left */}
        <Planet
          position={[-8, 3, -5]}
          radius={1.5}
          color="#ef4444"
          emissive="#7f1d1d"
          atmosphereColor="#fca5a5"
          rotationSpeed={0.08}
          hasAtmosphere={true}
        />

        {/* Green planet - Lower right */}
        <Planet
          position={[10, -2, -8]}
          radius={1.8}
          color="#22c55e"
          emissive="#14532d"
          atmosphereColor="#86efac"
          rotationSpeed={0.06}
          hasAtmosphere={true}
        />
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-7xl md:text-8xl font-bold text-cosmic mb-6 pulse-glow"
              >
                GENESIS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-2xl text-cyan-200 font-light tracking-widest mb-8"
              >
                THE BIRTH OF WORLDS
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-base text-cyan-100/90 tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                <p>
                  Witness the formation of planets from cosmic dust and gas.
                  <br />
                  Explore the universe at the moment of creation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-6 max-w-xl mx-auto"
              >
                <div className="text-center bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cosmic mb-2">15,000</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    STARS
                  </div>
                </div>
                <div className="text-center bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cosmic mb-2">7,000</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    NEBULA
                  </div>
                </div>
                <div className="text-center bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-cyan-500/20">
                  <div className="text-4xl font-bold text-cosmic mb-2">3</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    WORLDS
                  </div>
                </div>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
