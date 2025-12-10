// app/convert/time/[pair]/page.tsx
import fs from "fs";
import path from "path";
import unitsData from "@/data/units.json";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/slugAliases";
import { prettyFromAndTo } from "@/lib/utils";
import TimeConverter from "@/components/converters/time/TimeConverter";

type Params = { pair: string };

export async function generateMetadata({ params }: { params: Params }) {
  const resolved = await Promise.resolve(params);
  const pair = resolved.pair; // e.g., second-to-millisecond

  let [fromId, toId] = pair.split("-to-");

  // Normalize slugs so "MS", "ms", "millisecond", etc. all resolve
  fromId = normalizeSlug(fromId);
  toId = normalizeSlug(toId);

  return {
    title: `${fromId} to ${toId} converter — UnitConvert`,
    description: `Convert ${fromId} to ${toId} quickly and accurately.`,
    alternates: {
      canonical: `/convert/time/${pair}`,
    },
  };
}

export async function generateStaticParams() {
  const p = path.join(process.cwd(), "data", "priorityPairs.json");
  if (!fs.existsSync(p)) return [];
  const pairs: Array<{ category: string; from: string; to: string }> =
    JSON.parse(fs.readFileSync(p, "utf8"));
  return pairs
    .filter((x) => x.category === "time")
    .map((x) => ({ pair: `${x.from}-to-${x.to}` }));
}

export default async function TimeConverterPage({
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

  const timeCategory = (unitsData as any)["time"];
  if (!timeCategory) return notFound();
  if (!timeCategory.units[fromId] || !timeCategory.units[toId])
    return notFound();

  const { prettyFrom, prettyTo, title } = prettyFromAndTo(fromId, toId);

  return (
    <main className="size-full mx-auto overflow-auto">
      <div className="flex justify-center">
        <div className="w-[58rem] px-4 pt-4">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-600">
              Convert {prettyFrom} to {prettyTo} quickly and accurately.
            </p>
          </header>

          {/* Hydrate your client-side TimeConverter with defaults */}
          {/* @ts-ignore */}
          <TimeConverter
            defaultFromId={fromId}
            defaultToId={toId}
            defaultValue="1"
          />

          {/* Ad slot placeholder (client-side ad insertion only) */}
          <div id="ad-after-converter" className="my-6" />
        </div>
      </div>
    </main>
  );
}
