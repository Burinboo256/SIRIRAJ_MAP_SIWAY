import type { DayHours, OpeningHours } from "@/types/wayfinding";

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type DayKey = (typeof WEEKDAYS)[number];

function toMinutes(value: string): number {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function getDayHours(day: DayKey, openingHours: OpeningHours): DayHours {
  return openingHours[day];
}

export function getOpenStatus(openingHours: OpeningHours, currentDate = new Date()) {
  const dateInBangkok = new Date(
    currentDate.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
  );
  const dateKey = dateInBangkok.toISOString().slice(0, 10);
  const exception = openingHours.exceptions.find((item) => item.date === dateKey);
  if (exception) {
    return { isOpen: !exception.closed, reason: "exception" as const };
  }

  const dayKey = WEEKDAYS[dateInBangkok.getDay()];
  const todayHours = getDayHours(dayKey, openingHours);
  if (todayHours.closed) {
    return { isOpen: false, reason: "closed-day" as const };
  }

  const nowMinutes = dateInBangkok.getHours() * 60 + dateInBangkok.getMinutes();
  const openMinutes = toMinutes(todayHours.open);
  const closeMinutes = toMinutes(todayHours.close);
  return { isOpen: nowMinutes >= openMinutes && nowMinutes <= closeMinutes, reason: "normal" as const };
}
