import Link from "next/link";
import { notFound } from "next/navigation";

import { getOpenStatus } from "@/lib/opening-hours";
import { getPlaceById, getPlaces } from "@/lib/data";

export function generateStaticParams() {
  return getPlaces().map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = getPlaceById(id);
  if (!place) {
    notFound();
  }

  const openStatus = getOpenStatus(place.opening_hours);
  return (
    <section className="space-y-4">
      <div className="rounded-xl border-2 border-slate-300 bg-white p-4">
        <h1 className="text-[1.6rem] font-bold">{place.name_th}</h1>
        <p className="text-[1rem] text-slate-700">{place.name_en}</p>
        <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-[1rem] font-semibold ${openStatus.isOpen ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
          {openStatus.isOpen ? "เปิด" : "ปิด"}
        </p>
        <div className="mt-4 grid gap-2 text-[1.05rem]">
          <p>📍 อาคาร {place.building_id} ชั้น {place.floor}</p>
          <p>🕐 จันทร์-ศุกร์ 08:00-16:00</p>
          <p>📞 {place.phone ?? "-"}</p>
          <p>🚶 {place.nearby_landmark_th ?? "-"}</p>
          <p>♿ {place.is_accessible ? "รองรับวีลแชร์" : "ไม่รองรับวีลแชร์"}</p>
        </div>
      </div>
      <Link
        href={`/navigate?from=n-entry&to=${place.id}`}
        className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-blue-700 px-5 text-[1.2rem] font-semibold text-white"
      >
        นำทางไปที่นี่
      </Link>
    </section>
  );
}
