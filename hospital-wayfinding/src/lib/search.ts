import Fuse from "fuse.js";

import type { Place } from "@/types/wayfinding";

export function createSearchEngine(places: Place[]) {
  const activePlaces = places.filter((place) => place.is_active);
  const fuse = new Fuse(activePlaces, {
    keys: [
      { name: "name_th", weight: 1.0 },
      { name: "aliases", weight: 0.9 },
      { name: "name_en", weight: 0.8 },
      { name: "category", weight: 0.5 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
  });

  return (query: string): Place[] => {
    const trimmed = query.trim();
    if (!trimmed) {
      return activePlaces
        .slice()
        .sort((a, b) => b.search_priority - a.search_priority)
        .slice(0, 12);
    }

    const results = fuse.search(trimmed);
    return results.map((item) => item.item);
  };
}
