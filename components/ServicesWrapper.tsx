import { getServices } from "@/sanity/sanity-utils";
import ServiceGrid from "./ServiceGrid";
import { Service } from "@/types/Service";

export default async function ServicesWrapper() {
  const services: Service[] = await getServices();

  return <ServiceGrid services={services} />;
}
