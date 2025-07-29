"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import TerrainWaveCanvas from "../BezierBlob";
import Image from "next/image";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerYOffset = 96; // Slightly above cursor
      const centerY = window.innerHeight / 2 - centerYOffset;

      const relX = e.clientX - centerX;
      const relY = e.clientY - centerY;
      const normalizedY = relY / centerY;

      const offsetY = -normalizedY * 120 - Math.pow(normalizedY, 3) * 60;
      const adjustedY = relY + offsetY;

      // 🌐 Clamp logic based on image size
      const imageHalfWidth = 192; // 384px / 2
      const imageHalfHeight = 192;

      const maxX = centerX - imageHalfWidth;
      const maxY = centerY - imageHalfHeight;

      const clampedX = Math.max(-maxX, Math.min(relX, maxX));
      const clampedY = Math.max(-maxY, Math.min(adjustedY, maxY));

      mx.set(clampedX);
      my.set(clampedY);

      const scaleMapped = 1 - Math.pow(adjustedY / centerY, 2) * 1.2;
      scale.set(Math.max(0.15, scaleMapped));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mx, my, scale]);

  // Mobile fallback
  const yTime = useMotionValue(0);
  const syncedY = useTransform(yTime, (t) => Math.cos(t * 1.5) * 3);
  useAnimationFrame((t) => {
    yTime.set(t / 1000);
  });

  return (
    <section className="pointer-events-none flex justify-center items-end sticky top-0 h-screen z-10 pb-24 text-gray-100 overflow-x-clip">
      <TerrainWaveCanvas cursorResponsive={isMobile ? "no" : "yes"} />

      <div className="absolute z-0 top-5/12 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[500px] sm:h-[500px]">
        <div className="absolute z-0 top-5/12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-screen sm:h-screen flex items-center justify-center">
          {isMobile ? (
            <motion.div
              className="w-full h-full relative"
              style={{ y: syncedY }}
            >
              <Image
                src="/images/im2.png"
                alt="SoftOrbit PNG"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-96 h-full relative"
              style={{ x: mx, y: my, scale }}
            >
              <Image
                src="/images/im2.png"
                alt="SoftOrbit PNG"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
