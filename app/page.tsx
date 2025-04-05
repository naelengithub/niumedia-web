"use client";

import { useState } from "react";
import Hero from "@/components/landing/Hero";
import SplashScreen from "@/components/SplashScreen";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinished={() => setShowSplash(false)} />
      ) : (
        <div className="">
          {/* Scroll-animated logo section */}
          <Hero />

          {/* Spacer to prevent overlap */}
          <div className="h-[20vh]" />

          {/* Image + text section */}

          <About />
          <Services />
        </div>
      )}
    </>
  );
}
