"use client";

import React, { useRef } from "react";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/hooks/reduxHooks";
import { cn } from "@/utility";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MainProviderProps {
  children: React.ReactNode;
}

export default function CollapsibleMainProvider({
  children,
}: MainProviderProps) {
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state.global.sidebar.isSidebarCollapsed,
  );
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = mainRef.current;
      if (!el) return;

      gsap.to(el, {
        paddingLeft: isSidebarCollapsed ? 0 : "16rem", // 256px
        duration: 0.4,
        ease: "power2.inOut",
      });
    },
    { dependencies: [isSidebarCollapsed] },
  );

  return (
    <main
      ref={mainRef}
      className={cn("bg-dark flex min-h-screen w-full flex-col")}
    >
      {children}
    </main>
  );
}
