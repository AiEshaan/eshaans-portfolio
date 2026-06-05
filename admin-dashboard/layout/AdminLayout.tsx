"use client";

import React from "react";
import { AdminGuard } from "./AdminGuard";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-[#080808] text-zinc-100 font-sans">
        {/* Navigation Sidebar panel */}
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Action panel */}
          <AdminHeader />
          
          {/* Main workspace area */}
          <main className="flex-1 overflow-y-auto p-8 md:p-12">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
export default AdminLayout;
