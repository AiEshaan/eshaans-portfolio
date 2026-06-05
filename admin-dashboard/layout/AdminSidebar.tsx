"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard Home", href: "/admin/dashboard" },
    { label: "Projects Manager", href: "/admin/dashboard/projects" },
    { label: "Experience Manager", href: "/admin/dashboard/experience" },
    { label: "Skills Manager", href: "/admin/dashboard/skills" },
    { label: "Education Manager", href: "/admin/dashboard/education" },
    { label: "Certifications Manager", href: "/admin/dashboard/certifications" },
    { label: "Resume Manager", href: "/admin/dashboard/resumes" },
    { label: "Contact & Messages", href: "/admin/dashboard/contact" },
    { label: "Analytics Monitor", href: "/admin/dashboard/analytics" }
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#0c0c0d] flex flex-col justify-between p-6">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-zinc-100 uppercase">
            Eshaan Portfolio
          </h2>
          <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">
            Admin Panel v1.0
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 rounded text-xs font-mono tracking-wider transition-all ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 font-medium"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                {isActive ? `> ${item.label}` : item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
        © 2026 ESHAAN P.M
      </div>
    </aside>
  );
}
