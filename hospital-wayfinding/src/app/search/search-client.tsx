"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { ResultCard } from "@/components/search/result-card";
import { SearchBox } from "@/components/search/search-box";
import { useCopy } from "@/hooks/use-copy";
import { getPlaces } from "@/lib/data";
import { createSearchEngine } from "@/lib/search";

export function SearchClient() {
  const t = useCopy();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const search = useMemo(() => createSearchEngine(getPlaces()), []);
  const results = useMemo(() => search(query), [query, search]);

  return (
    <section className="space-y-4">
      <SearchBox initialQuery={query} />
      {results.length === 0 ? (
        <p className="rounded-xl border-2 border-slate-300 bg-white p-4 text-[1.1rem] font-medium">{t("noResult")}</p>
      ) : null}
      <div className="grid gap-3 lg:grid-cols-2">
        {results.map((place) => (
          <ResultCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
