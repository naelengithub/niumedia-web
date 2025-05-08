"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColabClick = () => {
    const el = document.getElementById("colaboradores");
    if (el) {
      const offsetBottom = el.offsetTop + el.offsetHeight;
      window.scrollTo({
        top: offsetBottom - window.innerHeight,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between md:px-12 ${className}`}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-2 w-fit">
          <div
            className={`flex gap-2 transition-transform duration-700 ${
              isOpen ? "rotate-[360deg]" : ""
            }`}
          >
            <Logo tone="light" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium mix-blend-difference">
          <Link href="/">Inicio</Link>
          <Link href="#servicios">Servicios</Link>
          <button
            onClick={handleColabClick}
            className="uppercase hover:cursor-pointer"
          >
            Colaboradores
          </button>
          <Link href="/projects">Proyectos</Link>
          <Link href="#contacto">Contacto</Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-3xl text-white z-50 relative w-8 h-8"
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
        className={`fixed top-0 left-0 w-full h-full z-40 bg-[#8dd2ec] backdrop-blur-md text-white transition-transform duration-500 ease-in-out md:hidden
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex flex-col justify-center items-start pl-6 gap-2 leading-tight text-[10vw] font-medium h-full pt-32">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <Link href="#servicios" onClick={() => setIsOpen(false)}>
            Servicios
          </Link>
          <button onClick={handleColabClick} className="hover:cursor-pointer">
            Colaboradores
          </button>
          <Link href="#contacto" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
          <Link
            href="mailto:hola@niumedia.tv"
            className="text-lg absolute bottom-6 left-1/4"
          >
            hola@niumedia.tv
          </Link>
        </div>
      </div>
    </>
  );
}
