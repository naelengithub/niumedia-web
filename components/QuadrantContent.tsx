import Image from "next/image";
import { motion } from "framer-motion";

interface QuadrantContentProps {
  title: string;
  description?: string[];
  isVertical?: boolean;
  isActive?: boolean;
  hideTitle?: boolean;
  iconSrc?: string;
}

export default function QuadrantContent({
  title,
  description = [],
  isVertical = false,
  isActive = false,
  hideTitle = false,
  iconSrc = "/about.png",
}: QuadrantContentProps) {
  return (
    <div className="pointer-events-none w-full h-full flex justify-center relative overflow-y-scroll">
      <div
        className={`flex flex-col justify-center transition-all duration-500 ease-in-out px-4 ${
          isActive ? "gap-4" : "gap-0"
        }`}
      >
        {/* Title animates position/rotation/opacity */}
        <motion.h2
          initial={false}
          animate={{
            rotate: isVertical ? 90 : 0,
            opacity: hideTitle ? 0 : 1,
            scale: hideTitle ? 0.9 : 1,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className={`text-lg md:text-3xl text-center origin-center transition-all ${
            isVertical
              ? "whitespace-nowrap"
              : "break-words leading-tight max-w-xs md:max-w-sm"
          }`}
        >
          {title}
        </motion.h2>

        {/* Content appears *after* title animates in */}
        {isActive && description.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.5, // delay until title finishes
                duration: 0.4,
              },
            }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-40 h-40 md:w-80 md:h-80 relative">
              <Image
                src={iconSrc}
                alt={`${title} icon`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 320px"
              />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base opacity-90 text-left max-w-[90vh] w-full leading-relaxed">
              {description.map((item, i) => (
                <li key={i} className="border-b border-white/30 pb-1">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
