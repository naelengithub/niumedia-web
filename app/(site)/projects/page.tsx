import { getProjects } from "@/sanity/sanity-utils";
import Projects from "@/components/Projects"; // this will stay as a client component

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <Projects projects={projects} />;
}

export const revalidate = 86400;
