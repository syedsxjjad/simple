import { format } from "date-fns";
import type { Matcher } from "react-day-picker";

/** First `YYYY-MM-DD` from an ISO date or datetime string (API calendar day, no TZ shift). */
export function extractIsoDateOnly(iso: string | undefined): string | undefined {
  if (!iso?.trim()) return undefined;
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(iso.trim());
  return m?.[1];
}

/** Week range label, e.g. `May 25 – May 31, 2026` from API `weekStart` / `weekEnd`. */
export function formatWeekRange(weekStart: string, weekEnd: string): string {
  const start = parseIsoDateOnlyToDate(extractIsoDateOnly(weekStart));
  const end = parseIsoDateOnlyToDate(extractIsoDateOnly(weekEnd));
  if (start && end) {
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  }
  return weekStart;
}

/** Parse `YYYY-MM-DD` in local calendar; returns `undefined` if invalid or empty. */
export function parseIsoDateOnlyToDate(iso: string | undefined): Date | undefined {
  if (!iso?.trim()) return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const parsed = new Date(y, mo, d);
  if (
    parsed.getFullYear() !== y ||
    parsed.getMonth() !== mo ||
    parsed.getDate() !== d
  ) {
    return undefined;
  }
  return parsed;
}

/** `YYYY-MM-DD` → `YYYY-MM-DDT00:00:00.000Z` (UTC calendar date, API-style). */
export function isoDateOnlyToUtcMidnightIso(iso: string | undefined): string | undefined {
  const d = parseIsoDateOnlyToDate(iso);
  if (!d) return undefined;
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
}

/** Format a local `Date` as `YYYY-MM-DD` (for native date inputs / APIs). */
export function formatLocalDateToIso(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

/** Disabled days outside inclusive `min` / `max` (`YYYY-MM-DD`) for DayPicker. */
export function isoMinMaxDisabledMatchers(
  min?: string,
  max?: string,
): Matcher | Matcher[] | undefined {
  const matchers: Matcher[] = [];
  const minDate = parseIsoDateOnlyToDate(min);
  const maxDate = parseIsoDateOnlyToDate(max);
  if (minDate) matchers.push({ before: minDate });
  if (maxDate) matchers.push({ after: maxDate });
  if (matchers.length === 0) return undefined;
  return matchers.length === 1 ? matchers[0]! : matchers;
}
