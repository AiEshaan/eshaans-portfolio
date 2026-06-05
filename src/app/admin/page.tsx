"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, monitorAuthState } from "../../../firebase/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If the admin is already logged in, redirect straight to the dashboard
    const unsubscribe = monitorAuthState((user) => {
      if (user) {
        router.push("/admin/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication credentials rejected.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-zinc-100 font-sans">
      <div className="w-full max-w-sm border border-zinc-800 bg-[#0c0c0d] p-8 rounded flex flex-col gap-6">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
            Administrative Registry
          </span>
          <h1 className="text-xl font-light text-zinc-100 tracking-wide mt-1">
            Access System Vault
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-email" className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
              Email Address
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all font-mono"
              placeholder="admin@portfolio.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
              Secure Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#111112] border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[10px] text-red-400 font-mono tracking-wide uppercase mt-1">
              Error: {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-2 text-xs text-zinc-900 bg-zinc-100 font-mono uppercase tracking-widest rounded hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Verifying..." : "[ Sign In ]"}
          </button>
        </form>

        <div className="text-[9px] text-zinc-600 font-mono tracking-widest uppercase text-center">
          Authorization required to perform writes.
        </div>
      </div>
    </div>
  );
}
