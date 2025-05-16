"use client";

import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const gravity = 0.03;
const friction = -0.9;

let ball;
let image;
let shouldMove = false;

export default function P5Sketch() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);
  const [visible, setVisible] = useState(false); // 👈 for slide-in effect

  useEffect(() => {
    const sketch = (p) => {
      p.preload = () => {
        image = p.loadImage("/svg/abstracto.svg");
      };

      p.setup = () => {
        const width = sketchRef.current?.clientWidth || window.innerWidth;
        const height = sketchRef.current?.clientHeight || window.innerHeight;
        p.createCanvas(width, height);

        const diameter = width < 768 ? 800 : 180; // 👈 SVG is now smaller
        const startX = -5 * diameter;
        const startY = -3 * diameter;
        ball = new Ball(startX, startY, diameter, image);

        p.noStroke();
      };

      p.draw = () => {
        p.clear();
        if (image && ball) {
          ball.move(p);
          ball.display(p);
        }
      };

      p.windowResized = () => {
        const width = sketchRef.current?.clientWidth || window.innerWidth;
        const height = sketchRef.current?.clientHeight || window.innerHeight;
        p.resizeCanvas(width, height);
      };
    };

    p5Instance.current = new p5(sketch, sketchRef.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shouldMove = true;
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sketchRef.current) observer.observe(sketchRef.current);

    return () => {
      p5Instance.current.remove();
      if (sketchRef.current) observer.unobserve(sketchRef.current);
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      className={`w-full h-full absolute top-0 left-0 pointer-events-none -z-10 transition-all duration-1000 ease-in-out transform ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`}
    />
  );
}

// Ball class
class Ball {
  constructor(x, y, diameter, img) {
    this.x = x;
    this.y = y;
    this.vx = 3;
    this.vy = 0;
    this.diameter = diameter;
    this.img = img;
    // this.rotation = 0; // 👈 commented out rotation
  }

  move(p) {
    if (!shouldMove) return;

    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    const canvasWidth = p.width;
    const canvasHeight = p.height;

    if (this.x + this.diameter / 2 > canvasWidth) {
      this.x = canvasWidth - this.diameter / 2;
      this.vx *= friction;
    }

    if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }

    if (this.y + this.diameter / 2 > canvasHeight) {
      this.y = canvasHeight - this.diameter / 2;
      this.vy *= friction;
    }

    if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }

    // const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    // this.rotation += speed * 0.01; // 👈 commented out rotation
  }

  display(p) {
    if (!this.img) return;
    p.push();
    p.translate(this.x, this.y);
    // p.rotate(this.rotation); // 👈 commented out rotation
    p.imageMode(p.CENTER);
    p.image(this.img, 0, 0, this.diameter, this.diameter);
    p.pop();
  }
}
