"use client";

import dynamic from "next/dynamic";

const BezierCanvas = dynamic(() => import("./NoiseWaves"), { ssr: false });

export default function BezierCanvasWrapper() {
  return <BezierCanvas />;
}
