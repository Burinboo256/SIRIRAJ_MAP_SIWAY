"use client";

import { create } from "zustand";

type Language = "th" | "en";
type TextScale = "sm" | "base" | "lg";

interface UiState {
  language: Language;
  textScale: TextScale;
  highContrast: boolean;
  wheelchairOnly: boolean;
  setLanguage: (language: Language) => void;
  setTextScale: (textScale: TextScale) => void;
  setHighContrast: (highContrast: boolean) => void;
  setWheelchairOnly: (wheelchairOnly: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  language: "th",
  textScale: "base",
  highContrast: false,
  wheelchairOnly: false,
  setLanguage: (language) => set({ language }),
  setTextScale: (textScale) => set({ textScale }),
  setHighContrast: (highContrast) => set({ highContrast }),
  setWheelchairOnly: (wheelchairOnly) => set({ wheelchairOnly }),
}));
