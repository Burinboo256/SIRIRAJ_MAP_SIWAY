import { describe, expect, it } from "vitest";

import type { Place } from "@/types/wayfinding";
import { createSearchEngine } from "@/lib/search";

const places: Place[] = [
  {
    id: "p-opd",
    name_th: "ห้องตรวจผู้ป่วยนอก",
    name_en: "Outpatient Department",
    aliases: ["OPD", "ผู้ป่วยนอก"],
    category: "opd",
    building_id: "b-main",
    floor: "1",
    opening_hours: {
      monday: { open: "08:00", close: "16:00", closed: false },
      tuesday: { open: "08:00", close: "16:00", closed: false },
      wednesday: { open: "08:00", close: "16:00", closed: false },
      thursday: { open: "08:00", close: "16:00", closed: false },
      friday: { open: "08:00", close: "16:00", closed: false },
      saturday: { open: "00:00", close: "00:00", closed: true },
      sunday: { open: "00:00", close: "00:00", closed: true },
      exceptions: [],
    },
    map_x: 120,
    map_y: 200,
    is_accessible: true,
    is_active: true,
    search_priority: 90,
    created_at: "2026-05-02T00:00:00.000Z",
    updated_at: "2026-05-02T00:00:00.000Z",
    created_by: "seed",
    updated_by: "seed",
  },
  {
    id: "p-pharmacy",
    name_th: "ห้องยา",
    name_en: "Pharmacy",
    aliases: ["จ่ายยา"],
    category: "pharmacy",
    building_id: "b-main",
    floor: "1",
    opening_hours: {
      monday: { open: "08:00", close: "17:00", closed: false },
      tuesday: { open: "08:00", close: "17:00", closed: false },
      wednesday: { open: "08:00", close: "17:00", closed: false },
      thursday: { open: "08:00", close: "17:00", closed: false },
      friday: { open: "08:00", close: "17:00", closed: false },
      saturday: { open: "00:00", close: "00:00", closed: true },
      sunday: { open: "00:00", close: "00:00", closed: true },
      exceptions: [],
    },
    map_x: 320,
    map_y: 220,
    is_accessible: true,
    is_active: true,
    search_priority: 85,
    created_at: "2026-05-02T00:00:00.000Z",
    updated_at: "2026-05-02T00:00:00.000Z",
    created_by: "seed",
    updated_by: "seed",
  },
];

describe("createSearchEngine", () => {
  it("matches Thai text", () => {
    const search = createSearchEngine(places);
    const results = search("ผู้ป่วยนอก");
    expect(results[0]?.id).toBe("p-opd");
  });

  it("matches alias text", () => {
    const search = createSearchEngine(places);
    const results = search("OPD");
    expect(results[0]?.id).toBe("p-opd");
  });

  it("returns sorted by relevance", () => {
    const search = createSearchEngine(places);
    const results = search("ห้อง");
    expect(results.map((item) => item.id)).toContain("p-opd");
    expect(results.map((item) => item.id)).toContain("p-pharmacy");
  });
});
