// import NoiseCanvas from "@/components/NoiseCanvas";

import BezierCanvas from "@/components/NoiseWaves";

export default async function ProjectsPage() {
  return (
    <div className="h-screen">
      <BezierCanvas />
    </div>
  );
}

export const revalidate = 86400;
