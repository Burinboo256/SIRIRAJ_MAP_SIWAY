import { AdminShell } from "@/components/admin/admin-shell";
import { getRoutes } from "@/lib/data";

export default function AdminRoutesPage() {
  const routes = getRoutes();
  return (
    <AdminShell title="Routes (Mock Builder)">
      <div className="space-y-2">
        {routes.map((route) => (
          <div key={route.id} className="rounded-lg border border-slate-300 p-3">
            <p className="text-[1.05rem] font-semibold">
              {route.from_node_id} → {route.to_node_id}
            </p>
            <p className="text-[0.98rem] text-slate-700">
              {route.distance_meter}m | {route.estimated_seconds}s | {route.is_accessible ? "Accessible" : "Not accessible"}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
