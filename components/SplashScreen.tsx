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
    }, 1700);

    const finalTimer = setTimeout(() => {
      setStartFadeOut(true); // Trigger opacity animation

      setTimeout(() => {
        setIsVisible(false); // Let Framer handle exit
        onFinished();
      }, 600); // match duration of fade out (0.6s)
    }, 1700); // fade + exit begin together

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
                      top: "1.5rem", // py-8 always
                      left: isMobile ? "1.5rem" : "3rem", // px-6 mobile
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
