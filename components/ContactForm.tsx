"use client";

import { useEffect, useRef, useState } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import Footer from "./Footer";

const DynamicP5Sketch = dynamic(() => import("./canvases/bubbles"), {
  ssr: false,
});

interface ContactProps {
  id?: string;
}

export default function Contact({ id }: ContactProps) {
  const containerRef = useRef(null);
  const [showSketch, setShowSketch] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSketch(true); // 👈 only activate, never deactivate
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate pt-18 px-6 md:pt-12 md:h-[90vh]"
      id={id}
    >
      <div className="text-right">
        <p className="text-pretty text-lg font-semibold tracking-tight md:text-2xl">
          ¿Te interesa colaborar?
        </p>
        <h2 className="mt-2 text-5xl md:text-8xl md:mt-6">Hablemos.</h2>
      </div>
      <dl className="flex flex-col items-end mt-10 space-y-4 text-base/7">
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Teléfono</span>
            <PhoneIcon aria-hidden="true" className="h-7 w-6" />
          </dt>
          <dd>
            <Link href="tel:(55) 1844-7217" className="hover:text-background">
              +52 (55) 5555-5555
            </Link>
          </dd>
        </div>
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Email</span>
            <EnvelopeIcon aria-hidden="true" className="h-7 w-6" />
          </dt>
          <dd>
            <Link
              href="mailto:hola@niumedia.tv"
              className="hover:text-background"
            >
              hola@niumedia.tv
            </Link>
          </dd>
        </div>
      </dl>
      <Footer />
      {showSketch && <DynamicP5Sketch />}
    </div>
  );
}
