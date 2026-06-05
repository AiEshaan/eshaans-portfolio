"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { monitorAuthState } from "../../firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Safety timeout: if Firebase never calls back (slow network / offline),
    // redirect to login after 5 seconds so the user isn't stuck on the spinner.
    const timeout = setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 5000);

    // Listen for Firebase Auth state changes
    const unsubscribe = monitorAuthState((currentUser) => {
      clearTimeout(timeout);
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        // Redirection path to admin login page
        router.push("/admin");
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-mono text-xs text-zinc-500 tracking-widest uppercase">
        <div className="flex flex-col items-center gap-3">
          <div className="w-4 h-4 border border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
          <span>Authenticating Session...</span>
        </div>
      </div>
    );
  }

  // Once authenticated, render children
  if (!user) return null;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
