import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import ScrollScaleText from "@/components/ScrollScaleText";
import Contact from "@/components/ContactForm";
import SplashWrapper from "@/components/SplashScreenWrapper";
import { getServices } from "@/sanity/sanity-utils";
import AccordionComponent from "@/components/Accordion";

export default async function Home() {
  const services = await getServices(); // ✅ use real data from Sanity

  return (
    <SplashWrapper>
      <div className="bg-niuBg">
        <div className="bg-gradient-to-t from-niuBg to-niuBg/90">
          <Hero />
          <div className="h-[20vh]" />
        </div>
        <About className="bg-gradient-to-t from-niuBg to-niuBg text-white" />
        <div className="h-[10vh] border-0" id="servicios" />
        <AccordionComponent services={services} />
        <Services id="proyectos" />
        <div className="relative isolate">
          {/* Background radial gradient SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#03caff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#084254" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#centerGradient)" />
          </svg>

          {/* Your content */}
          <ScrollScaleText text="Clientes" id="clientes" />
          <Contact id="contacto" />
        </div>
      </div>
    </SplashWrapper>
  );
}
