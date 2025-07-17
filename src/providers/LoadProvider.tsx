"use client";

import React, { useState, useEffect } from "react";

import AppLoader from "@/components/shared/AppLoader";

export default function LoadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsReady(true);
      clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Delay rendering until theme is applied
  if (!isReady) return <AppLoader />;

  return <React.Fragment>{children}</React.Fragment>;
}
