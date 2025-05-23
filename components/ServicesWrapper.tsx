import { getServices } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service";
import QuadrantGrid from "@/app/(site)/test/page";

export default async function ServicesWrapper() {
  const services: Service[] = await getServices();

  return <QuadrantGrid services={services} />;
}
