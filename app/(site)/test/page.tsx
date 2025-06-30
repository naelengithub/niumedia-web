import BlobCanvas from "@/components/BezierBlob";
import CurlParticleCanvas from "@/components/canvases/CurlNoiseParticleSystem";

export default async function ProjectsPage() {
  return (
    <div className="absolute w-full h-3/6">
      <BlobCanvas />
      <CurlParticleCanvas />
    </div>
  );
}

export const revalidate = 86400;
