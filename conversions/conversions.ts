// lib/conversions.ts
import unitsData from "@/data/units.json";

type UnitsData = typeof unitsData;

export function convert(
  categoryName: string,
  from: string,
  to: string,
  value: number
): number {
  const category = (unitsData as UnitsData)[categoryName as keyof UnitsData];
  if (!category) throw new Error(`Unknown category ${categoryName}`);
  const fromUnit = (category.units as any)[from];
  const toUnit = (category.units as any)[to];
  if (!fromUnit || !toUnit) throw new Error(`Unknown units: ${from} or ${to}`);

  // Temperature special case
  if (categoryName === "temperature") {
    return convertTemperature(from, to, value);
  }

  // Linear conversion via base unit multipliers
  const toBase = Number(fromUnit.toBase);
  const toBaseTarget = Number(toUnit.toBase);
  if (isNaN(toBase) || isNaN(toBaseTarget)) {
    throw new Error("Invalid toBase values for linear conversion");
  }

  const valueInBase = value * toBase; // bring to base unit
  const result = valueInBase / toBaseTarget; // convert to target unit
  return result;
}

function convertTemperature(from: string, to: string, value: number): number {
  // Normalize to Celsius then to target
  let c = value;
  if (from === "celsius") c = value;
  else if (from === "fahrenheit") c = (value - 32) * (5 / 9);
  else if (from === "kelvin") c = value - 273.15;
  else throw new Error("Unknown temperature unit: " + from);

  if (to === "celsius") return c;
  if (to === "fahrenheit") return c * (9 / 5) + 32;
  if (to === "kelvin") return c + 273.15;
  throw new Error("Unknown temperature unit: " + to);
}
