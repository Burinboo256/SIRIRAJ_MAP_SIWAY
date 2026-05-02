import { AdminShell } from "@/components/admin/admin-shell";
import { getPlaces } from "@/lib/data";

export default function AdminPlacesPage() {
  const places = getPlaces();
  return (
    <AdminShell title="Places (Mock)">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Floor</th>
              <th className="py-2">Accessible</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place.id} className="border-b border-slate-200">
                <td className="py-2">{place.name_th}</td>
                <td className="py-2">{place.category}</td>
                <td className="py-2">{place.floor}</td>
                <td className="py-2">{place.is_accessible ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
