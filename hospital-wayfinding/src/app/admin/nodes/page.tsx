import { AdminShell } from "@/components/admin/admin-shell";
import { getNodes } from "@/lib/data";

export default function AdminNodesPage() {
  const nodes = getNodes();
  return (
    <AdminShell title="Nodes (Mock Visual Editor)">
      <div className="grid gap-2 md:grid-cols-2">
        {nodes.map((node) => (
          <div key={node.id} className="rounded-lg border border-slate-300 p-3">
            <p className="text-[1.05rem] font-semibold">{node.name}</p>
            <p className="text-[0.98rem] text-slate-700">
              {node.type} | {node.floor} | ({node.map_x}, {node.map_y})
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
