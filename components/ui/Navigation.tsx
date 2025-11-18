"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const scenes = [
  { href: "/", label: "GENESIS", icon: "✦" },
  { href: "/scenes/planet-birth", label: "PLANET BIRTH", icon: "◉" },
  { href: "/scenes/supernova", label: "SUPERNOVA", icon: "✸" },
  { href: "/scenes/solaris", label: "SOLARIS", icon: "≈" },
  { href: "/scenes/galaxy", label: "GALAXY", icon: "◈" },
  { href: "/scenes/black-hole", label: "BLACK HOLE", icon: "●" },
  { href: "/scenes/quasar", label: "QUASAR", icon: "◆" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-6 content-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center backdrop-blur-sm bg-black/20 rounded-full px-8 py-4 border border-cyan-500/20">
          <motion.div
            className="text-xl font-bold text-cosmic tracking-widest"
            whileHover={{ scale: 1.05 }}
          >
            COSMIC GENESIS
          </motion.div>

          <div className="flex gap-6">
            {scenes.map((scene) => {
              const isActive = pathname === scene.href;
              return (
                <Link key={scene.href} href={scene.href}>
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider cursor-pointer relative ${
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
                    <span>{scene.label}</span>
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
        </div>
      </div>
    </motion.nav>
  );
}
