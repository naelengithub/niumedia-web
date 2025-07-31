"use client";

import { useEffect, useRef, useState } from "react";
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
  const [startFollowing, setStartFollowing] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const scale = useMotionValue(1);

  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartFollowing(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isMobile || !startFollowing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerYOffset = 96;
      const centerY = window.innerHeight / 2 - centerYOffset;

      const tY = e.clientY / window.innerHeight;
      const tX = e.clientX / window.innerWidth;

      const offsetY = (() => {
        if (tY < 1 / 3) return -150 * (1 - tY * 3);
        if (tY < 2 / 3) return 0;
        return -150 * (tY - 2 / 3) * 3;
      })();

      const offsetX = (() => {
        if (tX < 1 / 3) return -50 * (1 - tX * 3);
        if (tX < 2 / 3) return 0;
        return -50 * (tX - 2 / 3) * 3;
      })();

      const relX = e.clientX - centerX;
      const relY = e.clientY - centerY;

      const imageHalfWidth = 192;
      const imageHalfHeight = 192;

      const maxX = centerX - imageHalfWidth;
      const maxY = centerY - imageHalfHeight;

      const clampedX = Math.max(-maxX, Math.min(relX + offsetX, maxX));
      const clampedY = Math.max(-maxY, Math.min(relY + offsetY, maxY));

      // 👇 Just update target values
      targetX.current = clampedX;
      targetY.current = clampedY;

      // 📏 Shrink only in upper third
      const scaleMapped = tY < 1 / 3 ? 1 - (1 / 3 - tY) * 0.5 * 3 : 1;
      scale.set(scaleMapped);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, startFollowing, scale]);

  // 🌀 Smooth interpolation
  useAnimationFrame(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    mx.set(lerp(mx.get(), targetX.current, 0.1));
    my.set(lerp(my.get(), targetY.current, 0.1));
  });

  // 🌙 Mobile floating fallback
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
              className="w-full h-full relative max-w-[400px]"
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
              className="w-96 h-full relative max-w-[500px]"
              style={{
                x: startFollowing ? mx : 0,
                y: startFollowing ? my : 0,
                scale,
              }}
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
