// conversions/time/time.ts
import unitsJson from "@/data/units.json";

export interface TimeUnit {
  id: string;
  name: string;
  symbol: string;
  toBase: number; // conversion factor to seconds (base unit)
}

/** Helper: pretty name builder "light_year" -> "Light Year" */
function prettyNameFromId(id: string) {
  return id
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Build timeUnits from data/units.json (single source of truth) */
export const timeUnits: TimeUnit[] = Object.entries(
  (unitsJson as any).time.units
).map(([id, u]: [string, any]) => ({
  id,
  name: prettyNameFromId(id),
  symbol: u.symbol ?? id,
  toBase: u.toBase ?? 1,
}));

/** Convert value from one time unit to another (linear conversion) */
export function convertTime(
  value: number,
  from: TimeUnit,
  to: TimeUnit
): number {
  const baseValue = value * (from.toBase ?? 1); // seconds
  return baseValue / (to.toBase ?? 1);
}

/** Convert to all time units (returns array of { unit, value }) */
export function convertToAllTimeUnits(
  value: number,
  from: TimeUnit
): { unit: TimeUnit; value: number }[] {
  return timeUnits.map((unit) => ({
    unit,
    value: convertTime(value, from, unit),
  }));
}

/** Formatting helper for time conversion results */
export function formatTimeNumber(num: number): string {
  if (num === 0) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e15 || (absNum < 1e-12 && absNum > 0)) {
    return num.toExponential(6);
  }

  if (absNum >= 1e12) {
    return num.toExponential(6);
  }

  if (absNum >= 1) {
    if (Number.isInteger(num)) {
      return num.toLocaleString();
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 10 });
  }

  return num.toPrecision(10).replace(/\.?0+$/, "");
}
