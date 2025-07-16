"use client";

import React from "react";

import { RootState } from "@/store/store";
import { useAppSelector } from "@/hooks/reduxHooks";
import { cn } from "@/utility";

interface MainProviderProps {
  children: React.ReactNode;
}

export default function CollapsibleMainProvider({
  children,
}: MainProviderProps) {
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state.global.sidebar.isSidebarCollapsed,
  );

  return (
    <main
      className={cn(
        "bg-dark flex w-full flex-col bg-gray-50",
        !isSidebarCollapsed ? "md:pl-64" : "",
      )}
    >
      {children}
    </main>
  );
}
