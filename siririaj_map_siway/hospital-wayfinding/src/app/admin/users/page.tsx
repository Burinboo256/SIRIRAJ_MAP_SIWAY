import { AdminShell } from "@/components/admin/admin-shell";

const admins = [
  { id: "u1", name: "Info Counter A", role: "Editor" },
  { id: "u2", name: "Nurse Station B", role: "Reviewer" },
  { id: "u3", name: "IT Admin", role: "Owner" },
];

export default function AdminUsersPage() {
  return (
    <AdminShell title="Users (Mock)">
      <div className="space-y-2">
        {admins.map((admin) => (
          <div key={admin.id} className="rounded-lg border border-slate-300 p-3">
            <p className="text-[1.05rem] font-semibold">{admin.name}</p>
            <p className="text-[0.98rem] text-slate-700">{admin.role}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
