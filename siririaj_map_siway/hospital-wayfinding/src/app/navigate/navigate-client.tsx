"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { SimpleMap } from "@/components/map/simple-map";
import { StepCard } from "@/components/navigation/step-card";
import { useCopy } from "@/hooks/use-copy";
import { getNodes, getPlaces, getRoutes } from "@/lib/data";
import { findPath } from "@/lib/pathfinding";
import { useUiStore } from "@/store/ui-store";

function placeToNodeId(placeId: string) {
  if (!placeId.startsWith("p-")) return placeId;
  return `n-${placeId.slice(2)}`;
}

export function NavigateClient() {
  const t = useCopy();
  const params = useSearchParams();
  const from = params.get("from") ?? "n-entry";
  const toPlace = params.get("to") ?? "p-opd";
  const to = placeToNodeId(toPlace);
  const wheelchairOnly = useUiStore((state) => state.wheelchairOnly);
  const setWheelchairOnly = useUiStore((state) => state.setWheelchairOnly);

  const nodes = useMemo(() => getNodes(), []);
  const routes = useMemo(() => getRoutes(), []);
  const places = useMemo(() => getPlaces(), []);
  const targetPlace = places.find((place) => place.id === toPlace);
  const path = useMemo(
    () => findPath(nodes, routes, from, to, wheelchairOnly),
    [nodes, routes, from, to, wheelchairOnly],
  );

  return (
    <section className="space-y-4">
      <div className="rounded-xl border-2 border-slate-300 bg-white p-4">
        <h1 className="text-[1.4rem] font-bold">
          {from} → {targetPlace?.name_th ?? to}
        </h1>
        <p className="mt-2 text-[1.05rem] font-semibold text-slate-700">
          ⏱️ {Math.ceil(path.totalSeconds / 60)} นาที | 📏 {path.totalDistance} เมตร
        </p>
        <button
          type="button"
          onClick={() => setWheelchairOnly(!wheelchairOnly)}
          className={`mt-3 inline-flex min-h-12 items-center rounded-lg border-2 px-3 text-[1rem] font-semibold ${
            wheelchairOnly ? "border-blue-700 bg-blue-700 text-white" : "border-slate-400 bg-white text-slate-900"
          }`}
        >
          ♿ {t("wheelchair")}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          {path.steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index + 1} total={path.steps.length} />
          ))}
        </div>
        <SimpleMap nodes={nodes} highlightedRoutes={path.steps} />
      </div>
      <button className="inline-flex min-h-14 items-center justify-center rounded-xl bg-amber-500 px-5 text-[1.1rem] font-semibold text-slate-900">
        {t("lost")}
      </button>
    </section>
  );
}
