import { LengthUnit } from "@/types/length/length";

export const lengthUnits: LengthUnit[] = [
  { id: "meter", name: "Meter", symbol: "m", toMeters: 1 },
  { id: "kilometer", name: "Kilometer", symbol: "km", toMeters: 1000 },
  { id: "centimeter", name: "Centimeter", symbol: "cm", toMeters: 0.01 },
  { id: "millimeter", name: "Millimeter", symbol: "mm", toMeters: 0.001 },
  { id: "micrometer", name: "Micrometer", symbol: "μm", toMeters: 0.000001 },
  { id: "nanometer", name: "Nanometer", symbol: "nm", toMeters: 0.000000001 },
  { id: "mile", name: "Mile", symbol: "mi", toMeters: 1609.344 },
  { id: "yard", name: "Yard", symbol: "yd", toMeters: 0.9144 },
  { id: "foot", name: "Foot", symbol: "ft", toMeters: 0.3048 },
  { id: "inch", name: "Inch", symbol: "in", toMeters: 0.0254 },
  { id: "nautical-mile", name: "Nautical Mile", symbol: "nmi", toMeters: 1852 },
  { id: "light-year", name: "Light Year", symbol: "ly", toMeters: 9.461e15 },
  {
    id: "astronomical-unit",
    name: "Astronomical Unit",
    symbol: "AU",
    toMeters: 1.496e11,
  },
  { id: "parsec", name: "Parsec", symbol: "pc", toMeters: 3.086e16 },
  { id: "angstrom", name: "Angstrom", symbol: "Å", toMeters: 1e-10 },
  { id: "fathom", name: "Fathom", symbol: "ftm", toMeters: 1.8288 },
  { id: "furlong", name: "Furlong", symbol: "fur", toMeters: 201.168 },
  { id: "chain", name: "Chain", symbol: "ch", toMeters: 20.1168 },
  { id: "rod", name: "Rod", symbol: "rd", toMeters: 5.0292 },
  { id: "league", name: "League", symbol: "lea", toMeters: 4828.032 },
];

export function convertLength(
  value: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit
): number {
  // Convert to meters first, then to target unit
  const meters = value * fromUnit.toMeters;
  return meters / toUnit.toMeters;
}

export function convertToAllUnits(
  value: number,
  fromUnit: LengthUnit
): { unit: LengthUnit; value: number }[] {
  return lengthUnits.map((unit) => ({
    unit,
    value: convertLength(value, fromUnit, unit),
  }));
}

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
