import fs from "fs";
import path from "path";
import unitsData from "@/data/units.json";
import LengthConverter from "@/components/converters/length/Length";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/slugAliases";

export const revalidate = 60 * 60 * 24; // ISR: 24 hours
type Params = { pair: string };

export async function generateMetadata({ params }: { params: Params }) {
  const resolved = await Promise.resolve(params);
  const pair = resolved.pair; // e.g., meter-to-kilometer

  let [fromId, toId] = pair.split("-to-");

  // Normalize slugs so "KM", "km", "kilometre", "kilometer", "kilo-meter" all resolve
  fromId = normalizeSlug(fromId);
  toId = normalizeSlug(toId);

  return {
    title: `${fromId} to ${toId} converter — UnitConvert`,
    description: `Convert ${fromId} to ${toId} quickly and accurately.`,
    alternates: {
      canonical: `/convert/length/${pair}`,
    },
  };
}

export async function generateStaticParams() {
  const p = path.join(process.cwd(), "data", "priorityPairs.json");
  if (!fs.existsSync(p)) return [];
  const pairs: Array<{ category: string; from: string; to: string }> =
    JSON.parse(fs.readFileSync(p, "utf8"));
  return pairs
    .filter((x) => x.category === "length")
    .map((x) => ({ pair: `${x.from}-to-${x.to}` }));
}

export default async function LengthConverterPage({
  params,
}: {
  params?: Params;
}) {
  // App Router may deliver params as a thenable/promise-like — unwrap safely
  const resolvedParams = await Promise.resolve(params as any);
  const pair = resolvedParams?.pair;
  if (!pair) return notFound();

  let [fromId, toId] = pair.split("-to-");

  fromId = normalizeSlug(fromId);
  toId = normalizeSlug(toId);

  const parts = pair.split("-to-");
  if (parts.length !== 2) return notFound();

  const lengthCategory = (unitsData as any)["length"];
  if (!lengthCategory) return notFound();
  if (!lengthCategory.units[fromId] || !lengthCategory.units[toId])
    return notFound();

  const prettyFrom = fromId.replace(/_/g, " ");
  const prettyTo = toId.replace(/_/g, " ");
  const title = `${prettyFrom} to ${prettyTo} converter — UnitConvert`;

  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-600">
          Convert {prettyFrom} to {prettyTo} quickly and accurately.
        </p>
      </header>

      {/* Hydrate your client-side LengthConverter with defaults */}
      {/* @ts-ignore */}
      <LengthConverter
        defaultFromId={fromId}
        defaultToId={toId}
        defaultValue="1"
      />

      {/* Ad slot placeholder (client-side ad insertion only) */}
      <div id="ad-after-converter" className="my-6" />
    </main>
  );
}
