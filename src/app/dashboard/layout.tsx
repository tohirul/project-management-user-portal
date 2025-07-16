import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ThemeProvider from "@/Providers/ThemeProvider";
import StoreProvider from "@/Providers/StoreProvider";
import CollapsibleMainProvider from "@/Providers/CollapsibleMainProvider";
import LoadProvider from "@/Providers/LoadProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <div className="flex min-h-screen w-full text-gray-900">
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
