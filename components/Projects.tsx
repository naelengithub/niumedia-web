"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Project } from "@/types/Project";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return <div className="p-12">No se encontraron proyectos.</div>;
  }

  const activeProject = projects[activeIndex];
  const services = activeProject?.services ?? [];

  return (
    <div className="h-screen w-full flex bg-white">
      {/* LEFT SIDEBAR */}
      <aside className="w-[20%] bg-gray-100 relative flex justify-end">
        <div className="overflow-y-scroll h-full w-full flex flex-col justify-around px-6 md:px-12 space-y-3 py-24">
          {projects.map((proj, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={proj._id}
                className={`project-item relative flex items-center gap-2 text-right cursor-pointer pr-2 ${
                  isActive
                    ? "font-bold text-black text-base pl-2 -ml-1"
                    : "text-gray-500 text-sm"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <span>{`NM${(i + 1).toString().padStart(3, "0")}`}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="w-[80%] h-full overflow-y-auto p-12 pt-24 relative">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Title */}
              <h1 className="text-4xl font-bold text-left w-full z-50">
                {activeProject.name}
              </h1>

              <div className="max-w-4xl ml-auto flex flex-col space-y-8 mt-20">
                {/* Services */}
                {services.length > 0 && (
                  <h2 className="text-sm text-gray-500 text-right">
                    {services.join(" | ")}
                  </h2>
                )}
                {/* Image */}
                <div className="aspect-video relative w-full bg-gray-300">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.alt || activeProject.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                {/* Content */}
                <div className="text-sm text-gray-700 text-right whitespace-pre-wrap">
                  {activeProject.content?.length > 0 ? (
                    <PortableText value={activeProject.content} />
                  ) : (
                    "Sin descripción."
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
