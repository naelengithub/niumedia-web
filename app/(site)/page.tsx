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
          {/* Scroll-animated logo section */}
          <Hero />
          {/* Spacer to prevent overlap */}
          <div className="h-[20vh]" />
          {/* Image + text section */}
          <About />
          <Services id="servicios" />
          <ScrollScaleText text="Colaboramos" id="colaboradores" />
          <Contact id="contacto" />
          {/* <div className="h-screen bg-pink-100"></div> */}
        </div>
      )}
    </div>
  );
}
