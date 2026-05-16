"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function fetchMe() {
    try {
      const res = await fetch("/api/auth/me");
      const { data: user, error } = await res.json();
      if (error || !user) {
        console.log(error);
        return;
      }
      setUser(user);
      localStorage.setItem("knowlet-user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("knowlet-user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error(error);
        toast.error((error as Error).message);
        localStorage.removeItem("knowlet-user");
      }
    }

    fetchMe();
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
