"use client";

import { useState } from "react";
import Image from "next/image";
// import Logo from "@/components/Logo";

const projects = Array.from({ length: 12 }, (_, i) => ({
  id: `NM${(i + 1).toString().padStart(3, "0")}`,
  title: `Nombre del Proyecto ${i + 1}`,
  image: "/placeholder.png",
  description: "Descripción del proyecto seleccionado.",
}));

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen w-full flex bg-white">
      {/* LEFT SIDEBAR */}
      <aside className="w-[20%] bg-gray-100 relative flex justify-end">
        {/* Fixed logo and title */}
        {/* <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 flex items-center gap-2 z-10">
          <Logo tone="dark" className="px-12" />
        </div> */}

        {/* Clickable project list */}
        <div className="overflow-y-scroll h-full w-full flex flex-col justify-around px-6 md:px-12 space-y-3 py-24">
          {projects.map((proj, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={proj.id}
                className={`project-item relative flex items-center gap-2 text-right cursor-pointer pr-2 ${
                  isActive
                    ? "font-bold text-black text-base pl-2 -ml-1"
                    : "text-gray-500 text-sm"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <span>{proj.id}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="w-[80%] flex flex-col items-end justify-center pl-12 py-12">
        <div className="w-full aspect-video bg-gray-300 relative mb-6">
          <Image
            src={projects[activeIndex].image}
            alt={projects[activeIndex].title}
            fill
            className="object-cover"
          />
        </div>
        <div className="pr-6 md:pr-12">
          <p className="text-center max-w-xl text-sm text-gray-700 mb-4">
            {projects[activeIndex].description}
          </p>
          <h2 className="text-2xl font-bold">{projects[activeIndex].title}</h2>
        </div>
      </main>
    </div>
  );
}
