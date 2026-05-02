import { AdminShell } from "@/components/admin/admin-shell";

const topSearches = [
  { query: "OPD", count: 42 },
  { query: "ห้องยา", count: 35 },
  { query: "ER", count: 19 },
];

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Analytics (Mock)">
      <div className="space-y-3">
        {topSearches.map((item) => (
          <div key={item.query} className="rounded-lg border border-slate-300 p-3">
            <p className="text-[1.1rem] font-semibold">{item.query}</p>
            <p className="text-[0.98rem] text-slate-700">{item.count} searches</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
