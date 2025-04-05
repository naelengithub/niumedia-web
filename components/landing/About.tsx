"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="mx-auto p-12">
      <div className="text-6xl">
        <div className="flex items-end gap-4">
          <Image
            src="/about.png"
            alt="About visual"
            width={208}
            height={208}
            className="w-40 h-40 pb-1 md:w-52 md:h-52 object-cover"
          />
          <span className="">
            Construimos nuevas y mejores formas de comunicación.
          </span>
        </div>
        <p className="mt-2">
          Somos una empresa con experiencia en la producción y administración de
          contenidos Digital Signage y Eventos Virtuales en vivo.
        </p>
      </div>
      <div className="flex gap-24 mt-24">
        <h1 className="uppercase">Nuestra experiencia</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-12">
            <p>Creación de contenido para medios digitales</p>
            <div className="">
              <p>
                Reunimos talentos con experiencia en comunicación digital,
                diseño gráfico, tecnologías de la información e infraestructura.
              </p>
              <p className="my-4">
                Animación, composición digital y edición de video. Diseño,
                instalación y mantenimiento de sistemas y tecnologías de
                información interactiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
