import Link from "next/link";

const links = [
  { href: "/admin/places", label: "Places" },
  { href: "/admin/nodes", label: "Nodes" },
  { href: "/admin/routes", label: "Routes" },
  { href: "/admin/qr", label: "QR" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/preview", label: "Preview" },
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-5 md:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border-2 border-slate-300 bg-white p-3">
        <h2 className="text-[1.2rem] font-bold">Admin</h2>
        <nav className="mt-3 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-3 text-[1rem] font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="rounded-xl border-2 border-slate-300 bg-white p-4">
        <h1 className="text-[1.4rem] font-bold">{title}</h1>
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
