"use client";

import { createContext, useContext, useState } from "react";

type HeaderMode = "home" | "reader" | "search";

type AppContextType = {
  headerMode: HeaderMode;
  setHeaderMode: (mode: HeaderMode) => void;

  user: User | null;
  setUser: (user: User | null) => void;

  liked: boolean;
  toggleLike: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [headerMode, setHeaderMode] = useState<HeaderMode>("home");

  const [user, setUser] = useState<User | null>(null);

  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLiked((prev) => !prev);
  }

  return (
    <AppContext.Provider
      value={{
        headerMode,
        setHeaderMode,

        user,
        setUser,

        liked,
        toggleLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return ctx;
}
