import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminPreviewPage() {
  return (
    <AdminShell title="Preview Mode (Mock)">
      <p className="text-[1.05rem] text-slate-700">
        This mock preview lets staff verify content before publishing.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-blue-700 px-4 text-[1rem] font-semibold text-white"
      >
        Open Public View
      </Link>
    </AdminShell>
  );
}
