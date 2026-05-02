"use client";

import { copy, type CopyKey } from "@/lib/translations";
import { useUiStore } from "@/store/ui-store";

export function useCopy() {
  const language = useUiStore((state) => state.language);
  return (key: CopyKey) => copy[language][key];
}
