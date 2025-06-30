"use client";

import React, { useEffect, useRef } from "react";
import type p5Types from "p5";

interface FlowFieldParticlesProps {
  numParticles?: number;
  noiseScale?: number;
  noiseStrength?: number;
  fadeAlpha?: number;
  dotSize?: number;
  repulseRadius?: number;
  repulseStrength?: number;
  topRepelRadius?: number;
  topRepelStrength?: number;
  cornerRepelRadius?: number;
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

    // detect mobile to reduce particle count
    const isMobile =
      typeof navigator !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent);
    const effectiveNum = isMobile ? Math.floor(numParticles / 3) : numParticles;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      if (cancelled) return;
      const p5 = p5Module.default;

      const sketch = (p: p5Types) => {
        type Vec = p5Types.Vector;
        const palette = ["#0f7d9e", "#00b1da", "#aedee4", "#006880", "#03caff"];
        const bgHex = "#084152";

        // pre-calc squared radii
        const repulseRadiusSq = repulseRadius * repulseRadius;
        const cornerRepelRadiusSq = cornerRepelRadius * cornerRepelRadius;

        // reused vectors
        let cursorVec: Vec;
        let cornerVec: Vec;
        let particles: Particle[] = [];

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
            this.loc.add(this.dir.mult(this.speed));
          }

          applyCursorRepel(cursor: Vec) {
            const dx = this.loc.x - cursor.x;
            const dy = this.loc.y - cursor.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < repulseRadiusSq) {
              const d = Math.sqrt(d2) || 1;
              const factor =
                ((repulseRadius - d) / repulseRadius) * repulseStrength;
              this.loc.x += (dx / d) * factor;
              this.loc.y += (dy / d) * factor;
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

          applyCornerRepel(corner: Vec) {
            const dx = this.loc.x - corner.x;
            const dy = this.loc.y - corner.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < cornerRepelRadiusSq) {
              const d = Math.sqrt(d2) || 1;
              const factor =
                ((cornerRepelRadius - d) / cornerRepelRadius) *
                cornerRepelStrength;
              this.loc.x += (dx / d) * factor;
              this.loc.y += (dy / d) * factor;
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
            this.loc.y = p.max(this.loc.y, 0);
          }

          draw() {
            const alpha = p.map(this.loc.x, 0, p.width, 255, 0);
            const c = p.color(this.baseColor);
            c.setAlpha(alpha);
            p.fill(c);
            p.ellipse(this.loc.x, this.loc.y, this.size);
          }

          run(cursor: Vec, corner: Vec) {
            this.move();
            this.applyCursorRepel(cursor);
            this.applyTopRepel();
            this.applyCornerRepel(corner);
            this.checkEdges();
            this.draw();
          }
        }

        p.setup = () => {
          const parent = canvasRef.current!;
          p.pixelDensity(1);
          p.frameRate(30);
          p.createCanvas(parent.offsetWidth, parent.offsetHeight);
          p.noStroke();
          cursorVec = p.createVector();
          cornerVec = p.createVector();
          particles = Array.from(
            { length: effectiveNum },
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
          // fade every other frame
          if (p.frameCount % 2 === 0) {
            const fadeColor = p.color(bgHex);
            fadeColor.setAlpha(fadeAlpha);
            p.fill(fadeColor);
            p.rect(0, 0, p.width, p.height);
          }

          cursorVec.set(p.mouseX, p.mouseY);
          cornerVec.set(p.width, 0);
          for (const pt of particles) {
            pt.run(cursorVec, cornerVec);
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
