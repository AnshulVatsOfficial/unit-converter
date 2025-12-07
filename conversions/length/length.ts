// components/converters/length/length.ts
import unitsJson from "@/data/units.json";
import { LengthUnit } from "@/types/length/length";

/**
 * Build readable name from id:
 *  "light_year" -> "Light Year"
 */
function prettyNameFromId(id: string) {
  return id
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * NOTE:
 * - data/units.json uses `toBase`. For length category base is meters.
 * - We map `toBase` -> toMeters here so existing code can keep using toMeters.
 */
export const lengthUnits: LengthUnit[] = Object.entries(
  (unitsJson as any).length.units
).map(([id, u]: [string, any]) => ({
  id,
  name: prettyNameFromId(id),
  symbol: u.symbol ?? id,
  toMeters: u.toBase ?? u.toMeters ?? 1
}));

/* --- keep your conversion helpers unchanged --- */
export function convertLength(
  value: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit
): number {
  const meters = value * fromUnit.toMeters;
  return meters / toUnit.toMeters;
}

export function convertToAllUnits(
  value: number,
  fromUnit: LengthUnit
): { unit: LengthUnit; value: number }[] {
  return lengthUnits.map((unit) => ({
    unit,
    value: convertLength(value, fromUnit, unit)
  }));
}

export function formatNumber(num: number): string {
  if (num === 0) return "0";
  const absNum = Math.abs(num);

  if (absNum >= 1e10 || (absNum < 1e-6 && absNum !== 0)) {
    return num.toExponential(8);
  }
  if (absNum >= 1000) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  }
  if (absNum >= 1) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 8 });
  }
  return num.toLocaleString("en-US", { maximumFractionDigits: 10 });
}
