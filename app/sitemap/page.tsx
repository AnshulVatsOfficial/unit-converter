// app/sitemap/page.tsx (server component)
import units from "@/data/units.json";
import AdSenseAd from "@/components/common/AdSenseAd"; // client component

function prettyName(id: string) {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const metadata = {
  title: "Sitemap — UnitLab",
  description: "Sitemap for UnitLab — quick links to all converters",
};

export default function SitemapPage() {
  const categories = Object.keys(units);

  return (
    // <main className="container mx-auto p-6">
    //   <header className="mb-6">
    //     <h1 className="text-3xl font-bold">Sitemap</h1>
    //     <p className="text-sm text-muted-foreground">
    //       Quick links to all converter categories and pages.
    //     </p>
    //   </header>

    //   {/* Ad — rendered client-side */}
    //   {/* You can place ad above, to the side, or between groups */}
    //   <div className="mb-6">
    //     {/* Example: wide responsive ad */}
    //     {/* Replace adSlot with your real slot id */}
    //     <AdSenseAd adSlot="YOUR_AD_SLOT_ID" />
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //     {categories.map((category) => {
    //       const unitsObj = (units as any)[category]?.units ?? {};
    //       const unitKeys = Object.keys(unitsObj);
    //       return (
    //         <section key={category}>
    //           <h2 className="text-xl font-semibold mb-2">
    //             {prettyName(category)}
    //           </h2>
    //           <ul className="list-disc pl-5 space-y-1">
    //             {unitKeys.map((u) => (
    //               <li key={u}>
    //                 <a
    //                   href={`/convert/${encodeURIComponent(
    //                     category
    //                   )}/${encodeURIComponent(`${u}-to-${u}`)}`}
    //                 >
    //                   {prettyName(u)} (↔ see)
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         </section>
    //       );
    //     })}
    //   </div>

    //   <footer className="mt-8">
    //     {/* Optional second ad or small help text */}
    //   </footer>
    // </main>
    <></>
  );
}
