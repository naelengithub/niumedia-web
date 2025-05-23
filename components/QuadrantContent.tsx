import { motion, AnimatePresence } from "framer-motion";

interface QuadrantContentProps {
  title: string;
  isVertical?: boolean;
  hideTitle?: boolean;
}

export default function QuadrantContent({
  title,
  isVertical = false,
  hideTitle = false,
}: QuadrantContentProps) {
  return (
    <div className="pointer-events-none w-full h-full flex justify-center items-center relative">
      <AnimatePresence mode="wait">
        {!hideTitle && (
          <motion.h2
            key="title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: isVertical ? 90 : 0,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={`text-lg md:text-3xl text-center origin-center font-bold ${
              isVertical
                ? "whitespace-nowrap"
                : "break-words leading-tight max-w-xs md:max-w-sm"
            }`}
          >
            {title}
          </motion.h2>
        )}
      </AnimatePresence>
    </div>
  );
}
