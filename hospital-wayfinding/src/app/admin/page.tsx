import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="rounded-xl border-2 border-slate-300 bg-white p-4">
      <h1 className="text-[1.5rem] font-bold">Admin Mock</h1>
      <p className="mt-2 text-[1.05rem] text-slate-700">Select a module:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href="/admin/places" className="rounded-lg border border-slate-300 px-3 py-2">
          Places
        </Link>
        <Link href="/admin/nodes" className="rounded-lg border border-slate-300 px-3 py-2">
          Nodes
        </Link>
        <Link href="/admin/routes" className="rounded-lg border border-slate-300 px-3 py-2">
          Routes
        </Link>
      </div>
    </section>
  );
}
