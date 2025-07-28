"use client";

import { useRef } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative isolate md:h-[90vh] md:justify-between overflow-hidden border-t-1 border-niu02"
      id={id}
    >
      {/* Background */}
      <div className="absolute inset-0 z-[-10] w-full h-full">
        <video
          className="w-full h-full object-cover object-top opacity-75"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/cut2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-end h-full">
        <div className="flex flex-col justify-between h-full w-fit relative z-10">
          <div className="pt-18 px-6 text-gray-100 sm:px-12 py-24">
            <div className="text-right">
              <p className="text-pretty text-lg font-medium tracking-tight md:text-4xl">
                ¿Te interesa colaborar?
              </p>
              <h2 className="mt-2 text-white text-5xl md:text-9xl md:mt-6">
                Hablemos.
              </h2>
            </div>
            <dl className="flex flex-col items-end mt-10 space-y-4 text-base/7 sm:text-3xl">
              <div className="flex gap-x-4 hover:text-[#006881]">
                <dt className="flex-none">
                  <span className="sr-only">Teléfono</span>
                  <PhoneIcon aria-hidden="true" className="h-8 w-8" />
                </dt>
                <dd>
                  <Link href="tel:(55) 1844-7217">+52 (55) 5171-1000</Link>
                </dd>
              </div>
              <div className="flex gap-x-4 hover:text-[#006881]">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-8 w-8" />
                </dt>
                <dd>
                  <Link href="mailto:hola@niumedia.tv">hola@niumedia.tv</Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
