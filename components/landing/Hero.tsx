"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    <section className="pointer-events-none flex justify-center items-end sticky top-0 h-screen z-10 overflow-hidden pb-24">
      <div
        className="relative flex flex-col items-center text-center space-y-6 transition-transform duration-200 ease-out origin-bottom"
        style={{
          transform: `scale(${scale}) translateY(-${translateY}px)`,
        }}
      >
        {/* Sphere image positioned top-right, behind text */}
        <div className="absolute -top-80 lg:-top-60 right-0 md:right-40 lg:right-60 -z-10 w-[70vw] md:w-[40vw] lg:w-[30vw] pointer-events-none">
          <Image
            src="/images/esfera-abstracta.png"
            width={800}
            height={800}
            alt="Esfera abstracta"
            className="w-full h-auto"
            priority
          />
        </div>

        <h1 className="text-[20vw] font-light mb-0 px-0">Niumedia</h1>
        <div className="flex font-bold w-full px-1 justify-between text-xl lg:text-6xl tracking-wider">
          {"networks".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
