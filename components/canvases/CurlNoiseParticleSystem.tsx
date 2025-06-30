"use client";

import { useEffect, useRef } from "react";
import type p5Types from "p5";

interface FlowFieldParticlesProps {
  numParticles?: number;
  noiseScale?: number;
  noiseStrength?: number;
  fadeAlpha?: number;
  dotSize?: number;
  repulseRadius?: number;
  repulseStrength?: number;
  /** How close to the top edge before particles get pushed down */
  topRepelRadius?: number;
  /** Strength of the top-edge repulsion */
  topRepelStrength?: number;
  /** How close to the top-right corner before particles get pushed away */
  cornerRepelRadius?: number;
  /** Strength of the top-right corner repulsion */
  cornerRepelStrength?: number;
  className?: string;
}

export default function FlowFieldParticles({
  numParticles = 1500,
  noiseScale = 500,
  noiseStrength = 1,
  fadeAlpha = 80,
  dotSize = 3,
  repulseRadius = 100,
  repulseStrength = 2,
  topRepelRadius = 50,
  topRepelStrength = 2,
  cornerRepelRadius = 100,
  cornerRepelStrength = 2,
  className = "",
}: FlowFieldParticlesProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5Types | null>(null);

  useEffect(() => {
    if (sketchRef.current) return;
    let cancelled = false;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      if (cancelled) return;
      const p5 = p5Module.default;

      const sketch = (p: p5Types) => {
        type Vec = p5Types.Vector;
        const palette = ["#0f7d9e", "#00b1da", "#aedee4", "#006880", "#03caff"];
        const bgHex = "#084152";

        class Particle {
          loc: Vec;
          dir: Vec;
          speed: number;
          size: number;
          baseColor: string;

          constructor(size: number) {
            this.loc = p.createVector(
              p.random(p.width * 1.2),
              p.random(p.height)
            );
            this.dir = p.createVector(1, 0);
            this.speed = p.random(0.5, 1);
            this.size = size;
            this.baseColor = p.random(palette);
          }

          move() {
            const angle =
              p.noise(
                this.loc.x / noiseScale,
                this.loc.y / noiseScale,
                p.frameCount / noiseScale
              ) *
              p.TWO_PI *
              noiseStrength;
            this.dir.set(Math.cos(angle), Math.sin(angle));
            this.loc.add(this.dir.copy().mult(this.speed));
          }

          applyCursorRepel(cursor: Vec) {
            const d = this.loc.dist(cursor);
            if (d < repulseRadius) {
              const away = p5.Vector.sub(this.loc, cursor)
                .normalize()
                .mult(((repulseRadius - d) / repulseRadius) * repulseStrength);
              this.loc.add(away);
            }
          }

          applyTopRepel() {
            if (this.loc.y < topRepelRadius) {
              const push =
                ((topRepelRadius - this.loc.y) / topRepelRadius) *
                topRepelStrength;
              this.loc.y += push;
            }
          }

          applyCornerRepel() {
            // repel from the top-right corner
            const corner = p.createVector(p.width, 0);
            const d = this.loc.dist(corner);
            if (d < cornerRepelRadius) {
              const away = p5.Vector.sub(this.loc, corner)
                .normalize()
                .mult(
                  ((cornerRepelRadius - d) / cornerRepelRadius) *
                    cornerRepelStrength
                );
              this.loc.add(away);
            }
          }

          checkEdges() {
            if (
              this.loc.x < 0 ||
              this.loc.x > p.width ||
              this.loc.y > p.height
            ) {
              this.loc.x = p.random(p.width, p.width * 1.2);
              this.loc.y = p.random(p.height * 0.2, p.height);
            }
            // prevent going above top
            this.loc.y = p.max(this.loc.y, 0);
          }

          draw() {
            const alpha = p.map(this.loc.x, 0, p.width, 255, 0);
            const c = p.color(this.baseColor);
            c.setAlpha(alpha);
            p.fill(c);
            p.ellipse(this.loc.x, this.loc.y, this.size);
          }

          run(cursor: Vec) {
            this.move();
            this.applyCursorRepel(cursor);
            this.applyTopRepel();
            this.applyCornerRepel();
            this.checkEdges();
            this.draw();
          }
        }

        let particles: Particle[] = [];

        p.setup = () => {
          const parent = canvasRef.current!;
          p.createCanvas(parent.offsetWidth, parent.offsetHeight);
          p.noStroke();
          particles = Array.from(
            { length: numParticles },
            () => new Particle(dotSize)
          );
          p.background(bgHex);
        };

        p.windowResized = () => {
          const parent = canvasRef.current!;
          p.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
          p.background(bgHex);
        };

        p.draw = () => {
          // fade for trails
          const fadeColor = p.color(bgHex);
          fadeColor.setAlpha(fadeAlpha);
          p.fill(fadeColor);
          p.rect(0, 0, p.width, p.height);

          const cursor = p.createVector(p.mouseX, p.mouseY);
          for (const pt of particles) {
            pt.run(cursor);
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
  }, [
    numParticles,
    noiseScale,
    noiseStrength,
    fadeAlpha,
    dotSize,
    repulseRadius,
    repulseStrength,
    topRepelRadius,
    topRepelStrength,
    cornerRepelRadius,
    cornerRepelStrength,
    className,
  ]);

  return (
    <div
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
