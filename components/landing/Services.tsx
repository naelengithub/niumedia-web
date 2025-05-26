"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getProjects } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

interface ProjectsProps {
  id?: string;
}

const ProjectsScroll: React.FC<ProjectsProps> = ({ id }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const cacheKey = "projects_cache";
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const { projects: cachedProjects, timestamp } = JSON.parse(cached);
          const oneDay = 24 * 60 * 60 * 1000;
          const now = Date.now();

          if (now - timestamp < oneDay) {
            setProjects(cachedProjects);
            return;
          }
        } catch (error) {
          console.warn("Corrupted projects cache. Refetching...", error);
          localStorage.removeItem(cacheKey);
        }
      }

      const data = await getProjects();
      setProjects(data);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ projects: data, timestamp: Date.now() })
      );
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll("[data-index]");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [projects]);

  return (
    <div className="w-full" id={id}>
      {/* === Desktop & Tablet Version === */}
      <div
        className="hidden md:flex flex-row w-full min-h-screen"
        ref={containerRef}
      >
        {/* LEFT SIDE */}
        {projects.length > 0 && (
          <div className="bg-niuBg w-2/5 h-screen sticky top-0 flex-col justify-center p-12 border-r border-black overflow-hidden">
            <p className="text-sm mb-4 mt-24 tracking-wide text-white">
              NUESTROS PROYECTOS
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <h2 className="text-7xl font-bold mb-1 text-niuText">
                  {projects[activeIndex].name}
                </h2>
                {/* Services */}
                {projects.length > 0 && (
                  <h2 className="text-gray-100 font-medium">
                    {projects[activeIndex]?.services?.join("  |  ")}
                  </h2>
                )}
                <div className="text-sm mb-2 text-gray-300">
                  {projects[activeIndex].client} — {projects[activeIndex].year}
                </div>
                <div className="text-base max-w-sm pb-4 leading-relaxed prose text-gray-100">
                  <PortableText
                    value={projects[activeIndex].shortDescription}
                  />
                </div>
                <Link
                  href="/projects"
                  className="px-4 py-2 mt-12 border-niuText border-1 rounded-2xl text-niuText hover:text-[#084254] hover:bg-niuText transition duration-300"
                >
                  Ver más
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="w-3/5">
          {projects.map((project, index) => (
            <section
              key={index}
              data-index={index}
              className="h-screen w-full flex items-center justify-center bg-gray-100"
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.alt || `Project ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* === Mobile Version === */}
      <div className="md:hidden relative h-[400vh] w-full bg-niuBg">
        {projects.map((project, index) => (
          <div
            key={index}
            className="sticky top-0 h-screen w-full flex flex-col"
            style={{ zIndex: index + 1 }}
          >
            <div className="flex-1 relative w-full">
              <Image
                src={project.image}
                alt={project.alt || `Project ${index + 1}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            <div className="w-full p-6 border-t border-black min-h-[45vh] bg-niuBg text-gray-100">
              <h2 className="text-xl font-bold mb-1 text-niuText">
                {project.name}
              </h2>
              <div className="text-sm text-gray-300 mb-2">
                {project.client} — {project.year}
              </div>
              <div className="text-base leading-relaxed prose pb-6">
                <PortableText value={project.shortDescription} />
              </div>
              <Link
                href="/projects"
                className="px-4 py-2 border-1 rounded-2xl text-niuText hover:text-[#084254] hover:bg-niuText transition duration-300"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsScroll;

export const revalidate = 86400;
