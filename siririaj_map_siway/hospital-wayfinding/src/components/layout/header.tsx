"use client";

import Link from "next/link";
import { Languages, Type, Contrast } from "lucide-react";

import { useUiStore } from "@/store/ui-store";

function ControlButton({
  active,
  children,
  onClick,
  label,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`min-h-12 min-w-12 rounded-lg border px-3 text-[1rem] font-semibold ${
        active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-400 bg-white text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

export function Header() {
  const language = useUiStore((state) => state.language);
  const setLanguage = useUiStore((state) => state.setLanguage);
  const textScale = useUiStore((state) => state.textScale);
  const setTextScale = useUiStore((state) => state.setTextScale);
  const highContrast = useUiStore((state) => state.highContrast);
  const setHighContrast = useUiStore((state) => state.setHighContrast);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-300 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-[1.35rem] font-bold text-slate-900">
          SIRIRAJ WAYFINDING
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <ControlButton label="language thai" active={language === "th"} onClick={() => setLanguage("th")}>
            <span className="flex items-center gap-1">
              <Languages size={18} /> TH
            </span>
          </ControlButton>
          <ControlButton label="language english" active={language === "en"} onClick={() => setLanguage("en")}>
            <span className="flex items-center gap-1">
              <Languages size={18} /> EN
            </span>
          </ControlButton>
          <ControlButton label="text size small" active={textScale === "sm"} onClick={() => setTextScale("sm")}>
            <span className="flex items-center gap-1">
              <Type size={18} /> A-
            </span>
          </ControlButton>
          <ControlButton
            label="text size normal"
            active={textScale === "base"}
            onClick={() => setTextScale("base")}
          >
            <span className="flex items-center gap-1">
              <Type size={18} /> A
            </span>
          </ControlButton>
          <ControlButton label="text size large" active={textScale === "lg"} onClick={() => setTextScale("lg")}>
            <span className="flex items-center gap-1">
              <Type size={18} /> A+
            </span>
          </ControlButton>
          <ControlButton
            label="high contrast"
            active={highContrast}
            onClick={() => setHighContrast(!highContrast)}
          >
            <span className="flex items-center gap-1">
              <Contrast size={18} /> HC
            </span>
          </ControlButton>
        </div>
      </div>
    </header>
  );
}
