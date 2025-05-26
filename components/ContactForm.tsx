"use client";

import { useRef } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "./Footer";

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative isolate md:pt-12 md:h-[90vh] md:justify-between"
      id={id}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="pt-18 px-6 text-gray-300 sm:px-12">
          <div className="text-right">
            <p className="text-pretty text-lg font-medium tracking-tight md:text-2xl">
              ¿Te interesa colaborar?
            </p>
            <h2 className="mt-2 text-niuText text-5xl md:text-8xl md:mt-6">
              Hablemos.
            </h2>
          </div>
          <dl className="flex flex-col items-end mt-10 space-y-4 text-base/7">
            <div className="flex gap-x-4 hover:text-[#006881]">
              <dt className="flex-none">
                <span className="sr-only">Teléfono</span>
                <PhoneIcon aria-hidden="true" className="h-7 w-6" />
              </dt>
              <dd>
                <Link href="tel:(55) 1844-7217">+52 (55) 5171-1000</Link>
              </dd>
            </div>
            <div className="flex gap-x-4 hover:text-[#006881]">
              <dt className="flex-none">
                <span className="sr-only">Email</span>
                <EnvelopeIcon aria-hidden="true" className="h-7 w-6" />
              </dt>
              <dd>
                <Link href="mailto:hola@niumedia.tv">hola@niumedia.tv</Link>
              </dd>
            </div>
          </dl>
        </div>
        <div className="align-end">
          <Footer />
        </div>
      </div>
    </div>
  );
}
