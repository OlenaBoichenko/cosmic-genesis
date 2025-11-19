"use client";

import { motion } from "framer-motion";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import BlackHole from "@/components/cosmic/BlackHole";
import TextPanel from "@/components/ui/TextPanel";

export default function BlackHoleScene() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*Black hole with gravitational effects */}
      <Scene cameraPosition={[0, 5, 20]} bloomIntensity={2.8}>
        <Starfield count={10000} radius={150} speed={0.02} />

        {/* Black hole with accretion disk and lensing */}
        <BlackHole />

        {/* Distant background stars being lensed */}
        <Starfield count={3000} radius={200} speed={0.01} />
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-cosmic mb-2 md:mb-6"
              >
                BLACK HOLE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-sm sm:text-xl md:text-2xl text-cyan-200 font-light tracking-widest mb-3 md:mb-8"
              >
                GRAVITY'S TRIUMPH
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-xs sm:text-sm md:text-base text-cyan-100/90 tracking-wide mb-4 md:mb-10 leading-relaxed hidden sm:block"
              >
                <p>
                  A point of infinite density warps spacetime itself.
                  <br className="hidden md:block" />
                  Light bends around the event horizon, unable to escape.
                </p>
              </motion.div>

              {/* Black hole statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-2 md:gap-6 mb-3 md:mb-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">
                    10⁶ M☉
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    MASS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">
                    10⁷ °K
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    TEMP
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">∞</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    DENSITY
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.2 }}
                className="bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20 space-y-1 md:space-y-2 hidden sm:block"
              >
                <p className="text-cyan-200 text-[10px] sm:text-xs md:text-sm">
                  <span className="font-semibold">Event Horizon:</span> Point of no return
                </p>
                <p className="text-cyan-200 text-[10px] sm:text-xs md:text-sm hidden md:block">
                  <span className="font-semibold">Photon Sphere:</span> Light orbits
                </p>
                <p className="text-cyan-200 text-[10px] sm:text-xs md:text-sm hidden md:block">
                  <span className="font-semibold">Lensing:</span> Spacetime curvature
                </p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
