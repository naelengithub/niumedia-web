"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollScaleTextProps {
  text: string;
  id?: string;
}

// Array of logo image paths
const clientLogos = Array.from(
  { length: 10 },
  (_, i) => `/client-logos/logo${i}.svg`
);

export default function ScrollScaleText({ text, id }: ScrollScaleTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSizeVW, setFontSizeVW] = useState(4);
  const [translateX, setTranslateX] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      const textEl = textRef.current;
      if (!sectionEl || !textEl) return;

      const { top, height } = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Track progress through the section (0 at top, 1 at bottom)
      const progress = Math.min(
        1,
        Math.max(0, 1 - (top + height - windowHeight) / height)
      );
      setScrollProgress(progress);

      // Font scaling logic
      const SCALE_START = windowHeight;
      const SCALE_DURATION = 300;
      const MIN_FONT = 4;
      const MAX_FONT = 12;

      const SLIDE_START = SCALE_START - SCALE_DURATION;
      const SLIDE_SPEED = 2;

      const scaleProgress = Math.max(
        0,
        Math.min(1, (SCALE_START - top) / SCALE_DURATION)
      );
      const fontSize = MIN_FONT + scaleProgress * (MAX_FONT - MIN_FONT);
      setFontSizeVW(fontSize);

      // Dynamically calculate max allowed translateX based on container padding
      const containerLeft = sectionEl.getBoundingClientRect().left;
      const containerPaddingLeft = parseFloat(
        getComputedStyle(sectionEl).paddingLeft || "0"
      );
      const targetX = containerLeft + containerPaddingLeft;
      const textLeft = textEl.getBoundingClientRect().left;
      const maxTranslate = textLeft - targetX - 24;

      const shouldSlide = top < SLIDE_START;
      const rawTranslate = shouldSlide ? (SLIDE_START - top) / SLIDE_SPEED : 0;

      const clampedTranslate = Math.min(
        rawTranslate,
        Math.max(maxTranslate, 0)
      );
      setTranslateX(clampedTranslate);

      if (clampedTranslate >= maxTranslate && !showSubtitle) {
        setShowSubtitle(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSubtitle]);

  return (
    <section
      className="relative h-[300vh] bg-[#084152] text-white"
      ref={sectionRef}
      id={id}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-end p-6 md:py-24 overflow-hidden">
        {/* Main text */}
        <p
          ref={textRef}
          className="leading-none font-light transition-all duration-100 ease-out whitespace-nowrap p-4 sm:p-0 self-end"
          style={{
            fontSize: `${fontSizeVW}vw`,
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {text}
        </p>

        {/* Subtitle */}
        <p
          className={`mt-0 md:mt-2 lg:mt-6 text-2xl md:text-5xl font-light transition-all duration-900 ease-out ${
            showSubtitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          con las mejores marcas
        </p>

        {/* Scattered brand logos with scroll-triggered reveal */}
        <div className="relative w-full h-[300px] mt-12">
          {clientLogos.map((src, index) => {
            const positions = [
              { top: "0%", left: "10%" },
              { top: "10%", right: "10%" },
              { bottom: "30%", left: "15%" },
              { top: "5%", left: "50%" },
              { bottom: "10%", right: "10%" },
              { top: "15%", left: "30%" },
              { bottom: "20%", left: "60%" },
              { top: "20%", right: "25%" },
              { top: "90%", left: "5%" },
              { bottom: "0%", left: "35%" },
            ];

            const style = {
              position: "absolute" as const,
              ...positions[index % positions.length],
              transition: "opacity 0.6s ease, transform 0.6s ease",
              opacity: scrollProgress > index / clientLogos.length ? 1 : 0,
              transform:
                scrollProgress > index / clientLogos.length
                  ? "translateY(0)"
                  : "translateY(20px)",
            };

            return (
              <div key={index} style={style}>
                <Image
                  src={src}
                  alt={`Brand ${index + 1}`}
                  width={120}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
