"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import ScrollToHash from "./common/ScrollToHash";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <ScrollToHash />
      {children}
      {showSplash && <SplashScreen onFinished={() => setShowSplash(false)} />}
    </>
  );
}
