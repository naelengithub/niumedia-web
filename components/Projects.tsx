"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Project } from "@/types/Project";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeIndex]);

  if (!projects || projects.length === 0) {
    return <div className="p-12">No se encontraron proyectos.</div>;
  }

  const activeProject = projects[activeIndex];
  const services = activeProject?.services ?? [];

  return (
    <div className="overflow-y-scroll sm:overflow-auto h-screen w-full flex flex-col relative sm:flex-row">
      {/* LEFT SIDEBAR */}
      <aside className="sm:w-[20%] relative flex justify-end bg-gradient-to-r from-transparent to-niu04 sm:to-transparent">
        <div className="sm:pb-0 sm:overflow-y-scroll overflow-x-scroll sm:h-full sm:w-full  w-fit flex sm:flex-col justify-around px-6 md:px-12 pt-18 sm:py-24">
          {projects.map((proj, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={proj._id}
                className={`project-item relative flex items-center gap-2 text-right cursor-pointer pr-2 ${
                  isActive
                    ? "font-bold text-niuText text-base pl-2 -ml-1"
                    : "text-gray-300 text-sm"
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
      <main
        ref={mainRef}
        className="sm:w-[80%] min-h-screen overflow-y-auto p-12 pt-24 relative bg-gradient-to-r from-transparent to-niu04"
      >
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
              <h1 className="text-[7vw] font-bold text-left w-full z-50 text-niuText">
                {activeProject.name}
              </h1>

              <div className="ml-auto flex flex-col space-y-8 mt-20">
                <div className="flex-col justify-between sm:flex-row">
                  {/* Services */}
                  {services.length > 0 && (
                    <h2 className="text-gray-300 font-medium sm:text-right">
                      {services.join("  |  ")}
                    </h2>
                  )}
                  <div className="pt-4 sm:pt-0 flex gap-2 justify-end sm:justify-start items-center text-niuText">
                    <h2>Scroll Down</h2>
                    <Image
                      src="/svg/flecha_scroll_down.svg"
                      alt="Scroll down"
                      width={20}
                      height={20}
                      className="object-fit max-width: 24px"
                    />
                  </div>
                </div>

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
                <div className="text-sm text-gray-300 whitespace-pre-wrap">
                  {activeProject.content?.length > 0 ? (
                    <PortableText value={activeProject.content} />
                  ) : (
                    "Sin descripción."
                  )}
                </div>

                {/* Data */}
                <div className="flex flex-col gap-4">
                  <div className="flex w-full justify-between text-gray-300 border-b-1 border-gray-500 pb-4">
                    <h2>Año</h2>
                    <h2 className="text-niuText">{activeProject.year}</h2>
                  </div>
                  <div className="flex w-full justify-between text-gray-300 border-b-1 border-gray-500 pb-4">
                    <h2>Cliente</h2>
                    <h2 className="text-niuText">{activeProject.client}</h2>
                  </div>
                  <div className="flex w-full justify-between gap-4 text-gray-300 border-b-1 border-gray-500 pb-4">
                    <h2>Servicios</h2>
                    <h2 className="text-niuText">{services.join(" | ")}</h2>
                  </div>
                  {Array.isArray(activeProject.additionalImages) &&
                    activeProject.additionalImages.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {activeProject.additionalImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-full sm:h-[300px] flex items-center justify-center"
                          >
                            <Image
                              src={img.url}
                              alt={img.alt || `Imagen adicional ${idx + 1}`}
                              width={800}
                              height={600}
                              className="object-contain h-full w-auto"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  <div className="w-full flex justify-center mt-40">
                    <Image
                      src="svg/circulo_azul.svg"
                      alt={activeProject.alt || activeProject.name}
                      width={80}
                      height={80}
                      className="object-fit max-w-32"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
