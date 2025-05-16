"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollScaleTextProps {
  text: string;
  id?: string;
}

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

      const progress = Math.min(
        1,
        Math.max(0, 1 - (top + height - windowHeight) / height)
      );
      setScrollProgress(progress);

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
      className="relative h-[300vh] bg-gradient-to-tl from-[#084152] to-[#00b1da] via-[#0f7d9e] text-[#03caff] px-12"
      ref={sectionRef}
      id={id}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-end py-6 md:py-24 overflow-hidden">
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

        {/* Logos grid */}
        <div className="relative md:mt-12 w-full px-4">
          {/* Mobile: stacked zigzag center layout */}
          <div className="grid grid-cols-2 gap-6 sm:hidden mt-6 px-4">
            {clientLogos.map((src, index) => {
              const groupIndex = Math.floor(index / 2);
              const maxGroup = Math.floor(
                (scrollProgress * clientLogos.length) / 2 + 1
              ); // ensure at least 2 columns show early
              const isVisible = groupIndex <= maxGroup;

              return (
                <div
                  key={index}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className={`flex justify-center items-center transition-all duration-500 ease-out transform ${
                    isVisible
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-90 translate-y-6 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Brand ${index + 1}`}
                    width={70}
                    height={60}
                    className="object-contain w-[60px] hover:scale-110 transition-transform duration-300"
                  />
                </div>
              );
            })}
          </div>

          {/* Tablet and up: full grid with fade-in on scroll */}
          <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-5 gap-6">
            {clientLogos.map((src, index) => {
              const visible = scrollProgress > index / clientLogos.length;
              return (
                <div
                  key={index}
                  className={`flex justify-center items-center transition-all duration-500 ease-out transform ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Brand ${index + 1}`}
                    width={70}
                    height={60}
                    className="object-contain sm:w-[80px] md:w-[90px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
