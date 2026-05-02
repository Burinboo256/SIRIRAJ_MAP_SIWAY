"use client";

import { PhoneCall } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";

export function EmergencyButton() {
  const t = useCopy();
  return (
    <a
      href="tel:1669"
      className="fixed bottom-4 right-4 z-30 inline-flex min-h-16 min-w-16 items-center justify-center gap-2 rounded-full bg-red-700 px-4 text-[1rem] font-semibold text-white shadow-lg"
      aria-label={t("emergency")}
    >
      <PhoneCall size={20} />
      {t("emergency")}
    </a>
  );
}
