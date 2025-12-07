// lib/slugAliases.ts
export const UNIT_ALIASES: Record<string, string> = {
  m: "meter",
  km: "kilometer",
  cm: "centimeter",
  mm: "millimeter",
  µm: "micrometer",
  um: "micrometer",
  ms: "millisecond",
  us: "microsecond",
  sec: "second",
  litre: "liter", // if you use 'liter' spelling
  nautical_mile: "nautical_mile",
  "nautical-mile": "nautical_mile",
  // add more based on analytics
};

export function normalizeSlug(s: string) {
  if (!s) return s;
  const lower = s.toLowerCase();
  return UNIT_ALIASES[lower] ?? lower.replace(/-/g, "_");
}
