import { AdminShell } from "@/components/admin/admin-shell";
import { getNodes } from "@/lib/data";

export default function AdminQrPage() {
  const nodes = getNodes().slice(0, 6);
  return (
    <AdminShell title="QR Generator (Mock)">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {nodes.map((node) => (
          <div key={node.id} className="rounded-lg border border-slate-300 p-3 text-center">
            <div className="mx-auto h-24 w-24 rounded bg-slate-200" />
            <p className="mt-2 text-[0.95rem] font-semibold">{node.qr_code_id}</p>
            <p className="text-[0.9rem] text-slate-700">{node.name}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
