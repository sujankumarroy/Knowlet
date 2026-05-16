"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
};

type ToastContextType = {
  toast: (data: {
    title: string;
    description?: string;
    type?: ToastType;
  }) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
    }: {
      title: string;
      description?: string;
      type?: ToastType;
    }) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          id,
          title,
          description,
          type,
        },
      ]);

      setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed z-[9999] bottom-20 left-1/2 flex w-full max-w-sm -translate-x-1/2 flex-col gap-3 px-4 sm:top-20 sm:right-5 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:px-0">
        {" "}
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="mt-0.5 shrink-0">
                  {toast.type === "success" && (
                    <CheckCircle2 className="size-5 text-green-500" />
                  )}

                  {toast.type === "error" && (
                    <CircleAlert className="size-5 text-red-500" />
                  )}

                  {toast.type === "info" && (
                    <Info className="size-5 text-blue-500" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {toast.title}
                  </h3>

                  {toast.description && (
                    <p className="mt-1 text-sm text-slate-500">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
