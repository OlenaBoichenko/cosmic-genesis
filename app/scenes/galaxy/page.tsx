"use client";

import { motion } from "framer-motion";
import * as THREE from "three";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import Galaxy from "@/components/cosmic/Galaxy";
import TextPanel from "@/components/ui/TextPanel";

export default function GalaxyScene() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*Spiral galaxy formation */}
      <Scene cameraPosition={[0, 15, 30]} bloomIntensity={2.2}>
        <Starfield count={5000} radius={200} speed={0.01} />

        {/* Main spiral galaxy - 20,000 procedurally generated stars */}
        <Galaxy />

        {/* Central supermassive black hole (white glow) */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        {/* Accretion disk around black hole */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.1, 16, 100]} />
          <meshBasicMaterial
            color="#ff006e"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
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
                GALAXY
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-sm sm:text-xl md:text-2xl text-cyan-200 font-light tracking-widest mb-3 md:mb-8"
              >
                SPIRAL OF CREATION
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-xs sm:text-sm md:text-base text-cyan-100/90 tracking-wide mb-4 md:mb-10 leading-relaxed hidden sm:block"
              >
                <p>
                  Billions of stars dance in a cosmic ballet.
                  <br className="hidden md:block" />
                  A supermassive black hole anchors them all.
                </p>
              </motion.div>

              {/* Galaxy statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-2 md:gap-6 mb-3 md:mb-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">20K</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    STARS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">100K</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    LY
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-2 md:p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-cosmic mb-0.5 md:mb-2">∞</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-wider">
                    WORLDS
                  </div>
                </div>
              </motion.div>

              {/* Carl Sagan quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.2 }}
                className="text-center text-cyan-300/70 text-[10px] sm:text-xs md:text-sm italic hidden sm:block"
              >
                <p>"We are made of star-stuff" — Carl Sagan</p>
              </motion.div>
            </TextPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
