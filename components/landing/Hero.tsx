"use client";

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
    <section className="flex justify-center items-end sticky top-0 h-screen z-10 overflow-hidden pb-24">
      <div
        className="flex flex-col items-center text-center space-y-6 transition-transform duration-200 ease-out origin-bottom"
        style={{
          transform: `scale(${scale}) translateY(-${translateY}px)`,
        }}
      >
        <h1 className="text-[20vw] font-light mb-0 px-0">Niumedia</h1>
        <div className="flex font-bold w-full px-1 justify-between uppercase text-sm tracking-wider">
          {"networks".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
