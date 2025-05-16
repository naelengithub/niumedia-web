"use client";

import { useEffect, useRef } from "react";
import type p5Types from "p5";

export default function BezierCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5Types | null>(null);

  useEffect(() => {
    const loadP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (p: p5Types) => {
        let t = 0;
        let fadeProgress = 0;
        let lastFadeTime = 0;

        p.setup = () => {
          const parent = canvasRef.current;
          if (parent) {
            p.createCanvas(parent.offsetWidth, parent.offsetHeight);
            p.background(7, 38, 51);
            p.noFill();
            lastFadeTime = p.millis();
            parent.classList.remove("opacity-0");
          }
        };

        p.draw = () => {
          fadeProgress = Math.min(fadeProgress + 0.01, 1);

          const now = p.millis();
          const timeSinceLastFade = now - lastFadeTime;

          // Trigger fade every 2s, lasting for 0.5s
          if (timeSinceLastFade >= 2000) {
            lastFadeTime = now;
          }

          if (timeSinceLastFade < 500) {
            p.fill(4, 32, 45, 20); // fade strength during active fade
            p.noStroke();
            p.rect(0, 0, p.width, p.height);
            p.noFill();
          }

          p.stroke(0, 177, 218, 80 * fadeProgress);

          const w = p.width;
          const h = p.height;

          const mx = p.map(p.mouseX, 0, p.width, 0.9, 1.1);
          const my = p.map(p.mouseY, 0, p.height, 0.8, 1.2);

          const x1 = 0;
          const y1 = h;

          const x2 = w * p.noise((t + 25) * 2.5) * mx;
          const y2 = h * p.noise(t + 65) * my;
          const x3 = w * p.noise(t + 35) * mx;
          const y3 = h * p.noise(t + 75) * my;
          const x4 = w * p.noise(t + 45);
          const y4 = h * p.noise(t + 85);

          p.bezier(x1, y1, x2, y2, x3, y3, x4, y4);

          t += 0.003;
        };

        p.windowResized = () => {
          const parent = canvasRef.current;
          if (parent) {
            p.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
            p.background(8, 65, 82);
          }
        };
      };

      const p5Instance = new p5(sketch, canvasRef.current!);
      sketchRef.current = p5Instance;
    };

    loadP5();

    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 transition-opacity duration-500"
    />
  );
}
