import { Suspense } from "react";
import { SearchClient } from "./search-client";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border-2 border-slate-300 bg-white p-4 text-[1.1rem] font-semibold">
          Loading search...
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
