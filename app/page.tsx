// app/page.tsx
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LengthConverter from "@/components/converters/length/Length";
import AreaConverter from "@/components/converters/area/Area"; // adjust name/path if different
import TimeConverter from "@/components/converters/time/TimeConverter";

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
    <div className="size-full overflow-auto">
      <Tabs
        className="size-full flex flex-col items-center pt-2"
        defaultValue={converters[0].title}
      >
        <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[50rem] px-4 bg-transparent">
          {converters.map(({ title }, index) => (
            <TabsTrigger key={`${title}-${index}`} value={title}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>

        {converters.map(({ title, node, canonical }, index) => (
          <TabsContent
            key={`${title}-${index}`}
            className="size-full overflow-auto"
            value={title}
          >
            <div className="max-w-[50rem] mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title} converter</h2>
                <Link href={canonical} prefetch className="text-sm underline">
                  View full {title} converter page
                </Link>
              </div>

              {/* render the actual converter component (client component) */}
              <div>{node}</div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
