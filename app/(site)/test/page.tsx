"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import QuadrantContent from "@/components/QuadrantContent";
import { Service } from "@/types/Service";

interface QuadrantGridProps {
  services: Service[];
}

export default function QuadrantGrid({ services }: QuadrantGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const getRowFlex = (rowIndex: number) => {
    if (hovered === null) return 1;
    return hovered < 2 === (rowIndex === 0) ? 2 : 1;
  };

  const getColFlex = (i: number) => {
    if (hovered === null) return 1;
    return hovered === i ? 2 : 1;
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      {[0, 1].map((row) => (
        <div
          key={row}
          className="flex transition-all duration-500 ease-in-out overflow-hidden"
          style={{ flex: getRowFlex(row) }}
        >
          {[0, 1].map((col) => {
            const i = row * 2 + col;
            const service = services[i];
            if (!service) return null;

            const isActive = hovered === i;

            const borderClasses = clsx(
              "border-[#00b1da]",
              row === 0 && "border-b",
              row === 1 && "border-t",
              col === 0 && "border-r",
              col === 1 && "border-l",
              i === 0 && "border-l-0 border-t-0",
              i === 1 && "border-r-0 border-t-0",
              i === 2 && "border-l-0 border-b-0",
              i === 3 && "border-r-0 border-b-0"
            );

            return (
              <motion.div
                key={service._id}
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={clsx(
                  "relative bg-[#084254] overflow-hidden cursor-pointer flex items-center justify-center",
                  borderClasses
                )}
                style={{ flex: getColFlex(i) }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Title — fades out when hovered */}
                <motion.h2
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3, delay: isActive ? 0.5 : 0 }}
                  className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-2xl font-bold z-10 pointer-events-none"
                >
                  {service.name}
                </motion.h2>

                {/* Content — fades in after title, disappears instantly */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="absolute inset-0 z-20 flex items-center justify-center"
                    >
                      <QuadrantContent
                        title={service.name}
                        description={service.serviceList}
                        iconSrc={service.image}
                        isActive
                        hideTitle={false}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
