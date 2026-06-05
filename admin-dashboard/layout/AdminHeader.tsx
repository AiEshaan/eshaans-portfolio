"use client";

import React from "react";
import { signOut } from "../../firebase/auth";
import { useAuth } from "./AdminGuard";

export function AdminHeader() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error("Sign out action failed: ", e);
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-[#0c0c0d] flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
          Production Client Connected
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
          User: <span className="text-zinc-200 font-medium">{user?.email}</span>
        </span>
        <button
          onClick={handleSignOut}
          className="px-3.5 py-1.5 text-[9px] text-zinc-300 font-mono uppercase tracking-widest border border-zinc-700 hover:bg-zinc-800 hover:text-white rounded transition-all cursor-pointer"
        >
          [ Log Out ]
        </button>
      </div>
    </header>
  );
}
export default AdminHeader;
