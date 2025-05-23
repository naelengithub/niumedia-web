"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Service } from "@/types/Service";

interface Props {
  services: Service[];
}

export default function AccordionComponent({ services }: Props) {
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
      x: rect.left + 400, // 👈 move image to the right
      y: rect.top - 170, // 👇 slightly lower than title
    });
  };

  return (
    <section className="relative bg-[#084152] w-full mx-auto divide-y divide-[#00b1da] border-y border-[#00b1da]">
      {/* FLOATING IMAGE PREVIEW */}
      <AnimatePresence>
        {hoveredIndex !== null && (
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
            className="pointer-events-none z-50 w-40 h-40 md:w-60 md:h-60 border-0"
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
      {services.map((service, i) => (
        <div
          key={service._id}
          className="py-4 px-4 cursor-pointer"
          onMouseEnter={(e) => handleHover(i, e)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={() => toggle(i)}
            className={`
    group flex justify-between items-center w-full text-left relative 
    transition-colors duration-300
    ${hoveredIndex === i ? "text-[#00b1da]" : "bg-transparent text-white"}
  `}
          >
            <motion.span
              initial={false}
              animate={{
                scale: hoveredIndex === i ? 1.9 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
              className="origin-left"
            >
              {service.name}
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {activeIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-white pt-4"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm sm:text-base leading-relaxed">
                  {Array.isArray(service.serviceList) &&
                    service.serviceList.map((item, idx) => (
                      <li key={idx} className="border-b border-white/20 pb-1">
                        {item}
                      </li>
                    ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
}
