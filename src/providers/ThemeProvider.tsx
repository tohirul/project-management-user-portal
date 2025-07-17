"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/store/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppSelector((state: RootState) => state.global.theme.mode);

  useEffect(() => {
    const root = document.documentElement.classList;
    if (theme === "dark") {
      root.add("dark");
      root.remove("light");
    } else {
      root.add("light");
      root.remove("dark");
    }
  }, [theme]);

  return <React.Fragment>{children}</React.Fragment>;
}
