"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LengthConverter from "@/components/converters/length/Length";
import AreaConverter from "@/components/converters/area/Area";
import TimeConverter from "@/components/converters/time/TimeConverter";
import AdsterraNative from "@/components/ads/AdsterraNative";
import AdsterraBanner728 from "@/components/ads/AdsterraBanner728";
import AdsterraSidebarRight from "@/components/ads/AdsterraSidebarRight";
import AdsterraSidebarLeft from "@/components/ads/AdsterraSidebarLeft";

export default function Home() {
  const converters = [
    {
      title: "Length",
      category: "length",
      node: <LengthConverter />,
      canonical: "/convert/length/meter-to-centimeter",
    },
    {
      title: "Area",
      category: "area",
      node: <AreaConverter />,
      canonical: "/convert/area/square_meter-to-square_foot",
    },
    {
      title: "Time",
      category: "time",
      node: <TimeConverter />,
      canonical: "/convert/time/second-to-millisecond",
    },
  ];

  return (
    <main className="w-full flex justify-center pt-4">
      {/* Outer container */}
      <div className="flex w-full max-w-[1200px] justify-center gap-6">
        {/* ===== LEFT SIDEBAR (desktop only) ===== */}
        <AdsterraSidebarLeft />

        {/* ===== MAIN CONTENT ===== */}
        <div className="w-[50rem] px-4">
          <Tabs
            className="size-full flex flex-col items-center pt-2"
            defaultValue={converters[0].title}
          >
            {/* Tabs header */}
            <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[50rem] px-4 bg-transparent">
              {converters.map(({ title }) => (
                <TabsTrigger key={title} value={title}>
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs content */}
            {converters.map(({ title, node, canonical }) => (
              <TabsContent key={title} value={title} className="size-full">
                <div className="max-w-[50rem] mx-auto p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">{title} converter</h1>
                    <Link href={canonical} className="text-sm underline">
                      View full {title} converter page
                    </Link>
                  </div>

                  {/* Converter */}
                  <div>{node}</div>

                  {/* Inline monetization (all devices) */}
                  <AdsterraNative />

                  {/* Desktop banner */}
                  <AdsterraBanner728 />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* ===== RIGHT SIDEBAR (desktop only) ===== */}
        <AdsterraSidebarRight />
      </div>
    </main>
  );
}
