import { describe, expect, it } from "vitest";

import { getOpenStatus } from "@/lib/opening-hours";
import type { OpeningHours } from "@/types/wayfinding";

const hours: OpeningHours = {
  monday: { open: "08:00", close: "16:00", closed: false },
  tuesday: { open: "08:00", close: "16:00", closed: false },
  wednesday: { open: "08:00", close: "16:00", closed: false },
  thursday: { open: "08:00", close: "16:00", closed: false },
  friday: { open: "08:00", close: "16:00", closed: false },
  saturday: { open: "00:00", close: "00:00", closed: true },
  sunday: { open: "00:00", close: "00:00", closed: true },
  exceptions: [{ date: "2026-05-04", closed: true }],
};

describe("getOpenStatus", () => {
  it("returns open when in normal hours", () => {
    const date = new Date("2026-05-05T03:00:00.000Z"); // 10:00 Bangkok, Tuesday
    expect(getOpenStatus(hours, date).isOpen).toBe(true);
  });

  it("returns closed when outside normal hours", () => {
    const date = new Date("2026-05-05T12:00:00.000Z"); // 19:00 Bangkok, Tuesday
    expect(getOpenStatus(hours, date).isOpen).toBe(false);
  });

  it("respects date exceptions", () => {
    const date = new Date("2026-05-04T03:00:00.000Z"); // exception day
    expect(getOpenStatus(hours, date).isOpen).toBe(false);
    expect(getOpenStatus(hours, date).reason).toBe("exception");
  });
});
