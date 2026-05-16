"use client";

import { AuthProvider } from "./AuthContext";
import { HeaderProvider } from "./HeaderContext";
import { ReaderProvider } from "./ReaderContext";
import { ToastProvider } from "./ToastContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HeaderProvider>
        <ToastProvider>
          <ReaderProvider>{children}</ReaderProvider>
        </ToastProvider>
      </HeaderProvider>
    </AuthProvider>
  );
}
