"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const scenes = [
  { href: "/", label: "GENESIS", icon: "✦" },
  { href: "/scenes/planet-birth", label: "PLANET BIRTH", icon: "◉" },
  { href: "/scenes/supernova", label: "SUPERNOVA", icon: "✸" },
  { href: "/scenes/galaxy", label: "GALAXY", icon: "◈" },
  { href: "/scenes/black-hole", label: "BLACK HOLE", icon: "●" },
  { href: "/scenes/quasar", label: "QUASAR", icon: "◆" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-3 md:p-6 content-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-black/20 rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4 border border-cyan-500/20">
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.div
                className="text-sm md:text-xl font-bold text-cosmic tracking-widest cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                COSMIC GENESIS
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-4 xl:gap-6">
              {scenes.map((scene) => {
                const isActive = pathname === scene.href;
                return (
                  <Link key={scene.href} href={scene.href}>
                    <motion.div
                      className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full text-xs font-medium tracking-wider cursor-pointer relative ${
                        isActive
                          ? "text-cyan-300 bg-cyan-500/10"
                          : "text-cyan-500/60"
                      }`}
                      whileHover={{
                        scale: 1.05,
                        color: "#67e8f9",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-base">{scene.icon}</span>
                      <span className="hidden xl:inline">{scene.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeScene"
                          className="absolute inset-0 border border-cyan-400/50 rounded-full"
                          style={{
                            boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)",
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-cyan-400 block"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-cyan-400 block"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-cyan-400 block"
              />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-col gap-2">
                  {scenes.map((scene) => {
                    const isActive = pathname === scene.href;
                    return (
                      <Link
                        key={scene.href}
                        href={scene.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-wider cursor-pointer ${
                            isActive
                              ? "text-cyan-300 bg-cyan-500/10 border border-cyan-400/30"
                              : "text-cyan-500/60"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-xl">{scene.icon}</span>
                          <span>{scene.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
