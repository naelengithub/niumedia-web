"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ServicesProps {
  id?: string;
}

const services = [
  {
    number: 1,
    title: "DIGITAL SIGNAGE",
    description:
      "We design. We build. We deliver. This dummy text represents a unique digital signage experience tailored to modern business needs.",
    image: "/images/d.jpg",
  },
  {
    number: 2,
    title: "STREAMING",
    description:
      "An all-in-one platform to easily manage and broadcast content across digital displays. Stay connected and in control.",
    image: "/images/b.jpg",
  },
  {
    number: 3,
    title: "PRODUCCIÓN DE CONTENIDO DIGITAL",
    description:
      "Powerful solutions that redefine how your brand communicates visually, both indoors and outdoors.",
    image: "/images/c.jpg",
  },
  {
    number: 4,
    title: "EVENTOS VIRTUALES EN VIVO",
    description:
      "Interactive, scalable, and beautifully designed digital display systems that evolve with your business.",
    image: "/images/a.jpg",
  },
];

const ServicesScrollFirst: React.FC<ServicesProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll("[data-index]");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const current = services[activeIndex];

  return (
    <div className="w-full" id={id}>
      {/* === Desktop & Tablet Version === */}
      <div
        className="hidden md:flex flex-row w-full min-h-screen"
        ref={containerRef}
      >
        {/* LEFT SIDE */}
        <div className="w-2/5 h-screen sticky top-0 flex-col justify-center p-12 border-r border-black bg-white overflow-hidden">
          <p className="text-sm mb-4 mt-24 tracking-wide">NUESTROS SERVICIOS</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-7xl font-bold mb-6">{current.number}</div>
              <h2 className="text-2xl font-bold mb-4">{current.title}</h2>
              <p className="text-base max-w-sm leading-relaxed">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* RIGHT SIDE */}
        <div className="w-3/5">
          {services.map((service, index) => (
            <section
              key={index}
              data-index={index}
              className="h-screen w-full flex items-center justify-center bg-gray-100"
            >
              <div className="relative w-full h-full">
                <Image
                  src={service.image}
                  alt={`Service ${index + 1}`}
                  fill
                  sizes="100vw" // ✅ required when using fill
                  className="object-cover"
                  priority
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* === Mobile Version: Sticky Stack Scroll === */}
      <div className="md:hidden relative h-[400vh] w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-pink-100"
            style={{ zIndex: index + 1 }}
          >
            <div className="relative w-full h-full sm:h-96">
              <Image
                src={service.image}
                alt={`Service ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-full p-6 bg-white min-h-[40vh] border-t border-black">
              <div className="text-4xl font-bold mb-4">{service.number}</div>
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-base leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesScrollFirst;
