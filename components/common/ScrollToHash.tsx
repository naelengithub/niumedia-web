"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Delay ensures layout has loaded
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return null;
}
