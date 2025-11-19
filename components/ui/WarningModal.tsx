"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WarningModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the warning before
    const hasSeenWarning = localStorage.getItem("hasSeenWarning");
    if (!hasSeenWarning) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenWarning", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-md w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl border-2 border-cyan-500/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

            {/* Content */}
            <div className="relative p-6 sm:p-8">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-cosmic text-center mb-4">
                Content Warning
              </h2>

              {/* Warning text */}
              <div className="text-cyan-100/90 text-sm sm:text-base space-y-3 mb-6 leading-relaxed">
                <p>
                  This experience contains <span className="text-yellow-400 font-semibold">intense visual effects</span> including:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-cyan-200/80 ml-2">
                  <li>Bright flashing lights and bloom effects</li>
                  <li>Rapid particle movements</li>
                  <li>Pulsating animations</li>
                  <li>Vivid color transitions</li>
                </ul>
                <p className="text-yellow-300/90 font-medium pt-2">
                  These effects may trigger discomfort for some people.
                </p>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
              >
                I Understand, Continue
              </motion.button>

              {/* Small disclaimer */}
              <p className="text-center text-cyan-500/60 text-xs mt-4">
                This warning will only appear once
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
