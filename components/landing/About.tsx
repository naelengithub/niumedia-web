"use client";

import Image from "next/image";

interface AboutProps {
  className?: string;
}

export default function About(props: AboutProps) {
  const { className } = props;
  return (
    <section className={`${className} p-8 md:p-12`}>
      <div className="text-xl leading-8 md:text-6xl md:leading-16">
        <div className="flex items-end gap-4 lg:justify-center">
          <Image
            src="/about.png"
            alt="About visual"
            width={208}
            height={208}
            className="w-32 h-40 pb-1 md:w-52 md:h-52 lg:w-72 lg:h-72 object-cover"
          />
          <span className="max-w-72 md:max-w-4xl">
            Construimos nuevas y mejores formas de comunicación.
          </span>
        </div>
        <p className="mt-0">
          Somos una empresa con experiencia en la producción y administración de
          contenidos Digital Signage y Eventos Virtuales en vivo.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:gap-24 mt-24 py-20 md:flex-row">
        <h1 className="uppercase text-sm">Nuestra experiencia</h1>
        <div className="flex flex-col gap-4 md:gap-12 md:flex-row">
          <p className="text-3xl">
            Creación de contenido para medios digitales
          </p>
          <div className="">
            <p>
              Reunimos talentos con experiencia en comunicación digital, diseño
              gráfico, tecnologías de la información e infraestructura.
            </p>
            <p className="my-4">
              Animación, composición digital y edición de video. Diseño,
              instalación y mantenimiento de sistemas y tecnologías de
              información interactiva.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
