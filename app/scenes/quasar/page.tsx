"use client";

import { motion } from "framer-motion";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import Quasar from "@/components/cosmic/Quasar";
import Nebula from "@/components/cosmic/Nebula";
import TextPanel from "@/components/ui/TextPanel";

export default function QuasarScene() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*Quasar with energy jets */}
      <Scene cameraPosition={[8, 8, 25]} bloomIntensity={3.2}>
        <Starfield count={12000} radius={180} speed={0.03} />

        {/* Purple/blue radiation nebula around quasar */}
        <Nebula count={3000} color1="#a855f7" color2="#3b82f6" spread={40} />

        {/* Central quasar - Active galactic nucleus */}
        <Quasar />

        {/* Additional cosmic dust */}
        <Nebula count={2000} color1="#fbbf24" color2="#f97316" spread={50} />
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
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-nebula mb-2 md:mb-6"
              >
                QUASAR
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-sm sm:text-xl md:text-2xl text-purple-200 font-light tracking-widest mb-3 md:mb-8"
              >
                UNIVERSE'S LIGHTHOUSE
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-xs sm:text-sm md:text-base text-purple-100/90 tracking-wide mb-4 md:mb-10 leading-relaxed hidden sm:block"
              >
                <p>
                  An active galactic nucleus powered by a supermassive black hole.
                  <br className="hidden md:block" />
                  Twin jets of matter shoot outward at near light-speed.
                </p>
              </motion.div>

              {/* Quasar statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-2 md:gap-6 mb-3 md:mb-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-purple-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-nebula mb-0.5 md:mb-2">
                    10⁴⁰
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-purple-200/80 tracking-wider">
                    WATTS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-purple-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-nebula mb-0.5 md:mb-2">
                    0.99c
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-purple-200/80 tracking-wider">
                    VELOCITY
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-purple-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-nebula mb-0.5 md:mb-2">10⁹</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-purple-200/80 tracking-wider">
                    LY
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.2 }}
                className="bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-purple-400/20 space-y-1 md:space-y-2 hidden sm:block"
              >
                <p className="text-purple-200 text-[10px] sm:text-xs md:text-sm">
                  <span className="font-semibold">Type:</span> Active Galactic Nucleus (AGN)
                </p>
                <p className="text-purple-200 text-[10px] sm:text-xs md:text-sm hidden md:block">
                  <span className="font-semibold">Power:</span> Supermassive black hole
                </p>
                <p className="text-purple-200 text-[10px] sm:text-xs md:text-sm hidden md:block">
                  <span className="font-semibold">Jets:</span> Twin beams at light-speed
                </p>
              </motion.div>

              {/* Fun fact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.6 }}
                className="text-center text-purple-300/70 text-[10px] sm:text-xs md:text-sm italic mt-3 md:mt-6 hidden md:block"
              >
                <p>
                  "A quasar can outshine 100 billion stars"
                </p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
