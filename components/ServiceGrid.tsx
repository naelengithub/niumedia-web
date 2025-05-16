"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import QuadrantContent from "@/components/QuadrantContent";
import { Service } from "@/types/Service";

type QuadrantId = "tl" | "tr" | "bl" | "br";

interface Props {
  services: Service[]; // now passed in
}

const quadrantOrder: QuadrantId[] = ["tl", "tr", "bl", "br"];

export default function ServiceGrid({ services }: Props) {
  const [hovered, setHovered] = useState<QuadrantId | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
  }, []);

  useEffect(() => {
    const handleTapOutside = (e: MouseEvent) => {
      if (
        isTouch &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setHovered(null);
      }
    };
    window.addEventListener("click", handleTapOutside);
    return () => window.removeEventListener("click", handleTapOutside);
  }, [isTouch]);

  const handleActivate = (id: QuadrantId) => {
    if (isTouch) {
      setHovered((prev) => (prev === id ? null : id));
    }
  };

  const getProps = (id: QuadrantId) => {
    const w = dimensions.width / 12;
    const h = dimensions.height / 8;

    if (!hovered) {
      if (id === "tl") return { left: 0, top: 0, width: w * 6, height: h * 4 };
      if (id === "tr")
        return { left: w * 6, top: 0, width: w * 6, height: h * 4 };
      if (id === "bl")
        return { left: 0, top: h * 4, width: w * 6, height: h * 4 };
      if (id === "br")
        return { left: w * 6, top: h * 4, width: w * 6, height: h * 4 };
    }

    if (hovered === "tl") {
      if (id === "tl") return { left: 0, top: 0, width: w * 11, height: h * 7 };
      if (id === "tr")
        return { left: w * 11, top: 0, width: w * 1, height: h * 7 };
      if (id === "bl")
        return { left: 0, top: h * 7, width: w * 11, height: h * 1 };
      if (id === "br")
        return { left: w * 11, top: h * 7, width: w * 1, height: h * 1 };
    }

    if (hovered === "tr") {
      if (id === "tr")
        return { left: w * 1, top: 0, width: w * 11, height: h * 7 };
      if (id === "tl") return { left: 0, top: 0, width: w * 1, height: h * 7 };
      if (id === "br")
        return { left: w * 1, top: h * 7, width: w * 11, height: h * 1 };
      if (id === "bl")
        return { left: 0, top: h * 7, width: w * 1, height: h * 1 };
    }

    if (hovered === "bl") {
      if (id === "bl")
        return { left: 0, top: h * 1, width: w * 11, height: h * 7 };
      if (id === "br")
        return { left: w * 11, top: h * 1, width: w * 1, height: h * 7 };
      if (id === "tl") return { left: 0, top: 0, width: w * 11, height: h * 1 };
      if (id === "tr")
        return { left: w * 11, top: 0, width: w * 1, height: h * 1 };
    }

    if (hovered === "br") {
      if (id === "br")
        return { left: w * 1, top: h * 1, width: w * 11, height: h * 7 };
      if (id === "bl")
        return { left: 0, top: h * 1, width: w * 1, height: h * 7 };
      if (id === "tr")
        return { left: w * 1, top: 0, width: w * 11, height: h * 1 };
      if (id === "tl") return { left: 0, top: 0, width: w * 1, height: h * 1 };
    }

    return { left: 0, top: 0, width: w * 6, height: h * 4 };
  };

  const getBorderClasses = (id: QuadrantId) => {
    const base = "border-[#00b1da]";
    switch (id) {
      case "tl":
        return `${base} border-b`;
      case "tr":
        return `${base} border-b border-l`;
      case "bl":
        return "";
      case "br":
        return `${base} border-l`;
      default:
        return "";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-[80vh] relative overflow-hidden touch-manipulation bg-[#084254] border-y border-[#00b1da]"
    >
      {services.slice(0, 4).map((service, i) => {
        const id = quadrantOrder[i];
        const { left, top, width, height } = getProps(id);

        const isVertical =
          (hovered === "tl" && id === "tr") ||
          (hovered === "tr" && id === "tl") ||
          (hovered === "bl" && id === "br") ||
          (hovered === "br" && id === "bl");

        const hideTitle =
          (hovered === "tl" && id === "br") ||
          (hovered === "tr" && id === "bl") ||
          (hovered === "bl" && id === "tr") ||
          (hovered === "br" && id === "tl");

        console.log("services:", services);

        return (
          <motion.div
            key={service._id}
            className={`absolute text-white flex items-center justify-center ${getBorderClasses(id)}`}
            onMouseEnter={() => !isTouch && setHovered(id)}
            onMouseLeave={() => !isTouch && setHovered(null)}
            onClick={() => handleActivate(id)}
            animate={{ left, top, width, height }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <QuadrantContent
              title={service.name}
              description={
                Array.isArray(service.serviceList) ? service.serviceList : []
              } // ✅ guaranteed safe
              iconSrc={service.image}
              isVertical={isVertical}
              isActive={hovered === id}
              hideTitle={hideTitle}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
