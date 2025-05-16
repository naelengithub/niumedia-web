import { getProjects } from "@/sanity/sanity-utils";
import Projects from "@/components/Projects";
import BezierCanvasWrapper from "@/components/BezierCanvasWrapper";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-[#072633] min-h-screen relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/3 h-full">
        <BezierCanvasWrapper />
      </div>

      <div className="relative z-10">
        <Projects projects={projects} />
      </div>
    </div>
  );
}

export const revalidate = 86400;
