import Link from "next/link";

export default function OfflinePage() {
  return (
    <section className="rounded-xl border-2 border-slate-300 bg-white p-6">
      <h1 className="text-[1.6rem] font-bold">Offline Mode</h1>
      <p className="mt-2 text-[1.05rem] text-slate-700">
        Network is unavailable. Cached directions and place data are still available.
      </p>
      <Link href="/" className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-blue-700 px-4 text-white">
        Back to Home
      </Link>
    </section>
  );
}
