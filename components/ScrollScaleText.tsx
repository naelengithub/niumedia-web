"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ScrollScaleTextProps {
  id?: string;
}

const clientLogos = Array.from(
  { length: 10 },
  (_, i) => `/client-logos/logo${i}.svg`
);

export default function ScrollScaleText({ id }: ScrollScaleTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const { top, height } = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, 1 - (top + height - windowHeight) / height)
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-[300vh] bg-gradient-to-tl text-niuText px-12 py-24"
      id={id}
      ref={sectionRef}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center py-6 md:py-24 overflow-hidden text-center">
        {/* Fixed Title */}
        <h2 className="text-5xl sm:text-7xl md:text-9xl font-light">
          Clientes
        </h2>

        {/* Logos grid */}
        <div className="relative md:mt-12 w-full px-4">
          {/* Mobile: stacked zigzag center layout */}
          <div className="grid grid-cols-2 gap-6 sm:hidden mt-6 px-4">
            {clientLogos.map((src, index) => {
              const groupIndex = Math.floor(index / 2);
              const maxGroup = Math.floor(
                (scrollProgress * clientLogos.length) / 2 + 1
              );
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
                    className="object-contain w-[80px] hover:scale-110 transition-transform duration-300"
                  />
                </div>
              );
            })}
          </div>

          {/* Tablet and up: full grid with fade-in on scroll */}
          <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-5 gap-6 mt-12">
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
                    className="object-contain sm:w-[100px] md:w-[150px]"
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
