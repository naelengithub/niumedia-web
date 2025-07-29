"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const SplashScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [startExitAnimation, setStartExitAnimation] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setStartExitAnimation(true);
    }, 1100);

    const fadeTimer = setTimeout(() => {
      setStartFadeOut(true);
    }, 2300); // 1100 + 1200

    const finalTimer = setTimeout(() => {
      setStartFadeOut(true);

      setTimeout(() => {
        setIsVisible(false);
        onFinished();
      }, 1500);
    }, 2300);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finalTimer);
    };
  }, [onFinished]);

  function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
  }

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
            className="fixed inset-0 text-black z-50"
            initial={{ backgroundColor: "#ffffff" }}
            animate={{
              backgroundColor: startFadeOut
                ? "rgba(255, 255, 255, 0)"
                : "#ffffff",
              transition: {
                duration: 1.5,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
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
              animate={{
                top: startExitAnimation ? "1.5rem" : "50%",
                left: startExitAnimation
                  ? isMobile
                    ? "1.5rem"
                    : "3rem"
                  : "50%",
                x: startExitAnimation ? "0%" : "-50%",
                y: startExitAnimation ? "0%" : "-50%",
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className="w-16 h-8"
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
