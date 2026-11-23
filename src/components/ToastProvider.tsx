"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ToastTone = "success" | "error" | "info";
type Toast = { id: number; message: string; tone: ToastTone };
type ToastContextValue = { toast: (message: string, tone?: ToastTone) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4500);
  }, []);
  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string; tone?: ToastTone }>).detail;
      if (detail?.message) toast(detail.message, detail.tone);
    };
    window.addEventListener("salonbook:toast", handleToast);
    return () => window.removeEventListener("salonbook:toast", handleToast);
  }, [toast]);
  const value = useMemo(() => ({ toast }), [toast]);
  return <ToastContext.Provider value={value}>{children}<div className="toast-viewport" aria-live="polite" aria-atomic="true">{toasts.map((item) => <div className={`toast toast-${item.tone}`} key={item.id}>{item.message}</div>)}</div></ToastContext.Provider>;
}

export function notifyToast(message: string, tone: ToastTone = "info") {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("salonbook:toast", { detail: { message, tone } }));
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
