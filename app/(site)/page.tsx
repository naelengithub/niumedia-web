import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import ScrollScaleText from "@/components/ScrollScaleText";
import Contact from "@/components/ContactForm";
//import ServiceGrid from "@/components/ServiceGrid";
import SplashWrapper from "@/components/SplashScreenWrapper";
// import { getServices } from "@/sanity/sanity-utils";
//import ServicesWrapper from "@/components/ServicesWrapper";
// import AccordionComponent from "@/components/Accordion";

export default async function Home() {
  // const services = await getServices(); // ✅ use real data from Sanity

  return (
    <SplashWrapper>
      <div className="bg-gradient-to-t from-[#084152] to-[#084152]/90">
        <Hero />
        <div className="h-[20vh]" />
      </div>
      <About className="bg-gradient-to-t from-[#084152] to-[#084152] text-white" />
      {/* <AccordionComponent services={services} /> */}
      {/* <div id="servicios">
        <ServiceGrid services={services} />
      </div>
      <ServicesWrapper /> */}
      <Services id="proyectos" />
      <ScrollScaleText text="Colaboramos" id="colaboradores" />
      <Contact id="contacto" />
    </SplashWrapper>
  );
}
