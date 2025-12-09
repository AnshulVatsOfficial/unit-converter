// app/convert/[category]/[pair]/page.tsx
import path from "path";
import fs from "fs";
import ConverterClient from "@/components/converters/ConverterClient"; // client component (use client)
import unitsData from "@/data/units.json";

type Params = { category: string; pair: string };

// revalidate (ISR): seconds (24 hours)
export const revalidate = 60 * 60 * 24;

export async function generateStaticParams() {
  // Pre-render priority pairs (SSG). Generate this file with your script.
  const p = path.join(process.cwd(), "data", "priorityPairs.json");
  if (!fs.existsSync(p)) return [];
  const pairs: Array<{ category: string; from: string; to: string }> =
    JSON.parse(fs.readFileSync(p, "utf8"));
  return pairs.map((x) => ({
    category: x.category,
    pair: `${x.from}-to-${x.to}`,
  }));
}

export default function ConverterPage({ params }: { params: Params }) {
  const { category, pair } = params;
  const parts = pair.split("-to-");
  if (parts.length !== 2) {
    return <div>Invalid URL</div>;
  }
  const [from, to] = parts;

  // Validate quickly using the static JSON (bundled)
  const cat = (unitsData as any)[category];
  if (!cat || !cat.units[from] || !cat.units[to]) {
    // In App Router, you can throw a notFound() — but to keep paste-easy:
    return <div>Conversion not found.</div>;
  }

  const prettyFrom = from.replace(/_/g, " ");
  const prettyTo = to.replace(/_/g, " ");
  const title = `${prettyFrom} to ${prettyTo} converter`;

  // Render server side HTML (SSG/ISR) with a hydrated client converter
  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-600">
          Convert{" "}
          {`${prettyFrom.charAt(0).toUpperCase()}${prettyFrom.substring(1)}`} to{" "}
          {`${prettyTo.charAt(0).toUpperCase()}${prettyTo.substring(1)}`}{" "}
          quickly and accurately.
        </p>
      </header>

      {/* Pass minimal props to the client component; unitsChunk is small */}
      <ConverterClient
        defaultCategory={category}
        defaultFrom={from}
        defaultTo={to}
        unitsChunk={cat}
      />

      {/* inline ad slot placeholder (render-only client-side ad code after hydration) */}
      <div id="ad-after-converter" className="my-6"></div>
    </main>
  );
}
