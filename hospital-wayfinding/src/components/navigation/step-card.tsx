"use client";

import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";
import { useUiStore } from "@/store/ui-store";
import type { Route } from "@/types/wayfinding";

function DirectionIcon({ direction }: { direction: Route["direction"] }) {
  if (direction === "left") return <ArrowLeft size={30} />;
  if (direction === "right") return <ArrowRight size={30} />;
  if (direction === "up") return <ArrowUp size={30} />;
  if (direction === "down") return <ArrowDown size={30} />;
  return <ArrowUp size={30} className="rotate-90" />;
}

export function StepCard({ step, index, total }: { step: Route; index: number; total: number }) {
  const t = useCopy();
  const language = useUiStore((state) => state.language);
  const instruction = language === "th" ? step.instruction_th : step.instruction_en;
  return (
    <article className="rounded-xl border-2 border-slate-300 bg-white p-4">
      <p className="text-[1rem] font-semibold text-slate-600">
        {index}/{total}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <DirectionIcon direction={step.direction} />
        <p className="text-[1.2rem] font-semibold text-slate-900">{instruction}</p>
      </div>
      <p className="mt-2 text-[1rem] text-slate-700">
        {step.distance_meter} m | {step.estimated_seconds} sec
      </p>
      <button className="mt-3 inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-700 px-4 text-[1rem] font-semibold text-white">
        {t("next")}
      </button>
    </article>
  );
}
