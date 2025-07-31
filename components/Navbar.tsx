"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const isProjectsPage = pathname.startsWith("/projects");
  const lastYRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Show "Niumedia networks" after 80% of viewport height
      const showTitleThreshold = currentY > window.innerHeight * 0.8;
      setShowTitle(showTitleThreshold);

      // Hide navbar only after 120% of viewport height
      const hideNavbarThreshold = currentY > window.innerHeight * 0.8;

      if (!hideNavbarThreshold) {
        setShowNavbar(true);
        lastYRef.current = currentY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentY < lastYRef.current) {
        setShowNavbar(true);
      } else if (currentY > lastYRef.current) {
        setShowNavbar(false);
      }

      lastYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-screen z-50 px-6 py-6 flex items-center justify-between md:px-12 transition-all duration-500 transform ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${"text-gray-100"} ${
          showTitle && !isProjectsPage
            ? "backdrop-blur-md bg-gradient from-white/10 to-transparent"
            : ""
        } ${className}`}
      >
        {/* Logo + Title */}
        <Link href="/" className="flex flex-col items-center gap-4 w-fit group">
          <div className="flex">
            <div
              className={`flex gap-2 transition-transform duration-700 ${
                isOpen ? "rotate-[360deg]" : ""
              }`}
            >
              <Logo tone="color" />
            </div>
          </div>
          {/* Show Niumedia networks after scrolling past Hero */}
        </Link>

        {/* Desktop Nav */}
        <div
          className={`hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium ${
            isProjectsPage ? "text-gray-100" : "text-gray-100"
          }`}
        >
          <Link
            href="/"
            className="hover:text-niuText transition-colors duration-300"
          >
            Inicio
          </Link>
          {!isProjectsPage && (
            <>
              <Link
                href="#servicios"
                className="hover:text-niuText transition-colors duration-300"
              >
                Servicios
              </Link>
              <Link
                href="#proyectos"
                className="hover:text-niuText transition-colors duration-300"
              >
                Proyectos
              </Link>
              <Link
                href="#clientes"
                className="hover:text-niuText transition-colors duration-300"
              >
                Clientes
              </Link>
              <Link
                href="#contacto"
                className="hover:text-niuText transition-colors duration-300"
              >
                Contacto
              </Link>
              <Link
                href="/projects"
                className="hover:text-niuText transition-colors duration-300"
              >
                Archivo
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 text-3xl text-gray-100 z-50 relative w-8 h-8`}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
              isOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            ☰
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            ×
          </span>
        </button>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 bg-[#8dd2ec] backdrop-blur-md transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col justify-center items-start pl-6 gap-2 leading-tight text-[10vw] font-medium h-full pt-32 text-niuBg">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <div className="flex flex-col pl-6">
            <Link href="/#servicios" onClick={() => setIsOpen(false)}>
              Servicios
            </Link>
            <Link href="/#proyectos" onClick={() => setIsOpen(false)}>
              Proyectos
            </Link>
            <Link href="/#clientes" onClick={() => setIsOpen(false)}>
              Clientes
            </Link>
            <Link href="/#contacto" onClick={() => setIsOpen(false)}>
              Contacto
            </Link>
          </div>
          <Link href="/projects" onClick={() => setIsOpen(false)}>
            Archivo
          </Link>

          <p className="absolute text-xs w-full text-center bottom-6">
            Niumedia Networks 2025
          </p>
        </div>
      </div>
    </>
  );
}
