import fs from "fs";
import path from "path";
import unitsData from "@/data/units.json";
import LengthConverter from "@/components/converters/length/Length";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/slugAliases";
import { prettyFromAndTo } from "@/lib/utils";
import AdUnit from "@/components/common/AdUnit";
import Script from "next/script";

type Params = { pair: string };

export async function generateMetadata({ params }: { params: Params }) {
  const resolved = await Promise.resolve(params);
  const pair = resolved.pair; // e.g., meter-to-kilometer

  let [fromId, toId] = pair.split("-to-");

  // Normalize slugs so "KM", "km", "kilometre", "kilometer", "kilo-meter" all resolve
  fromId = normalizeSlug(fromId);
  toId = normalizeSlug(toId);

  return {
    title: `${fromId} to ${toId} converter — Unitlab`,
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

  const { prettyFrom, prettyTo, title } = prettyFromAndTo(fromId, toId);

  const atOptions = {
    key: "b8f3de4b82bc0efb796afe6a4841a165",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };

  return (
    // <main className="size-full mx-auto bg-pink-100 flex justify-center">
    //   <div className="w-[50rem] px-4 pt-4">
    //     <header className="mb-4">
    //       <h1 className="text-2xl font-semibold">{title}</h1>
    //       <p className="text-sm text-gray-600">
    //         Convert {prettyFrom} to {prettyTo} quickly and accurately.
    //       </p>
    //     </header>

    //     {/* Hydrate your client-side LengthConverter with defaults */}
    //     {/* @ts-ignore */}
    //     <LengthConverter
    //       defaultFromId={fromId}
    //       defaultToId={toId}
    //       defaultValue="1"
    //     />

    //     {/* Ad slot placeholder (client-side ad insertion only) */}
    //     <AdUnit slot="2907738439" />
    //   </div>
    // </main>
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

          <LengthConverter
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
