import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LengthConverterPage from "./converters/length/page";

export default function Home() {
  const converters = [
    { title: "Length", children: <LengthConverterPage /> },
    { title: "Area", children: <LengthConverterPage /> },
    { title: "Temperature", children: <LengthConverterPage /> },
    { title: "Weight", children: <LengthConverterPage /> },
    { title: "Time", children: <LengthConverterPage /> },
    { title: "Volume", children: <LengthConverterPage /> },
  ];

  return (
    <Tabs
      className="size-full flex flex-col items-center pt-2"
      defaultValue={converters[0].title}
    >
      <TabsList className="w-full flex justify-start gap-x-2 overflow-x-auto overflow-y-hidden max-w-[60rem] px-6 bg-transparent">
        {converters.map(({ title }, index: number) => {
          return (
            <TabsTrigger key={`${title}-${index}`} value={title}>
              {title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {converters.map(({ title, children }, index: number) => {
        return (
          <TabsContent
            key={`${title}-${index}`}
            className="size-full overflow-auto"
            value={title}
          >
            {children}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
