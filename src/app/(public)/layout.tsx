import React from "react";

// type Props = {};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <main className="bg-dark flex w-full flex-col bg-gray-50">
        {/* Navbar */}

        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
