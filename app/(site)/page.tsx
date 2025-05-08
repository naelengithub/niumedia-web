"use client";

import { useState } from "react";
import Hero from "@/components/landing/Hero";
import SplashScreen from "@/components/SplashScreen";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import ScrollScaleText from "@/components/ScrollScaleText";
import Contact from "@/components/ContactForm";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="">
      {showSplash ? (
        <SplashScreen onFinished={() => setShowSplash(false)} />
      ) : (
        <div>
          <div className="bg-gradient-to-t from-[#c6dbfa] to-white">
            <Hero />
            {/* Spacer to prevent overlap */}
            <div className="h-[20vh]" />
          </div>
          <About className="bg-gradient-to-t from-[#c6dbfa]/40 to-[#c6dbfa]" />
          <Services id="servicios" />
          <ScrollScaleText text="Colaboramos" id="colaboradores" />
          <Contact id="contacto" />
        </div>
      )}
    </div>
  );
}
