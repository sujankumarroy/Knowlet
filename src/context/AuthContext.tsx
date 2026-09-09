"use client";

import { getCurrentUser } from "@/actions/user";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void (async () => {
      let user: User | null = null;

      try {
        user = await getCurrentUser();

        if (!user) {
          localStorage.removeItem("knowlet-user");
          user = null;
          return;
        }

        localStorage.setItem("knowlet-user", JSON.stringify(user));
      } catch {
        const stored = localStorage.getItem("knowlet-user");
        if (!stored) {
          user = null;
          return;
        }

        try {
          user = JSON.parse(stored);
        } catch (error) {
          localStorage.removeItem("knowlet-user");
          user = null;
        }
      } finally {
        setUser(user);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
