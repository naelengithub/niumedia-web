"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex items-center justify-between bg-transparent sm:px-12">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-2 w-fit">
        <div className="flex gap-2 color-black mix-blend-difference">
          <Logo tone="dark" />
          {/* <p className="text-lg font-light uppercase tracking-widest">
            Niumedia
          </p>
        </div>
        <div className="flex w-full justify-between uppercase text-xs tracking-wider">
          {"networks".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))} */}
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light mix-blend-difference">
        <Link href="/">Inicio</Link>
        <Link href="#servicios">Servicios</Link>
        <Link href="#colaboradores">Colaboradores</Link>
        <Link href="#contacto">Contacto</Link>
      </div>
    </nav>
  );
}
