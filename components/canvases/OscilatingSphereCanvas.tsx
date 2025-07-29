"use client";

import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 400;
const RADIUS = 150;
const NUM_WAVES = 20;
const STEP = 20;
const POINT_STEP = 6; // <— controls resolution

type Wave = {
  shift: number;
  angle: number;
  movement: number;
  period: number;
};

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function OscillatingSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const speedRef = useRef<number>(0.2);
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    wavesRef.current = Array.from({ length: NUM_WAVES }, (_, i) => ({
      shift: i * STEP,
      angle: 0,
      movement: 0,
      period: 1,
    }));

    // 👇 NEW: boost speed on mobile
    if (!isDesktop) {
      speedRef.current = 0.6; // Adjust as needed
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = "#00b1da";

      for (const wave of wavesRef.current) {
        for (let i = 0; i <= 360; i += POINT_STEP) {
          const x = ((i / 360) * 2 - 1) * RADIUS;
          const amp = RADIUS * Math.sqrt(1 - Math.pow(x / RADIUS, 2));
          const angle = i + wave.angle + wave.shift * wave.movement;
          const y = amp * Math.sin(toRadians(angle * wave.period));

          ctx.beginPath();
          ctx.ellipse(x, y, 1, 1, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        wave.angle += speedRef.current;
        wave.movement = Math.cos(toRadians(wave.angle));
      }

      ctx.restore();
    };

    let animationFrameId: number;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normX = clamp(x / rect.width, 0, 1);
      speedRef.current = lerp(0.05, 0.5, normX);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (isDesktop) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isDesktop]);

  return (
    <div className="w-full flex justify-center items-center py-10 bg-transparent">
      <canvas ref={canvasRef} className="rounded-xl max-w-full h-auto" />
    </div>
  );
}
