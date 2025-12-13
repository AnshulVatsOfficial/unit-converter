import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import priorityPairs from "@/data/priorityPairs.json";

export const metadata = {
  title: "Sitemap – UnitLab",
  description: "Browse all unit converters available on UnitLab.",
};

export default function HtmlSitemapPage() {
  // Filter converters for each category
  const lengthPairs = priorityPairs.filter((p) => p.category === "length");
  const areaPairs = priorityPairs.filter((p) => p.category === "area");
  const timePairs = priorityPairs.filter((p) => p.category === "time");

  return (
    <main className="size-full flex justify-center">
      <div className="w-[50rem] p-6">
        <h1 className="text-3xl font-bold mb-6">UnitLab Sitemap</h1>

        <Tabs
          defaultValue="length"
          className="size-full flex flex-col items-center pt-2 overflow-auto"
        >
          {/* TAB HEADERS */}
          <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[50rem] px-4 bg-transparent">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>

          {/* LENGTH TAB */}
          <TabsContent value="length" className="size-full overflow-auto">
            {/* <h2 className="text-xl font-semibold mt-4 mb-2">
              Length Converters
            </h2> */}
            <ul className="list-disc ml-6 space-y-1">
              {lengthPairs.map((pair) => (
                <li key={`${pair.from}-${pair.to}`}>
                  <Link
                    href={`/convert/length/${pair.from}-to-${pair.to}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pair.from.replace(/_/g, " ")} →{" "}
                    {pair.to.replace(/_/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* AREA TAB */}
          <TabsContent value="area" className="size-full overflow-auto">
            {/* <h2 className="text-xl font-semibold mt-4 mb-2">Area Converters</h2> */}
            <ul className="list-disc ml-6 space-y-1">
              {areaPairs.map((pair) => (
                <li key={`${pair.from}-${pair.to}`}>
                  <Link
                    href={`/convert/area/${pair.from}-to-${pair.to}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pair.from.replace(/_/g, " ")} →{" "}
                    {pair.to.replace(/_/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* TIME TAB */}
          <TabsContent value="time" className="size-full overflow-auto">
            {/* <h2 className="text-xl font-semibold mt-4 mb-2">Time Converters</h2> */}
            <ul className="list-disc ml-6 space-y-1">
              {timePairs.map((pair) => (
                <li key={`${pair.from}-${pair.to}`}>
                  <Link
                    href={`/convert/time/${pair.from}-to-${pair.to}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pair.from.replace(/_/g, " ")} →{" "}
                    {pair.to.replace(/_/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        {/* Optional: AdSense block */}
        <div className="mt-10 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-7211777208376091"
            data-ad-slot="YOUR_SLOT_ID"
            data-ad-format="auto"
          ></ins>
        </div>
      </div>
    </main>
  );
}
