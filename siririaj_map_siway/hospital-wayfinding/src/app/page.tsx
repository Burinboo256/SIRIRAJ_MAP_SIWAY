"use client";

import Link from "next/link";
import Image from "next/image";
import { LocateFixed } from "lucide-react";

import { SearchBox } from "@/components/search/search-box";
import { QuickAccessGrid } from "@/components/search/quick-access-grid";
import { useCopy } from "@/hooks/use-copy";

const recentKeywords = ["OPD", "ห้องยา", "Lab"];

export default function HomePage() {
  const t = useCopy();
  return (
    <section className="grid gap-4 lg:grid-cols-[40%_60%]">
      <div className="rounded-xl border-2 border-slate-300 bg-white p-4">
        <h1 className="text-[1.6rem] font-bold text-slate-900">{t("homeGreeting")}</h1>
        <div className="mt-4">
          <SearchBox />
        </div>
        <div className="mt-4">
          <QuickAccessGrid />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex min-h-14 items-center gap-2 rounded-lg border-2 border-slate-400 bg-white px-4 text-[1.1rem] font-semibold">
            <LocateFixed size={22} />
            {t("whereAmI")}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-14 items-center rounded-lg border-2 border-slate-400 px-4 text-[1.1rem] font-semibold"
          >
            {t("startOver")}
          </Link>
        </div>
        <div className="mt-5">
          <h2 className="text-[1.2rem] font-semibold">Recent</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {recentKeywords.map((keyword) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 bg-slate-50 px-3 text-[1rem]"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-xl border-2 border-slate-300 bg-white p-4">
        <h2 className="text-[1.3rem] font-bold">Campus Preview</h2>
        <div className="mt-3 rounded-xl bg-slate-100 p-3">
          <Image
            src="/globe.svg"
            alt="Hospital map preview"
            width={640}
            height={420}
            className="h-auto w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
