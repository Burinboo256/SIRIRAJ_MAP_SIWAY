"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCopy } from "@/hooks/use-copy";

const formSchema = z.object({
  query: z.string().trim().min(1),
});

type SearchForm = z.infer<typeof formSchema>;

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const t = useCopy();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: initialQuery },
  });

  const onSubmit = (data: SearchForm) => {
    router.push(`/search?q=${encodeURIComponent(data.query)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label className="sr-only" htmlFor="query">
        {t("searchPlaceholder")}
      </label>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
          <input
            id="query"
            {...register("query")}
            className="min-h-15 w-full rounded-xl border-2 border-slate-400 bg-white pl-13 pr-3 text-[1.15rem] text-slate-900"
            placeholder={t("searchPlaceholder")}
          />
        </div>
        <button
          type="button"
          className="inline-flex min-h-15 min-w-15 items-center justify-center rounded-xl border-2 border-slate-400 bg-white text-slate-900"
          aria-label="voice-search"
          title="Voice search"
        >
          <Mic size={24} />
        </button>
        <button
          type="submit"
          className="inline-flex min-h-15 items-center justify-center rounded-xl bg-blue-700 px-4 text-[1.1rem] font-semibold text-white"
        >
          {t("navigate")}
        </button>
      </div>
      {errors.query ? (
        <p role="alert" className="mt-2 text-[1rem] font-semibold text-red-700">
          {t("searchPlaceholder")}
        </p>
      ) : null}
    </form>
  );
}
