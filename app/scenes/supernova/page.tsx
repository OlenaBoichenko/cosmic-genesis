"use client";

import { motion } from "framer-motion";
import * as THREE from "three";
import Scene from "@/components/cosmic/Scene";
import Starfield from "@/components/cosmic/Starfield";
import Supernova from "@/components/cosmic/Supernova";
import TextPanel from "@/components/ui/TextPanel";


export default function SupernovaScene() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Exploding star with expanding particles */}
      <Scene cameraPosition={[0, 0, 35]} bloomIntensity={3}>
        <Starfield count={12000} radius={150} speed={0.1} />

        {/* Main explosion - 10,000 expanding particles */}
        <Supernova count={10000} explosionRadius={25} />

        {/* White hot core remnant */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        {/* Concentric shockwave rings */}
        {[1, 2, 3, 4].map((ring) => (
          <mesh key={ring} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring * 5, 0.05, 16, 100]} />
            <meshBasicMaterial
              color="#ff4500"
              transparent
              opacity={0.3 / ring}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
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
                className="text-6xl md:text-7xl font-bold text-supernova mb-6"
              >
                SUPERNOVA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-2xl text-orange-200 font-light tracking-widest mb-8"
              >
                THE DEATH OF A STAR
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                className="text-base text-orange-100/90 tracking-wide mb-10 leading-relaxed"
              >
                <p>
                  A massive star collapses and explodes in a catastrophic event.
                  <br />
                  For a brief moment, it outshines entire galaxies.
                  <br />
                  Seeds of new worlds are scattered across the cosmos.
                </p>
              </motion.div>

              {/* Energy statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.8 }}
                className="grid grid-cols-3 gap-6"
              >
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-orange-400/20">
                  <div className="text-3xl font-bold text-supernova mb-2">10¹⁰</div>
                  <div className="text-sm text-orange-200/80 tracking-wider">
                    SUNS BRIGHTNESS
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-orange-400/20">
                  <div className="text-3xl font-bold text-supernova mb-2">10⁴⁴</div>
                  <div className="text-sm text-orange-200/80 tracking-wider">
                    JOULES ENERGY
                  </div>
                </div>
                <div className="text-center bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-orange-400/20">
                  <div className="text-3xl font-bold text-supernova mb-2">∞</div>
                  <div className="text-sm text-orange-200/80 tracking-wider">
                    NEW BEGINNINGS
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
