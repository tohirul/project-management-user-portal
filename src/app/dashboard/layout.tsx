// src/app/dashboard/layout.tsx
import React from "react";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import ThemeProvider from "@/providers/ThemeProvider";
import StoreProvider from "@/providers/StoreProvider";
import CollapsibleMainProvider from "@/providers/CollapsibleMainProvider";
import LoadProvider from "@/providers/LoadProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <div className="bg-dark flex min-h-screen w-full text-gray-900">
          <LoadProvider>
            <Sidebar />
            <CollapsibleMainProvider>
              <Navbar />
              {children}
            </CollapsibleMainProvider>
          </LoadProvider>
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}
