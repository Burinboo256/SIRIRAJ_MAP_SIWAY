"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUiStore } from "@/store/ui-store";

const TEXT_SCALE_MAP = {
  sm: "16px",
  base: "18px",
  lg: "20px",
} as const;

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const language = useUiStore((state) => state.language);
  const setLanguage = useUiStore((state) => state.setLanguage);
  const textScale = useUiStore((state) => state.textScale);
  const setTextScale = useUiStore((state) => state.setTextScale);
  const highContrast = useUiStore((state) => state.highContrast);
  const setHighContrast = useUiStore((state) => state.setHighContrast);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ui:language");
    const savedTextScale = window.localStorage.getItem("ui:textScale");
    const savedContrast = window.localStorage.getItem("ui:highContrast");
    if (savedLanguage === "th" || savedLanguage === "en") setLanguage(savedLanguage);
    if (savedTextScale === "sm" || savedTextScale === "base" || savedTextScale === "lg") {
      setTextScale(savedTextScale);
    }
    if (savedContrast === "true" || savedContrast === "false") setHighContrast(savedContrast === "true");
  }, [setHighContrast, setLanguage, setTextScale]);

  useEffect(() => {
    window.localStorage.setItem("ui:language", language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem("ui:textScale", textScale);
    document.documentElement.style.fontSize = TEXT_SCALE_MAP[textScale];
  }, [textScale]);

  useEffect(() => {
    window.localStorage.setItem("ui:highContrast", String(highContrast));
    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
  }, [highContrast]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => undefined);
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
