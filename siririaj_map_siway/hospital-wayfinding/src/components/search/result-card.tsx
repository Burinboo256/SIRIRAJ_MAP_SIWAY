"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";
import type { Place } from "@/types/wayfinding";

export function ResultCard({ place }: { place: Place }) {
  const t = useCopy();
  return (
    <article className="rounded-xl border-2 border-slate-300 bg-white p-4">
      <h3 className="text-[1.3rem] font-bold text-slate-900">{place.name_th}</h3>
      <p className="text-[1rem] text-slate-700">{place.name_en}</p>
      <p className="mt-2 inline-flex items-center gap-2 text-[1rem] font-medium text-slate-800">
        <MapPin size={18} />
        Building {place.building_id} Floor {place.floor}
      </p>
      <p className="mt-1 text-[1rem] text-slate-700">
        {t("nearby")}: {place.nearby_landmark_th ?? "-"}
      </p>
      <div className="mt-3 flex gap-2">
        <Link
          href={`/place/${place.id}`}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-slate-400 px-3 text-[1rem] font-semibold"
        >
          {t("viewDetail")}
        </Link>
        <Link
          href={`/navigate?to=${place.id}&from=n-entry`}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-700 px-3 text-[1rem] font-semibold text-white"
        >
          {t("navigate")}
        </Link>
      </div>
    </article>
  );
}
