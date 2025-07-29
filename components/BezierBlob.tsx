"use client";

import { useEffect, useRef, useState } from "react";
import type p5Types from "p5";

interface TerrainWaveCanvasProps {
  /** Pass "yes" to enable mouse-responsive ripples; any other value will center the wave */
  cursorResponsive?: string;
}

export default function TerrainWaveCanvas({
  cursorResponsive = "yes",
}: TerrainWaveCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5Types | null>(null);

  const cursorPos = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const lagPos = useRef({ ...cursorPos.current });

  const [followCursor, setFollowCursor] = useState(false);

  // ⏱ Delay real cursor tracking
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFollowCursor(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!followCursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, [followCursor]);

  useEffect(() => {
    if (sketchRef.current) return;
    let cancelled = false;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      if (cancelled) return;
      const p5 = p5Module.default;

      const sketch = (p: p5Types) => {
        const x_res = 30;
        const z_res = 30;
        const offset = 12;
        const noiseScale = 0.08;
        const noiseAmp = 8;
        const fadeRadius = x_res * offset * 0.5;

        const rippleRadius = 200;
        const rippleFreq = 0.05;
        const rippleSpeed = 1.5;

        let startTime: number;

        p.setup = () => {
          const parent = canvasRef.current;
          if (parent) {
            p.createCanvas(parent.offsetWidth, parent.offsetHeight, p.WEBGL);
            p.camera(0, -100, 300, 0, 0, 0, 0, 1, 0);
            startTime = p.millis() / 1000;
            p.perspective(p.PI / 3.0, p.width / p.height, 0.1, 1000);
            parent.classList.remove("opacity-0");
          }
        };

        p.draw = () => {
          const elapsedTime = p.millis() / 1000 - startTime;
          p.background(8, 65, 82);
          p.noFill();
          p.strokeWeight(0.3);

          let mx = 0;
          let my = 50;

          if (cursorResponsive === "yes" && canvasRef.current) {
            const bounds = canvasRef.current.getBoundingClientRect();

            // 🧠 Lerp cursor toward real mouse for smooth ripple lag
            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
            lagPos.current.x = lerp(lagPos.current.x, cursorPos.current.x, 0.1);
            lagPos.current.y = lerp(lagPos.current.y, cursorPos.current.y, 0.1);

            const { x: cursorX, y: cursorY } = lagPos.current;

            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            const verticalOffset = 150;
            const horizontalCompensation = 0.6;

            mx = (cursorX - centerX) * horizontalCompensation;
            my = cursorY - centerY + verticalOffset;
          }

          for (let z = -z_res / 2; z < z_res / 2 - 1; z++) {
            p.beginShape();
            for (let x = -x_res / 2; x < x_res / 2; x++) {
              const px = x * offset;
              const pz = z * offset;

              let y =
                p.noise(x * noiseScale, z * noiseScale, elapsedTime * 0.5) *
                noiseAmp;

              const d = p.dist(mx, my, px, pz);
              if (d < rippleRadius) {
                const ripple = p.map(
                  Math.cos(d * rippleFreq - elapsedTime * rippleSpeed),
                  -1,
                  1,
                  -8,
                  8
                );
                const falloff = 1 - d / rippleRadius;
                const centerSmooth = Math.tanh(d * 0.02);
                y += ripple * falloff * centerSmooth;
              }

              const edgeNoise = p.noise(
                px * 0.01,
                pz * 0.01,
                elapsedTime * 0.05
              );
              const irregularRadius = fadeRadius * (0.8 + edgeNoise * 0.4);
              const distanceToCenter = p.dist(0, 0, px, pz);
              const fade = p.map(distanceToCenter, 0, irregularRadius, 1, 0);
              const alpha = p.constrain(fade, 0, 1);

              p.stroke(3, 202, 255, alpha * 255);
              p.vertex(px, y, pz);
            }
            p.endShape();
          }
        };

        p.windowResized = () => {
          const parent = canvasRef.current;
          if (parent) {
            p.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
          }
        };
      };

      sketchRef.current = new p5(sketch, canvasRef.current!);
    };

    loadP5();
    return () => {
      cancelled = true;
      sketchRef.current?.remove();
      sketchRef.current = null;
    };
  }, [cursorResponsive]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-500"
    />
  );
}
