// app/convert/area/[pair]/page.tsx
import fs from "fs";
import path from "path";
import unitsData from "@/data/units.json";
import AreaConverter from "@/components/converters/area/Area";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/slugAliases";
import { prettyFromAndTo } from "@/lib/utils";
import Script from "next/script";

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
    <main className="size-full mx-auto flex justify-center">
      <div className="w-full flex justify-center pt-4">
        {/* --- LEFT AD (fixed width container) --- */}
        <div className="hidden lg:flex flex-col mr-6 w-[160px]">
          <div className="ad-container mb-4">
            <Script
              src="https://pl28256669.effectivegatecpm.com/04/11/9a/04119ab3cbd57d8ec09916327552a7d2.js"
              strategy="afterInteractive"
            />
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="w-[50rem] px-4">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-600">
              Convert {prettyFrom} to {prettyTo} quickly and accurately.
            </p>
          </header>

          <AreaConverter
            defaultFromId={fromId}
            defaultToId={toId}
            defaultValue="1"
          />

          {/* --- BOTTOM AD --- */}
          <div className="mt-6 flex justify-center">
            {/* <AdUnit slot="2907738439" /> */}
          </div>
        </div>

        {/* --- RIGHT AD (fixed width container) --- */}
        <div className="hidden lg:flex flex-col ml-6 w-[160px]">
          <div className="ad-container">
            {/* <AdUnit slot="2907738439" /> */}
            <Script
              async
              data-cfasync="false"
              src="https://pl28257044.effectivegatecpm.com/6114a3778bfb9a9d6183ff676addd374/invoke.js"
              strategy="afterInteractive"
            />
            <div id="container-6114a3778bfb9a9d6183ff676addd374"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
