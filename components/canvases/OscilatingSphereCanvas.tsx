"use client";

import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 400;
const RADIUS = 150;
const STEP = 20;

// Detect screen size once (client-side)
const isMobile =
  typeof window !== "undefined" ? window.innerWidth <= 768 : false;
const NUM_WAVES = isMobile ? 8 : 20; // Reduce for mobile

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
  const distortionRef = useRef<number>(1); // 1 = normal circle

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleFactor = isMobile ? 0.5 : 1;
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    // Initialize waves
    const waves: Wave[] = Array.from({ length: NUM_WAVES }, (_, i) => ({
      shift: i * STEP,
      angle: 0,
      movement: 0,
      period: 1,
    }));

    wavesRef.current = waves;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.save();
      ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillStyle = "#00b1da";

      const distortion = distortionRef.current;

      for (const wave of wavesRef.current) {
        for (let i = 0; i <= 360; i++) {
          const x = ((i / 360) * 2 - 1) * RADIUS;
          const amp = RADIUS * Math.sqrt(1 - Math.pow(x / RADIUS, 2));
          const angle = i + wave.angle + wave.shift * wave.movement;
          const y = amp * Math.sin(toRadians(angle * wave.period));

          const distortedX = x * distortion;

          ctx.beginPath();
          ctx.ellipse(distortedX, y, 1, 1, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        wave.angle += 0.2;
        wave.movement = Math.cos(toRadians(wave.angle));
      }

      ctx.restore();
    };

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      draw();
      if (isMobile) {
        timeoutId = setTimeout(animate, 1000 / 30); // ~30fps on mobile
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normX = clamp(x / rect.width, 0, 1); // 0 (left) → 1 (right)

      // Map normX → horizontal distortion from 0.7 (squished) to 1.5 (stretched)
      distortionRef.current = lerp(0.7, 1.5, normX);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10 bg-transparent">
      <canvas
        ref={canvasRef}
        className="rounded-xl max-w-full h-auto"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      />
    </div>
  );
}
