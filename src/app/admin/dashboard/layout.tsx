"use client";

import React from "react";
import { AdminLayout } from "../../../../admin-dashboard/layout/AdminLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
