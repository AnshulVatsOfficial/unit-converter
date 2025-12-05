import { AreaConverter } from "@/components/converters/area/Area";
import { Zap, Shield, Globe } from "lucide-react";

export default function AreaConverterPage() {
  return (
    <>
      <title>
        Area Converter - Convert Square Meters, Acres, Hectares & More |
        UnitConvert
      </title>
      <meta
        name="description"
        content="Free online area converter. Instantly convert between square meters, square feet, acres, hectares, and more. Fast, accurate, and easy to use."
      />
      <meta
        name="keywords"
        content="area converter, unit converter, square meters to square feet, acres to hectares, area conversion"
      />
      <link rel="canonical" href="/area" />

      <div className="min-h-screen flex flex-col items-center bg-background overflow-auto">
        <main className="flex-1">
          <section className="p-4">
            <AreaConverter />
          </section>

          {/* Info Section */}
          <section className="px-4 py-12 md:py-16 bg-muted/30">
            <div className="container max-w-4xl">
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Why Use Our Area Converter?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    See all conversions update in real-time as you type. No page
                    reloads needed.
                  </p>
                </div>

                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">High Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Accurate calculations with up to 10 decimal places for
                    scientific applications.
                  </p>
                </div>

                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">11 Units</h3>
                  <p className="text-sm text-muted-foreground">
                    From square micrometers to square miles, we cover all common
                    area units.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <article className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-semibold mb-4">
                  About Area Conversion
                </h2>
                <p className="text-muted-foreground mb-4">
                  Area is a measure of the two-dimensional space enclosed within
                  a boundary. It is used in various fields including real
                  estate, agriculture, construction, and science. The metric
                  system uses square meters as the base unit, while the imperial
                  system commonly uses square feet and acres.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-3">
                  Common Area Conversions
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    <strong>1 square meter</strong> = 10.7639 square feet =
                    1,550 square inches
                  </li>
                  <li>
                    <strong>1 hectare</strong> = 10,000 square meters = 2.471
                    acres
                  </li>
                  <li>
                    <strong>1 acre</strong> = 4,046.86 square meters = 43,560
                    square feet
                  </li>
                  <li>
                    <strong>1 square kilometer</strong> = 1,000,000 square
                    meters = 0.3861 square miles
                  </li>
                  <li>
                    <strong>1 square mile</strong> = 2.59 square kilometers =
                    640 acres
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3">
                  Supported Units
                </h3>
                <p className="text-muted-foreground">
                  Our converter supports metric units (square meter, square
                  kilometer, square centimeter, square millimeter, square
                  micrometer, hectare), imperial units (square mile, square
                  yard, square foot, square inch), and land measurement units
                  (acre).
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
