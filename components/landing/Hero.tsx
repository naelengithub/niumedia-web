"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SoftOrbit from "../three/SoftOrbit";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = Math.min(1 + scrollY / 300, 6);
  const translateY = Math.min(scrollY / 4, 800);

  return (
    <section className="pointer-events-none flex justify-center items-end sticky top-0 h-screen z-10 pb-24 text-white overflow-x-clip">
      {/* 🔆 Glow Background */}
      <motion.div
        className="absolute inset-0 z-[-30] flex items-center justify-center overflow-x-clip"
        initial={{ opacity: 0.12 }}
        animate={{ y: [0, -2, 0, 2, 0] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          className="w-[150vw] h-[150vh]"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <circle cx="50" cy="50" r="50" fill="url(#lightGlow)" />
        </svg>
      </motion.div>

      {/* 🌀 Animated entry for SoftOrbit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="absolute z-[-20] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]"
      >
        <SoftOrbit />
      </motion.div>

      {/* 🔠 Scrolling text content only */}
      <motion.div
        className="relative flex flex-col items-center text-center space-y-6 transition-transform duration-200 ease-out origin-bottom"
        style={{
          transform: `scale(${scale}) translateY(-${translateY}px)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="flex flex-col items-center space-y-6"
        >
          <h1 className="text-[20vw] mb-0 px-0 leading-tight">Niumedia</h1>
          <div className="flex w-full justify-between text-xl leading-0 font-medium lg:text-6xl tracking-wider pl-1 sm:pl-2 md:pl-3 lg:pl-4">
            {"networks".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
