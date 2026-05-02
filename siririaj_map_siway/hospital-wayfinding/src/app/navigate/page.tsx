import { Suspense } from "react";
import { NavigateClient } from "./navigate-client";

export default function NavigatePage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border-2 border-slate-300 bg-white p-4 text-[1.1rem] font-semibold">
          Loading route...
        </div>
      }
    >
      <NavigateClient />
    </Suspense>
  );
}
