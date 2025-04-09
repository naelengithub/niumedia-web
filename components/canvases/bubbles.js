"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";

const gravity = 0.03;
const friction = -0.9;

let ball;
let image;

export default function P5Sketch() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.preload = () => {
        image = p.loadImage("/images/im3.png"); // Adjust if needed
      };

      p.setup = () => {
        const width = sketchRef.current?.clientWidth || window.innerWidth;
        const height = sketchRef.current?.clientHeight || window.innerHeight;
        p.createCanvas(width, height);

        const diameter = width < 768 ? 120 : 250;
        const startX = diameter / 2; // hard against left edge
        const startY = -diameter; // start above the section
        ball = new Ball(startX, startY, diameter, image);

        p.noStroke();
      };

      p.draw = () => {
        p.clear(); // Transparent background
        ball.move(p);
        ball.display(p);
      };

      p.windowResized = () => {
        const width = sketchRef.current?.clientWidth || window.innerWidth;
        const height = sketchRef.current?.clientHeight || window.innerHeight;
        p.resizeCanvas(width, height);
      };
    };

    p5Instance.current = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.current.remove();
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      className="w-full h-full absolute top-0 left-0 pointer-events-none -z-10"
    />
  );
}

// Ball class definition
class Ball {
  constructor(x, y, diameter, img) {
    this.x = x;
    this.y = y;
    this.vx = 3;
    this.vy = 0;
    this.diameter = diameter;
    this.img = img;
    this.rotation = 0;
  }

  move(p) {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    const canvasWidth = p.width;
    const canvasHeight = p.height;

    // Right wall
    if (this.x + this.diameter / 2 > canvasWidth) {
      this.x = canvasWidth - this.diameter / 2;
      this.vx *= friction;
    }

    // Left wall
    else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }

    // Bottom "floor" = bottom of <Contact />
    if (this.y + this.diameter / 2 > canvasHeight) {
      this.y = canvasHeight - this.diameter / 2;
      this.vy *= friction;
    }

    // Top ceiling
    else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }

    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    this.rotation += speed * 0.01;
  }

  display(p) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotation);
    p.imageMode(p.CENTER);
    p.image(this.img, 0, 0, this.diameter, this.diameter);
    p.pop();
  }
}
