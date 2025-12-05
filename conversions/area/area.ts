import { AreaUnit } from "@/types/area/area";

export const areaUnits: AreaUnit[] = [
  { id: "square-meter", name: "Square Meter", symbol: "m²", toSquareMeters: 1 },
  {
    id: "square-kilometer",
    name: "Square Kilometer",
    symbol: "km²",
    toSquareMeters: 1e6,
  },
  {
    id: "square-centimeter",
    name: "Square Centimeter",
    symbol: "cm²",
    toSquareMeters: 1e-4,
  },
  {
    id: "square-millimeter",
    name: "Square Millimeter",
    symbol: "mm²",
    toSquareMeters: 1e-6,
  },
  {
    id: "square-micrometer",
    name: "Square Micrometer",
    symbol: "μm²",
    toSquareMeters: 1e-12,
  },
  { id: "hectare", name: "Hectare", symbol: "ha", toSquareMeters: 10000 },
  {
    id: "square-mile",
    name: "Square Mile",
    symbol: "mi²",
    toSquareMeters: 2589988.110336,
  },
  {
    id: "square-yard",
    name: "Square Yard",
    symbol: "yd²",
    toSquareMeters: 0.83612736,
  },
  {
    id: "square-foot",
    name: "Square Foot",
    symbol: "ft²",
    toSquareMeters: 0.09290304,
  },
  {
    id: "square-inch",
    name: "Square Inch",
    symbol: "in²",
    toSquareMeters: 0.00064516,
  },
  { id: "acre", name: "Acre", symbol: "ac", toSquareMeters: 4046.8564224 },
];

export function convertArea(
  value: number,
  fromUnit: AreaUnit,
  toUnit: AreaUnit
): number {
  // Convert to square meters first, then to target unit
  const squareMeters = value * fromUnit.toSquareMeters;
  return squareMeters / toUnit.toSquareMeters;
}

export function convertToAllAreaUnits(
  value: number,
  fromUnit: AreaUnit
): { unit: AreaUnit; value: number }[] {
  return areaUnits.map((unit) => ({
    unit,
    value: convertArea(value, fromUnit, unit),
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
