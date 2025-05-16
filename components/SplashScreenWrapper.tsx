"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinished={() => setShowSplash(false)} />
  ) : (
    <>{children}</>
  );
}
