import { useEffect, useState } from "react";
import Image from "next/image";

interface QuadrantContentProps {
  title: string;
  description?: string[]; // ✅ made optional
  isVertical?: boolean;
  isActive?: boolean;
  hideTitle?: boolean;
  iconSrc?: string; // optional icon path
}

export default function QuadrantContent({
  title,
  description = [], // ✅ default fallback
  isVertical = false,
  isActive = false,
  hideTitle = false,
  iconSrc = "/about.png", // placeholder
}: QuadrantContentProps) {
  const [showTitle, setShowTitle] = useState(!hideTitle);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hideTitle) {
      setShowTitle(false);
    } else {
      timeout = setTimeout(() => setShowTitle(true), 300);
    }

    return () => clearTimeout(timeout);
  }, [hideTitle]);

  return (
    <div className="pointer-events-none w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Glow Gradient */}
      <div
        className={`
          absolute w-[150%] h-[150%] rounded-full 
          bg-[radial-gradient(circle,_#ffffff22_0%,_transparent_70%)]
          transition-all duration-700 ease-out
          ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        `}
      />

      {/* Foreground */}
      <div
        className={`
          flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-4
          ${isActive ? "gap-4 translate-y-[-20%]" : "gap-0 translate-y-0"}
        `}
      >
        {showTitle && (
          <h2
            className={`
         text-lg md:text-3xl text-center transition-transform duration-500
         ${isVertical ? "rotate-90 origin-center whitespace-nowrap" : "break-words leading-tight max-w-xs md:max-w-sm"}
       `}
          >
            {title}
          </h2>
        )}

        {isActive && description.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            {/* Icon image */}
            <div className="w-40 h-40 md:w-80 md:h-80 relative">
              <Image
                src={iconSrc}
                alt={`${title} icon`}
                fill
                className="object-contain"
              />
            </div>

            {/* 2-column description list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base opacity-90 text-left max-w-md w-full leading-relaxed transition-opacity duration-300 delay-100">
              {description.map((item, i) => (
                <li key={i} className="border-b border-white/30 pb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
