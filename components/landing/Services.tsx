"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getServices } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service";
import { PortableText } from "@portabletext/react";

interface ServicesProps {
  id?: string;
}

const ServicesScrollFirst: React.FC<ServicesProps> = ({ id }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const cacheKey = "services_cache";
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const { services: cachedServices, timestamp } = JSON.parse(cached);
          const oneDay = 24 * 60 * 60 * 1000;
          const now = Date.now();

          if (now - timestamp < oneDay) {
            setServices(cachedServices);
            return;
          }
        } catch (error) {
          console.warn("Corrupted services cache. Refetching...", error);
          localStorage.removeItem(cacheKey);
        }
      }

      const data = await getServices();
      setServices(data);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ services: data, timestamp: Date.now() })
      );
    };

    fetchServices();
  }, []);

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
  }, [services]);

  return (
    <div className="w-full" id={id}>
      {/* === Desktop & Tablet Version === */}
      <div
        className="hidden md:flex flex-row w-full min-h-screen"
        ref={containerRef}
      >
        {/* LEFT SIDE */}
        {services.length > 0 && (
          <div className="w-2/5 h-screen sticky top-0 flex-col justify-center p-12 border-r border-black bg-white overflow-hidden">
            <p className="text-sm mb-4 mt-24 tracking-wide">
              NUESTROS SERVICIOS
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="text-7xl font-bold mb-6">{activeIndex + 1}</div>
                <h2 className="text-2xl font-bold mb-4">
                  {services[activeIndex].name}
                </h2>
                <div className="text-base max-w-sm leading-relaxed prose">
                  <PortableText value={services[activeIndex].content} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

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
                  alt={service.alt || `Service ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* === Mobile Version: Sticky Stack, No Scroll Inside === */}
      <div className="md:hidden relative h-[400vh] w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="sticky top-0 h-screen w-full flex flex-col bg-white"
            style={{ zIndex: index + 1 }}
          >
            {/* Image fills remaining space */}
            <div className="flex-1 relative w-full">
              <Image
                src={service.image}
                alt={service.alt || `Service ${index + 1}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Text always fits in viewport */}
            <div className="w-full p-6 bg-white border-t border-black min-h-[45vh]">
              <div className="text-4xl font-bold mb-4">{index + 1}</div>
              <h2 className="text-xl font-bold mb-2">{service.name}</h2>
              <div className="text-base leading-relaxed prose pb-2">
                <PortableText value={service.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesScrollFirst;
