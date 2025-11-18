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
                className="text-6xl md:text-7xl font-bold text-cosmic mb-6"
              >
                BLACK HOLE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-2xl text-cyan-200 font-light tracking-widest mb-8"
              >
                GRAVITY'S ULTIMATE TRIUMPH
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-base text-cyan-100/90 tracking-wide mb-10 leading-relaxed"
              >
                <p>
                  A point of infinite density warps spacetime itself.
                  <br />
                  Light bends around the event horizon, unable to escape.
                  <br />
                  Matter spirals inward, heating to millions of degrees before
                  vanishing forever.
                </p>
              </motion.div>

              {/* Black hole statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-6 mb-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">
                    10⁶ M☉
                  </div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    SOLAR MASSES
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">
                    10⁷ °K
                  </div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    DISK TEMP
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">∞</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    DENSITY
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.2 }}
                className="bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20 space-y-2"
              >
                <p className="text-cyan-200 text-sm">
                  <span className="font-semibold">Event Horizon:</span> Point of
                  no return
                </p>
                <p className="text-cyan-200 text-sm">
                  <span className="font-semibold">Photon Sphere:</span> Light
                  orbits the black hole
                </p>
                <p className="text-cyan-200 text-sm">
                  <span className="font-semibold">Gravitational Lensing:</span>{" "}
                  Spacetime curvature bends light
                </p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
