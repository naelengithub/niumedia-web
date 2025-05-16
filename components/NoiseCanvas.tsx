"use client";

import { useEffect, useRef } from "react";
import type p5Types from "p5";

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5Types | null>(null);

  useEffect(() => {
    const loadP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (p: p5Types) => {
        // === CONFIG ===
        const scl = 10;
        const inc = 0.1;
        const zOffInc = 0.0003;
        const angMult = 30;
        const angTurn = 1;
        const numParticles = 2000;
        const fadeAlpha = 2;
        const strokeWeight = 0.3;

        const startDelay = 2000;
        const fadeDuration = 4000;

        let cols: number, rows: number;
        let zoff = 0;
        let flowfield: p5Types.Vector[] = [];
        const particles: Particle[] = [];
        let paused = false;

        class Particle {
          pos: p5Types.Vector;
          vel: p5Types.Vector;
          acc: p5Types.Vector;
          prevPos: p5Types.Vector;
          maxSpeed: number;

          constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.prevPos = this.pos.copy();
            this.maxSpeed = 2.5;
          }

          update() {
            this.acc.add(p.createVector(-1, 0));
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
          }

          applyForce(force: p5Types.Vector) {
            this.acc.add(force);
          }

          show(alpha: number) {
            p.stroke(174, 222, 228, alpha);
            p.strokeWeight(strokeWeight);
            p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.prevPos.set(this.pos);
          }

          edges() {
            if (this.pos.x > p.width) {
              this.pos.x = p.random(p.width * 0.1);
              this.prevPos = this.pos.copy();
            }
            if (this.pos.x < 0) {
              this.pos.x = p.width;
              this.prevPos = this.pos.copy();
            }
            if (this.pos.y > p.height) {
              this.pos.y = 0;
              this.prevPos = this.pos.copy();
            }
            if (this.pos.y < 0) {
              this.pos.y = p.height;
              this.prevPos = this.pos.copy();
            }
          }

          follow(vectors: p5Types.Vector[]) {
            const x = Math.floor(this.pos.x / scl);
            const y = Math.floor(this.pos.y / scl);
            const index = x + y * cols;
            const force = vectors[index];
            if (force) this.applyForce(force);
          }
        }

        p.setup = () => {
          const parentEl = canvasRef.current;
          if (parentEl) {
            const { offsetWidth: w, offsetHeight: h } = parentEl;
            p.createCanvas(w, h);
            p.background(8, 65, 82);
            cols = Math.floor(w / scl);
            rows = Math.floor(h / scl);
            flowfield = new Array(cols * rows);

            for (let i = 0; i < numParticles; i++) {
              particles.push(new Particle());
            }
          }
        };

        p.draw = () => {
          if (!paused) {
            p.noStroke();
            p.fill(8, 65, 82, fadeAlpha);
            p.rect(0, 0, p.width, p.height);

            let yoff = 0;
            for (let y = 0; y < rows; y++) {
              let xoff = 0;
              for (let x = 0; x < cols; x++) {
                const index = x + y * cols;
                const angle = p.noise(xoff, yoff, zoff) * angMult + angTurn;
                const v = p5.Vector.fromAngle(angle);
                const mag = p.map(x, 0, cols, 1.4, 0.3);
                v.setMag(mag);
                flowfield[index] = v;
                xoff += inc;
              }
              yoff += inc;
            }

            zoff += zOffInc;

            const now = p.millis();
            if (now > startDelay) {
              const t = p.constrain((now - startDelay) / fadeDuration, 0, 1);
              const alpha = t * 255;

              for (const particle of particles) {
                particle.follow(flowfield);
                particle.update();
                particle.edges();
                particle.show(alpha);
              }
            }
          }
        };

        p.windowResized = () => {
          const parentEl = canvasRef.current;
          if (parentEl) {
            const { offsetWidth: w, offsetHeight: h } = parentEl;
            p.resizeCanvas(w, h);
            p.background(8, 65, 82);
            cols = Math.floor(w / scl);
            rows = Math.floor(h / scl);
            flowfield = new Array(cols * rows);
          }
        };

        p.mousePressed = () => {
          paused = !paused;
        };

        p.keyTyped = () => {
          if (p.key === "s") {
            p.save("flowfield.jpg");
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
      className="relative w-full h-full z-0 pointer-events-none"
    />
  );
}
