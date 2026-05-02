import Link from "next/link";
import { Pill, FlaskConical, Toilet, ArrowUpDown, ParkingCircle, Bus, Info, Siren } from "lucide-react";

const quickActions = [
  { key: "opd", label: "OPD", icon: Info },
  { key: "pharmacy", label: "Pharmacy", icon: Pill },
  { key: "lab", label: "Lab", icon: FlaskConical },
  { key: "toilet", label: "Toilet", icon: Toilet },
  { key: "elevator", label: "Elevator", icon: ArrowUpDown },
  { key: "parking", label: "Parking", icon: ParkingCircle },
  { key: "shuttle", label: "Shuttle", icon: Bus },
  { key: "emergency", label: "Emergency", icon: Siren },
];

export function QuickAccessGrid() {
  return (
    <section aria-label="quick-access" className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {quickActions.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.key}
            href={`/search?q=${encodeURIComponent(item.key)}`}
            className="flex min-h-20 flex-col items-center justify-center rounded-xl border-2 border-slate-300 bg-slate-50 px-2 text-center"
          >
            <Icon size={26} />
            <span className="mt-1 text-[1rem] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </section>
  );
}
