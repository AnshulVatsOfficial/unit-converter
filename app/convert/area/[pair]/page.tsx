// app/convert/area/[pair]/page.tsx
import fs from "fs";
import path from "path";
import unitsData from "@/data/units.json";
import AreaConverter from "@/components/converters/area/Area";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/slugAliases";
import { prettyFromAndTo } from "@/lib/utils";

type Params = { pair: string };

export async function generateMetadata({ params }: { params: Params }) {
  const resolved = await Promise.resolve(params);
  const pair = resolved.pair;
  let [fromId, toId] = pair.split("-to-");
  fromId = normalizeSlug(fromId);
  toId = normalizeSlug(toId);

  return {
    title: `${fromId} to ${toId} converter — Unitlab`,
    description: `Convert ${fromId} to ${toId} quickly and accurately.`,
    alternates: {
      canonical: `/convert/area/${pair}`,
    },
  };
}

export async function generateStaticParams() {
  const p = path.join(process.cwd(), "data", "priorityPairs.json");
  if (!fs.existsSync(p)) return [];
  const pairs: Array<{ category: string; from: string; to: string }> =
    JSON.parse(fs.readFileSync(p, "utf8"));
  return pairs
    .filter((x) => x.category === "area")
    .map((x) => ({ pair: `${x.from}-to-${x.to}` }));
}

export default async function AreaConverterPage({
  params,
}: {
  params?: Params;
}) {
  const resolvedParams = await Promise.resolve(params as any);
  const pair = resolvedParams?.pair;
  if (!pair) return notFound();

  const parts = pair.split("-to-");
  if (parts.length !== 2) return notFound();

  // normalize incoming slugs
  const rawFrom = parts[0];
  const rawTo = parts[1];
  const fromId = normalizeSlug(rawFrom);
  const toId = normalizeSlug(rawTo);

  const areaCategory = (unitsData as any)["area"];
  if (!areaCategory) return notFound();
  if (!areaCategory.units[fromId] || !areaCategory.units[toId])
    return notFound();

  const { prettyFrom, prettyTo, title } = prettyFromAndTo(fromId, toId);

  return (
    <main className="size-full mx-auto overflow-auto">
      <div className="flex justify-center">
        <div className="w-[50rem] px-4 pt-4">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-600">
              Convert {prettyFrom} to {prettyTo} quickly and accurately.
            </p>
          </header>

          {/* @ts-ignore */}
          <AreaConverter
            defaultFromId={fromId}
            defaultToId={toId}
            defaultValue="1"
          />

          <div id="ad-after-converter" className="my-6" />
        </div>
      </div>
    </main>
  );
}
