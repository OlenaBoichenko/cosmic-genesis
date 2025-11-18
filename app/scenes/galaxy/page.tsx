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
                GALAXY
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-2xl text-cyan-200 font-light tracking-widest mb-8"
              >
                SPIRAL OF CREATION
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-base text-cyan-100/90 tracking-wide mb-10 leading-relaxed"
              >
                <p>
                  Billions of stars dance in a cosmic ballet.
                  <br />
                  A supermassive black hole anchors them all.
                  <br />
                  Each point of light - a sun, perhaps with worlds of its own.
                </p>
              </motion.div>

              {/* Galaxy statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-6 mb-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">20,000</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    VISIBLE STARS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">100K</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    LIGHT YEARS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20">
                  <div className="text-3xl font-bold text-cosmic mb-2">∞</div>
                  <div className="text-sm text-cyan-200/80 tracking-wider">
                    POSSIBILITIES
                  </div>
                </div>
              </motion.div>

              {/* Carl Sagan quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.2 }}
                className="text-center text-cyan-300/70 text-sm italic"
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
