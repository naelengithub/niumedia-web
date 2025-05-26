"use client";

import Image from "next/image";

interface Props {
  name: string;
  url: string;
  repeat?: number;
  blockWidth?: number;
}

export default function ScrollingLinkBanner({
  name,
  url,
  repeat = 10, // reduced default repeat
  blockWidth = 200,
}: Props) {
  const repeatedContent = Array.from({ length: repeat * 2 }, (_, i) => (
    <span
      key={i}
      style={{ minWidth: `${blockWidth}px` }}
      className="flex items-center justify-center gap-2 px-4 py-2 text-lg sm:text-xl font-medium uppercase text-[#084254] whitespace-nowrap flex-shrink-0"
    >
      {name}
      <Image
        src="/svg/flecha_SIGUENOS.svg"
        alt="Arrow"
        width={20}
        height={20}
        className="max-w-[24px] object-contain"
      />
    </span>
  ));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full border-y border-niuBg overflow-hidden bg-niuText text-niu01 hover:bg-niu03 hover:text-niuText transition-colors duration-300"
    >
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max will-change-transform">
          {repeatedContent}
        </div>
      </div>
    </a>
  );
}
