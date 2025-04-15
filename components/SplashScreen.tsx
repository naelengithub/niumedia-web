"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const SplashScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [startExitAnimation, setStartExitAnimation] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setStartExitAnimation(true);
    }, 1100);

    const fadeTimer = setTimeout(() => {
      setStartFadeOut(true);
    }, 1700);

    const finalTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinished, 300);
    }, 2000);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finalTimer);
    };
  }, [onFinished]);

  return (
    <>
      <style>
        {`
@keyframes fillUp {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

.logo-block {
  position: relative;
  overflow: hidden;
}

.fill-up {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  transform: scaleY(0);
  animation: fillUp 1s ease-in-out forwards;
}
      `}
      </style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 bg-white text-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              initial={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
                position: "absolute",
              }}
              animate={
                startExitAnimation
                  ? {
                      top: "2rem", // py-8 always
                      left: "1.5rem", // px-6 mobile
                      x: "0%",
                      y: "0%",
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }
                  : {}
              }
              style={{
                opacity: startFadeOut ? 0 : 1,
                transition: startFadeOut
                  ? "opacity 0.6s ease-in-out"
                  : undefined,
              }}
              className="w-12 h-6 sm:left-12 sm:pl-6"
            >
              <AnimatedLogo />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SplashScreen;
