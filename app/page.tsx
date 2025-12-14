// // app/page.tsx
// import Link from "next/link";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import LengthConverter from "@/components/converters/length/Length";
// import AreaConverter from "@/components/converters/area/Area"; // adjust name/path if different
// import TimeConverter from "@/components/converters/time/TimeConverter";

// export default function Home() {
//   const converters = [
//     {
//       title: "Length",
//       category: "length",
//       node: <LengthConverter />,
//       canonical: "/convert/length/meter-to-centimeter",
//     },
//     {
//       title: "Area",
//       category: "area",
//       node: <AreaConverter />,
//       canonical: "/convert/area/square_meter-to-square_foot",
//     },
//     {
//       title: "Time",
//       category: "time",
//       node: <TimeConverter />,
//       canonical: "/convert/time/second-to-millisecond",
//     },
//   ];

//   return (
//     <div className="size-full overflow-auto">
//       <Tabs
//         className="size-full flex flex-col items-center pt-2"
//         defaultValue={converters[0].title}
//       >
//         <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[50rem] px-4 bg-transparent">
//           {converters.map(({ title }, index) => (
//             <TabsTrigger key={`${title}-${index}`} value={title}>
//               {title}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {converters.map(({ title, node, canonical }, index) => (
//           <TabsContent
//             key={`${title}-${index}`}
//             className="size-full overflow-auto"
//             value={title}
//           >
//             <div className="max-w-[50rem] mx-auto p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-xl font-semibold">{title} converter</h1>
//                 <Link href={canonical} prefetch className="text-sm underline">
//                   View full {title} converter page
//                 </Link>
//               </div>

//               {/* render the actual converter component (client component) */}
//               <div>{node}</div>
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Script from "next/script";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LengthConverter from "@/components/converters/length/Length";
import AreaConverter from "@/components/converters/area/Area";
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
    <main className="size-full mx-auto flex justify-center">
      <div className="w-full flex justify-center pt-4">
        {/* --- LEFT AD (like converter page) --- */}
        <div className="hidden lg:flex flex-col mr-6 w-[160px]">
          <div className="ad-container mb-4">
            <Script
              src="https://pl28256669.effectivegatecpm.com/04/11/9a/04119ab3cbd57d8ec09916327552a7d2.js"
              strategy="afterInteractive"
            />
          </div>
        </div>

        {/* --- MAIN HOME CONTENT --- */}
        <div className="w-[50rem] px-4">
          <Tabs
            className="size-full flex flex-col items-center pt-2"
            defaultValue={converters[0].title}
          >
            {/* TABS HEADER */}
            <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[50rem] px-4 bg-transparent">
              {converters.map(({ title }, index) => (
                <TabsTrigger key={`${title}-${index}`} value={title}>
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* TAB CONTENTS */}
            {converters.map(({ title, node, canonical }, index) => (
              <TabsContent
                key={`${title}-${index}`}
                className="size-full overflow-auto"
                value={title}
              >
                <div className="max-w-[50rem] mx-auto p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">{title} converter</h1>
                    <Link
                      href={canonical}
                      prefetch
                      className="text-sm underline"
                    >
                      View full {title} converter page
                    </Link>
                  </div>

                  {/* Actual converter component */}
                  <div>{node}</div>

                  {/* --- BOTTOM AD --- */}
                  {/* <div className="mt-6 flex justify-center">
                    <Script
                      async
                      data-cfasync="false"
                      src="https://www.highperformanceformat.com/b8f3de4b82bc0efb796afe6a4841a165/invoke.js"
                      strategy="afterInteractive"
                      style={{ width: "728px", height: "90px" }}
                    />
                    <div id="container-6114a3778bfb9a9d6183ff676addd374"></div>
                  </div> */}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* --- RIGHT AD (like converter page) --- */}
        <div className="hidden lg:flex flex-col ml-6 w-[160px]">
          <div className="ad-container">
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
