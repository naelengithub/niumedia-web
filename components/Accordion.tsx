"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Service } from "@/types/Service";
import OscillatingSphereCanvas from "./canvases/OscilatingSphereCanvas";

interface Props {
  services: Service[];
  id?: string;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function AccordionComponent({ services, id }: Props) {
  const isMobile = useIsMobile();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleHover = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredIndex(index);
    setPreviewPos({
      x: rect.left + 400,
      y: rect.top - 170,
    });
  };

  return (
    <section
      className="relative h-auto flex flex-col md:flex-row bg-niuBg w-screen divide-y divide-niu02 border-y border-niu02"
      id={id}
    >
      <div className="md:min-h-full border-b-1 md:w-1/3 md:border-0 md:border-r-1 border-niu02 text-gray-100 uppercase text-sm px-8 py-4 md:px-12 md:py-6">
        <h2 className="text-lg">Nuestros servicios</h2>
        <div className="relative w-full md:h-screen z-0"></div>
      </div>

      {/* FLOATING IMAGE PREVIEW */}
      <AnimatePresence>
        {hoveredIndex !== null && hoveredIndex !== activeIndex && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: previewPos.x,
              top: previewPos.y,
            }}
            className="pointer-events-none z-80 w-40 h-80 md:w-80 md:h-80 border-0"
          >
            <Image
              src={services[hoveredIndex].image}
              alt={`${services[hoveredIndex].name} preview`}
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST ITEMS */}
      <div className="flex flex-col w-full">
        {services.map((service, i) => (
          <div
            key={service._id}
            className="py-4 px-4 cursor-pointer border-0 border-b-1 w-full border-niu02"
            onMouseEnter={(e) => handleHover(i, e)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button
              onClick={() => toggle(i)}
              className={`group flex justify-between items-center w-full text-left text-3xl relative transition-colors duration-300 cursor-pointer ${
                hoveredIndex === i
                  ? "text-niu02"
                  : "bg-transparent text-gray-100"
              }`}
            >
              <motion.span
                initial={false}
                animate={{
                  scale: !isMobile && hoveredIndex === i ? 1.2 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
                className={`origin-left ${
                  activeIndex === i ? "text-niu02" : "text-gray-100"
                }`}
              >
                {service.name}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === i && (
                <div className="relative text-gray-100 pt-4 overflow-visible">
                  {/* SVG background blob */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[130%] h-[130%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-15"
                    >
                      <defs>
                        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#6ec1e4" />
                          <stop
                            offset="100%"
                            stopColor="#6ec1e4"
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                      <path
                        d="M421.7,305.4Q408.9,360.8,362.5,388.6Q316.1,416.4,262.6,431.8Q209.1,447.1,167.4,407.1Q125.7,367,95.1,320.9Q64.5,274.8,76.6,222.1Q88.8,169.5,127.4,130.2Q166.1,91,221.3,83.6Q276.6,76.1,330.1,97.1Q383.6,118,413.3,169Q443,220,421.7,305.4Z"
                        fill="url(#grad)"
                      />
                    </svg>
                  </div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="relative w-full flex flex-col items-center">
                      {/* Same image as hovered preview */}
                      <div className="w-full min-h-60 relative">
                        <Image
                          src={service.image}
                          alt={`${service.name} preview`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        {/* List divided into two columns */}
                        <ul className="relative w-full mt-12 border-t border-white/30 pt-12 text-center flex flex-col md:flex-row md:divide-x md:divide-white/30">
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-8xl z-10 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-400 text-transparent bg-clip-text border-0">
                            +
                          </div>
                          <div className="flex-1 flex flex-col px-6 divide-y divide-white/20">
                            {service.serviceList
                              .filter((_, idx) => idx % 2 === 0)
                              .map((item, idx) => (
                                <li key={idx} className="list-none py-2">
                                  <p className="text-base leading-relaxed">
                                    {item}
                                  </p>
                                </li>
                              ))}
                          </div>
                          <div className="flex-1 flex flex-col px-6 divide-y divide-white/20">
                            {service.serviceList
                              .filter((_, idx) => idx % 2 !== 0)
                              .map((item, idx) => (
                                <li key={idx} className="list-none py-2">
                                  <p className="text-base leading-relaxed">
                                    {item}
                                  </p>
                                </li>
                              ))}
                          </div>
                        </ul>
                      </div>
                      {/* Centered rounded image */}
                      <div className="flex justify-center items-center mt-12">
                        <div className="rounded-full overflow-hidden w-64 h-32">
                          <Image
                            src={service.imageSecondary as string}
                            alt={service.altSecondary || "Imagen secundaria"}
                            width={256}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Extra visual */}
                      <div className="flex justify-center items-center mt-12">
                        <div className="w-22 h-22 mb-6">
                          <Image
                            src="/images/linea_y_circulo.png"
                            alt="Visual"
                            width={256}
                            height={128}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[130%] h-[130%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-15"
          >
            <defs>
              <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6ec1e4" />
                <stop offset="100%" stopColor="#6ec1e4" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M421.7,305.4Q408.9,360.8,362.5,388.6Q316.1,416.4,262.6,431.8Q209.1,447.1,167.4,407.1Q125.7,367,95.1,320.9Q64.5,274.8,76.6,222.1Q88.8,169.5,127.4,130.2Q166.1,91,221.3,83.6Q276.6,76.1,330.1,97.1Q383.6,118,413.3,169Q443,220,421.7,305.4Z"
              fill="url(#grad)"
            />
          </svg>
        </div>
        <div className="relative w-full h-fit min-h-64 overflow-hidden m-auto">
          <OscillatingSphereCanvas />
          {/* <Image
            src="/images/linea_y_circulo.png"
            alt="Visual"
            width={256}
            height={128}
            className="absolute top-1/4 left-1/2 z-10 w-32 h-20"
          /> */}
        </div>
      </div>
    </section>
  );
}
