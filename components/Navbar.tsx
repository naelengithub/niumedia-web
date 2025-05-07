"use client";

import Link from "next/link";
import Logo from "./Logo";

export interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between ${className}`}
    >
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-2 w-fit">
        <div className="flex gap-2">
          <Logo tone="light" />
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium mix-blend-difference">
        <Link href="/">Inicio</Link>
        <Link href="#servicios">Servicios</Link>
        <Link href="#colaboradores">Colaboradores</Link>
        <Link href="#contacto">Contacto</Link>
      </div>
    </nav>
  );
}
