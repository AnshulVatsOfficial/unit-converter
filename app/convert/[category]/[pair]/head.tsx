// app/convert/[category]/[pair]/head.tsx
import React from "react";

export default function Head({
  params,
}: {
  params: { category: string; pair: string };
}) {
  const { category, pair } = params;
  const [from, to] = pair.split("-to-");
  const prettyFrom = from?.replace(/_/g, " ") ?? "";
  const prettyTo = to?.replace(/_/g, " ") ?? "";
  const title = `${prettyFrom} to ${prettyTo} converter — Unitlab`;
  const description = `Convert ${prettyFrom} to ${prettyTo} quickly and accurately.`;

  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL}/convert/${category}/${pair}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />
      {/* Add OG tags / JSON-LD if you want */}
    </>
  );
}
