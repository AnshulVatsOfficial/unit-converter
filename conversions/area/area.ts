// conversions/area/area.ts
import unitsJson from "@/data/units.json";

/**
 * Area unit shape used across the app.
 * Keep compatible with any AreaUnit type you already have.
 */
export type AreaUnitLike = {
  id: string;
  name: string;
  symbol: string;
  toSquareMeters: number;
};

/** pretty name builder: "square_meter" -> "Square Meter" */
function prettyNameFromId(id: string) {
  return id
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Build areaUnits from data/units.json (single source of truth)
 * data/units.json area units use "toBase" (base is square_meter).
 * We map that to `toSquareMeters` so older code that expects that property continues to work.
 */
export const areaUnits: AreaUnitLike[] = Object.entries(
  (unitsJson as any).area.units
).map(([id, u]: [string, any]) => ({
  id,
  name: prettyNameFromId(id),
  symbol: u.symbol ?? id,
  toSquareMeters: u.toBase ?? u.toSquareMeters ?? 1,
}));

/** Convert value from one area unit to another (linear conversion) */
export function convertArea(
  value: number,
  fromUnit: AreaUnitLike,
  toUnit: AreaUnitLike
): number {
  // Convert to base (square meters), then to target
  const inSqMeters = value * (fromUnit.toSquareMeters ?? 1);
  return inSqMeters / (toUnit.toSquareMeters ?? 1);
}

/** Convert to all area units (returns array of { unit, value }) */
export function convertToAllUnits(
  value: number,
  fromUnit: AreaUnitLike
): { unit: AreaUnitLike; value: number }[] {
  return areaUnits.map((unit) => ({
    unit,
    value: convertArea(value, fromUnit, unit),
  }));
}

/** Formatting helper (same behavior as length.formatNumber) */
export function formatNumber(num: number): string {
  if (num === 0) return "0";

  const absNum = Math.abs(num);

  // Use scientific notation for very large or very small numbers
  if (absNum >= 1e10 || (absNum < 1e-6 && absNum !== 0)) {
    return num.toExponential(8);
  }

  // For regular numbers, show appropriate decimal places
  if (absNum >= 1000) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  }

  if (absNum >= 1) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 8 });
  }

  // For small decimals
  return num.toLocaleString("en-US", { maximumFractionDigits: 10 });
}
